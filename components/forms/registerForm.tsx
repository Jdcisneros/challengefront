"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import axios, { AxiosError } from "axios";
import { StyledForm, TitleTodo } from "../styles/StyledTodo";
import AllAlerts from "../allAlerts";
import { Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";



interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const urlBack = "https://challengeback-production-5b58.up.railway.app/"
  const showAlert = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setAlert({ open: true, message, severity });
    console.log("showAlert called with:", message, severity);
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(`${urlBack}api/register`, data);
      const { token, user } = response.data;
      dispatch(setCredentials({ token, user }));
      showAlert("Register successfully", "success");
      reset(); // Resetea los campos del formulario
      onRegisterSuccess();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 400) {
          showAlert(
            "The user already exists. Please choose another one.",
            "error"
          );
        } else {
          showAlert("There was a problem. Try again.", "error");
        }
      } else {
        showAlert("Connection error. Please try again.", "error");
      }
    }
  };

  return (
    <div>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <TitleTodo>Registro</TitleTodo>
          <TextField
            label="User Name"
            variant="outlined"
            type="text"
            {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" type="submit">
          Sign up
          </Button>
        </StyledForm>
        <AllAlerts
          message={alert.message}
          severity={alert.severity}
          open={alert.open}
          onClose={closeAlert}
        />
    </div>
  );
}
