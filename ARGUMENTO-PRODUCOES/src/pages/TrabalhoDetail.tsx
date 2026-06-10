import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Play, Clock, Award, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useAppStore } from "@/store/useAppStore";

function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-brand-orange font-mono text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="font-display font-black text-5xl md:text-7xl mb-6">Produção não encontrada.</h1>
        <Link
          to="/trabalhos"
          className="inline-flex items-center gap-2 rounded-full bg-brand-ink text-brand-cream font-semibold px-6 py-3 hover:bg-brand-orange transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para Trabalhos
        </Link>
      </div>
    </Layout>
  );
}

export default function TrabalhoDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { trabalhoDetalhe, fetchTrabalhoDetalhe } = useAppStore();

  useEffect(() => {
    if (slug) fetchTrabalhoDetalhe(slug);
  }, [slug, fetchTrabalhoDetalhe]);

  // Enquanto carrega (detalhe é null e não houve erro ainda)
  if (!trabalhoDetalhe && slug) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-24 animate-pulse space-y-8">
          <div className="h-5 w-24 bg-brand-ink/10 rounded" />
          <div className="aspect-video rounded-3xl bg-brand-ink/10 w-full" />
          <div className="h-12 w-2/3 bg-brand-ink/10 rounded-xl" />
        </div>
      </Layout>
    );
  }

  if (!trabalhoDetalhe) return <NotFound />;

  const item = trabalhoDetalhe;

  return (
    <Layout>
      <article className="bg-brand-cream">
        {/* Banner */}
        <div className="relative w-full aspect-video overflow-hidden bg-brand-ink">
          {item.capa?.url ? (
            <img
              src={item.capa.url}
              alt={item.titulo}
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-brand-ink" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />

          {/* Botão de trailer (abre URL se disponível) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {item.trailer_url ? (
              <motion.a
                href={item.trailer_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="group flex flex-col items-center gap-4"
                aria-label={`Assistir trailer de ${item.titulo}`}
              >
                <span className="grid h-24 w-24 place-items-center rounded-full bg-brand-cream/90 backdrop-blur shadow-2xl group-hover:bg-brand-orange transition-colors">
                  <Play className="h-8 w-8 fill-brand-ink text-brand-ink ml-1 group-hover:fill-brand-cream group-hover:text-brand-cream transition-colors" aria-hidden="true" />
                </span>
                <span className="text-brand-cream text-sm font-semibold tracking-widest uppercase">
                  Assistir trailer
                </span>
              </motion.a>
            ) : null}
          </div>

          {/* Voltar */}
          <div className="absolute top-6 left-6 lg:left-10">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-brand-cream/80 hover:text-brand-cream text-sm font-semibold bg-brand-ink/30 backdrop-blur px-4 py-2 rounded-full transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>
          </div>

          {/* Meta */}
          <div className="absolute bottom-0 inset-x-0 p-8 lg:p-12">
            <div className="max-w-5xl mx-auto">
              {item.categoria && (
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange mb-3">
                  {item.categoria}
                </div>
              )}
              <h1 className="font-display font-black text-5xl md:text-7xl text-brand-cream tracking-tight leading-[0.95]">
                {item.titulo}
              </h1>
              <div className="flex flex-wrap gap-6 mt-4 text-brand-cream/70 text-sm">
                {item.ano && (
                  <span className="flex items-center gap-1.5">
                    <Award className="h-4 w-4" aria-hidden="true" /> {item.ano}
                  </span>
                )}
                {item.duracao && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" aria-hidden="true" /> {item.duracao}
                  </span>
                )}
                {item.diretor && (
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" aria-hidden="true" /> Dir. {item.diretor}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-3 gap-16">
          {/* Sinopse */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h2 className="font-display font-black text-3xl mb-6">Sinopse</h2>
            <p className="text-brand-ink/75 leading-relaxed text-lg">
              {item.sinopse ?? item.resumo}
            </p>

            {item.festival && (
              <div className="mt-10 p-6 rounded-2xl bg-brand-butter border border-brand-orange/20">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1">
                  Exibição em
                </div>
                <div className="font-display font-black text-2xl">{item.festival}</div>
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-brand-butter text-xs font-semibold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Ficha técnica */}
          {item.creditos && item.creditos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <h2 className="font-display font-black text-2xl mb-6">Ficha Técnica</h2>
              <ul className="space-y-5">
                {item.creditos.map((c) => (
                  <li key={c.funcao} className="border-b border-brand-ink/10 pb-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-brand-ink/50 mb-1">
                      {c.funcao}
                    </div>
                    <div className="font-semibold">{c.nome}</div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-10 pb-24">
          <Link
            to="/trabalhos"
            className="inline-flex items-center gap-2 font-semibold border-b-2 border-brand-ink pb-1 hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Ver todas as produções
          </Link>
        </div>
      </article>
    </Layout>
  );
}
