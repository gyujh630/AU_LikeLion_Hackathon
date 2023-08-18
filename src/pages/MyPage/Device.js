// Device.js
import Modal from "react-modal";
import { useState, useEffect } from "react";
import AddMyDevice from "../../components/modal/AddMyDevice";
import MyDeviceList from "../../components/sub/MyDeviceList";
import styled from "styled-components";
import axios from "axios"; // Import axios
import SERVER_URL from "../../constants/serverUrl";
import { fetchDevices } from "../../services/DeviceAPI";
import { deleteDevice } from "../../services/DeviceAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Trash 아이콘 가져오기
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../styles/global.css";

const MySwal = withReactContent(Swal);

const Device = () => {
  const [deviceList, setDeviceList] = useState([]);

  // 기기 데이터 가져오기
  const fetchDeviceData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${SERVER_URL}/device`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDeviceList(response.data); // Update the state with fetched data
      console.log(deviceList);

      const devices = await fetchDevices(); // Use the imported fetchDevices function
      setDeviceList(devices); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };
  useEffect(() => {
    // user_id 변경 필요
    fetchDeviceData();
  }, []);

  const conditionsMap = {
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

  const handleModalConfirm = async () => {
    setModalIsOpen(false);
  };

  // * 삭제

  const handleDelete = async (deviceId) => {
    // SweetAlert2를 사용하여 확인 다이얼로그 표시
    MySwal.fire({
      icon: "question",
      title: "정말로 삭제하시겠습니까?",
      text: "삭제된 기기는 복구할 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "var(--color-blue)",
      iconColor: "var(--color-blue)",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 삭제 함수 또는 axios를 사용하여 기기 삭제
          await deleteDevice(deviceId);
          // 삭제 후 기기 목록 업데이트
          const updatedDevices = deviceList.filter(
            (device) => device.id !== deviceId
          );
          setDeviceList(updatedDevices); // deviceList 업데이트로 화면 갱신
        } catch (error) {
          console.error("기기 삭제 중 오류 발생:", error);
        }
      }
    });
  };

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
            onConfirm={fetchDeviceData} // fetchDeviceData 함수 사용하여 목록 업데이트
          />
        )}
        {/* <AddMyDevice isOpen={isModalOpen} onClose={handleModalClose} /> */}
      </div>
      <main>
        {deviceList.map((device) => (
          <div key={device.id}>
            <MyDeviceList
              deviceInfo={{
                ...device,
                conditions: conditionsMap[device.conditions],
              }}
            />
            <span
              className="delete-button"
              onClick={() => handleDelete(device.deviceId)}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faTrash} /> {/* Trash 아이콘 표시 */}
            </span>
          </div>
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
