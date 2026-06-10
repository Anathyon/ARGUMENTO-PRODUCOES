import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Newspaper, ArrowUpRight, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Pagination } from "@/components/Pagination";
import { useAppStore } from "@/store/useAppStore";

// Mapeamento de cor por categoria — extensível
const TAG_COLORS: Record<string, string> = {
  Web: "bg-brand-orange text-brand-cream",
  Lançamento: "bg-brand-orange text-brand-cream",
  Bastidores: "bg-brand-butter text-brand-ink",
  "Em produção": "bg-brand-ember text-brand-cream",
  Social: "bg-brand-ink text-brand-cream",
};

function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-7 rounded-3xl bg-brand-butter/50 animate-pulse space-y-4">
          <div className="h-3 w-20 bg-brand-ink/10 rounded" />
          <div className="h-7 w-full bg-brand-ink/10 rounded-xl" />
          <div className="h-4 w-full bg-brand-ink/10 rounded" />
        </div>
      ))}
    </div>
  );
}

// Formata a data ISO da API para leitura humana
function formatarData(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function NoticiasList() {
  const { noticias, fetchNoticias } = useAppStore();
  const { items, currentPage, lastPage, loading, error } = noticias;

  useEffect(() => {
    fetchNoticias(1);
  }, [fetchNoticias]);

  const handlePageChange = (page: number) => {
    fetchNoticias(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <section className="min-h-[70vh] py-24 lg:py-36 bg-brand-butter" aria-label="Notícias">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.25em] uppercase bg-brand-ink text-brand-butter mb-6">
              <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
              Diário do Estúdio
            </div>
            <h1 className="font-display font-black tracking-tighter leading-[0.95] text-5xl md:text-7xl lg:text-8xl max-w-4xl">
              Últimas <span className="italic text-gradient-warm">do estúdio</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brand-ink/70 leading-relaxed">
              Lançamentos, bastidores, premiações e projetos em andamento.
            </p>
          </motion.div>

          {loading && <LoadingSkeleton />}

          {error && (
            <p className="text-center text-brand-ink/60 py-20">
              Não foi possível carregar as notícias. Tente novamente.
            </p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="text-center text-brand-ink/60 py-20">
              Nenhuma notícia publicada ainda.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {items.map((n, i) => {
                const tagClass = TAG_COLORS[n.categoria] ?? "bg-brand-ink text-brand-cream";
                return (
                  <motion.article
                    key={n.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group"
                  >
                    <Link
                      to={`/noticias/${n.slug}`}
                      className="flex flex-col h-full p-7 rounded-3xl bg-brand-cream hover:bg-brand-ink hover:text-brand-cream transition-all duration-500"
                      aria-label={n.titulo}
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-8">
                        <time className="font-mono opacity-60" dateTime={n.data}>
                          {formatarData(n.data)}
                        </time>
                        <span className={`px-3 py-1 rounded-full font-bold ${tagClass}`}>
                          {n.categoria}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-black leading-tight mb-4 flex-1">
                        {n.titulo}
                      </h2>
                      <p className="text-sm leading-relaxed opacity-75 mb-6">{n.resumo}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs opacity-50">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {n.autor}
                        </span>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold">
                          Ler matéria
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
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
