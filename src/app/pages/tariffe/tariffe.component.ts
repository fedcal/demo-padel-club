import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-tariffe',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Tariffe e abbonamenti</h1>
        <p>Prezzi trasparenti, nessun costo nascosto. Da €20/h per campi outdoor mattutini.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="view$ | async as view">
      <section class="tariffe-section">
        <h2>Tariffe orarie</h2>
        <div class="tipo-tabs">
          <div class="tipo-block">
            <h3 class="tipo-title">
              <span class="badge-indoor">Indoor</span>
            </h3>
            <table class="tariffe-table" aria-label="Tariffe campi indoor">
              <thead>
                <tr>
                  <th>Fascia oraria</th>
                  <th>Orario</th>
                  <th>Giorni</th>
                  <th>Prezzo/h</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let t of view.indoor">
                  <td>{{ t.fascia }}</td>
                  <td>{{ t.orario }}</td>
                  <td>{{ t.giorni }}</td>
                  <td class="price-cell">{{ t.prezzoOra | currency: 'EUR':'symbol':'1.0-0' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tipo-block">
            <h3 class="tipo-title">
              <span class="badge-outdoor">Outdoor</span>
            </h3>
            <table class="tariffe-table" aria-label="Tariffe campi outdoor">
              <thead>
                <tr>
                  <th>Fascia oraria</th>
                  <th>Orario</th>
                  <th>Giorni</th>
                  <th>Prezzo/h</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let t of view.outdoor">
                  <td>{{ t.fascia }}</td>
                  <td>{{ t.orario }}</td>
                  <td>{{ t.giorni }}</td>
                  <td class="price-cell">{{ t.prezzoOra | currency: 'EUR':'symbol':'1.0-0' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p class="tariffa-note">Prezzi per campo intero (4 giocatori). Durata standard prenotazione: 1h30 (90 min).</p>
      </section>

      <section class="abbonamenti-section">
        <h2>Abbonamenti mensili</h2>
        <p class="section-intro">Risparmia con un abbonamento mensile e accedi a vantaggi esclusivi.</p>
        <ul class="abbonamenti-grid">
          <li *ngFor="let abb of view.abbonamenti" class="abb-card" [class.abb-card--featured]="abb.id === 'pro'">
            <div class="abb-card__header">
              <h3>{{ abb.nome }}</h3>
              <div class="abb-card__price">
                <span class="price-value">{{ abb.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
                <span class="price-period">/{{ abb.periodo }}</span>
              </div>
            </div>
            <ul class="abb-inclusi">
              <li *ngFor="let item of abb.inclusi">{{ item }}</li>
            </ul>
            <a routerLink="/prenota" class="btn-abbonamento">Scegli questo piano</a>
          </li>
        </ul>
      </section>

      <section class="servizi-section">
        <h2>Servizi aggiuntivi</h2>
        <ul class="servizi-list">
          <li *ngFor="let s of view.servizi" class="servizio-item">
            <span class="servizio-nome">{{ s.nome }}</span>
            <span class="servizio-prezzo">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}/{{ s.unitaMisura }}</span>
          </li>
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
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0; }
      .content { padding: 3rem 1rem; }
      .tariffe-section { margin-bottom: 4rem; }
      .tariffe-section h2 { margin-bottom: 1.5rem; }
      .tipo-tabs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        margin-bottom: 1rem;
      }
      .tipo-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0 0 1rem;
        font-size: 1.1rem;
      }
      .badge-indoor {
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        background: #dbeafe;
        color: #1d4ed8;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .badge-outdoor {
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        background: #dcfce7;
        color: #15803d;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .tariffe-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
      }
      .tariffe-table th {
        text-align: left;
        padding: 0.5rem 0.75rem;
        background: var(--color-bg-subtle);
        border-bottom: 2px solid var(--color-border);
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .tariffe-table td {
        padding: 0.6rem 0.75rem;
        border-bottom: 1px solid var(--color-border);
      }
      .price-cell {
        font-weight: 700;
        color: var(--color-accent-dark);
        text-align: right;
      }
      .tariffa-note {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin: 0.5rem 0 0;
      }
      .abbonamenti-section { margin-bottom: 4rem; }
      .abbonamenti-section h2 { margin-bottom: 0.5rem; }
      .section-intro {
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
      }
      .abbonamenti-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.25rem;
      }
      .abb-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: #ffffff;
      }
      .abb-card--featured {
        border-color: var(--color-accent);
        border-width: 2px;
        position: relative;
      }
      .abb-card--featured::before {
        content: 'Più scelto';
        position: absolute;
        top: -0.75rem;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-accent);
        color: #1f2328;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 0.2rem 0.75rem;
        border-radius: 9999px;
        white-space: nowrap;
      }
      .abb-card__header { display: flex; flex-direction: column; gap: 0.5rem; }
      .abb-card__header h3 { margin: 0; font-size: 1.05rem; }
      .abb-card__price { display: flex; align-items: baseline; gap: 0.25rem; }
      .price-value {
        font-size: 2rem;
        font-weight: 800;
        color: var(--color-accent-dark);
      }
      .price-period { color: var(--color-fg-muted); font-size: 0.9rem; }
      .abb-inclusi {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        flex: 1;
      }
      .abb-inclusi li {
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        padding-left: 1.25rem;
        position: relative;
      }
      .abb-inclusi li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-accent-dark);
        font-weight: 700;
      }
      .btn-abbonamento {
        display: block;
        text-align: center;
        padding: 0.65rem 1rem;
        background: var(--color-accent);
        color: #1f2328;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        transition: background 0.15s;
      }
      .btn-abbonamento:hover {
        background: var(--color-accent-dark);
        color: #ffffff;
        text-decoration: none;
      }
      .servizi-section h2 { margin-bottom: 1.5rem; }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .servizio-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px dashed var(--color-border);
        gap: 1rem;
      }
      .servizio-nome { font-size: 0.95rem; }
      .servizio-prezzo {
        font-weight: 700;
        color: var(--color-accent-dark);
        white-space: nowrap;
        font-size: 0.95rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TariffeComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.tariffe$.pipe(
    map((data) => ({
      indoor: data.tariffe.orarie.filter((t) => t.tipo === 'indoor'),
      outdoor: data.tariffe.orarie.filter((t) => t.tipo === 'outdoor'),
      abbonamenti: data.tariffe.abbonamenti,
      servizi: data.tariffe.servizi
    }))
  );
}
