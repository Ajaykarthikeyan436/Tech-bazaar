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
    'https://tech-bazaar-frontend-zeta.vercel.app',
    'https://tech-bazaar-frontend-d1vorsh3y-ajays-projects-8ce49744.vercel.app',//fallback Url for frontend
    'https://tech-bazaar-admin.vercel.app',
    'https://tech-bazaar-admin-4d2acf2lu-ajays-projects-8ce49744.vercel.app'//fallback Url for admin panel
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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