import { writeJson } from "array-json";

async function tz3() {
  let objj = [];
  await fetch("https://data.iana.org/time-zones/data/backward")
    .then((res) => res.text())
    .then((data) => {
      const filteredData = data.replace(/^#.*/gm, "");
      const da3 = filteredData.replace(/^\s*[\r\n]/gm, "");
      const aa = da3.split("\n");
      aa.forEach((i) => {
        const a3 = i.split(/\t+/);
        const b3 = a3[3];
        let c3;
        if (b3) {
          c3 = [a3[2], b3.split(" ")[1]];
        } else {
          c3 = [a3[2]];
        }
        const d3 = {
          orig: a3[1],
          altName: c3,
        };
        objj.push(d3);
      });
    });
  const mergedData = {};
  for (const obj of objj) {
    if (Object.keys(obj).length === 0) {
      continue;
    }

    const { orig, altName } = obj;

    if (mergedData.hasOwnProperty(orig)) {
      mergedData[orig].altName.push(...altName);
    } else {
      mergedData[orig] = { orig, altName: [...altName] };
    }
  }
  const dat = Object.values(mergedData);
  await writeJson("src/data/tz3.json", dat.slice(0, -1));
}

export default tz3;
