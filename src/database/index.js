import Sequelieze from 'sequelize';
import databaseConfig from '../config/database';

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelieze(databaseConfig);
    }
}

export default new Database();