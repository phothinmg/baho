import tz1 from "./tz1.js";
import tz2 from "./tz2.js";
import tz3 from "./tz3.js";
import tz4 from "./tz4.js";

setTimeout(async () => {
  await tz1();
  setTimeout(async () => {
    await tz2();
    setTimeout(async () => {
      await tz3();
      setTimeout(async () => {
        await tz4();
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
