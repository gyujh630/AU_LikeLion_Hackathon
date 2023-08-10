import styled from "styled-components";
import { MyApplicationList } from "./sub/MyApplicationList";
import { DeliveryStatusProvider } from "../contexts/DeliveryStatusContext";

const Application = () => {
  return (
    <StyleApplication>
      <div id="title-box">
        <h2>수혜 신청 목록</h2>
        <button id="apply-btn">수혜 신청하기</button>
      </div>
      <main>
        {/* DeliveryStatusProvider로 감싸기 */}
        <DeliveryStatusProvider>
          <MyApplicationList />
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
    right: 35px;
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
