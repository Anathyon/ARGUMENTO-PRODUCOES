/**
 * Unit tests for the Argumento Produções HomePage.
 *
 * Strategy: render the full page and assert that all critical sections,
 * navigation anchors, ARIA landmarks, and key brand copy are present in
 * the DOM. Motion animations are mocked so tests run synchronously.
 */

import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import HomePage, { NAV_ITEMS, SectionLabel, SectionTitle } from "../pages/Home";

// ─── Mocks ───────────────────────────────────────────────────────────────────

// Mock framer-motion / motion so animations don't error in jsdom
vi.mock("motion/react", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const passthrough = (tag: string) => ({ children, ...rest }: any) => {
    // Strip all motion-specific props before passing to DOM element
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      initial, animate, exit, transition, variants,
      whileInView, whileHover, whileTap, whileFocus,
      viewport, layoutId, style, onAnimationStart,
      onAnimationComplete, ...domProps
    } = rest;
    /* eslint-enable @typescript-eslint/no-unused-vars */
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

// Mock image imports (Vite asset imports return module default)
vi.mock("../assets/logo.png", () => ({ default: "/logo.png" }));
vi.mock("../assets/hero.jpg", () => ({ default: "/hero.jpg" }));
vi.mock("../assets/arte-na-palha.jpg", () => ({ default: "/arte-na-palha.jpg" }));
vi.mock("../assets/natal-sertao.jpg", () => ({ default: "/natal-sertao.jpg" }));

// Mock IntersectionObserver (unavailable in jsdom)
beforeAll(() => {
  const mockObserver = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
  vi.stubGlobal("IntersectionObserver", vi.fn(() => mockObserver));
});

// ─── Helper ──────────────────────────────────────────────────────────────────

function renderPage() {
  return render(<HomePage />);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("HomePage — structural integrity", () => {
  it("renders without crashing", () => {
    expect(() => renderPage()).not.toThrow();
  });

  it("has exactly one <h1>", () => {
    renderPage();
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it("renders the sr-only 'Histórias' text inside h1", () => {
    renderPage();
    const h1 = screen.getByRole("heading", { level: 1 });
    // The h1 accessible text includes both the sr-only "Histórias" and "que respiram."
    expect(h1.textContent).toMatch(/histórias/i);
  });

  it("renders the italic hero subtitle inside h1", () => {
    renderPage();
    const h1 = screen.getByRole("heading", { level: 1 });
    // The span "que respiram." is INSIDE the h1 — search within it
    expect(within(h1).getByText(/que respiram/i)).toBeInTheDocument();
  });

  it("renders the hero description paragraph", () => {
    renderPage();
    expect(
      screen.getByText(/animação, narrativa e identidade nordestina/i)
    ).toBeInTheDocument();
  });
});

describe("HomePage — navigation", () => {
  it("renders the desktop nav with all items", () => {
    renderPage();
    const nav = screen.getByRole("navigation", { name: /navegação principal/i });
    NAV_ITEMS.forEach(({ label }) => {
      expect(within(nav).getByText(label)).toBeInTheDocument();
    });
  });

  it("renders the 'Fale conosco' CTA link pointing to #contato", () => {
    renderPage();
    const cta = screen.getByRole("link", { name: /fale conosco/i });
    expect(cta).toHaveAttribute("href", "#contato");
  });

  it("renders footer nav links (excluding Início)", () => {
    renderPage();
    const footer = screen.getByRole("contentinfo");
    const footerNav = within(footer).getByRole("navigation", { name: /links do rodapé/i });
    NAV_ITEMS.slice(1).forEach(({ label }) => {
      expect(within(footerNav).getByText(label)).toBeInTheDocument();
    });
  });
});

describe("HomePage — sections", () => {
  it("renders the Hero section landmark", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /início/i })).toBeInTheDocument();
  });

  it("renders the Trabalhos section", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /trabalhos em destaque/i })).toBeInTheDocument();
  });

  it("renders both production titles as h3 headings", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: /^arte na palha$/i, level: 3 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /^um natal no sertão$/i, level: 3 })
    ).toBeInTheDocument();
  });

  it("renders 'Assistir trailer' buttons for each production", () => {
    renderPage();
    const trailerButtons = screen.getAllByRole("button", { name: /assistir trailer/i });
    expect(trailerButtons).toHaveLength(2);
  });

  it("renders the Equipe section", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /equipe/i })).toBeInTheDocument();
  });

  it("renders team member roles scoped inside the Equipe section", () => {
    renderPage();
    const equipe = screen.getByRole("region", { name: /equipe/i });
    // Use getAllByText inside the section — roles should appear exactly once each
    expect(within(equipe).getAllByText("Direção")).toHaveLength(1);
    expect(within(equipe).getAllByText("Animação 2D")).toHaveLength(1);
    expect(within(equipe).getAllByText("Produção")).toHaveLength(1);
  });

  it("renders the Portfólio section", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /portfólio/i })).toBeInTheDocument();
  });

  it("renders all 4 portfolio items in a list", () => {
    renderPage();
    const list = screen.getByRole("list", { name: /lista de projetos/i });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(4);
  });

  it("renders portfolio item titles", () => {
    renderPage();
    expect(screen.getByText("Microcuriosidades")).toBeInTheDocument();
    expect(screen.getByText("Projeto Em Desenvolvimento")).toBeInTheDocument();
  });

  it("renders the Institucional section with Missão/Visão/Valores headings", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /institucional/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /missão/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /visão/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /valores/i, level: 3 })).toBeInTheDocument();
  });

  it("renders the Notícias section with 3 articles", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /notícias/i })).toBeInTheDocument();
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(3);
  });

  it("renders news article headings", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: /arte na palha estreia em mostra/i, level: 3 })
    ).toBeInTheDocument();
  });

  it("renders the Contato section with email link", () => {
    renderPage();
    expect(screen.getByRole("region", { name: /contato/i })).toBeInTheDocument();
    const emailLink = screen.getByRole("link", {
      name: /contato@argumentoproducoes\.com\.br/i,
    });
    expect(emailLink).toHaveAttribute("href", "mailto:contato@argumentoproducoes.com.br");
  });

  it("renders social media links (Instagram and YouTube)", () => {
    renderPage();
    expect(
      screen.getByRole("link", { name: /instagram da argumento/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /youtube da argumento/i })
    ).toBeInTheDocument();
  });
});

