import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


/* `const authUser` is a function that handles user authentication. It takes in the `req` and `res`
objects as parameters and uses `asyncHandler` to handle any errors that may occur during the
execution of the function. */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})


/* `const registerUser` is a function that handles user registration. It takes in the `req` and `res`
objects as parameters and uses `asyncHandler` to handle any errors that may occur during the
execution of the function. */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


/* `const getUserProfile` is a function that retrieves the profile of the currently logged in user. It
uses `asyncHandler` to handle any errors that may occur during the execution of the function. It
first finds the user by their ID, which is stored in the `req.user._id` property. If the user is
found, it returns their profile information (ID, name, email, and isAdmin status) in JSON format. If
the user is not found, it throws a 404 error with the message "User not found". */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


/* `const updateUserProfile` is a function that updates the profile of the currently logged in user. It
first finds the user by their ID, which is stored in the `req.user._id` property. If the user is
found, it updates their name and email with the values provided in the request body, or keeps the
existing values if none are provided. If a new password is provided in the request body, it updates
the user's password. Finally, it saves the updated user and returns their updated profile
information (ID, name, email, isAdmin status, and a new token) in JSON format. If the user is not
found, it throws a 404 error with the message "User not found". */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


/* `const getUsers` is a function that retrieves all users from the database. It uses `asyncHandler` to
handle any errors that may occur during the execution of the function. It finds all users using the
`User.find({})` method and returns them in JSON format using `res.json(users)`. */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})


/* `const deleteUser` is a function that handles the deletion of a user from the database. It uses
`asyncHandler` to handle any errors that may occur during the execution of the function. It first
finds the user by their ID, which is passed in as a parameter in the request URL (`req.params.id`).
If the user is found, it removes them from the database using the `user.remove()` method and returns
a JSON response with the message "User removed". If the user is not found, it throws a 404 error
with the message "User not found". */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


/* `const getUserById` is a function that retrieves a user's profile by their ID. It uses
`asyncHandler` to handle any errors that may occur during the execution of the function. It finds
the user by their ID, which is passed in as a parameter in the request URL (`req.params.id`). If the
user is found, it returns their profile information (ID, name, and email) in JSON format, excluding
their password. If the user is not found, it throws a 404 error with the message "User not found". */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


/* `const updateUser` is a function that handles the updating of a user's profile in the database. It
uses `asyncHandler` to handle any errors that may occur during the execution of the function. It
first finds the user by their ID, which is passed in as a parameter in the request URL
(`req.params.id`). If the user is found, it updates their name, email, and isAdmin status with the
values provided in the request body, or keeps the existing values if none are provided. Finally, it
saves the updated user and returns their updated profile information (ID, name, email, and isAdmin
status) in JSON format. If the user is not found, it throws a 404 error with the message "User not
found". */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
