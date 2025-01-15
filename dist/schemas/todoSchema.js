"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoSchema = exports.todoSchema = void 0;
const zod_1 = require("zod");
exports.todoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required."),
    description: zod_1.z.string().optional(),
    completed: zod_1.z.boolean().optional(),
});
exports.updateTodoSchema = exports.todoSchema.partial();
