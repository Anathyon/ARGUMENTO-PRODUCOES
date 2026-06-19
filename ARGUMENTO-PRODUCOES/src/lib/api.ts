// Cliente HTTP que autentica na API Plugwin via sessão Laravel (CSRF + cookie).
// Fluxo: GET /login → extrai XSRF-TOKEN → POST /login → sessão salva no cookie do browser.

const BASE_URL = import.meta.env.VITE_API_URL ?? "";
const HEALTH_TIMEOUT_MS = 3000; // Tempo máximo para considerar a API online

// Testa se a API está acessível com timeout curto.
// Não autentica — apenas verifica se o servidor responde.
export async function checkApiHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);
    const res = await fetch(`${BASE_URL}/login`, {
      method: "HEAD",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return res.status < 500; // 200, 302, 405 = servidor respondendo
  } catch {
    return false; // timeout, recusa de conexão ou rede indisponível
  }
}

// Faz o login e estabelece a sessão no browser (cookies gerenciados automaticamente).
export async function login(): Promise<void> {
  // 1. Busca o CSRF token da página de login
  const page = await fetch(`${BASE_URL}/login`, { credentials: "include" });
  const html = await page.text();
  const match = html.match(/name="csrf-token" content="([^"]+)"/);
  if (!match) throw new Error("CSRF token não encontrado na página de login.");

  // 2. Faz o POST com as credenciais e o CSRF token
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-CSRF-TOKEN": match[1],
    },
    body: JSON.stringify({
      email: "marcelocardozo@plugwin.net",
      password: "Plugwin@2024!#",
    }),
  });

  // 302 ou 200 = sucesso; a sessão fica nos cookies do browser
  if (!res.ok && res.status !== 302) {
    throw new Error(`Login falhou com status ${res.status}`);
  }
}

// Wrapper GET autenticado — envia cookies de sessão automaticamente
async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  // Se a sessão expirou, faz novo login e tenta uma vez mais
  if (res.status === 401) {
    await login();
    const retry = await fetch(`${BASE_URL}${path}`, {
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!retry.ok) throw new Error(`Erro ${retry.status} em ${path}`);
    return retry.json() as Promise<T>;
  }

  if (!res.ok) throw new Error(`Erro ${res.status} em ${path}`);
  return res.json() as Promise<T>;
}

// ─── Tipos da API ─────────────────────────────────────────────────────────────

export interface ApiTrabalho {
  id: number;
  slug: string;
  titulo: string;
  resumo: string;
  sinopse?: string;
  diretor?: string;
  duracao?: string;
  ano?: string;
  festival?: string;
  categoria?: string;
  tags?: string[];
  capa?: { url: string };
  trailer_url?: string;
  creditos?: { funcao: string; nome: string }[];
}

export interface ApiPortfolio {
  id: number;
  slug: string;
  titulo: string;
  resumo: string;
  sinopse?: string;
  ano?: string;
  festival?: string;
  categoria?: string;
  tags?: string[];
  capa?: { url: string };
  creditos?: { funcao: string; nome: string }[];
}

export interface ApiPortfolioFiltros {
  categorias: string[];
  anos: string[];
}

export interface ApiNoticia {
  id: number;
  slug: string;
  titulo: string;
  resumo: string;
  autor: string;
  data: string;
  categoria: string;
  tags: string[];
  capa?: { url: string };
  conteudo_html?: string;
}

export interface ApiPaginado<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// ─── Funções de acesso à API ──────────────────────────────────────────────────

export const api = {
  trabalhos: {
    list: (pagina = 1) =>
      get<ApiPaginado<ApiTrabalho>>(`/api/v1/trabalhos?pagina=${pagina}`),
    get: (slug: string) =>
      get<{ data: ApiTrabalho }>(`/api/v1/trabalhos/${slug}`),
  },
  portfolio: {
    list: (pagina = 1) =>
      get<ApiPaginado<ApiPortfolio>>(`/api/v1/portfolio?pagina=${pagina}`),
    get: (slug: string) =>
      get<{ data: ApiPortfolio }>(`/api/v1/portfolio/${slug}`),
    filtros: () =>
      get<ApiPortfolioFiltros>("/api/v1/portfolio/filtros"),
  },
  noticias: {
    list: (pagina = 1) =>
      get<ApiPaginado<ApiNoticia>>(`/api/v1/noticias?pagina=${pagina}`),
    get: (slug: string) =>
      get<{ data: ApiNoticia }>(`/api/v1/noticias/${slug}`),
  },
};
