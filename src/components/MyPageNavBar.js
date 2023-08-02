import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SubNavigation = styled.ul`
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 10px 0;
  max-width: 100vw;
  overflow-x: auto;
  list-style-type: none;
`;

const SubNavigationItem = styled(NavLink)`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  margin-right: 10px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s;
  list-style-type: none;
  text-decoration: none;
  color: #333;

  &.active {
    border-color: #007bff;
  }
`;

const MyPageNavBar = () => {
  return (
    <SubNavigation>
      <li>
        <SubNavigationItem to="/mypage/application" activeClassName="active">
          수혜 신청 목록
        </SubNavigationItem>
      </li>
      <li>
        <SubNavigationItem to="/mypage/donation" activeClassName="active">
          기부 목록
        </SubNavigationItem>
      </li>
      <li>
        <SubNavigationItem to="/mypage/device" activeClassName="active">
          등록된 기기
        </SubNavigationItem>
      </li>
      <li>
        <SubNavigationItem to="/mypage/profile" activeClassName="active">
          내 정보
        </SubNavigationItem>
      </li>
    </SubNavigation>
  );
};

export default MyPageNavBar;
