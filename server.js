const fs = require("fs");
const http = require("http");
const path = require("path");

const port = process.env.PORT || 3000;
const rootDir = __dirname;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(rootDir, requestedPath));

  if (!filePath.startsWith(rootDir)) {
    return path.join(rootDir, "index.html");
  }

  return filePath;
}

const server = http.createServer((req, res) => {
  const filePath = resolveRequestPath(req.url);
  const fallbackPath = path.join(rootDir, "index.html");
  const finalPath = fs.existsSync(filePath) && fs.statSync(filePath).isFile() ? filePath : fallbackPath;
  const extension = path.extname(finalPath).toLowerCase();

  res.writeHead(200, {
    "Content-Type": contentTypes[extension] || "application/octet-stream"
  });
  fs.createReadStream(finalPath).pipe(res);
});

server.listen(port, () => {
  console.log(`FairPay running on port ${port}`);
});
