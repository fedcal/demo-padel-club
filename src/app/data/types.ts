// Tipi TypeScript per i dati mock del Padel Club

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface Struttura {
  campiTotali: number;
  campiIndoor: number;
  campiOutdoor: number;
  spogliatoi: boolean;
  noleggioRacchette: boolean;
  vendutaPalle: boolean;
  barInterno: boolean;
  parcheggioGratuito: boolean;
  wifiGratuito: boolean;
  accessibileDisabili: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  struttura: Struttura;
  metaSeo: MetaSeo;
}

export type TipoCampo = 'indoor' | 'outdoor';

export interface Campo {
  id: number;
  nome: string;
  tipo: TipoCampo;
  superficie: string;
  illuminazione: string;
  vetrate: boolean;
  tribunaBiglietti: boolean;
  dimensioni: string;
  capienza: number;
  disponibile: boolean;
  descrizione: string;
}

export interface CampiData {
  campi: Campo[];
}

export interface TariffaOraria {
  id: string;
  fascia: string;
  orario: string;
  tipo: TipoCampo;
  prezzoOra: number;
  giorni: string;
}

export interface Abbonamento {
  id: string;
  nome: string;
  prezzo: number;
  periodo: string;
  inclusi: string[];
}

export interface ServizioExtra {
  nome: string;
  prezzo: number;
  unitaMisura: string;
}

export interface TariffeData {
  tariffe: {
    orarie: TariffaOraria[];
    abbonamenti: Abbonamento[];
    servizi: ServizioExtra[];
  };
}

export interface Maestro {
  id: number;
  nome: string;
  ruolo: string;
  certificazione: string;
  anniEsperienza: number;
  bio: string;
  specialita: string[];
  livelli: string[];
  lingue: string[];
}

export interface MaestriData {
  maestri: Maestro[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface FaqData {
  faq: FaqItem[];
}
