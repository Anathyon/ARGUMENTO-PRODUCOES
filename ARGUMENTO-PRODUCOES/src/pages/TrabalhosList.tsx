import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Film, ArrowUpRight, Play } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Pagination } from "@/components/Pagination";
import { DATABASE_ITEMS, useFetchData } from "@/data";

const PAGE_SIZE = 2;

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2].map((i) => (
        <div key={i} className="grid lg:grid-cols-12 gap-8 animate-pulse">
          <div className="lg:col-span-6 aspect-[4/3] rounded-3xl bg-brand-ink/10" />
          <div className="lg:col-span-6 flex flex-col justify-center gap-4">
            <div className="h-3 w-24 rounded-full bg-brand-ink/10" />
            <div className="h-10 w-3/4 rounded-xl bg-brand-ink/10" />
            <div className="h-4 w-full rounded bg-brand-ink/10" />
            <div className="h-4 w-5/6 rounded bg-brand-ink/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TrabalhosList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: items, loading } = useFetchData(
    () => DATABASE_ITEMS.filter((item) => item.type === "trabalho"),
    []
  );

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
        className="min-h-[70vh] py-24 lg:py-36 bg-brand-cream"
        aria-label="Trabalhos e Produções"
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
              <Film className="h-3.5 w-3.5" aria-hidden="true" />
              Animação Autoral
            </div>
            <h1 className="font-display font-black tracking-tighter leading-[0.95] text-5xl md:text-7xl lg:text-8xl max-w-4xl">
              Trabalhos &{" "}
              <span className="italic text-gradient-warm">Produções</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brand-ink/70 leading-relaxed">
              Cada obra nasce do compromisso em contar histórias que respiram a
              cultura e a memória do nosso povo.
            </p>
          </motion.div>

          {/* Content */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="space-y-24">
              {paginated.map((prod, i) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="lg:col-span-7 relative group">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-brand-butter">
                      <img
                        src={prod.img}
                        alt={prod.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent" />
                      <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-brand-cream/95 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                        <span
                          className="h-2 w-2 rounded-full animate-pulse"
                          style={{ background: prod.color }}
                          aria-hidden="true"
                        />
                        Trailer disponível
                      </div>
                      <Link
                        to={`/trabalhos/${prod.id}`}
                        className="absolute inset-0 grid place-items-center"
                        aria-label={`Ver detalhes de ${prod.title}`}
                      >
                        <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-cream/90 backdrop-blur shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 fill-brand-ink text-brand-ink ml-1" aria-hidden="true" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="lg:col-span-5">
                    <div
                      className="text-7xl font-display font-black leading-none mb-4"
                      style={{ color: prod.color + "33" }}
                      aria-hidden="true"
                    >
                      0{(currentPage - 1) * PAGE_SIZE + i + 1}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange mb-4">
                      {prod.tag}
                    </div>
                    <h2 className="font-display text-4xl lg:text-5xl font-black leading-[0.95] tracking-tight mb-6">
                      {prod.title}
                    </h2>
                    <p className="text-lg text-brand-ink/70 leading-relaxed mb-4">
                      {prod.logline}
                    </p>
                    {prod.year && (
                      <p className="text-sm text-brand-ink/50 mb-8">
                        {prod.year}
                        {prod.festival && prod.festival !== "—" ? ` · ${prod.festival}` : ""}
                        {prod.duration ? ` · ${prod.duration}` : ""}
                      </p>
                    )}
                    <Link
                      to={`/trabalhos/${prod.id}`}
                      className="inline-flex items-center gap-2 font-semibold border-b-2 border-brand-ink pb-1 hover:border-brand-orange hover:text-brand-orange transition-colors"
                    >
                      Ficha técnica completa
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              ))}
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
