import { writeJson, readJson } from "array-json";
import sortKeys from "sort-keys";
import data1 from "../src/data/tz1.json" assert { type: "json" };
import data2 from "../src/data/tz2.json" assert { type: "json" };
import data3 from "../src/data/tz3.json" assert { type: "json" };
import data4 from "../src/data/tz4.json" assert { type: "json" };

let tza = [];
data1.forEach((i) => {
  var a = i.orig;
  let c = {};
  data3.forEach((j) => {
    var b = j.orig;

    if (a == b) {
      c = {
        code: i.countryCode,
        tzname: i.tzName,
        offset: i.offset,
        tzgroup: j.altName,
      };
    } else {
      c = {
        code: i.countryCode,
        tzname: i.tzName,
        offset: i.offset,
      };
    }
  });
  tza.push(c);
});

/*const mergedData = {};
for (const obj of data3) {
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
const data5 = Object.values(mergedData);
writeJson('a.json', data5)*/
// ============================================================

// const data5 = tza.filter(obj => Object.keys(obj).length !== 0);

// writeJson("a.json");

// var a = data3.filter((i) => i.orig === "Asia/Yangon");
// let b = [];
// data1.forEach((i) => {
//   var a = i.tzName;
//   b.push(a);
// });
writeJson("src/data/tzname.json", tza);
