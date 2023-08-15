// NavBar.js
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import { setLogOut, isLogin } from "../../constants/auth";

const NavBar = () => {
  const targetRef = useRef(null);
  const handleScroll = () => {
    console.log("scrolling");
    if (window.scrollY > 50) {
      targetRef.current.style.borderBottom = "0.5px solid #ececec";
    } else {
      targetRef.current.style.borderBottom = "";
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    // 로그아웃 처리 로직
    // <api 호출 부분>
    // 성공 시 -> localStorage 토큰과 category 삭제,
    setLogOut();
    document.location.href = "/"; // navigate로 이동이 안돼서 일단 이걸로 구현함
  };

  return (
    <StyledNav ref={targetRef}>
      <img id="logo" src={process.env.PUBLIC_URL + "/imgs/logo3.jpg"} />
      <ul>
        <li>
          <Button to="/">Home</Button>
        </li>
        <li>
          <Button to="/postlist">PostList</Button>
        </li>
        {/* login 여부에 따른 조건부 렌더링 */}
        {isLogin() ? (
          <>
            <li>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </li>
            <li>
              <Button to="/mypage">MyPage</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button to="/login">Login</Button>
            </li>
            <li>
              <Button to="/signup">Sign Up</Button>
            </li>
          </>
        )}
      </ul>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: fixed; /* Set the navigation bar to a fixed position */
  top: 0; /* Stick the navigation bar to the top */
  left: 0;
  z-index: 1; /* Ensure the navigation bar is above other content */
  height: 80px; /* Increase the height of the navigation bar */

  img#logo {
    width: 100px;
    position: absolute;
    left: 30px;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  li {
    margin-right: 20px;
  }

  li:last-child {
    margin-right: 0;
  }
`;

//#468499

const Button = styled(NavLink)`
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #333;
  border-radius: 5px;
  color: #333;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
    color: white;
  }
  &.active {
    background-color: #333;
    color: white;
  }
`;

const LogoutButton = styled(NavLink)`
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #333;
  border-radius: 5px;
  color: #333 !important;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
    color: white !important;
  }
`;

export default NavBar;
