
export interface DepreciationRow {
  year: number;
  valAcq: number;
  amort: number;
  vcn: number;
}

export interface JournalEntry {
  account: string;
  label: string;
  debit?: number;
  credit?: number;
}

export interface InvoiceData {
  htva: number;
  tva: number;
  tvac: number;
}

export interface StepData {
  step1: {
    htva: string;
    tva: string;
    tvac: string;
  };
  step2: {
    valAcq: string;
    amort2025: string;
    amort2026: string;
    amort2027: string;
  };
  step3: {
    pv: string;
    vcn: string;
  };
}
