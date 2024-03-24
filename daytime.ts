import { suntimes } from "./src/sun/index.ts";
import { convertDecimalTime, timeDiff } from "./src/util/destime.ts";

export default function myDayTime(
  lt: number,
  lg: number,
  tz: number
): {
  sunrise: string;
  sunset: string;
  daytime: string;
} {
  // Retrieve latitude, longitude, and timezone offset for the given timezone

  // Calculate the sunrise and sunset times
  const [sunriseDecimal, sunsetDecimal] = suntimes(lt, lg, tz);

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
