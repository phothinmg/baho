import express from "express";
import getTimeZoneNames from "../../dist/timezones/get-tz-name.js";

const tzrouter = express.Router();

tzrouter.get("/:reqId", (req, res) => {
  const tz = getTimeZoneNames();
  try {
    const id = req.params.reqId;
    const arr = [
      tz.africa,
      tz.all,
      tz.america,
      tz.antarctica,
      tz.arctic,
      tz.asia,
      tz.atlantic,
      tz.australia,
      tz.brazil,
      tz.canada,
      tz.chile,
      tz.europe,
      tz.indian,
      tz.mexico,
      tz.pacific,
      tz.usa,
    ];
    let zz;
    if (id === "asia") {
      zz = tz.asia;
    } else if (id === "africa") {
      zz = tz.africa;
    } else if (id === "all") {
      zz = tz.all;
    } else if (id === "america") {
      zz = tz.america;
    } else if (id === "antarctica") {
      zz = tz.antarctica;
    } else if (id === "arctic") {
      zz = tz.arctic;
    }
    res.end(zz);
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
});

export default tzrouter;
