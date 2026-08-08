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