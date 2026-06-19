import { create } from "zustand";
import {
  api,
  type ApiTrabalho,
  type ApiPortfolio,
  type ApiPortfolioFiltros,
  type ApiNoticia,
} from "@/lib/api";

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

interface AppStore {
  trabalhos: ResourceState<ApiTrabalho>;
  trabalhoDetalhe: ApiTrabalho | null;
  fetchTrabalhos: (pagina?: number) => Promise<void>;
  fetchTrabalhoDetalhe: (slug: string) => Promise<void>;

  portfolio: ResourceState<ApiPortfolio>;
  portfolioDetalhe: ApiPortfolio | null;
  portfolioFiltros: ApiPortfolioFiltros;
  fetchPortfolio: (pagina?: number) => Promise<void>;
  fetchPortfolioDetalhe: (slug: string) => Promise<void>;
  fetchPortfolioFiltros: () => Promise<void>;

  noticias: ResourceState<ApiNoticia>;
  noticiaDetalhe: ApiNoticia | null;
  fetchNoticias: (pagina?: number) => Promise<void>;
  fetchNoticiaDetalhe: (slug: string) => Promise<void>;
}

export const useAppStore = create<AppStore>((set) => ({
  trabalhos: defaultResource<ApiTrabalho>(),
  trabalhoDetalhe: null,

  fetchTrabalhos: async (pagina = 1) => {
    set((s) => ({ trabalhos: { ...s.trabalhos, loading: true, error: null } }));
    try {
      const res = await api.trabalhos.list(pagina);
      set({ trabalhos: { items: res.data, currentPage: res.meta.current_page, lastPage: res.meta.last_page, loading: false, error: null } });
    } catch (e) {
      set((s) => ({ trabalhos: { ...s.trabalhos, loading: false, error: String(e) } }));
    }
  },

  fetchTrabalhoDetalhe: async (slug) => {
    set({ trabalhoDetalhe: null });
    try {
      const res = await api.trabalhos.get(slug);
      set({ trabalhoDetalhe: res.data });
    } catch {
      set({ trabalhoDetalhe: null });
    }
  },

  portfolio: defaultResource<ApiPortfolio>(),
  portfolioDetalhe: null,
  portfolioFiltros: { categorias: [], anos: [] },

  fetchPortfolio: async (pagina = 1) => {
    set((s) => ({ portfolio: { ...s.portfolio, loading: true, error: null } }));
    try {
      const res = await api.portfolio.list(pagina);
      set({ portfolio: { items: res.data, currentPage: res.meta.current_page, lastPage: res.meta.last_page, loading: false, error: null } });
    } catch (e) {
      set((s) => ({ portfolio: { ...s.portfolio, loading: false, error: String(e) } }));
    }
  },

  fetchPortfolioDetalhe: async (slug) => {
    set({ portfolioDetalhe: null });
    try {
      const res = await api.portfolio.get(slug);
      set({ portfolioDetalhe: res.data });
    } catch {
      set({ portfolioDetalhe: null });
    }
  },

  fetchPortfolioFiltros: async () => {
    try {
      const filtros = await api.portfolio.filtros();
      set({ portfolioFiltros: filtros });
    } catch {
      // filtros são opcionais
    }
  },

  noticias: defaultResource<ApiNoticia>(),
  noticiaDetalhe: null,

  fetchNoticias: async (pagina = 1) => {
    set((s) => ({ noticias: { ...s.noticias, loading: true, error: null } }));
    try {
      const res = await api.noticias.list(pagina);
      set({ noticias: { items: res.data, currentPage: res.meta.current_page, lastPage: res.meta.last_page, loading: false, error: null } });
    } catch (e) {
      set((s) => ({ noticias: { ...s.noticias, loading: false, error: String(e) } }));
    }
  },

  fetchNoticiaDetalhe: async (slug) => {
    set({ noticiaDetalhe: null });
    try {
      const res = await api.noticias.get(slug);
      set({ noticiaDetalhe: res.data });
    } catch {
      set({ noticiaDetalhe: null });
    }
  },
}));
