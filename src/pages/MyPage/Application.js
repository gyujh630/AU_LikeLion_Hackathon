import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MyApplicationList } from "../../components/sub/MyApplicationList";
import { getMyApplicationList } from "../../services/MyPageAPI";
import { DeliveryStatusProvider } from "../../contexts/DeliveryStatusContext";
import ApplyModal from "../../components/modal/ApplyModal";

const Application = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); //modal 열고 닫는 상태
  const applicationDataList = [
    {
      applyId: "n3nnkds2kj11a",
      userId: "16",
      userName: "홍길동",
      devicetype: "노트북",
      content: "너무 필요합니다",
      date: "2023-08-02",
      status: 2,
    },
    {
      applyId: "n3nnkds2kj11a",
      userId: "16",
      userName: "홍길동",
      devicetype: "스마트폰",
      content: "안녕하세요~",
      date: "2023-08-03",
      status: 1,
    },
    {
      applyId: "n3nnkds2kj11a",
      userId: "16",
      userName: "홍길동",
      devicetype: "태블릿",
      content: "아이패드 주세요",
      date: "2023-08-04",
      status: 0,
    },
  ];
  return (
    <StyleApplication>
      <div id="title-box">
        <h2>수혜 신청 목록</h2>
        <button id="apply-btn" onClick={() => setModalIsOpen(true)}>
          수혜 신청하기
        </button>
      </div>
      <main>
        <DeliveryStatusProvider>
          {/* data 배열을 반복 -> 컴포넌트 생성 */}
          {applicationDataList.map((data, index) => (
            <Link
              key={index}
              to={`/mypage/application/${data.applyId}`}
              state={data}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* 클릭하면 해당 항목의 상세 페이지로 이동 */}
              <MyApplicationList data={data} />
            </Link>
          ))}
        </DeliveryStatusProvider>
      </main>
      {/* 모달 부분 */}
      {modalIsOpen && (
        <ApplyModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onConfirm={() => setModalIsOpen(false)}
        />
      )}
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

  button#apply-btn {
    font-weight: bold;
    position: absolute;
    right: 100px;
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
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export default Application;
