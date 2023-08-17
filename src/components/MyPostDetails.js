import { useLocation } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import BackButton from "./default/BackButton";
import DeliveryConfirmModal from "./modal/DeliveryConfirmModal";
import UpdateApplyModal from "./modal/UpdateApplyModal";

const MyPostDetail = () => {
  const location = useLocation();
  const postData = location.state; //받아온 apply data
  // const postData = {
  //   //  api get 요청으로 데이터 받아오도록 수정
  //   applyId: "1",
  //   userId: "16",
  //   userName: "홍길동",
  //   deviceType: "노트북",
  //   content: "너무 필요합니다",
  //   address: "우만동 행정복지센터",
  //   date: "2023-08-02",
  //   status: 0,
  // };
  const { date, status, address, userName, deviceType, content } = postData; //  api get 요청으로 데이터 받아오도록 수정
  const statusString = ["", "매칭 대기중", "매칭 완료", "배송중", "수령 완료"];
  const [modalIsOpen, setModalIsOpen] = useState(false); //modal 열고 닫는 상태
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false); //modal 열고 닫는 상태
  // 모달 닫기 함수
  const closeModal = () => {
    // 모달이 닫힐 때 MyPostDetail 컴포넌트를 리렌더링하도록 상태 업데이트
    setModalIsOpen(false);
    // 상태 업데이트를 통해 리렌더링 발생
  };
  const closeUpdateModal = () => {
    // 모달이 닫힐 때 MyPostDetail 컴포넌트를 리렌더링하도록 상태 업데이트
    setModalIsOpen(false);
    // 상태 업데이트를 통해 리렌더링 발생
  };

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
        <div
          style={{
            marginBottom: "20px",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <BackButton />
          <h2>상세정보</h2>
        </div>
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
            <p id="device-type">신청 기기 유형: {deviceType}</p>
          </div>
        </div>
        <h3 id="apply-content-title">신청 사유</h3>
        <div id="apply-bottom">
          <div id="apply-content">
            <p id="content">{content}</p>
          </div>
        </div>
        <div id="device-container">
          {status > 1 ? <p>매칭된 기기 정보 표시</p> : null}
        </div>
        <div id="btn-container">
          {status === 2 ? (
            <BottomBtn
              style={{ width: "200px" }}
              onClick={() => setModalIsOpen(true)}
            >
              수령 확인
            </BottomBtn>
          ) : null}
          {status === 1 ? (
            <BottomBtn
              onClick={() => setUpdateModalIsOpen(true)}
              style={{ width: "200px" }}
            >
              신청내용 수정
            </BottomBtn>
          ) : null}
          {status === 1 ? (
            <BottomBtn style={{ width: "200px" }}>신청 취소</BottomBtn>
          ) : null}
        </div>
      </div>
      {modalIsOpen && (
        <DeliveryConfirmModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onConfirm={() => setModalIsOpen(false)}
        />
      )}
      {updateModalIsOpen && (
        <UpdateApplyModal
          isOpen={updateModalIsOpen}
          onClose={() => setUpdateModalIsOpen(false)}
          onConfirm={() => setUpdateModalIsOpen(false)}
          props={postData}
        />
      )}
    </CustomPostDetail>
  );
};

const BottomBtn = styled.button`
  margin: 10px;
  border-radius: 50px;
  margin-bottom: 30px;
  font-size: 18px;
  padding: 8px 0;
  border: none;
  background-color: #336ba3;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const StyledStatus = styled.div`
  width: 100px;
  margin: 20px;
  height: 30px;
  border: none;
  border-radius: 50px;
  color: white;
  background-color: #6296bb;
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

  div#btn-container {
    margin: auto;
    width: 80%;
    justify-content: center;
  }

  div#apply-box {
    border: none;
    border-radius: 30px;
    background-color: #f2f2f2;
    flex-direction: column;
    margin: auto;
    width: 80%;
    margin-bottom: 50px;
  }

  div#apply-top,
  div#apply-bottom {
    width: 100%;
    justify-content: space-around;
  }

  div#apply-profile-image {
    flex: none;
    height: width;
    width: 70px;
    height: 70px;
    margin: 30px 20px 30px 30px;
    background-color: white;
    border-radius: 50%;
  }

  div#apply-profile {
    flex: 4;
    flex-direction: column;
    margin: auto;
    justify-content: center;
    text-align: left;
  }

  p#user-apply-name {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  p#device-type {
    font-size: 14px;
    margin-top: 5px;
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
    border-radius: 20px;
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

export default MyPostDetail;
