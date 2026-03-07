# Imagens do Projeto

## Status

🟡 **Imagens mock em uso** — Aguardando fotos reais do hotel para substituição.

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

### Apartamentos (`constants.tsx` → ROOMS)

| ID             | Tipo           | URL Atual     | Arquivo Real |
| -------------- | -------------- | ------------- | ------------ |
| simples        | Simples        | Unsplash mock | [Pendente]   |
| duplo          | Duplo          | Unsplash mock | [Pendente]   |
| casal          | Casal          | Unsplash mock | [Pendente]   |
| triplo         | Triplo         | Unsplash mock | [Pendente]   |
| master         | Master         | Unsplash mock | [Pendente]   |
| master-luxo    | Master Luxo    | Google mock   | [Pendente]   |
| acessibilidade | Acessibilidade | Unsplash mock | [Pendente]   |

### Hero/Banner

- **Arquivo:** `components/Hero.tsx`
- **Status:** Mock Unsplash (hotel lobby)

### Eventos

- **Arquivo:** `components/EventsSection.tsx`
- **Status:** Mock Google (3 espaços: Auditório, Sala de Reuniões, Salão de Eventos)

## Processo de Substituição

1. Receber imagens do cliente
2. Otimizar (compressão + resize)
3. Fazer upload para `/public/images/` ou CDN
4. Atualizar URLs em `constants.tsx`
5. Atualizar alt texts para SEO

---

_Última atualização: 2026-03-07_
