import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Newspaper, ArrowUpRight, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Pagination } from "@/components/Pagination";
import { NEWS_DATABASE, useFetchData } from "@/data";

const PAGE_SIZE = 3;

const TAG_COLORS: Record<string, string> = {
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
          <div className="h-7 w-3/4 bg-brand-ink/10 rounded-xl" />
          <div className="h-4 w-full bg-brand-ink/10 rounded" />
          <div className="h-4 w-5/6 bg-brand-ink/10 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function NoticiasList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: items, loading } = useFetchData(() => NEWS_DATABASE, []);

  const totalPages = items ? Math.ceil(items.length / PAGE_SIZE) : 1;
  const paginated = items
    ? items.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <section
        className="min-h-[70vh] py-24 lg:py-36 bg-brand-butter"
        aria-label="Notícias"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Page Header */}
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
              Últimas{" "}
              <span className="italic text-gradient-warm">do estúdio</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brand-ink/70 leading-relaxed">
              Lançamentos, bastidores, premiações e projetos em andamento.
              Fique por dentro de tudo que acontece aqui.
            </p>
          </motion.div>

          {/* Content */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {paginated.map((n, i) => {
                const tagClass =
                  TAG_COLORS[n.tag] ?? "bg-brand-ink text-brand-cream";
                return (
                  <motion.article
                    key={n.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group"
                  >
                    <Link
                      to={`/noticias/${n.id}`}
                      className="flex flex-col h-full p-7 rounded-3xl bg-brand-cream hover:bg-brand-ink hover:text-brand-cream transition-all duration-500 cursor-pointer"
                      aria-label={n.title}
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-8">
                        <time className="font-mono opacity-60" dateTime={n.date}>
                          {n.date}
                        </time>
                        <span className={`px-3 py-1 rounded-full font-bold ${tagClass}`}>
                          {n.tag}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-black leading-tight mb-4 flex-1">
                        {n.title}
                      </h2>
                      <p className="text-sm leading-relaxed opacity-75 mb-6">
                        {n.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs opacity-50">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {n.readTime} de leitura
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

          {/* Pagination */}
          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}
