'use client';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import LogoutButton from "./forms/logout";
import { NavbarContainer, TitleTodo, User, UserName } from "./styles/StyledTodo";


const Navbar = () => {

  const { user } = useSelector((state: RootState) => state.auth);


  return (
    <NavbarContainer>
       <TitleTodo>ToDo List</TitleTodo>
       {user ? (
        <User>
        <UserName>{user?.username}</UserName>
        <LogoutButton/>
      </User>
       ) : (
       <></>
       )}
      
    </NavbarContainer>
  );
};

export default Navbar;