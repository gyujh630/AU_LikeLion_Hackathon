import { useState, useEffect } from "react";
import { getUserInfo } from "../../services/MyPageAPI";
import styled from "styled-components";
import { updateUserInfo } from "../../services/MyPageAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteUser } from "../../services/MyPageAPI";
import "../../styles/global.css";
import { setLogOut } from "../../constants/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const MySwal = withReactContent(Swal);

// TODO : api 연결 후 수정 필요

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, []);

  const getCategoryText = (category) => {
    return category === 0 ? "기부자" : "수혜자"; // 숫자로 비교
  };
  const handleWithdrawal = async () => {
    MySwal.fire({
      title: "신청을 취소하시겠습니까?",
      text: "취소 시 복구할 수 없습니다..",
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
          const responseStatus = await deleteUser();
          if (responseStatus === 204 || responseStatus === 200) {
            MySwal.fire({
              title: "탈퇴 완료",
              text: "회원 탈퇴가 완료되었습니다.",
              icon: "success",
              confirmButtonColor: "var(--color-blue)",
              cancelButtonColor: "gray",
              iconColor: "var(--color-blue)",
            }).then(() => {
              setLogOut(); // 로그아웃 처리
              window.location.href = "/"; // 홈으로 이동
            });
          } else {
            MySwal.fire({
              title: "실패",
              text: "취소를 실패하였습니다.",
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
            text: "취소 중 에러가 발생하였습니다.",
            icon: "error",
            confirmButtonColor: "var(--color-blue)",
            cancelButtonColor: "gray",
            iconColor: "var(--color-blue)",
          });
        }
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <h2>내 정보</h2> */}
      {userInfo && userInfo.profile !== null ? (
        <ProfileImage
          src={`http://3.34.86.186:8080/${userInfo.profile}`}
          alt="프로필이미지"
        />
      ) : (
        <FontAwesomeIcon icon={faUser} style={{ fontSize: "24px" }} />
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {userInfo && ( // userInfo가 있을 때만 렌더링
            <h2 style={{ margin: 0, marginBottom: "20px" }}>{userInfo.name}</h2>
          )}{" "}
        </div>
        <div
          style={{
            width: "100px",
            margin: "4px 4px 4px 0",
            fontSize: "12px",
            padding: "3px",
            border: "2px solid #336ba3",
            fontWeight: "800",
            color: "#336ba3",
            borderRadius: "50px",
          }}
        >
          {userInfo && userInfo.id}
        </div>
        {userInfo &&
          userInfo.profile !== null && ( // userInfo가 있고 "profile"이 null이 아닌 경우에만 렌더링
            <div
              style={{
                width: "100px",
                margin: "4px 4px 4px 0",
                fontSize: "12px",
                padding: "3px",
                border: "2px solid #336ba3",
                fontWeight: "800",
                color: "#336ba3",
                borderRadius: "50px",
              }}
            >
              {userInfo.category !== null && getCategoryText(userInfo.category)}
            </div>
          )}
      </div>
      {/* api 연결 응답 부분 */}
      {/* {userInfo && (
        <div>
          <ProfileImage src={userInfo.profile} alt="프로필이미지" />
          <p>이름: {userInfo.name}</p>
          <p>ID: {userInfo.id}</p>
          <p>카테고리: {getCategoryText(userInfo.category)}</p>
        </div>
      )} */}
      <WithdrawButton onClick={handleWithdrawal}>회원 탈퇴</WithdrawButton>
    </div>
  );
};

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 30px 0px;
  border: 1px solid #d4d4d4;
`;

const WithdrawButton = styled.button`
  background-color: grey;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 15 px;
  border: none;
  padding: 10px 20px;
  margin-top: 100px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #333;
  }
`;

export default Profile;
