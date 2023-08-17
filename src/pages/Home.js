// Home.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getDeviceCount } from "../services/HomeAPI";
import { isLogin, getUserCategory } from "../constants/auth";
import "../styles/global.css";

const Home = () => {
  // TODO :: api 연결 후 하드코딩 숫자 지워야 함

  // device 수 가져오기
  const [deviceCounts, setDeviceCounts] = useState(null);

  useEffect(() => {
    fetchDeviceCounts();
  }, []);

  const fetchDeviceCounts = async () => {
    try {
      const counts = await getDeviceCount();
      setDeviceCounts(counts);
    } catch (error) {
      console.error("Error fetching device counts:", error);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <StyledHome>
        <header>
          <h1>
            DA가치는 기부자와 수혜자를 연결해
            <br />
            기술의 힘을 모두가 누리는 세상을 꿈꿉니다.
          </h1>
          <nav>
            <Link to="/postlist">
              <button>등록된 글 보기</button>
            </Link>
            {isLogin() && (
              <>
                {getUserCategory() === "1" ? (
                  <Link to="/mypage/application">
                    <button>수혜 신청하기</button>
                  </Link>
                ) : (
                  <Link to="/mypage/device">
                    <button>내 기기 새 주인 찾아주기</button>
                  </Link>
                )}
              </>
            )}
          </nav>
        </header>
        <main>
          <section style={{ marginBottom: "50px" }}>
            <div className="circle-container">
              <div className="circle">
                <span>
                  스마트폰
                  <br />
                  <span className="count">{deviceCounts?.smartphoneNum}대</span>
                </span>
              </div>
              <div className="circle">
                <span>
                  태블릿
                  <br />
                  <span className="count">{deviceCounts?.tabletNum}대</span>
                </span>
              </div>
              <div className="circle">
                <span>
                  노트북
                  <br />
                  <span className="count">{deviceCounts?.labtopNum}대</span>
                </span>
              </div>
            </div>
          </section>
          <h2>
            총{" "}
            <span style={{ fontSize: "2em", marginRight: "2px" }}>
              {deviceCounts?.totalNum}
            </span>
            대가 새 주인을 찾았어요!
          </h2>
          <section></section>
        </main>
      </StyledHome>
    </div>
  );
};

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
    font-weight: 800;
  }

  nav {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    justify-content: center; /* 가로 방향 가운데 정렬 추가 */
  }

  button {
    padding: 10px 20px;
    background-color: var(--color-blue);
    color: white;
    border: none;
    margin-top: 10px;
    border-radius: 50px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: var(--color-light-blue);
  }

  main {
    h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }

    // section {
    //   button {
    //     margin-right: 10px;
    //   }

    //   button:last-child {
    //     margin-right: 0;
    //   }
    // }
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
    border: 1px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .circle span {
    font-weight: bold;
    font-size: 24px;
  }

  .circle .count {
    font-size: 20px;
    font-weight: normal;
  }
`;

export default Home;
