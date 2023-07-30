import React from "react";

const Application = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        minHeight: "calc(100vh - 100px)", // Adjust the height to account for the SubNavigation height
        marginTop: "100px",
      }}
    >
      <h2>수혜 신청 목록</h2>
    </div>
  );
};

export default Application;
