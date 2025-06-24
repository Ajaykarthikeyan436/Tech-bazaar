import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
    return (
        <div className="m-5">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">

                <div>
                    <img src={assets.logo} className="mb-5 w-32" alt=""></img>
                    <p className="w-full md:w-2/3 text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quis itaque repellendus totam odio nemo!
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About US</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+1-212-456-7865</li>
                        <li>contact@techbazaar.com</li>
                    </ul>
                </div>

            </div>

            <div>
                <hr></hr>
                <p className="py-5 text-sm text-center">Copyright 2025@ techbazaar.com - All Right Reserverd.</p>
            </div>
        </div>
    )
}

export default Footer