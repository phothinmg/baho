export const degree_of_hour = 360 / 24;
export const ms_of_hour = 60 * 60 * 1000;
export const ms_of_day = ms_of_hour * 24;
export const defaultZ = 90.8333;

export function mod(a: number, b: number): number {
  const result = a % b;

  return result < 0 ? result + b : result;
}

/**
 * Calculates the day of the year for a given date.
 * @param date - The input date for which the day of the year needs to be calculated.
 * @returns The day of the year as a number.
 */
export function getDayOfYear(date: Date): number {
  const msOfDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const startOfYear = new Date(date.getFullYear(), 0, 1); // January 1st of the same year
  const daysSinceStartOfYear = Math.ceil(
    (date.getTime() - startOfYear.getTime()) / msOfDay
  );
  return daysSinceStartOfYear;
}
