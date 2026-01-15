
export enum Category {
  ALL = 'Todos',
  SUITES = 'Suítes & Quartos',
  GASTRONOMY = 'Gastronomia & Bar',
  LOUNGE = 'Lounge & Estar',
  COMMON = 'Áreas Comuns',
  ARCHITECTURE = 'Arquitetura'
}

export interface GalleryItem {
  id: number;
  category: Category;
  url: string;
  alt: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  image: string;
  amenities: { icon: string; label: string }[];
  services: string[];
}
