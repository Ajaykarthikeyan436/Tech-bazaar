import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function Collection() {

    const { products, search, ShowSearch } = useContext(ShopContext);
    const [showFilter, setshowFilter] = useState(false);
    const [filterProducts, setfilterProducts] = useState([]);
    const [category, setcategory] = useState([]);
    const [sortType, setsortType] = useState('relavent')

    const toggleCategory = (e) => {

        if (category.includes(e.target.value)) {
            setcategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setcategory(prev => [...prev, e.target.value])
        }

    }

    const applyfilter = () => {

        let productsCopy = products.slice()

        if (ShowSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }

        setfilterProducts(productsCopy)

    }

    const sortProduct = () => {

        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setfilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;

            case 'high-low':
                setfilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;

            default:
                applyfilter();
                break;
        }
    }

    useEffect(() => {
        applyfilter();
    }, [category, search, ShowSearch, products])

    useEffect(() => {
        sortProduct();
    }, [sortType])

    console.log("Products from context: ", products);
    console.log("Filtered products: ", filterProducts);


    return (
        <div className="mx-10 flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

            {/*Filter Options*/}
            <div className="min-w-60">
                <p onClick={() => { setshowFilter(!showFilter) }} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=""></img>
                </p>
                {/* Catagory Filter */}
                <div className={`bg-white shadow-md rounded-lg border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 -sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'mobile'} onChange={toggleCategory} />Mobile
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'TV'} onChange={toggleCategory} />Television
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'camera'} onChange={toggleCategory} />Cameras
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'fridge'} onChange={toggleCategory} />Fridge
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'washing machine'} onChange={toggleCategory} />Washing Machine
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'accessories'} onChange={toggleCategory} />Accessories
                        </p>
                    </div>
                </div>
            </div>

            {/**Right Side */}
            <div className="flex-1">

                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/** Product Sort */}
                    <select onChange={(e) => setsortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
                        <option value='relavent'>Sort by : Relavent</option>
                        <option value='low-high'>Sort by : Low to High</option>
                        <option value='high-low'>Sort by : High to Low</option>
                    </select>
                </div>

                {/**Map Products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        filterProducts.map((item, index) => {
                            return <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection