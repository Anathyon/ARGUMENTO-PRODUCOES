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
    bio: "Diretora e animadora dedicada a explorar a poética visual do cotidiano nordestino.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=560&fit=crop&crop=face",
  },
  {
    id: "lucas-rocha",
    name: "Lucas Rocha",
    role: "Roteiro",
    avatarSeed: "lucas",
    bio: "Roteirista apaixonado pelas tradições orais sertanejas e contos clássicos.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=560&fit=crop&crop=face",
  },
  {
    id: "sofia-mendes",
    name: "Sofia Mendes",
    role: "Arte e Design",
    avatarSeed: "sofia",
    bio: "Ilustradora e diretora de arte. Constrói os universos gráficos das produções.",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=560&fit=crop&crop=face",
  },
  {
    id: "matheus-silva",
    name: "Matheus Silva",
    role: "Animação 2D",
    avatarSeed: "matheus",
    bio: "Animador especializado em quadros fluidos e expressivos desenhados à mão.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=560&fit=crop&crop=face",
  },
  {
    id: "beatriz-santos",
    name: "Beatriz Santos",
    role: "Produção",
    avatarSeed: "beatriz",
    bio: "Produtora executiva focada em viabilizar projetos independentes com eficiência.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=560&fit=crop&crop=face",
  },
  {
    id: "thiago-costa",
    name: "Thiago Costa",
    role: "Trilha e Som",
    avatarSeed: "thiago",
    bio: "Compositor e sound designer. Mescla instrumentos regionais com texturas digitais.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=560&fit=crop&crop=face",
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
