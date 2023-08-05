import { getMyApplicationList } from "../../services/api";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Modal from "react-modal";

Modal.setAppElement("#root"); //스크린 리더가 모달 이외의 컨텐츠를 읽지 않도록 설정

export const MyApplicationList = () => {
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setUserChoice("예");
    //   try {
    //     // status를 3(수령완료)로 업데이트하는 API 호출
    //     const token = localStorage.getItem("accessToken");
    //     // await updateApplicationStatus(token, 3); // 예시 API 호출 (실제 API 함수명 및 호출 방식에 맞게 수정 필요)
    //   } catch (error) {
    //     console.error("Error updating application status:", error);
    //   }
    setStatus((prevStatus) => prevStatus + 1); //test용 코드
    handleCloseModal();
  };

  const handleCancel = () => {
    setUserChoice("아니오");
    handleCloseModal();
  };

  // 예시 dataSet
  const data = {
    userName: "홍길동",
    devicetype: "노트북",
    content:
      "너무 필요해여너무너무너무너무너무너무너무너무너무 필요합니다. 너무 필요해여너무너무너무너무너무너무너무너무너무 필요합니다 너무 필요해여너무너무너무너무너무너무너무너무너무 필요합니다 너무 필요해여너무너무너무너무너무너무너무너무너무 필요합니다",
    date: "2023/08/02",
    status: 0,
  };

  const [status, setStatus] = useState(data.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userChoice, setUserChoice] = useState(null);

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
            <p>{data.date}</p>
          </div>
          <StyledStatusButton
            status={status}
            onClick={() => {
              if (status === 2) {
                handleOpenModal();
              }
            }}
          >
            {status === 0
              ? "매칭 준비중"
              : status === 1
              ? "매칭 완료"
              : status === 2
              ? "배송중 · 수령 시 클릭"
              : "수령 완료"}
          </StyledStatusButton>
        </div>
        <div id="apply-bottom">
          <div id="apply-content">
            <p id="content">{data.content}</p>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        overlayClassName="CustomModal__Overlay"
      >
        <div>
          <p>기기를 수령 하셨나요?</p>
          <ModalButton onClick={handleConfirm}>예</ModalButton>
          <ModalButton onClick={handleCloseModal}>아니오</ModalButton>
        </div>
      </CustomModal>
    </StyleMyApplication>
  );
};

const StyledStatusButton = styled.button`
  flex: 2;
  padding: 0px;
  margin: 15px;
  height: 30px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: #4caf50;
  font-weight: bold;

  ${(props) =>
    props.status === 2 &&
    css`
      cursor: pointer;
    `}
`;

const StyleMyApplication = styled.div`
  div {
    display: flex;
    max-width: 900px;
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

const CustomModal = styled(Modal)`
  // overlay 스타일 설정
  &.ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // content 스타일 설정
  &.ReactModal__Content {
    width: 300px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ModalButton = styled.button`
  margin-top: 40px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
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
