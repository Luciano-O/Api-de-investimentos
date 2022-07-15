"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Users extends sequelize_1.Model {
    static associate(models) {
        Users.belongsToMany(models.Stocks, {
            through: 'buyedStocks'
        });
    }
}
Users.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: (0, sequelize_1.STRING)(30),
        allowNull: false,
    },
    balance: {
        type: (0, sequelize_1.DECIMAL)(10, 2),
        allowNull: false,
    },
    password: {
        type: (0, sequelize_1.STRING)(100),
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    modelName: 'users',
    timestamps: false
});
exports.default = Users;
