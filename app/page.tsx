"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TodoList from "@/components/todos/todoList";
import LoginForm from "@/components/forms/loginForm";
import { LoginContainer} from "@/components/styles/StyledTodo";
import Navbar from "@/components/navbar";

export default function Home() {
  const { token } = useSelector((state: RootState) => state.auth);


  return (
    <div>
      {!token ? (
        <LoginContainer>
              <LoginForm />
        </LoginContainer>
      ) : (
        <>
          <Navbar />
          <TodoList />
        </>
      )}
    </div>
  );
}
