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
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
// Crear una nueva tarea
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Suponiendo que `req.user` se llena después de la autenticación
        const todo = yield Todo_1.default.create({
            title,
            description,
            completed: false,
            userId,
        });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error });
    }
});
exports.createTodo = createTodo;
// Obtener todas las tareas del usuario autenticado
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const todos = yield Todo_1.default.findAll({ where: { userId } });
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas", error });
    }
});
exports.getTodos = getTodos;
// Obtener una tarea específica por ID
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const todo = yield Todo_1.default.findOne({ where: { id, userId } });
        if (!todo) {
            res.status(404).json({ message: "Tarea no encontrada" });
            return;
        }
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea", error });
    }
});
exports.getTodoById = getTodoById;
// Actualizar una tarea por ID
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const userId = req.user.id;
        const todo = yield Todo_1.default.findOne({ where: { id, userId } });
        if (!todo) {
            res.status(404).json({ message: "Tarea no encontrada" });
            return;
        }
        yield todo.update({ title, description, completed });
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea", error });
    }
});
exports.updateTodo = updateTodo;
// Eliminar una tarea por ID
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const todo = yield Todo_1.default.findOne({ where: { id, userId } });
        if (!todo) {
            res.status(404).json({ message: "Tarea no encontrada" });
            return;
        }
        yield todo.destroy();
        res.status(200).json({ message: "Tarea eliminada correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea", error });
    }
});
exports.deleteTodo = deleteTodo;
