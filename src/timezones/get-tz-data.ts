import nodadata from "../../data/noda.json";

/**
 * Retrieves the zone data for a given timezone.
 *
 * @param {string} timezone - The timezone to retrieve the data for.
 * @returns {object} - The zone data object for the specified timezone.
 */
export function getZoneData(timezone: string) {
  const zones = nodadata.zones;
  let obj;
  zones.forEach((item) => {
    const name = [item.id, ...item.aliases];
    const a = name.includes(timezone);
    if (a) {
      obj = item;
    }
  });
  return obj;
}
/**
 * Retrieves all the zone data from the nodadata object.
 *
 * @returns An array of zone objects containing information about different time zones.
 */
export function getAllZonesData() {
  return nodadata.zones;
}
