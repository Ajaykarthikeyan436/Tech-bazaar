import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title"
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const { currency, updateQuantity, backendUrl, cartData, setCartData, fetchCartData } = useContext(ShopContext);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) fetchCartData();
        });
        return () => unsubscribe();
    }, []);


    const removeFromCart = async (productId) => {

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            const token = user ? await user.getIdToken() : null;

            const response = await axios.post(backendUrl + "/api/cart/delete",
                { productId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                // Remove the item from the cartData state
                console.log("Deleted successfully")
                setCartData(prev => prev.filter(item => item.productId._id !== productId));
            } else {
                console.error("Delete error:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting item from cart:", error.message);
        }
    };

    return (
        <div className="border-t pt-14">

            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            <div>
                {
                    Array.isArray(cartData) && cartData.map((item, index) => {
                        
                        const productData = item.productId; // populated product details

                        return (
                            <div key={index} className="flex justify-between py-4 border-t border-b text-gray-700 grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                                <div className="flex items-start gap-6">
                                    <img className="w-16 sm:w-20" src={productData.image[0]} alt={productData.name} />
                                    <div>
                                        <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>{currency}{productData.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    onChange={(e) =>
                                        e.target.value === '' || e.target.value === '0'
                                            ? null
                                            : updateQuantity(productData._id, Number(e.target.value))
                                    }
                                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />
                                <img
                                    onClick={() => removeFromCart(item.productId._id)}
                                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                                    src={assets.bin_icon}
                                    alt="Delete"
                                />
                            </div>
                        );
                    })}
            </div>

            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button onClick={() => navigate('/place-orders')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart;