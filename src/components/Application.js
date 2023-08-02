import styled from "styled-components";
import { MyApplicationList } from "./sub/MyApplicationList";

const Application = () => {
  return (
    <StyleApplication>
      <div id="title-box">
        <h2>수혜 신청 목록</h2>
        <button id="apply-btn">수혜 신청하기</button>
      </div>
      <main>
        {/* <MyApplicationList /> */}
        <div id="apply-box">
          {/* css 테스트코드 */}
          <div id="apply-top">
            <div id="apply-profile-image">image</div>
            <div id="apply-profile">
              <p>
                이름
                <br />
                필요한 기기
              </p>
            </div>
            <div id="apply-date">등록일자</div>
            <div id="apply-status">상태</div>
          </div>
          <div id="apply-bottom">
            <div id="apply-content">
              <p>필요한 이유</p>
            </div>
          </div>
        </div>
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

  main {
    width: 100%;
  }

  div#title-box {
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;
  }

  button#apply-btn {
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

  //apply box
  div {
    display: flex;
  }

  div#apply-box {
    border: 1px solid black;
    flex-direction: column;
    margin: auto;
    width: 70%;
  }

  div#apply-top,
  div#apply-bottom {
    width: 100%;
    justify-content: space-around;
  }

  div#apply-status {
    flex: 1;
    padding: 10px;
  }

  div#apply-profile-image {
    flex: none;
    margin: auto;
    height: width;
    width: 60px;
    height: 60px;
    margin-left: 10px;
  }

  div#apply-date,
  div#apply-profile {
    flex: 4;
    padding: 10px;
  }

  div#apply-content {
    padding: 10px;
    min-height: 60px;
    width: 95%;
    margin: 10px;
    border: 1px solid black;
  }
`;

export default Application;
