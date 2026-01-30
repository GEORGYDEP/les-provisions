
import { DepreciationRow, JournalEntry } from './types';

export const EXERCISE_DATA = {
  purchaseValue: 500000,
  purchaseDate: '31/08/2025',
  saleDate: '01/02/2027',
  vatRate: 0.21,
  lifeSpan: 5,
  salePriceHT: 400000,
};

export const PURCHASE_ENTRY: JournalEntry[] = [
  { account: '2410', label: 'Camion', debit: 500000 },
  { account: '4110', label: 'TVA à récupérer', debit: 105000 },
  { account: '4400', label: 'Fournisseur', credit: 605000 },
];

export const DEPRECIATION_TABLE: DepreciationRow[] = [
  { year: 2025, valAcq: 500000, amort: 33424.66, vcn: 466575.34 },
  { year: 2026, valAcq: 500000, amort: 100000.00, vcn: 366575.34 },
  { year: 2027, valAcq: 500000, amort: 8493.15, vcn: 358082.19 },
];

export const CORRECT_ANSWERS = {
  step1: { htva: 400000, tva: 84000, tvac: 484000 },
  step2: {
    valAcq: 500000,
    amort2025: 33424.66,
    amort2026: 100000,
    amort2027: 8493.15,
    vcn: 358082.19
  },
  step3: {
    pv: 400000,
    vcn: 358082.19,
    result: 41917.81,
    isPlusValue: true
  }
};
