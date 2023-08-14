import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const PostDetail = () => {
  const location = useLocation();
  const postData = location.state; //받아온 apply data
  const { date, status, userName, devicetype, content } = postData;
  const statusString = ["매칭 대기중", "매칭 완료", "배송중", "수령 완료"];

  if (!postData) {
    return <div>해당 항목을 찾을 수 없습니다.</div>;
  }

  return (
    <CustomPostDetail>
      <div
        style={{
          margin: "auto",
          alignItems: "left",
          textAlign: "left",
        }}
      >
        <Link to="/postlist" style={{ color: "inherit" }}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            fontSize={"25px"}
            style={{ padding: "20px", marginTop: "30px", marginBottom: "30px" }}
          />
        </Link>
        <h2 style={{ padding: "30px 30px 30px 0" }}>상세정보</h2>
      </div>
      <div id="apply-box">
        <div id="apply-top">
          <h3 id="apply-user-inform">수혜자 정보</h3>
          <div id="apply-date">
            <p>등록날짜: {date}</p>
          </div>
          <div id="status-btn-container">
            <StyledStatus status={status}>
              <p style={{ margin: "auto" }}>{statusString[status]}</p>
            </StyledStatus>
          </div>
        </div>
        <div id="apply-middle">
          <div id="apply-profile-image"></div>
          {/* 추후 img로 변경*/}
          <div id="apply-profile">
            <p id="user-apply-name">{userName}</p>
            <p id="device-type">신청 기기 유형: {devicetype}</p>
          </div>
        </div>
        <h3 id="apply-content-title">신청 사유</h3>
        <div id="apply-bottom">
          <div id="apply-content">
            <p id="content">{content}</p>
          </div>
        </div>
      </div>
      <CustomBtn>내 기기 기부하기</CustomBtn>
    </CustomPostDetail>
  );
};

const CustomBtn = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: #007bff;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 30px 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledStatus = styled.div`
  width: 100px;
  margin: 20px;
  height: 30px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: #4caf50;
  font-weight: bold;
  font-size: 13px;
`;

const CustomPostDetail = styled.div`
  margin-top: 80px;
  width: 100%;
  text-align: center;

  div {
    display: flex;
    max-width: 700px;
    text-align: center;
  }

  div#status-btn-container {
    flex-direction: column;
  }

  div#apply-box {
    border: none;
    border-radius: 12px;
    background-color: #f2f2f2;
    flex-direction: column;
    margin: auto;
    width: 80%;
  }

  div#apply-top,
  div#apply-bottom {
    width: 100%;
    justify-content: space-around;
  }

  div#apply-profile-image {
    flex: none;
    height: width;
    width: 50px;
    height: 50px;
    margin: 30px 0 30px 30px;
    background-color: white;
    border-radius: 50%;
  }

  div#apply-profile {
    flex: 4;
    flex-direction: column;
    margin: auto;
    padding-left: 15px;
    text-align: left;
  }

  p#user-apply-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p#device-type {
    font-size: 12px;
  }

  p {
    margin: 0;
  }

  div#apply-date {
    flex: 4;
    display: block;
    justify-content: space-between;
    text-align: right;
    padding: 30px;
    padding-bottom: 0px;
    font-size: 12px;
    color: #848484;
    padding-right: 0;
  }

  p#used-date {
    margin-top: 15px;
    font-size: 13px;
    color: gray;
  }

  h3#apply-user-inform {
    margin-bottom: 0;
    margin-top: 30px;
    margin-left: 34px;
    text-align: left;
    font-size: 18px;
  }

  div#apply-content {
    text-align: center;
    padding: 10px;
    min-height: 140px;
    width: 85%;
    margin: 20px 0 30px 0;
    border: none;
    font-size: 12px;
    color: #424242;
    background-color: white;
  }

  p#content {
    margin: auto;
  }

  h3#apply-content-title {
    margin-bottom: 0;
    margin-left: 34px;
    text-align: left;
    font-size: 18px;
  }
`;

export default PostDetail;