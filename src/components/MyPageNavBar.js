import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { getUserCategory } from "../constants/auth";

const SubNavigation = styled.ul`
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 10px 0;
  margin-top: 0;
  max-width: 100vw;
  overflow-x: auto;
  list-style-type: none;
`;

const activeStyle = {
  display: "block",
  color: "black",
  fontWeight: "bold",
  textDecoration: "none",
  padding: "8px 16px",
  margin: "0px 5px",
};

const deactiveStyle = {
  display: "block",
  color: "black",
  textDecoration: "none",
  padding: "8px 16px",
  margin: "0px 5px",
};

const MyPageNavBar = () => {
  return (
    <SubNavigation>
      <li>
        <NavLink
          to="/mypage/profile"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          내 정보
        </NavLink>
      </li>
      <li style={{ display: getUserCategory() === "1" ? "block" : "none" }}>
        <NavLink
          to="/mypage/application"
          activeClassName="active"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          수혜 신청 목록
        </NavLink>
      </li>
      <li style={{ display: getUserCategory() === "0" ? "block" : "none" }}>
        <NavLink
          to="/mypage/donation"
          activeClassName="active"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          기부 목록
        </NavLink>
      </li>
      <li style={{ display: getUserCategory() === "0" ? "block" : "none" }}>
        <NavLink
          to="/mypage/device"
          activeClassName="active"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          등록된 기기
        </NavLink>
      </li>
    </SubNavigation>
  );
};

export default MyPageNavBar;
