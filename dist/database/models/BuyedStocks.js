"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class BuyedStocks extends sequelize_1.Model {
}
BuyedStocks.init({
    userId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
    stockId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Stocks',
            key: 'id'
        }
    },
    quantity: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    modelName: 'buyedStocks',
    timestamps: false
});
exports.default = BuyedStocks;
