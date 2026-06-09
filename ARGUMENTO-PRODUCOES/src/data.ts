import { useState, useEffect } from "react";
import artePalha from "./assets/arte-na-palha.jpg";
import natalSertao from "./assets/natal-sertao.jpg";
import hero from "./assets/hero.jpg";

export interface ContentItem {
  id: string;
  title: string;
  type: "trabalho" | "portfolio";
  tag: string;
  logline: string;
  excerpt: string;
  img: string;
  color: string;
  year: string;
  festival?: string;
  synopsis: string;
  duration?: string;
  director?: string;
  credits?: { role: string; name: string }[];
}

export interface NewsItem {
  id: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarSeed: string; // Used to generate unique modern geometric SVG avatars
  bio: string;
}

// ─── Unified Database ─────────────────────────────────────────────────────────

export const DATABASE_ITEMS: ContentItem[] = [
  {
    id: "arte-na-palha",
    title: "Arte na Palha",
    type: "trabalho",
    tag: "Curta-metragem · Animação 2D",
    logline: "Em uma vila esquecida do sertão, dois irmãos descobrem que tecer palha pode reescrever o destino da própria família.",
    excerpt: "A história comovente de dois irmãos tecendo o futuro a partir das fibras de palha da carnaúba.",
    img: artePalha,
    color: "#F38615",
    year: "2024",
    festival: "Festival de Gramado",
    duration: "14 min",
    director: "Mariana Souza",
    synopsis: "Nas profundezas do semiárido cearense, a tradição do artesanato em palha de carnaúba é mais do que sustento; é uma linguagem de sobrevivência. Quando uma severa seca ameaça expulsar sua família de suas terras ancestrais, os irmãos Clara e Chico encontram em uma técnica esquecida de tecelagem uma forma de contar a história de seu povo e reescrever sua própria história.",
    credits: [
      { role: "Direção e Roteiro", name: "Mariana Souza" },
      { role: "Direção de Arte", name: "Sofia Mendes" },
      { role: "Animação Principal", name: "Matheus Silva" },
      { role: "Direção de Produção", name: "Beatriz Santos" },
      { role: "Trilha Sonora Original", name: "Thiago Costa" }
    ]
  },
  {
    id: "um-natal-no-sertao",
    title: "Um Natal no Sertão",
    type: "trabalho",
    tag: "Especial · Animação 2D",
    logline: "Uma noite mágica transforma a caatinga em palco para um milagre simples, contado por estrelas e violas.",
    excerpt: "Um especial de fim de ano emocionante que celebra o calor humano e a esperança no sertão profundo.",
    img: natalSertao,
    color: "#F7511D",
    year: "2023",
    festival: "Mostra Cinesertão",
    duration: "26 min",
    director: "Mariana Souza",
    synopsis: "Sob um céu estrelado que apenas o sertão pode revelar, uma pequena comunidade isolada da caatinga se prepara para a noite de Natal. Sem enfeites caros ou neve, eles redescobrem a verdadeira magia natalina através das histórias contadas ao som de violas, de encontros inesperados e de um milagre simples que floresce na terra seca.",
    credits: [
      { role: "Direção", name: "Mariana Souza" },
      { role: "Roteiro", name: "Lucas Rocha" },
      { role: "Direção de Arte", name: "Sofia Mendes" },
      { role: "Trilha e Desenho de Som", name: "Thiago Costa" },
      { role: "Produção Executiva", name: "Beatriz Santos" }
    ]
  },
  {
    id: "lendas-da-caatinga",
    title: "Lendas da Caatinga",
    type: "trabalho",
    tag: "Série animada · 5 Episódios",
    logline: "Criaturas mitológicas do folclore nordestino ganham vida sob uma ótica contemporânea e cheia de mistério.",
    excerpt: "Série que reconta mitos sertanejos clássicos com animação digital dinâmica e cores vibrantes.",
    img: hero,
    color: "#F38615",
    year: "2025",
    festival: "Pre-Estreia Exclusiva",
    duration: "5 x 11 min",
    director: "Lucas Rocha",
    synopsis: "Do protetor da mata Caipora às lendas das lagoas misteriosas, esta antologia em cinco partes reimagina as narrativas orais do sertão. Com foco em uma estética arrojada e trilha sonora contemporânea inspirada no pife e na música eletrônica, a série aproxima a mitologia tradicional de novas gerações de espectadores.",
    credits: [
      { role: "Direção Geral", name: "Lucas Rocha" },
      { role: "Direção de Arte", name: "Sofia Mendes" },
      { role: "Supervisão de Animação", name: "Matheus Silva" },
      { role: "Produção", name: "Beatriz Santos" }
    ]
  },
  // Portfolio items (can duplicate key works + expand with web series/development projects)
  {
    id: "portfolio-arte-na-palha",
    title: "Arte na Palha",
    type: "portfolio",
    tag: "Curta · Animação",
    logline: "Curta-metragem vencedor de prêmios de animação e roteiro original em festivais nacionais.",
    excerpt: "Ficha técnica e trajetória do multipremiado curta do estúdio.",
    img: artePalha,
    color: "#F38615",
    year: "2024",
    festival: "Festival de Gramado",
    synopsis: "Portfólio detalhado sobre a concepção visual, esboços iniciais e premiações recebidas pelo curta-metragem 'Arte na Palha'. Produzido ao longo de 14 meses com técnicas híbridas de animação.",
    credits: [
      { role: "Direção", name: "Mariana Souza" },
      { role: "Roteiro", name: "Lucas Rocha" }
    ]
  },
  {
    id: "portfolio-um-natal-no-sertao",
    title: "Um Natal no Sertão",
    type: "portfolio",
    tag: "Especial · Animação",
    logline: "Exibido em rede nacional e selecionado para importantes mostras de cinema regional.",
    excerpt: "Ficha técnica e análise estética do nosso especial natalino.",
    img: natalSertao,
    color: "#F7511D",
    year: "2023",
    festival: "Mostra Cinesertão",
    synopsis: "Documentação do projeto de produção e recepção pública do especial 'Um Natal no Sertão'. Destaca-se pelo inovador uso de paleta de cores inspiradas nas gravuras sertanejas tradicionais.",
    credits: [
      { role: "Direção", name: "Mariana Souza" },
      { role: "Trilha Sonora", name: "Thiago Costa" }
    ]
  },
  {
    id: "portfolio-projeto-desenvolvimento",
    title: "Projeto Em Desenvolvimento",
    type: "portfolio",
    tag: "Longa · Animação",
    logline: "Nosso primeiro longa-metragem está em fase de captação de recursos e desenvolvimento de roteiro.",
    excerpt: "Prévia de arte conceitual e sinopse do nosso projeto de longa-metragem.",
    img: hero,
    color: "#F38615",
    year: "2026",
    festival: "—",
    synopsis: "Um projeto épico que visa expandir o repertório visual do estúdio para o formato de longa-metragem comercial, preservando a identidade estética e temática regional que define o DNA da Argumento Produções.",
    credits: [
      { role: "Roteiro e Direção", name: "Lucas Rocha" },
      { role: "Direção de Arte", name: "Sofia Mendes" }
    ]
  },
  {
    id: "portfolio-microcuriosidades",
    title: "Microcuriosidades",
    type: "portfolio",
    tag: "Série Web",
    logline: "Série educativa de micro-animações sobre fatos históricos e geográficos do Nordeste.",
    excerpt: "Série de 12 episódios curtos distribuídos nas redes sociais e plataformas digitais.",
    img: artePalha,
    color: "#1D1D1D",
    year: "2022",
    festival: "—",
    synopsis: "Desenvolvida em parceria com canais de educação regional, esta série traz fatos curiosos e bem-humorados sobre o semiárido brasileiro em pílulas animadas de 1 minuto de alta performance digital.",
    credits: [
      { role: "Direção de Arte", name: "Sofia Mendes" },
      { role: "Animação", name: "Matheus Silva" },
      { role: "Produção", name: "Beatriz Santos" }
    ]
  },
  {
    id: "portfolio-identidades-sertanejas",
    title: "Identidades Sertanejas",
    type: "portfolio",
    tag: "Campanha Cultural",
    logline: "Série de vinhetas institucionais criadas para valorizar artistas populares regionais.",
    excerpt: "Identidades visuais e vinhetas com foco em gravuras animadas digitalmente.",
    img: natalSertao,
    color: "#F38615",
    year: "2021",
    festival: "Prêmio Câmera Nordeste",
    synopsis: "Campanha em animação baseada no traço de artistas de xilogravura locais. Unindo técnicas analógicas de desenho e processamento vetorial moderno.",
    credits: [
      { role: "Concepção", name: "Sofia Mendes" },
      { role: "Animação 2D", name: "Matheus Silva" }
    ]
  }
];

