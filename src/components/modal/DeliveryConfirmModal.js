import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useDeliveryStatus } from "../../contexts/DeliveryStatusContext";

Modal.setAppElement("#root");

const DeliveryConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  const { status, setStatus } = useDeliveryStatus(); // DeliveryStatusContext 사용
  const handleConfirm = () => {
    onConfirm();
    // try {
    //   // status를 3(수령완료)로 업데이트하는 API 호출
    //   await patchApplicationStatus(); // 예시 API 호출 (실제 API 함수명 및 호출 방식에 맞게 수정 필요)
    //  } catch (error) {
    // console.error("error);
    //  }
    setStatus((prevStatus) => prevStatus + 1); //test코드
    console.log(status);
    onClose();
  };

  return (
    <Modal style={ModalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <p>기기를 수령하셨나요?</p>
      <ButtonContainer>
        <ModalButton onClick={handleConfirm}>예</ModalButton>
        <ModalButton onClick={onClose} style={{ backgroundColor: "grey" }}>
          아니오
        </ModalButton>
      </ButtonContainer>
    </Modal>
  );
};

const ModalStyles = {
  overlay: {
    zIndex: 1000,
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.3)", //모달 바깥 배경
  },

  content: {
    height: "200px",
    width: "300px",
    borderRadius: "8px",
    padding: "20px",
    overflowY: "auto", //스크롤 허용
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  },
};

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
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

export default DeliveryConfirmModal;
