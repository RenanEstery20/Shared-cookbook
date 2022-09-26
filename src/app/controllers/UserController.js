import User from '../models/User';
import * as Yup from 'yup';

class UserController {
    //get all users
    async index(request, response) {
            const { page = 1 } = request.query;
            const user = await User.findAll({
                attributes: ['id', 'name', 'email', 'status', 'is_admin'],
                limit: 20,
                offset: (page - 1) * 20
            });

            return response.json(user);
        }
        //show user
    async show(request, response) {
            const { id } = request.params;

            const user = await User.findByPk(id, {
                attributes: ['id', 'name', 'email', 'status', 'is_admin'],
                include: [{
                    association: 'avatar',
                    attributes: ['id', 'file', 'url']
                }]
            });

            return response.json(user);
        }
        //create new user
    async create(request, response) {
            //validation
            const schema = Yup.object()
                .shape({
                    name: Yup.string().required().max(70),
                    email: Yup.string().required().email().max(120),
                    password: Yup.string().required().min(6),
                    avatar_id: Yup.number()
                })
                .noUnknown();
            //verification email exists
            try {
                const userExists = await User.findOne({
                    where: {
                        email: request.body.email
                    }
                });
                // Email already exists ERROR
                if (userExists) {
                    return response.status(400).json({
                        error: 'Email already exists'
                    });
                }

                const validFields = await schema.validate(request.body, {
                    abortEarly: false,
                    stripUnknown: true
                });

                //Create new user
                const { id, name, email, status, is_admin } = await User.create(validFields);
                // return result []
                return response.json({ id, name, email, status, is_admin });
            } catch (error) {
                return response.status(400).json(error);
            }
        }
        //alter user
    async update(request, response) {
        const schema = Yup.object()
            .shape({
                name: Yup.string().max(70),
                password: Yup.string().min(6),
                avatar_id: Yup.number()
            })
            .noUnknown();

        try {
            const user = await User.findByPk(request.userId);

            if (!user) {
                return response.status(400).json({
                    error: 'Usuário não encontrado'
                });
            }

            const validFields = await schema.validate(request.body, {
                abortEarly: false,
                stripUnknown: true
            });

            const { name } = await user.update(validFields);

            return response.json({ name });
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}

export default new UserController();