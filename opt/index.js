import noda from "./noda.js";
import nodatime from "./nodatime.js";
import geonametz from "./geonametz.js";
import countryinfo from "./countryinfo.js";

setTimeout(async () => {
  await noda();
  setTimeout(async () => {
    await nodatime();
    setTimeout(async () => {
      await geonametz();
      setTimeout(async () => {
        await countryinfo();
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
