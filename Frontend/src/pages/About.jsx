// import React from "react";

// const About = () => {
//     return (
//         <>
//             <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//                 <h1 className="text-3xl font-bold text-center text-blue-600">Tech Bazaar - Your One-Stop Electronics Hub</h1>

//                 <section className="mt-6">
//                     <h2 className="text-2xl font-semibold">About Us</h2>
//                     <p className="text-gray-700 mt-2">
//                         Tech Bazaar is a leading provider of cutting-edge electronics, offering a wide range of gadgets, home appliances, and computing devices. Our mission is to bring the latest technology to consumers at competitive prices while ensuring top-notch customer service.
//                     </p>
//                 </section>

//                 <section className="mt-6">
//                     <h2 className="text-2xl font-semibold">Our Products</h2>
//                     <ul className="list-disc list-inside text-gray-700 mt-2">
//                         <b>Smartphones & Accessories< – Latest models from top brands.</b>
//                         <b>Laptops & Computers< – High-performance devices and peripherals.</b>
//                         <b>Home Appliances< – Smart TVs, kitchen appliances, and automation.</b>
//                         <b>Gaming & Entertainment< – Consoles, VR headsets, and accessories.</b>
//                         <b>Wearable Tech< – Smartwatches, fitness trackers, and wireless audio.</b>
//                     </ul>
//                 </section>

//                 <section className="mt-6">
//                     <h2 className="text-2xl font-semibold">Why Choose Tech Bazaar?</h2>
//                     <ul className="list-disc list-inside text-gray-700 mt-2">
//                         <b>Wide Selection< – A vast inventory of the latest electronics.</b>
//                         <b>Affordable Prices< – Competitive rates with regular discounts.</b>
//                         <b>Reliable Support< – 24/7 customer assistance and tech support.</b>
//                         <b>Secure Shopping< – Safe payments and hassle-free returns.</b>
//                     </ul>
//                 </section>

//                 <section className="mt-6">
//                     <h2 className="text-2xl font-semibold">Contact Us</h2>
//                     <p className="text-gray-700 mt-2">Website: <a href="#" className="text-blue-500">www.techbazaar.com</a></p>
//                     <p className="text-gray-700">Email: support@techbazaar.com</p>
//                     <p className="text-gray-700">Phone: +1-800-TECHBAZ</p>
//                     <p className="text-gray-700">Location: 123 Tech Avenue, Silicon City, USA</p>
//                 </section>
//             </div>
//         </>
//     );
// };

// export default About;

import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {

    return (
        <div>

            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quas omnis iure officiis porro hic enim quo eveniet doloremque vitae similique, tempora labore distinctio nulla perspiciatis dolore assumenda? Est, distinctio!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, quas. Dolorem nisi officia quo nostrum reprehenderit vel maiores deleniti. Magnam voluptas eligendi in tempora, quos, esse quasi similique saepe laborum aspernatur consequuntur hic praesentium doloremque facilis ipsum tempore minus quae.</p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>Our Mission at Tech Bazaar is to Empower customers with choice, convenience, and confidence. We're Dedicated to Providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                </div>
            </div>

            <div className="text-2xl py-4">
                <Title text1={"WHY"} text2={"CHOOSEUS"} />
            </div>

            <div className="flex flex-col md:flex-row text-sm md-20">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">                    
                        <b>Wide Selection – A vast inventory of the latest electronics.</b>
                        <b>Affordable Prices – Competitive rates with regular discounts.</b>
                        <b>Reliable Support – 24/7 customer assistance and tech support.</b>
                        <b>Secure Shopping – Safe payments and hassle-free returns.</b>                    
                </div>
            </div>

            <div className="mt-20">
                <NewsletterBox />
            </div>

        </div>
    )
}

export default About