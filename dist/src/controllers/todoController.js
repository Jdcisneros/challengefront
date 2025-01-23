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
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthenticated user" });
            return;
        }
        const { title, description } = req.body;
        const todo = yield Todo_1.default.create({
            title,
            description,
            completed: false,
            userId,
        });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthenticated user" });
            return;
        }
        const todos = yield Todo_1.default.findAll({ where: { userId } });
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ message: "Error getting tasks", error });
    }
});
exports.getTodos = getTodos;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthenticated user" });
            return;
        }
        const todo = yield Todo_1.default.findOne({ where: { id, userId } });
        if (!todo) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: "Error getting task", error });
    }
});
exports.getTodoById = getTodoById;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthenticated user" });
            return;
        }
        const todo = yield Todo_1.default.findOne({ where: { id, userId } });
        if (!todo) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        yield todo.update({ title, description, completed });
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthenticated user" });
            return;
        }
        const todo = yield Todo_1.default.findOne({ where: { id, userId } });
        if (!todo) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        yield todo.destroy();
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});
exports.deleteTodo = deleteTodo;
