// Device.js
import Modal from "react-modal";
import { useState, useEffect } from "react";
import AddMyDevice from "../../components/modal/AddMyDevice";
import MyDeviceList from "../../components/sub/MyDeviceList";
import styled from "styled-components";
import axios from "axios"; // Import axios
import SERVER_URL from "../../constants/serverUrl";

const Device = () => {
  const [deviceList, setDeviceList] = useState([]);

  // 기기 데이터 가져오기
  const fetchDevices = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${SERVER_URL}/device`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeviceList(response.data); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };
  useEffect(() => {
    // user_id 변경 필요
    fetchDevices();
  }, []);

  const conditionMap = {
    1: "최상",
    2: "상",
    3: "중",
    4: "하",
    5: "최하",
  };

  // new modal style 반영 코드
  const [modalIsOpen, setModalIsOpen] = useState(false); //modal 열고 닫는 상태

  // 기존 코드
  // Modal.setAppElement("#root"); //스크린 리더가 모달 이외의 컨텐츠를 읽지 않도록 설정

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <StyleApplication>
      <div id="title-box">
        {/* <h2>등록된 기기</h2> */}
        <button id="add-btn" onClick={() => setModalIsOpen(true)}>
          새 기기 추가
        </button>{" "}
        {modalIsOpen && (
          <AddMyDevice
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            onConfirm={() => setModalIsOpen(false)}
          />
        )}
        {/* <AddMyDevice isOpen={isModalOpen} onClose={handleModalClose} /> */}
      </div>
      <main>
        {deviceList.map((device) => (
          <MyDeviceList
            key={device.id}
            deviceInfo={{
              ...device,
              condition: conditionMap[device.condition],
            }}
          />
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
    font-weight: bold;
    width: 300px;
    right: 25px;
    margin: auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #336ba3;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin: 20px 0;
    transition: background-color 0.3s;

    &:hover {
      background-color: #afcce1;
    }
  }
`;

export default Device;
