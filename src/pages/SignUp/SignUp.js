import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="SignUp" style={{ marginTop: "100px" }}>
      <div style={styles.container}>
        <h1>회원가입</h1>
        <nav>
          <Link to="/signup/receiver">
            <button style={styles.button}>수혜자 가입하기</button>
          </Link>
          <Link to="/signup/donator">
            <button style={styles.button}>기부자 가입하기</button>
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
  button: {
    margin: "40px",
    minHeight: "300px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
    borderRadius: "4px",
    cursor: "pointer",
    width: "250px",
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default SignUp;
