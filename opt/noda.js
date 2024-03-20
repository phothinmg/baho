import path from "path";
import { writeJson } from "array-json";

async function noda() {
  let t = [];
  let abb = [];
  await fetch("https://nodatime.org/TimeZones?version=2024a&format=json")
    .then(async (res) => await res.json())
    .then(async (data) => {
      data.zones.forEach((i) => {
        var a = [i.id, ...i.aliases];
        t.push(a);
        var a = i.currentOffset.split(" ")[0];
        var c = parseInt(a.split(":")[0]) * 60;
        var d = a.split(":")[1];
        let e;
        if (d === undefined) {
          e = 0;
        } else {
          e = parseInt(d);
        }
        var mi = c + e;
        var hr = mi / 60;
        var se = mi * 60;
        var ms = se * 1000;

        let lt;
        let lg;
        if (i.location === null) {
          lt = 0;
          lg = 0;
        } else {
          lt = i.location.latitude;
          lg = i.location.longitude;
        }
        var x = [i.id, ...i.aliases];
        var htt = {
          tzgp: x,
          latitude: lt,
          longitude: lg,
          offset_hr: hr,
          offset_mi: mi,
          offset_se: se,
          offset_ms: ms,
        };

        abb.push(htt);
      });

      await writeJson(path.join(process.cwd(), "data/noda.json"), data);
    });
  const tz = t.flatMap((i) => i);
  await writeJson(path.join(process.cwd(), "data/timezones.json"), tz);
  var zz = abb.flatMap((i) => i);
  await writeJson(path.join(process.cwd(), "data/caldata.json"), zz);
}
await noda();
export default noda;
