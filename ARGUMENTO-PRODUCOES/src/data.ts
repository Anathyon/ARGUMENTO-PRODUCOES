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
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "mariana-souza",
    name: "Mariana Souza",
    role: "Direção",
    avatarSeed: "mariana",
    bio: "Diretora e animadora dedicada a explorar a poética visual do cotidiano nordestino. Com mais de 10 anos de experiência em curtas autorais.",
  },
  {
    id: "lucas-rocha",
    name: "Lucas Rocha",
    role: "Argumento",
    avatarSeed: "lucas",
    bio: "Roteirista apaixonado pelas tradições orais sertanejas. Traduz memórias de infância e contos clássicos em roteiros cinematográficos marcantes.",
  },
  {
    id: "sofia-mendes",
    name: "Sofia Mendes",
    role: "Arte e Design",
    avatarSeed: "sofia",
    bio: "Ilustradora e diretora de arte. Constrói os universos gráficos e paletas cromáticas que conferem o estilo único de xilogravura moderna às produções.",
  },
  {
    id: "matheus-silva",
    name: "Matheus Silva",
    role: "Animação 2D",
    avatarSeed: "matheus",
    bio: "Animador especializado em quadros fluidos e expressivos. Traduz sentimentos humanos em movimentos desenhados à mão com máxima sensibilidade.",
  },
  {
    id: "beatriz-santos",
    name: "Beatriz Santos",
    role: "Produção",
    avatarSeed: "beatriz",
    bio: "Produtora executiva focada em conectar talentos e viabilizar projetos independentes com eficiência, dedicação e alcance de mercado.",
  },
  {
    id: "thiago-costa",
    name: "Thiago Costa",
    role: "Trilha e Som",
    avatarSeed: "thiago",
    bio: "Compositor e sound designer. Desenvolve trilhas sonoras originais mesclando instrumentos regionais como pife e sanfona com texturas sonoras digitais.",
  },
];

export const INSTITUTION_VALUES = [
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

export const MARQUEE_ITEMS = [
  "Animação", "Narrativa", "Roteiro", "Sertão",
  "Cultura", "Direção", "Produção", "Identidade",
] as const;
