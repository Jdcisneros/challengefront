import { Response } from "express";
import Todo from "../models/Todo";
import { AuthRequest } from "../middleware/authMiddleware";

export const createTodo = async (req: AuthRequest, res: Response)  => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user" });
      return;
    }
    const { title, description } = req.body;
    const todo = await Todo.create({
      title,
      description,
      completed: false,
      userId,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user"});
      return;
    }

    const todos = await Todo.findAll({ where: { userId } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
};

export const getTodoById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user" });
      return;
    }

    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) {
      res.status(404).json({ message: "Task not found"});
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error getting task", error });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user" });
      return;
    }

    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await todo.update({ title, description, completed });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user" });
      return;
    }

    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await todo.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
