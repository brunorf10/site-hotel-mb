# Projeto: Site Hotel Maria Bastos

## Visão Geral

Site institucional para o **Hotel Maria Bastos**, localizado no sertão brasileiro. O objetivo é apresentar as acomodações, serviços e permitir que visitantes enviem solicitações de reserva.

## Status Atual

🚧 **Em desenvolvimento** — Imagens e textos mock aguardando substituição pelos reais.

## Stack Tecnológica

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Estilização:** CSS + Tailwind (via classes utilitárias)
- **Animações:** Framer Motion
- **Roteamento:** React Router DOM 7
- **Notificações:** Sonner
- **E-mail:** EmailJS

## Hospedagem

- **Produção:** Vercel (configurado via `vercel.json`)

## Estrutura do Projeto

```
site-hotel-mb/
├── components/        # Componentes reutilizáveis
│   ├── BookingModal   # Modal de reserva com formulário completo
│   ├── ContactSection # Seção de contato e localização
│   ├── EventsSection  # Seção de eventos
│   ├── Footer         # Rodapé
│   ├── Gallery        # Galeria de imagens
│   ├── Header         # Navegação principal
│   ├── Hero           # Banner principal
│   └── RoomsSection   # Listagem de quartos
├── pages/             # Páginas da aplicação
│   ├── Home           # Página inicial
│   └── PrivacyPolicy  # Política de privacidade
├── services/          # Serviços e utilitários
│   ├── email-service  # Integração EmailJS
│   └── form-validation# Validações de formulário
├── hooks/             # Hooks customizados
├── constants.tsx      # Dados estáticos (quartos, galeria)
├── types.ts           # Definições de tipos TypeScript
└── templates_email_js/# Templates HTML para e-mails
```

## Variáveis de Ambiente

Arquivo `.env.local` (não versionado):

- `VITE_EMAILJS_SERVICE_ID` — ID do serviço EmailJS
- `VITE_EMAILJS_TEMPLATE_ID` — ID do template de e-mail
- `VITE_EMAILJS_PUBLIC_KEY` — Chave pública EmailJS

## Comandos

```bash
npm run dev      # Desenvolvimento (porta 3000)
npm run build    # Build de produção
npm run preview  # Preview do build
```

## Pendências Conhecidas

- [ ] Substituir imagens mock por fotos reais do hotel
- [ ] Atualizar textos e descrições com informações oficiais
- [ ] Revisar nomes e detalhes das acomodações
- [ ] Adicionar informações de localização/endereço real
- [x] Configurar domínio personalizado na Vercel (`hotel.cactusolucoes.com` — temporário até `hotelmariabastos.com.br`)
- [x] Adicionar meta tags Open Graph (prévia WhatsApp)
