import { useState, useEffect } from "react";
import { getUserInfo } from "../../services/MyPageAPI";
import styled from "styled-components";
import { updateUserInfo } from "../../services/MyPageAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteUser } from "../../services/MyPageAPI";

const MySwal = withReactContent(Swal);

// TODO : api 연결 후 수정 필요
const tempUserInfo = {
  name: "홍길동",
  id: "likelion123",
  profile: "image",
  category: 0,
};

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

  const handleWithdrawal = () => {
    MySwal.fire({
      title: "정말로 탈퇴하시겠습니까?",
      text: "탈퇴 시 모든 정보가 삭제됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네, 탈퇴하겠습니다.",
      cancelButtonText: "취소",
      reverseButtons: true,
      focusCancel: true,
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteUser();
          if (response.status === 204 || response.status === 200) {
            MySwal.fire("탈퇴 완료", "회원 탈퇴가 완료되었습니다.", "success");
          } else {
            MySwal.fire("실패", "회원 탈퇴를 실패하였습니다.", "error");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          MySwal.fire("에러", "회원 탈퇴 중 에러가 발생하였습니다.", "error");
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
      <h2>내 정보</h2>
      <ProfileImage src={tempUserInfo.profile} alt="프로필이미지" />
      <p>이름: {tempUserInfo.name}</p>
      <p>ID: {tempUserInfo.id}</p>
      <p>카테고리: {getCategoryText(tempUserInfo.category)}</p>

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
  background-color: white;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  padding: 10px 20px;
  margin-top: 40px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

export default Profile;
