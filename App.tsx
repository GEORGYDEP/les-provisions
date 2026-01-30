
import React, { useState, useEffect } from 'react';
import { EXERCISE_DATA, PURCHASE_ENTRY, DEPRECIATION_TABLE, CORRECT_ANSWERS } from './constants';
import { StepData } from './types';

// --- Sub-components ---

const RenaissanceFrame: React.FC<{ children: React.ReactNode; title: string; className?: string }> = ({ children, title, className = "" }) => (
  <div className={`relative bg-[#f4e4bc] p-8 gold-border shadow-2xl mb-8 rounded-sm ${className}`}>
    <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#8b5e3c] -translate-x-2 -translate-y-2"></div>
    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#8b5e3c] translate-x-2 -translate-y-2"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#8b5e3c] -translate-x-2 translate-y-2"></div>
    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#8b5e3c] translate-x-2 translate-y-2"></div>
    <h2 className="renaissance-font text-3xl mb-6 text-[#5d4037] border-b-2 border-[#8b5e3c] pb-2 text-center uppercase tracking-widest">{title}</h2>
    {children}
  </div>
);

const InputField: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; expected?: number | string }> = ({ label, value, onChange, placeholder, expected }) => (
  <div className="mb-4">
    <label className="block text-[#5d4037] font-bold mb-1 renaissance-font text-sm">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white/50 border border-[#8b5e3c] p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#b8860b] ink-text"
      />
      {expected !== undefined && value && (
        <span className={parseFloat(value.replace(',', '.')) === (typeof expected === 'number' ? expected : parseFloat(expected)) ? "text-green-700" : "text-red-700"}>
          {parseFloat(value.replace(',', '.')) === (typeof expected === 'number' ? expected : parseFloat(expected)) ? "✓" : "✗"}
        </span>
      )}
    </div>
  </div>
);

const Level1 = () => (
  <RenaissanceFrame title="Niveau I: L'Origine de la Dette">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="renaissance-font text-xl text-[#8b5e3c] mb-2 underline">Énoncé de l'exercice</h3>
        <p className="italic text-lg leading-relaxed text-[#4e342e]">
          "En l'an de grâce {EXERCISE_DATA.purchaseDate.split('/')[2]}, nous fîmes l'acquisition d'un charriot motorisé d'une valeur de {EXERCISE_DATA.purchaseValue.toLocaleString()} € HTVA. 
          La taxe de 21% fut acquittée. Nous estimons son usage sur 5 cycles annuels."
        </p>
        <p className="mt-4 text-[#4e342e]">
          <strong>Prix d'achat :</strong> {EXERCISE_DATA.purchaseValue.toLocaleString()} €<br/>
          <strong>Date d'achat :</strong> {EXERCISE_DATA.purchaseDate}<br/>
          <strong>Durée de vie :</strong> {EXERCISE_DATA.lifeSpan} ans (Linéaire)
        </p>
      </div>
      <div>
        <h3 className="renaissance-font text-xl text-[#8b5e3c] mb-2 underline">Journal d'Achat (JA)</h3>
        <table className="w-full border-collapse border border-[#8b5e3c] text-sm">
          <thead>
            <tr className="bg-[#e4d4ac]">
              <th className="border border-[#8b5e3c] p-1">Compte</th>
              <th className="border border-[#8b5e3c] p-1">Libellé</th>
              <th className="border border-[#8b5e3c] p-1">Débit</th>
              <th className="border border-[#8b5e3c] p-1">Crédit</th>
            </tr>
          </thead>
          <tbody>
            {PURCHASE_ENTRY.map((e, i) => (
              <tr key={i} className="hover:bg-white/30">
                <td className="border border-[#8b5e3c] p-1">{e.account}</td>
                <td className="border border-[#8b5e3c] p-1">{e.label}</td>
                <td className="border border-[#8b5e3c] p-1 text-right">{e.debit?.toLocaleString()}</td>
                <td className="border border-[#8b5e3c] p-1 text-right">{e.credit?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="mt-8">
      <h3 className="renaissance-font text-xl text-[#8b5e3c] mb-2 underline">Tableau d'amortissement prévisionnel</h3>
      <table className="w-full border-collapse border border-[#8b5e3c] text-sm">
        <thead className="bg-[#e4d4ac]">
          <tr>
            <th className="border border-[#8b5e3c] p-2">Année</th>
            <th className="border border-[#8b5e3c] p-2">Valeur d'Acquisition</th>
            <th className="border border-[#8b5e3c] p-2">Dotation Amortissement</th>
            <th className="border border-[#8b5e3c] p-2">Valeur Comptable Nette</th>
          </tr>
        </thead>
        <tbody>
          {DEPRECIATION_TABLE.map((row, i) => (
            <tr key={i} className="text-center hover:bg-white/30">
              <td className="border border-[#8b5e3c] p-2 font-bold">{row.year}</td>
              <td className="border border-[#8b5e3c] p-2">{row.valAcq.toLocaleString()} €</td>
              <td className="border border-[#8b5e3c] p-2">{row.amort.toLocaleString()} €</td>
              <td className="border border-[#8b5e3c] p-2">{row.vcn.toLocaleString()} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </RenaissanceFrame>
);

const Level2 = () => (
  <RenaissanceFrame title="Niveau II: Le Sceau de la Vente">
    <div className="max-w-3xl mx-auto bg-white p-10 border-8 border-double border-[#8b5e3c] shadow-xl relative overflow-hidden">
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 opacity-10 pointer-events-none rotate-12">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg" alt="Vitruvian Man" />
      </div>
      
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="renaissance-font text-4xl text-[#5d4037]">ATELIERS DA VINCI</h1>
          <p className="text-xs italic">Constructeur de Merveilles & Transports</p>
          <p className="text-sm mt-2">Palazzo Vecchio, Florence</p>
          <p className="text-sm">info@davincitransports.it</p>
        </div>
        <div className="text-right">
          <h2 className="renaissance-font text-2xl mb-1">FACTURE DE VENTE</h2>
          <p className="text-sm">N° 2027/DV-0042</p>
          <p className="text-sm">Date: {EXERCISE_DATA.saleDate}</p>
        </div>
      </div>

      <div className="mb-10 p-4 border border-dashed border-[#8b5e3c]">
        <h3 className="font-bold mb-1 uppercase text-xs text-[#8b5e3c]">Destinataire</h3>
        <p className="font-serif">LOGISTIQUE DU MÉDICIS</p>
        <p className="text-sm">Via Roma, 12</p>
        <p className="text-sm">Milan, Italie</p>
      </div>

      <table className="w-full mb-10">
        <thead>
          <tr className="border-b-2 border-[#8b5e3c] renaissance-font text-sm">
            <th className="text-left py-2">Désignation des marchandises</th>
            <th className="text-right py-2">Prix Unitaire</th>
            <th className="text-right py-2">Total HTVA</th>
          </tr>
        </thead>
        <tbody className="text-sm font-serif">
          <tr>
            <td className="py-4">Vente d'un camion d'occasion (Acquis le 31/08/2025)</td>
            <td className="text-right py-4">{EXERCISE_DATA.salePriceHT.toLocaleString()} €</td>
            <td className="text-right py-4 font-bold">{EXERCISE_DATA.salePriceHT.toLocaleString()} €</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-64">
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span>Montant HTVA:</span>
            <span>{EXERCISE_DATA.salePriceHT.toLocaleString()} €</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span>TVA (21%):</span>
            <span>{(EXERCISE_DATA.salePriceHT * 0.21).toLocaleString()} €</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg text-[#5d4037]">
            <span>TOTAL TVAC:</span>
            <span>{(EXERCISE_DATA.salePriceHT * 1.21).toLocaleString()} €</span>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center cursive-font text-2xl text-[#8b5e3c]">
        Pour acquit, Leonardo.
      </div>
    </div>
  </RenaissanceFrame>
);

const Level3: React.FC<{ data: StepData; onChange: (d: StepData) => void }> = ({ data, onChange }) => {
  const updateData = (step: 'step1' | 'step2' | 'step3', key: string, value: string) => {
    const newData = { ...data };
    (newData[step] as any)[key] = value;
    onChange(newData);
  };

  const showAnswer = (step: number) => {
    const newData = { ...data };
    if (step === 1) {
      newData.step1 = {
        htva: CORRECT_ANSWERS.step1.htva.toString(),
        tva: CORRECT_ANSWERS.step1.tva.toString(),
        tvac: CORRECT_ANSWERS.step1.tvac.toString()
      };
    } else if (step === 2) {
      newData.step2 = {
        valAcq: CORRECT_ANSWERS.step2.valAcq.toString(),
        amort2025: CORRECT_ANSWERS.step2.amort2025.toString(),
        amort2026: CORRECT_ANSWERS.step2.amort2026.toString(),
        amort2027: CORRECT_ANSWERS.step2.amort2027.toString()
      };
    } else if (step === 3) {
      newData.step3 = {
        pv: CORRECT_ANSWERS.step3.pv.toString(),
        vcn: CORRECT_ANSWERS.step3.vcn.toString()
      };
    }
    onChange(newData);
  };

  const calculatedVCN = parseFloat(data.step2.valAcq || "0") - (
    parseFloat(data.step2.amort2025 || "0") + 
    parseFloat(data.step2.amort2026 || "0") + 
    parseFloat(data.step2.amort2027 || "0")
  );

  const resultValue = parseFloat(data.step3.pv || "0") - parseFloat(data.step3.vcn || "0");

  return (
    <RenaissanceFrame title="Niveau III: Le Grand Calcul de la Vente">
      <div className="space-y-12">
        {/* Step 1 */}
        <section className="bg-white/40 p-6 rounded-lg border border-[#8b5e3c]">
          <h3 className="renaissance-font text-xl mb-4 text-[#8b5e3c]">Étape 1: Déterminer les éléments de la vente</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Montant HTVA (€)" value={data.step1.htva} onChange={(v) => updateData('step1', 'htva', v)} expected={CORRECT_ANSWERS.step1.htva} />
            <InputField label="Montant TVA (21%)" value={data.step1.tva} onChange={(v) => updateData('step1', 'tva', v)} expected={CORRECT_ANSWERS.step1.tva} />
            <InputField label="Montant TVAC (€)" value={data.step1.tvac} onChange={(v) => updateData('step1', 'tvac', v)} expected={CORRECT_ANSWERS.step1.tvac} />
          </div>
          <button onClick={() => showAnswer(1)} className="mt-2 text-xs text-[#8b5e3c] underline hover:text-[#b8860b]">Besoin d'aide ? Voir la réponse</button>
        </section>

        {/* Step 2 */}
        <section className="bg-white/40 p-6 rounded-lg border border-[#8b5e3c]">
          <h3 className="renaissance-font text-xl mb-4 text-[#8b5e3c]">Étape 2: Calculer la VCN au jour de la vente</h3>
          <p className="text-sm italic mb-4">"N'oublie pas l'amortissement prorata temporis du 01/01/2027 au 01/02/2027 !"</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <InputField label="Valeur d'Acquisition (€)" value={data.step2.valAcq} onChange={(v) => updateData('step2', 'valAcq', v)} expected={CORRECT_ANSWERS.step2.valAcq} />
            <InputField label="Amort. 2025 (Prorata)" value={data.step2.amort2025} onChange={(v) => updateData('step2', 'amort2025', v)} expected={CORRECT_ANSWERS.step2.amort2025} />
            <InputField label="Amort. 2026 (Complet)" value={data.step2.amort2026} onChange={(v) => updateData('step2', 'amort2026', v)} expected={CORRECT_ANSWERS.step2.amort2026} />
            <InputField label="Amort. 2027 (Prorata 1 mois)" value={data.step2.amort2027} onChange={(v) => updateData('step2', 'amort2027', v)} expected={CORRECT_ANSWERS.step2.amort2027} />
          </div>
          <div className="mt-6 p-4 bg-[#8b5e3c]/10 rounded border-l-4 border-[#8b5e3c]">
            <p className="renaissance-font font-bold">Valeur Comptable Nette (VCN) calculée : <span className="text-[#5d4037] text-xl">{calculatedVCN.toLocaleString()} €</span></p>
            {calculatedVCN === CORRECT_ANSWERS.step2.vcn && <p className="text-green-700 font-bold text-sm">✓ Bravo, c'est la VCN exacte !</p>}
          </div>
          <div className="mt-6">
            <h4 className="font-bold mb-2">Comptabilisation du dernier amortissement (01/02/2027) :</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#8b5e3c] p-2 bg-[#e4d4ac]/50 text-sm">6302 Dot. Amort. S/IC</div>
              <div className="border border-[#8b5e3c] p-2 bg-white/50 text-right">{data.step2.amort2027 || "..."} € (D)</div>
              <div className="border border-[#8b5e3c] p-2 bg-[#e4d4ac]/50 text-sm">2419 Amort. Acté s/ camion</div>
              <div className="border border-[#8b5e3c] p-2 bg-white/50 text-right">{data.step2.amort2027 || "..."} € (C)</div>
            </div>
          </div>
          <button onClick={() => showAnswer(2)} className="mt-4 text-xs text-[#8b5e3c] underline hover:text-[#b8860b]">Besoin d'aide ? Voir la réponse</button>
        </section>

        {/* Step 3 */}
        <section className="bg-white/40 p-6 rounded-lg border border-[#8b5e3c]">
          <h3 className="renaissance-font text-xl mb-4 text-[#8b5e3c]">Étape 3: Déterminer le résultat de la vente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField label="Prix de Vente (PV HTVA)" value={data.step3.pv} onChange={(v) => updateData('step3', 'pv', v)} expected={CORRECT_ANSWERS.step3.pv} />
            <InputField label="Valeur Comptable Nette (VCN)" value={data.step3.vcn} onChange={(v) => updateData('step3', 'vcn', v)} expected={CORRECT_ANSWERS.step3.vcn} />
          </div>
          <div className="mt-6 p-6 bg-[#5d4037]/5 rounded text-center">
            <h4 className="renaissance-font text-lg mb-2">Verdict de l'Opération</h4>
            <p className="text-3xl font-bold mb-2" style={{ color: resultValue >= 0 ? '#1b5e20' : '#b71c1c' }}>
              {resultValue >= 0 ? "PLUS-VALUE" : "MOINS-VALUE"} : {Math.abs(resultValue).toLocaleString()} €
            </p>
            <p className="text-sm italic">({data.step3.pv || "0"} PV - {data.step3.vcn || "0"} VCN)</p>
          </div>
          <button onClick={() => showAnswer(3)} className="mt-4 text-xs text-[#8b5e3c] underline hover:text-[#b8860b]">Besoin d'aide ? Voir la réponse</button>
        </section>
      </div>
    </RenaissanceFrame>
  );
};

const Level4: React.FC<{ data: StepData }> = ({ data }) => {
  const [showCorrection, setShowCorrection] = useState(false);
  const [journalData, setJournalData] = useState({
    r4000: "",
    r4510: "",
    r2410: "",
    r2419: "",
    r7630: ""
  });

  const totalAmort = parseFloat(data.step2.amort2025) + parseFloat(data.step2.amort2026) + parseFloat(data.step2.amort2027);

  return (
    <RenaissanceFrame title="Niveau IV: L'Écriture Finale au Grand Livre">
      <p className="mb-6 italic">"Maître élève, il est temps d'immortaliser cette vente dans le journal des opérations diverses (JOD)."</p>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#8b5e3c]">
          <thead>
            <tr className="bg-[#e4d4ac] renaissance-font">
              <th className="border border-[#8b5e3c] p-2">Compte</th>
              <th className="border border-[#8b5e3c] p-2">Libellé</th>
              <th className="border border-[#8b5e3c] p-2">Débit (D)</th>
              <th className="border border-[#8b5e3c] p-2">Crédit (C)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-[#8b5e3c] p-2 text-center">4000</td>
              <td className="border border-[#8b5e3c] p-2 italic">Créances clients (TVAC)</td>
              <td className="border border-[#8b5e3c] p-2">
                <input type="text" value={journalData.r4000} onChange={e => setJournalData({...journalData, r4000: e.target.value})} className="w-full bg-white/50 p-1 text-right" />
              </td>
              <td className="border border-[#8b5e3c] p-2 bg-gray-100/50"></td>
            </tr>
            <tr>
              <td className="border border-[#8b5e3c] p-2 text-center">2419</td>
              <td className="border border-[#8b5e3c] p-2 italic">Amort. acté s/ camion (Total)</td>
              <td className="border border-[#8b5e3c] p-2">
                <input type="text" value={journalData.r2419} onChange={e => setJournalData({...journalData, r2419: e.target.value})} className="w-full bg-white/50 p-1 text-right" />
              </td>
              <td className="border border-[#8b5e3c] p-2 bg-gray-100/50"></td>
            </tr>
            <tr>
              <td className="border border-[#8b5e3c] p-2 text-center">4510</td>
              <td className="border border-[#8b5e3c] p-2 italic">TVA à payer</td>
              <td className="border border-[#8b5e3c] p-2 bg-gray-100/50"></td>
              <td className="border border-[#8b5e3c] p-2">
                <input type="text" value={journalData.r4510} onChange={e => setJournalData({...journalData, r4510: e.target.value})} className="w-full bg-white/50 p-1 text-right" />
              </td>
            </tr>
            <tr>
              <td className="border border-[#8b5e3c] p-2 text-center">2410</td>
              <td className="border border-[#8b5e3c] p-2 italic">CAMION (Valeur acquisition)</td>
              <td className="border border-[#8b5e3c] p-2 bg-gray-100/50"></td>
              <td className="border border-[#8b5e3c] p-2">
                <input type="text" value={journalData.r2410} onChange={e => setJournalData({...journalData, r2410: e.target.value})} className="w-full bg-white/50 p-1 text-right" />
              </td>
            </tr>
            <tr>
              <td className="border border-[#8b5e3c] p-2 text-center">7630</td>
              <td className="border border-[#8b5e3c] p-2 italic">Plus-value sur réalisation</td>
              <td className="border border-[#8b5e3c] p-2 bg-gray-100/50"></td>
              <td className="border border-[#8b5e3c] p-2">
                <input type="text" value={journalData.r7630} onChange={e => setJournalData({...journalData, r7630: e.target.value})} className="w-full bg-white/50 p-1 text-right" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <button 
          onClick={() => setShowCorrection(!showCorrection)}
          className="bg-[#8b5e3c] text-[#f4e4bc] px-8 py-3 rounded-full renaissance-font hover:bg-[#5d4037] transition shadow-lg"
        >
          {showCorrection ? "Cacher la Correction" : "Vérifier l'Écriture"}
        </button>

        {showCorrection && (
          <div className="mt-8 p-6 bg-white gold-border animate-in fade-in duration-500 w-full max-w-2xl">
            <h4 className="renaissance-font text-center text-xl mb-4 underline">Correction Officielle</h4>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between border-b border-gray-100 py-1"><span>4000 Client (TVAC)</span> <span className="font-bold text-green-700">484.000,00 D</span></div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span>2419 Amort. Acté S/C (Total)</span> <span className="font-bold text-green-700">141.917,81 D</span></div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span>4510 TVA à payer</span> <span className="font-bold text-green-700">84.000,00 C</span></div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span>2410 CAMION (Acquisition)</span> <span className="font-bold text-green-700">500.000,00 C</span></div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span>7630 Plus-Value Réalisation</span> <span className="font-bold text-green-700">41.917,81 C</span></div>
            </div>
            <p className="mt-4 text-xs italic text-center text-gray-500">Note: Le total des débits (625.917,81) égale le total des crédits.</p>
          </div>
        )}
      </div>
    </RenaissanceFrame>
  );
};

// --- Main App ---

export default function App() {
  const [level, setLevel] = useState(1);
  const [stepData, setStepData] = useState<StepData>({
    step1: { htva: "", tva: "", tvac: "" },
    step2: { valAcq: "", amort2025: "", amort2026: "", amort2027: "" },
    step3: { pv: "", vcn: "" }
  });

  return (
    <div className="min-h-screen pb-20 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto pt-10">
      <header className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 100 100">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="#8b5e3c" />
          </svg>
        </div>
        <h1 className="renaissance-font text-5xl md:text-7xl text-[#5d4037] mb-2 tracking-tighter italic">L'Art de la Vente d'Actifs</h1>
        <p className="cursive-font text-3xl text-[#8b5e3c]">Leçons du Maître Léonardo pour la 6e Technique</p>
        <div className="flex justify-center gap-4 mt-8 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map(l => (
            <button 
              key={l}
              onClick={() => setLevel(l)}
              className={`px-6 py-2 rounded-sm renaissance-font border-2 transition-all ${level === l ? 'bg-[#8b5e3c] text-[#f4e4bc] border-[#8b5e3c] scale-110 shadow-lg' : 'bg-white/40 text-[#8b5e3c] border-[#8b5e3c] hover:bg-white/70'}`}
            >
              Niveau {l}
            </button>
          ))}
        </div>
      </header>

      <main className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Navigation Sidebar / Summary for Students */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          <div>
            {level === 1 && <Level1 />}
            {level === 2 && <Level2 />}
            {level === 3 && <Level3 data={stepData} onChange={setStepData} />}
            {level === 4 && <Level4 data={stepData} />}
          </div>

          <aside className="space-y-6">
            <RenaissanceFrame title="Grimoire Mémoire" className="p-4 bg-white/60">
              <p className="text-sm italic mb-4">"Maître, voici les clés que nous avons découvertes jusqu'ici."</p>
              <div className="space-y-4 text-xs font-serif">
                <div className="p-2 border border-[#8b5e3c]/30 rounded">
                  <h4 className="font-bold underline mb-1">Acquisition (N1)</h4>
                  <p>Prix: 500.000 €</p>
                  <p>Date: 31/08/2025</p>
                </div>
                <div className="p-2 border border-[#8b5e3c]/30 rounded">
                  <h4 className="font-bold underline mb-1">Vente (N2)</h4>
                  <p>PV HTVA: 400.000 €</p>
                  <p>Date: 01/02/2027</p>
                  <p>TVA (21%): 84.000 €</p>
                  <p>TVAC: 484.000 €</p>
                </div>
                <div className="p-2 border border-[#8b5e3c]/30 rounded">
                  <h4 className="font-bold underline mb-1">Calculs VCN (N3)</h4>
                  <p>Total Amort: 141.917,81 €</p>
                  <p>VCN: 358.082,19 €</p>
                </div>
                <div className="p-2 bg-[#8b5e3c]/10 rounded font-bold text-center">
                  <p>PLUS-VALUE : 41.917,81 €</p>
                </div>
              </div>
            </RenaissanceFrame>
            
            <div className="p-6 bg-[#5d4037] text-[#f4e4bc] rounded-lg shadow-inner text-sm italic font-serif leading-relaxed">
              "L'apprentissage est la seule chose que l'esprit n'épuise jamais, ne craint jamais et ne regrette jamais. Maîtrisez ces chiffres comme je maîtrisais la perspective."
              <br/>— Leonardo da Vinci
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-20 border-t border-[#8b5e3c]/30 pt-8 text-center text-[#8b5e3c] renaissance-font text-xs uppercase tracking-widest pb-10">
        &copy; 1503 - 2025 | Ateliers Da Vinci - Académie de Comptabilité Technique
      </footer>
    </div>
  );
}
