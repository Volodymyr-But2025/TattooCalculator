// import { useState } from "react";

// const STYLE_OPTIONS = {
//   linework: { label: "Контур / Мінімалізм", multiplier: 1.0 },
//   shading: { label: "Тіні / Графіка", multiplier: 1.3 },
//   realism: { label: "Реалізм / Дотворк", multiplier: 1.6 },
// };

// const COLOR_OPTIONS = {
//   bw: { label: "Чорно-біле", multiplier: 1.0 },
//   color: { label: "Кольорове", multiplier: 1.3 },
// };

// const PLACEMENT_OPTIONS = {
//   easy: { label: "Стандарт (Руки, Ноги)", multiplier: 1.0 },
//   hard: { label: "Складне (Ребра, Живіт, Шия)", multiplier: 1.25 },
// };

// export default function App() {
//   const [hourlyRate, setHourlyRate] = useState(1000);
//   const [materialCost, setMaterialCost] = useState(400);

//   const [width, setWidth] = useState(10);
//   const [height, setHeight] = useState(10);
//   const [style, setStyle] = useState("linework");
//   const [color, setColor] = useState("bw");
//   const [placement, setPlacement] = useState("easy");

//   const area = width * height;
//   const currentStyle = STYLE_OPTIONS[style];
//   const currentColor = COLOR_OPTIONS[color];
//   const currentPlacement = PLACEMENT_OPTIONS[placement];

//   // Safely parse number values so empty string during editing won't crash formulas
//   const safeHourlyRate = Number(hourlyRate) || 0;
//   const safeMaterialCost = Number(materialCost) || 0;

//   // Total complexity multiplier (Style × Color × Placement)
//   const totalComplexityMultiplier =
//     currentStyle.multiplier *
//     currentColor.multiplier *
//     currentPlacement.multiplier;

//   // Estimated hours formula: Size & Complexity directly affect estimated hours
//   const estimatedHours = Math.max(
//     1,
//     Math.round(((area * totalComplexityMultiplier) / 70) * 10) / 10,
//   );

//   // Labor cost = Duration × Hourly Rate
//   const laborCost = Math.round(estimatedHours * safeHourlyRate);

//   // Total price rounded to nearest 50 UAH
//   const rawPrice = safeMaterialCost + laborCost;
//   const totalPrice = Math.round(rawPrice / 50) * 50;

//   const minRange = Math.round((totalPrice * 0.9) / 50) * 50;
//   const maxRange = Math.round((totalPrice * 1.1) / 50) * 50;

//   return (
//     <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pb-[env(safe-area-inset-bottom)] antialiased select-none">
//       {/* Header */}
//       {}
//       <header className="bg-white border-b border-slate-100 p-4 sticky top-0 z-10 shadow-sm text-center">
//         <h1 className="text-xl font-bold tracking-tight">Tattoo Price Calc</h1>
//         <p className="text-xs text-slate-400 mt-0.5">
//           Калькулятор від TattooVovka
//         </p>
//       </header>

//       {/* Main Form Body */}
//       {}
//       <main className="flex-1 p-4 space-y-5 overflow-y-auto">
//         {/* Dimensions Card */}
//         <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
//           <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
//             Розмір малюнка
//           </h2>

//           <div className="mb-4">
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-sm font-medium text-slate-700">Ширина</span>
//               <span className="text-base font-bold text-indigo-600">
//                 {width} см
//               </span>
//             </div>
//             <input
//               type="range"
//               min="2"
//               max="40"
//               value={width}
//               onChange={(e) => setWidth(Number(e.target.value))}
//               className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 touch-manipulation"
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-sm font-medium text-slate-700">Висота</span>
//               <span className="text-base font-bold text-indigo-600">
//                 {height} см
//               </span>
//             </div>
//             <input
//               type="range"
//               min="2"
//               max="40"
//               value={height}
//               onChange={(e) => setHeight(Number(e.target.value))}
//               className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 touch-manipulation"
//             />
//           </div>
//         </div>

