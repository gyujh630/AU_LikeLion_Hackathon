import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { updateDelivery } from "../../services/MyPageAPI";
Modal.setAppElement("#root");

const DeliveryNumInputModal = ({ isOpen, onClose, onConfirm, deviceId }) => {
  const [deliverNum, setDeliverNum] = useState(""); // 송장번호
  const [deliverCorp, setDeliverCorp] = useState(""); // 택배사

  const dataSet = {
    deliverNum: deliverNum,
    deliverCorp: deliverCorp,
  };

  const handleConfirm = async () => {
    console.log(deliverNum, dataSet);
    onConfirm();
    try {
      await updateDelivery(deviceId, dataSet); // deliveryNum update 함수 호출
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  const deliveryOptions = [
    "CJ대한통운",
    "CVSnet 편의점택배",
    "CU편의점택배",
    "우체국택배",
    "한진택배",
    "로젠택배",
    "롯데택배",
    "경동택배",
    "DHL",
    "대신택배",
    "일양로지스",
    "농협택배",
    "기타",
  ];

  return (
    <Modal style={ModalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <p style={{ fontSize: "16px", marginBottom: "40px" }}>
        기기를 발송하셨나요?<br></br>택배사와 운송장 번호를 입력해주세요!
      </p>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <span style={{ fontSize: "14px", margin: "auto", marginRight: "8px" }}>
          택배사 선택
        </span>
        <CustomSelect
          value={deliverCorp}
          onChange={(e) => setDeliverCorp(e.target.value)}
        >
          <option value="" disabled>
            선택하세요
          </option>
          {deliveryOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </CustomSelect>
      </div>
      <div style={{ display: "flex" }}>
        <span style={{ fontSize: "14px", margin: "auto", marginRight: "8px" }}>
          운송장 번호
        </span>
        <CustomInput
          value={deliverNum}
          onChange={(e) => setDeliverNum(e.target.value)}
        />
      </div>
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
    height: "300px",
    width: "400px",
    borderRadius: "30px",
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
  width: 150px;
  padding: 6px;
  font-size: 14px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #ccc;
`;

const CustomSelect = styled.select`
  width: 165px;
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
  background-color: #6296bb;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;

export default DeliveryNumInputModal;
