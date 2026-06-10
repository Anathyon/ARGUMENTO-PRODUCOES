import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Film, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Pagination } from "@/components/Pagination";
import { useAppStore } from "@/store/useAppStore";

function LoadingSkeleton() {
  return (
    <div className="space-y-0 border-t border-brand-ink/15">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse grid grid-cols-12 gap-4 items-center py-8 border-b border-brand-ink/15 px-4">
          <div className="col-span-1 h-4 w-6 bg-brand-ink/10 rounded" />
          <div className="col-span-5 h-8 bg-brand-ink/10 rounded-xl" />
          <div className="col-span-3 h-4 bg-brand-ink/10 rounded" />
          <div className="col-span-2 h-4 bg-brand-ink/10 rounded" />
          <div className="col-span-1 h-4 bg-brand-ink/10 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function PortfolioList() {
  const { portfolio, fetchPortfolio, fetchPortfolioFiltros } = useAppStore();
  const { items, currentPage, lastPage, loading, error } = portfolio;

  useEffect(() => {
    fetchPortfolio(1);
    fetchPortfolioFiltros();
  }, [fetchPortfolio, fetchPortfolioFiltros]);

  const handlePageChange = (page: number) => {
    fetchPortfolio(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <section className="min-h-[70vh] py-24 lg:py-36 bg-brand-cream" aria-label="Portfólio">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.25em] uppercase bg-brand-ink text-brand-butter mb-6">
              <Film className="h-3.5 w-3.5" aria-hidden="true" />
              Vitrine
            </div>
            <h1 className="font-display font-black tracking-tighter leading-[0.95] text-5xl md:text-7xl lg:text-8xl max-w-4xl">
              Portfólio <span className="italic text-gradient-warm">completo</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brand-ink/70 leading-relaxed">
              A trajetória completa do estúdio em obras que marcaram festivais,
              plataformas digitais e o imaginário do público.
            </p>
          </motion.div>

          {/* Cabeçalho da tabela */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-brand-ink/20 text-xs font-bold uppercase tracking-widest text-brand-ink/40 px-4">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Projeto</div>
            <div className="col-span-3">Categoria</div>
            <div className="col-span-2">Festival</div>
            <div className="col-span-1 text-right">Ano</div>
          </div>

          {loading && <LoadingSkeleton />}

          {error && (
            <p className="text-center text-brand-ink/60 py-20">
              Não foi possível carregar o portfólio. Tente novamente.
            </p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="text-center text-brand-ink/60 py-20">
              Nenhum projeto cadastrado ainda.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="border-t border-brand-ink/15" role="list" aria-label="Lista de projetos do portfólio">
              {items.map((p, i) => (
                <motion.div
                  key={p.id}
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link
                    to={`/portfolio/${p.slug}`}
                    className="group grid grid-cols-12 gap-4 items-center py-8 border-b border-brand-ink/15 hover:bg-brand-butter/50 px-4 -mx-4 rounded-xl transition-colors"
                    aria-label={`${p.titulo} — ${p.categoria ?? ""}, ${p.ano ?? ""}`}
                  >
                    <div className="col-span-1 text-xs text-brand-ink/50 font-mono" aria-hidden="true">
                      0{(currentPage - 1) * 6 + i + 1}
                    </div>
                    <div className="col-span-12 md:col-span-5 font-display text-2xl md:text-4xl font-black tracking-tight group-hover:text-brand-orange transition-colors">
                      {p.titulo}
                    </div>
                    <div className="col-span-6 md:col-span-3 text-sm text-brand-ink/70">
                      {p.categoria ?? "—"}
                    </div>
                    <div className="col-span-4 md:col-span-2 text-sm text-brand-ink/70">
                      {p.festival ?? "—"}
                    </div>
                    <div className="col-span-2 md:col-span-1 flex justify-end items-center gap-2 font-semibold">
                      {p.ano ?? "—"}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && lastPage > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}
