import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, combineLatest } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-prenota',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Prenota un campo</h1>
        <p>Disponibilità in tempo reale. Cancellazione gratuita fino a 4 ore prima.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="viewData$ | async as view">
      <div class="prenota-grid">
        <section class="form-block">
          <h2>Nuova prenotazione</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">

            <fieldset class="fieldset">
              <legend>Campo e data</legend>

              <div class="field">
                <label for="campo">Campo</label>
                <select id="campo" formControlName="campo" required>
                  <option value="">— Seleziona un campo —</option>
                  <optgroup label="Indoor">
                    <option *ngFor="let c of view.campiIndoor" [value]="c.id">
                      {{ c.nome }}
                    </option>
                  </optgroup>
                  <optgroup label="Outdoor">
                    <option *ngFor="let c of view.campiOutdoor" [value]="c.id">
                      {{ c.nome }}
                    </option>
                  </optgroup>
                </select>
              </div>

              <div class="row">
                <div class="field">
                  <label for="data">Data</label>
                  <input id="data" type="date" formControlName="data" required />
                </div>
                <div class="field">
                  <label for="ora">Ora inizio</label>
                  <select id="ora" formControlName="ora" required>
                    <option value="">—</option>
                    <option *ngFor="let slot of orariDisponibili" [value]="slot">{{ slot }}</option>
                  </select>
                </div>
                <div class="field">
                  <label for="durata">Durata</label>
                  <select id="durata" formControlName="durata" required>
                    <option value="60">1h</option>
                    <option value="90">1h30</option>
                    <option value="120">2h</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend>Tipo di sessione</legend>
              <div class="field">
                <label for="tipologia">Tipologia</label>
                <select id="tipologia" formControlName="tipologia" required>
                  <option value="match">Partita libera (match)</option>
                  <option value="lezione_individuale">Lezione individuale con maestro</option>
                  <option value="lezione_coppia">Lezione in coppia con maestro (2 giocatori)</option>
                  <option value="allenamento">Allenamento autonomo</option>
                </select>
              </div>
              <div class="field" *ngIf="isMaestroRequired()">
                <label for="maestro">Scegli il maestro</label>
                <select id="maestro" formControlName="maestro">
                  <option value="">— Prima disponibile —</option>
                  <option *ngFor="let m of view.maestri" [value]="m.id">
                    {{ m.nome }} — {{ m.certificazione }}
                  </option>
                </select>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend>I tuoi dati</legend>
              <div class="row">
                <div class="field">
                  <label for="nome">Nome</label>
                  <input id="nome" type="text" formControlName="nome" required autocomplete="given-name" />
                </div>
                <div class="field">
                  <label for="cognome">Cognome</label>
                  <input id="cognome" type="text" formControlName="cognome" required autocomplete="family-name" />
                </div>
              </div>
              <div class="row">
                <div class="field">
                  <label for="email">Email</label>
                  <input id="email" type="email" formControlName="email" required autocomplete="email" />
                </div>
                <div class="field">
                  <label for="telefono">Telefono</label>
                  <input id="telefono" type="tel" formControlName="telefono" required autocomplete="tel" />
                </div>
              </div>
            </fieldset>

            <div class="field">
              <label for="note">Note aggiuntive</label>
              <textarea id="note" formControlName="note" rows="3" placeholder="Allergie, richieste speciali, numero pallettoni da noleggiare…"></textarea>
            </div>

            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" required />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati per la prenotazione.
              </label>
            </div>

            <button type="submit" class="btn-submit" [disabled]="form.invalid">
              Conferma prenotazione
            </button>
            <p class="form-disclaimer">
              Demo non funzionale: nessuna prenotazione reale viene inviata. In un sito reale riceveresti un'email di conferma.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou-icon" aria-hidden="true">🎾</span>
              <h3>Prenotazione confermata!</h3>
              <p>
                <strong>{{ form.value.nome }} {{ form.value.cognome }}</strong>, la tua prenotazione per il
                <strong>{{ getCampoNome(form.value.campo, view.campiIndoor, view.campiOutdoor) }}</strong>
                il <strong>{{ form.value.data }}</strong> alle <strong>{{ form.value.ora }}</strong>
                (durata {{ form.value.durata }} min) è stata simulata con successo.
              </p>
              <p *ngIf="isMaestroRequired()">
                Maestro richiesto: {{ getMaestroNome(form.value.maestro, view.maestri) }}.
              </p>
              <p class="thankyou-note">
                In un sito reale riceveresti un'email a <strong>{{ form.value.email }}</strong> con il riepilogo e le istruzioni per il pagamento.
              </p>
              <button type="button" class="btn-reset" (click)="reset()">Nuova prenotazione</button>
            </div>
          </ng-template>
        </section>

        <aside class="info-aside">
          <h2>Info utili</h2>

          <div class="info-card">
            <h3>Orari apertura</h3>
            <ul class="orari-list">
              <li><span>Lun – Ven</span><span>07:00 – 23:00</span></li>
              <li><span>Sab – Dom</span><span>08:00 – 22:00</span></li>
            </ul>
          </div>

          <div class="info-card">
            <h3>Regole di cancellazione</h3>
            <p>Cancellazione gratuita fino a 4 ore prima. Dopo tale limite la sessione viene addebitata (o scalata dall'abbonamento).</p>
          </div>

          <div class="info-card">
            <h3>Pioggia sui campi outdoor</h3>
            <p>In caso di maltempo ti spostiamo automaticamente su un campo indoor disponibile senza costi aggiuntivi.</p>
          </div>

          <div class="info-card">
            <h3>Contatti diretti</h3>
            <ul class="contact-list">
              <li>
                <strong>Telefono:</strong>
                <a href="tel:+390212345678">+39 02 1234 5678</a>
              </li>
              <li>
                <strong>WhatsApp:</strong>
                <a href="https://wa.me/393339876543" target="_blank" rel="noopener">+39 333 9876 543</a>
              </li>
              <li>
                <strong>Email:</strong>
                <a href="mailto:info@padelclubmilano.it">info@padelclubmilano.it</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
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
      .prenota-grid {
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: 3rem;
        align-items: flex-start;
      }
      @media (max-width: 900px) {
        .prenota-grid { grid-template-columns: 1fr; }
        .info-aside { order: -1; }
      }
      .form-block h2 { margin: 0 0 1.5rem; }
      .fieldset {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        margin-bottom: 1.25rem;
      }
      .fieldset legend {
        font-weight: 600;
        font-size: 0.875rem;
        padding: 0 0.5rem;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field:last-child { margin-bottom: 0; }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--color-fg-default);
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 1.25rem;
      }
      .field--checkbox input { width: auto; margin-top: 0.2rem; }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 0.75rem;
      }
      .btn-submit {
        width: 100%;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-md);
        border: none;
        background: var(--color-accent);
        color: #1f2328;
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.15s;
      }
      .btn-submit:hover:not(:disabled) {
        background: var(--color-accent-dark);
        color: #ffffff;
      }
      .btn-submit:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .form-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin: 0.75rem 0 0;
        text-align: center;
      }
      .thankyou {
        text-align: center;
        padding: 2rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
      }
      .thankyou-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
      .thankyou h3 { color: var(--color-success); margin: 0 0 1rem; font-size: 1.5rem; }
      .thankyou p { color: var(--color-fg-muted); margin: 0 0 0.75rem; line-height: 1.6; }
      .thankyou-note { font-size: 0.85rem; font-style: italic; }
      .btn-reset {
        margin-top: 1rem;
        padding: 0.6rem 1.5rem;
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
      }
      .btn-reset:hover {
        background: var(--color-bg-subtle);
      }
      .info-aside {
        position: sticky;
        top: 80px;
      }
      .info-aside h2 { margin: 0 0 1rem; }
      .info-card {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .info-card h3 { margin: 0 0 0.5rem; font-size: 0.95rem; }
      .info-card p { margin: 0; font-size: 0.875rem; color: var(--color-fg-muted); line-height: 1.6; }
      .orari-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .orari-list li {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        padding: 0.35rem 0;
        border-bottom: 1px dashed var(--color-border);
      }
      .orari-list li:last-child { border-bottom: none; }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        font-size: 0.875rem;
        margin-bottom: 0.35rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrenotaComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly submitted = signal(false);

  readonly orariDisponibili: string[] = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  readonly form: FormGroup = this.fb.nonNullable.group({
    campo: ['', Validators.required],
    data: ['', Validators.required],
    ora: ['', Validators.required],
    durata: ['90', Validators.required],
    tipologia: ['match', Validators.required],
    maestro: [''],
    nome: ['', [Validators.required, Validators.minLength(2)]],
    cognome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    note: [''],
    privacy: [false, Validators.requiredTrue]
  });

  readonly viewData$ = combineLatest([
    this.mockData.campi$,
    this.mockData.maestri$
  ]).pipe(
    map(([campiData, maestriData]) => ({
      campiIndoor: campiData.campi.filter((c) => c.tipo === 'indoor'),
      campiOutdoor: campiData.campi.filter((c) => c.tipo === 'outdoor'),
      maestri: maestriData.maestri
    }))
  );

  isMaestroRequired(): boolean {
    const tipologia = this.form.get('tipologia')?.value as string;
    return tipologia === 'lezione_individuale' || tipologia === 'lezione_coppia';
  }

  getCampoNome(
    id: string | number,
    indoor: Array<{ id: number; nome: string }>,
    outdoor: Array<{ id: number; nome: string }>
  ): string {
    const all = [...indoor, ...outdoor];
    return all.find((c) => String(c.id) === String(id))?.nome ?? String(id);
  }

  getMaestroNome(id: string | number, maestri: Array<{ id: number; nome: string }>): string {
    if (!id) { return 'Prima disponibilita'; }
    return maestri.find((m) => String(m.id) === String(id))?.nome ?? String(id);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ durata: '90', tipologia: 'match', privacy: false });
    this.submitted.set(false);
  }
}
