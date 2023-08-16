//Routing.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import CommonLayout from "./components/default/CommonLayout";

import Home from "./pages/Home";
import PostList from "./pages/PostList";
import PostDetails from "./components/PostDetails";
import Login from "./pages/Login";

import MyPage from "./pages/MyPage/MyPage";
import Application from "./pages/MyPage/Application";
import Device from "./pages/MyPage/Device";
import Donation from "./pages/MyPage/Donation";
import Profile from "./pages/MyPage/Profile";
import DeviceDetails from "./components/DeviceDetails";

import SignUp from "./pages/SignUp/SignUp";
import SignUpReceiver from "./pages/SignUp/SignUpReceiver";
import SignUpDonator from "./pages/SignUp/SignUpDonator";

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
        <Route
          path="/mypage/application/:apply_id"
          element={
            <CommonLayout>
              <PostDetails />
            </CommonLayout>
          }
        />
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
        path="/postlist/:apply_id"
        element={
          <CommonLayout>
            <PostDetails />
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
