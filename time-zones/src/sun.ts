/**
 * Default zenith
 */
const DEFAULT_ZENITH = 90.8333;

/**
 * Degrees per hour
 */
const DEGREES_PER_HOUR = 360 / 24;

/**
 * Msec in hour
 */
const MSEC_IN_HOUR = 60 * 60 * 1000;

/**
 * Msec in day
 */
const MSEC_IN_DAY = 8.64e7;

/**
 * Get day of year
 */
function getDayOfYear(date: Date): number {
  return Math.ceil(
    (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
      MSEC_IN_DAY
  );
}

/**
 * Get sin of value in deg
 */
function sinDeg(deg: number): number {
  return Math.sin((deg * 2.0 * Math.PI) / 360.0);
}

/**
 * Get acos of value in deg
 */
function acosDeg(x: number): number {
  return (Math.acos(x) * 360.0) / (2 * Math.PI);
}

/**
 * Get asin of value in deg
 */
function asinDeg(x: number): number {
  return (Math.asin(x) * 360.0) / (2 * Math.PI);
}

/**
 * Get tan of value in deg
 */
function tanDeg(deg: number): number {
  return Math.tan((deg * 2.0 * Math.PI) / 360.0);
}

/**
 * Get cos of value in deg
 */
function cosDeg(deg: number): number {
  return Math.cos((deg * 2.0 * Math.PI) / 360.0);
}

/**
 * Get ramainder
 */
function mod(a: number, b: number): number {
  const result = a % b;

  return result < 0 ? result + b : result;
}

/**
 * Calculate Date for either sunrise or sunset
 */
function calculate(
  latitude: number,
  longitude: number,
  isSunrise: boolean,
  zenith: number,
  date: Date
): Date {
  const dayOfYear = getDayOfYear(date);
  const hoursFromMeridian = longitude / DEGREES_PER_HOUR;
  const approxTimeOfEventInDays = isSunrise
    ? dayOfYear + (6 - hoursFromMeridian) / 24
    : dayOfYear + (18.0 - hoursFromMeridian) / 24;

  const sunMeanAnomaly = 0.9856 * approxTimeOfEventInDays - 3.289;
  const sunTrueLongitude = mod(
    sunMeanAnomaly +
      1.916 * sinDeg(sunMeanAnomaly) +
      0.02 * sinDeg(2 * sunMeanAnomaly) +
      282.634,
    360
  );
  const ascension = 0.91764 * tanDeg(sunTrueLongitude);

  let rightAscension;
  rightAscension = (360 / (2 * Math.PI)) * Math.atan(ascension);
  rightAscension = mod(rightAscension, 360);

  const lQuadrant = Math.floor(sunTrueLongitude / 90) * 90;
  const raQuadrant = Math.floor(rightAscension / 90) * 90;
  rightAscension = rightAscension + (lQuadrant - raQuadrant);
  rightAscension /= DEGREES_PER_HOUR;

  const sinDec = 0.39782 * sinDeg(sunTrueLongitude);
  const cosDec = cosDeg(asinDeg(sinDec));
  const cosLocalHourAngle =
    (cosDeg(zenith) - sinDec * sinDeg(latitude)) / (cosDec * cosDeg(latitude));

  const localHourAngle = isSunrise
    ? 360 - acosDeg(cosLocalHourAngle)
    : acosDeg(cosLocalHourAngle);

  const localHour = localHourAngle / DEGREES_PER_HOUR;
  const localMeanTime =
    localHour + rightAscension - 0.06571 * approxTimeOfEventInDays - 6.622;
  const time = mod(localMeanTime - longitude / DEGREES_PER_HOUR, 24);
  const utcMidnight = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // Created date will be set to local (system) time zone.
  return new Date(utcMidnight + time * MSEC_IN_HOUR);
}

/**
 * Calculate Sunrise time for given longitude, latitude, zenith and date
 */
export function getSunrise(
  latitude: number,
  longitude: number,
  date = new Date()
): Date {
  return calculate(latitude, longitude, true, DEFAULT_ZENITH, date);
}

/**
 * Calculate Sunset time for given longitude, latitude, zenith and date
 */
export function getSunset(
  latitude: number,
  longitude: number,
  date = new Date()
): Date {
  return calculate(latitude, longitude, false, DEFAULT_ZENITH, date);
}
