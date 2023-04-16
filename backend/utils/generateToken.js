/**
 * This is a JavaScript function that generates a JSON Web Token (JWT) with a given ID and a secret key
 * that expires in 30 days.
 * @param id - The unique identifier of the user for whom the token is being generated.
 * @returns The `generateToken` function is returning a JSON Web Token (JWT) that is signed with the
 * provided `id` and a secret key stored in the `JWT_SECRET` environment variable. The token has an
 * expiration time of 30 days.
 */
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default generateToken
