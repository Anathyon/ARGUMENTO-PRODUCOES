const BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
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
