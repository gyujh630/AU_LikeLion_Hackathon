import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Home, Login, MyPage, PostList } from './pages';
import Home from "./pages/Home";
import PostList from "./pages/PostList";
import Login from "./pages/Login";

import MyPage from "./pages/mypage/MyPage";
// import Application from "./pages/mypage/Application";
// import Device from "./pages/mypage/Device";
// import Donation from "./pages/mypage/Donation";
// import Profile from "./pages/mypage/Profile";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; // Import the Footer component

const Routing = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/postlist" element={<PostList />} />
        <Route path="/mypage/" element={<MyPage />} />
        {/* <Route path="/mypage/application" element={<Application />} />
        <Route path="/mypage/donation" element={<Donation />} />
        <Route path="/mypage/device" element={<Device />} />
        <Route path="/mypage/profile" element={<Profile />} /> */}
      </Routes>
      <Footer /> {/* Add the Footer component */}
    </>
  );
};

export default Routing;
