"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const BuyedStocks_1 = __importDefault(require("./BuyedStocks"));
const UsersModel_1 = __importDefault(require("./UsersModel"));
class Stocks extends sequelize_1.Model {
}
Stocks.init({
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
    price: {
        type: (0, sequelize_1.DECIMAL)(10, 2),
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    modelName: 'stocks',
    timestamps: false
});
Stocks.belongsToMany(UsersModel_1.default, {
    through: BuyedStocks_1.default
});
UsersModel_1.default.belongsToMany(Stocks, {
    through: BuyedStocks_1.default
});
exports.default = Stocks;
