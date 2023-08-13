import { useState } from "react";
import ApplyModal from "../components/modal/ApplyModal";

const PostList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); //modal 열고 닫는 상태

  return (
    <div style={{ marginTop: "100px" }}>
      <div style={styles.container}>
        <h1>수혜 신청 목록</h1>
        <button onClick={() => setModalIsOpen(true)} style={styles.button}>
          수혜 신청하기
        </button>
        {/* 수혜 신청 글 목록 코드 추가 */}
        {/* API를 통해 서버에서 글 목록을 받아와서 각 글을 리스트로 표시 */}
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
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "200px",
    marginTop: "20px",
  },
};

export default PostList;
