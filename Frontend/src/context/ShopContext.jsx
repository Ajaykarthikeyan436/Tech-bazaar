import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '₹'
    const delivery_fee = 10;
    const [search, setsearch] = useState('');
    const [ShowSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({}); // This is used for local testing
    const [products, setProducts] = useState([]);
    const [cartData, setCartData] = useState([]); // This is used for DB
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                console.error("User not logged in");
                return;
            }

            const token = await user.getIdToken();

            const response = await fetch(backendUrl + "/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify({
                    userId: user.uid,
                    productId: itemId,
                    quantity: cartData[itemId]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Failed to add to cart", data);
                setCartData(data)
            } else {
                console.log("Added to cart successfully", data);
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };

    const getCartCount = () => {
        let totalCount = 0;

        if (!Array.isArray(cartData)) return totalCount;

        for (const item of cartData) {
            try {
                totalCount += item.quantity;
            } catch (error) {
                console.error(error);
            }
        }
        return totalCount;
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            const token = user ? await user.getIdToken() : null;

            const response = await axios.put(backendUrl + "/api/cart/update",
                { productId, quantity },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                // Update local state too
                setCartData((prev) =>
                    prev.map((item) =>
                        item.productId._id === productId
                            ? { ...item, quantity: quantity }
                            : item
                    )
                );
            } else {
                console.error("Failed to update quantity:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating cart quantity:", error.message);
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;

        if (!Array.isArray(cartData)) return totalAmount;

        for (const item of cartData) {
            try {
                totalAmount += item.productId.price * item.quantity;
            } catch (error) {
                console.error(error);
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get( backendUrl +'/api/product/list', {
                withCredentials: true
            });

            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    const fetchCartData = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();

        try {
            const response = await axios.get(backendUrl + "/api/cart/get", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            if (response.data.success && response.data.cart) {
                setCartData(response.data.cart.products);
            } else {
                console.error("Cart fetch error:", response.data.message);
            }
        } catch (error) {
            console.error("Fetch cart error:", error.message);
        }
    };


    const value = {
        products, currency, delivery_fee,
        search, setsearch, ShowSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount,
        navigate, cartData,
        setCartData, fetchCartData,
        backendUrl
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider