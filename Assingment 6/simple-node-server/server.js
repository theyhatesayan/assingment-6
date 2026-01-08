const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 4000;

const sendFile = (res, filePath, status = 200, type = "text/html") => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Internal Server Error");
    }
    res.writeHead(status, { "Content-Type": type });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  const route = req.url;

  if (route === "/style.css") {
    return sendFile(
      res,
      path.join(__dirname, "public", "style.css"),
      200,
      "text/css"
    );
  }

  const pages = {
    "/": "home.html",
    "/home": "home.html",
    "/about": "about.html",
    "/contact": "contact.html",
  };

  if (pages[route]) {
    return sendFile(
      res,
      path.join(__dirname, "pages", pages[route])
    );
  }

  sendFile(
    res,
    path.join(__dirname, "pages", "404.html"),
    404
  );
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
