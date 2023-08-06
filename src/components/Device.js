// Device.js
import Modal from "react-modal";
import { useState, useEffect } from "react";
import AddMyDevice from "./modal/AddMyDevice";
import MyDeviceList from "./sub/MyDeviceList";
import styled from "styled-components";
import axios from "axios"; // Import axios

const Device = () => {
  const [deviceList, setDeviceList] = useState([]);

  // 기기 데이터 가져오기
  const fetchDevices = async (userId) => {
    try {
      const response = await axios.get(`/device/${userId}`);
      setDeviceList(response.data); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };
  useEffect(() => {
    // user_id 변경 필요
    fetchDevices("user_id");
  }, []);

  // dummy데이터 예시
  const dummyDevices = [
    {
      id: 1,
      model: "ipad3",
      usedDate: "3년",
      condition: "2",
      date: "2023-07-07",
      image: "기기사진1",
    },
    {
      id: 2,
      model: "iphone12",
      usedDate: "1년",
      condition: "5",
      date: "2023-07-08",
      image: "기기사진2",
    },
    {
      id: 3,
      model: "galaxy21",
      usedDate: "2년",
      condition: "4",
      date: "2023-07-09",
      image: "기기사진3",
    },
  ];

  Modal.setAppElement("#root"); //스크린 리더가 모달 이외의 컨텐츠를 읽지 않도록 설정

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <StyleApplication>
      <div id="title-box">
        <h2>등록된 기기</h2>
        <button id="add-btn" onClick={handleModalOpen}>
          새 기기 추가
        </button>
        <AddMyDevice isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
      <main>
        {/* {deviceList.map((deviceInfo, index) => (
          <MyDeviceList key={index} deviceInfo={deviceInfo} />
        ))} */}
        {dummyDevices.map((device) => (
          <MyDeviceList key={device.id} deviceInfo={device} />
        ))}
      </main>
    </StyleApplication>
  );
};

const StyleApplication = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;
  align-items: center;

  div {
    display: flex;
  }

  main {
    width: 100%;
  }

  div#title-box {
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;
  }

  button#add-btn {
    // font-weight: bold;
    position: absolute;
    right: 25px;
    margin: auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 150px;
    margin: 20px 0;
  }
`;

export default Device;
