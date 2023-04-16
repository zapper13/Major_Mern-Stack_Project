/* This is a module that exports an Express router object with various routes and middleware functions
defined for handling user-related requests. It imports functions from the `userController.js` file
for handling user authentication, registration, profile management, and CRUD operations. It also
imports middleware functions from the `authMiddleware.js` file for protecting routes and ensuring
only admin users can access certain routes. The router object is then exported for use in other
parts of the application. */
import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
