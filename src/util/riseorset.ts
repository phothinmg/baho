
/**
 * Calculates the time of sunrise or sunset based on the latitude, longitude, date, and zenith angle provided.
 * @param latitude - The latitude of the location in degrees.
 * @param longitude - The longitude of the location in degrees.
 * @param isSunrise - A flag indicating whether to calculate the time of sunrise (`true`) or sunset (`false`).
 * @param zenith - The zenith angle in degrees. It represents the angle between the vertical and the line connecting the observer to the celestial body.
 * @param date - The date for which to calculate the time of sunrise or sunset.
 * @returns A `Date` object representing the time of sunrise or sunset for the given latitude, longitude, date, and zenith angle.
 */
export function riseOrSet(
  latitude: number,
  longitude: number,
  isSunrise: boolean,
  zenith: number,
  date: Date
): Date {
  const dayOfYear = getDayOfYear(date);
  const dph = 360 / 24;
  const msinhour = 60 * 60 * 1000;
  const hoursFromMeridian = longitude / dph;
  const approxTimeOfEventInDays = isSunrise
    ? dayOfYear + (6 - hoursFromMeridian) / 24
    : dayOfYear + (18.0 - hoursFromMeridian) / 24;

  const sunMeanAnomaly = 0.9856 * approxTimeOfEventInDays - 3.289;
  const sunTrueLongitude = mod(
    sunMeanAnomaly +
      1.916 * sine(sunMeanAnomaly) +
      0.02 * sine(2 * sunMeanAnomaly) +
      282.634,
    360
  );
  const ascension = 0.91764 * tangent(sunTrueLongitude);

  let rightAscension = (360 / (2 * Math.PI)) * Math.atan(ascension);
  rightAscension = mod(rightAscension, 360);

  const lQuadrant = Math.floor(sunTrueLongitude / 90) * 90;
  const raQuadrant = Math.floor(rightAscension / 90) * 90;
  rightAscension = rightAscension + (lQuadrant - raQuadrant);
  rightAscension /= dph;

  const sinDec = 0.39782 * sine(sunTrueLongitude);
  const cosDec = cosine(asine(sinDec));
  const cosLocalHourAngle =
    (cosine(zenith) - sinDec * sine(latitude)) / (cosDec * cosine(latitude));

  const localHourAngle = isSunrise
    ? 360 - acosine(cosLocalHourAngle)
    : acosine(cosLocalHourAngle);

  const localHour = localHourAngle / dph;
  const localMeanTime =
    localHour + rightAscension - 0.06571 * approxTimeOfEventInDays - 6.622;
  const time = mod(localMeanTime - longitude / dph, 24);
  const utcMidnight = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return new Date(utcMidnight + time * msinhour);
}

/**
 * Calculates the day of the year for a given date.
 * @param date - The date for which to calculate the day of the year.
 * @returns The day of the year.
 */
function getDayOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Calculates the sine of an angle in degrees.
 * @param angle - The angle in degrees.
 * @returns The sine of the angle.
 */
function sine(angle: number): number {
  return Math.sin((angle * Math.PI) / 180);
}

/**
 * Calculates the cosine of an angle in degrees.
 * @param angle - The angle in degrees.
 * @returns The cosine of the angle.
 */
function cosine(angle: number): number {
  return Math.cos((angle * Math.PI) / 180);
}

/**
 * Calculates the arcsine of a value and returns the result in degrees.
 * @param value - The value for which to calculate the arcsine.
 * @returns The arcsine of the value in degrees.
 */
function asine(value: number): number {
  return (Math.asin(value) * 180) / Math.PI;
}

/**
 * Calculates the arccosine of a value and returns the result in degrees.
 * @param value - The value for which to calculate the arccosine.
 * @returns The arccosine of the value in degrees.
 */
function acosine(value: number): number {
  return (Math.acos(value) * 180) / Math.PI;
}

/**
 * Calculates the tangent of an angle in degrees.
 * @param angle - The angle in degrees.
 * @returns The tangent of the angle.
 */
function tangent(angle: number): number {
  return Math.tan((angle * Math.PI) / 180);
}

/**
 * Calculates the modulus of a number.
 * @param dividend - The number to be divided.
 * @param divisor - The number to divide by.
 * @returns The modulus of the division.
 */
function mod(dividend: number, divisor: number): number {
  return ((dividend % divisor) + divisor) % divisor;
}
