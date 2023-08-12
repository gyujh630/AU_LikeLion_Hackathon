//AddMyDevice.js
import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useForm, Controller, useFieldArray, reset } from "react-hook-form";
import axios from "axios"; // Import axios

const AddMyDevice = ({ isOpen, onClose }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      overlayClassName="modal-overlay"
      contentLabel="Add My Device Modal"
      style={ModalStyle} // Add this line to apply the custom styles
      className="modal-content"
    >
      <ModalContainer>
        <h3>새 기기 추가</h3>
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
              render={({ field }) => <Textarea {...field} />}
            />
            {errors.details && (
              <ErrorMessage>{errors.details.message}</ErrorMessage>
            )}
          </div>
          <ButtonWrapper>
            <Button type="submit">추가</Button>
            <Button onClick={() => handleModalClose}>취소</Button>
          </ButtonWrapper>
        </Form>
      </ModalContainer>
    </Modal>
  );
};

// Styled components
const ModalContainer = styled.div`
  /* 모달 컨테이너 스타일 */
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
`;

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
Modal.setAppElement("#root"); // Replace "#root" with your root element ID or remove this line if not using portals

const ModalStyle = {
  content: {
    width: "400px",
    // minWidth: "200px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    position: "fix",
  },
};

export default AddMyDevice;
