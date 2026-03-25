import { Category, GalleryItem, Room } from "./types";

export const GALLERY_ITEMS: GalleryItem[] = [
  // ── Primeiras imagens: mix variado (sem infra) ──
  {
    id: 1,
    category: Category.AERIAL,
    url: "/images/optimized/galeria/drone-vista-frontal-proxima-lg.webp",
    alt: "Vista aérea frontal próxima do hotel",
  },
  {
    id: 2,
    category: Category.SUITES,
    url: "/images/optimized/galeria/suite-espacosa-lg.webp",
    alt: "Suíte espaçosa com cama e varanda",
  },
  {
    id: 3,
    category: Category.GASTRONOMY,
    url: "/images/optimized/galeria/Prato-Gourmet-lg.webp",
    alt: "Prato gourmet do Restaurante Maria Bastos",
  },
  {
    id: 4,
    category: Category.LOUNGE,
    url: "/images/optimized/galeria/area-estar-loob-principal-lg.webp",
    alt: "Lobby principal da área de estar",
  },

  // ── Segundo bloco: continua variado ──
  {
    id: 5,
    category: Category.AERIAL,
    url: "/images/optimized/galeria/drone-vista-lateral-lg.webp",
    alt: "Vista aérea lateral do hotel",
  },
  {
    id: 6,
    category: Category.SUITES,
    url: "/images/optimized/galeria/quarto-com-varanda-lg.webp",
    alt: "Quarto com varanda",
  },
  {
    id: 7,
    category: Category.GASTRONOMY,
    url: "/images/optimized/galeria/Restaurante-MB-lg.webp",
    alt: "Restaurante Maria Bastos",
  },
  {
    id: 8,
    category: Category.LOUNGE,
    url: "/images/optimized/galeria/lobby-pe-direito-lg.webp",
    alt: "Lobby com pé direito alto",
  },

  // ── Terceiro bloco ──
  {
    id: 9,
    category: Category.AERIAL,
    url: "/images/optimized/galeria/drone-vista-diagonal-lg.webp",
    alt: "Vista aérea diagonal do hotel",
  },
  {
    id: 10,
    category: Category.SUITES,
    url: "/images/optimized/galeria/banheiro-luxuoso-lg.webp",
    alt: "Banheiro luxuoso dos apartamentos",
  },
  {
    id: 11,
    category: Category.GASTRONOMY,
    url: "/images/optimized/galeria/sobremesa-lg.webp",
    alt: "Sobremesa artesanal",
  },
  {
    id: 12,
    category: Category.LOUNGE,
    url: "/images/optimized/galeria/area-estar-entrada-lg.webp",
    alt: "Entrada da área de estar",
  },

  // ── Quarto bloco ──
  {
    id: 13,
    category: Category.AERIAL,
    url: "/images/optimized/galeria/drone-vista-frontal-ampla-lg.webp",
    alt: "Vista aérea frontal ampla do hotel",
  },
  {
    id: 14,
    category: Category.SUITES,
    url: "/images/optimized/galeria/varanda-com-vista-privilegiada-lg.webp",
    alt: "Varanda com vista privilegiada",
  },
  {
    id: 15,
    category: Category.GASTRONOMY,
    url: "/images/optimized/galeria/cafe-da-manha-lg.webp",
    alt: "Café da manhã incluso",
  },
  {
    id: 16,
    category: Category.LOUNGE,
    url: "/images/optimized/galeria/area-estar-recepcao-lg.webp",
    alt: "Recepção e área de estar",
  },

  // ── Restantes de cada categoria ──
  {
    id: 17,
    category: Category.AERIAL,
    url: "/images/optimized/galeria/drone-vista-entrada-lg.webp",
    alt: "Vista aérea da entrada do hotel",
  },
  {
    id: 18,
    category: Category.SUITES,
    url: "/images/optimized/galeria/tvs-em-todos-os-quartos-lg.webp",
    alt: "TVs Smart em todos os quartos",
  },
  {
    id: 19,
    category: Category.GASTRONOMY,
    url: "/images/optimized/galeria/sobremesa-personalizada-lg.webp",
    alt: "Sobremesa personalizada",
  },
  {
    id: 20,
    category: Category.LOUNGE,
    url: "/images/optimized/galeria/area-estar-detalhes-lg.webp",
    alt: "Detalhes da área de estar",
  },
  {
    id: 21,
    category: Category.SUITES,
    url: "/images/optimized/galeria/banheiro-lg.webp",
    alt: "Banheiro dos apartamentos",
  },
  {
    id: 22,
    category: Category.LOUNGE,
    url: "/images/optimized/galeria/area-estar-lg.webp",
    alt: "Área de estar do hotel",
  },

  // ── Infraestrutura (aparece ao carregar mais) ──
  {
    id: 23,
    category: Category.COMMON,
    url: "/images/optimized/galeria/infra-carregador-veicular-lg.webp",
    alt: "Carregador veicular nas áreas comuns",
  },
  {
    id: 24,
    category: Category.COMMON,
    url: "/images/optimized/galeria/infra-Elevador-lg.webp",
    alt: "Elevador do hotel",
  },
  {
    id: 25,
    category: Category.COMMON,
    url: "/images/optimized/galeria/infra-Escadas-lg.webp",
    alt: "Escadas internas do hotel",
  },
  {
    id: 26,
    category: Category.COMMON,
    url: "/images/optimized/galeria/infra-sinalizacao-quartos-lg.webp",
    alt: "Sinalização dos quartos",
  },
  {
    id: 27,
    category: Category.COMMON,
    url: "/images/optimized/galeria/infra-corredores-lg.webp",
    alt: "Corredores do hotel",
  },
  {
    id: 28,
    category: Category.COMMON,
    url: "/images/optimized/galeria/infra-estacionamento-coberto-lg.webp",
    alt: "Estacionamento coberto",
  },
];

