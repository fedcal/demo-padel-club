import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Campo } from '../../data/types';

interface CampiView {
  indoor: Campo[];
  outdoor: Campo[];
}

@Component({
  selector: 'app-campi',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri 8 campi</h1>
        <p>4 indoor + 4 outdoor, tutti con erba sintetica certificata FIP e illuminazione professionale.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="view$ | async as view">
      <section class="campi-section">
        <h2 class="section-title">
          <span class="badge-indoor">Indoor</span>
          Campi coperti ({{ view.indoor.length }})
        </h2>
        <p class="section-desc">Gioca tutto l'anno in totale comfort. Climatizzati in inverno, ventilati in estate.</p>
        <ul class="campi-grid">
          <li *ngFor="let campo of view.indoor" class="campo-card">
            <div class="campo-card__header">
              <h3>{{ campo.nome }}</h3>
              <span class="disponibile" *ngIf="campo.disponibile">Disponibile</span>
            </div>
            <p class="campo-card__desc">{{ campo.descrizione }}</p>
            <ul class="campo-features">
              <li>
                <strong>Superficie:</strong> {{ campo.superficie }}
              </li>
              <li>
                <strong>Illuminazione:</strong> {{ campo.illuminazione }}
              </li>
              <li>
                <strong>Dimensioni:</strong> {{ campo.dimensioni }}
              </li>
              <li *ngIf="campo.vetrate">Pareti in vetro panoramico</li>
              <li *ngIf="campo.tribunaBiglietti">Tribuna spettatori inclusa</li>
            </ul>
            <a routerLink="/prenota" class="btn-prenota">Prenota questo campo</a>
          </li>
        </ul>
      </section>

      <section class="campi-section">
        <h2 class="section-title">
          <span class="badge-outdoor">Outdoor</span>
          Campi esterni ({{ view.outdoor.length }})
        </h2>
        <p class="section-desc">Erba sintetica all-weather certificata. In caso di pioggia ti spostiamo su un campo indoor senza costi aggiuntivi.</p>
        <ul class="campi-grid">
          <li *ngFor="let campo of view.outdoor" class="campo-card">
            <div class="campo-card__header">
              <h3>{{ campo.nome }}</h3>
              <span class="disponibile" *ngIf="campo.disponibile">Disponibile</span>
            </div>
            <p class="campo-card__desc">{{ campo.descrizione }}</p>
            <ul class="campo-features">
              <li>
                <strong>Superficie:</strong> {{ campo.superficie }}
              </li>
              <li>
                <strong>Illuminazione:</strong> {{ campo.illuminazione }}
              </li>
              <li>
                <strong>Dimensioni:</strong> {{ campo.dimensioni }}
              </li>
              <li *ngIf="campo.vetrate">Pareti in vetro panoramico</li>
              <li *ngIf="campo.tribunaBiglietti">Tribuna spettatori inclusa</li>
            </ul>
            <a routerLink="/prenota" class="btn-prenota">Prenota questo campo</a>
          </li>
        </ul>
      </section>

      <section class="info-band">
        <h2>Servizi inclusi in ogni prenotazione</h2>
        <ul class="servizi-list">
          <li><span aria-hidden="true">🚿</span> Spogliatoi con docce calde</li>
          <li><span aria-hidden="true">🅿️</span> Parcheggio gratuito 80 posti</li>
          <li><span aria-hidden="true">🍹</span> Bar interno aperto durante gli orari del club</li>
          <li><span aria-hidden="true">📶</span> Wi-Fi gratuito in tutta la struttura</li>
          <li><span aria-hidden="true">♿</span> Struttura accessibile ai disabili</li>
        </ul>
      </section>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .campi-section {
        margin-bottom: 4rem;
      }
      .section-title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
      }
      .section-desc {
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
      }
      .badge-indoor {
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.25rem 0.6rem;
        border-radius: 9999px;
        background: #dbeafe;
        color: #1d4ed8;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .badge-outdoor {
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.25rem 0.6rem;
        border-radius: 9999px;
        background: #dcfce7;
        color: #15803d;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .campi-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
      }
      .campo-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .campo-card__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .campo-card__header h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .disponibile {
        font-size: 0.7rem;
        font-weight: 600;
        background: #dafbe1;
        color: var(--color-success);
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        white-space: nowrap;
      }
      .campo-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.6;
      }
      .campo-features {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
      .campo-features li {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        padding-left: 1rem;
        position: relative;
      }
      .campo-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-accent-dark);
        font-weight: 700;
        font-size: 0.8rem;
      }
      .btn-prenota {
        display: inline-block;
        margin-top: auto;
        padding: 0.5rem 1rem;
        background: var(--color-accent);
        color: #1f2328;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        text-align: center;
        transition: background 0.15s;
      }
      .btn-prenota:hover {
        background: var(--color-accent-dark);
        color: #ffffff;
        text-decoration: none;
      }
      .info-band {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
        margin-top: 2rem;
      }
      .info-band h2 {
        margin: 0 0 1.5rem;
        text-align: center;
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
      }
      .servizi-list li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.95rem;
      }
      .servizi-list li span {
        font-size: 1.25rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampiComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.campi$.pipe(
    map((data): CampiView => ({
      indoor: data.campi.filter((c) => c.tipo === 'indoor'),
      outdoor: data.campi.filter((c) => c.tipo === 'outdoor')
    }))
  );
}
