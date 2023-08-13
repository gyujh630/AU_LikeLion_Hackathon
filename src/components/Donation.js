import styled from "styled-components";
import { MyDonationList } from "./sub/MyDonationList";
import { getDonationList } from "../services/MyPageAPI";
import { DeliveryStatusProvider } from "../contexts/DeliveryStatusContext";

const Donation = () => {
  const exampleDonateListData = [
    {
      deviceId: "1",
      userId: "2",
      applyId: "23",
      userName: "홍길동",
      devicetype: "태블릿",
      profile: "profile image",
      model: "아이패드 에어 2 wifi 128GB",
      date: "2023-08-02",
      condition: "2",
      image: "기기 사진",
      status: 1,
      usedDate: "2년",
      deliverNum: "1234567890",
    },

    {
      deviceId: "1",
      userId: "2",
      applyId: "23",
      userName: "홍길동",
      devicetype: "태블릿",
      profile: "profile image",
      model: "아이패드 에어 2 wifi 128GB",
      date: "2023-08-02",
      condition: "2",
      image: "기기 사진",
      status: 2,
      usedDate: "2년",
      deliverNum: "1234567890",
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
          {exampleDonateListData.map((data, index) => (
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
