import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useDeliveryStatus } from "../../contexts/DeliveryStatusContext";

Modal.setAppElement("#root");

const DeliveryNumInputModal = ({ isOpen, onClose, onConfirm }) => {
  const { status, setStatus } = useDeliveryStatus(); // DeliveryStatusContext 사용
  const [deliveryNum, setDeliveryNum] = useState(""); // 송장번호 상태

  const handleConfirm = () => {
    onConfirm();
    // try {
    //   await updateDeliveryNum(deliveryNum); // deliveryNum update 함수 호출
    //   await patchDeliveryState();           // 상태 변경
    //  } catch (error) {
    // console.error("error);
    //  }
    onClose();
  };

  return (
    <Modal style={ModalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <p style={{ fontSize: "14px" }}>
        기기를 발송하셨나요?<br></br>운송장 번호를 입력해주세요!
      </p>
      <CustomInput
        value={deliveryNum}
        onChange={(e) => setDeliveryNum(e.target.value)}
      />
      <ButtonContainer>
        <ModalButton onClick={handleConfirm}>입력</ModalButton>
        <ModalButton style={{ backgroundColor: "grey" }} onClick={onClose}>
          취소
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

const CustomInput = styled.input`
  width: 70%;
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

export default DeliveryNumInputModal;
