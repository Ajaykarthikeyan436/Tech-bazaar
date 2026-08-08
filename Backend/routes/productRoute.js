const express = require("express")
const productRouter = express.Router();
const { addproduct, listProduct, removeProduct, singleProduct } = require('../controllers/productController.js');
const upload = require("../middleware/multer.js");

productRouter.post('/add',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addproduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProduct);

module.exports = productRouter
