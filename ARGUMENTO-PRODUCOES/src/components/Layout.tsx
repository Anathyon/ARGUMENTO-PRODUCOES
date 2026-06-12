import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";

export const NAV_ITEMS = [
  { id: "inicio", label: "Início", path: "/#inicio" },
  { id: "trabalhos", label: "Trabalhos", path: "/trabalhos" },
  { id: "equipe", label: "Equipe", path: "/#equipe" },
  { id: "portfolio", label: "Portfólio", path: "/portfolio" },
  { id: "institucional", label: "Institucional", path: "/#institucional" },
  { id: "noticias", label: "Notícias", path: "/noticias" },
  { id: "contato", label: "Contato", path: "/#contato" },
] as const;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine active item based on current route
  const getActiveId = () => {
    const path = location.pathname;
    if (path.startsWith("/trabalhos")) return "trabalhos";
    if (path.startsWith("/portfolio")) return "portfolio";
    if (path.startsWith("/noticias")) return "noticias";
    
    // For homepage hashes
    const hash = location.hash;
    if (hash) {
      const match = NAV_ITEMS.find((n) => n.path === `/${hash}`);
      if (match) return match.id;
    }
    return "inicio";
  };

  const activeId = getActiveId();

  return (
    <div className="min-h-screen bg-brand-cream text-brand-ink flex flex-col overflow-x-clip">
      {/* Navigation Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-brand-cream/85 backdrop-blur-xl border-b border-black/5"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Argumento Produções — Início">
            <img src={logo} alt="Argumento Produções" className="h-11 w-11 object-contain" />
            <div className="hidden sm:block leading-tight">
              <div className="font-display font-black text-lg tracking-tight">Argumento</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-brand-ink/60">Produções</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
            {NAV_ITEMS.map((n) => {
              const isExternal = n.path.startsWith("/#");
              const isActive = activeId === n.id;
              
              if (isExternal) {
                return (
                  <a
                    key={n.id}
                    href={n.path}
                    className="relative px-4 py-2 text-sm font-medium text-brand-ink/75 hover:text-brand-ink transition-colors"
                  >
                    {n.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-butter"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </a>
                );
              }

              return (
                <Link
                  key={n.id}
                  to={n.path}
                  className="relative px-4 py-2 text-sm font-medium text-brand-ink/75 hover:text-brand-ink transition-colors"
                  aria-current={isActive ? "page" : undefined}
                >
                  {n.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-butter"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/#contato"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-brand-ink text-brand-cream text-sm font-semibold px-5 py-2.5 hover:bg-brand-orange hover:text-brand-cream transition-colors"
          >
            Fale conosco <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 rounded-md"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">{open ? "Fechar" : "Menu"}</span>
            <div className="space-y-1.5" aria-hidden="true">
              <span className={`block h-0.5 w-6 bg-brand-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-brand-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-brand-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-brand-cream border-t border-black/5 overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col gap-1" aria-label="Navegação mobile">
              {NAV_ITEMS.map((n) => {
                const isExternal = n.path.startsWith("/#");
                if (isExternal) {
                  return (
                    <a
                      key={n.id}
                      href={n.path}
                      onClick={() => setOpen(false)}
                      className="py-3 text-base font-medium border-b border-black/5 block"
                    >
                      {n.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={n.id}
                    to={n.path}
                    onClick={() => setOpen(false)}
                    className="py-3 text-base font-medium border-b border-black/5 block"
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content Area */}
      <main className="grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-ink text-brand-cream py-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <Link to="/" className="font-display font-black text-7xl md:text-9xl leading-none tracking-tighter hover:opacity-95 transition-opacity">
                <span className="text-gradient-warm italic">Argumento</span>
              </Link>
              <div className="mt-2 text-xs uppercase tracking-[0.4em] text-brand-cream/50">
                Produções · Animação · Narrativa
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-4 text-sm text-brand-cream/60">
              <nav className="flex gap-6" aria-label="Links do rodapé">
                {NAV_ITEMS.slice(1).map((n) => {
                  const isExternal = n.path.startsWith("/#");
                  if (isExternal) {
                    return (
                      <a key={n.id} href={n.path} className="hover:text-brand-orange transition-colors">
                        {n.label}
                      </a>
                    );
                  }
                  return (
                    <Link key={n.id} to={n.path} className="hover:text-brand-orange transition-colors">
                      {n.label}
                    </Link>
                  );
                })}
              </nav>
              <small>© {new Date().getFullYear()} Argumento Produções. Todos os direitos reservados.</small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
