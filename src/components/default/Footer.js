import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <a
          href="https://github.com/orgs/AjouLion/repositories"
          target="_blank"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "6px",
          }}
        >
          <FontAwesomeIcon
            icon={faGithub}
            fontSize={"23px"}
            style={{ cursor: "pointer" }}
          />
        </a>
        <p style={styles.p}>
          &copy; {new Date().getFullYear()} LIKELION UNIV. 11TH HACKATHON
          <br />
          아주대학교 다같이돌자동네한바퀴 팀
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    left: "0",
    bottom: "0",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  p: {
    fontSize: "12px",
    marginLeft: "6px",
  },
};

export default Footer;
