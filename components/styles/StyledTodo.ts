import styled from "styled-components";

export const ContainerTodo = styled.div`
display: grid;
justify-content: center;
color: white;
`;

export const TitleTodo = styled.h2`
  color: black;
  opacity: 0.8;
  font-size: x-large;
  text-align: center;
`;

export const StyledForm = styled.form`
  min-width:500px;
  display: grid;
  gap: 10px;
  align-items: center;
  color:rgb(0, 0, 0);
`
export const StyledTask = styled.div`
min-width:500px;
align-items: center;
color:rgb(0, 0, 0);
`



export const LoginContainer = styled.div`
display: grid;
justify-content: center;
margin-top: 20px;
`

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: black;
`;

export const UserName = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;