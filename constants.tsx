
import { Category, GalleryItem, Room } from './types';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: Category.SUITES,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2SeHPrJQZ4MF763fSZ44hftgWA0c3D-5BHoOSFKqtDSlm2bm5MWIIozSfuY0ee_JvvjpYWMsB2myxxdK_cdacCfI0AUpnek8NaWo6rEyQj5LdNZ2UnBMnNoKCnbqIMZXDvboCgfpwOcz_5iDeJwY14zdil8L0VEIDDp-ydTcq-uT9U9VjAaxSMz8k6QHQOoJkw4CMjktwUqkcEmYtAi4tPuLbzLrGgybMbkjQ4X16_HLCp4kPLSlwJ9UpadWt-53rXM22Xgig5WSn",
    alt: "Suíte espaçosa com cama king-size e varanda"
  },
  {
    id: 2,
    category: Category.GASTRONOMY,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0x5wWhsxymLWcImAaUgdWl_oFjoK65ytIkNRgdY1lcYPkd5Q6_UFhlHvhBO3x9w6WCEuXj7ovUWKVagAmsc8jhTB8hhmPw6wS6qahdk1l7Md8zxChaiH00KMMkHdaikupBDV6ELpG2gcNZedMr5khHiaGdFUIHZ-0e-yNLKDFh1SzJH_mNKpglGVw54nGl1iL2fZK15JLGkgOwyEAusfZzUSTapCN4Ql_4PBKZeMVz0B7IOp1h2bE0WubgF7It1TLHEaEqCA2SXRB",
    alt: "Prato gourmet com empratamento sofisticado"
  },
  {
    id: 3,
    category: Category.LOUNGE,
    url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=2070",
    alt: "Lounge de espera com mobiliário em madeira e couro"
  },
  {
    id: 4,
    category: Category.COMMON,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjjDC4KB1PVY9JykfZ4t6LkacOQbaFSlBMJ-jJWQBViD06EVJkklxFu4VImGikKekpKqLoxHnmcyw90HNc8puBVX6gRfddI35qA-6_tpNaulyvXue--t0TOwyoqZ5Tuh7CC3QxbSacXQLnA8Fpl9_oHdTLDNZ-EaVQdT9OQGNPTbwoKdR8VuichW33F7oGORX3fOnjiTT7zGN50OVtV-BPBT32G4dVxTGkadeAWImTn3XRANU6QZ6WuSQSkIdmxNtJqHuefKg4a9q_",
    alt: "Lobby moderno com pé direito alto e luminárias artísticas"
  },
  {
    id: 5,
    category: Category.GASTRONOMY,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCPiiFyChwjiPYdPgMdStTL0U0rrWACuAdxH-pKCtjwmzWG5JHpjSuVLOQlhxH463FR7UyOzmk4vQ7C4fxlmUlpHnoj59pe00ZQosZb6EvIcng5cAUxm0kmhNbCvhZt1QWQ60RsQV80_qa5TGxY_bNYuyP305_QQL0r236dxDBGjFHaJNUMSkcaPMlic03qGAFBo2xoQAMEVNU7wBbUIOhLr8aUyKuwLdNKUJ8Mk1SMt_u9K4zjpwBu-HTBLj3ClozO5CisQY_x-g4",
    alt: "Bar elegante do hotel com seleção de destilados premium"
  },
  {
    id: 6,
    category: Category.ARCHITECTURE,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLJ6tuM8W4orBwvAhnogY0mTLcZ0npYPGyllycL1wLZuHoEt7k6Sv0nyMXPUZKbdzRVG1B9POF6EMPdNNJ6xabN2398G7VbeZOZjqMg7Kf5lTea_-hP5zf7pVcpLyM5Z_eIvDh6JMH-2LtOAhbKFztyk8lKPRMBALgnOC9kQjrE0uzfySVcuf6Bly18ymL9c6Cj1Qt_H0-oZrz9-shrYeiy15qg8BpOFkuKhqfo2OZtUWhh_CV1aSyXqXu6l3KL68O8qizW4ugumgH",
    alt: "Detalhes arquitetônicos da fachada do hotel"
  },
  {
    id: 7,
    category: Category.SUITES,
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3HzXvOIX1Z5AiIofOkg_iPjbogJ3iv9A4be7547CfiBNBDWQ07_u0FkG9pECCVu1Mpsu_xFwCwXiwtbAt3ltdXWTcx-CqXA6kJp6-CObEufAyfkncYumAY9m_VK8ie9OfHpz9w9gWAqKRg8rn7z4zu6k2pENDL67dbr5zluhVmGueCbrvMV9jrwMcBOagPFJutpZS6nJq9rWc1xIvPtpRNHLfXYZQ9tWgRp_lk45W7afy5oFXdiMgT1lObV8DXSYBdLszbpqnAUI7",
    alt: "Banheiro luxuoso com mármore e banheira autoportante"
  },
  {
    id: 8,
    category: Category.LOUNGE,
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=2070",
    alt: "Área de estar íntima com tons terrosos"
  }
];

export const ROOMS: Room[] = [
  {
    id: 'deluxe',
    name: 'Quartos Deluxe',
    description: 'Conforto excepcional com toques de design contemporâneo e materiais nobres.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=2070',
    amenities: [
      { icon: 'king_bed', label: 'Cama King-Size' },
      { icon: 'wifi', label: 'Wi-Fi Grátis' },
      { icon: 'ac_unit', label: 'Climatização' }
    ],
    services: ['Café da manhã incluso', 'Serviço de quarto 24h']
  },
  {
    id: 'junior',
    name: 'Suítes Júnior',
    description: 'Espaço ampliado com área de estar dedicada e janelas panorâmicas.',
    image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1974',
    amenities: [
      { icon: 'king_bed', label: 'Cama King-Size' },
      { icon: 'balcony', label: 'Varanda Privada' },
      { icon: 'coffee_maker', label: 'Nespresso' }
    ],
    services: ['Frigobar premium', 'Check-in antecipado']
  },
  {
    id: 'presidential',
    name: 'Suíte Presidencial',
    description: 'A experiência definitiva de luxo. Nossa suíte mais exclusiva oferece vistas panorâmicas para o horizonte do sertão, design requintado e serviços personalizados.',
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=2070",
    amenities: [
      { icon: 'king_bed', label: 'Cama King-Size' },
      { icon: 'balcony', label: 'Terraço Privado' },
      { icon: 'bathtub', label: 'Banheira de Imersão' },
      { icon: 'landscape', label: 'Vista Panorâmica' },
      { icon: 'wifi', label: 'Wi-Fi de Alta Velocidade' },
      { icon: 'coffee_maker', label: 'Máquina Nespresso' },
      { icon: 'live_tv', label: 'Smart TV 75"' },
      { icon: 'ac_unit', label: 'Climatização Central' }
    ],
    services: [
      'Serviço de mordomo 24 horas',
      'Check-in e check-out privativos',
      'Café da manhã servido na suíte por chef particular',
      'Acesso exclusivo ao Lounge Executivo'
    ]
  }
];
