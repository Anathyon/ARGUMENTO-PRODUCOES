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
} from "lucide-react";
import logo from "@/assets/logo.png";
import hero from "@/assets/hero.jpg";
import artePalha from "@/assets/arte-na-palha.jpg";
import natalSertao from "@/assets/natal-sertao.jpg";
import { Layout } from "@/components/Layout";
import { Avatar } from "@/components/Avatar";
import { TEAM_MEMBERS, NEWS_DATABASE } from "@/data";

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

export const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "trabalhos", label: "Trabalhos" },
  { id: "equipe", label: "Equipe" },
  { id: "portfolio", label: "Portfólio" },
  { id: "institucional", label: "Institucional" },
  { id: "noticias", label: "Notícias" },
  { id: "contato", label: "Contato" },
] as const;

const PRODUCTIONS = [
  {
    title: "Arte na Palha",
    logline:
      "Em uma vila esquecida do sertão, dois irmãos descobrem que tecer palha pode reescrever o destino da própria família.",
    tag: "Curta-metragem · Animação 2D",
    img: artePalha,
    color: "#F38615",
  },
  {
    title: "Um Natal no Sertão",
    logline:
      "Uma noite mágica transforma a caatinga em palco para um milagre simples, contado por estrelas e violas.",
    tag: "Especial · Animação 2D",
    img: natalSertao,
    color: "#F7511D",
  },
] as const;

const TEAM = [
  { name: "Diretor(a) Geral", role: "Direção" },
  { name: "Roteirista Chefe", role: "Argumento" },
  { name: "Diretor(a) de Arte", role: "Arte e Design" },
  { name: "Animador(a) Principal", role: "Animação 2D" },
  { name: "Produtor(a) Executivo", role: "Produção" },
  { name: "Designer de Som", role: "Trilha e Som" },
] as const;

const PORTFOLIO_ITEMS = [
  { title: "Arte na Palha", year: "2024", type: "Curta · Animação", festival: "Festival de Gramado", portfolioId: "portfolio-arte-na-palha" },
  { title: "Um Natal no Sertão", year: "2023", type: "Especial · Animação", festival: "Mostra Cinesertão", portfolioId: "portfolio-um-natal-no-sertao" },
  { title: "Projeto Em Desenvolvimento", year: "2026", type: "Longa · Animação", festival: "—", portfolioId: "portfolio-projeto-desenvolvimento" },
  { title: "Microcuriosidades", year: "2022", type: "Série Web", festival: "—", portfolioId: "portfolio-microcuriosidades" },
] as const;

const INSTITUTION_VALUES = [
  {
    title: "Missão",
    text: "Produzir animações e narrativas que valorizam a cultura, a memória e a imaginação brasileira — com qualidade artística e responsabilidade social.",
  },
  {
    title: "Visão",
    text: "Ser referência nacional em animação autoral e produção audiovisual, conectando o sertão ao mundo através de histórias universais.",
  },
  {
    title: "Valores",
    text: "Autenticidade, colaboração, excelência técnica, respeito à diversidade e amor por contar boas histórias.",
  },
] as const;



