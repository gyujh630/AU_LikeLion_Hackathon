import React from "react";
import styled from "styled-components";
import { NavLink, Route, Routes, Outlet } from "react-router-dom";
import MyPageNavBar from "../components/MyPageNavBar";
import CommonLayout from "../components/CommonLayout";

const StyledMyPage = styled.div`
  text-align: center;
`;

const MyPage = () => {
  return (
    <StyledMyPage>
      <MyPageNavBar></MyPageNavBar>
      <Outlet />
    </StyledMyPage>
  );
};

export default MyPage;
