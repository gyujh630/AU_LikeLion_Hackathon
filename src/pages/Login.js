// 로그인 페이지

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../constants/auth";
import "../styles/global.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Login() {
  const navigate = useNavigate();
  const formSchema = yup.object({
    id: yup.string().required("아이디을 입력해주세요."),
    password: yup.string().required("비밀번호를 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      //   if (response.ok) {
      //     // 로그인 성공 처리
      // setLogin("12345", 1); //수혜자 로그인 예시 테스트
      setLogin("12345", 0); //기부자 로그인 예시 테스트

      // localStorage.setItem("category", 1); //예시 (수혜자)
      navigate("/");
      //   } else {
      //     // 로그인 실패 처리
      //   }

      // swal

      if (response.ok) {
      } else if (response.status === 401) {
        MySwal.fire({
          icon: "error",
          text: "회원 정보가 맞지 않습니다.",
          confirmButtonColor: "var(--color-blue)",
          iconColor: "var(--color-blue)",
        });
      } else {
        MySwal.fire({
          icon: "error",
          text: "알 수 없는 오류가 발생했습니다.",
          confirmButtonColor: "var(--color-blue)",
          iconColor: "var(--color-blue)",
        });
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="login" style={{ marginTop: "100px" }}>
      <div style={styles.container}>
        <h1 style={{ fontSize: "28px" }}>로그인</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              <span
                style={{
                  display: "inline-block",
                  width: "60px",
                  marginRight: "20px",
                  textAlign: "center",
                }}
              >
                아이디
              </span>
            </label>
            <input
              name="id"
              placeholder="아이디"
              {...register("id")}
              style={styles.input}
            />
            {errors.id && (
              <div
                style={{
                  marginLeft: "100px",
                  marginTop: "10px",
                  color: "#336ba3",
                }}
              >
                {errors.id.message}
              </div>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              <span
                style={{
                  display: "inline-block",
                  width: "60px",
                  textAlign: "center",
                  marginRight: "20px",
                }}
              >
                비밀번호
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              {...register("password")}
              style={styles.input}
            />
            {errors.password && (
              <div
                style={{
                  marginLeft: "100px",
                  marginTop: "10px",
                  color: "#336ba3",
                }}
              >
                {errors.password.message}
              </div>
            )}
          </div>
          <input
            type="submit"
            disabled={!isValid} // Disable the button based on form validity
            style={{
              ...styles.button,
              backgroundColor:
                isValid && isDirty ? "var(--color-blue)" : "#ccc",
              cursor: isValid && isDirty ? "pointer" : "not-allowed",
            }}
          />
        </form>
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
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px",
  },
  inputGroup: {
    marginBottom: "40px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "200px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    width: "250px",
  },
};

export default Login;
