const express = require('express')
const { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay } = require('../controllers/orderController')
const verifyFirebaseToken = require('../middleware/authMiddleware')
const verifyAdmin = require('../middleware/verifyAdmin')

const orderRouter = express.Router()

//Admin Features
orderRouter.get('/list', verifyFirebaseToken, allOrders)
orderRouter.post('/status', verifyFirebaseToken, updateStatus)

//Payment Features
orderRouter.post('/place', placeOrder)
orderRouter.post('/stripe', placeOrderStripe)
orderRouter.post('/razorpay', placeOrderRazorpay)

//User Features
orderRouter.post('/userOrders',verifyFirebaseToken,userOrders)

//varifyPayment
orderRouter.post('/verifyRazorpay',verifyFirebaseToken, verifyRazorpay)

module.exports = orderRouter;