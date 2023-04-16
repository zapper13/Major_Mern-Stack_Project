/* This is a JavaScript code that defines a router for handling HTTP requests related to products. It
imports the necessary functions from the `productController.js` file and the `authMiddleware.js`
file. It defines various routes for handling GET, POST, PUT, and DELETE requests related to products
and product reviews. It also uses middleware functions to protect certain routes and ensure that
only admin users can access them. Finally, it exports the router for use in other parts of the
application. */
import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
