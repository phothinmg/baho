/**
 * Calculates the local sunrise and sunset times based on the latitude, longitude, and timezone provided.
 *
 * Original Author
 * https://gist.github.com/ruiokada/b28076d4911820ddcbbc
 *
 * Computations are based on the formulas found in:
 *   https://en.wikipedia.org/wiki/Julian_day#Converting_Julian_or_Gregorian_calendar_date_to_Julian_Day_Number
 *   https://en.wikipedia.org/wiki/Sunrise_equation#Complete_calculation_on_Earth
 *
 * @param {number} latitude - The latitude of the location.Latitude of location (South is negative)
 * @param {number} longitude - The longitude of the location.Longitude of location (West is negative)
 * @param {number} timezone - The timezone offset in hours. If not provided, the function uses the local timezone offset.
 * Timezone hour offset. e.g. Pacific/Los Angeles Standard Time is -8 (Optional, defaults to system timezone)
 * @returns { (number | null)[]} - The local time of sunrise and sunset in 24-hour format.Returns an array of length 2 with the sunrise and sunset times as floats on 24-hour time.
 *  e.g. 6.5 is 6:30am, 23.2 is 11:12pm, 0.3 is 12:18am .Returns an array with [null, -1] if the sun never rises, and [-1, null] if the sun never sets.
 *
 * * ### LICENSING ###
 *
 * This code contains information derived from Wikipedia content licensed under
 *   the Creative Commons Attribution-ShareAlike License. As such, this code
 *   is distributed under the GPLv3 license:
 *
 * This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

export function suntimes(
  latitude: number,
  longitude: number,
  timezone: number
): (number | null)[] {
  const d = new Date();
  const radians = Math.PI / 180.0;
  const degrees = 180.0 / Math.PI;

  const a = Math.floor((14 - (d.getMonth() + 1.0)) / 12);
  const y = d.getFullYear() + 4800 - a;
  const m = d.getMonth() + 1 + 12 * a - 3;
  const j_day =
    d.getDate() +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  const n_star = j_day - 2451545.0009 - longitude / 360.0;
  const n = Math.floor(n_star + 0.5);
  const solar_noon = 2451545.0009 - longitude / 360.0 + n;
  const M = 356.047 + 0.9856002585 * n;
  const C =
    1.9148 * Math.sin(M * radians) +
    0.02 * Math.sin(2 * M * radians) +
    0.0003 * Math.sin(3 * M * radians);
  const L = (M + 102.9372 + C + 180) % 360;
  const j_transit =
    solar_noon +
    0.0053 * Math.sin(M * radians) -
    0.0069 * Math.sin(2 * L * radians);
  const D =
    Math.asin(Math.sin(L * radians) * Math.sin(23.45 * radians)) * degrees;
  const cos_omega =
    (Math.sin(-0.83 * radians) -
      Math.sin(latitude * radians) * Math.sin(D * radians)) /
    (Math.cos(latitude * radians) * Math.cos(D * radians));
  // sun never rises
  if (cos_omega > 1) {
    return [null, -1];
  }
  // sun never sets
  if (cos_omega < -1) {
    return [-1, null];
  }

  // get Julian dates of sunrise/sunset
  const omega = Math.acos(cos_omega) * degrees;
  const j_set = j_transit + omega / 360.0;
  const j_rise = j_transit - omega / 360.0;

  /*
   * get sunrise and sunset times in UTC
   * Check section "Finding Julian date given Julian day number and time of
   *  day" on wikipedia for where the extra "+ 12" comes from.
   */
  const utc_time_set = 24 * (j_set - j_day) + 12;
  const utc_time_rise = 24 * (j_rise - j_day) + 12;
  const tz_offset =
    timezone === undefined ? (-1 * d.getTimezoneOffset()) / 60 : timezone;
  const local_rise = (utc_time_rise + tz_offset) % 24;
  const local_set = (utc_time_set + tz_offset) % 24;
  return [local_rise, local_set];
}

// ==================================================================================

import { riseOrSet } from "../util/riseorset.ts";

/**
 * Calculates the time of sunrise for a given latitude, longitude, and date.
 * @param latitude The latitude of the location.
 * @param longitude The longitude of the location.
 * @param date The date for which to calculate the sunrise time. If not provided, the current date is used.
 * @returns The time of sunrise for the given latitude, longitude, and date as a Date object.
 */
export function sunrise(
  latitude: number,
  longitude: number,
  date = new Date()
): Date {
  const zenithAngle = 90.8333;
  return riseOrSet(latitude, longitude, true, zenithAngle, date);
}

/**
 * Calculates the time of sunset for a given latitude, longitude, and date.
 * @param latitude The latitude of the location.
 * @param longitude The longitude of the location.
 * @param date The date for which to calculate the sunset time. If not provided, the current date is used.
 * @returns The time of sunset for the given latitude, longitude, and date as a Date object.
 */
export function sunset(
  latitude: number,
  longitude: number,
  date = new Date()
): Date {
  const zenithAngle = 90.8333;
  return riseOrSet(latitude, longitude, false, zenithAngle, date);
}
