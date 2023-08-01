import styled from "styled-components";
import { useState, useEffect } from "react";
import { getMyApplicationList } from "../services/api";

const StyleApplication = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;

  button#apply-btn {
    margin: auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 200px;
    margin-top: 20px;
  }

  hr {
    border: 0.5px solid #ccc; /* 구분선의 두께와 스타일을 설정 */
    margin: 20px 0; /* 구분선 위아래 여백을 설정 */
  }
`;

const Application = () => {
  const [myApplicationList, setMyApplicationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const token = localStorage.getItem("accessToken"); //로컬스토리지에서 토큰 가져오기
        const list = await getMyApplicationList(token); // 수혜 신청 리스트 가져오기
        setMyApplicationList(list);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchMyApplications();
  }, []);

  // if (loading) {
  //   return <p>불러오는 중...</p>;
  // }

  return (
    <StyleApplication>
      <button id="apply-btn">수혜 신청하기</button>
      <hr /> {/* 수평 구분선 추가 */}
      <main>
        <ul>
          {myApplicationList.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </main>
    </StyleApplication>
  );
};

export default Application;
