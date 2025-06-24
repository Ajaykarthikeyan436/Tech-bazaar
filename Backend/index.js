require("dotenv").config();
const express = require('express');
const cors = require("cors");
const path = require('path')
const mongoose = require('mongoose')
const connectCloudinary = require("./config/cloudinary.js");
const productRouter = require("./routes/productRoute.js");
const cartRoute = require('./routes/cartRoute.js');
const orderRouter = require("./routes/orderRoute.js");
const adminRouter = require("./routes/adminRoute.js")

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // keep 'Authorization'
  credentials: true,
}));

app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DB Connection Successfull")
})

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