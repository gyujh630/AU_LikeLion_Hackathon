import { getMyApplicationList } from "../../services/api";
import { useState, useEffect, useContext, createContext } from "react";
import styled, { css } from "styled-components";
import DeliveryConfirmModal from "../modal/DeliveryConfirmModal";
import { useDeliveryStatus } from "../../contexts/DeliveryStatusContext";
export const MyApplicationList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 예시 dataSet
  const data = {
    userName: "홍길동",
    devicetype: "노트북",
    content: "너무 필요합니다",
    date: "2023/08/02",
    status: 2,
  };

  // DeliveryStatusContext 사용
  const { status, setStatus } = useDeliveryStatus();

  // 배송상태 string
  const statusString = ["매칭 준비중", "매칭 완료", "배송중", "수령 완료"];

  return (
    <StyleMyApplication>
      <div id="apply-box">
        <div id="apply-top">
          <div id="apply-profile-image"></div>
          <div id="apply-profile">
            <p id="user-apply-name">{data.userName}</p>
            <p id="device-type">신청 기기 유형: {data.devicetype}</p>
          </div>
          <div id="apply-date">
            <p>등록날짜: {data.date}</p>
          </div>
          <div id="status-btn-container">
            <StyledStatusButton status={status}>
              {statusString[status]}
            </StyledStatusButton>
            {status === 2 && (
              <Atag
                id="change-status"
                href="#"
                onClick={() => setModalIsOpen(true)}
              >
                배송완료로 변경
              </Atag>
            )}
          </div>
        </div>
        <div id="apply-bottom">
          <div id="apply-content">
            <p id="content">{data.content}</p>
          </div>
        </div>
      </div>

      {/* 모달 부분 */}
      {modalIsOpen && (
        <DeliveryConfirmModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onConfirm={() => setModalIsOpen(false)}
        />
      )}
    </StyleMyApplication>
  );
};

const Atag = styled.a`
  margin: 10px;
  font-size: 12px;
  text-decoration: none;
  color: blue;
`;

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

const StyleMyApplication = styled.div`
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
    margin-bottom: 15px;
    border: none;
    font-size: 12px;
    color: #424242;
    background-color: white;
  }

  p#content {
    margin: auto;
  }
`;

// export const MyApplicationList = () => {
//   const [myApplicationList, setMyApplicationList] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("accessToken"); // 로컬스토리지에서 토큰 가져오기
//         const list = await getMyApplicationList(token); // 비동기 호출
//         setMyApplicationList(list);
//       } catch (error) {
//         console.error("Error fetching myApplication list:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {myApplicationList.map((application) => (
//         <div key={application.id}>{/* ui 구성 */}</div>
//       ))}
//     </div>
//   );
// };

export default MyApplicationList;
