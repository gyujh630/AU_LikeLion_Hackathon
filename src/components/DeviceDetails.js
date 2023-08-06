// DeviceDetails.js
import styled from "styled-components";

const DeviceDetails = ({ match }) => {
  // 특정 기기의 정보를 match.params에서 가져옵니다
  const { model } = match.params;

  // 예시 device 정보
  // 예시로 device 정보를 하드코딩
  const device = {
    model: "ipad3",
    usedDate: "3years",
    condition: "2",
    date: "2023-07-07",
    image: "기기사진",
  };

  // 특정 기기 정보를 가져오는 로직 (API 호출 등)을 여기에 추가합니다
  // ...

  return (
    <StyledPage>
      <h2>{model} 기기의 세부 정보</h2>
      <p>기기명: {device.model}</p>
      <p>사용 기간: {device.usedDate}</p>
      <p>상태: {device.condition}</p>
      <p>등록일: {device.date}</p>
      <img src={device.image} alt="기기 이미지" />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  /* 페이지에 대한 스타일 지정 (큰 글씨 등) */
`;

export default DeviceDetails;
