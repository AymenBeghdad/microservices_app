const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy middleware configurations
app.use("/users", createProxyMiddleware({ target: "http://192.168.56.101:3001/users", changeOrigin: true }));
app.use("/products", createProxyMiddleware({ target: "http://localhost:3002/products", changeOrigin: true }));
app.use("/orders", createProxyMiddleware({ target: "http://localhost:3003/orders", changeOrigin: true }));

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).send("API endpoint not found.");
});

// Start API Gateway
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});