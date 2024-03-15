import timezoneNames from "../tzname.json";

/**
 * Retrieves the timezone names from a JSON file.
 * @returns {Promise<any>} A promise that resolves to the contents of the JSON file.
 */
async function getTimezoneNames(): Promise<any> {
  try {
    return  timezoneNames;
  } catch (error: any) {
    throw new Error("Failed to retrieve timezone names: " + error.message);
  }
}

export default getTimezoneNames;
