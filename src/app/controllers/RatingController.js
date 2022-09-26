import * as Yup from 'yup'
import Recipe from '../models/Recipe'

class RatingController {
  async create(request, response) {
    const schema = Yup.object()
      .shape({
        rating: Yup.number().required(),
      })
      .noUnknown()

    try {
      const validFields = await schema.validate(request.body, {
        stripUnknown: true,
        abortEarly: false,
      })

      const { recipe_id } = request.params

      const recipe = await Recipe.findByPk(recipe_id)

      if (!recipe) {
        return response.status(400).json({ error: 'Recipe not found' })
      }

      await recipe.addRating(request.userId, {
        through: { rating: validFields.rating },
      })

      return response.json(recipe)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }
}

export default new RatingController()
