// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} GROWL TO-GROWTH
        <br />
        LIKELION UNIV. 11TH HACKATHON
        <br />
        아주대학교 00팀
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
  },
};

export default Footer;
