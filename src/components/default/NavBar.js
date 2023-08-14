// NavBar.js
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // 로그아웃 처리 로직
    // api 호출
    // 성공 시 -> localStorage 토큰 삭제, 로그인 상태 업데이트
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <StyledNav>
      <ul>
        <li>
          <Button to="/">Home</Button>
        </li>
        <li>
          <Button to="/postlist">PostList</Button>
        </li>
        {/* login 여부에 따른 조건부 렌더링 */}
        {localStorage.getItem("token") ? (
          <>
            <li>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </li>
            <li>
              <Button to="/mypage">MyPage</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button to="/login">Login</Button>
            </li>
            <li>
              <Button to="/signup">Sign Up</Button>
            </li>
          </>
        )}
      </ul>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  position: fixed; /* Set the navigation bar to a fixed position */
  top: 0; /* Stick the navigation bar to the top */
  left: 0;
  z-index: 1; /* Ensure the navigation bar is above other content */
  height: 80px; /* Increase the height of the navigation bar */

  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  li {
    margin-right: 20px;
  }

  li:last-child {
    margin-right: 0;
  }
`;

const Button = styled(NavLink)`
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #333;
  border-radius: 5px;
  color: #333;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
    color: white;
  }
  &.active {
    background-color: #333;
    color: white;
  }
`;

const LogoutButton = styled(NavLink)`
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #333;
  border-radius: 5px;
  color: #333 !important;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
    color: white !important;
  }
`;

export default NavBar;
