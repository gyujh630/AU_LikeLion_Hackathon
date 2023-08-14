//Routing.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import CommonLayout from "./components/CommonLayout";

import Home from "./pages/Home";
import PostList from "./pages/PostList";
import PostDetail from "./components/modal/PostDetail";
import Login from "./pages/Login";

import MyPage from "./pages/MyPage";
import Application from "./components/Application";
import Device from "./components/Device";
import Donation from "./components/Donation";
import Profile from "./components/Profile";
import DeviceDetails from "./components/DeviceDetails";

import SignUp from "./pages/SignUp/SignUp";
import SignUpReceiver from "./pages/SignUp/SignUpReceiver";
import SignUpDonator from "./pages/SignUp/SignUpDonator";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; // Import the Footer component
import styled from "styled-components";

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CommonLayout>
            <Home />
          </CommonLayout>
        }
      />
      <Route
        path="/login"
        element={
          <CommonLayout>
            <Login />
          </CommonLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <CommonLayout>
            <SignUp />
          </CommonLayout>
        }
      />
      <Route
        path="/signup/receiver"
        element={
          <CommonLayout>
            <SignUpReceiver />
          </CommonLayout>
        }
      />
      <Route
        path="/signup/donator"
        element={
          <CommonLayout>
            <SignUpDonator />
          </CommonLayout>
        }
      />
      <Route
        path="/mypage"
        element={
          <CommonLayout>
            <MyPage />
          </CommonLayout>
        }
      >
        <Route index element={<Navigate to="Profile" />} />
        <Route path="profile" element={<Profile />} />
        <Route path="application" element={<Application />} />
        <Route path="donation" element={<Donation />} />
        <Route path="device" element={<Device />} />
      </Route>
      <Route
        path="/postlist"
        element={
          <CommonLayout>
            <PostList />
          </CommonLayout>
        }
      />
      <Route
        path="/postlist/:index"
        element={
          <CommonLayout>
            <PostDetail />
          </CommonLayout>
        }
      />
      <Route
        path="/device/:device_id"
        element={
          <CommonLayout>
            <DeviceDetails />
          </CommonLayout>
        }
      />
    </Routes>

    // <>
    //   <NavBar />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<SignUp />} />
    //     <Route path="/mypage" element={<MyPage />}>
    //       <Route index element={<Navigate to="application" />} />
    //       <Route path="application" element={<Application />} />
    //       <Route path="donation" element={<Donation />} />
    //       <Route path="device" element={<Device />} />
    //       <Route path="profile" element={<Profile />} />
    //     </Route>
    //     <Route path="/postlist" element={<PostList />} />
    //     <Route path="/device/:device_id" element={<DeviceDetails />} />{" "}
    //     {/* 새로운 페이지 라우트 등록 */}
    //   </Routes>
    //   {/* <Footer /> */}
    // </>
  );
};

export default Routing;
