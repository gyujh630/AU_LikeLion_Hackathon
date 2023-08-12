import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function SignUp() {
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  // const onSubmit = (data) => console.log(data);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/users/join/receiver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // 회원가입 성공 처리
      } else {
        // 회원가입 실패 처리
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="SignUp" style={{ marginTop: "100px" }}>
      <div style={styles.container}>
        <h1>회원가입 - 수혜자</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              <span style={{ display: "inline-block", width: "100px" }}>
                아이디
              </span>
            </label>
            <input
              name="email"
              placeholder="이메일"
              {...register("email")}
              style={styles.input}
            />
            {errors.email && (
              <div
                style={{ marginLeft: "100px", marginTop: "10px", color: "red" }}
              >
                {errors.email.message}
              </div>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              <span style={{ display: "inline-block", width: "100px" }}>
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
                style={{ marginLeft: "100px", marginTop: "10px", color: "red" }}
              >
                {errors.password.message}
              </div>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              <span style={{ display: "inline-block", width: "100px" }}>
                비밀번호 확인
              </span>
            </label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm")}
              style={styles.input}
            />
            {errors.passwordConfirm && (
              <div
                style={{ marginLeft: "100px", marginTop: "10px", color: "red" }}
              >
                {errors.passwordConfirm.message}
              </div>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              <span style={{ display: "inline-block", width: "100px" }}>
                프로필 사진
              </span>
            </label>
            <input type="file" placeholder="프로필 사진" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              <span style={{ display: "inline-block", width: "100px" }}>
                수혜자 인증
              </span>
            </label>
            <input
              type="file"
              placeholder="수혜자 인증 파일"
              style={styles.input}
            />
          </div>
          <input
            type="submit"
            // disabled={errors || watch()}
            style={styles.button}
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
    minHeight: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
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
    width: "250px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "250px",
  },
};

export default SignUp;
