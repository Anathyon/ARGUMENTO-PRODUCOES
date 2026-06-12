import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Mail,
  Instagram,
  Youtube,
  ArrowUpRight,
  Film,
  Users,
  Newspaper,
  Sparkles,
  ChevronDown,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { z } from "zod";
import hero from "@/assets/hero.jpg";
import { Layout } from "@/components/Layout";
import { TEAM_MEMBERS, MARQUEE_ITEMS, INSTITUTION_VALUES } from "@/data";
import { useAppStore } from "@/store/useAppStore";
import type { ApiTrabalho } from "@/lib/api";

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  // Carrega dados ao entrar na home
  const { fetchTrabalhos, fetchNoticias, fetchPortfolio } = useAppStore();

  useEffect(() => {
    fetchTrabalhos(1);
    fetchNoticias(1);
    fetchPortfolio(1);
  }, [fetchTrabalhos, fetchNoticias, fetchPortfolio]);

  return (
    <Layout>
      <Hero />
      <Marquee />
      <Trabalhos />
      <Equipe />
      <Portfolio />
      <Institucional />
      <Noticias />
      <Contato />
    </Layout>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Início"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <img src={hero} alt="" role="presentation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-brand-butter/30 via-brand-cream/40 to-brand-cream" />
        <div className="absolute inset-0 bg-linear-to-r from-brand-cream via-brand-cream/40 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full bg-brand-butter px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-brand-ink mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />
          Estúdio de Animação Brasileiro
        </motion.div>

        <h1 className="font-display font-black tracking-tighter leading-[0.92] text-[14vw] sm:text-[10vw] lg:text-[8.5rem] max-w-5xl">
          {"Histórias".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block will-change-transform"
              aria-hidden="true"
            >
              {c}
            </motion.span>
          ))}
          <span className="sr-only">Histórias</span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block italic text-gradient-warm will-change-transform"
          >
            que respiram.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-10 max-w-xl text-lg text-brand-ink/75 leading-relaxed"
        >
          Animação, narrativa e identidade nordestina. Produzimos filmes que
          celebram a cultura, a memória e a imaginação do nosso povo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#trabalhos"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-ink text-brand-cream font-semibold px-7 py-4 hover:bg-brand-orange transition-all hover:scale-[1.02]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-orange group-hover:bg-brand-ink transition-colors">
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            </span>
            Ver produções
          </a>
          <a
            href="#institucional"
            className="inline-flex items-center gap-2 font-semibold text-brand-ink hover:text-brand-orange transition-colors"
          >
            Sobre o estúdio
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-6 lg:left-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-brand-ink/50"
          aria-hidden="true"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
          Role para explorar
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                              */
/* ------------------------------------------------------------------ */