/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export default function HomePage() {
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
/* Nav                                                                  */
/* ------------------------------------------------------------------ */

function Nav({ scrolled, active }: { scrolled: boolean; active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-cream/85 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3 group" aria-label="Argumento Produções — Início">
          <img src={logo} alt="Argumento Produções" className="h-11 w-11 object-contain" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display font-black text-lg tracking-tight">Argumento</div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-brand-ink/60">Produções</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="relative px-4 py-2 text-sm font-medium text-brand-ink/75 hover:text-brand-ink transition-colors"
              aria-current={active === n.id ? "page" : undefined}
            >
              {n.label}
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-butter"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden lg:inline-flex items-center gap-2 rounded-full bg-brand-ink text-brand-cream text-sm font-semibold px-5 py-2.5 hover:bg-brand-orange transition-colors"
        >
          Fale conosco <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>

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
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium border-b border-black/5"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
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
        <div className="absolute inset-0 bg-gradient-to-b from-brand-butter/30 via-brand-cream/40 to-brand-cream" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/40 to-transparent" />
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

const MARQUEE_ITEMS = ["Animação", "Narrativa", "Roteiro", "Sertão", "Cultura", "Direção", "Produção", "Identidade"];

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

function Trabalhos() {
  return (
    <section id="trabalhos" className="relative py-28 lg:py-40 bg-brand-cream" aria-label="Trabalhos em destaque">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel icon={<Film className="h-3.5 w-3.5" aria-hidden="true" />} label="Em destaque" />
        <SectionTitle>
          Produções <span className="italic text-gradient-warm">que marcam</span>.
        </SectionTitle>
        <div className="mt-20 space-y-32">
          {PRODUCTIONS.map((p, i) => (
            <ProductionRow key={p.title} prod={p} reverse={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductionRow({
  prod,
  reverse,
  index,
}: {
  prod: typeof PRODUCTIONS[number];
  reverse: boolean;
  index: number;
}) {
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
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="lg:col-span-7 relative group">
        <motion.div
          style={{ y }}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-brand-butter will-change-transform"
        >
          <img
            src={prod.img}
            alt={prod.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent" />
          <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-brand-cream/95 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: prod.color }} aria-hidden="true" />
            Trailer disponível
          </div>
          <button
            className="absolute inset-0 grid place-items-center"
            aria-label={`Assistir trailer de ${prod.title}`}
          >
            <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-cream/90 backdrop-blur shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="h-6 w-6 fill-brand-ink text-brand-ink ml-1" aria-hidden="true" />
            </span>
          </button>
        </motion.div>
      </div>

      <div className="lg:col-span-5">
        <div className="text-7xl font-display font-black text-brand-butter leading-none mb-4" aria-hidden="true">
          0{index + 1}
        </div>
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange mb-4">
          {prod.tag}
        </div>
        <h3 className="font-display text-4xl lg:text-6xl font-black leading-[0.95] tracking-tight mb-6">
          {prod.title}
        </h3>
        <p className="text-lg text-brand-ink/75 leading-relaxed mb-8">{prod.logline}</p>
        <a
          href="#portfolio"
          className="inline-flex items-center gap-2 font-semibold border-b-2 border-brand-ink pb-1 hover:border-brand-orange hover:text-brand-orange transition-colors"
        >
          Ficha técnica completa
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </motion.div>
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl bg-brand-cream hover:bg-brand-ink hover:text-brand-cream transition-all duration-500 cursor-default"
            >
              {/* Avatar */}
              <div className="h-20 w-20 rounded-full overflow-hidden ring-4 ring-brand-butter group-hover:ring-brand-orange transition-all mb-5 flex-shrink-0">
                <Avatar name={m.name} seed={m.avatarSeed} />
              </div>
              {/* Info */}
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange mb-1">
                {m.role}
              </div>
              <div className="font-display text-xl font-black leading-tight">
                {m.name}
              </div>
              <p className="mt-3 text-sm opacity-60 leading-relaxed line-clamp-2">
                {m.bio}
              </p>
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
  return (
    <section id="portfolio" className="py-28 lg:py-40 bg-brand-cream" aria-label="Portfólio">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel icon={<Film className="h-3.5 w-3.5" aria-hidden="true" />} label="Vitrine" />
        <SectionTitle>
          Portfólio <span className="italic text-gradient-warm">completo</span>.
        </SectionTitle>

        <div className="mt-16 border-t border-brand-ink/15" role="list" aria-label="Lista de projetos">
          {PORTFOLIO_ITEMS.map((p, i) => (
            <motion.div
              key={p.title}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                to={`/portfolio/${p.portfolioId}`}
                className="group grid grid-cols-12 gap-4 items-center py-8 border-b border-brand-ink/15 hover:bg-brand-butter/50 px-4 -mx-4 rounded-xl transition-colors"
                aria-label={`${p.title} — ${p.type}, ${p.year}`}
              >
                <div className="col-span-1 text-xs text-brand-ink/50 font-mono" aria-hidden="true">
                  0{i + 1}
                </div>
                <div className="col-span-12 md:col-span-5 font-display text-2xl md:text-4xl font-black tracking-tight group-hover:text-brand-orange transition-colors">
                  {p.title}
                </div>
                <div className="col-span-6 md:col-span-3 text-sm text-brand-ink/70">{p.type}</div>
                <div className="col-span-4 md:col-span-2 text-sm text-brand-ink/70">{p.festival}</div>
                <div className="col-span-2 md:col-span-1 flex justify-end items-center gap-2 font-semibold">
                  {p.year}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
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
              className="relative p-8 rounded-3xl bg-brand-cream/[0.04] border border-brand-cream/10 backdrop-blur hover:bg-brand-cream/[0.07] transition-colors"
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

function Noticias() {
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

        <div className="grid md:grid-cols-3 gap-6">
          {NEWS_DATABASE.slice(0, 3).map((n, i) => (
            <motion.article
              key={n.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                to={`/noticias/${n.id}`}
                className="group flex flex-col h-full p-7 rounded-3xl bg-brand-cream hover:bg-brand-ink hover:text-brand-cream transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-8">
                  <time className="font-mono opacity-60" dateTime={n.date}>{n.date}</time>
                  <span className="px-3 py-1 rounded-full bg-brand-orange text-brand-cream font-bold">
                    {n.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-black leading-tight mb-4 flex-1">{n.title}</h3>
                <p className="text-sm leading-relaxed opacity-75 mb-6">{n.excerpt}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold">
                  Ler matéria
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contato                                                              */
/* ------------------------------------------------------------------ */

function Contato() {
  return (
    <section
      id="contato"
      className="relative py-28 lg:py-40 bg-brand-cream overflow-hidden"
      aria-label="Contato"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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

            <div className="mt-12 space-y-4">
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-brand-orange via-brand-ember to-brand-ink p-1 glow-orange">
              <div className="w-full h-full rounded-[2.85rem] bg-brand-ink p-10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-grain opacity-30" aria-hidden="true" />
                <div className="relative">
                  <img src={logo} alt="" role="presentation" className="h-14 w-14 mb-6" />
                  <div className="font-display text-3xl font-black text-brand-cream leading-tight">
                    Argumento <br />
                    <span className="text-gradient-warm italic">Produções</span>
                  </div>
                </div>
                <div className="relative space-y-6">
                  <p className="text-brand-cream/70 text-sm leading-relaxed">
                    Estúdio de animação e produção audiovisual. Empresa parceira da Narrativa Entretenimento.
                  </p>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-brand-butter">
                    <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" aria-hidden="true" />
                    Aceitando novos projetos · 2026
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-cream py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <div className="font-display font-black text-7xl md:text-9xl leading-none tracking-tighter">
              <span className="text-gradient-warm italic">Argumento</span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.4em] text-brand-cream/50">
              Produções · Animação · Narrativa
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-4 text-sm text-brand-cream/60">
            <nav className="flex gap-6" aria-label="Links do rodapé">
              {NAV_ITEMS.slice(1).map((n) => (
                <a key={n.id} href={`#${n.id}`} className="hover:text-brand-orange transition-colors">
                  {n.label}
                </a>
              ))}
            </nav>
            <small>© {new Date().getFullYear()} Argumento Produções. Todos os direitos reservados.</small>
          </div>
        </div>
      </div>
    </footer>
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
