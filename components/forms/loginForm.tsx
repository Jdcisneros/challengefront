"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import axios from "axios";
import { StyledForm, TitleTodo } from "../styles/StyledTodo";
import RegisterForm from "./registerForm";
import { Button, ButtonGroup, TextField } from "@mui/material";
import AllAlerts from "../allAlerts";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  email:string;
  password:string;
}

export default function LoginForm() {
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>();
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const urlBack = "https://challengeback-production-5b58.up.railway.app/"

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
  };
  const handleHideRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(`${urlBack}api/login`, data);
      const { token, user } = response.data;
      dispatch(setCredentials({ token, user }));
      setAlertSeverity("success");
      setAlertMessage("Login successful. Welcome!");
      setAlertOpen(true);
      reset()
    } catch {
      setAlertSeverity("error");
      setAlertMessage("Your account or password is incorrect.");
      setAlertOpen(true);
    }
  };

  const handleRegisterSuccess = () => {
    setShowRegisterForm(false);
    setAlertSeverity("success");
    setAlertMessage("Successful registration. Now you can log in.");
    setAlertOpen(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      {!showRegisterForm ? (
        <>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <TitleTodo>ToDo List</TitleTodo>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              {...register("email",{ required: "Email is required"})}
              error={!!errors.password}
              helperText={errors.password?.message}
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
            <ButtonGroup>
              <Button variant="contained" type="submit">
                Login
              </Button>
              <Button variant="outlined" onClick={handleShowRegisterForm}>
                {"Don't have an account? Sign up"}
              </Button>
            </ButtonGroup>
          </StyledForm>
        </>
      ) : (
        <>
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          <Button
            variant="outlined"
            style={{ marginTop: 5 }}
            onClick={handleHideRegisterForm}
          >
            Back to Login
          </Button>
        </>
      )}

      <AllAlerts
        open={alertOpen}
        severity={alertSeverity}
        message={alertMessage}
        onClose={closeAlert}
      />
    </div>
  );
}
