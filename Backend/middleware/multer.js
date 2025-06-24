// const multer = require('multer')

// const storage = multer.diskStorage({
//     filename:function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// const upload = multer({storage})

// module.exports = upload

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/'); // Make sure this folder exists
    },
    filename: function(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

module.exports = upload;
