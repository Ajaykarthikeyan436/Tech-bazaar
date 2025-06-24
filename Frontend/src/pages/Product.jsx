import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { ShoppingCart, Zap } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {

    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');


    const fetchProductData = async () => {

        products.map((item) => {
            if (item._id === productId) {
                setProductData(item)
                setImage(item.image[0])
                console.log(item)
                return null
            }
        })
    }

    useEffect(() => {
        fetchProductData();
    }, [productId])

    return productData ? (
        <div className="mx-5 border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/*Product Data */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

                {/**Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {
                            productData.image.map((item, index) => {
                                return <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="" />
                            })
                        }
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto" src={image} alt="" />
                    </div>
                </div>

                {/*Product Info */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
                    <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
                    <div className="flex flex-col gap-4 my-8">
                        <button onClick={() => addToCart(productData._id)} className="relative flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 md:w-[30%]">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="font-semibold">Add to Cart</span>
                        </button>

                        <button className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 md:w-[30%]">
                            <Zap className="w-5 h-5" />
                            <span className="font-semibold">Buy Now</span>
                        </button>
                        <hr className="mt-8 sm:4/5" />

                        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                            <p>* Cash on delivery available on this product.</p>
                            <p>* Easy return and exchange policy within 7 days.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description and Review Section */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias consectetur modi consequatur esse repudiandae nulla perspiciatis mollitia. Quod quae, cum saepe laudantium minima quo, eum magni, accusantium rerum iure assumenda repellat. Officia nesciunt sequi commodi? Dignissimos, illum cumque ipsum esse aspernatur soluta blanditiis, fugiat minima praesentium optio quod mollitia nisi?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum laboriosam labore perferendis error repellat atque harum ab qui odio sint, nostrum debitis sunt officiis neque mollitia magni fuga nobis quaerat.</p>
                </div>
            </div>

            {/* Display Related Products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

        </div>
    ) : <div className="opacity-0"></div>
}

export default Product