describe("HomePage — footer", () => {
  it("renders contentinfo landmark", () => {
    renderPage();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows copyright with current year inside <small>", () => {
    renderPage();
    const footer = screen.getByRole("contentinfo");
    const small = footer.querySelector("small");
    expect(small).not.toBeNull();
    expect(small?.textContent).toMatch(new RegExp(new Date().getFullYear().toString()));
    expect(small?.textContent).toMatch(/argumento produções/i);
  });
});

describe("SectionLabel helper", () => {
  it("renders the label text", () => {
    render(<SectionLabel icon={<span data-testid="icon" />} label="Em destaque" />);
    expect(screen.getByText("Em destaque")).toBeInTheDocument();
  });

  it("applies light styles when dark is false (default)", () => {
    const { container } = render(
      <SectionLabel icon={<span />} label="Vitrine" />
    );
    expect(container.firstChild).toHaveClass("bg-brand-ink");
  });

  it("applies dark styles when dark=true", () => {
    const { container } = render(
      <SectionLabel icon={<span />} label="Institucional" dark />
    );
    expect(container.firstChild).toHaveClass("bg-brand-cream/10");
  });
});

describe("SectionTitle helper", () => {
  it("renders children inside an h2", () => {
    render(<SectionTitle>Portfólio completo.</SectionTitle>);
    expect(
      screen.getByRole("heading", { name: /portfólio completo/i, level: 2 })
    ).toBeInTheDocument();
  });

  it("applies dark text color when dark=true", () => {
    const { container } = render(
      <SectionTitle dark>Quem somos</SectionTitle>
    );
    expect(container.firstChild).toHaveClass("text-brand-cream");
  });
});
