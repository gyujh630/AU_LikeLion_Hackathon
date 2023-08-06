import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import PostList from "./pages/PostList";
import Login from "./pages/Login";

import MyPage from "./pages/MyPage";
import Application from "./components/Application";
import Device from "./components/Device";
import Donation from "./components/Donation";
import Profile from "./components/Profile";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; // Import the Footer component
import styled from "styled-components";

const Routing = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route index element={<Navigate to="application" />} />
          <Route path="application" element={<Application />} />
          <Route path="donation" element={<Donation />} />
          <Route path="device" element={<Device />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/postlist" element={<PostList />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default Routing;
