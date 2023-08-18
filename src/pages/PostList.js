import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ApplyModal from "../components/modal/ApplyModal";
import ApplicationList from "../components/sub/ApplicationList";
import { DeliveryStatusProvider } from "../contexts/DeliveryStatusContext";
import { getUserCategory, isLogin } from "../constants/auth";
import { getApplicationList } from "../services/PostListAPI";

const PostList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); //modal 열고 닫는 상태
  const [applicationDataList, setApplicationDataList] = useState([]);

  useEffect(() => {
    fetchApplicationList();
  }, []);

  const fetchApplicationList = async () => {
    try {
      const response = await getApplicationList();
      const newlist = [];

      response.forEach((data) => {
        const mergedData = {
          ...data.apply,
          ...data.user,
        };
        newlist.push(mergedData);
      });

      setApplicationDataList(newlist);
    } catch (error) {
      console.error("Error fetching application list:", error);
    }
  };

  return (
    <CustomPostList>
      <div style={{ marginTop: "100px" }}>
        <div style={styles.container}>
          <h1 style={{ fontSize: "28px" }}>수혜 신청 목록</h1>
          <div id="postlist-top">
            {/* <div id="postlist-filter">필터</div> */}
            {isLogin() && getUserCategory() === "1" && (
              <button
                id="apply-btn"
                onClick={() => setModalIsOpen(true)}
                style={styles.button}
              >
                수혜 신청하기
              </button>
            )}
          </div>
          <main>
            <DeliveryStatusProvider>
              {/* data 배열을 반복 -> 컴포넌트 생성 */}
              {applicationDataList.map((data, index) => (
                <Link
                  key={index}
                  to={`/postlist/${data.applyId}`}
                  state={data}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {/* 클릭하면 해당 항목의 상세 페이지로 이동 */}
                  <ApplicationList data={data} />
                </Link>
              ))}
            </DeliveryStatusProvider>
          </main>
        </div>
        {/* 모달 부분 */}
        {modalIsOpen && (
          <ApplyModal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            onConfirm={() => setModalIsOpen(false)}
          />
        )}
      </div>
    </CustomPostList>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const CustomPostList = styled.div`
  main {
    margin-top: 30px;
    width: 100%;
  }

  div#postlist-top {
    width: 85%;
    display: flex;
    justify-content: right;
  }

  button#apply-btn {
    font-weight: bold;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #336ba3;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    width: 150px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #afcce1;
    }
  }
`;

const applicationDataList = [
  {
    applyId: "n3nnkds2kj11a",
    userId: "16",
    userName: "홍길동",
    devicetype: "노트북",
    content: "너무 필요합니다",
    date: "2023-08-02",
    status: 0,
  },
  {
    applyId: "n3nnkds2kj11a",
    userId: "16",
    userName: "홍길동",
    devicetype: "스마트폰",
    content: "안녕하세요~",
    date: "2023-08-03",
    status: 0,
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
  {
    applyId: "n3nnkds2kj11a",
    userId: "16",
    userName: "홍길동",
    devicetype: "스마트폰",
    content: "폰이 없어요",
    date: "2023-08-04",
    status: 0,
  },
];

export default PostList;