//         {/* Style Selection Card */}
//         {}
//         <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
//           <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
//             Стиль виконання
//           </h2>
//           <div className="flex flex-col space-y-2">
//             {Object.entries(STYLE_OPTIONS).map(([key, value]) => (
//               <button
//                 key={key}
//                 type="button"
//                 onClick={() => setStyle(key)}
//                 className={`w-full py-3 px-4 rounded-xl text-left font-medium text-sm transition-all border ${
//                   style === key
//                     ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
//                     : "bg-slate-50 border-slate-100 text-slate-700 active:bg-slate-100"
//                 }`}
//               >
//                 {value.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Color Palette Card */}
//         {}
//         <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
//           <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
//             Колірна гама
//           </h2>
//           <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
//             {Object.entries(COLOR_OPTIONS).map(([key, value]) => (
//               <button
//                 key={key}
//                 type="button"
//                 onClick={() => setColor(key)}
//                 className={`py-2.5 px-3 rounded-lg font-semibold text-xs text-center transition-all ${
//                   color === key
//                     ? "bg-white text-indigo-600 shadow-sm"
//                     : "text-slate-500 active:text-slate-800"
//                 }`}
//               >
//                 {value.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Placement Card */}
//         {}
//         <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
//           <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
//             Місце на тілі
//           </h2>
//           <div className="grid grid-cols-2 gap-2">
//             {Object.entries(PLACEMENT_OPTIONS).map(([key, value]) => (
//               <button
//                 key={key}
//                 type="button"
//                 onClick={() => setPlacement(key)}
//                 className={`py-3 px-3 rounded-xl border text-xs font-semibold transition-all text-center ${
//                   placement === key
//                     ? "border-indigo-600 bg-indigo-50/50 text-indigo-600"
//                     : "border-slate-100 bg-slate-50 text-slate-600 active:bg-slate-100"
//                 }`}
//               >
//                 {value.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Master Base Settings Accordion */}
//         {}
//         <div className="bg-slate-100/60 p-4 rounded-2xl space-y-3">
//           <details className="group">
//             <summary className="list-none flex justify-between items-center cursor-pointer text-xs font-semibold text-slate-400 uppercase tracking-wider">
//               <span>Параметри рейту майстра</span>
//               <span className="transition-transform group-open:rotate-180">
//                 ▼
//               </span>
//             </summary>
//             <div className="pt-3 space-y-3 border-t border-slate-200/60 mt-2">
//               <div>
//                 <label className="block text-xs text-slate-500 mb-1">
//                   Ставка за годину (грн)
//                 </label>
//                 <input
//                   type="number"
//                   inputMode="decimal"
//                   value={hourlyRate}
//                   onFocus={(e) => e.target.select()}
//                   onChange={(e) => {
//                     const val = e.target.value;
//                     setHourlyRate(val === "" ? "" : Math.max(0, Number(val)));
//                   }}
//                   className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-indigo-600"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs text-slate-500 mb-1">
//                   Ціна розхідників сеансу (грн)
//                 </label>
//                 <input
//                   type="number"
//                   inputMode="decimal"
//                   value={materialCost}
//                   onFocus={(e) => e.target.select()}
//                   onChange={(e) => {
//                     const val = e.target.value;
//                     setMaterialCost(val === "" ? "" : Math.max(0, Number(val)));
//                   }}
//                   className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-indigo-600"
//                 />
//               </div>
//             </div>
//           </details>
//         </div>
//       </main>

//       {/* Sticky Bottom Summary Footer */}
//       {}
//       <footer className="sticky bottom-0 bg-white border-t border-slate-100 p-4 shadow-[0_-8px_24px_rgba(148,163,184,0.08)] px-6 z-10">
//         <div className="flex justify-between items-center mb-1.5">
//           <span className="text-xs font-medium text-slate-400">
//             Час роботи:
//           </span>
//           <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
//             ~ {estimatedHours} год
//           </span>
//         </div>
//         <div className="flex justify-between items-center">
//           <div>
//             <span className="text-xs font-medium text-slate-400 block -mb-0.5">
//               Орієнтовна ціна:
//             </span>
//             <span className="text-xs text-slate-400">
//               Діапазон: {minRange}-{maxRange} грн
//             </span>
//           </div>
//           <div className="text-right">
//             <span className="text-2xl font-black tracking-tight text-emerald-600">
//               {totalPrice} грн
//             </span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { useState } from "react";

