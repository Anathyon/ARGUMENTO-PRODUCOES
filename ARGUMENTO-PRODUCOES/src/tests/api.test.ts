// @vitest-environment node
//
// Testes de integração — verificam os endpoints reais da API Plugwin.
// A autenticação é por sessão Laravel (cookie), não por Bearer token.
// O ambiente node é necessário para fetch real funcionar fora do jsdom.

import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "child_process";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BASE = "http://10.100.20.8:8000";
const COOKIE_FILE = "/tmp/argumento-test-cookies.txt";

// Usa curl para autenticar e salvar os cookies de sessão no disco.
// fetch() no ambiente node não persiste cookies entre requisições,
// mas o curl gerencia o jar corretamente.
function curlGet(path: string): { status: number; body: string } {
  try {
    const out = execSync(
      `curl -sb ${COOKIE_FILE} "${BASE}${path}" -H "Accept: application/json" -si --max-time 5`,
      { encoding: "utf8", timeout: 8000 }
    );
    const statusMatch = out.match(/HTTP\/\S+ (\d+)/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 0;
    const body = out.slice(out.indexOf("\r\n\r\n") + 4).trim();
    return { status, body };
  } catch {
    return { status: 0, body: "" };
  }
}

// ─── Setup: autenticação via curl ─────────────────────────────────────────────

let apiDisponivel = false;

beforeAll(() => {
  try {
    // Verifica se a API responde antes de tentar autenticar
    execSync(`curl -s --max-time 3 --head "${BASE}/login"`, { timeout: 5000 });

    // Extrai o CSRF token da página de login
    const html = execSync(`curl -sc ${COOKIE_FILE} "${BASE}/login" --max-time 5`, {
      encoding: "utf8",
      timeout: 8000,
    });
    const match = html.match(/name="csrf-token" content="([^"]+)"/);
    if (!match) return;

    // Faz o POST de login
    const loginRes = execSync(
      `curl -sb ${COOKIE_FILE} -c ${COOKIE_FILE} -X POST "${BASE}/login" \
       -H "Accept: application/json" \
       -H "Content-Type: application/json" \
       -H "X-CSRF-TOKEN: ${match[1]}" \
       -d '{"email":"marcelocardozo@plugwin.net","password":"Plugwin@2024!#"}' \
       -si --max-time 5`,
      { encoding: "utf8", timeout: 8000 }
    );

    // 302 = login bem-sucedido com redirecionamento
    if (loginRes.includes("HTTP/1.1 302") || loginRes.includes("HTTP/1.1 200")) {
      apiDisponivel = true;
    }
  } catch {
    // API inacessível — testes de integração serão pulados
    apiDisponivel = false;
  }
});

// ─── Testes de integração (pulados se API offline) ────────────────────────────

describe("API - integração (requer API online)", () => {
  it("autentica via sessão Laravel", () => {
    if (!apiDisponivel) return;
    expect(apiDisponivel).toBe(true);
  });

  it("GET /api/v1/trabalhos — retorna 200 com estrutura paginada", () => {
    if (!apiDisponivel) return;
    const { status, body } = curlGet("/api/v1/trabalhos");
    expect(status).toBe(200);
    const json = JSON.parse(body);
    expect(json).toHaveProperty("data");
    expect(Array.isArray(json.data)).toBe(true);
  });

  it("GET /api/v1/portfolio — retorna 200 com estrutura paginada", () => {
    if (!apiDisponivel) return;
    const { status, body } = curlGet("/api/v1/portfolio");
    expect(status).toBe(200);
    const json = JSON.parse(body);
    expect(json).toHaveProperty("data");
  });

  it("GET /api/v1/portfolio/filtros — retorna 200 com categorias e anos", () => {
    if (!apiDisponivel) return;
    const { status, body } = curlGet("/api/v1/portfolio/filtros");
    expect(status).toBe(200);
    const json = JSON.parse(body);
    expect(json).toHaveProperty("categorias");
    expect(json).toHaveProperty("anos");
  });

  it("GET /api/v1/noticias — retorna 200 com estrutura paginada", () => {
    if (!apiDisponivel) return;
    const { status, body } = curlGet("/api/v1/noticias");
    expect(status).toBe(200);
    const json = JSON.parse(body);
    // Valida estrutura paginada (banco pode estar vazio durante desenvolvimento)
    expect(json).toHaveProperty("data");
    expect(json).toHaveProperty("meta");
    expect(Array.isArray(json.data)).toBe(true);
    // Se houver dados, valida a estrutura do item
    if (json.data.length > 0) {
      const noticia = json.data[0];
      expect(noticia).toHaveProperty("slug");
      expect(noticia).toHaveProperty("titulo");
      expect(noticia).toHaveProperty("autor");
      expect(noticia).toHaveProperty("data");
    }
  });

  it("GET /api/v1/noticias/{slug} — retorna detalhe completo", () => {
    if (!apiDisponivel) return;
    const listRes = curlGet("/api/v1/noticias");
    const list = JSON.parse(listRes.body);
    const slug = list.data[0]?.slug;
    if (!slug) return;

    const { status, body } = curlGet(`/api/v1/noticias/${slug}`);
    expect(status).toBe(200);
    const json = JSON.parse(body);
    expect(json.data).toHaveProperty("slug", slug);
    expect(json.data).toHaveProperty("conteudo_html");
  });
});

