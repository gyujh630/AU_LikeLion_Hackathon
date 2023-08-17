import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyApplicationList } from "../../components/sub/MyApplicationList";
import ApplyModal from "../../components/modal/ApplyModal";
import { getMyApplicationList } from "../../services/MyPageAPI";

const Application = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); //modal 열고 닫는 상태
  const [applicationDataList, setApplicationDataList] = useState([]);

  useEffect(() => {
    fetchMyApplicationList();
  }, []);

  const fetchMyApplicationList = async () => {
    console.log("실행");
    try {
      const response = await getMyApplicationList();

      if (response && Array.isArray(response.apply)) {
        // user 정보를 객체의 userId를 기반으로 찾아서 추가
        const updatedList = response.apply.map((item) => {
          const user = response.user; // user 정보
          const matchedUser = user && user.userId === item.userId ? user : null;

          return {
            ...item,
            userName: matchedUser ? matchedUser.name : "Unknown", // userName 추가
          };
        });

        setApplicationDataList(updatedList);
      } else {
        console.error("Invalid data format:", response);
      }
    } catch (error) {
      console.error("Error fetching application list:", error);
    }
  };

  const handleModalConfirm = async () => {
    // 모달 확인 버튼을 누를 때의 동작을 처리합니다.
    // 수혜 신청 완료 후 상태 업데이트를 진행하고, 리스트를 다시 불러옵니다.
    setModalIsOpen(false); // 모달을 닫습니다.
    await fetchMyApplicationList();
  };

  return (
    <StyleApplication>
      <div id="title-box">
        <button id="apply-btn" onClick={() => setModalIsOpen(true)}>
          수혜 신청하기
        </button>
      </div>
      <main>
        {/* data 배열을 반복 -> 컴포넌트 생성 */}
        {applicationDataList.map((data, index) => (
          <Link
            key={index}
            to={`/mypage/application/${data.applyId}`}
            state={data.applyId}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {/* 클릭하면 해당 항목의 상세 페이지로 이동 */}
            <MyApplicationList data={data} />
          </Link>
        ))}
      </main>
      {/* 모달 부분 */}
      {modalIsOpen && (
        <ApplyModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onConfirm={handleModalConfirm}
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
    margin-bottom: 20px;
  }

  button#apply-btn {
    font-weight: bold;
    margin: auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #336ba3;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    width: 300px;
    margin: 20px 0;
    transition: background-color 0.3s;

    &:hover {
      background-color: #afcce1;
    }
  }
`;

export default Application;
