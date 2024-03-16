import path from "path";
import { writeJson } from "array-json";

async function noda() {
  let t = [];
  await fetch("https://nodatime.org/TimeZones?version=2024a&format=json")
    .then(async (res) => await res.json())
    .then(async (data) => {
      data.zones.forEach((i) => {
        var a = [i.id, ...i.aliases];
        t.push(a);
      });

      await writeJson(path.join(process.cwd(), "data/noda.json"), data);
    });
  const tz = t.flatMap((i) => i);
  await writeJson(path.join(process.cwd(), "data/timezones.json"), tz);
}
await noda();
export default noda;
