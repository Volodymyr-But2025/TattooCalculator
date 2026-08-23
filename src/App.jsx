import { useEffect, useRef, useState } from "react";
import {
  COLOR_OPTIONS,
  DISCOUNT_OPTIONS,
  PLACEMENT_OPTIONS,
  STYLE_OPTIONS,
  calculateQuote,
} from "./calculateQuote";
import { buildClientQuoteText, formatMoney, formatNumber } from "./quoteText";
import { loadSettings, saveSettings } from "./settingsStorage";

const SIZE_MIN = 2;
const SIZE_SLIDER_MAX = 40;
const SIZE_INPUT_MAX = 80;

const SLIDER_CLASS =
  "w-full h-2.5 bg-indigo-100/70 rounded-lg appearance-none cursor-pointer accent-indigo-600 touch-manipulation [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white";

function parseSizeInput(raw) {
  if (raw === "") return "";
  const num = Number(raw);
  return Number.isFinite(num) ? num : "";
}

function clampSize(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return SIZE_MIN;
  return Math.min(SIZE_INPUT_MAX, Math.max(SIZE_MIN, num));
}

function DimensionRow({ id, label, value, onChange }) {
  const sliderValue = Math.min(SIZE_SLIDER_MAX, Number(value) || SIZE_MIN);

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5 gap-3">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={SIZE_MIN}
            max={SIZE_INPUT_MAX}
            value={value}
            onFocus={(e) => e.target.select()}
            onChange={(e) => onChange(parseSizeInput(e.target.value))}
            onBlur={() => onChange(clampSize(value))}
            className="w-16 bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-1 text-right text-base font-bold text-indigo-600 focus:outline-indigo-600"
          />
          <span className="text-sm font-semibold text-indigo-600">см</span>
        </div>
      </div>
      <input
        type="range"
        min={SIZE_MIN}
        max={SIZE_SLIDER_MAX}
        value={sliderValue}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className={SLIDER_CLASS}
      />
    </div>
  );
}

export default function App() {
  const [hourlyRate, setHourlyRate] = useState(
    () => loadSettings().hourlyRate,
  );
  const [materialCost, setMaterialCost] = useState(
    () => loadSettings().materialCost,
  );

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [style, setStyle] = useState("linework");
  const [color, setColor] = useState("bw");
  const [placement, setPlacement] = useState("easy");
  const [discount, setDiscount] = useState(0);
  const [copyStatus, setCopyStatus] = useState("idle");

  const copyResetRef = useRef(null);

  useEffect(() => {
    if (hourlyRate === "" || materialCost === "") return;
    saveSettings({
      hourlyRate: Number(hourlyRate),
      materialCost: Number(materialCost),
    });
  }, [hourlyRate, materialCost]);

  useEffect(() => {
    return () => clearTimeout(copyResetRef.current);
  }, []);

  const quote = calculateQuote({
    width: Number(width) || 0,
    height: Number(height) || 0,
    style,
    color,
    placement,
    discount,
    hourlyRate: Number(hourlyRate) || 0,
    materialCost: Number(materialCost) || 0,
  });

  const {
    estimatedHours,
    basePrice,
    isMinColorApplied,
    discountAmount,
    totalPrice,
    minRange,
    maxRange,
  } = quote;

  async function handleCopy() {
    const text = buildClientQuoteText({
      width: Number(width) || 0,
      height: Number(height) || 0,
      styleLabel: STYLE_OPTIONS[style].label,
      colorLabel: COLOR_OPTIONS[color].label,
      placementLabel: PLACEMENT_OPTIONS[placement].label,
      estimatedHours,
      discount,
      discountAmount,
      basePrice,
      totalPrice,
    });

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    clearTimeout(copyResetRef.current);
    copyResetRef.current = setTimeout(() => setCopyStatus("idle"), 2000);
  }

  const copyLabel =
    copyStatus === "copied"
      ? "Скопійовано"
      : copyStatus === "error"
        ? "Не вдалося скопіювати"
        : "Копіювати розрахунок";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pb-[env(safe-area-inset-bottom)] antialiased">
      <header className="bg-white border-b border-slate-100 p-4 sticky top-0 z-10 shadow-sm text-center">
        <h1 className="text-xl font-bold tracking-tight">Tattoo Price Calc</h1>
        <p className="text-xs text-slate-400 mt-0.5">vidVovka</p>
      </header>

      <main className="flex-1 p-4 space-y-5 overflow-y-auto">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Розмір малюнка
          </h2>

          <div className="mb-4">
            <DimensionRow
              id="tattoo-width"
              label="Ширина"
              value={width}
              onChange={setWidth}
            />
          </div>

          <DimensionRow
            id="tattoo-height"
            label="Висота"
            value={height}
            onChange={setHeight}
          />
        </div>

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
                <label
                  htmlFor="hourly-rate"
                  className="block text-xs text-slate-500 mb-1"
                >
                  Ставка за годину (грн)
                </label>
                <input
                  id="hourly-rate"
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
                <label
                  htmlFor="material-cost"
                  className="block text-xs text-slate-500 mb-1"
                >
                  Ціна розхідників сеансу (грн)
                </label>
                <input
                  id="material-cost"
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

      <footer className="sticky bottom-0 bg-white border-t border-slate-100 p-4 shadow-[0_-8px_24px_rgba(148,163,184,0.12)] px-5 z-10 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-slate-400">Час роботи:</span>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
            ~ {estimatedHours} год
          </span>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-slate-400">Базова ціна:</span>
          <div className="text-right">
            <span className="font-bold text-slate-700">
              {formatMoney(basePrice)}
            </span>
            {isMinColorApplied && (
              <span className="block text-[10px] text-indigo-500 font-semibold">
                (мін. для кольору)
              </span>
            )}
          </div>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-xs text-rose-500 font-medium">
            <span>Знижка ({discount}%):</span>
            <span className="font-bold">−{formatMoney(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between items-end pt-2 border-t border-slate-100">
          <div>
            <span className="text-xs font-semibold text-slate-800 block">
              Разом до сплати:
            </span>
            <span className="text-[11px] text-slate-400">
              Діапазон: {formatNumber(minRange)}–{formatNumber(maxRange)} грн
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black tracking-tight text-emerald-600">
              {formatMoney(totalPrice)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="w-full mt-1 py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white shadow-md shadow-indigo-100 active:bg-indigo-700"
        >
          {copyLabel}
        </button>
      </footer>
    </div>
  );
}
