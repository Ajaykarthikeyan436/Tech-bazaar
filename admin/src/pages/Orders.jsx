import React, { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllOrders = async () => {
        const auth = getAuth();

        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.error("No admin user logged in");
                return;
            }

            try {
                const firebaseToken = await user.getIdToken();
                console.log(firebaseToken)

                const response = await axios.get(`${backendUrl}/api/orders/list`, {
                    headers: {
                        Authorization: `Bearer ${firebaseToken}`,
                    },
                });

                setOrders(response.data.orders.reverse() || []);
            } catch (error) {
                console.error("🔥 Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const statusHandler = async (event, orderId) => {
        try {
            const newStatus = event.target.value;
            const user = getAuth().currentUser;

            if (!user) {
                console.error("No user logged in");
                return;
            }

            const firebaseToken = await user.getIdToken();

            const response = await axios.post(backendUrl + "/api/orders/status", { orderId, status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${firebaseToken}`,
                },
            }
            );

            if (response.data.success) {
                toast.success("Order status updated");
                await fetchAllOrders();
            } else {
                toast.error(response.data.message || "Update failed");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Tech Bazaar Orders</h2>
            {loading ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="border p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-start gap-4">
                            <img src={assets.parcel_icon} alt="Order" className="w-10 h-10" />

                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">
                                    Order #{order._id.slice(-6).toUpperCase()}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Date: {new Date(order.date).toLocaleString()}
                                </p>
                                <p className="text-sm">
                                    Payment: {order.payment ? "Paid" : "Pending"}
                                </p>
                                <p className="text-sm">Method: {order.paymentMethod}</p>

                                <p className="text-sm font-semibold mt-2">Items:</p>
                                <ul className="list-disc list-inside text-sm ml-2">
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>
                                            {item.name} x {item.quantity} – ₹ {item.price * item.quantity}
                                        </li>
                                    ))}
                                </ul>

                                <p className="mt-2 font-bold">
                                    Total: {currency} {order.amount}
                                </p>
                            </div>

                            <div className="min-w-[180px]">
                                <label className="block text-sm font-medium mb-1">
                                    Order Status:
                                </label>
                                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="w-full p-2 border rounded-md font-semibold text-sm">
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out of Delivery">Out of Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;