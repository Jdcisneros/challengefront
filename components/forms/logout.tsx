"use client";

import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import { logout } from "@/redux/authSlice";
import { Button } from "@mui/material";


const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/"); 
  };

  return <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
