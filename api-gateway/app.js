const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy routes
app.use('/users', createProxyMiddleware({ target: 'http://user-service-vm:3001', changeOrigin: true }));
app.use('/products', createProxyMiddleware({ target: 'http://product-service-vm:3002', changeOrigin: true }));
app.use('/orders', createProxyMiddleware({ target: 'http://order-service-vm:3003', changeOrigin: true }));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});