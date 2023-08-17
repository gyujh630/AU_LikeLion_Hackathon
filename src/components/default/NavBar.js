// NavBar.js
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { setLogOut, isLogin } from "../../constants/auth";

const MySwal = withReactContent(Swal);

const NavBar = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const handleScroll = () => {
    if (window.scrollY > 50) {
      targetRef.current.style.borderBottom = "0.5px solid #dfdfdf";
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
    handleWithdrawal();
  };

  return (
    <StyledNav ref={targetRef}>
      <img
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
        id="logo"
        src={process.env.PUBLIC_URL + "/imgs/logo2.png"}
      />
      <div id="nav-container">
        <ul id="ul-left">
          <li>
            <Button to="/">Home</Button>
          </li>
          <li>
            <Button to="/about">About</Button>
          </li>
          <li>
            <Button to="/postlist">PostList</Button>
          </li>
          {/* login 여부에 따른 조건부 렌더링 */}
        </ul>
        <ul id="ul-right">
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
      </div>
    </StyledNav>
  );
};

const handleWithdrawal = () => {
  MySwal.fire({
    title: "로그아웃 하시겠습니까?",
    // text: "탈퇴 시 모든 정보가 삭제됩니다.",
    icon: "warning",
    confirmButtonColor: "var(--color-blue)",
    cancelButtonColor: "gray",
    iconColor: "var(--color-blue)",
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    focusCancel: true,
    customClass: {
      confirmButton: "swal-confirm-button",
      cancelButton: "swal-cancel-button",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = { status: 204 };
        if (response.status === 204 || response.status === 200) {
          setLogOut();
          MySwal.fire({
            title: "로그아웃 완료",
            text: "로그아웃이 완료되었습니다.",
            icon: "success",
            confirmButtonColor: "var(--color-blue)",
            cancelButtonColor: "gray",
            iconColor: "var(--color-blue)",
          }).then(() => {
            // 여기서 페이지를 새로고침 (리렌더링)
            window.location.onload("/");
          });
        } else {
          MySwal.fire({
            title: "실패",
            text: "로그아웃을 실패하였습니다.",
            icon: "error",
            confirmButtonColor: "var(--color-blue)",
            cancelButtonColor: "gray",
            iconColor: "var(--color-blue)",
          });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        MySwal.fire({
          title: "에러",
          text: "로그아웃 중 에러가 발생하였습니다.",
          icon: "error",
          confirmButtonColor: "var(--color-blue)",
          cancelButtonColor: "gray",
          iconColor: "var(--color-blue)",
        });
      }
    }
  });
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
    flex: 2;
    width: 50px;
    position: absolute;
    left: 30px;
  }

  div#nav-container {
    width: 100%;
    display: flex;
    // justify-content: space-between;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    align-items: center;
    justify-content: center;
    margin: auto;
  }

  ul#ul-left {
    flex: 1;
    margin-left: 100px;
  }

  ul#ul-right {
    flex: 3;
    justify-content: right;
    margin-right: 20px;
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
  padding: 4px 12px;
  // border: 2px solid #333;
  border-radius: 5px;
  color: #333;
  font-weight: semi-bold;
  // transition: background-color 0.3s;

  &:hover {
    background-color: #616161;
    color: #333;
  }
  &.active {
    // background-color: #333;
    color: #333;
    font-weight: bold;
  }
`;

const LogoutButton = styled(NavLink)`
  text-decoration: none;
  padding: 4px 12px;
  // border: 2px solid #333;
  border-radius: 5px;
  color: #333;
  font-weight: semi-bold;
  // transition: background-color 0.3s;

  &:hover {
    background-color: #616161;
    color: #333;
  }
  &.active {
    // background-color: #333;
    color: #333;
    // font-weight: bold;
  }
`;

export default NavBar;
