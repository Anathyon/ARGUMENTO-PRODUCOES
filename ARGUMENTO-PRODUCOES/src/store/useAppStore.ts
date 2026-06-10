// Store global Zustand — gerencia estado de dados da API.
//
// Estratégia temporária (pré-produção):
//   1. Ao inicializar, faz um health check na API com timeout curto.
//   2. Se online  → autentica e busca dados reais.
//   3. Se offline → usa dados estáticos de fallback sem exibir erros ao usuário.
//
// Quando a API e o projeto entrarem em produção, remover o fallback
// e o health check, mantendo apenas o fluxo de autenticação.

import { create } from "zustand";
import {
  api,
  login,
  checkApiHealth,
  type ApiTrabalho,
  type ApiPortfolio,
  type ApiPortfolioFiltros,
  type ApiNoticia,
} from "@/lib/api";
import {
  FALLBACK_TRABALHOS,
  FALLBACK_PORTFOLIO,
  FALLBACK_NOTICIAS,
} from "@/lib/fallback";

// ─── Tipos internos ───────────────────────────────────────────────────────────

interface ResourceState<T> {
  items: T[];
  currentPage: number;
  lastPage: number;
  loading: boolean;
  error: string | null;
}

function defaultResource<T>(): ResourceState<T> {
  return { items: [], currentPage: 1, lastPage: 1, loading: false, error: null };
}

// Monta um ResourceState já preenchido com dados de fallback (1 página)
function fallbackResource<T>(items: T[]): ResourceState<T> {
  return { items, currentPage: 1, lastPage: 1, loading: false, error: null };
}

// ─── Shape da store ───────────────────────────────────────────────────────────

interface AppStore {
  // Estado da API — null = ainda verificando
  apiOnline: boolean | null;
  verificarApi: () => Promise<void>;

  // Autenticação
  autenticado: boolean;
  autenticar: () => Promise<void>;

  // Trabalhos
  trabalhos: ResourceState<ApiTrabalho>;
  trabalhoDetalhe: ApiTrabalho | null;
  fetchTrabalhos: (pagina?: number) => Promise<void>;
  fetchTrabalhoDetalhe: (slug: string) => Promise<void>;

  // Portfolio
  portfolio: ResourceState<ApiPortfolio>;
  portfolioDetalhe: ApiPortfolio | null;
  portfolioFiltros: ApiPortfolioFiltros;
  fetchPortfolio: (pagina?: number) => Promise<void>;
  fetchPortfolioDetalhe: (slug: string) => Promise<void>;
  fetchPortfolioFiltros: () => Promise<void>;

