import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useAppStore } from "@/store/useAppStore";

const TAG_COLORS: Record<string, string> = {
  Web: "bg-brand-orange text-brand-cream",
  Lançamento: "bg-brand-orange text-brand-cream",
  Bastidores: "bg-brand-butter text-brand-ink",
  "Em produção": "bg-brand-ember text-brand-cream",
  Social: "bg-brand-ink text-brand-cream",
};

function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-brand-orange font-mono text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="font-display font-black text-5xl md:text-7xl mb-6">Notícia não encontrada.</h1>
        <Link
          to="/noticias"
          className="inline-flex items-center gap-2 rounded-full bg-brand-ink text-brand-cream font-semibold px-6 py-3 hover:bg-brand-orange transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para Notícias
        </Link>
      </div>
    </Layout>
  );
}

function formatarData(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function NoticiaDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { noticiaDetalhe, fetchNoticiaDetalhe, noticias, fetchNoticias } = useAppStore();

  useEffect(() => {
    if (slug) fetchNoticiaDetalhe(slug);
    // Carrega lista para o sidebar de outras notícias (se ainda não carregada)
    if (noticias.items.length === 0) fetchNoticias(1);
  }, [slug, fetchNoticiaDetalhe, fetchNoticias, noticias.items.length]);

  if (!noticiaDetalhe && slug) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-24 animate-pulse space-y-8">
          <div className="h-5 w-24 bg-brand-ink/10 rounded" />
          <div className="h-14 w-3/4 bg-brand-ink/10 rounded-xl" />
          <div className="h-4 w-full bg-brand-ink/10 rounded" />
        </div>
      </Layout>
    );
  }

  if (!noticiaDetalhe) return <NotFound />;

  const item = noticiaDetalhe;
  const tagClass = TAG_COLORS[item.categoria] ?? "bg-brand-ink text-brand-cream";

  // Outras notícias para o sidebar (exclui a atual)
  const outras = noticias.items.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <Layout>
      <article>
        {/* Cabeçalho */}
        <div className="bg-brand-butter border-b border-brand-ink/10 pt-10 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-brand-ink/60 hover:text-brand-ink text-sm font-semibold transition-colors mb-10"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>

            <div className="max-w-3xl">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${tagClass}`}>
                {item.categoria}
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-display font-black text-4xl md:text-6xl tracking-tight leading-[0.95] mb-8"
              >
                {item.titulo}
              </motion.h1>

              <div className="flex flex-wrap gap-6 text-sm text-brand-ink/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={item.data}>{formatarData(item.data)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" aria-hidden="true" />
                  {item.autor}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Imagem de capa */}
        {item.capa?.url && (
          <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-10">
            <div className="aspect-16/7 rounded-3xl overflow-hidden">
              <img
                src={item.capa.url}
                alt={item.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Corpo */}
        <div className="bg-brand-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-3 gap-16">
            {/* Conteúdo do artigo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <p className="text-lg text-brand-ink/70 leading-relaxed font-medium mb-8 border-l-4 border-brand-orange pl-6 italic">
                {item.resumo}
              </p>

              {/* Renderiza HTML seguro vindo da API */}
              {item.conteudo_html ? (
                <div
                  className="prose prose-lg max-w-none text-brand-ink/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.conteudo_html }}
                />
              ) : null}

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
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

              {/* Autor */}
              <div className="mt-16 p-6 rounded-2xl bg-brand-butter flex items-center gap-5">
                <div className="h-14 w-14 rounded-full bg-brand-ink grid place-items-center font-display font-black text-brand-cream text-lg shrink-0">
                  {item.autor.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-ink/50 mb-1">Escrito por</div>
                  <div className="font-semibold text-lg">{item.autor}</div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar: outras notícias */}
            {outras.length > 0 && (
              <motion.aside
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-1"
                aria-label="Outras notícias"
              >
                <h2 className="font-display font-black text-xl mb-6">Outras notícias</h2>
                <div className="space-y-5">
                  {outras.map((n) => {
                    const tc = TAG_COLORS[n.categoria] ?? "bg-brand-ink text-brand-cream";
                    return (
                      <Link
                        key={n.id}
                        to={`/noticias/${n.slug}`}
                        className="group block p-5 rounded-2xl border border-brand-ink/10 hover:border-brand-orange hover:bg-brand-butter/50 transition-colors"
                      >
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 ${tc}`}>
                          {n.categoria}
                        </span>
                        <h3 className="font-display font-black text-base leading-tight group-hover:text-brand-orange transition-colors">
                          {n.titulo}
                        </h3>
                        <time className="text-xs text-brand-ink/50 mt-2 block">{formatarData(n.data)}</time>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-8">
                  <Link
                    to="/noticias"
                    className="inline-flex items-center gap-2 font-semibold text-sm border-b-2 border-brand-ink pb-1 hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    Ver todas as notícias
                  </Link>
                </div>
              </motion.aside>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
}
