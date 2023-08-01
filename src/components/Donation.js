import React from "react";

const Donation = () => {
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
      <h2>기부 목록</h2>
    </div>
  );
};

export default Donation;
