//AddMyDevice.js
import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useForm, Controller, useFieldArray, reset } from "react-hook-form";
import axios from "axios"; // Import axios

// TODO :: deviceType, model, condition, image, usedDate로 erd 반영해서 수정 필요

Modal.setAppElement("#root");

const AddMyDevice = ({ isOpen, onClose }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm();

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
      const postData = {
        model: data.deviceName,
        usedDate: data.usagePeriod,
        condition: data.status,
        date: new Date().toISOString().slice(0, 10), // 현재 날짜를 "YYYY-MM-DD" 형태로 변환
        image: data.deviceImage[0].name, // 이미지 파일 이름
      };

      // POST 요청 보내기
      const response = await axios.post("/device", postData);

      console.log("Device registered successfully:", response.data);
      onClose();
      reset(); // 입력값 초기화
    } catch (error) {
      console.error("Error registering device:", error);
    }
  };

  const handleModalClose = () => {
    onClose();
    reset(); // 입력값 초기화
  };

  return (
    <Modal style={ModalStyles} isOpen={isOpen} onRequestClose={onClose}>
      {/* <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      overlayClassName="modal-overlay"
      contentLabel="Add My Device Modal"
      style={ModalStyle} // Add this line to apply the custom styles
      className="modal-content"
    > */}
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
        <h2>새 기기 추가</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h4>이미지 등록 *</h4>
            <Controller
              name="deviceImage"
              control={control}
              rules={{ required: "이미지를 등록해주세요." }}
              render={({ field }) => <Input type="file" {...field} />}
            />
            {errors.deviceImage && (
              <ErrorMessage>{errors.deviceImage.message}</ErrorMessage>
            )}
          </div>
          <div>
            <h4>기기명 *</h4>
            <Controller
              name="deviceName"
              control={control}
              rules={{ required: "기기명을 입력해주세요." }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.deviceName && (
              <ErrorMessage>{errors.deviceName.message}</ErrorMessage>
            )}
          </div>
          <div>
            <h4>사용 기간 *</h4>
            <Controller
              name="usagePeriod"
              control={control}
              rules={{ required: "사용 기간을 입력해주세요." }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.usagePeriod && (
              <ErrorMessage>{errors.usagePeriod.message}</ErrorMessage>
            )}
          </div>
          <div>
            <h4>상태 *</h4>
            <Controller
              name="status"
              control={control}
              rules={{ required: "상태를 입력해주세요." }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.status && (
              <ErrorMessage>{errors.status.message}</ErrorMessage>
            )}
          </div>
          <div>
            <h4>세부 내용 * </h4>
            <Controller
              name="details"
              control={control}
              rules={{ required: "세부 내용을 입력해주세요." }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="여기에 예시 텍스트를 입력하세요."
                />
              )}
            />
            {errors.details && (
              <ErrorMessage>{errors.details.message}</ErrorMessage>
            )}
          </div>
          <ButtonWrapper>
            <ModalButton
              type="submit"
              disabled={!isValid}
              style={{
                backgroundColor: isValid && isDirty ? "#4CAF50" : "#ccc",
                cursor: isValid && isDirty ? "pointer" : "not-allowed",
              }}
            >
              추가
            </ModalButton>
          </ButtonWrapper>
        </Form>
      </ModalContainer>
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

export default AddMyDevice;
