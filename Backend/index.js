require("dotenv").config();
const express = require('express');
const cors = require("cors");
const path = require('path')
const connectCloudinary = require("./config/cloudinary.js");
const productRouter = require("./routes/productRoute.js");
const cartRoute = require('./routes/cartRoute.js');
const orderRouter = require("./routes/orderRoute.js");
const adminRouter = require("./routes/adminRoute.js");
const connectDB = require("./config/mongodb.js");

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://tech-bazaar-frontend-weld.vercel.app',
    'https://tech-bazaar-admin.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // keep 'Authorization'
  credentials: true,
}));

app.use(express.json())

connectDB();
connectCloudinary();

//api endpoints
app.use('/api/product',productRouter)
app.use('/api/cart',cartRoute)
app.use('/api/orders',orderRouter)
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Backend is Working....");
});

app.listen(5000, () => {
  console.log(`🚀 Server running.....`);
});

module.export = app;