import nodadata from "../../data/noda.json";
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
