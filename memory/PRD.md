# PRD — Nishida Advocacia (Site Institucional)

## Problema original
Criar UM site institucional de página única para um estabelecimento local, coletando dados públicos via Apify (actor compass/crawler-google-places). Adaptação automática pela categoria. Imagens reais priorizadas. Seções: Hero, Sobre, Serviços, Galeria, Horários+Mapa, Depoimentos reais, CTA contato.

## Negócio
- Dra. Luzia de Cassia Nishida — Nishida Advocacia (Atibaia - SP), OAB/SP 231.637
- Categoria: Advocacia → visual sóbrio/institucional de luxo (ônix + ouro champanhe, Cormorant Garamond)
- Facebook: facebook.com/nishidaadvocacia · Instagram: @draluziadecassianishida
- WhatsApp: +55 11 99988-4833
- SEM perfil no Google Meu Negócio (3 buscas Apify: Brasil, Osasco, Atibaia — 0 resultados dela)

## Arquitetura
- Backend FastAPI (/app/backend/server.py): GET /api/site (dados do Mongo), POST /api/leads (formulário). Token Apify em backend/.env (APIFY_TOKEN), nunca exposto no frontend.
- MongoDB: coleção site_data (doc key="place"), coleção leads.
- Frontend React + Tailwind + framer-motion + lenis: componentes em /app/frontend/src/components/ (NavigationHeader, KineticHero, EditorialMarquee, ManifestoSection, PracticeAreas, Gallery, Testimonials, HoursMap, ContactCTA, Footer). Seções condicionais: Depoimentos e Horários/Mapa só aparecem quando houver dados reais.
- Seed: /app/backend/seed_site.py (idempotente).

## Implementado (2026-07-17 / sessão 1)
- Design award-level: hero cinético com reveal mascarado linha a linha, card 3D com tilt, marquee editorial, capítulos numerados, bento de áreas, galeria com lightbox, formulário com toast.
- Dados reais: nome, OAB, marca, logo real (extraído do Facebook e servido localmente em /assets/profile.jpg), WhatsApp, cidade, links sociais; áreas de atuação baseadas em registros públicos (família, sucessões, curatela/interdição, cível/indenizações).
- Formulário de contato salvando leads no Mongo (testado via curl: {"ok":true}).
- Verificado com screenshots: hero, sobre, atuação, galeria, contato, footer — todas OK, 6 imagens da galeria carregando.

## Pendente / Backlog
- P0: Galeria usa fotos STOCK (temporário) — substituir por fotos reais do escritório quando o cliente enviar.
- P0: Endereço, horários e mapa — seção oculta até o cliente informar endereço.
- P0: Depoimentos — seção oculta; sem avaliações reais (sem perfil no Google).
- P1: Se o cliente criar perfil no Google Meu Negócio, rodar Apify com o link e preencher reviews/fotos/horários reais automaticamente.
- P1: Foto real da Dra. Luzia para o hero (hoje usa o logo da marca).
- P2: SEO/meta tags, Open Graph, favicon da marca.

## Credenciais de teste
- Sem autenticação no app. Nada em test_credentials.md.
