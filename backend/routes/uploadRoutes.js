/**
 * This is a JavaScript function that sets up a router for handling file uploads using multer and
 * checks the file type before uploading.
 * @param file - The file parameter is a representation of the uploaded file being processed by Multer.
 * It contains information about the file such as its original name, mimetype, and size.
 * @param cb - cb stands for "callback". It is a function that is passed as an argument to another
 * function and is called once the operation is completed. In this code, it is used to handle errors or
 * to return a result after the file is uploaded.
 * @returns The router object is being exported as the default export of the module.
 */
import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
