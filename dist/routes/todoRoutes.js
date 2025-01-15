"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validateSchema_1 = require("../middleware/validateSchema");
const todoSchema_1 = require("../schemas/todoSchema");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticate, (0, validateSchema_1.validateSchema)(todoSchema_1.todoSchema), todoController_1.createTodo);
router.get('/', authMiddleware_1.authenticate, todoController_1.getTodos);
router.get('/:id', authMiddleware_1.authenticate, todoController_1.getTodoById);
router.put('/:id', authMiddleware_1.authenticate, (0, validateSchema_1.validateSchema)(todoSchema_1.updateTodoSchema), todoController_1.updateTodo);
router.delete('/:id', authMiddleware_1.authenticate, todoController_1.deleteTodo);
exports.default = router;
