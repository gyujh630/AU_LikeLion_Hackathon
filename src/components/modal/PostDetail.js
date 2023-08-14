import { useLocation } from "react-router-dom";
import styled from "styled-components";

const PostDetail = () => {
  const location = useLocation();
  const postData = location.state; //받아온 apply data

  if (!postData) {
    return <div>해당 항목을 찾을 수 없습니다.</div>;
  }

  return (
    <CustomPostDetail>
      <h2>{postData.userName}님의 수혜 신청 상세 페이지</h2>
      <p>신청 기기 유형: {postData.devicetype}</p>
      <p>등록날짜: {postData.date}</p>
    </CustomPostDetail>
  );
};

const CustomPostDetail = styled.div`
  width: 100%;
  text-align: center;
`;
export default PostDetail;
