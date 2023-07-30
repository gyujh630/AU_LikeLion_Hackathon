// PostList.js
import React from "react";

const PostList = () => {
  const handleApplyClick = () => {
    // '수혜 신청하기' 버튼 클릭 시 수혜 신청 폼 뜨도록 추가

    console.log("Apply button clicked!");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div style={styles.container}>
        <h1>수혜 신청 글 목록</h1>
        <button onClick={handleApplyClick} style={styles.button}>
          수혜 신청하기
        </button>
        {/* 수혜 신청 글 목록 코드 추가 */}
        {/* API를 통해 서버에서 글 목록을 받아와서 각 글을 리스트로 표시 */}
      </div>
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
