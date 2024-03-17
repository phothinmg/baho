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
    } else if (id === "atlantic") {
      zz = tz.atlantic;
    } else if (id === "australia") {
      zz = tz.australia;
    } else if (id === "brazil") {
      zz = tz.brazil;
    } else if (id === "canada") {
      zz = tz.canada;
    } else if (id === "chile") {
      zz = tz.chile;
    } else if (id === "europe") {
      zz = tz.europe;
    } else if (id === "indian") {
      zz = tz.indian;
    } else if (id === "mexico") {
      zz = tz.mexico;
    } else if (id === "pacific") {
      zz = tz.pacific;
    } else if (id === "usa") {
      zz = tz.usa;
    }
    res.end(zz);
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
});

export default tzrouter;
