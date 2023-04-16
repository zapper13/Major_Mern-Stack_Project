import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


/* This is defining a function called `getProducts` that uses the `asyncHandler` middleware to handle
any errors that may occur during the asynchronous execution of the function. */
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

/* This code is defining a function called `getProducts` that retrieves a list of products from the
database based on the user's search query. It uses the `asyncHandler` middleware to handle any
errors that may occur during the asynchronous execution of the function. */
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


/* This code is defining a function called `getProductById` that retrieves a single product from the
database based on the product ID provided in the request parameters. It uses the `asyncHandler`
middleware to handle any errors that may occur during the asynchronous execution of the function. If
the product is found, it is returned as a JSON response. If the product is not found, a 404 error is
thrown with the message "Product not found". */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


/* This code is defining a function called `deleteProduct` that deletes a product from the database
based on the product ID provided in the request parameters. It uses the `asyncHandler` middleware to
handle any errors that may occur during the asynchronous execution of the function. If the product
is found, it is removed from the database and a JSON response with the message "Product removed" is
returned. If the product is not found, a 404 error is thrown with the message "Product not found". */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


/* `const createProduct` is a function that creates a new product in the database. It uses the
`asyncHandler` middleware to handle any errors that may occur during the asynchronous execution of
the function. */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


/* `const updateProduct` is a function that updates an existing product in the database based on the
product ID provided in the request parameters. It uses the `asyncHandler` middleware to handle any
errors that may occur during the asynchronous execution of the function. The function extracts the
updated product information from the request body and updates the corresponding fields in the
product object. If the product is found and updated successfully, the updated product is returned as
a JSON response. If the product is not found, a 404 error is thrown with the message "Product not
found". */
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

/* This code is defining a function called `updateProduct` that updates an existing product in the
database based on the product ID provided in the request parameters. It first retrieves the product
from the database using the `findById` method and then updates the corresponding fields in the
product object with the new values provided in the request body. If the product is found and updated
successfully, the updated product is returned as a JSON response. If the product is not found, a 404
error is thrown with the message "Product not found". */
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


/* `const createProductReview` is a function that creates a new review for a product in the database.
It uses the `asyncHandler` middleware to handle any errors that may occur during the asynchronous
execution of the function. The function extracts the rating and comment information from the request
body and retrieves the corresponding product from the database using the product ID provided in the
request parameters. If the product is found, the function checks if the user has already reviewed
the product. If the user has already reviewed the product, a 400 error is thrown with the message
"Product already reviewed". If the user has not reviewed the product, a new review object is created
with the user's name, rating, comment, and ID, and added to the product's reviews array. The
product's `numReviews` and `rating` fields are updated based on the new review, and the updated
product is saved to the database. Finally, a JSON response with the message "Review added" is
returned. If the product is not found, a 404 error is thrown with the message "Product not found". */
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

   /* This code is defining a function called `createProductReview` that creates a new review for a
   product in the database. It first extracts the rating and comment information from the request
   body and retrieves the corresponding product from the database using the product ID provided in
   the request parameters. If the product is found, the function checks if the user has already
   reviewed the product. If the user has already reviewed the product, a 400 error is thrown with
   the message "Product already reviewed". If the user has not reviewed the product, a new review
   object is created with the user's name, rating, comment, and ID, and added to the product's
   reviews array. The product's `numReviews` and `rating` fields are updated based on the new
   review, and the updated product is saved to the database. Finally, a JSON response with the
   message "Review added" is returned. If the product is not found, a 404 error is thrown with the
   message "Product not found". */
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


/* `getTopProducts` is a function that retrieves the top 3 products from the database based on their
rating. It uses the `asyncHandler` middleware to handle any errors that may occur during the
asynchronous execution of the function. The function finds all products in the database, sorts them
in descending order based on their rating, and limits the results to the top 3 products. The
function then returns a JSON response with the top 3 products. This function is exported along with
other functions to be used in other parts of the application. */
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
