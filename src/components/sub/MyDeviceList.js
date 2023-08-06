import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MyDeviceList = ({ deviceInfo }) => {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    // 클릭한 기기의 세부 정보 페이지로 이동합니다
    navigate(`/device/${deviceInfo.device_id}`);
  };

  return (
    <BoxWrapper onclick={handleBoxClick}>
      {/* <h3>기기 정보</h3> */}
      <DeviceImage src={deviceInfo.image} alt={deviceInfo.model} />
      <DeviceInfo>
        <p>모델: {deviceInfo.model}</p>
        <p>사용 기간: {deviceInfo.usedDate}</p>
        <p>상태: {deviceInfo.condition}</p>
        <p>등록일: {deviceInfo.date}</p>
      </DeviceInfo>
    </BoxWrapper>
  );
};

const BoxWrapper = styled.div`
  width: 80%;
  margin: 0 auto; /* 가운데 정렬 */
  display: flex;
  flex-direction: row; /* 가로로 배치 */
  justify-content: space-around;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const DeviceImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const DeviceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
`;

export default MyDeviceList;
