
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../redux/store";
import {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setLoading,
  setError,
} from "../redux/todoSlice";
import { useCallback, useEffect, useState } from "react";




export const useTodos = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.todo
  );
   const [alert, setAlert] = useState({
      open: false,
      message: "",
      severity: "success" as "success" | "error" | "info" | "warning",
    });

    const showAlert = (message: string, severity: "success" | "error" | "info" | "warning") => {
      setAlert({ open: true, message, severity });
    };
  
    // Función para cerrar alerta
    const closeAlert = () => {
      setAlert((prev) => ({ ...prev, open: false }));
    };

    const urlBack = "https://challengeback-production-5b58.up.railway.app/"

  // Obtener tareas
  const fetchTodos = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get("urlBack", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error("Error fetching todos:", error);
      dispatch(setError("Error al obtener las tareas.")); 
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, token]);

  // Crear tarea
  const addTodo = async (title: string) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        urlBack,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(addTask(response.data));
      showAlert("Task created successfully", "success");
    } catch {
      dispatch(setError("Error creating task"));
      showAlert("Error creating task", "success");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Eliminar tarea
  const removeTodo = async (id: number) => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`${urlBack}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteTask(id));
      showAlert("Task deleted successfully", "success")
    } catch {
      dispatch(setError("Error al eliminar la tarea."));
      showAlert("Error deleted task", "error")
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateTodo = async (
    id: number,
    updatedTitle: string,
    updatedCompleted: boolean
  ) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(
        `${urlBack}${id}`,
        { title: updatedTitle, completed: updatedCompleted },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(updateTask(response.data));
      showAlert("Task edited successfully", "success")
    } catch {
      dispatch(setError("Error al actualizar la tarea."));
      showAlert("Error edited Task", "error")
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token, fetchTodos]);

  return {
    tasks,
    loading,
    error,
    fetchTodos,
    addTodo,
    removeTodo,
    updateTodo,
    closeAlert,
    alert
  };
};
