"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = exports.syncDatabase = exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Todo_1 = __importDefault(require("./Todo"));
exports.Todo = Todo_1.default;
User_1.default.hasMany(Todo_1.default, { foreignKey: 'userId', as: 'todos' });
Todo_1.default.belongsTo(User_1.default, { foreignKey: 'userId', as: 'user' });
const syncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.sync({ alter: false });
    }
    catch (error) {
        console.error('Error syncing database:', error);
    }
});
exports.syncDatabase = syncDatabase;
