import styled from "styled-components";
import { MyApplicationList } from "./sub/MyApplicationList";
import { getMyApplicationList } from "../../services/api";
import { DeliveryStatusProvider } from "../contexts/DeliveryStatusContext";

const Application = () => {
  const applicationDataList = [
    {
      userName: "홍길동",
      devicetype: "노트북",
      content: "너무 필요합니다",
      date: "2023/08/02",
      status: 2,
    },
    {
      userName: "홍길동",
      devicetype: "스마트폰",
      content: "안녕하세요~",
      date: "2023/08/03",
      status: 1,
    },
    {
      userName: "홍길동",
      devicetype: "태블릿",
      content: "아이패드 주세요",
      date: "2023/08/04",
      status: 0,
    },
    {
      userName: "홍길동",
      devicetype: "스마트폰",
      content: "폰이 없어요",
      date: "2023/08/04",
      status: 2,
    },
  ];
  return (
    <StyleApplication>
      <div id="title-box">
        <h2>수혜 신청 목록</h2>
        <button id="apply-btn">수혜 신청하기</button>
      </div>
      <main>
        {/* DeliveryStatusProvider로 감싸기 */}
        <DeliveryStatusProvider>
          {/* data 배열을 반복 -> 컴포넌트 생성 */}
          {applicationDataList.map((data, index) => (
            <MyApplicationList key={index} data={data} />
          ))}
        </DeliveryStatusProvider>
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
  }
`;

export default Application;
