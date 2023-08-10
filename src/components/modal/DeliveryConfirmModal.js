import { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import Modal from "react-modal";
import { useDeliveryStatus } from "../../contexts/DeliveryStatusContext";

Modal.setAppElement("#root");

const DeliveryConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  const { status, setStatus } = useDeliveryStatus(); // DeliveryStatusContext 사용
  const handleConfirm = () => {
    onConfirm();
    // try {
    //   // status를 3(수령완료)로 업데이트하는 API 호출
    //   await patchApplicationStatus(3); // 예시 API 호출 (실제 API 함수명 및 호출 방식에 맞게 수정 필요)
    //  } catch (error) {
    // console.error("error);
    //  }
    setStatus((prevStatus) => prevStatus + 1);
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onRequestClose={onClose}>
      <p>기기를 수령하셨나요?</p>
      <ButtonContainer>
        <ModalButton onClick={handleConfirm}>예</ModalButton>
        <ModalButton onClick={onClose}>아니오</ModalButton>
      </ButtonContainer>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  // overlay 스타일 설정
  &.ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // content 스타일 설정
  &.ReactModal__Content {
    width: 300px;
    height: 200px;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

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
