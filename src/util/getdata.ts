import caldata from "../../data/caldata.json";

/**
 * Retrieves data based on a given timezone from a JSON file.
 * @param tz - The timezone for which data needs to be retrieved.
 * @returns An object containing the latitude, longitude, and offset values for the given timezone.
 */
export function getdata(tz: string): {
    lt: number;
    lg: number;
    ofhr: number;
    ofmi: number;
    ofse: number;
    ofms: number;
  } {
    const obj = caldata.find((item) => item.tzgp.includes(tz));
    if (obj) {
      return {
        lt: obj.latitude,
        lg: obj.longitude,
        ofhr: obj.offset_hr,
        ofmi: obj.offset_mi,
        ofse: obj.offset_se,
        ofms: obj.offset_ms,
      };
    }
    return { lt: 0, lg: 0, ofhr: 0, ofmi: 0, ofse: 0, ofms: 0 };
  }