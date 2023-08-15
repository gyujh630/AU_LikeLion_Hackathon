import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import styled, { keyframes, css } from "styled-components"; // Import styled-components
import axios from "axios"; // Import axios
Modal.setAppElement("#root");

const DonationSuccess = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const handleModalClose = () => {
    onClose();
  };
  return (
    <Modal style={ModalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <div style={ModalHeader}>
        <CloseButton
          style={{ padding: 0 }}
          type="button"
          className="close"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </CloseButton>
      </div>
      <ModalContainer slide={isOpen}>
        <h1>기부 신청이 완료되었습니다!</h1>
        <div
          style={{
            marginBottom: "20px",
            justifyContent: "center",
          }}
        >
          기술의 힘을 모두가 누리기 위한 발걸음에 동참해 주셔서 감사합니다.
        </div>
        <DeviceBox style={{ marginTop: "40px" }}>
          <div>
            <br />
            기한 내에 해당 주소로 택배를 발송하고, 운송장 번호를 입력해주세요.{" "}
            <br /> <br />
            [우만동 행정복지센터]
            <br />
            수원시 우만동, XXX로 XX번길 XX <br /> <br />
            만료 기한 2023-08-26 <br />
            <br />
          </div>
        </DeviceBox>
        <ConfirmButton style={{ padding: 0 }} onClick={onClose}>
          확인
        </ConfirmButton>
      </ModalContainer>
    </Modal>
  );
};

const DeviceContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DeviceImage = styled.div`
  flex: none;
  width: 130px;
  height: 130px;
  margin-right: 20px;
  border: 1px solid #ccc; /* Add border styling */
  border-radius: 4px; /* Add border radius */
  overflow: hidden; /* Hide overflowing content */
  margin-left: 30px;
`;

const DeviceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the left */
`;

const DeviceBox = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  width: 500px;

  input[type="checkbox"] {
    margin: 0px 10px;
    width: 40px;
    height: 40px;
    transform: scale(2);
  }
`;

const ModalStyles = {
  overlay: {
    zIndex: 1000,
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.3)", //모달 바깥 배경
    overflow: "hidden",
  },

  content: {
    minHeight: "600px",
    maxWidth: "900px",
    width: "70%",
    height: "50%",
    borderRadius: "8px",
    padding: "20px",
    overflowY: "auto", //스크롤 허용
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    // justifyContent: "space-evenly",
    backgroundColor: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  },
};

const ModalHeader = {
  width: "100%",
  display: "flex",
  height: "20px",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  padding: 0,
};

const CloseButton = styled.button`
  padding: 12px;
  background-color: transparent;
  border: none;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
`;

const ModalButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  width: 200px;
  height: 40px;
  background-color: white;
  color: black;
  border: 1px solid gray; /* Add a gray border */
  font-size: 15px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
`;

const CustomSelect = styled.select`
  padding: 2px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ModalContainer = styled.main`
  div {
    display: flex;
  }

  div#apply {
    width: 100%;
  }

  div#apply-top {
    flex-direction: row;
  }

  p#user-apply-name {
    font-size: 16px;
    font-weight: bold;
  }

  div#apply-profile {
    flex-direction: column;
  }

  div#apply-profile-image {
    flex: none;
    height: width;
    width: 50px;
    height: 50px;
    background-color: blue;
    border-radius: 50%;
  }

  /* Input 컨테이너 스타일 */
  .input-row {
    display: flex;
    align-items: center; /* 각 요소를 세로로 정렬 */
    margin-bottom: 16px;
  }

  h4 {
    font-size: 16px;
    margin: 0;
    width: 120px; /* 헤더 너비 조정 (선택사항) */
  }

  /* Input 스타일 */
  input,
  select,
  textarea {
    flex: 1; /* 나머지 공간을 차지하여 정렬 */
    padding: 8px;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  /* 에러 메시지 스타일 */
  span.error {
    color: red;
    font-size: 12px;
  }
  ${(props) =>
    props.slide &&
    css`
      animation: ${slideIn} 0.3s ease-in-out;
    `}
`;

// // Styled components
// const ModalContainer = styled.div`
//   /* 모달 컨테이너 스타일 */
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   background-color: #fff;
// `;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 8px;
  margin-bottom: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const Button = styled.button`
  margin-left: 8px;
`;

const ErrorMessage = styled.span`
  color: red;
`;

export default DonationSuccess;
