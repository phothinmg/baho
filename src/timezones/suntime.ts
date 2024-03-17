import { suntimes } from "../sun/index.ts";
import { getdata } from "../util/getdata.ts";
import { convertDecimalTime, timeDiff } from "../util/destime.ts";

/**
 * Retrieves the sunrise, sunset, and daytime duration for a given timezone.
 *
 * @param timezone - The timezone to retrieve the daytime information for.
 * @returns An object containing the formatted sunrise, sunset, and daytime duration.
 *          - sunrise: The formatted sunrise time in HH:MM:SS AM/PM format. If sunrise time is not available, it will be "N/A".
 *          - sunset: The formatted sunset time in HH:MM:SS AM/PM format. If sunset time is not available, it will be "N/A".
 *          - daytime: The formatted duration between sunrise and sunset in HH:MM:SS format. If sunrise or sunset time is not available, it will be "N/A".
 */
export function getDaytime(timezone: string): {
  sunrise: string;
  sunset: string;
  daytime: string;
} {
  // Retrieve latitude, longitude, and timezone offset for the given timezone
  const { lt, lg, ofhr } = getdata(timezone);

  // Calculate the sunrise and sunset times
  const [sunriseDecimal, sunsetDecimal] = suntimes(lt, lg, ofhr);

  let sunrise = "N/A";
  let sunset = "N/A";
  let daytime = "N/A";

  // Check if sunriseDecimal and sunsetDecimal are not null before converting
  if (sunriseDecimal !== null && sunsetDecimal !== null) {
    sunrise = convertDecimalTime(sunriseDecimal);
    sunset = convertDecimalTime(sunsetDecimal);
    daytime = timeDiff(sunriseDecimal, sunsetDecimal);
  }

  // Return the formatted sunrise, sunset, and daytime duration
  return { sunrise, sunset, daytime };
}
