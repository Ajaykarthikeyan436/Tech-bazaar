import { useContext, useEffect, useState } from "react"
import { assets } from "../assets/frontend_assets/assets"
import CartTotal from "../components/CartTotal"
import Title from "../components/Title"
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Placeorder = () => {

    const [method, setMethod] = useState('cod');
    const { backendUrl, cartData, setCartData, getCartAmount, delivery_fee } = useContext(ShopContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "order Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {

                    const auth = await import("firebase/auth");
                    const user = auth.getAuth().currentUser;

                    if (!user) {
                        toast.error("Please log in to place an order");
                        return;
                    }

                    const token = await user.getIdToken();

                    const { data } = await axios.post( backendUrl + "/api/orders/verifyRazorpay", response, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    })
                    if(data.success) {
                        navigate("/orders")
                        setCartData([])
                    }

                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const auth = await import("firebase/auth");
            const user = auth.getAuth().currentUser;

            if (!user) {
                toast.error("Please log in to place an order");
                return;
            }

            const token = await user.getIdToken();

            const orderItems = cartData.map(item => ({
                ...item.productId,
                quantity: item.quantity
            }));

            let orderData = {
                userId: user.uid,
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                paymentMethod: method
            };

            switch (method) {

                //API Calls for Payment
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/orders/place', orderData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    });

                    if (response.data.success) {
                        setCartData([]);
                        navigate("/orders");
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + "/api/orders/razorpay", orderData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    })
                    if (responseRazorpay.data.success) {
                        console.log("Backend Razorpay order:", responseRazorpay.data.order);
                        initPay(responseRazorpay.data.order);
                    }
                    else {
                        toast.error(response.data.message)
                    }
                    break;

                default:
                    break
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to place order");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/* Left Side */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" />
                    <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" />
                </div>
                <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email Address" />
                <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
                    <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
                </div>
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
                    <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
                </div>
                <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
            </div>

            {/* Right Side */}
            <div className="mt-8">

                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>

                <div className="mt-12">
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                    {/* Payment Method Selection */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Placeorder