// Testes unitários do cliente HTTP (api.ts)
// Estratégia: mock global de fetch — sem chamadas reais de rede.

import { describe, it, expect, vi, afterEach } from "vitest";

afterEach(() => vi.restoreAllMocks());

// ─── Helpers ───────────────────────────────────────────────────────────────

function mockFetch(status: number, body: unknown) {
  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  } as Response);
}

function mockFetchFail(message = "Network error") {
  vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error(message));
}

// ─── api.trabalhos ─────────────────────────────────────────────────────────

describe("api.trabalhos.list", () => {
  it("chama a rota correta e retorna dados paginados", async () => {
    const payload = { data: [{ id: 1, slug: "a", titulo: "A", resumo: "r" }], meta: { current_page: 1, last_page: 1, per_page: 10, total: 1 }, links: {} };
    mockFetch(200, payload);
    const { api } = await import("../lib/api");
    const res = await api.trabalhos.list(1);
    expect(res.data).toHaveLength(1);
    expect(res.data[0].slug).toBe("a");
  });

  it("lança erro em status 500", async () => {
    mockFetch(500, {});
    const { api } = await import("../lib/api");
    await expect(api.trabalhos.list()).rejects.toThrow("Erro 500");
  });

  it("lança erro em falha de rede", async () => {
    mockFetchFail();
    const { api } = await import("../lib/api");
    await expect(api.trabalhos.list()).rejects.toThrow();
  });
});

describe("api.trabalhos.get", () => {
  it("retorna detalhe pelo slug", async () => {
    const payload = { data: { id: 1, slug: "meu-filme", titulo: "Meu Filme", resumo: "r" } };
    mockFetch(200, payload);
    const { api } = await import("../lib/api");
    const res = await api.trabalhos.get("meu-filme");
    expect(res.data.slug).toBe("meu-filme");
  });

  it("lança erro 404", async () => {
    mockFetch(404, {});
    const { api } = await import("../lib/api");
    await expect(api.trabalhos.get("inexistente")).rejects.toThrow("Erro 404");
  });
});

// ─── api.portfolio ─────────────────────────────────────────────────────────

describe("api.portfolio.list", () => {
  it("retorna lista paginada", async () => {
    const payload = { data: [{ id: 1, slug: "p1", titulo: "P1", resumo: "r" }], meta: { current_page: 1, last_page: 2, per_page: 6, total: 10 }, links: {} };
    mockFetch(200, payload);
    const { api } = await import("../lib/api");
    const res = await api.portfolio.list();
    expect(res.meta.last_page).toBe(2);
  });
});

describe("api.portfolio.filtros", () => {
  it("retorna categorias e anos", async () => {
    mockFetch(200, { categorias: ["Curta", "Longa"], anos: ["2023", "2024"] });
    const { api } = await import("../lib/api");
    const res = await api.portfolio.filtros();
    expect(res.categorias).toContain("Curta");
    expect(res.anos).toContain("2024");
  });
});

// ─── api.noticias ──────────────────────────────────────────────────────────

describe("api.noticias.list", () => {
  it("retorna lista paginada com estrutura correta", async () => {
    const payload = {
      data: [{ id: 1, slug: "noticia-1", titulo: "N1", resumo: "r", autor: "A", data: "2026-01-01", categoria: "Lançamento", tags: [] }],
      meta: { current_page: 1, last_page: 1, per_page: 10, total: 1 },
      links: {},
    };
    mockFetch(200, payload);
    const { api } = await import("../lib/api");
    const res = await api.noticias.list();
    expect(res.data[0].autor).toBe("A");
  });
});

describe("api.noticias.get", () => {
  it("retorna detalhe com conteudo_html", async () => {
    const payload = { data: { id: 1, slug: "noticia-1", titulo: "N1", resumo: "r", autor: "A", data: "2026-01-01", categoria: "Lançamento", tags: [], conteudo_html: "<p>Texto</p>" } };
    mockFetch(200, payload);
    const { api } = await import("../lib/api");
    const res = await api.noticias.get("noticia-1");
    expect(res.data.conteudo_html).toBe("<p>Texto</p>");
  });

  it("lança erro 404 para slug inexistente", async () => {
    mockFetch(404, {});
    const { api } = await import("../lib/api");
    await expect(api.noticias.get("nao-existe")).rejects.toThrow("Erro 404");
  });
});

// ─── Fetch envia headers corretos ──────────────────────────────────────────

describe("api — headers da requisição", () => {
  it("envia Accept: application/json em todos os requests", async () => {
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true, status: 200,
      json: () => Promise.resolve({ data: [], meta: { current_page: 1, last_page: 1, per_page: 10, total: 0 }, links: {} }),
    } as Response);

    const { api } = await import("../lib/api");
    await api.noticias.list();

    const [, options] = spy.mock.calls[0] as [string, RequestInit];
    expect((options?.headers as Record<string, string>)["Accept"]).toBe("application/json");
  });
});
