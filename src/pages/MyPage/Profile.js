import { useState, useEffect } from "react";
import { getUserInfo } from "../../services/MyPageAPI";
import styled from "styled-components";

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

  const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 30px 0px;
    border: 1px solid #d4d4d4;
  `;

  const ProfileImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  `;

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
    </div>
  );
};

export default Profile;
