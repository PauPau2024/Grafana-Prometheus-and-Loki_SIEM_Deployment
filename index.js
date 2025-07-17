const express = require("express");
const { doSomeHeavyTask } = require("./util");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 8000;

// Prometheus metrics setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // collect CPU, memory, etc.

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000, 2000, 5000] // ms
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Middleware to measure response time
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Home!");
});

app.get("/slow", async (req, res) => {
  await doSomeHeavyTask();
  res.send("Heavy task completed");
});

app.listen(PORT, () =>
  console.log(`Express Server Started at http://localhost:${PORT}`)
);
