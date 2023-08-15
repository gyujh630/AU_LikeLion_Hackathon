import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function SignUpReceiver() {
  const formSchema = yup.object({
    name: yup
      .string()
      .required("사용자명을 입력해주세요.")
      .max(10, "최대 10자 까지만 가능합니다"),
    id: yup
      .string()
      .required("아이디를 입력해주세요")
      .max(10, "최대 10자 까지만 가능합니다"),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(20, "최대 20자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
    certification: yup.mixed().required("수혜자 인증 파일을 등록해주세요."),
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

  // const onSubmit = (data) => console.log(data);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      const response = await fetch("/users/join/receiver", {
        method: "POST",
        body: formData, // FormData 사용
      });
      if (response.ok) {
        MySwal.fire({
          icon: "success",
          title: "가입 성공",
          text: "회원가입이 성공적으로 완료되었습니다.",
        });
      } else if (response.status === 409) {
        MySwal.fire({
          icon: "error",
          title: "가입 실패",
          text: "중복된 아이디입니다.",
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "가입 실패",
          text: "알 수 없는 오류가 발생했습니다.",
        });
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="SignUpReceiver" style={{ marginTop: "100px" }}>
      <div style={styles.container}>
        <h1>회원가입</h1>
        <h2>수혜자 회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>
              <span
                style={{
                  display: "inline-block",
                  width: "100px",
                  marginRight: "10px",
                }}
              >
                사용자명 *
              </span>
            </label>
            <input
              name="name"
              placeholder="사용자명"
              {...register("name")}
              style={styles.input}
            />
            {errors.name && (
              <div
                style={{ marginLeft: "100px", marginTop: "10px", color: "red" }}
              >
                {errors.name.message}
              </div>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>
              <span
                style={{
                  display: "inline-block",
                  width: "100px",
                  marginRight: "10px",
                }}
              >
                아이디 *
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
                style={{ marginLeft: "100px", marginTop: "10px", color: "red" }}
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
                  width: "100px",
                  marginRight: "10px",
                }}
              >
                비밀번호 *
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
            <label htmlFor="password" style={styles.label}>
              <span
                style={{
                  display: "inline-block",
                  width: "100px",
                  marginRight: "10px",
                }}
              >
                비밀번호 확인 *
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
            <label htmlFor="profileImg" style={styles.label}>
              <span
                style={{
                  display: "inline-block",
                  width: "100px",
                  marginRight: "10px",
                }}
              >
                프로필 사진
              </span>
            </label>
            <input type="file" placeholder="프로필 사진" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="certification" style={styles.label}>
              <span
                style={{
                  display: "inline-block",
                  width: "100px",
                  marginRight: "10px",
                }}
              >
                수혜자 인증 *
              </span>
            </label>
            <input
              type="file"
              placeholder="수혜자 인증 파일"
              {...register("certification")}
              style={styles.input}
            />
            {errors.certification && (
              <div
                style={{ marginLeft: "100px", marginTop: "10px", color: "red" }}
              >
                {errors.certification.message}
              </div>
            )}
            <div
              style={{
                marginLeft: "110px",
                marginTop: "10px",
                color: "gray",
                fontSize: "14px",
              }}
            >
              거짓 정보 입력 시 불이익이 있을 수 있습니다.
            </div>
          </div>
          <input
            type="submit"
            disabled={!isValid || !isDirty} // Disable the button based on form validity
            style={{
              ...styles.button,
              backgroundColor: isValid && isDirty ? "#4CAF50" : "#ccc",
              cursor: isValid && isDirty ? "pointer" : "not-allowed",
            }}
            // disabled={errors}
            // style={{
            //   ...styles.button,
            //   backgroundColor: errors ? "#ccc" : "#4CAF50",
            // }}
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

export default SignUpReceiver;
