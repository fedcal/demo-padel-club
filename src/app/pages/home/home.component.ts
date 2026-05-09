import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, CurrencyPipe, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Il padel a Milano, come si deve</h1>
        <p class="hero-tagline">8 campi indoor e outdoor, maestri FIT certificati, tornei mensili. In zona Ripamonti.</p>
        <div class="hero-actions">
          <a routerLink="/prenota" class="btn btn-primary">Prenota un campo</a>
          <a routerLink="/campi" class="btn btn-secondary">Scopri i campi</a>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat__number">8</span>
            <span class="stat__label">Campi</span>
          </div>
          <div class="stat">
            <span class="stat__number">4</span>
            <span class="stat__label">Maestri FIT</span>
          </div>
          <div class="stat">
            <span class="stat__number">€20</span>
            <span class="stat__label">Da/ora</span>
          </div>
          <div class="stat">
            <span class="stat__number">7/7</span>
            <span class="stat__label">Aperto</span>
          </div>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Padel Club Milano</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🏟️</span>
          <h3>4 campi indoor</h3>
          <p>Gioca tutto l'anno indipendentemente dal meteo. Illuminazione LED professionale da 600 lux.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">☀️</span>
          <h3>4 campi outdoor</h3>
          <p>Erba sintetica all-weather certificata FIP. Vista panoramica sul parco nelle serate estive.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎓</span>
          <h3>Maestri FIT certificati</h3>
          <p>4 maestri con certificazione federale, ex giocatori e formatori. Lezioni per tutti i livelli.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🏆</span>
          <h3>Tornei mensili</h3>
          <p>Campionati interni per categoria C/B/A e Open trimestrale con ranking FIT aggiornato.</p>
        </li>
      </ul>
    </section>

    <section class="featured-campi demo-container" *ngIf="campiFeature$ | async as campi">
      <div class="section-header">
        <h2>I campi in evidenza</h2>
        <a routerLink="/campi" class="link-more">Tutti gli 8 campi →</a>
      </div>
      <ul class="campi-grid">
        <li *ngFor="let campo of campi" class="campo-card">
          <div class="campo-card__badge" [class.badge-indoor]="campo.tipo === 'indoor'" [class.badge-outdoor]="campo.tipo === 'outdoor'">
            {{ campo.tipo === 'indoor' ? 'Indoor' : 'Outdoor' }}
          </div>
          <h3 class="campo-card__nome">{{ campo.nome }}</h3>
          <p class="campo-card__desc">{{ campo.descrizione }}</p>
          <ul class="campo-card__features">
            <li>{{ campo.superficie }}</li>
            <li>{{ campo.illuminazione }}</li>
            <li *ngIf="campo.vetrate">Vetrate panoramiche</li>
            <li *ngIf="campo.tribunaBiglietti">Tribuna spettatori</li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Prenota il tuo campo adesso</h2>
        <p>Disponibilità in tempo reale 7 giorni su 7. Cancellazione gratuita fino a 4 ore prima.</p>
        <div class="hero-actions">
          <a routerLink="/prenota" class="btn btn-primary">Prenota ora</a>
          <a routerLink="/tariffe" class="btn btn-secondary-light">Vedi tariffe</a>
        </div>
      </div>
    </section>

    <section class="faq-preview demo-container" *ngIf="faqPreview$ | async as faq">
      <h2>Domande frequenti</h2>
      <ul class="faq-list">
        <li *ngFor="let item of faq" class="faq-item">
          <h3>{{ item.domanda }}</h3>
          <p>{{ item.risposta }}</p>
        </li>
      </ul>
      <p class="faq-more">
        <a routerLink="/prenota">Hai altre domande? Contattaci →</a>
      </p>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 3rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #1f2328;
      }
      .btn-primary:hover {
        background: var(--color-accent-dark);
        color: #ffffff;
        text-decoration: none;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .btn-secondary-light {
        background: rgba(255,255,255,0.15);
        color: #ffffff;
        border: 1px solid rgba(255,255,255,0.35);
      }
      .btn-secondary-light:hover {
        background: rgba(255,255,255,0.25);
        text-decoration: none;
      }
      .hero-stats {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .stat__number {
        font-size: 2rem;
        font-weight: 800;
        color: var(--color-accent-dark);
        line-height: 1;
      }
      .stat__label {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin-top: 0.25rem;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured-campi {
        padding: 4rem 1rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent-dark);
        text-decoration: none;
        font-weight: 600;
      }
      .link-more:hover {
        text-decoration: underline;
      }
      .campi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .campo-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        position: relative;
      }
      .campo-card__badge {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        margin-bottom: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .badge-indoor {
        background: #dbeafe;
        color: #1d4ed8;
      }
      .badge-outdoor {
        background: #dcfce7;
        color: #15803d;
      }
      .campo-card__nome {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        font-weight: 700;
      }
      .campo-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.75rem;
      }
      .campo-card__features {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .campo-card__features li {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        padding-left: 1rem;
        position: relative;
      }
      .campo-card__features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-accent-dark);
        font-weight: 700;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .faq-preview {
        padding: 4rem 1rem;
      }
      .faq-preview h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
        gap: 1rem;
      }
      .faq-item {
        padding: 1.25rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .faq-item h3 {
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
        color: var(--color-fg-default);
      }
      .faq-item p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      .faq-more {
        text-align: center;
        margin: 0;
        font-size: 0.95rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly campiFeature$ = this.mockData.campi$.pipe(
    map((data) => data.campi.filter((c) => c.tribunaBiglietti || c.id <= 2))
  );

  readonly faqPreview$ = this.mockData.faq$.pipe(
    map((data) => data.faq.slice(0, 4))
  );
}
