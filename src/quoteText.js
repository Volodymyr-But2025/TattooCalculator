const numberFormatter = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export function formatNumber(value) {
  return numberFormatter.format(value);
}

export function formatMoney(value) {
  return `${formatNumber(value)} грн`;
}

export function buildClientQuoteText({
  width,
  height,
  styleLabel,
  colorLabel,
  placementLabel,
  estimatedHours,
  discount,
  discountAmount,
  basePrice,
  totalPrice,
}) {
  const lines = [
    `Тату: ${width}×${height} см, ${styleLabel}, ${colorLabel}, ${placementLabel}`,
    `Час (орієнтовно): ~${estimatedHours} год`,
    `Сума: ${formatMoney(basePrice)}`,
  ];

  if (discount > 0) {
    lines.push(`Знижка ${discount}%: −${formatMoney(discountAmount)}`);
  }

  lines.push(`Разом: ${formatMoney(totalPrice)}`);

  return lines.join("\n");
}
