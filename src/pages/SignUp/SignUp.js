import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import styled from "styled-components";

function SignUp() {
  return (
    <div className="SignUp" style={{ marginTop: "100px" }}>
      <div style={styles.container}>
        <h1 style={{ fontSize: "28px", marginBottom: "40px" }}>회원가입</h1>
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            height: "300px",
            justifyContent: "space-evenly",
          }}
        >
          <Link to="/signup/receiver">
            <CustonButton>수혜자 가입하기</CustonButton>
          </Link>
          <Link to="/signup/donator">
            <CustonButton>기부자 가입하기</CustonButton>
          </Link>
        </nav>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // minHeight: "100vh",
  },
};

const CustonButton = styled.button`
  margin: 0px;
  padding: 30px 20px;
  font-size: 16px;
  background-color: white;
  color: black;
  border: 3px solid black;
  border-radius: 50px;
  cursor: pointer;
  width: 300px;
  font-size: 24px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    border: 3px solid #6296bb;
    color: #6296bb;
  }
`;

export default SignUp;
