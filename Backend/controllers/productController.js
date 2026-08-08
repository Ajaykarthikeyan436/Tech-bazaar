const cloudinary = require('cloudinary').v2;
const productModel = require('../models/productModel.js')

//Function for add product
const addproduct = async (req, res) => {

    try {

        const { name, description, price, category, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            bestseller: bestseller === 'true' ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        console.log(req.body)

        console.log(productData)

        const product = new productModel(productData)
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//Function for list product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//Function for removing product
const removeProduct = async (req, res) => {
    try {
        
        const { id } = req.body;
        console.log("Product id :", id)

        await productModel.findByIdAndDelete(id)
        res.json({ success: true, message: "Product Removed" })
        

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//Function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success:false, message: error.message})
    }

}

module.exports = {
    addproduct,
    listProduct,
    removeProduct,
    singleProduct
};

