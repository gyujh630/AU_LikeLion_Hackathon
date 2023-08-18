import styled from "styled-components";
import { useState, useEffect } from "react";
import { MyDonationList } from "../../components/sub/MyDonationList";
import { getDonationList } from "../../services/MyPageAPI";

const Donation = () => {
  const [donationDataList, setDonationDataList] = useState([]);

  useEffect(() => {
    fetchDonationList();
  }, []);

  const fetchDonationList = async () => {
    try {
      const response = await getDonationList();
      const newlist = [];

      response.forEach((data) => {
        const mergedData = {
          ...data.apply,
          ...data.user,
          ...data.device,
        };
        newlist.push(mergedData);
      });
      setDonationDataList(newlist);
      console.log(newlist);
    } catch (error) {
      console.error("Error fetching application list:", error);
    }
  };

  const handleDonationListUpdate = () => {
    fetchDonationList();
  };

  return (
    <StyleDonation>
      <div id="title-box">{/* <h2>기부 목록</h2> */}</div>
      <main>
        {/* DeliveryStatusProvider로 감싸기 */}
        {/* data 배열을 반복 -> 컴포넌트 생성 */}
        {donationDataList.map((data, index) => (
          <MyDonationList
            key={index}
            data={data}
            onUpdateDonationList={handleDonationListUpdate}
          />
        ))}
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
