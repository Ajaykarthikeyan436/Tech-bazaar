const orderModel = require('../models/orderModel')
const cartModel = require('../models/cartModel')
const Razorpay = require('razorpay')

const currency = 'INR';
const deliveryCharge = 10;

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

//Placing order using COD method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            status: "Order Placed",
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await cartModel.updateOne({ userId }, { $set: { products: [] } });

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {

}

//Placing order using Razorpay Method
const placeOrderRazorpay = async (req, res) => {

    try {
        
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'Razorpay',
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order) => {
            if(error){
                console.log(error)
                return res.json({ success:false, message:error })
            }
            res.json({ success:true, order })
        })

    } catch (error) {
        console.log(error)
        res.json({ success:false, message:error.message })
    }

    // const instance = new Razorpay({
    //     key_id: process.env.RAZORPAY_KEY_ID,
    //     key_secret: procees.env.RAZORPAY_SECRET
    // })

    // try {

    //     const { amount } = req.body

    //     const options = {
    //         amount: amount * 100,
    //         currency: "INR",
    //         receipt: `receipt_order_${Data.now()}`
    //     }

    //     const order = await instance.orders.create(options)

    //     res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency })

    // } catch (error) {
    //     console.log(error)
    //     res.json({ success: false, message: error.message })
    // }

}

//Verify Razorpay
const verifyRazorpay = async (req,res) => {

    try {
        
        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            res.json({ success: true, message: "Payment Successful" })
        }
        else{
            res.json({ success: false, message: "Payment Failed"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }

}

//All orders data for Admin panel
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//User Order Data for Frontend
const userOrders = async (req, res) => {
    try {

        const userId = req.user.uid;

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Update Order Status
const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body;

        console.log("Status update requested:", { orderId, status });

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Missing orderId or status" });
        }

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = status;
        await order.save();

        console.log("Status successfully updated:", order.status);

        return res.status(200).json({ success: true, message: "Order status updated", order });
    } catch (error) {
        console.error("🔥 Error updating order status:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

module.exports = { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay }