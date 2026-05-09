import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoAttivita, CampiData, TariffeData, MaestriData, FaqData } from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache stream con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoAttivita> = this.http
    .get<InfoAttivita>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly campi$: Observable<CampiData> = this.http
    .get<CampiData>('/assets/mock/campi.json')
    .pipe(shareReplay(1));

  readonly tariffe$: Observable<TariffeData> = this.http
    .get<TariffeData>('/assets/mock/tariffe.json')
    .pipe(shareReplay(1));

  readonly maestri$: Observable<MaestriData> = this.http
    .get<MaestriData>('/assets/mock/maestri.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<FaqData> = this.http
    .get<FaqData>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
