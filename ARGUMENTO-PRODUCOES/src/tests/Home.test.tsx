/**
 * Testes unitários da HomePage.
 *
 * Estratégia: mockar a store Zustand e o roteador para isolar o componente.
 * Dados da API são simulados via mock da store — sem chamadas reais de rede.
 */

import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomePage, { SectionLabel, SectionTitle } from "../pages/Home";

// ─── Mock da store Zustand ────────────────────────────────────────────────────

const mockFetchTrabalhos = vi.fn();
const mockFetchNoticias = vi.fn();
const mockFetchPortfolio = vi.fn();

const storeDefaults = {
  trabalhos: { items: [], loading: false, error: null, currentPage: 1, lastPage: 1 },
  portfolio:  { items: [], loading: false, error: null, currentPage: 1, lastPage: 1 },
  noticias:   { items: [], loading: false, error: null, currentPage: 1, lastPage: 1 },
  fetchTrabalhos: mockFetchTrabalhos,
  fetchNoticias:  mockFetchNoticias,
  fetchPortfolio: mockFetchPortfolio,
};

// Permite sobrescrever partes do estado por teste
let storeOverride: Record<string, unknown> = {};

vi.mock("../store/useAppStore", () => ({
  useAppStore: (selector?: (s: typeof storeDefaults) => unknown) => {
    const state = { ...storeDefaults, ...storeOverride };
    return selector ? selector(state as typeof storeDefaults) : state;
  },
}));

// ─── Mock motion/react ────────────────────────────────────────────────────────

vi.mock("motion/react", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const passthrough = (tag: string) => ({ children, style, ...rest }: any) => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      initial, animate, exit, transition, variants, whileInView,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      whileHover, whileTap, viewport, layoutId, onAnimationStart,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onAnimationComplete, ...domProps
    } = rest;
    return React.createElement(tag, { style, ...domProps }, children);
  };
  return {
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_: object, tag: string) => passthrough(tag),
    }),
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: (_: unknown, __: unknown, output: number[]) => output[0],
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// ─── Mock de assets ───────────────────────────────────────────────────────────

vi.mock("../assets/logo.png",          () => ({ default: "/logo.png" }));
vi.mock("../assets/hero.jpg",          () => ({ default: "/hero.jpg" }));
vi.mock("../assets/arte-na-palha.jpg", () => ({ default: "/arte.jpg" }));
vi.mock("../assets/natal-sertao.jpg",  () => ({ default: "/natal.jpg" }));

// ─── Stubs globais ────────────────────────────────────────────────────────────

beforeAll(() => {
  vi.stubGlobal("IntersectionObserver", vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })));
});

beforeEach(() => {
  storeOverride = {};
  vi.clearAllMocks();
});

// ─── Helper ──────────────────────────────────────────────────────────────────

function renderPage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

// ─── Testes ──────────────────────────────────────────────────────────────────

describe("HomePage — estrutura", () => {
  it("renderiza sem erros", () => {
    expect(() => renderPage()).not.toThrow();
  });

  it("chama fetchTrabalhos, fetchNoticias e fetchPortfolio ao montar", () => {
    renderPage();
    expect(mockFetchTrabalhos).toHaveBeenCalledWith(1);
    expect(mockFetchNoticias).toHaveBeenCalledWith(1);
    expect(mockFetchPortfolio).toHaveBeenCalledWith(1);
  });

  it("tem exatamente um <h1>", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("h1 contém 'Histórias'", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/histórias/i);
  });

  it("h1 contém 'que respiram'", () => {
    renderPage();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(within(h1).getByText(/que respiram/i)).toBeInTheDocument();
  });

  it("renderiza parágrafo de descrição hero", () => {
    renderPage();
    expect(screen.getByText(/animação, narrativa e identidade nordestina/i)).toBeInTheDocument();
  });
});

describe("HomePage — navegação", () => {
  it("renderiza nav principal com todos os itens", () => {
    renderPage();
    const nav = screen.getByRole("navigation", { name: /navegação principal/i });
    ["Início", "Trabalhos", "Equipe", "Portfólio", "Institucional", "Notícias", "Contato"].forEach(
      (label) => expect(within(nav).getByText(label)).toBeInTheDocument()
    );
  });

  it("link 'Fale conosco' aponta para /#contato", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /fale conosco/i })).toHaveAttribute("href", "/#contato");
  });

  it("footer tem nav com links (exceto Início)", () => {
    renderPage();
    const footer = screen.getByRole("contentinfo");
    const footerNav = within(footer).getByRole("navigation", { name: /links do rodapé/i });
    ["Trabalhos", "Equipe", "Portfólio", "Institucional", "Notícias", "Contato"].forEach(
      (label) => expect(within(footerNav).getByText(label)).toBeInTheDocument()
    );
  });
});

