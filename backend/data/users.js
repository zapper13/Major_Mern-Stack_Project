/* This code is defining an array of user objects with their names, emails, and hashed passwords using
the bcryptjs library. The library is used to securely hash passwords before storing them in a
database. The `bcrypt.hashSync()` function takes two arguments: the password to be hashed and the
number of salt rounds to use. The hashed passwords are then stored in the `password` property of
each user object. The first user object also has an `isAdmin` property set to `true`, indicating
that this user has administrative privileges. The code is then exporting the `users` array as the
default export of the module. */
import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
