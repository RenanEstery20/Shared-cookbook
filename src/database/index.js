import Sequelieze from 'sequelize'
import databaseConfig from '../config/database'

import User from '../app/models/User'
import Category from '../app/models/Category'
import Attachment from '../app/models/Attachment'
import Recipe from '../app/models/Recipe'
import RecipeItem from '../app/models/RecipeItem'
import Rating from '../app/models/Rating'

const models = [User, Category, Attachment, Recipe, RecipeItem, Rating]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelieze(databaseConfig)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

export default new Database()
