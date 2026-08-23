const STORAGE_KEY = "tattoo-calc:settings";

export const DEFAULT_SETTINGS = {
  hourlyRate: 1000,
  materialCost: 400,
};

function isValidAmount(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_SETTINGS };
    }

    const parsed = JSON.parse(raw);
    return {
      hourlyRate: isValidAmount(parsed.hourlyRate)
        ? parsed.hourlyRate
        : DEFAULT_SETTINGS.hourlyRate,
      materialCost: isValidAmount(parsed.materialCost)
        ? parsed.materialCost
        : DEFAULT_SETTINGS.materialCost,
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings({ hourlyRate, materialCost }) {
  if (!isValidAmount(hourlyRate) || !isValidAmount(materialCost)) {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ hourlyRate, materialCost }),
    );
  } catch {
    // private mode / quota — ігноруємо, калькулятор лишається робочим
  }
}
