import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const navigate = useNavigate(); //변수 할당시켜서 사용
  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동
  };
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      fontSize={"25px"}
      onClick={onClickBtn}
      style={{
        padding: "20px",
        marginTop: "10px",
        marginBottom: "12px",
        cursor: "pointer",
      }}
    />
  );
};

export default BackButton;
