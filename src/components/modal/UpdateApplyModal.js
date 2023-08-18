import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { updateApplication } from "../../services/MyPageAPI";

Modal.setAppElement("#root");

const UpdateApplyModal = ({ isOpen, onClose, onConfirm, props }) => {
  console.log(props);
  const [content, setContent] = useState(props.content);
  const [address, setAddress] = useState(props.address);
  const [deviceType, setDeviceType] = useState(props.deviceType);

  const handleConfirm = async () => {
    const data = {
      deviceType: deviceType,
      address: address,
      content: content,
    };

    try {
      await updateApplication(props.applyId, data);
      onConfirm();
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <Modal style={ModalStyles} isOpen={isOpen} onRequestClose={onClose}>
      <div style={ModalHeader}>
        <CloseButton
          style={{ padding: 0 }}
          type="button"
          className="close"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </CloseButton>
      </div>
      <CustomApply>
        <h2>신청내용 수정</h2>
        <div id="apply">
          <div id="apply-top">
            <div id="apply-profile-image"></div>
            {/* 추후 img로 변경*/}
            <div id="apply-profile">
              <p id="user-apply-name">{props.name}</p>
              <div id="select-box">
                <p
                  style={{
                    fontSize: "14px",
                    margin: "auto",
                    marginRight: "6px",
                  }}
                >
                  필요한 기기
                </p>
                <CustomSelect
                  id="device-type"
                  name="device-type"
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                >
                  <option value="스마트폰">스마트폰</option>
                  <option value="태블릿">태블릿</option>
                  <option value="노트북">노트북</option>
                </CustomSelect>
              </div>
            </div>
          </div>
        </div>
        <CustomTextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div
          id="address"
          style={{
            flexDirection: "column",
            justifyContent: "left",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "8px",
            }}
          >
            수령위치
          </p>
          <p style={{ margin: 0, fontSize: "13px", marginBottom: "8px" }}>
            가까운 행정복지센터를 입력해주세요.
          </p>
          <CustomInput
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <SubmitButton
          onClick={handleConfirm}
          disabled={content === "" || address === ""}
        >
          제출
        </SubmitButton>
      </CustomApply>
    </Modal>
  );
};

const ModalStyles = {
  overlay: {
    zIndex: 1000,
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.3)", //모달 바깥 배경
    overflow: "hidden",
  },

  content: {
    minHeight: "400px",
    width: "70%",
    height: "70%",
    borderRadius: "30px",
    padding: "20px",
    overflowY: "auto", //스크롤 허용
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    // justifyContent: "space-evenly",
    backgroundColor: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  },
};

const ModalHeader = {
  width: "100%",
  display: "flex",
  height: "20px",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  padding: 0,
};

const CloseButton = styled.button`
  padding: 12px;
  background-color: transparent;
  border: none;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  color: white;
  border: none;
  background-color: grey;
  font-size: 15px;
  width: 150px;
  font-weight: bold;
  border-radius: 50px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled }) => (disabled ? "grey" : "#6296bb")};
`;

const CustomSelect = styled.select`
  padding: 2px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CustomApply = styled.main`
  width: 80%;
  div {
    display: flex;
  }

  div#apply {
    width: 100%;
  }

  div#apply-top {
    width: 100%;
    flex-direction: row;
    margin: auto;
    margin-bottom: 20px;
  }

  p#user-apply-name {
    font-weight: bold;
    font-size: 16px;
    margin: 0;
  }

  div#apply-profile {
    flex-direction: column;
    text-align: left;
    justify-content: space-evenly;
    margin-left: 12px;
  }

  div#apply-profile-image {
    flex: none;
    height: width;
    width: 50px;
    height: 50px;
    background-color: grey;
    border-radius: 50%;
  }
`;

const CustomStyledTextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 13px;
  font-size: 13px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #ccc;
  margin-bottom: 30px;
  resize: none;
`;

const CustomTextArea = ({ value, onChange }) => {
  return (
    <CustomStyledTextArea
      value={value}
      onChange={onChange}
      placeholder={
        "예시) 안녕하세요. 저는 60대 노인이며 스마트폰을 통해 더 편리한 삶을 살고 싶습니다. 가족들과의 연락이나 건강 정보 접근 등을 위해 스마트폰이 필요합니다. 온라인 커뮤니티나 뉴스에도 쉽게 접근하며, 좀 더 다양한 취미를 즐길 수 있을 것 같습니다. 디지털 기기를 통해 더욱 활기찬 노후를 보낼 수 있다면 좋겠습니다. 혹시 도움을 주실 수 있다면 감사하겠습니다."
      }
    />
  );
};

const CustomInput = styled.input`
  width: 50%;
  border: 1px solid #ccc;
  font-size: 14px;
  height: 20px;
  border-radius: 4px;
`;

export default UpdateApplyModal;
