import { useState } from "react";
import styled, { css } from "styled-components";
import { useDeliveryStatus } from "../../contexts/DeliveryStatusContext";

export const MyDonationList = (props) => {
  // props.data에서 데이터 추출
  const {
    userName,
    devicetype,
    date,
    status,
    model,
    image,
    usedDate,
    deliverNum,
  } = props.data;

  // DeliveryStatusContext 사용
  const { status: contextStatus, setStatus } = useDeliveryStatus();

  // 배송상태 string
  const statusString = ["매칭 대기중", "매칭 완료", "배송중", "수령 완료"];

  return (
    <StyledMyDonation>
      <div id="apply-box">
        <div id="apply-top">
          <h3 id="apply-user-inform">수혜자 정보</h3>
          <div id="apply-date">
            <p>등록날짜: {date}</p>
          </div>
          <div id="status-btn-container">
            <StyledStatusButton status={status}>
              {statusString[status]}
            </StyledStatusButton>
          </div>
        </div>
        <div id="apply-middle">
          <div id="apply-profile-image"></div>
          {/* 추후 img로 변경*/}
          <div id="apply-profile">
            <p id="user-apply-name">{userName}</p>
            <p id="device-type">신청 기기 유형: {devicetype}</p>
          </div>
          {status === 1 && (
            <StyledDeliveryNumButton id="">
              운송장 번호 입력하기
            </StyledDeliveryNumButton>
          )}
        </div>
        <h3 id="donate-device-inform">기부한 기기</h3>
        <div id="apply-bottom">
          <div id="donate-image"></div>
          {/* 추후 img로 변경*/}
          <div id="donate-device-container">
            <p id="model-name">{model}</p>
            <p id="used-date">사용기간 {usedDate}</p>
          </div>
        </div>
      </div>
    </StyledMyDonation>
  );
};

// style

const StyledDeliveryNumButton = styled.button`
  width: 100px;
  padding: 8px 12px;
  margin: 25px 25px 0px 25px;
  height: 60px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: #007bff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledStatusButton = styled.button`
  width: 100px;
  padding: 8px 12px;
  margin: 25px 25px 0px 25px;
  height: 30px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: #4caf50;
  font-weight: bold;
`;

const StyledMyDonation = styled.div`
  div {
    display: flex;
    max-width: 900px;
  }

  div#status-btn-container {
    flex-direction: column;
  }

  div#apply-box {
    border: none;
    border-radius: 12px;
    background-color: #f2f2f2;
    flex-direction: column;
    margin: auto;
    width: 80%;
    margin-bottom: 30px;
  }

  div#apply-top,
  div#apply-bottom {
    height: 50%;
    width: 100%;
    justify-content: space-around;
  }

  div#apply-profile-image {
    flex: none;
    height: width;
    width: 50px;
    height: 50px;
    margin: 30px 0 30px 30px;
    background-color: white;
    border-radius: 50%;
  }

  div#apply-profile {
    flex: 4;
    flex-direction: column;
    margin: auto;
    padding-left: 15px;
    text-align: left;
  }

  p#user-apply-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p#device-type {
    font-size: 12px;
  }

  p {
    margin: 0;
  }

  div#apply-date {
    flex: 4;
    display: block;
    justify-content: space-between;
    text-align: right;
    padding: 30px;
    padding-bottom: 0px;
    font-size: 12px;
    color: #848484;
    padding-right: 0;
  }

  div#donate-image {
    flex: none;
    height: width;
    margin: 30px;
    width: 100px;
    height: 100px;
    background-color: white;
  }

  div#donate-device-container {
    flex: 7;
    flex-direction: column;
    margin: 20px 0;
    text-align: left;
    justify-content: center;
  }

  p#used-date {
    margin-top: 15px;
    font-size: 13px;
    color: gray;
  }

  h3#donate-device-inform {
    margin-bottom: 0;
    margin-left: 34px;
    text-align: left;
    font-size: 18px;
  }

  h3#apply-user-inform {
    margin-bottom: 0;
    margin-top: 30px;
    margin-left: 34px;
    text-align: left;
    font-size: 18px;
  }
`;
