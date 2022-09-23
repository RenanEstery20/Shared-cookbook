import Recipe from '../models/Recipe';
import * as Yup from 'yup';
import RecipeItem from '../models/RecipeItem';

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
        const recipe = await Recipe.findByPk(request.params.id, {
            attributes: ['id', 'name', 'preparation_instructions', 'preparation_time', 'portions'],
            include: [{
                    association: 'user',
                    attributes: ['id', 'name']
                },
                {
                    association: 'category',
                    attributes: ['id', 'description']
                },
                {
                    association: 'items',
                    attributes: ['id', 'name', 'quantity']
                },
                {
                    association: 'attachment',
                    attributes: ['id', 'url', 'file']
                }
            ]
        });

        return response.json(recipe);
    }

    async create(request, response) {
        const schema = Yup.object()
            .shape({
                name: Yup.string().max(100).required(),
                preparation_instructions: Yup.string().required(),
                preparation_time: Yup.number().required(),
                portions: Yup.number().required(),
                category_id: Yup.number().required(),
                attachment_id: Yup.number(),
                items: Yup.array()
                    .of(
                        Yup.object().shape({
                            name: Yup.string().max(100).required(),
                            quantity: Yup.string().max(100)
                        })
                    )
                    .required()
                    .min(1, 'A receita precisa ter ao menos um ingrediente')
            })
            .noUnknown();

        try {
            const validFields = await schema.validate(request.body, {
                abortEarly: false,
                stripUnknown: true
            });

            const recipe = await Recipe.create({
                ...validFields,
                user_id: request.userId
            }, {
                include: [{ association: 'items' }]
            });

            return response.json({ recipe });
        } catch (error) {
            return response.status(400).json(error);
        }
    }

    async update(request, response) {
        const schema = Yup.object()
            .shape({
                name: Yup.string().max(100).required(),
                preparation_instructions: Yup.string().required(),
                preparation_time: Yup.number().required(),
                portions: Yup.number().required(),
                category_id: Yup.number().required(),
                attachment_id: Yup.number(),
                items: Yup.array()
                    .of(
                        Yup.object().shape({
                            name: Yup.string().max(100).required(),
                            quantity: Yup.string().max(100)
                        })
                    )
                    .required()
                    .min(1, 'A receita precisa ter ao menos um ingrediente')
            })
            .noUnknown();

        try {
            const recipe = await Recipe.findByPk(request.params.id);

            if (!recipe) {
                return response.status(404).json({ error: 'Recipe not found' });
            }

            const validFields = await schema.validate(request.body, {
                abortEarly: false,
                stripUnknown: true
            });

            const { items, ...recipeFields } = validFields;

            await recipe.update(recipeFields);

            const recipeItems = await recipe.getItems();

            await Promise.all(recipeItems.map(i => i.destroy()));

            const newItems = await RecipeItem.bulkCreate(
                items.map(item => ({
                    ...item,
                    recipe_id: request.params.id
                }))
            );

            return response.json({...recipe.dataValues, items: newItems });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async delete(request, response) {
        const recipe = await Recipe.findByPk(request.params.id);

        if (!recipe) {
            return response.status(404).json({ error: 'Recipe not found' });
        }

        await recipe.destroy();

        return response.json({ message: 'Receita removida com sucesso' });
    }
}

export default new RecipeController();