# Imagens do Projeto

## Status

🔴 **Todas as imagens são mock** — Aguardando fotos reais do hotel.

## Imagens a Substituir

### Galeria (`constants.tsx` → GALLERY_ITEMS)

| ID  | Categoria    | Descrição Atual            | Arquivo Real |
| --- | ------------ | -------------------------- | ------------ |
| 1   | Suítes       | Suíte com cama king-size   | [Pendente]   |
| 2   | Gastronomia  | Prato gourmet              | [Pendente]   |
| 3   | Lounge       | Lounge com madeira e couro | [Pendente]   |
| 4   | Áreas Comuns | Lobby moderno              | [Pendente]   |
| 5   | Gastronomia  | Bar do hotel               | [Pendente]   |
| 6   | Arquitetura  | Fachada do hotel           | [Pendente]   |
| 7   | Suítes       | Banheiro luxuoso           | [Pendente]   |
| 8   | Lounge       | Área de estar              | [Pendente]   |

### Quartos (`constants.tsx` → ROOMS)

| ID           | Tipo               | URL Atual     | Arquivo Real |
| ------------ | ------------------ | ------------- | ------------ |
| deluxe       | Quartos Deluxe     | Unsplash mock | [Pendente]   |
| junior       | Suítes Júnior      | Unsplash mock | [Pendente]   |
| presidential | Suíte Presidencial | Unsplash mock | [Pendente]   |

### Hero/Banner

- **Arquivo:** `components/Hero.tsx`
- **Status:** [Verificar se há imagem de fundo]

## Recomendações para Imagens Reais

- **Formato:** WebP ou JPG otimizado
- **Resolução:** Mínimo 1920x1080 para banners, 800x600 para cards
- **Tamanho:** < 500KB por imagem (otimizar com TinyPNG/Squoosh)
- **Hospedagem sugerida:**
  - Pasta `/public/images/` do projeto, ou
  - CDN como Cloudinary/ImageKit

## Processo de Substituição

1. Receber imagens do cliente
2. Otimizar (compressão + resize)
3. Fazer upload para `/public/images/` ou CDN
4. Atualizar URLs em `constants.tsx`
5. Atualizar alt texts para SEO

---

_Última atualização: 2026-02-05_
