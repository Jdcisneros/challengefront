"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const models_1 = require("./src/models");
const todoRoutes_1 = __importDefault(require("./src/routes/todoRoutes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 10000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', authRoutes_1.default);
app.use('/api/todos', todoRoutes_1.default);
(0, models_1.syncDatabase)();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
