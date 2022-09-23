import Recipe from '../models/Recipe';
import * as Yup from 'yup';

class RecipeController {
    async index(request, response) {
        const { page = 1 } = request.query;
        const recipes = await Recipe.findAll({
            limit: 20,
            offset: (page - 1) * 20
        });
        return response.json(recipes);
    }

    async show(request, response) {
        const recipe = await RecipeController.findByPk(request.params.id);

        return response.json(recipe);
    }

    async create(request, response) {
        const schema = Yup.object()
            .shape({
                preparation_instructions: Yup.string().required(),
                preparation_time: Yup.number().required(),
                portions: Yup.number().required(),
                category_id: Yup.number().required(),
                attachment_id: Yup.number()
            })
            .noUnknown();

        try {
            const validFields = await schema.validate(request.body, {
                abortEarly: false,
                stripUnknown: true
            });

            const recipe = await User.create({
                ...validFields,
                user_id: request.userId
            });

            return response.json(recipe);
        } catch (error) {
            return response.status(400).json(error);
        }
    }

    async update(request, response) {}

    async delete(request, response) {}
}

export default new RecipeController();