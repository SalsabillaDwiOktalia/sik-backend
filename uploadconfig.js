const multer = require('multer')
const MAX_SIZE = 20000000
const fs = require('fs')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './statics/lampiran')
  },
  filename: (req, file, cb) => {
    
    const randString = crypto.randomBytes(8).toString('hex').toLocaleUpperCase()
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length
    )
    cb(null, `${Date.now()}-${randString}${ext}`)
  }
})

const upload = multer({
  storage: storage,
  limits:{
    fileSize: MAX_SIZE
  }
})

const cekNull =(fileUpload) => {
  if (fileUpload === undefined || fileUpload === null) {
    return null
  } else {
    return fileUpload[0].filename
  }
}

const deleteImage = (image) => {
  fs.unlinkSync(`./statics/${image}`)
}

module.exports = { upload, cekNull, deleteImage}