import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-maestri',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri maestri FIT</h1>
        <p>4 maestri certificati Federazione Italiana Tennis e Padel. Formazione per ogni livello.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="maestri$ | async as data">
      <ul class="maestri-grid">
        <li *ngFor="let maestro of data.maestri" class="maestro-card">
          <div class="maestro-avatar" aria-hidden="true">
            {{ maestro.nome.charAt(0) }}{{ maestro.nome.split(' ')[1]?.charAt(0) ?? '' }}
          </div>
          <div class="maestro-info">
            <h2>{{ maestro.nome }}</h2>
            <p class="maestro-ruolo">{{ maestro.ruolo }}</p>
            <span class="maestro-cert">{{ maestro.certificazione }}</span>
            <p class="maestro-bio">{{ maestro.bio }}</p>

            <div class="maestro-meta">
              <div class="meta-block">
                <strong>Specialita</strong>
                <ul class="tag-list">
                  <li *ngFor="let s of maestro.specialita" class="tag">{{ s }}</li>
                </ul>
              </div>
              <div class="meta-block">
                <strong>Livelli</strong>
                <ul class="tag-list">
                  <li *ngFor="let l of maestro.livelli" class="tag tag--level">{{ l }}</li>
                </ul>
              </div>
              <div class="meta-block">
                <strong>Lingue</strong>
                <p class="meta-text">{{ maestro.lingue.join(', ') }}</p>
              </div>
              <div class="meta-block">
                <strong>Esperienza</strong>
                <p class="meta-text">{{ maestro.anniEsperienza }} anni</p>
              </div>
            </div>

            <a routerLink="/prenota" class="btn-lezione">Prenota una lezione</a>
          </div>
        </li>
      </ul>

      <section class="info-lezioni">
        <h2>Come funzionano le lezioni</h2>
        <ul class="lezioni-steps">
          <li>
            <span class="step-num">1</span>
            <div>
              <h3>Scegli il maestro</h3>
              <p>Ogni maestro ha specializzazioni diverse. Leggi il profilo e scegli quello più adatto al tuo livello e obiettivo.</p>
            </div>
          </li>
          <li>
            <span class="step-num">2</span>
            <div>
              <h3>Prenota il campo</h3>
              <p>Vai alla sezione Prenota, seleziona "Lezione con maestro" e scegli data, orario e tipo (individuale o coppia).</p>
            </div>
          </li>
          <li>
            <span class="step-num">3</span>
            <div>
              <h3>Arriva e gioca</h3>
              <p>Il campo è prenotato, il maestro è lì ad aspettarti. Puoi nolegliare la racchetta al bar se non la hai.</p>
            </div>
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
      .maestri-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .maestro-card {
        display: flex;
        gap: 2rem;
        padding: 2rem;
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        align-items: flex-start;
      }
      .maestro-avatar {
        width: 80px;
        height: 80px;
        min-width: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #1f2328;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 800;
      }
      .maestro-info { flex: 1; }
      .maestro-info h2 { margin: 0 0 0.25rem; font-size: 1.3rem; }
      .maestro-ruolo {
        color: var(--color-accent-dark);
        font-weight: 600;
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
      }
      .maestro-cert {
        display: inline-block;
        font-size: 0.75rem;
        background: #fef9c3;
        color: #854d0e;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      .maestro-bio {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.7;
        margin: 0 0 1.5rem;
      }
      .maestro-meta {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      .meta-block strong {
        display: block;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-fg-muted);
        margin-bottom: 0.4rem;
      }
      .tag-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .tag {
        font-size: 0.75rem;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .tag--level {
        background: #dcfce7;
        color: #15803d;
        border-color: #bbf7d0;
      }
      .meta-text {
        font-size: 0.875rem;
        margin: 0;
        color: var(--color-fg-default);
      }
      .btn-lezione {
        display: inline-block;
        padding: 0.55rem 1.25rem;
        background: var(--color-accent);
        color: #1f2328;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        transition: background 0.15s;
      }
      .btn-lezione:hover {
        background: var(--color-accent-dark);
        color: #ffffff;
        text-decoration: none;
      }
      @media (max-width: 600px) {
        .maestro-card { flex-direction: column; }
      }
      .info-lezioni {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
      }
      .info-lezioni h2 { margin: 0 0 1.5rem; }
      .lezioni-steps {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .lezioni-steps li {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }
      .step-num {
        width: 36px;
        height: 36px;
        min-width: 36px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #1f2328;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 1rem;
      }
      .lezioni-steps h3 { margin: 0 0 0.25rem; font-size: 1rem; }
      .lezioni-steps p { margin: 0; color: var(--color-fg-muted); font-size: 0.9rem; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaestriComponent {
  private readonly mockData = inject(MockDataService);

  readonly maestri$ = this.mockData.maestri$;
}
