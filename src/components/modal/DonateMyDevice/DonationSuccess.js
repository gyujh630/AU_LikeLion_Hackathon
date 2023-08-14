import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useForm, Controller, useFieldArray, reset } from "react-hook-form";
import axios from "axios"; // Import axios
Modal.setAppElement("#root");

const DonationSuccess = ({ isOpen, onClose }) => {
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
    //     try {
    //       const postData = {
    //         deviceType: data.deviceType,
    //         model: data.deviceModel,
    //         condition: data.condition,
    //         usedDate: data.usedDate,
    //         // date: new Date().toISOString().slice(0, 10), // 현재 날짜를 "YYYY-MM-DD" 형태로 변환
    //         image: data.deviceImage[0].name, // 이미지 파일 이름
    //       };
    //       // POST 요청 보내기
    //       const response = await axios.post("/device", postData);
    //       console.log("Device registered successfully:", response.data);
    //       onClose();
    //       reset(); // 입력값 초기화
    //     } catch (error) {
    //       console.error("Error registering device:", error);
    //     }
  };

  const handleModalClose = () => {
    onClose();
    reset(); // 입력값 초기화
  };
  return <Modal></Modal>;
};
