import Recipe from '../models/Recipe'

class FavoriteController {
  async create(request, response) {
    const { recipe_id } = request.params

    const recipe = await Recipe.findByPk(recipe_id)

    if (!recipe) {
      return response.status(400).json({ erro: 'Receita não encontrada' })
    }

    await recipe.addUser(request.userId)

    return response.json({ message: 'Receita favoritada com sucesso' })
  }

  async index(request, response) {
    const favoritesRecipes = await Recipe.findAll({
      include: [
        {
          attributes: [],
          association: 'users',
          where: {
            id: request.userId,
          },
        },
      ],
    })
    return response.json(favoritesRecipes)
  }

  async delete(request, response) {
    const { recipe_id } = request.params

    const recipe = await Recipe.findByPk(recipe_id)

    if (!recipe) {
      return response.status(400).json({ erro: 'Receita não enconntrada' })
    }

    await recipe.removeUser(request.userId)

    return response.json({ message: 'Receita removida dos favoritos' })
  }
}

export default new FavoriteController()
