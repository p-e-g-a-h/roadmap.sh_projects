const { createServer } = require("http");
const fs = require("fs").promises;
const path = require("path");

const units = {
  millimeter: 1000,
  centimeter: 100,
  meter: 1,
  kilometer: 0.001,
  inch: 39.3701,
  foot: 3.28084,
  yard: 1.09361,
  mile: 0.000621371,
  milligram: 1000,
  gram: 1,
  kilogram: 0.001,
  ounce: 0.035274,
  pound: 0.00220462,
};

const getResult = (data) => {
  const { x, from, to } = data;
  return (units[to] * (x / units[from])).toFixed(2);
};

const port = 3000;
const server = createServer(async (req, res) => {
  if (req.url == "/") {
    try {
      const htmlPath = path.join(__dirname, "views", "index.html");
      const data = await fs.readFile(htmlPath, "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    } catch (error) {
      console.error(error);
      res.writeHead(500);
      res.end("server error: file not found");
    }
  } else if (req.url == "/index.css") {
    try {
      const cssPath = path.join(__dirname, "views", "index.css");
      const css = await fs.readFile(cssPath, "utf8");
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(css);
    } catch (error) {
      console.error(error);
      res.writeHead(500);
      res.end("server error: file not found");
    }
  } else if (req.url == "/convert" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ number: getResult(data) }));
      } catch (error) {
        res.writeHead(404);
        res.end("invalid json");
      }
    });
  } else {
    res.writeHead(404);
    res.end("error: page not found.");
  }
});

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});