describe("HomePage — seção Trabalhos", () => {
  it("renderiza seção de trabalhos", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /trabalhos em destaque/i })).toBeInTheDocument();
  });

  it("exibe skeleton enquanto carrega", () => {
    storeOverride = { trabalhos: { items: [], loading: true, error: null, currentPage: 1, lastPage: 1 } };
    renderPage();
    // Skeleton: dois blocos animate-pulse
    const pulses = document.querySelectorAll(".animate-pulse");
    expect(pulses.length).toBeGreaterThan(0);
  });

  it("exibe mensagem vazia quando não há trabalhos", () => {
    renderPage();
    expect(screen.getByText(/nenhum trabalho disponível/i)).toBeInTheDocument();
  });

  it("renderiza cards de trabalhos vindos da store", () => {
    storeOverride = {
      trabalhos: {
        items: [
          { id: 1, slug: "filme-a", titulo: "Filme A", resumo: "Resumo A", categoria: "Curta" },
          { id: 2, slug: "filme-b", titulo: "Filme B", resumo: "Resumo B" },
        ],
        loading: false, error: null, currentPage: 1, lastPage: 1,
      },
    };
    renderPage();
    expect(screen.getByRole("heading", { name: /filme a/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /filme b/i, level: 3 })).toBeInTheDocument();
  });

  it("exibe no máximo 2 destaques mesmo com mais itens na store", () => {
    storeOverride = {
      trabalhos: {
        items: [1, 2, 3].map((n) => ({ id: n, slug: `filme-${n}`, titulo: `Filme ${n}`, resumo: "." })),
        loading: false, error: null, currentPage: 1, lastPage: 1,
      },
    };
    renderPage();
    // Apenas 2 links "Ficha técnica completa" devem aparecer na seção home
    const links = screen.getAllByText(/ficha técnica completa/i);
    expect(links).toHaveLength(2);
  });
});

describe("HomePage — seção Portfólio", () => {
  it("renderiza seção portfólio", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /portfólio/i })).toBeInTheDocument();
  });

  it("exibe mensagem vazia quando não há projetos", () => {
    renderPage();
    expect(screen.getByText(/nenhum projeto no portfólio/i)).toBeInTheDocument();
  });

  it("renderiza itens de portfólio vindos da store (máx 4)", () => {
    storeOverride = {
      portfolio: {
        items: [1, 2, 3, 4, 5].map((n) => ({
          id: n, slug: `projeto-${n}`, titulo: `Projeto ${n}`, resumo: ".",
        })),
        loading: false, error: null, currentPage: 1, lastPage: 1,
      },
    };
    renderPage();
    const list = screen.getByRole("list", { name: /lista de projetos/i });
    expect(within(list).getAllByRole("listitem")).toHaveLength(4);
  });
});

describe("HomePage — seção Notícias", () => {
  it("renderiza seção de notícias", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /notícias/i })).toBeInTheDocument();
  });

  it("exibe mensagem vazia quando não há notícias", () => {
    renderPage();
    expect(screen.getByText(/nenhuma notícia publicada/i)).toBeInTheDocument();
  });

  it("renderiza cards de notícias vindos da store (máx 3)", () => {
    storeOverride = {
      noticias: {
        items: [1, 2, 3, 4].map((n) => ({
          id: n, slug: `noticia-${n}`, titulo: `Notícia ${n}`,
          resumo: ".", autor: "Autor", data: "2026-01-01", categoria: "Lançamento", tags: [],
        })),
        loading: false, error: null, currentPage: 1, lastPage: 1,
      },
    };
    renderPage();
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });
});

describe("HomePage — seção Equipe", () => {
  it("renderiza seção equipe", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /equipe/i })).toBeInTheDocument();
  });

  it("renderiza todos os membros da equipe", () => {
    renderPage();
    const equipe = screen.getByRole("region", { name: /equipe/i });
    // Todos os membros têm role "Colaboradora" conforme data.ts
    expect(within(equipe).getAllByText("Colaboradora").length).toBeGreaterThanOrEqual(1);
    // Verifica que os nomes dos membros estão presentes (aparecem 2x: nome + hover)
    expect(within(equipe).getAllByText("Maria Eduarda").length).toBeGreaterThanOrEqual(1);
    expect(within(equipe).getAllByText("Gabriely Soares").length).toBeGreaterThanOrEqual(1);
  });
});

describe("HomePage — seção Institucional", () => {
  it("renderiza seção institucional com Missão/Visão/Valores", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /institucional/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /missão/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /visão/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /valores/i, level: 3 })).toBeInTheDocument();
  });
});

describe("HomePage — seção Contato", () => {
  it("renderiza seção contato", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /contato/i })).toBeInTheDocument();
  });

  it("link de e-mail correto", () => {
    renderPage();
    expect(
      screen.getByRole("link", { name: /contato@argumentoproducoes\.com\.br/i })
    ).toHaveAttribute("href", "mailto:contato@argumentoproducoes.com.br");
  });

  it("links de redes sociais presentes", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /instagram da argumento/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /youtube da argumento/i })).toBeInTheDocument();
  });
});

describe("HomePage — footer", () => {
  it("renderiza contentinfo", () => {
    renderPage();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("copyright com ano atual", () => {
    renderPage();
    const small = screen.getByRole("contentinfo").querySelector("small");
    expect(small?.textContent).toMatch(new RegExp(new Date().getFullYear().toString()));
    expect(small?.textContent).toMatch(/argumento produções/i);
  });
});

describe("SectionLabel", () => {
  it("renderiza o label", () => {
    render(<SectionLabel icon={<span />} label="Em destaque" />);
    expect(screen.getByText("Em destaque")).toBeInTheDocument();
  });

  it("estilo claro por padrão (dark=false)", () => {
    const { container } = render(<SectionLabel icon={<span />} label="x" />);
    expect(container.firstChild).toHaveClass("bg-brand-ink");
  });

  it("estilo escuro quando dark=true", () => {
    const { container } = render(<SectionLabel icon={<span />} label="x" dark />);
    expect(container.firstChild).toHaveClass("bg-brand-cream/10");
  });
});

describe("SectionTitle", () => {
  it("renderiza filhos em h2", () => {
    render(<SectionTitle>Portfólio completo.</SectionTitle>);
    expect(screen.getByRole("heading", { name: /portfólio completo/i, level: 2 })).toBeInTheDocument();
  });

  it("aplica cor clara quando dark=true", () => {
    const { container } = render(<SectionTitle dark>Quem somos</SectionTitle>);
    expect(container.firstChild).toHaveClass("text-brand-cream");
  });
});
