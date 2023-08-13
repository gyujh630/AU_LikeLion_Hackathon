import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ApplyModal = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    // 제출 시 작업
    onClose();
  };

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
      <CustomApply>
        <h2>수혜 신청</h2>
        <div id="apply">
          <div id="apply-top">
            <div id="apply-profile-image"></div>
            {/* 추후 img로 변경*/}
            <div id="apply-profile">
              <p id="user-apply-name">홍길동</p>
              <div id="select-box">
                <p>필요한 기기</p>
                <select
                  id="device-type"
                  name="device-type"
                  defaultValue="tablet"
                >
                  <option value="phone">스마트폰</option>
                  <option value="tablet">태블릿</option>
                  <option value="laptop">노트북</option>
                  <option value="watch">스마트 워치</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </CustomApply>
      <CustomInput />
      <CustomInput />
      <div id="address">수령위치</div>
      <ModalButton>제출</ModalButton>
    </Modal>
  );
};

const ModalStyles = {
  overlay: {
    zIndex: 1000,
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.3)", //모달 바깥 배경
    overflow: "hidden",
  },

  content: {
    minHeight: "400px",
    width: "70%",
    height: "70%",
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

const CustomApply = styled.main`
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
`;

const CustomInput = styled.input`
  width: 80%;
  height: 100%;
  min-height: 200px;
  padding: 6px;
  font-size: 14px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export default ApplyModal;
