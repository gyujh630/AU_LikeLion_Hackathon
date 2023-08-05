import styled from "styled-components";
import { MyDonationList } from "./sub/MyDonationList";

const Donation = () => {
  return (
    <StyleDonation>
      <div id="title-box">
        <h2>기부 목록</h2>
      </div>
      <main>
        <MyDonationList />
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
