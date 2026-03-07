# 📸 Guia de Imagens — Hotel Maria Bastos

> Coloque as imagens nas pastas correspondentes abaixo.
> **Qualquer formato:** JPG, PNG, WebP, TIFF — o script otimiza automaticamente.

---

## ⚡ Como usar

1. Coloque as imagens originais (do drive) nas pastas abaixo
2. Execute no terminal:
   ```
   npm run optimize-images
   ```
3. As imagens otimizadas serão geradas em `public/images/optimized/`

O script gera automaticamente:

- **WebP + JPG** para cada imagem
- **3 tamanhos**: desktop (lg), tablet (md) e mobile (sm)
- **Corte automático** no aspect ratio correto de cada seção

---

## 📁 Onde colocar as imagens

```
public/images/
├── hero/                    ← Banner principal do site (1 foto)
├── apartamentos/
│   ├── simples/             ← Apt. Simples (14,68m², 1 pessoa, com varanda)
│   ├── duplo/               ← Apt. Duplo (17,85m², 2 pessoas, com varanda)
│   ├── casal/               ← Apt. Casal (17,85m², 2 pessoas, com varanda)
│   ├── triplo/              ← Apt. Triplo (23,53m², 3 pessoas, sem varanda)
│   ├── master/              ← Apt. Master (20m², 2 pessoas, TV 50")
│   ├── master-luxo/         ← Apt. Master Luxo (17,85m², 2 pessoas, TV 55")
│   └── acessibilidade/      ← Apt. Acessibilidade (23,60m², adaptado)
├── eventos/                 ← Auditório, Sala de Reuniões, Salão de Eventos
├── galeria/                 ← Fotos gerais do hotel
└── restaurante/             ← Restaurante Maria Bastos
```

---

## 🖼️ O que fotografar / buscar

### `hero/` — Banner principal (1 imagem)

- [ ] Foto de destaque do hotel (fachada, vista panorâmica ou lobby)
- Nomeie como: `banner.jpg`
- Será cortada em 16:9 (desktop) e mais alta no mobile

### `apartamentos/` — 3-4 fotos por categoria

Para **cada categoria**, nomeie:

1. `01.jpg` — Visão geral do quarto (foto principal, será a imagem destaque)
2. `02.jpg` — Detalhe (cama, móveis)
3. `03.jpg` — Banheiro
4. `04.jpg` — Varanda / TV / detalhe extra

| Pasta             | O que mostrar                                   |
| ----------------- | ----------------------------------------------- |
| `simples/`        | Quarto individual, cama de solteiro, varanda    |
| `duplo/`          | Duas camas de solteiro, varanda                 |
| `casal/`          | Cama de casal, varanda                          |
| `triplo/`         | 3 camas ou cama + beliche, quarto amplo         |
| `master/`         | Quarto premium, TV 50", varanda                 |
| `master-luxo/`    | Quarto top, TV 55", acabamento premium, varanda |
| `acessibilidade/` | Quarto adaptado, cadeira de banho, banheiro PCD |

### `eventos/` — 1-2 fotos cada

- [ ] `banner-eventos.jpg` — Foto geral para o banner da seção (opcional)
- [ ] `auditorio-01.jpg` — Auditório (170 pessoas)
- [ ] `sala-reunioes-01.jpg` — Sala de Reuniões (20 pessoas)
- [ ] `salao-eventos-01.jpg` — Salão de Eventos (dentro do Restaurante)

### `galeria/` — 6-8 fotos gerais

- [ ] `fachada.jpg` — Fachada do hotel
- [ ] `lobby.jpg` — Recepção / lobby
- [ ] `area-comum.jpg` — Áreas comuns
- [ ] `vista.jpg` — Vista panorâmica da cidade
- [ ] Outras fotos do hotel que achar interessante

### `restaurante/` — 2-3 fotos

- [ ] `salao.jpg` — Salão do restaurante
- [ ] `prato.jpg` — Prato(s) da culinária regional
- [ ] `cafe-manha.jpg` — Buffet do café da manhã

---

## 📐 Tamanhos gerados automaticamente

| Seção           | Desktop (lg) | Tablet (md) | Mobile (sm) |
| --------------- | ------------ | ----------- | ----------- |
| Hero            | 1920×1080    | 1024×576    | 640×860     |
| Apts (destaque) | 1200×675     | 800×450     | 640×360     |
| Apts (thumb)    | 300×300      | 200×200     | 150×150     |
| Eventos (card)  | 600×800      | 400×533     | 640×450     |
| Galeria         | 800px max    | 600px max   | 400px max   |

> Imagens originais podem ser de qualquer tamanho — o script redimensiona e comprime tudo.
