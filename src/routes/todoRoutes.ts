import express from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from '../controllers/todoController';
import { authenticate } from '../../src/middleware/authMiddleware';
import { validateSchema } from '../../src/middleware/validateSchema';
import { todoSchema, updateTodoSchema } from '../../src/schemas/todoSchema';


const router = express.Router();

router.post('/', authenticate, validateSchema(todoSchema), createTodo); 
router.get('/', authenticate, getTodos);
router.get('/:id', authenticate, getTodoById); 
router.put('/:id', authenticate,  validateSchema(updateTodoSchema), updateTodo); 
router.delete('/:id', authenticate, deleteTodo);

export default router;