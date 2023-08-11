import styled from "styled-components";
import { MyDonationList } from "./sub/MyDonationList";
import { getDonationList } from "../services/api";
import { DeliveryStatusProvider } from "../contexts/DeliveryStatusContext";

const Donation = () => {
  const exampleDonateListData = [
    {
      userName: "홍길동",
      devicetype: "노트북",
      content: "너무 필요합니다",
      date: "2023/08/02",
      status: 2,
    },
  ];

  return (
    <StyleDonation>
      <div id="title-box">
        <h2>기부 목록</h2>
      </div>
      <main>
        {/* DeliveryStatusProvider로 감싸기 */}
        <DeliveryStatusProvider>
          {/* data 배열을 반복 -> 컴포넌트 생성 */}
          {applicationDataList.map((data, index) => (
            <MyDonationList key={index} data={data} />
          ))}
        </DeliveryStatusProvider>
      </main>
    </StyleDonation>
  );
};

const StyleDonation = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;
  align-items: center;

  div {
    display: flex;
  }

  main {
    width: 100%;
  }

  div#title-box {
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

export default Donation;
