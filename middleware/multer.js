const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname=="productImage"){
        cb(null, './public/images/upload/products')
      }
      else if(file.fieldname=="profileImage"){
        cb(null, './public/images/upload/profiles')
      }
      else{
        cb(null, './public/images/upload/others')
      }
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })

module.exports = storage

