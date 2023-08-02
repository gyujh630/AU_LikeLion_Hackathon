import React from "react";
import styled from "styled-components";
import { NavLink, Route, Routes, Outlet } from "react-router-dom";
import MyPageNavBar from "../components/MyPageNavBar";
import Application from "../components/Application";
const StyledMyPage = styled.div`
  text-align: center;
`;

const MyPage = () => {
  return (
    <StyledMyPage>
      <header>
        <h1>My Page</h1>
      </header>
      <main>
        <MyPageNavBar></MyPageNavBar>
        <Outlet />
      </main>
    </StyledMyPage>
  );
};

export default MyPage;
