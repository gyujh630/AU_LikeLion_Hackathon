import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostList from "./pages/PostList";
import Login from "./pages/Login";

import MyPage from "./pages/mypage/MyPage";
import Application from "./pages/mypage/Application";
import Device from "./pages/mypage/Device";
import Donation from "./pages/mypage/Donation";
import Profile from "./pages/mypage/Profile";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; // Import the Footer component

const Routing = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />}>
          <Route path="application" element={<Application />} />
          <Route path="donation" element={<Donation />} />
          <Route path="device" element={<Device />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/postlist" element={<PostList />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Routing;
