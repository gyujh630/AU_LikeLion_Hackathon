import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useForm, Controller, useFieldArray, reset } from "react-hook-form";
import axios from "axios"; // Import axios

// TODO :: 마지막 모달(DonationSuccess)에서 모달 전체 닫히도록
// TODO :: SelectMyDevice -> 선택한 값 넘겨 받고, ConfirmDonation에서 Put 요청

Modal.setAppElement("#root");

const ConfirmDonation = ({ isOpen, onClose }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm();

  //   const [SuccessModalIsOpen, SuccessModalIsOpen] = useState(false);

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

  const onSubmit = async (data) => {};

  const handleModalClose = () => {
    onClose();
    reset(); // 입력값 초기화
  };

  // api 연결 전 dummyData
  const dummyData = [
    {
      //   deviceType: "태블릿",
      model: "ipad3",
      condition: 2,
      usedDate: "2년",
      image: "기기 사진",
    },
  ];

  const [formIsValid, setFormIsValid] = useState(false);

  const handleCheckboxChange = () => {
    setFormIsValid(!formIsValid);
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
      <ModalContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>선택한 기기</h3>
          {dummyData.map((device, index) => (
            //   {deviceList.map((device, index) => (
            <DeviceBox key={index}>
              <DeviceContent>
                <DeviceImage>
                  <img src={device.image} alt="Device" />
                </DeviceImage>
                <DeviceInfo>
                  <p>모델명: {device.model}</p>
                  <p>사용기간: {device.usedDate}</p>
                  <p>상태: {device.condition}</p>
                </DeviceInfo>
              </DeviceContent>
            </DeviceBox>
          ))}
          <h3>안내사항</h3>
          <DeviceBox>
            <DeviceContent>
              <div style={{ padding: "15px" }}>
                기부하기를 신청하면 수혜자가 등록한 행정복지센터 주소가
                안내됩니다.
                <br />
                안내된 주소로 기부자가 직접 택배를 보내야 합니다.
                <br />
                택배가 도착하면 수혜자가 행정복지센터에 방문하여 물품을
                수령합니다.
                <br />
                기부 신청 후 택배를 장기간 보내지 않을 시 기부가 취소되며
                패널티가 발생할 수 있습니다.
                <br />
                기부된 기기는 다시 되돌려 받을 수 없습니다.
              </div>
            </DeviceContent>
          </DeviceBox>

          <div style={{ padding: "15px", justifyContent: "center" }}>
            <input type="checkbox" onChange={handleCheckboxChange} />
            <div style={{ textAlign: "left" }}>
              위의 사항을 모두 확인하였습니다.
            </div>
          </div>

          <ModalButton
            type="submit"
            disabled={!formIsValid} // Use formIsValid here
            style={{
              backgroundColor: formIsValid ? "#4CAF50" : "#ccc",
              cursor: formIsValid ? "pointer" : "not-allowed",
            }}
            // onClick={() => setSuccessModalIsOpen(true)}
          >
            선택한 기기 기부하기
          </ModalButton>
          {/* {SuccessModalIsOpen && (
            <DonationSuccess
              isOpen={SuccessModalIsOpen}
              onClose={() => setSuccessModalIsOpen(false)}
              onConfirm={() => setSuccessModalIsOpen(false)}
            />
          )} */}
        </Form>
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
  align-items: flex-start;
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

const CustomSelect = styled.select`
  padding: 2px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

// Set modal styles
// Modal.setAppElement("#root"); // Replace "#root" with your root element ID or remove this line if not using portals

// const ModalStyle = {
//   content: {
//     width: "400px",
//     // minWidth: "200px",
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     position: "fix",
//   },
// };

export default ConfirmDonation;
