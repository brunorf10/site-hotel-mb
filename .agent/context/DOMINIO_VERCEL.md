# Apontamento de Domínio — hotelmariabastos.com.br → Vercel

> Guia para configurar o domínio personalizado no projeto hospedado na Vercel.

## Pré-requisitos

- Acesso ao painel da Vercel (projeto `site-hotel-mb`)
- Acesso ao painel de DNS do registrador do domínio (a ser informado pelo TI)

---

## Passo 1 — Adicionar domínio na Vercel (✅ já feito)

O domínio já foi adicionado na Vercel com a seguinte configuração:

- `www.hotelmariabastos.com.br` → domínio **principal** (Production)
- `hotelmariabastos.com.br` → **redirect 307** para o www

Ambos mostram "Invalid Configuration" porque o **Passo 2** (DNS) ainda não foi feito.

---

## Passo 2 — Configurar DNS no registrador

Na aba **Domains** da Vercel, ao expandir o domínio, existem **duas abas** com métodos diferentes. Escolha **uma** das opções:

---

### Opção A — Registros DNS (aba "DNS Records")

Crie **2 registros** no painel do registrador com os valores que a Vercel mostra:

**Registro 1 — Domínio raiz (`hotelmariabastos.com.br`)**

| Campo no registrador   | O que preencher                      |
| ---------------------- | ------------------------------------ |
| **Tipo**               | `A`                                  |
| **Nome** (ou Host)     | `@`                                  |
| **Valor** (ou Destino) | `216.198.79.1`                       |
| **TTL**                | `3600` (ou "1 hora" ou "Automático") |

**Registro 2 — Subdomínio www (`www.hotelmariabastos.com.br`)**

| Campo no registrador   | O que preencher                      |
| ---------------------- | ------------------------------------ |
| **Tipo**               | `CNAME`                              |
| **Nome** (ou Host)     | `www`                                |
| **Valor** (ou Destino) | `cname.vercel-dns.com`               |
| **TTL**                | `3600` (ou "1 hora" ou "Automático") |

---

### Opção B — Vercel DNS (aba "Vercel DNS") ⭐ mais simples

Em vez de criar registros individuais, você **troca os nameservers** do domínio no registrador para os da Vercel. Assim a Vercel gerencia todo o DNS automaticamente.

No registrador, procure a seção **Nameservers** (ou "Servidores DNS") e substitua os existentes por:

| Nameserver           |
| -------------------- |
| `ns1.vercel-dns.com` |
| `ns2.vercel-dns.com` |

> ⚠️ **Atenção**: Ao trocar os nameservers, a Vercel passa a gerenciar **todo o DNS** do domínio. Se o domínio tiver outros registros (e-mail, subdomínios), eles precisarão ser recriados dentro da Vercel.

---

### Qual opção escolher?

✅ **Use a Opção A (Registros DNS)** — o domínio possui o e-mail `contato@hotelmariabastos.com.br`. A Opção B (trocar nameservers) **quebraria o e-mail**, pois removeria os registros MX existentes.

> ⚠️ **Importante**: ao configurar os registros A e CNAME no registrador, **NÃO remova** os registros MX (e-mail) já existentes. Apenas **adicione** os dois novos registros.

> 💡 **Sempre confira os valores na aba Domains da Vercel antes de configurar.** Os IPs podem ser atualizados pela Vercel.

---

## Passo 3 — Verificar propagação

Após configurar os registros DNS:

1. Aguarde **5 min a 48h** para propagação (geralmente 5–30 min)
2. Volte em **Vercel → Settings → Domains** — o "Invalid Configuration" deve sumir e aparecer ✅ verde
3. Teste acessando `hotelmariabastos.com.br` e `www.hotelmariabastos.com.br`

### Ferramentas para verificar propagação

- [dnschecker.org](https://dnschecker.org) — verifica propagação global
- [whatsmydns.net](https://www.whatsmydns.net) — alternativa

---

## Passo 4 — SSL/HTTPS

A Vercel configura o certificado SSL **automaticamente** após verificar o domínio. Nenhuma ação manual necessária.

---

## Guia rápido por registrador

### Registro.br

1. [registro.br](https://registro.br) → Meus domínios → Clique no domínio
2. **DNS** → **Editar zona**
3. Crie os 2 registros conforme as tabelas do Passo 2

### GoDaddy

1. [godaddy.com](https://godaddy.com) → Meus produtos
2. **DNS** ao lado do domínio → seção **Registros**
3. Crie os 2 registros conforme as tabelas do Passo 2

### Hostgator

1. Painel → **Domínios** → **Zona DNS**
2. Crie os 2 registros conforme as tabelas do Passo 2

### Cloudflare

1. [dash.cloudflare.com](https://dash.cloudflare.com) → Selecione o domínio → **DNS**
2. Crie os 2 registros conforme as tabelas do Passo 2
3. ⚠️ **Desative o proxy** (ícone de nuvem deve ficar **cinza**, não laranja) para o SSL da Vercel funcionar

---

## Checklist final

- [x] Domínio adicionado na Vercel (Settings → Domains)
- [x] Configuração de redirect (raiz → www) feita na Vercel
- [ ] Registro `A` criado no registrador
- [ ] Registro `CNAME` criado no registrador
- [ ] Propagação verificada (✅ verde na Vercel)
- [ ] SSL ativo (cadeado 🔒 no navegador)
- [ ] Teste em dispositivo mobile

---

_Criado em: 08/03/2026_
