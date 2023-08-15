import styled from "styled-components";

const MyDeviceList = ({ deviceInfo }) => {
  return (
    <StyledMyDevice>
      <div id="apply-box">
        <div id="apply-bottom">
          <div id="donate-image"></div>
          {/* 추후 img로 변경*/}
          <div id="donate-device-container">
            <p id="model-name">{deviceInfo.model}</p>
            <p id="used-date">사용기간 {deviceInfo.usedDate}</p>
            <p id="used-date">상태: {deviceInfo.condition}</p>
          </div>
        </div>
      </div>
    </StyledMyDevice>

    // <DeviceBox>
    //   <DeviceContent>
    //     {/* <h3>기기 정보</h3> */}
    //     <DeviceImage src={deviceInfo.image} alt={deviceInfo.model} />
    //     <DeviceInfo>
    //       <p>모델: {deviceInfo.model}</p>
    //       <p>사용 기간: {deviceInfo.usedDate}</p>
    //       <p>상태: {deviceInfo.condition}</p>
    //       <p>등록일: {deviceInfo.date}</p>
    //     </DeviceInfo>
    //   </DeviceContent>
    // </DeviceBox>
  );
};

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
  transition: background-color 0.3s;

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

const StyledMyDevice = styled.div`
  div {
    display: flex;
    max-width: 700px;
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

export default MyDeviceList;
