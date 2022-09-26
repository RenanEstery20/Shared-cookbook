import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import User from '../models/User'

class AuthController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return response.status(401).json({ error: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: 'Invalid password' })
    }

    const { id, name } = user

    return response.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}
export default new AuthController()