  // Notícias
  noticias: ResourceState<ApiNoticia>;
  noticiaDetalhe: ApiNoticia | null;
  fetchNoticias: (pagina?: number) => Promise<void>;
  fetchNoticiaDetalhe: (slug: string) => Promise<void>;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAppStore = create<AppStore>((set, get) => ({

  // ── Disponibilidade da API ──────────────────────────────────────────────────
  apiOnline: null,

  verificarApi: async () => {
    // Evita verificar mais de uma vez por sessão
    if (get().apiOnline !== null) return;
    const online = await checkApiHealth();
    set({ apiOnline: online });
  },

  // ── Autenticação ────────────────────────────────────────────────────────────
  autenticado: false,

  autenticar: async () => {
    if (get().autenticado) return;
    await login();
    set({ autenticado: true });
  },

  // ── Trabalhos ───────────────────────────────────────────────────────────────
  trabalhos: defaultResource<ApiTrabalho>(),
  trabalhoDetalhe: null,

  fetchTrabalhos: async (pagina = 1) => {
    await get().verificarApi();

    // Sem API: carrega fallback imediatamente
    if (!get().apiOnline) {
      set({ trabalhos: fallbackResource(FALLBACK_TRABALHOS) });
      return;
    }

    set((s) => ({ trabalhos: { ...s.trabalhos, loading: true, error: null } }));
    try {
      await get().autenticar();
      const res = await api.trabalhos.list(pagina);
      // Se a API retornou vazio, usa fallback para não mostrar página em branco
      const items = res.data.length > 0 ? res.data : FALLBACK_TRABALHOS;
      set({
        trabalhos: {
          items,
          currentPage: res.meta.current_page,
          lastPage: res.meta.last_page,
          loading: false,
          error: null,
        },
      });
    } catch {
      // Em caso de erro inesperado, cai no fallback silenciosamente
      set({ trabalhos: fallbackResource(FALLBACK_TRABALHOS) });
    }
  },

  fetchTrabalhoDetalhe: async (slug) => {
    await get().verificarApi();

    if (!get().apiOnline) {
      const item = FALLBACK_TRABALHOS.find((t) => t.slug === slug) ?? null;
      set({ trabalhoDetalhe: item });
      return;
    }

    set({ trabalhoDetalhe: null });
    try {
      await get().autenticar();
      const res = await api.trabalhos.get(slug);
      set({ trabalhoDetalhe: res.data });
    } catch {
      // Tenta encontrar no fallback antes de exibir 404
      const fallback = FALLBACK_TRABALHOS.find((t) => t.slug === slug) ?? null;
      set({ trabalhoDetalhe: fallback });
    }
  },

  // ── Portfolio ───────────────────────────────────────────────────────────────
  portfolio: defaultResource<ApiPortfolio>(),
  portfolioDetalhe: null,
  portfolioFiltros: { categorias: [], anos: [] },

  fetchPortfolio: async (pagina = 1) => {
    await get().verificarApi();

    if (!get().apiOnline) {
      set({ portfolio: fallbackResource(FALLBACK_PORTFOLIO) });
      return;
    }

    set((s) => ({ portfolio: { ...s.portfolio, loading: true, error: null } }));
    try {
      await get().autenticar();
      const res = await api.portfolio.list(pagina);
      const items = res.data.length > 0 ? res.data : FALLBACK_PORTFOLIO;
      set({
        portfolio: {
          items,
          currentPage: res.meta.current_page,
          lastPage: res.meta.last_page,
          loading: false,
          error: null,
        },
      });
    } catch {
      set({ portfolio: fallbackResource(FALLBACK_PORTFOLIO) });
    }
  },

  fetchPortfolioDetalhe: async (slug) => {
    await get().verificarApi();

    if (!get().apiOnline) {
      const item = FALLBACK_PORTFOLIO.find((p) => p.slug === slug) ?? null;
      set({ portfolioDetalhe: item });
      return;
    }

    set({ portfolioDetalhe: null });
    try {
      await get().autenticar();
      const res = await api.portfolio.get(slug);
      set({ portfolioDetalhe: res.data });
    } catch {
      const fallback = FALLBACK_PORTFOLIO.find((p) => p.slug === slug) ?? null;
      set({ portfolioDetalhe: fallback });
    }
  },

  fetchPortfolioFiltros: async () => {
    await get().verificarApi();
    if (!get().apiOnline) return; // Filtros não críticos no modo offline

    try {
      await get().autenticar();
      const filtros = await api.portfolio.filtros();
      set({ portfolioFiltros: filtros });
    } catch {
      // Falha silenciosa — filtros são opcionais
    }
  },

  // ── Notícias ────────────────────────────────────────────────────────────────
  noticias: defaultResource<ApiNoticia>(),
  noticiaDetalhe: null,

  fetchNoticias: async (pagina = 1) => {
    await get().verificarApi();

    if (!get().apiOnline) {
      set({ noticias: fallbackResource(FALLBACK_NOTICIAS) });
      return;
    }

    set((s) => ({ noticias: { ...s.noticias, loading: true, error: null } }));
    try {
      await get().autenticar();
      const res = await api.noticias.list(pagina);
      const items = res.data.length > 0 ? res.data : FALLBACK_NOTICIAS;
      set({
        noticias: {
          items,
          currentPage: res.meta.current_page,
          lastPage: res.meta.last_page,
          loading: false,
          error: null,
        },
      });
    } catch {
      set({ noticias: fallbackResource(FALLBACK_NOTICIAS) });
    }
  },

  fetchNoticiaDetalhe: async (slug) => {
    await get().verificarApi();

    if (!get().apiOnline) {
      const item = FALLBACK_NOTICIAS.find((n) => n.slug === slug) ?? null;
      set({ noticiaDetalhe: item });
      return;
    }

    set({ noticiaDetalhe: null });
    try {
      await get().autenticar();
      const res = await api.noticias.get(slug);
      set({ noticiaDetalhe: res.data });
    } catch {
      const fallback = FALLBACK_NOTICIAS.find((n) => n.slug === slug) ?? null;
      set({ noticiaDetalhe: fallback });
    }
  },
}));
