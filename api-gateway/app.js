import express from 'express';
import { config } from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware'; 

config();

const app = express();

// Middleware to proxy requests to the User Service
app.use('/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL, // Redirect to User Service
  changeOrigin: true,
}));


app.use('/products', createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL, 
  changeOrigin: true,
}));


app.use('/orders', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL, 
  changeOrigin: true,
}));


app.listen(3000, () => {
  console.log('API Gateway is running on port 3000');
});