export const NEWS_DATABASE: NewsItem[] = [
  {
    id: "estreia-arte-na-palha",
    date: "26 Mai 2026",
    tag: "Lançamento",
    title: "Arte na Palha estreia em mostra nacional de animação",
    excerpt: "Nosso novo curta chega ao circuito com sessões especiais e bate-papo com a equipe criativa.",
    content: "É com imensa alegria que anunciamos a estreia de 'Arte na Palha' na 28ª Mostra Nacional de Animação. O filme, que aborda de forma sensível a relação entre arte e sobrevivência no sertão por meio do artesanato de palha, será exibido no bloco de curtas autorais no dia 15 de Junho, seguido de um painel especial de debate sobre animação e identidade regional com a diretora Mariana Souza e a diretora de arte Sofia Mendes. Venha celebrar a arte que respira com a gente!",
    author: "Assessoria Argumento",
    readTime: "3 min"
  },
  {
    id: "bastidores-paleta-natal",
    date: "12 Mai 2026",
    tag: "Bastidores",
    title: "Como construímos a paleta de Um Natal no Sertão",
    excerpt: "Uma imersão no processo de cor, luz e referências culturais por trás do especial de fim de ano.",
    content: "O especial 'Um Natal no Sertão' carrega uma identidade de cor muito específica: os tons de terracota da argila, o dourado do sol poente na vegetação seca, e o azul profundo das noites frias de dezembro. Neste post, a diretora de arte Sofia Mendes divide os bastidores do desenvolvimento da paleta de cores. Usando referências de mestres da pintura nordestina e a própria vivência na caatinga profunda, a equipe buscou traduzir em cores a dualidade entre o clima árido e o aconchego acolhedor do povo sertanejo.",
    author: "Sofia Mendes",
    readTime: "5 min"
  },
  {
    id: "novo-longa-pre-producao",
    date: "28 Abr 2026",
    tag: "Em produção",
    title: "Novo longa entra em fase de pré-produção",
    excerpt: "Projeto inédito promete expandir o universo narrativo do estúdio para o formato de longa-metragem.",
    content: "Depois do sucesso dos nossos curtas, a Argumento Produções dá seu passo mais ambicioso: o desenvolvimento de nosso primeiro longa-metragem de animação. O projeto, ainda mantido sob sigilo criativo, acaba de entrar na fase de pré-produção, que inclui o refinamento final do roteiro e os primeiros estudos de design de personagens. A produção planeja integrar talentos locais e técnicas avançadas de animação 2D digital para entregar uma obra de padrão internacional com alma 100% brasileira.",
    author: "Lucas Rocha",
    readTime: "4 min"
  },
  {
    id: "workshop-animacao-comunitaria",
    date: "15 Abr 2026",
    tag: "Social",
    title: "Argumento realiza oficinas de animação 2D gratuitas",
    excerpt: "Projeto visa incentivar a capacitação de jovens da região no mercado de animação digital.",
    content: "Em parceria com centros culturais locais, nossa equipe realizou uma série de oficinas introdutórias de animação 2D de forma totalmente gratuita. Durante três finais de semana, jovens tiveram a oportunidade de aprender os 12 princípios básicos da animação clássica, noções de design de personagens e práticas em softwares digitais modernos com o animador principal Matheus Silva. Acreditamos que a democratização técnica é essencial para que mais histórias sertanejas cheguem às telas.",
    author: "Beatriz Santos",
    readTime: "3 min"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "mariana-souza",
    name: "Mariana Souza",
    role: "Direção",
    avatarSeed: "mariana",
    bio: "Diretora e animadora dedicada a explorar a poética visual do cotidiano nordestino. Com mais de 10 anos de experiência em curtas autorais."
  },
  {
    id: "lucas-rocha",
    name: "Lucas Rocha",
    role: "Argumento",
    avatarSeed: "lucas",
    bio: "Roteirista apaixonado pelas tradições orais sertanejas. Traduz memórias de infância e contos clássicos em roteiros cinematográficos marcantes."
  },
  {
    id: "sofia-mendes",
    name: "Sofia Mendes",
    role: "Arte e Design",
    avatarSeed: "sofia",
    bio: "Ilustradora e diretora de arte. Constrói os universos gráficos e paletas cromáticas que conferem o estilo único de xilogravura moderna às produções."
  },
  {
    id: "matheus-silva",
    name: "Matheus Silva",
    role: "Animação 2D",
    avatarSeed: "matheus",
    bio: "Animador especializado em quadros fluidos e expressivos. Traduz sentimentos humanos em movimentos desenhados à mão com máxima sensibilidade."
  },
  {
    id: "beatriz-santos",
    name: "Beatriz Santos",
    role: "Produção",
    avatarSeed: "beatriz",
    bio: "Produtora executiva focada em conectar talentos e viabilizar projetos independentes com eficiência, dedicação e alcance de mercado."
  },
  {
    id: "thiago-costa",
    name: "Thiago Costa",
    role: "Trilha e Som",
    avatarSeed: "thiago",
    bio: "Compositor e sound designer. Desenvolve trilhas sonoras originais mesclando instrumentos regionais como pife e sanfona com texturas sonoras digitais."
  }
];

// ─── Custom Asynchronous Fetch Hook ───────────────────────────────────────────

export function useFetchData<T>(fetchFn: () => T, deps: unknown[] = []): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        const result = fetchFn();
        if (active) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Erro desconhecido ao carregar os dados.");
          setLoading(false);
        }
      }
    }, 450); // Simulated network request delay

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, deps);

  return { data, loading, error };
}
