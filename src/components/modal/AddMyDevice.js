//AddMyDevice.js
import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useForm, Controller, useFieldArray, reset } from "react-hook-form";
import axios from "axios"; // Import axios
import "../../styles/global.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import SERVER_URL from "../../constants/serverUrl";

// TODO :: deviceType, model, condition, image, usedDate로 erd 반영해서 수정 필요
// TODO :: 모달에서 추가하면 바로 리렌더링 되게

Modal.setAppElement("#root");
const MySwal = withReactContent(Swal);

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
      const { image, ...jsonData } = data;
      console.log(jsonData);

      const formData = new FormData();
      formData.append(
        "device",
        new Blob([JSON.stringify(jsonData)], { type: "application/json" })
      );
      // profile 이미지가 있는 경우에만 추가
      if (image && image[0]) {
        formData.append("image", image[0]);
      }

      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER_URL}/device/post`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.status);

      if (response.ok) {
        MySwal.fire({
          icon: "success",
          title: "등록 완료",
          text: "기기가 성공적으로 등록되었습니다.",
          confirmButtonColor: "var(--color-blue)",
          iconColor: "var(--color-blue)",
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "등록 실패",
          text: "알 수 없는 오류가 발생했습니다.",
          confirmButtonColor: "var(--color-blue)",
          iconColor: "var(--color-blue)",
        });
      }
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
        <h2 style={{ marginBottom: "40px" }}>새 기기 추가</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-row">
            <h4>기기타입 *</h4>
            <Controller
              name="deviceType"
              control={control}
              rules={{ required: "기기타입을 입력해주세요." }}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="" disabled>
                    기기 타입
                  </option>
                  <option value="스마트폰">스마트폰</option>
                  <option value="태블릿">태블릿</option>
                  <option value="노트북">노트북</option>
                  <option value="스마트워치">스마트워치</option>
                </select>
              )}
            />
            {errors.deviceType && (
              <ErrorMessage>{errors.deviceType.message}</ErrorMessage>
            )}
          </div>
          <div className="input-row">
            <h4>기기명 *</h4>
            <Controller
              name="model"
              control={control}
              rules={{ required: "모델명을 입력해주세요." }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="예시) 아이폰 11 pro"
                  maxLength={50}
                />
              )}
            />
            {errors.model && (
              <ErrorMessage>{errors.model.message}</ErrorMessage>
            )}
          </div>
          <div className="input-row">
            <h4>이미지 등록 *</h4>
            <Controller
              name="image"
              control={control}
              rules={{ required: "이미지를 등록해주세요." }}
              render={({ field }) => <Input type="file" {...field} />}
            />
            {errors.image && (
              <ErrorMessage>{errors.image.message}</ErrorMessage>
            )}
          </div>
          <div className="input-row">
            <h4>사용 기간 *</h4>
            <Controller
              name="usedDate"
              control={control}
              rules={{ required: "사용 기간을 입력해주세요." }}
              render={({ field }) => (
                <Input {...field} placeholder="예시) 3년" maxLength={100} />
              )}
            />
            {errors.usedDate && (
              <ErrorMessage>{errors.usedDate.message}</ErrorMessage>
            )}
          </div>
          <div className="input-row">
            <h4>상태 *</h4>
            <Controller
              name="conditions"
              control={control}
              rules={{ required: "상태를 입력해주세요." }}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  <option value="" disabled>
                    기기 상태
                  </option>
                  <option value="1">최상</option>
                  <option value="2">상</option>
                  <option value="3">중</option>
                  <option value="4">하</option>
                  <option value="5">최하</option>
                </select>
              )}
            />
            {errors.conditions && (
              <ErrorMessage>{errors.conditions.message}</ErrorMessage>
            )}
          </div>
          {/* <div>
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
          </div> */}
          <ButtonWrapper>
            <ModalButton
              type="submit"
              disabled={!isValid}
              style={{
                margin: "auto",
                width: "150px",
                borderRadius: "50px",
                backgroundColor: isValid && isDirty ? "#6296bb" : "#ccc",
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
    maxWidth: "700px",
    width: "70%",
    height: "60%",
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

export default AddMyDevice;
