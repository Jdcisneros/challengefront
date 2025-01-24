import { useState, useEffect } from "react";
import { useTodos } from "../../hooks/useTodos";
import { ContainerTodo, StyledForm, StyledTask, TitleTodo } from "../styles/StyledTodo";
import AllAlerts from "../allAlerts";
import {
  Button,
  Checkbox,
  Divider,
  FormGroup,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskManagement() {
  const {
    tasks,
    loading,
    error,
    fetchTodos,
    addTodo,
    removeTodo,
    updateTodo,
    alert,
    closeAlert,
  } = useTodos();
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedCompleted, setUpdatedCompleted] = useState(false);

  interface Task {
    id: number;
    title: string;
    completed: boolean;
  }

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTodo(newTask);
      setNewTask("");
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setUpdatedTitle(task.title);
    setUpdatedCompleted(task.completed);
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskId !== null) {
      updateTodo(editingTaskId, updatedTitle, updatedCompleted);
      setEditingTaskId(null);
      setUpdatedTitle("");
      setUpdatedCompleted(false);
    }
  };

  return (
    <ContainerTodo>
      <TitleTodo>Task</TitleTodo>
      {loading && (
  <LinearProgress
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1301,
    }}
  />
)}
    
      {error && <p>{error}</p>}

      <StyledForm onSubmit={handleAddTask}>
        <TextField
          label="New task"
          variant="outlined"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Add task
        </Button>
      </StyledForm>
      <AllAlerts
        message={alert.message}
        severity={alert.severity}
        open={alert.open}
        onClose={closeAlert}
      />

      {editingTaskId && (
        <StyledForm onSubmit={handleUpdateTask} style={{marginTop:10}}>
          <TextField
            variant="outlined"
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <FormGroup>
          <label>
            Completed
            <Checkbox
              checked={updatedCompleted}
              onChange={(e) => setUpdatedCompleted(e.target.checked)}
            />
          </label>
          </FormGroup>
         
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </StyledForm>
      )}

      <List sx={{ width: "100%", maxWidth: 360 }} >
        {tasks.map((task) => (
          <StyledTask key={task.id}>
            <ListItem >
              <Checkbox
                edge="start"
                checked={task.completed}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${task.id}`,
                }}
                onChange={() =>
                  updateTodo(task.id, task.title, !task.completed)
                }
              />
              <ListItemText
              primary={
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
              }
                secondary={task.completed ? "Completed" : "Pending task"}
                
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => handleEditTask(task)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => removeTodo(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </StyledTask>
        ))}
      </List>
    </ContainerTodo>
  );
}
