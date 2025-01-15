"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = require("../middleware/authMiddleware"); // Middleware para autenticación
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticate, todoController_1.createTodo); // Crear tarea
router.get('/', authMiddleware_1.authenticate, todoController_1.getTodos); // Obtener todas las tareas
router.get('/:id', authMiddleware_1.authenticate, todoController_1.getTodoById); // Obtener una tarea por ID
router.put('/:id', authMiddleware_1.authenticate, todoController_1.updateTodo); // Actualizar tarea
router.delete('/:id', authMiddleware_1.authenticate, todoController_1.deleteTodo); // Eliminar tarea
exports.default = router;