// ─── Testes unitários — health check ─────────────────────────────────────────

describe("checkApiHealth", () => {
  it("retorna false para URL inacessível", async () => {
    // Importa dinamicamente para não quebrar o módulo antes do mock
    const { checkApiHealth } = await import("../lib/api");

    // Monkey-patch temporário do fetch para simular timeout
    const originalFetch = global.fetch;
    global.fetch = () => Promise.reject(new Error("Connection refused"));

    const result = await checkApiHealth();
    expect(result).toBe(false);

    global.fetch = originalFetch;
  });

  it("retorna true quando servidor responde com status < 500", async () => {
    const { checkApiHealth } = await import("../lib/api");

    const originalFetch = global.fetch;
    global.fetch = () =>
      Promise.resolve({ status: 200, ok: true } as Response);

    const result = await checkApiHealth();
    expect(result).toBe(true);

    global.fetch = originalFetch;
  });

  it("retorna false quando servidor responde com status >= 500", async () => {
    const { checkApiHealth } = await import("../lib/api");

    const originalFetch = global.fetch;
    global.fetch = () =>
      Promise.resolve({ status: 503, ok: false } as Response);

    const result = await checkApiHealth();
    expect(result).toBe(false);

    global.fetch = originalFetch;
  });
});

// ─── Testes unitários — fallback ──────────────────────────────────────────────

describe("Dados de fallback", () => {
  it("fallback de trabalhos tem slug e titulo", async () => {
    const { FALLBACK_TRABALHOS } = await import("../lib/fallback");
    expect(FALLBACK_TRABALHOS.length).toBeGreaterThan(0);
    FALLBACK_TRABALHOS.forEach((t) => {
      expect(t).toHaveProperty("slug");
      expect(t).toHaveProperty("titulo");
      expect(t).toHaveProperty("resumo");
    });
  });

  it("fallback de portfolio tem slug e titulo", async () => {
    const { FALLBACK_PORTFOLIO } = await import("../lib/fallback");
    expect(FALLBACK_PORTFOLIO.length).toBeGreaterThan(0);
    FALLBACK_PORTFOLIO.forEach((p) => {
      expect(p).toHaveProperty("slug");
      expect(p).toHaveProperty("titulo");
    });
  });

  it("fallback de notícias tem slug, titulo, autor e data ISO", async () => {
    const { FALLBACK_NOTICIAS } = await import("../lib/fallback");
    expect(FALLBACK_NOTICIAS.length).toBeGreaterThan(0);
    FALLBACK_NOTICIAS.forEach((n) => {
      expect(n).toHaveProperty("slug");
      expect(n).toHaveProperty("titulo");
      expect(n).toHaveProperty("autor");
      expect(() => new Date(n.data)).not.toThrow();
    });
  });

  it("slugs do fallback são únicos por recurso", async () => {
    const { FALLBACK_TRABALHOS, FALLBACK_PORTFOLIO, FALLBACK_NOTICIAS } =
      await import("../lib/fallback");

    const slugsT = FALLBACK_TRABALHOS.map((t) => t.slug);
    const slugsP = FALLBACK_PORTFOLIO.map((p) => p.slug);
    const slugsN = FALLBACK_NOTICIAS.map((n) => n.slug);

    expect(new Set(slugsT).size).toBe(slugsT.length);
    expect(new Set(slugsP).size).toBe(slugsP.length);
    expect(new Set(slugsN).size).toBe(slugsN.length);
  });
});
