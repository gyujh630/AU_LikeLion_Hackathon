import React from "react";

const Profile = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        minHeight: "calc(100vh - 100px)", // Adjust the height to account for the SubNavigation height
      }}
    >
      <h2>내 정보</h2>
    </div>
  );
};

export default Profile;
