import express from "express";
import path from "node:path";

import tzrouter from "./tzname.js";
const app = express();
const port = 8000;

app.use(express.static(path.join(process.cwd(), "docs")));
// body-parser
// parses incoming requests with JSON payloads
app.use(express.json());
//  parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Hello, from Noda-tz!");
});

app.use("/tzname", tzrouter);

app.listen(port, () => {
  console.log(
    `Server running at http://localhost:${port}`
  );
});
