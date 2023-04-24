const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.get(
  "/",
  createProxyMiddleware({
    target:
      "https://console.firebase.google.com/u/0/project/angular-organiser-8de6b/database/angular-organiser-8de6b-default-rtdb/data/~2F",
    changeOrigin: true,
  })
);

app.listen(3333, () => {
  console.log("Proxy server started on port 3333");
});
