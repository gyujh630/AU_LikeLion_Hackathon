import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import styled, { keyframes, css } from "styled-components"; // Import styled-components
import { useForm, Controller, useFieldArray, reset } from "react-hook-form";
import axios from "axios"; // Import axios
import DonationSuccess from "./DonationSuccess";
import SERVER_URL from "../../../constants/serverUrl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// TODO :: SelectMyDevice -> 선택한 값 넘겨 받고, ConfirmDonation에서 Put 요청

Modal.setAppElement("#root");

const MySwal = withReactContent(Swal);

const ConfirmDonation = ({ isOpen, onClose, selectedDevice, applyId }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm();

  console.log("deviceId: " + selectedDevice.deviceId);
  console.log("applyId: " + applyId);

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

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      // Create the data payload for the patch request
      const patchData = {
        // Add any fields you want to update
        // For example, if you want to update the status field:
        // status: "updatedStatusValue",
      };

      // Send the patch request
      try {
        const response = await axios.patch(
          `${SERVER_URL}/receiver/${applyId}/${selectedDevice.deviceId}`,
          patchData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle the response as needed
        console.log("Patch request successful:", response.data);

        if (response.ok) {
          setShowDonationSuccess(true);
        } else {
          // Handle the case where the response is not OK
          console.error("Patch request failed:", response.data);
          MySwal.fire({
            icon: "error",
            title: "실패",
            text: "알 수 없는 오류가 발생했습니다.",
            confirmButtonColor: "var(--color-blue)",
            iconColor: "var(--color-blue)",
          });
        }

        // You can close the modal or perform any other actions here
      } catch (error) {
        console.error("Error updating data:", error);
        MySwal.fire({
          icon: "error",
          title: "실패",
          text: "요청을 처리할 수 없습니다. 나중에 다시 시도해주세요.",
          confirmButtonColor: "var(--color-blue)",
          iconColor: "var(--color-blue)",
        });
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const handleModalClose = () => {
    onClose();
    reset(); // 입력값 초기화
  };

  const [formIsValid, setFormIsValid] = useState(false);

  const handleCheckboxChange = () => {
    setFormIsValid(!formIsValid);
  };

  const [SuccessModalIsOpen, setSuccessModalIsOpen] = useState(false);

  // new
  const [showDonationSuccess, setShowDonationSuccess] = useState(false); // Add state for the second modal

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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>선택한 기기</h3>
          {/* {dummyData.map((device, index) => ( */}
          {/* {deviceList.map((device, index) => ( */}
          {/* <DeviceBox key={index}> */}
          <DeviceBox>
            <DeviceContent>
              <DeviceImage>
                <img src={selectedDevice.image} alt="Device" />
              </DeviceImage>
              <DeviceInfo>
                <p>모델명: {selectedDevice.model}</p>
                <p>사용기간: {selectedDevice.usedDate}</p>
                <p>상태: {selectedDevice.conditions}</p>
              </DeviceInfo>
            </DeviceContent>
          </DeviceBox>
          {/* ))} */}
          <h3>안내사항</h3>
          <DeviceBox>
            <DeviceContent>
              <div>
                <p style={{ fontSize: "15px" }}>
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
                </p>
              </div>
            </DeviceContent>
          </DeviceBox>

          <div style={{}}>
            <input
              type="checkbox"
              style={{ width: "10%" }}
              onChange={handleCheckboxChange}
            />
            <div style={{}}>위의 사항을 모두 확인하였습니다.</div>
          </div>

          <ModalButton
            type="submit"
            disabled={!formIsValid} // Use formIsValid here
            style={{
              backgroundColor: formIsValid ? "#6296bb" : "#ccc",
              cursor: formIsValid ? "pointer" : "not-allowed",
              width: "200px",
              margin: "auto",
              marginTop: "20px",
              borderRadius: "50px",
            }}
            // onClick={() => setShowDonationSuccess(true)}
          >
            선택한 기기 기부하기
          </ModalButton>
          {showDonationSuccess && (
            <DonationSuccess
              isOpen={showDonationSuccess}
              onClose={() => setShowDonationSuccess(false)} // Close the second modal
            />
          )}
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
  border-radius: 30px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  /* width: 100%; */
  width: 500px;
`;

const ModalStyles = {
  overlay: {
    zIndex: 1000,
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0)", //모달 바깥 배경
    overflow: "hidden",
  },

  content: {
    minHeight: "600px",
    maxWidth: "900px",
    width: "70%",
    height: "50%",
    borderRadius: "30px",
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
