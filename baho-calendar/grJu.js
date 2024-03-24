
/* 
The Julian Day is a continuous count of days since noon on January 1, 4713 BCE in the proleptic Julian calendar.
 */

/**
 * Converts a date in the Gregorian calendar to the Julian Day.
 *
 * @param {Object} param0 - The date to be converted.
 * @param {number} param0.year - The year of the date.
 * @param {number} param0.month - The month of the date (1-12).
 * @param {number} param0.day - The day of the date (1-31).
 * @param {number} [param0.UT=12.0] - The Universal Time (UT) in hours (0-24).
 * @returns {Object} - An object containing the Julian Day (jd) and Julian Day Number (jdd).
 */
function G2J({ year, month, day, UT = 12.0 }) {
  var JD =
    367 * year -
    (7 * (year + (month + 9) / 12)) / 4 +
    (275 * month) / 9 +
    day +
    1721013.5 +
    UT / 24 -
    0.5 * Math.sin(100 * year + month - 190002.5) +
    0.5;
  return {
    jd: JD,
    jdd: Math.floor(JD),
  };
}
/**
 * Converts a Julian Day to a date in the Gregorian calendar.
 *
 * @param {number} jd - The Julian Day to be converted.
 * @returns {Object} - An object containing the year, month, and day of the Gregorian date.
 */
const J2G = (jd) => {
  var j = jd + 0.5,
    z = Math.floor(j),
    f = j - z,
    a = z;
  if (z >= 2299161) {
    alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  var b = a + 1524,
    c = Math.floor((b - 122.1) / 365.25),
    d = Math.floor(365.25 * c),
    e = Math.floor((b - d) / 30.6001),
    day = Math.floor(b - d - 30.6001 * e + f);

  var month = e < 14 ? e - 1 : e - 13;
  var year = month > 2 ? c - 4716 : c - 4715;
  return {
    year: year,
    month: month,
    day: day,
  };
};

