import React, { useState } from "react";
import { assets } from "../assets/assets"
import axios from "axios"
import { backendUrl } from "../App"
import { toast } from "react-toastify"

const Add = () => {

    const [image1,setImage1] = useState(false);
    const [image2,setImage2] = useState(false);
    const [image3,setImage3] = useState(false);
    const [image4,setImage4] = useState(false);

    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [category, setCategory] = useState("mobile")
    const [bestseller, setBestseller] = useState(false)

    const [status,setStatus] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setStatus(true)

        try {
            
            const formData = new FormData()

            formData.append("name",name)
            formData.append("description",description)
            formData.append("price",price)
            formData.append("category",category)
            formData.append("bestseller",bestseller)

            image1 && formData.append("image1",image1)
            image2 && formData.append("image2",image2)
            image3 && formData.append("image3",image3)
            image4 && formData.append("image4",image4)

            const response = await axios.post( backendUrl + "/api/product/add" ,formData)

            if(response.data.success) {
                toast.success("Product Added")
                setName("")
                setDescription("")
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice("")
                setStatus(false)
            }
            else {
                toast.error(response.data.message)
                setStatus(false)
            }

        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
            <div>
                <p className="mb-2">Upload Image</p>

                <div className="flex gap-2">
                    <label htmlFor="image1">
                        <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=""/>
                        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
                    </label>
                    <label htmlFor="image2">
                        <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=""/>
                        <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
                    </label>
                    <label htmlFor="image3">
                        <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=""/>
                        <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
                    </label>
                    <label htmlFor="image4">
                        <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=""/>
                        <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
                    </label>
                </div>
            </div>

            <div className="w-full">
                <p className="mb-2">Product Name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type Here" required/>
            </div>

            <div className="w-full">
                <p className="mb-2">Product description</p>
                <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Write Content Here" required/>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

                <div>
                    <p className="mb-2">Product category</p>
                    <select onChange={(e)=>setCategory(e.target.value)} className="w-full px-3 py-2">
                        <option value="mobile">Mobile</option>
                        <option value="laptop">Laptop</option>
                        <option value="camera">Camera</option>
                        <option value="TV">Television</option>
                        <option value="fridge">Fridge</option>
                        <option value="washing machine">Wasihing Machine</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>

                <div>
                    <p className="mb-2">Product Price</p>
                    <input onChange={(e)=>setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px]" type="number" placeholder="25"/>
                </div>

            </div>

            <div className="flex gap-2 mt-2">
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller"/>
                <label className="cursor-pointer" htmlFor="bestseller">Add to Bestseller</label>
            </div>

            <button type="submit" className="w-28 py-3 mt-4 bg-black text-white rounded-md">{status ? "Adding.." : "ADD"}</button>
        </form>
    )
}

export default Add