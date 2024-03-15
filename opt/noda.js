import path from "path";
import { writeJson } from "array-json";

async function noda() {
  await fetch("https://nodatime.org/TimeZones?version=2024a&format=json").then(
    (res) =>
      res.json().then(async (data) => {
        await writeJson(path.join(process.cwd(), "data/noda.json"), data);
      })
  );
}

export default noda;
