// Dados de fallback temporários — exibidos quando a API estiver offline.
// Substituir por dados reais quando a API entrar em produção.

import type { ApiTrabalho, ApiPortfolio, ApiNoticia } from "@/lib/api";

export const FALLBACK_TRABALHOS: ApiTrabalho[] = [
  {
    id: 1,
    slug: "arte-na-palha",
    titulo: "Arte na Palha",
    resumo:
      "Em uma vila esquecida do sertão, dois irmãos descobrem que tecer palha pode reescrever o destino da própria família.",
    sinopse:
      "Nas profundezas do semiárido cearense, a tradição do artesanato em palha de carnaúba é mais do que sustento — é uma linguagem de sobrevivência. Quando uma severa seca ameaça expulsar sua família de suas terras ancestrais, os irmãos Clara e Chico encontram em uma técnica esquecida de tecelagem uma forma de contar a história de seu povo.",
    diretor: "Mariana Souza",
    duracao: "14 min",
    ano: "2024",
    festival: "Festival de Gramado",
    categoria: "Curta-metragem · Animação 2D",
    tags: ["animação", "sertão", "curta"],
    creditos: [
      { funcao: "Direção e Roteiro", nome: "Mariana Souza" },
      { funcao: "Direção de Arte", nome: "Sofia Mendes" },
      { funcao: "Animação Principal", nome: "Matheus Silva" },
      { funcao: "Produção", nome: "Beatriz Santos" },
    ],
  },
  {
    id: 2,
    slug: "um-natal-no-sertao",
    titulo: "Um Natal no Sertão",
    resumo:
      "Uma noite mágica transforma a caatinga em palco para um milagre simples, contado por estrelas e violas.",
    sinopse:
      "Sob um céu estrelado que apenas o sertão pode revelar, uma pequena comunidade isolada da caatinga se prepara para a noite de Natal. Sem enfeites caros ou neve, eles redescobrem a verdadeira magia natalina através das histórias contadas ao som de violas.",
    diretor: "Mariana Souza",
    duracao: "26 min",
    ano: "2023",
    festival: "Mostra Cinesertão",
    categoria: "Especial · Animação 2D",
    tags: ["animação", "natal", "sertão"],
    creditos: [
      { funcao: "Direção", nome: "Mariana Souza" },
      { funcao: "Roteiro", nome: "Lucas Rocha" },
      { funcao: "Trilha Sonora", nome: "Thiago Costa" },
    ],
  },
];

export const FALLBACK_PORTFOLIO: ApiPortfolio[] = [
  {
    id: 1,
    slug: "arte-na-palha",
    titulo: "Arte na Palha",
    resumo: "Curta-metragem premiado em festivais nacionais de animação.",
    sinopse:
      "Portfólio detalhado sobre a concepção visual, esboços iniciais e premiações recebidas pelo curta-metragem. Produzido ao longo de 14 meses com técnicas híbridas de animação.",
    ano: "2024",
    festival: "Festival de Gramado",
    categoria: "Curta · Animação",
    tags: ["animação 2D", "premiado"],
    creditos: [
      { funcao: "Direção", nome: "Mariana Souza" },
      { funcao: "Arte", nome: "Sofia Mendes" },
    ],
  },
  {
    id: 2,
    slug: "um-natal-no-sertao",
    titulo: "Um Natal no Sertão",
    resumo: "Especial exibido em rede nacional e selecionado para mostras de cinema regional.",
    sinopse:
      "Documentação do projeto de produção e recepção pública do especial. Destaca-se pelo uso inovador de paleta de cores inspiradas nas gravuras sertanejas.",
    ano: "2023",
    festival: "Mostra Cinesertão",
    categoria: "Especial · Animação",
    tags: ["animação 2D", "especial de TV"],
  },
  {
    id: 3,
    slug: "microcuriosidades",
    titulo: "Microcuriosidades",
    resumo: "Série educativa de micro-animações sobre fatos do Nordeste.",
    sinopse:
      "Série de 12 episódios curtos distribuídos nas redes sociais. Fatos curiosos sobre o semiárido em pílulas animadas de 1 minuto.",
    ano: "2022",
    categoria: "Série Web",
    tags: ["educativo", "série"],
  },
  {
    id: 4,
    slug: "projeto-em-desenvolvimento",
    titulo: "Projeto Em Desenvolvimento",
    resumo: "Nosso primeiro longa-metragem em fase de captação e desenvolvimento de roteiro.",
    sinopse:
      "Projeto épico que visa expandir o repertório visual do estúdio para o formato de longa-metragem comercial.",
    ano: "2026",
    categoria: "Longa · Animação",
    tags: ["em produção"],
  },
];

export const FALLBACK_NOTICIAS: ApiNoticia[] = [
  {
    id: 1,
    slug: "arte-na-palha-estreia-em-mostra",
    titulo: "Arte na Palha estreia em mostra nacional de animação",
    resumo:
      "Nosso novo curta chega ao circuito com sessões especiais e bate-papo com a equipe criativa.",
    autor: "Assessoria Argumento",
    data: new Date("2026-05-26").toISOString(),
    categoria: "Lançamento",
    tags: ["lançamento", "festival"],
    conteudo_html:
      "<p>É com imensa alegria que anunciamos a estreia de <strong>Arte na Palha</strong> na 28ª Mostra Nacional de Animação. O filme será exibido no bloco de curtas autorais, seguido de um painel especial de debate com a diretora Mariana Souza e a diretora de arte Sofia Mendes.</p><p>Venha celebrar a arte que respira com a gente!</p>",
  },
  {
    id: 2,
    slug: "bastidores-paleta-natal",
    titulo: "Como construímos a paleta de Um Natal no Sertão",
    resumo:
      "Uma imersão no processo de cor, luz e referências culturais por trás do especial de fim de ano.",
    autor: "Sofia Mendes",
    data: new Date("2026-05-12").toISOString(),
    categoria: "Bastidores",
    tags: ["bastidores", "design"],
    conteudo_html:
      "<p>O especial carrega uma identidade de cor muito específica: os tons de terracota da argila, o dourado do sol poente na vegetação seca, e o azul profundo das noites frias de dezembro.</p><p>A diretora de arte Sofia Mendes divide os bastidores do desenvolvimento da paleta de cores.</p>",
  },
  {
    id: 3,
    slug: "novo-longa-pre-producao",
    titulo: "Novo longa entra em fase de pré-produção",
    resumo:
      "Projeto inédito promete expandir o universo narrativo do estúdio para o longa-metragem.",
    autor: "Lucas Rocha",
    data: new Date("2026-04-28").toISOString(),
    categoria: "Em produção",
    tags: ["longa", "produção"],
    conteudo_html:
      "<p>Depois do sucesso dos nossos curtas, a Argumento Produções dá seu passo mais ambicioso: o desenvolvimento de nosso primeiro longa-metragem de animação.</p><p>O projeto acaba de entrar na fase de pré-produção, que inclui o refinamento do roteiro e os primeiros estudos de design de personagens.</p>",
  },
];
