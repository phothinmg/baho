export function gregorianToJulian(year: number, month: number, day: number) {
  // Adjust month and year for the formula
  if (month < 3) {
    month += 12;
    year--;
  }

  // Calculate the Julian day number
  const a = Math.floor(year / 100);
  const b = Math.floor(a / 4);
  const c = 2 - a + b;
  const e = Math.floor(365.25 * (year + 4716));
  const f = Math.floor(30.6001 * (month + 1));
  const jd = c + day + e + f - 1524.5;

  return jd;
}

export function julianToGregorian(julianDayNumber: number) {
  const z = Math.floor(julianDayNumber + 0.5);
  const w = Math.floor((z - 1867216.25) / 36524.25);
  const x = Math.floor(w / 4);
  const a = z + 1 + w - x;
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const day = b - d - Math.floor(30.6001 * e);
  let month = e - 1;
  if (e > 13) {
    month -= 12;
  }
  let year = c - 4715;
  if (month > 2) {
    year--;
  }

  return { year, month, day };
}
