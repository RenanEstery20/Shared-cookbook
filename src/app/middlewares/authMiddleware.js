import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { promisify } from 'util'

export default async (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: 'Invalid authorization' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret)

    request.userId = tokenDecoded.id
    return next()
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' })
  }
}