// Amenidades presentes em todas as categorias
const COMMON_AMENITIES = [
  { icon: "shower", label: "Chuveiro Elétrico" },
  { icon: "kitchen", label: "Frigobar" },
  { icon: "call", label: "Interfone" },
  { icon: "live_tv", label: 'Smart TV 43"' },
  { icon: "wifi", label: "Wi-Fi" },
  { icon: "blinds_closed", label: "Cortina Blackout" },
  { icon: "desk", label: "Escrivaninha" },
  { icon: "checkroom", label: "Guarda-roupas" },
  { icon: "deployed_code", label: "Espelho Orgânico" },
  { icon: "chair", label: "Móveis Projetados" },
  { icon: "ac_unit", label: "Climatizado" },
];

// Serviços comuns a todos
const COMMON_SERVICES = [
  "Café da manhã incluso (6:30 às 9h)",
  "Estacionamento",
  "Pet Friendly",
];

export const ROOMS: Room[] = [
  {
    id: "simples",
    name: "Simples",
    description:
      "Apartamento aconchegante e funcional, ideal para viajantes solo que buscam conforto e praticidade no coração de Tauá.",
    image:
      "/images/optimized/apartamentos/simples/01-Visão-do-Quarto-lg.webp",
    images: [
      "/images/optimized/apartamentos/simples/01-Visão-do-Quarto-lg.webp",
      "/images/optimized/apartamentos/simples/02-Cama-e-Frigobar-lg.webp",
      "/images/optimized/apartamentos/simples/03-Visão-inversa-do-quarto-lg.webp",
      "/images/optimized/apartamentos/simples/04-Visão-da-Cama-lg.webp",
      "/images/optimized/apartamentos/simples/05-Tv-e-Rack-lg.webp",
      "/images/optimized/apartamentos/simples/06-Banheiro-lg.webp",
      "/images/optimized/apartamentos/simples/07-Entrada-lg.webp",
    ],
    area: "14,68 m²",
    capacity: "01 pessoa",
    hasBalcony: true,
    amenities: [...COMMON_AMENITIES],
    services: [...COMMON_SERVICES],
  },
  {
    id: "duplo",
    name: "Duplo",
    description:
      "Espaço confortável com duas camas de solteiro e varanda, perfeito para amigos ou colegas em viagem.",
    image: "/images/optimized/apartamentos/duplo/01 - Visão do Quarto-lg.webp",
    images: [
      "/images/optimized/apartamentos/duplo/01 - Visão do Quarto-lg.webp",
      "/images/optimized/apartamentos/duplo/02 - Camas-lg.webp",
      "/images/optimized/apartamentos/duplo/03 - Camas-lg.webp",
      "/images/optimized/apartamentos/duplo/04 - Tv-lg.webp",
      "/images/optimized/apartamentos/duplo/05 - Mesa-lg.webp",
    ],
    area: "17,85 m²",
    capacity: "02 pessoas",
    hasBalcony: true,
    amenities: [...COMMON_AMENITIES],
    services: [...COMMON_SERVICES],
  },
  {
    id: "casal",
    name: "Casal",
    description:
      "Apartamento romântico com cama de casal e varanda privativa, pensado para casais que desejam conforto e tranquilidade.",
    image: "/images/optimized/apartamentos/casal/02 - Visão do Quarto-lg.webp",
    images: [
      "/images/optimized/apartamentos/casal/02 - Visão do Quarto-lg.webp",
      "/images/optimized/apartamentos/casal/03 - Cama-lg.webp",
      "/images/optimized/apartamentos/casal/04 - Cama (Detalhe)-lg.webp",
      "/images/optimized/apartamentos/casal/01 - Varanda-lg.webp",
      "/images/optimized/apartamentos/casal/05 - Tv-lg.webp",
      "/images/optimized/apartamentos/casal/06 - Mesa-lg.webp",
    ],
    area: "17,85 m²",
    capacity: "02 pessoas",
    hasBalcony: true,
    amenities: [...COMMON_AMENITIES],
    services: [...COMMON_SERVICES],
  },
  {
    id: "triplo",
    name: "Triplo",
    description:
      "Apartamento espaçoso para até 3 hóspedes, ideal para famílias ou pequenos grupos que valorizam amplitude e conforto.",
    image: "/images/optimized/apartamentos/triplo/01 - Visão do Quarto-lg.webp",
    images: [
      "/images/optimized/apartamentos/triplo/01 - Visão do Quarto-lg.webp",
      "/images/optimized/apartamentos/triplo/02 - Camas-lg.webp",
      "/images/optimized/apartamentos/triplo/03 - Camas-lg.webp",
      "/images/optimized/apartamentos/triplo/05 - Frigobar-lg.webp",
      "/images/optimized/apartamentos/triplo/06 - Mesa-lg.webp",
      "/images/optimized/apartamentos/triplo/07 - Espelho-lg.webp",
      "/images/optimized/apartamentos/triplo/08 - Tv-lg.webp",
      "/images/optimized/apartamentos/triplo/09 - Móvel para roupas-lg.webp",
      "/images/optimized/apartamentos/triplo/10 - Banheiro-lg.webp",
      "/images/optimized/apartamentos/triplo/11 - Banheiro-lg.webp",
    ],
    area: "23,53 m²",
    capacity: "03 pessoas",
    hasBalcony: false,
    amenities: [...COMMON_AMENITIES],
    services: [...COMMON_SERVICES],
  },
  {
    id: "master",
    name: "Master",
    description:
      "Apartamento premium com TV de 50 polegadas e varanda, para quem busca uma estadia diferenciada com mais sofisticação.",
    image: "/images/optimized/apartamentos/master/01 - Visão do Quarto-lg.webp",
    images: [
      "/images/optimized/apartamentos/master/01 - Visão do Quarto-lg.webp",
      "/images/optimized/apartamentos/master/02 - Visão do Quarto-lg.webp",
      "/images/optimized/apartamentos/master/03 - Cama-lg.webp",
      "/images/optimized/apartamentos/master/04 - Cama-lg.webp",
      "/images/optimized/apartamentos/master/05 - Detalhes-lg.webp",
      "/images/optimized/apartamentos/master/06 - Detalhes-lg.webp",
      "/images/optimized/apartamentos/master/07 - Tv-lg.webp",
      "/images/optimized/apartamentos/master/08 - Banheiro-lg.webp",
      "/images/optimized/apartamentos/master/09 - Banheiro-lg.webp",
      "/images/optimized/apartamentos/master/10 - Banheiro-lg.webp",
    ],
    area: "20,00 m²",
    capacity: "02 pessoas",
    hasBalcony: true,
    amenities: [
      ...COMMON_AMENITIES.filter((a) => a.label !== 'Smart TV 43"'),
      { icon: "live_tv", label: 'Smart TV 50"' },
    ],
    services: [...COMMON_SERVICES],
    highlight: "TV 50 polegadas",
  },
  {
    id: "master-luxo",
    name: "Master Luxo",
    description:
      "Nossa categoria mais sofisticada. TV de 55 polegadas, varanda privativa e acabamento premium para uma experiência exclusiva em Tauá.",
    image:
      "/images/optimized/apartamentos/master-luxo/01 - Visão do Quarto-lg.webp",
    images: [
      "/images/optimized/apartamentos/master-luxo/01 - Visão do Quarto-lg.webp",
      "/images/optimized/apartamentos/master-luxo/02 - Varanda-lg.webp",
      "/images/optimized/apartamentos/master-luxo/03 - Cama-lg.webp",
      "/images/optimized/apartamentos/master-luxo/04 - Cama-lg.webp",
      "/images/optimized/apartamentos/master-luxo/05 - Guarda Roupas-lg.webp",
      "/images/optimized/apartamentos/master-luxo/05 - Tv-lg.webp",
      "/images/optimized/apartamentos/master-luxo/06 - Detalhes-lg.webp",
      "/images/optimized/apartamentos/master-luxo/07 - Banheiro-lg.webp",
      "/images/optimized/apartamentos/master-luxo/08 - Banheiro-lg.webp",
      "/images/optimized/apartamentos/master-luxo/09 - Banheiro-lg.webp",
      "/images/optimized/apartamentos/master-luxo/10 - Detalhes-lg.webp",
      "/images/optimized/apartamentos/master-luxo/11 - Detalhes-lg.webp",
    ],
    area: "17,85 m²",
    capacity: "02 pessoas",
    hasBalcony: true,
    amenities: [
      ...COMMON_AMENITIES.filter((a) => a.label !== 'Smart TV 43"'),
      { icon: "live_tv", label: 'Smart TV 55"' },
    ],
    services: [...COMMON_SERVICES],
    highlight: "TV 55 polegadas",
  },
  {
    id: "acessibilidade",
    name: "Acessibilidade",
    description:
      "Apartamento adaptado com acessibilidade completa, incluindo cadeira de banho geriátrica, garantindo conforto e segurança para todos.",
    image:
      "/images/optimized/apartamentos/acessibilidade/01 - Visao geral do quarto-lg.webp",
    images: [
      "/images/optimized/apartamentos/acessibilidade/01 - Visao geral do quarto-lg.webp",
      "/images/optimized/apartamentos/acessibilidade/02 - Cama-lg.webp",
      "/images/optimized/apartamentos/acessibilidade/03 - banheiro-lg.webp",
      "/images/optimized/apartamentos/acessibilidade/04 - banheiro (detalhe 01)-lg.webp",
      "/images/optimized/apartamentos/acessibilidade/05 - banheiro (detalhe 02)-lg.webp",
      "/images/optimized/apartamentos/acessibilidade/06 - TV-lg.webp",
      "/images/optimized/apartamentos/acessibilidade/07 - Mesa de trabalho-lg.webp",
    ],
    area: "23,60 m²",
    capacity: "02 pessoas",
    hasBalcony: false,
    amenities: [
      ...COMMON_AMENITIES,
      { icon: "accessible", label: "Acessibilidade Completa" },
      { icon: "event_seat", label: "Cadeira de Banho Geriátrica" },
    ],
    services: [...COMMON_SERVICES],
    highlight: "Apartamento Adaptado",
  },
];
