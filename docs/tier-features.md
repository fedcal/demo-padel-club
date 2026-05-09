# Funzionalità per Tier — Padel Club Milano

Tre livelli di template per gestione campi padel, dal booking base al matchmaking avanzato con ELO ranking.

## Tier Base — €500-800 (consegna 2-3 settimane)

**Per chi**: Club padel nuovo che vuole trasformare booking da telefono a digitale.  
**Sforzo stimato**: ~80h.

### Funzionalità incluse

- **Home Hero** con foto campi + CTA "Prenota Ora"
- **Booking Campi Realtime**
  - Calendario 8 campi (4 indoor + 4 outdoor)
  - Slot orari 1h / 90min selezionabili
  - Availability live color-coded
  
- **Profilo Giocatore**
  - Storico prenotazioni
  - Lista contatti compagni abituali
  - Wishlist tornei
  
- **Menu Prezzi**
  - Tariffe base €20-40/h per categoria
  - Dynamic pricing peak hours (venerdì-domenica)
  - Abbonamenti mensili 10h/20h
  
- **Schema SportsEvent JSON-LD** per SEO
- **Mobile-first responsive** (LCP <2.5s)
- **HTTPS + SSL certificate** gratis Let's Encrypt

### Cosa NON è incluso

- Matchmaking automatico
- ELO ranking tracking
- Tornei round-robin
- Live scoring
- Streaming partite
- Integrazione FIT ranking

---

## Tier Intermedio — €1.500-2.200 (consegna 4-6 settimane)

**Per chi**: Club consolidato che vuole aumentare engagement con tornei e community scoring.  
**Sforzo stimato**: ~250h.

### Funzionalità incluse (oltre al Base)

- **Matchmaking Partner**
  - Sistema trova compagno stello livello
  - ELO ranking semplificato (aggiornamento manuale post-match)
  - Suggerimenti giocatori simili
  
- **Tornei Automatici**
  - Round-robin generator (4-8 giocatori)
  - Bracket seeding per livello
  - Live scorecard mobile per arbitri
  
- **Live Scoring Dashboard**
  - Set + games + punti aggiornati real-time
  - Leader board tornei visibile pubblico
  - Photo podium winner
  
- **Membership + Crediti**
  - Prepagamento crediti (€100 = 5 ore)
  - Fattura automatica Stripe
  - Rollover crediti inutilizzati trimestrale
  
- **Multi-lingua IT/EN/DE** (clientela EU)
- **Newsletter opt-in** tornei e promozioni
- **Admin Dashboard** modifica prezzi/campi senza codice
- **Analytics** occupazione campi + revenue

### Integrazioni disponibili

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Stripe | 1.4% + €0.30 per transazione | Payment processor |
| SendGrid Email | Free (100/giorno) | Newsletter tornei |
| Twilio SMS | €15-30 | Reminder prenotazioni |

---

## Tier Avanzato — €4.000-6.000 (consegna 10-12 settimane)

**Per chi**: Club con 8+ campi o catena regionale padel che vuole engagement community max.  
**Sforzo stimato**: ~600h.

### Funzionalità incluse (oltre all'Intermedio)

- **Video AI Highlights**
  - Camera fissa mounting su campi
  - LLaVA auto-detect punti vincenti
  - Clip 30s highlight automatico
  - Export WhatsApp/social per giocatori
  
- **Live Streaming Tornei**
  - Restream.io multi-platform (YouTube/TikTok/Instagram)
  - Commentary template + leaderboard overlay
  - Archive on-demand 3 mesi
  
- **ELO Ranking Avanzato**
  - Aggiornamento automatico post-match
  - Seeding tornei per ranking ufficiale
  - Monthly ranking PDF certificate
  - Integration Playtomic API (optional FIT rank)
  
- **Community Engagement**
  - Social feed giocatori (foto match + commenti)
  - Achievement badge (10 match, torneo vinto, unbeaten)
  - Leaderboard stagionale (singolo + doppio)
  
- **Multi-Location Admin**
  - Gestisci 2-3 club da dashboard centrale
  - Menu prezzi diverse per location
  - Consolidation tornei inter-club
  - Revenue reporting merge
  
- **Advanced Analytics**
  - Heatmap uso campi per tipo giocatore
  - Churn prediction (giocatori no-show)
  - Revenue per fascia oraria + stagionale
  - Player lifetime value

### Integrazioni Enterprise

| Stack | Costo/anno | Note |
|-------|-----------|------|
| Ollama AI (on-prem) | €0 | Video analysis LLaVA |
| Restream.io | €89-299 | Streaming multi-platform |
| Playtomic API | Free | Ranking FIT ufficiale sync |
| Leaflet Maps | €0 | Geolocation club finder |

---

## Confronto Tier

| Funzionalità | Base | Intermedio | Avanzato |
|---|:---:|:---:|:---:|
| Booking Realtime | ✓ | ✓ | ✓ |
| Profilo Giocatore | ✓ | ✓ | ✓ |
| Menu Prezzi | ✓ | ✓ | ✓ |
| **Matchmaking Partner** | — | ✓ | ✓ |
| **ELO Ranking** | — | ✓ | ✓ |
| **Tornei Automatici** | — | ✓ | ✓ |
| **Live Scoring** | — | ✓ | ✓ |
| **Video Highlights** | — | — | ✓ |
| **Live Streaming** | — | — | ✓ |
| **Community Social** | — | — | ✓ |
| **Multi-Location** | — | — | ✓ |

---

## Manutenzione Ricorrente

| Piano | €/mese | Incluso |
|-------|---------|---------|
| **Basic** | €50 | Hosting + SSL + backup + email support |
| **Standard** | €100 | Basic + 4h modifiche/mese + monitoring + phone support |
| **Premium** | €200 | Standard + 12h modifiche/mese + CDN + ELO tuning + AI updates |

---

## Partnership & Supporto

**Hosting** — Hetzner VPS (EU-based, GDPR compliant)  
**SSL/CDN** — Cloudflare free tier  
**Payment** — Stripe + Pagamenti italiani  
**Support** — Federico Calò, email + Telegram

---

**Scegli il tier adatto. Contatta Federico per quotazione personalizzata.**