function Marquee() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="bg-brand-ink text-brand-butter py-6 overflow-hidden border-y-4 border-brand-orange"
      aria-hidden="true"
    >
      <div className="flex marquee gap-12 whitespace-nowrap">
        {repeated.map((it, i) => (
          <div key={i} className="flex items-center gap-12 font-display text-3xl md:text-4xl italic">
            {it}
            <span className="text-brand-orange">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trabalhos                                                            */
/* ------------------------------------------------------------------ */

function TrabalhoRow({ prod, index }: { prod: ApiTrabalho; index: number; currentPage: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
        index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="lg:col-span-7 relative group">
        <motion.div
          style={{ y }}
          className="relative aspect-4/3 rounded-3xl overflow-hidden bg-brand-butter will-change-transform"
        >
          {prod.capa?.url ? (
            <img
              src={prod.capa.url}
              alt={prod.titulo}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-butter/50">
              <Film className="h-16 w-16 text-brand-ink/20" aria-hidden="true" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-brand-ink/60 via-transparent" />
          {prod.trailer_url && (
            <a
              href={prod.trailer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 grid place-items-center"
              aria-label={`Assistir trailer de ${prod.titulo}`}
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-cream/90 backdrop-blur shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="h-6 w-6 fill-brand-ink text-brand-ink ml-1" aria-hidden="true" />
              </span>
            </a>
          )}
        </motion.div>
      </div>

      <div className="lg:col-span-5">
        <div className="text-7xl font-display font-black text-brand-butter leading-none mb-4" aria-hidden="true">
          0{index + 1}
        </div>
        {prod.categoria && (
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange mb-4">
            {prod.categoria}
          </div>
        )}
        <h3 className="font-display text-4xl lg:text-6xl font-black leading-[0.95] tracking-tight mb-6">
          {prod.titulo}
        </h3>
        <p className="text-lg text-brand-ink/75 leading-relaxed mb-8">{prod.resumo}</p>
        <Link
          to={`/trabalhos/${prod.slug}`}
          className="inline-flex items-center gap-2 font-semibold border-b-2 border-brand-ink pb-1 hover:border-brand-orange hover:text-brand-orange transition-colors"
        >
          Ficha técnica completa
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}

function Trabalhos() {
  const { trabalhos } = useAppStore();
  const { items, loading } = trabalhos;

  // Exibe até 2 destaques na home
  const destaques = items.slice(0, 2);

  return (
    <section id="trabalhos" className="relative py-28 lg:py-40 bg-brand-cream" aria-label="Trabalhos em destaque">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel icon={<Film className="h-3.5 w-3.5" aria-hidden="true" />} label="Em destaque" />
        <SectionTitle>
          Produções <span className="italic text-gradient-warm">que marcam</span>.
        </SectionTitle>

        {loading && (
          <div className="mt-20 space-y-16">
            {[1, 2].map((i) => (
              <div key={i} className="grid lg:grid-cols-12 gap-8 animate-pulse">
                <div className="lg:col-span-7 aspect-4/3 rounded-3xl bg-brand-ink/10" />
                <div className="lg:col-span-5 flex flex-col justify-center gap-4">
                  <div className="h-3 w-24 rounded-full bg-brand-ink/10" />
                  <div className="h-10 w-3/4 rounded-xl bg-brand-ink/10" />
                  <div className="h-4 w-full rounded bg-brand-ink/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && destaques.length === 0 && (
          <p className="mt-20 text-brand-ink/50 text-center">Nenhum trabalho disponível no momento.</p>
        )}

        {!loading && destaques.length > 0 && (
          <div className="mt-20 space-y-32">
            {destaques.map((prod, i) => (
              <TrabalhoRow key={prod.id} prod={prod} index={i} currentPage={1} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/trabalhos"
            className="inline-flex items-center gap-2 rounded-full bg-brand-ink text-brand-cream font-semibold px-6 py-3 hover:bg-brand-orange transition-colors"
          >
            Ver todas as produções <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Equipe                                                               */
/* ------------------------------------------------------------------ */

function Equipe() {
  return (
    <section id="equipe" className="relative py-28 lg:py-40 bg-brand-butter bg-grain" aria-label="Equipe">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <SectionLabel icon={<Users className="h-3.5 w-3.5" aria-hidden="true" />} label="Quem faz" />
            <SectionTitle>
              Um time que <span className="italic text-gradient-warm">cria junto</span>.
            </SectionTitle>
          </div>
          <p className="max-w-md text-brand-ink/75 leading-relaxed">
            Direção, roteiro, animação e produção sob o mesmo teto. Conheça os
            colaboradores que dão vida às nossas histórias.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 lg:gap-8">
          {TEAM_MEMBERS.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden bg-brand-ink cursor-default shadow-lg"
            >
              {/* Foto */}
              <div className="aspect-3/4 overflow-hidden">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  // Fallback com gradiente + iniciais quando não há foto
                  <div className="w-full h-full bg-linear-to-br from-brand-orange to-brand-ember flex items-center justify-center">
                    <span className="font-display font-black text-5xl text-brand-cream">
                      {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                )}
                {/* Gradiente de baixo para cima sobre a foto */}
                <div className="absolute inset-0 bg-linear-to-t from-brand-ink via-brand-ink/40 to-transparent" />
              </div>

              {/* Nome e cargo sobrepostos na parte inferior */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="font-display font-black text-lg leading-tight text-brand-cream mb-1">
                  {m.name}
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {m.role}
                </div>
              </div>

              {/* Bio aparece no hover */}
              <div className="absolute inset-0 bg-brand-ink/90 flex flex-col justify-center items-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="font-display font-black text-xl text-brand-cream mb-2">{m.name}</div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange mb-4">{m.role}</div>
                <p className="text-sm text-brand-cream/75 leading-relaxed">{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio                                                            */
/* ------------------------------------------------------------------ */

function Portfolio() {
  const { portfolio } = useAppStore();
  const { items, loading } = portfolio;
  const destaques = items.slice(0, 4);

  return (
    <section id="portfolio" className="py-28 lg:py-40 bg-brand-cream" aria-label="Portfólio">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel icon={<Film className="h-3.5 w-3.5" aria-hidden="true" />} label="Vitrine" />
        <SectionTitle>
          Portfólio <span className="italic text-gradient-warm">completo</span>.
        </SectionTitle>

        {loading && (
          <div className="mt-16 space-y-0 border-t border-brand-ink/15">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse grid grid-cols-12 gap-4 py-8 border-b border-brand-ink/15">
                <div className="col-span-1 h-4 bg-brand-ink/10 rounded" />
                <div className="col-span-5 h-8 bg-brand-ink/10 rounded-xl" />
                <div className="col-span-3 h-4 bg-brand-ink/10 rounded" />
                <div className="col-span-3 h-4 bg-brand-ink/10 rounded" />
              </div>
            ))}
          </div>
        )}

        {!loading && destaques.length === 0 && (
          <p className="mt-16 text-brand-ink/50 text-center">Nenhum projeto no portfólio ainda.</p>
        )}

        {!loading && destaques.length > 0 && (
          <div className="mt-16 border-t border-brand-ink/15" role="list" aria-label="Lista de projetos">
            {destaques.map((p, i) => (
              <motion.div
                key={p.id}
                role="listitem"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to={`/portfolio/${p.slug}`}
                  className="group grid grid-cols-12 gap-4 items-center py-8 border-b border-brand-ink/15 hover:bg-brand-butter/50 px-4 -mx-4 rounded-xl transition-colors"
                  aria-label={`${p.titulo} — ${p.categoria ?? ""}, ${p.ano ?? ""}`}
                >
                  <div className="col-span-1 text-xs text-brand-ink/50 font-mono" aria-hidden="true">
                    0{i + 1}
                  </div>
                  <div className="col-span-12 md:col-span-5 font-display text-2xl md:text-4xl font-black tracking-tight group-hover:text-brand-orange transition-colors">
                    {p.titulo}
                  </div>
                  <div className="col-span-6 md:col-span-3 text-sm text-brand-ink/70">{p.categoria ?? "—"}</div>
                  <div className="col-span-4 md:col-span-2 text-sm text-brand-ink/70">{p.festival ?? "—"}</div>
                  <div className="col-span-2 md:col-span-1 flex justify-end items-center gap-2 font-semibold">
                    {p.ano ?? "—"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-semibold border-b-2 border-brand-ink pb-1 hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            Ver portfólio completo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Institucional                                                        */
/* ------------------------------------------------------------------ */

function Institucional() {
  return (
    <section
      id="institucional"
      className="relative py-28 lg:py-40 bg-brand-ink text-brand-cream overflow-hidden"
      aria-label="Institucional"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, #F38615 0%, transparent 40%), radial-gradient(circle at 80% 70%, #F7511D 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel icon={<Sparkles className="h-3.5 w-3.5" aria-hidden="true" />} label="Institucional" dark />
        <SectionTitle dark>
          Quem somos, <span className="italic text-gradient-warm">o que nos move</span>.
        </SectionTitle>

        <div className="mt-12 max-w-3xl text-lg text-brand-cream/75 leading-relaxed">
          <p>
            A <strong className="text-brand-butter">Argumento Produções</strong> é um estúdio dedicado à
            animação e à produção audiovisual brasileira. Empresa parceira da Narrativa Entretenimento
            — mas com identidade, time e portfólio próprios — buscamos contar histórias que respiram
            o nosso país, do sertão à tela.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {INSTITUTION_VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-8 rounded-3xl bg-brand-cream/4 border border-brand-cream/10 backdrop-blur hover:bg-brand-cream/7 transition-colors"
            >
              <div className="font-mono text-xs text-brand-orange mb-6" aria-hidden="true">/ 0{i + 1}</div>
              <h3 className="font-display text-3xl font-black mb-4">{v.title}</h3>
              <p className="text-brand-cream/70 leading-relaxed text-[15px]">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Notícias                                                             */
/* ------------------------------------------------------------------ */

const TAG_COLORS: Record<string, string> = {
  Web: "bg-brand-orange text-brand-cream",
  Lançamento: "bg-brand-orange text-brand-cream",
  Bastidores: "bg-brand-butter text-brand-ink",
  "Em produção": "bg-brand-ember text-brand-cream",
  Social: "bg-brand-ink text-brand-cream",
};

function Noticias() {
  const { noticias } = useAppStore();
  const { items, loading } = noticias;
  const destaques = items.slice(0, 3);

  return (
    <section id="noticias" className="py-28 lg:py-40 bg-brand-butter" aria-label="Notícias">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <SectionLabel icon={<Newspaper className="h-3.5 w-3.5" aria-hidden="true" />} label="Diário" />
            <SectionTitle>
              Últimas <span className="italic text-gradient-warm">do estúdio</span>.
            </SectionTitle>
          </div>
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 font-semibold border-b-2 border-brand-ink pb-1 hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            Todas as notícias <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-7 rounded-3xl bg-brand-cream/50 animate-pulse space-y-4">
                <div className="h-3 w-20 bg-brand-ink/10 rounded" />
                <div className="h-7 w-full bg-brand-ink/10 rounded-xl" />
                <div className="h-4 w-full bg-brand-ink/10 rounded" />
              </div>
            ))}
          </div>
        )}

        {!loading && destaques.length === 0 && (
          <p className="text-brand-ink/50 text-center py-10">Nenhuma notícia publicada ainda.</p>
        )}

        {!loading && destaques.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {destaques.map((n, i) => {
              const tagClass = TAG_COLORS[n.categoria] ?? "bg-brand-ink text-brand-cream";
              return (
                <motion.article
                  key={n.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <Link
                    to={`/noticias/${n.slug}`}
                    className="group flex flex-col h-full p-7 rounded-3xl bg-brand-cream hover:bg-brand-ink hover:text-brand-cream transition-all duration-500"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-8">
                      <time className="font-mono opacity-60" dateTime={n.data}>
                        {new Date(n.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                      </time>
                      <span className={`px-3 py-1 rounded-full font-bold ${tagClass}`}>
                        {n.categoria}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-black leading-tight mb-4 flex-1">{n.titulo}</h3>
                    <p className="text-sm leading-relaxed opacity-75 mb-6">{n.resumo}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold">
                      Ler matéria
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contato                                                              */
/* ------------------------------------------------------------------ */

// Schema Zod para o formulário de contato
const contatoSchema = z.object({
  nome:     z.string().min(2, "Nome deve ter ao menos 2 caracteres."),
  email:    z.string().email("E-mail inválido."),
  assunto:  z.string().min(3, "Informe o assunto."),
  mensagem: z.string().min(10, "Mensagem deve ter ao menos 10 caracteres."),
});

type ContatoForm = z.infer<typeof contatoSchema>;
type FormStatus = "idle" | "success" | "error";

function ContatoFormulario() {
  const [fields, setFields] = useState<ContatoForm>({ nome: "", email: "", assunto: "", mensagem: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContatoForm, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Limpa o erro do campo ao editar
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contatoSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContatoForm;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // Simula envio — substituir por chamada real à API quando disponível
    setStatus("success");
    setFields({ nome: "", email: "", assunto: "", mensagem: "" });
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="h-14 w-14 text-brand-orange" aria-hidden="true" />
        <h3 className="font-display font-black text-2xl">Mensagem enviada!</h3>
        <p className="text-brand-ink/65 max-w-xs">Em breve entraremos em contato. Obrigado pelo interesse!</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold underline underline-offset-4 hover:text-brand-orange transition-colors"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const inputClass = (field: keyof ContatoForm) =>
    `w-full rounded-xl border px-4 py-3 text-sm bg-brand-cream text-brand-ink placeholder:text-brand-ink/40 outline-none transition-colors focus:border-brand-orange ${
      errors[field] ? "border-red-400" : "border-brand-ink/20"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Formulário de contato">
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Não foi possível enviar. Tente novamente.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input
            name="nome" value={fields.nome} onChange={handleChange}
            placeholder="Seu nome" className={inputClass("nome")}
            aria-label="Nome" aria-describedby={errors.nome ? "err-nome" : undefined}
          />
          {errors.nome && <p id="err-nome" className="mt-1 text-xs text-red-500">{errors.nome}</p>}
        </div>
        <div>
          <input
            name="email" type="email" value={fields.email} onChange={handleChange}
            placeholder="Seu e-mail" className={inputClass("email")}
            aria-label="E-mail" aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && <p id="err-email" className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div>
        <select
          name="assunto" value={fields.assunto} onChange={handleChange}
          className={inputClass("assunto")}
          aria-label="Assunto"
        >
          <option value="">Assunto</option>
          <option value="Parceria">Parceria</option>
          <option value="Projeto">Projeto</option>
          <option value="Imprensa">Imprensa</option>
          <option value="Festival">Festival</option>
          <option value="Outro">Outro</option>
        </select>
        {errors.assunto && <p className="mt-1 text-xs text-red-500">{errors.assunto}</p>}
      </div>

      <div>
        <textarea
          name="mensagem" value={fields.mensagem} onChange={handleChange}
          placeholder="Sua mensagem..." rows={5}
          className={`${inputClass("mensagem")} resize-none`}
          aria-label="Mensagem"
        />
        {errors.mensagem && <p className="mt-1 text-xs text-red-500">{errors.mensagem}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-brand-ink text-brand-cream font-semibold py-3.5 hover:bg-brand-orange transition-colors"
      >
        Enviar mensagem
      </button>
    </form>
  );
}

function Contato() {
  return (
    <section
      id="contato"
      className="relative py-28 lg:py-40 bg-brand-cream overflow-hidden"
      aria-label="Contato"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Lado esquerdo: info + redes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel icon={<Mail className="h-3.5 w-3.5" aria-hidden="true" />} label="Contato" />
            <h2 className="font-display text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter mt-6">
              Vamos criar <br />
              <span className="italic text-gradient-warm">algo juntos?</span>
            </h2>
            <p className="mt-8 text-lg text-brand-ink/75 leading-relaxed max-w-md">
              Parcerias, projetos, festivais ou imprensa — escreva pra gente. Adoramos histórias novas.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:contato@argumentoproducoes.com.br"
                className="group flex items-center justify-between p-5 rounded-2xl bg-brand-butter hover:bg-brand-ink hover:text-brand-butter transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  <span className="font-semibold">contato@argumentoproducoes.com.br</span>
                </div>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </a>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="group flex items-center justify-between p-5 rounded-2xl border-2 border-brand-ink hover:bg-brand-orange hover:border-brand-orange hover:text-brand-cream transition-colors"
                  aria-label="Instagram da Argumento Produções"
                >
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5" aria-hidden="true" />
                    <span className="font-semibold">Instagram</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  className="group flex items-center justify-between p-5 rounded-2xl border-2 border-brand-ink hover:bg-brand-ember hover:border-brand-ember hover:text-brand-cream transition-colors"
                  aria-label="YouTube da Argumento Produções"
                >
                  <div className="flex items-center gap-3">
                    <Youtube className="h-5 w-5" aria-hidden="true" />
                    <span className="font-semibold">YouTube</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Lado direito: formulário */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="bg-brand-butter rounded-3xl p-8 lg:p-10"
          >
            <h3 className="font-display font-black text-2xl mb-6">Mande uma mensagem</h3>
            <ContatoFormulario />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared helpers                                                       */
/* ------------------------------------------------------------------ */

export function SectionLabel({
  icon,
  label,
  dark = false,
}: {
  icon: React.ReactNode;
  label: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.25em] uppercase ${
        dark ? "bg-brand-cream/10 text-brand-butter" : "bg-brand-ink text-brand-butter"
      }`}
    >
      {icon}
      {label}
    </motion.div>
  );
}

export function SectionTitle({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`mt-6 font-display font-black tracking-tighter leading-[0.95] text-5xl md:text-7xl lg:text-8xl max-w-4xl ${
        dark ? "text-brand-cream" : "text-brand-ink"
      }`}
    >
      {children}
    </motion.h2>
  );
}
