import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Padel Club Milano — 8 campi indoor/outdoor a Milano'
  },
  {
    path: 'campi',
    loadComponent: () => import('./pages/campi/campi.component').then((m) => m.CampiComponent),
    title: 'I nostri campi — Padel Club Milano'
  },
  {
    path: 'tariffe',
    loadComponent: () => import('./pages/tariffe/tariffe.component').then((m) => m.TariffeComponent),
    title: 'Tariffe e abbonamenti — Padel Club Milano'
  },
  {
    path: 'maestri',
    loadComponent: () => import('./pages/maestri/maestri.component').then((m) => m.MaestriComponent),
    title: 'I nostri maestri FIT — Padel Club Milano'
  },
  {
    path: 'prenota',
    loadComponent: () => import('./pages/prenota/prenota.component').then((m) => m.PrenotaComponent),
    title: 'Prenota un campo — Padel Club Milano'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
