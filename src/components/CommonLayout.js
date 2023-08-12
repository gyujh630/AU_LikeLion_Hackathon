// CommonLayout.js
import React from "react";
import NavBar from ".//NavBar";
import Footer from "./Footer";
import styled from "styled-components";

const PageContainer = styled.div`
  margin: 100px 0;
`;

const CommonLayout = ({ children }) => (
  <>
    <NavBar />
    <PageContainer>{children}</PageContainer>
    <Footer />
  </>
);

export default CommonLayout;
