import { useState } from "react";
import styled, { css } from "styled-components";
import { useDeliveryStatus } from "../../contexts/DeliveryStatusContext";
export const ApplicationList = (props) => {
  // props.data에서 데이터 추출
  const { userName, devicetype, content, date, status } = props.data;

  // DeliveryStatusContext 사용
  const { status: contextStatus, setStatus } = useDeliveryStatus();

  // 배송상태 string
  const statusString = ["", "매칭 대기중", "매칭 완료", "배송중", "수령 완료"];

  return (
    <StyledApplication>
      <div id="apply-box">
        <div id="apply-top">
          <div id="apply-profile-image"></div>
          {/* 추후 img로 변경*/}
          <div id="apply-profile">
            <p id="user-apply-name">{userName}</p>
            <p id="device-type">신청 기기 유형: {devicetype}</p>
          </div>
          <div id="apply-date">
            <p>등록날짜: {date}</p>
          </div>
          <div id="status-btn-container">
            <StyledStatus status={status}>
              <p style={{ margin: "auto" }}>{statusString[status]}</p>
            </StyledStatus>
          </div>
        </div>
        <div id="apply-bottom">
          <div id="apply-content">
            <p id="content">{content}</p>
          </div>
        </div>
      </div>
    </StyledApplication>
  );
};

const StyledStatus = styled.div`
  width: 100px;
  margin: 20px;
  height: 30px;
  border: none;
  border-radius: 50px;
  color: white;
  background-color: #6296bb;
  font-weight: bold;
  font-size: 13px;
`;

const StyledApplication = styled.div`
  div {
    display: flex;
    max-width: 700px;
  }

  div#status-btn-container {
    flex-direction: column;
  }

  div#apply-box {
    border: none;
    border-radius: 30px;
    background-color: #f2f2f2;
    flex-direction: column;
    margin: auto;
    width: 80%;
    margin-bottom: 30px;
    transition: all 200ms ease;

    &:hover {
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
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
    margin: 20px 0 20px 20px;
    background-color: white;
    border-radius: 50%;
  }

  div#apply-profile {
    flex: 4;
    flex-direction: column;
    margin: auto;
    padding: 15px;
    text-align: left;
  }

  p#user-apply-name {
    font-size: 16px;
    font-weight: 600;
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
    padding: 20px;
    font-size: 12px;
    color: #848484;
    padding-right: 0;
  }

  div#apply-content {
    text-align: center;
    padding: 10px;
    min-height: 60px;
    width: 90%;
    margin-bottom: 20px;
    border: none;
    border-radius: 20px;
    font-size: 12px;
    color: #424242;
    background-color: white;
  }

  p#content {
    margin: auto;
  }
`;

export default ApplicationList;
