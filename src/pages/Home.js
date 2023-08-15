// Home.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  header {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 24px;
    line-height: 1.5;
  }

  nav {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    justify-content: center; /* 가로 방향 가운데 정렬 추가 */
  }

  button {
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #555;
  }

  main {
    h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }

    section {
      button {
        background-color: #007bff;
        margin-right: 10px;
      }

      button:last-child {
        margin-right: 0;
      }
    }
  }
  .circle-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
  }

  .circle-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
  }

  .circle {
    width: 130px;
    height: 130px;
    background-color: white; /* 배경색 변경 */
    border: 2px solid black; /* 검정색 border 추가 */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .circle span {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 5px;
  }

  .circle .count {
    font-size: 20px;
    font-weight: normal;
  }
`;

const Home = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <StyledHome>
        <header>
          <h1>
            기부자와 수혜자를 연결해
            <br />
            기술의 힘을 모두가 누리는 세상을 꿈꿉니다.
          </h1>
          <nav>
            <Link to="/postlist">
              <button>등록된 글 보기</button>
            </Link>
            <Link to="/mypage/application">
              <button>수혜 신청하기</button>
            </Link>
          </nav>
        </header>
        <main>
          <section style={{ marginBottom: "50px" }}>
            <div className="circle-container">
              <div className="circle">
                <span>
                  스마트폰
                  <br />
                  <span className="count">112대</span>
                </span>
              </div>
              <div className="circle">
                <span>
                  태블릿
                  <br />
                  <span className="count">52대</span>
                </span>
              </div>
              <div className="circle">
                <span>
                  노트북
                  <br />
                  <span className="count">43대</span>
                </span>
              </div>
            </div>
          </section>
          <h2>
            총 <span style={{ fontSize: "2em" }}>207</span>대가 새 주인을
            찾았어요!
          </h2>
          <section>
            <Link to="/mypage/device">
              <button>내 기기 새 주인 찾아주기</button>
            </Link>
          </section>
        </main>
      </StyledHome>
    </div>
  );
};

export default Home;
