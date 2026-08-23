export const STYLE_OPTIONS = {
  linework: { label: "Контур / Мінімалізм", multiplier: 1.0 },
  shading: { label: "Тіні / Графіка", multiplier: 1.3 },
  realism: { label: "Реалізм / Дотворк", multiplier: 1.6 },
};

export const COLOR_OPTIONS = {
  bw: { label: "Чорно-біле", multiplier: 1.0 },
  color: { label: "Кольорове", multiplier: 1.3 },
};

export const PLACEMENT_OPTIONS = {
  easy: { label: "Стандарт (Руки, Ноги)", multiplier: 1.0 },
  hard: { label: "Складне (Ребра, Живіт, Шия)", multiplier: 1.25 },
};

export const DISCOUNT_OPTIONS = [0, 5, 10, 15, 20];

const AREA_DIVISOR = 70;
const ROUND_TO = 50;
const MIN_COLOR_PRICE = 1600;

export function roundTo50(value) {
  return Math.round(value / ROUND_TO) * ROUND_TO;
}

export function calculateQuote({
  width,
  height,
  style,
  color,
  placement,
  discount,
  hourlyRate,
  materialCost,
}) {
  const area = width * height;
  const currentStyle = STYLE_OPTIONS[style];
  const currentColor = COLOR_OPTIONS[color];
  const currentPlacement = PLACEMENT_OPTIONS[placement];

  const totalComplexityMultiplier =
    currentStyle.multiplier *
    currentColor.multiplier *
    currentPlacement.multiplier;

  const estimatedHours = Math.max(
    1,
    Math.round(((area * totalComplexityMultiplier) / AREA_DIVISOR) * 10) / 10,
  );

  const laborCost = Math.round(estimatedHours * hourlyRate);
  const rawPrice = materialCost + laborCost;

  let basePrice = roundTo50(rawPrice);
  const isMinColorApplied = color === "color" && basePrice < MIN_COLOR_PRICE;
  if (isMinColorApplied) {
    basePrice = MIN_COLOR_PRICE;
  }

  const discountAmount = basePrice * (discount / 100);
  const totalPrice = Math.max(0, basePrice - discountAmount);

  return {
    area,
    estimatedHours,
    laborCost,
    rawPrice,
    basePrice,
    isMinColorApplied,
    discountAmount,
    totalPrice,
    minRange: roundTo50(totalPrice * 0.9),
    maxRange: roundTo50(totalPrice * 1.1),
  };
}
