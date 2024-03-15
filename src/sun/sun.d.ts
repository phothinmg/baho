/**
 * Calculate Sunrise time for given longitude, latitude, zenith and date
 */
declare function getSunrise(latitude: number, longitude: number, date?: Date): Date;
/**
 * Calculate Sunset time for given longitude, latitude, zenith and date
 */
declare function getSunset(latitude: number, longitude: number, date?: Date): Date;

export { getSunrise, getSunset };
