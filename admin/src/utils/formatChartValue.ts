export function formatChartValue(value: number) {
  if (value >= 1000000) return `${round(value / 1000000, 1)} M`;
  if (value >= 1000) return `${round(value / 1000, 1)} mil`;
  return value.toString();
}

// ex: round(12.2569456, 3) -> 12.256
function round(value: number, places: number) {
  const d = Math.pow(10, places);
  return Math.round((value + Number.EPSILON) * d) / d;
}