const STYLE_OPTIONS = {
  linework: { label: "Контур / Мінімалізм", multiplier: 1.0 },
  shading: { label: "Тіні / Графіка", multiplier: 1.3 },
  realism: { label: "Реалізм / Дотворк", multiplier: 1.6 },
};

const COLOR_OPTIONS = {
  bw: { label: "Чорно-біле", multiplier: 1.0 },
  color: { label: "Кольорове", multiplier: 1.3 },
};

const PLACEMENT_OPTIONS = {
  easy: { label: "Стандарт (Руки, Ноги)", multiplier: 1.0 },
  hard: { label: "Складне (Ребра, Живіт, Шия)", multiplier: 1.25 },
};

const DISCOUNT_OPTIONS = [0, 5, 10, 15, 20];

export default function App() {
  const [hourlyRate, setHourlyRate] = useState(1000);
  const [materialCost, setMaterialCost] = useState(400);

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [style, setStyle] = useState("linework");
  const [color, setColor] = useState("bw");
  const [placement, setPlacement] = useState("easy");
  const [discount, setDiscount] = useState(0);

  const area = width * height;
  const currentStyle = STYLE_OPTIONS[style];
  const currentColor = COLOR_OPTIONS[color];
  const currentPlacement = PLACEMENT_OPTIONS[placement];

  // Safely parse number values so empty string during editing won't crash formulas
  const safeHourlyRate = Number(hourlyRate) || 0;
  const safeMaterialCost = Number(materialCost) || 0;

  // Total complexity multiplier (Style × Color × Placement)
  const totalComplexityMultiplier =
    currentStyle.multiplier *
    currentColor.multiplier *
    currentPlacement.multiplier;

  // Estimated hours formula: Size & Complexity directly affect estimated hours
  const estimatedHours = Math.max(
    1,
    Math.round(((area * totalComplexityMultiplier) / 70) * 10) / 10,
  );

  // Labor cost = Duration × Hourly Rate
  const laborCost = Math.round(estimatedHours * safeHourlyRate);
  const rawPrice = safeMaterialCost + laborCost;

  // Base price rounded to nearest 50 UAH
  let basePrice = Math.round(rawPrice / 50) * 50;

  // Enforce minimum price rule: Color tattoos have a minimum floor of 1600 UAH
  const isMinColorApplied = color === "color" && basePrice < 1600;
  if (color === "color" && basePrice < 1600) {
    basePrice = 1600;
  }

  // Calculate discount amount rounded to 50 UAH
  const discountAmount = Math.round((basePrice * (discount / 100)) / 50) * 50;
  const totalPrice = Math.max(0, basePrice - discountAmount);

  const minRange = Math.round((totalPrice * 0.9) / 50) * 50;
  const maxRange = Math.round((totalPrice * 1.1) / 50) * 50;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pb-[env(safe-area-inset-bottom)] antialiased select-none">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 p-4 sticky top-0 z-10 shadow-sm text-center">
        <h1 className="text-xl font-bold tracking-tight">Tattoo Price Calc</h1>
        <p className="text-xs text-slate-400 mt-0.5">Калькулятор для дружини</p>
      </header>

      {/* Main Form Body */}
      <main className="flex-1 p-4 space-y-5 overflow-y-auto">
        {}
        {/* Dimensions Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Розмір малюнка
          </h2>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-slate-700">Ширина</span>
              <span className="text-base font-bold text-indigo-600">
                {width} см
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-2.5 bg-indigo-100/70 rounded-lg appearance-none cursor-pointer accent-indigo-600 touch-manipulation [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-slate-700">Висота</span>
              <span className="text-base font-bold text-indigo-600">
                {height} см
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-2.5 bg-indigo-100/70 rounded-lg appearance-none cursor-pointer accent-indigo-600 touch-manipulation [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
            />
          </div>
        </div>

        {}
        {/* Style Selection Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Стиль виконання
          </h2>
          <div className="flex flex-col space-y-2">
            {Object.entries(STYLE_OPTIONS).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => setStyle(key)}
                className={`w-full py-3 px-4 rounded-xl text-left font-semibold text-sm transition-all border ${
                  style === key
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "bg-slate-50 border-slate-100 text-slate-700 active:bg-slate-100"
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>

        {}
        {/* Color Palette Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Колірна гама
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(COLOR_OPTIONS).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => setColor(key)}
                className={`py-3 px-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                  color === key
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "bg-slate-50 border-slate-100 text-slate-700 active:bg-slate-100"
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>

        {}
        {/* Placement Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Місце на тілі
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(PLACEMENT_OPTIONS).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPlacement(key)}
                className={`py-3 px-3 rounded-xl border text-xs font-semibold transition-all text-center ${
                  placement === key
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "bg-slate-50 border-slate-100 text-slate-700 active:bg-slate-100"
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>

        {}
        {/* Discount Selection Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Знижка клієнту
          </h2>
          <div className="grid grid-cols-5 gap-1.5">
            {DISCOUNT_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setDiscount(opt)}
                className={`py-2.5 px-1 rounded-xl border text-xs font-bold transition-all text-center ${
                  discount === opt
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "bg-slate-50 border-slate-100 text-slate-700 active:bg-slate-100"
                }`}
              >
                {opt === 0 ? "0%" : `-${opt}%`}
              </button>
            ))}
          </div>
        </div>

        {}
        {/* Master Base Settings Accordion */}
        <div className="bg-slate-100/60 p-4 rounded-2xl space-y-3">
          <details className="group">
            <summary className="list-none flex justify-between items-center cursor-pointer text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Параметри рейту майстра</span>
              <span className="transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <div className="pt-3 space-y-3 border-t border-slate-200/60 mt-2">
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Ставка за годину (грн)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={hourlyRate}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHourlyRate(val === "" ? "" : Math.max(0, Number(val)));
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Ціна розхідників сеансу (грн)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={materialCost}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMaterialCost(val === "" ? "" : Math.max(0, Number(val)));
                  }}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-indigo-600"
                />
              </div>
            </div>
          </details>
        </div>
      </main>

      {}
      {/* Sticky Bottom Summary Footer */}
      <footer className="sticky bottom-0 bg-white border-t border-slate-100 p-4 shadow-[0_-8px_24px_rgba(148,163,184,0.12)] px-5 z-10 space-y-2">
        {/* Estimated Time Row */}
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-slate-400">Час роботи:</span>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
            ~ {estimatedHours} год
          </span>
        </div>

        {/* Base Price Row */}
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-slate-400">Базова ціна:</span>
          <div className="text-right">
            <span className="font-bold text-slate-700">{basePrice} грн</span>
            {isMinColorApplied && (
              <span className="block text-[10px] text-indigo-500 font-semibold">
                (мін. для кольору)
              </span>
            )}
          </div>
        </div>

        {/* Discount Row (Shown if discount > 0) */}
        {discount > 0 && (
          <div className="flex justify-between items-center text-xs text-rose-500 font-medium">
            <span>Знижка ({discount}%):</span>
            <span className="font-bold">-{discountAmount} грн</span>
          </div>
        )}

        {/* Final Total Price */}
        <div className="flex justify-between items-end pt-2 border-t border-slate-100">
          <div>
            <span className="text-xs font-semibold text-slate-800 block">
              Разом до сплати:
            </span>
            <span className="text-[11px] text-slate-400">
              Діапазон: {minRange}-{maxRange} грн
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black tracking-tight text-emerald-600">
              {totalPrice} грн
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
