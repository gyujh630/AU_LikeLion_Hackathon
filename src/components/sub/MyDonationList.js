import { useState } from "react";
import styled, { css } from "styled-components";
import { useDeliveryStatus } from "../../contexts/DeliveryStatusContext";

export const MyDonationList = (props) => {
  // props.data에서 데이터 추출
  const { userName, devicetype, content, date, status } = props.data;

  // DeliveryStatusContext 사용
  const { status: contextStatus, setStatus } = useDeliveryStatus();

  // 배송상태 string
  const statusString = ["매칭 대기중", "매칭 완료", "배송중", "수령 완료"];

  return <StyledMyDonation></StyledMyDonation>;
};

// style

const StyledStatusButton = styled.button`
  width: 100px;
  padding: 8px 12px;
  margin: ${(props) => (props.status === 2 ? "15px 15px 0px 15px" : "15px")};
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
    margin: 15px 0 15px 15px;
    background-color: white;
    border-radius: 50%;
  }

  div#apply-profile {
    flex: 4;
    flex-direction: column;
    margin: auto;
    padding: 10px;
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
    padding: 15px;
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
    font-size: 12px;
    color: #424242;
    background-color: white;
  }

  p#content {
    margin: auto;
  }
`;
