// Dados estáticos do site — conforme ATA da reunião:
// equipe, institucional e contato permanecem estáticos.
// Trabalhos, portfólio e notícias são gerenciados pela API.

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarSeed: string;
  bio: string;
  photo?: string;
  slides?: string[];
  /** Link do perfil no Mapa Cultural do Ceará */
  mapaLink?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "maria-eduarda",
    name: "Maria Eduarda",
    role: "Colaboradora",
    avatarSeed: "mariaeduarda",
    bio: "Veja o portfólio completo no slideshow.",
    photo: "/Cards/Maria Eduarda/Eduarda.jpg",
    slides: [
      "/Cards/Maria Eduarda/Captura de tela de 2026-06-18 14-22-02.png",
      "/Cards/Maria Eduarda/Captura de tela de 2026-06-18 14-22-19.png",
      "/Cards/Maria Eduarda/Captura de tela de 2026-06-18 14-22-45.png",
      "/Cards/Maria Eduarda/Captura de tela de 2026-06-18 14-23-29.png",
      "/Cards/Maria Eduarda/Captura de tela de 2026-06-18 14-23-49.png"
    ]
  },
  {
    id: "gabriely-soares",
    name: "Gabriely Soares",
    role: "Colaboradora",
    avatarSeed: "gabrielysoares",
    bio: "Veja o portfólio completo no slideshow.",
    photo: "/Cards/Gabriely Soares/Gabriely.jpg",
    slides: [
      "/Cards/Gabriely Soares/Captura de tela de 2026-06-18 14-24-17.png",
      "/Cards/Gabriely Soares/Captura de tela de 2026-06-18 14-24-30.png",
      "/Cards/Gabriely Soares/Captura de tela de 2026-06-18 14-25-03.png",
      "/Cards/Gabriely Soares/Captura de tela de 2026-06-18 14-25-23.png",
      "/Cards/Gabriely Soares/Captura de tela de 2026-06-18 14-25-34.png"
    ]
  },
  {
    id: "naiana-sousa",
    name: "Naiana Sousa",
    role: "Colaboradora",
    avatarSeed: "naianasousa",
    bio: "Veja o portfólio completo no slideshow.",
    photo: "/Cards/Naiana Sousa/Naiana.jpg",
    mapaLink: "https://mapacultural.secult.ce.gov.br/agente/7911/",
    slides: [
      "/Cards/Naiana Sousa/Captura de tela de 2026-06-18 14-26-03.png",
      "/Cards/Naiana Sousa/Captura de tela de 2026-06-18 14-26-18.png",
      "/Cards/Naiana Sousa/Captura de tela de 2026-06-18 14-26-27.png",
      "/Cards/Naiana Sousa/Captura de tela de 2026-06-18 14-26-34.png",
      "/Cards/Naiana Sousa/Captura de tela de 2026-06-18 14-27-01.png",
      "/Cards/Naiana Sousa/Captura de tela de 2026-06-18 14-27-21.png",
      "/Cards/Naiana Sousa/Captura de tela de 2026-06-18 14-27-49.png",
      "/Cards/Naiana Sousa/Captura de tela de 2026-06-18 14-28-03.png"
    ]
  },
  {
    id: "luciana-tomaz",
    name: "Luciana Tomaz",
    role: "Colaboradora",
    avatarSeed: "lucianatomaz",
    bio: "Veja o portfólio completo no slideshow.",
    photo: "/Cards/Luciana Tomaz/Luciana.jpg",
    mapaLink: "https://mapacultural.secult.ce.gov.br/agente/148356/",
    slides: [
      "/Cards/Luciana Tomaz/Captura de tela de 2026-06-18 14-31-07.png",
      "/Cards/Luciana Tomaz/Captura de tela de 2026-06-18 14-32-09.png",
      "/Cards/Luciana Tomaz/Captura de tela de 2026-06-18 14-32-21.png",
      "/Cards/Luciana Tomaz/Captura de tela de 2026-06-18 14-32-39.png",
      "/Cards/Luciana Tomaz/Captura de tela de 2026-06-18 14-32-52.png"
    ]
  },
  {
    id: "emily-bernardo",
    name: "Emily Bernardo",
    role: "Colaboradora",
    avatarSeed: "emilybernardo",
    bio: "Veja o portfólio completo no slideshow.",
    photo: "/Cards/Emily Bernardo/Emily.jpg",
    mapaLink: "https://mapacultural.secult.ce.gov.br/agente/148335/",
    slides: [
      "/Cards/Emily Bernardo/Captura de tela de 2026-06-18 14-33-21.png",
      "/Cards/Emily Bernardo/Captura de tela de 2026-06-18 14-33-33.png",
      "/Cards/Emily Bernardo/Captura de tela de 2026-06-18 14-33-43.png",
      "/Cards/Emily Bernardo/Captura de tela de 2026-06-18 14-34-03.png",
      "/Cards/Emily Bernardo/Captura de tela de 2026-06-18 14-34-13.png",
      "/Cards/Emily Bernardo/Captura de tela de 2026-06-18 14-34-26.png",
      "/Cards/Emily Bernardo/Captura de tela de 2026-06-18 14-34-40.png",
      "/Cards/Emily Bernardo/Captura de tela de 2026-06-18 14-34-57.png",
      "/Cards/Emily Bernardo/Captura de tela de 2026-06-18 14-35-13.png"
    ]
  },
  {
    id: "hellen-sarafim",
    name: "Hellen Sarafim",
    role: "Colaboradora",
    avatarSeed: "hellensarafim",
    bio: "Veja o portfólio completo no slideshow.",
    photo: "/Cards/Hellen Sarafim/Hellen.jpg",
    slides: [
      "/Cards/Hellen Sarafim/Captura de tela de 2026-06-18 14-35-34.png",
      "/Cards/Hellen Sarafim/Captura de tela de 2026-06-18 14-35-45.png",
      "/Cards/Hellen Sarafim/Captura de tela de 2026-06-18 14-35-55.png"
    ]
  }
];

export const INSTITUTION_VALUES = [
  {
    title: "Missão",
    text: "Produzir obras audiovisuais que valorizam a cultura, a memória e a imaginação brasileira — com qualidade artística e responsabilidade social.",
  },
  {
    title: "Visão",
    text: "Ser referência nacional em produção audiovisual autoral e cinema, conectando o sertão ao mundo através de histórias universais.",
  },
  {
    title: "Valores",
    text: "Autenticidade, colaboração, excelência técnica, respeito à diversidade e amor por contar boas histórias.",
  },
] as const;

export const MARQUEE_ITEMS = [
  "Cinema", "Audiovisual", "Roteiro", "Sertão",
  "Cultura", "Direção", "Produção", "Identidade",
] as const;
