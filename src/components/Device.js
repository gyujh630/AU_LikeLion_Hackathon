import React from "react";

const Device = () => {
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
      <h2>등록된 기기</h2>
    </div>
  );
};

export default Device;
