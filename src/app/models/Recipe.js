import Sequelize, { Model } from 'sequelize'

class Recipe extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(100),
        preparation_instructions: Sequelize.TEXT,
        preparation_time: Sequelize.INTEGER,
        portions: Sequelize.INTEGER,
        ratingAvg: {
          type: Sequelize.VIRTUAL,
          get() {
            let total = 0
            if (this.ratings.length && this.ratings.length > 0) {
              total = this.ratings.reduce(
                (sum, current) => sum + parseFloat(current.Rating.rating),
                0
              )
              total /= this.ratings.length
            }
            return total
          },
        },
      },
      {
        sequelize,
      }
    )
    return this
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    })
    this.belongsTo(models.Attachment, {
      foreignKey: 'attachment_id',
      as: 'attachment',
    })
    this.hasMany(models.RecipeItem, { foreignKey: 'recipe_id', as: 'items' })
    this.belongsToMany(models.User, {
      as: 'users',
      foreignKey: 'recipe_id',
      through: 'user_favorites',
    })
    this.belongsToMany(models.User, {
      as: 'ratings',
      foreignKey: 'recipe_id',
      through: models.Rating,
    })
  }
}

export default Recipe
