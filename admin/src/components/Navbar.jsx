import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets.js"
import auth from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    function logout()
    {
        signOut(auth);
        navigate("/login")

    }

    return (
        <div className="flex items-center py-2 px-[4%] justify-between">
            <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
            <button
                onClick={logout}
                className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar