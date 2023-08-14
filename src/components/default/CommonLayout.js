// CommonLayout.js
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import styled from "styled-components";

const PageContainer = styled.div`
  margin-top: 80px;
  min-height: calc(100vh - 200px);
`;

const CommonLayout = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <div style={{ flex: 1 }}>
      <NavBar />
      <PageContainer>{children}</PageContainer>
    </div>
    <Footer />
  </div>
);

export default CommonLayout;
