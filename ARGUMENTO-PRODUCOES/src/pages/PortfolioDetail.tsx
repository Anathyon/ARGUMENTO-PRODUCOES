import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Award, Calendar, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { DATABASE_ITEMS, useFetchData } from "@/data";

function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-brand-orange font-mono text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="font-display font-black text-5xl md:text-7xl mb-6">Projeto não encontrado.</h1>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 rounded-full bg-brand-ink text-brand-cream font-semibold px-6 py-3 hover:bg-brand-orange transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para o Portfólio
        </Link>
      </div>
    </Layout>
  );
}

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: item, loading } = useFetchData(
    () => DATABASE_ITEMS.find((p) => p.id === id && p.type === "portfolio") ?? null,
    [id]
  );

  if (loading) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-24 animate-pulse space-y-8">
          <div className="h-5 w-24 bg-brand-ink/10 rounded" />
          <div className="aspect-[16/7] rounded-3xl bg-brand-ink/10 w-full" />
          <div className="h-12 w-2/3 bg-brand-ink/10 rounded-xl" />
        </div>
      </Layout>
    );
  }

  if (!item) return <NotFound />;

  return (
    <Layout>
      <article>
        {/* Top Nav */}
        <div className="pt-10 pb-6 bg-brand-cream border-b border-brand-ink/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-brand-ink/60 hover:text-brand-ink text-sm font-semibold transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para Portfólio
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/7] overflow-hidden bg-brand-butter">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, ${item.color}55 0%, transparent 60%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="bg-brand-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-3 gap-16">
            {/* Main */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange mb-4">
                {item.tag}
              </div>
              <h1 className="font-display font-black text-5xl md:text-7xl tracking-tight leading-[0.95] mb-8">
                {item.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-10 text-sm text-brand-ink/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" /> {item.year}
                </span>
                {item.festival && item.festival !== "—" && (
                  <span className="flex items-center gap-1.5">
                    <Award className="h-4 w-4" aria-hidden="true" /> {item.festival}
                  </span>
                )}
              </div>

              <h2 className="font-display font-black text-2xl mb-4">Sobre o projeto</h2>
              <p className="text-brand-ink/75 leading-relaxed text-lg">{item.synopsis}</p>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-1 space-y-10"
            >
              {/* Credits */}
              {item.credits && item.credits.length > 0 && (
                <div>
                  <h2 className="font-display font-black text-xl mb-5">Equipe</h2>
                  <ul className="space-y-4">
                    {item.credits.map((c) => (
                      <li key={c.role} className="border-b border-brand-ink/10 pb-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-brand-ink/50 mb-1">
                          {c.role}
                        </div>
                        <div className="font-semibold">{c.name}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related link to Trabalho */}
              <div className="p-6 rounded-2xl bg-brand-butter">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-ink/50 mb-3">
                  Ver produção completa
                </div>
                <Link
                  to={`/trabalhos/${item.id.replace("portfolio-", "")}`}
                  className="inline-flex items-center gap-2 font-semibold text-brand-ink hover:text-brand-orange transition-colors"
                >
                  Ir para Trabalhos
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="bg-brand-cream pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-semibold border-b-2 border-brand-ink pb-1 hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Ver portfólio completo
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
