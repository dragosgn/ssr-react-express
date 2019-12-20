import fs from "fs";
import path from "path";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = 8080;
const app = express();

const router = express.Router();

const serverRender = (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error ocurred");
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
};

router.use("^/$", serverRender);

router.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
