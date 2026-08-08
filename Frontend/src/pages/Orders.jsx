import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from 'axios'
import { toast } from "react-toastify";

const Orders = () => {

    const { backendUrl, currency } = useContext(ShopContext);

    const [orderData, setOrderData] = useState([])

    const loadOrderData = async () => {
        const auth = await import("firebase/auth");
        const user = auth.getAuth().currentUser;

        if (!user) {
            toast.error("User not logged in");
            return;
        }

        try {
            const token = await user.getIdToken();

            const response = await axios.post( backendUrl + "/api/orders/userorders",{},{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setOrderData(response.data.orders.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Order fetch failed", error);
            toast.error("Order not listed")
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [])

    return (
        <div className="border-t pt-16">

            <div className="text-2xl">
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>

            <div>
                {orderData.map((order, orderIndex) => (
                    <div key={orderIndex} className="mb-6 border rounded-md p-4">
                        <h2 className="text-lg font-semibold mb-2 text-black">Order: {orderIndex + 1}</h2>
                        <p className="text-sm text-gray-500 mb-4">Date: {new Date(order.date).toLocaleDateString()}</p>

                        {order.items && order.items.length > 0 ? (
                            order.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex items-start gap-6 text-sm">
                                        <img className="w-16 sm:w-20" src={item.image?.[0]} alt={item.name} />
                                        <div>
                                            <p className="sm:text-base font-medium">{item.name}</p>
                                            <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                                <p className="text-lg">{currency}{item.price}</p>
                                                <p>Quantity: {item.quantity || 1}</p>
                                            </div>
                                            <p className="text-sm md:text-base mt-2">Payment: {order.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                            <p className="text-sm md:text-base">{order.status}</p>
                                        </div>
                                        <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No items found in this order.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders