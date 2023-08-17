import styled from "styled-components";

function About() {
  return (
    <CustomAbout>
      <h2 style={{ fontSize: "28px" }}>
        DA가치
        <span style={{ fontSize: "20px", fontWeight: "300" }}>는</span>
      </h2>
      <p>Digital Advance를 다 같이 누리는 세상을 만들어갑니다.</p>
      <p style={{ marginBottom: "150px" }}>
        잠시 잊혀진 기기들이 새로운 가치를 찾는 과정에 함께하세요!
      </p>

      <div className="container">
        <div className="img-container">
          <img
            src={process.env.PUBLIC_URL + "/imgs/edit.png"}
            style={{ width: "60px", height: "60px" }}
          />
        </div>
        <div className="text-box" style={{ textAlign: "left" }}>
          <p>
            기부자들이 볼 수 있도록 <br></br>수혜자가 필요한 기기 신청 글을
            올립니다.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="text-box" style={{ textAlign: "right" }}>
          <p>
            기부자는 수혜자가 올린 글을 확인하고 <br></br>자신이 보유한 기기가
            있다면 기부를 신청합니다
          </p>
        </div>
        <div className="img-container">
          <img src={process.env.PUBLIC_URL + "/imgs/tap.png"} />
        </div>
      </div>
      <div className="container">
        <div className="img-container">
          <img src={process.env.PUBLIC_URL + "/imgs/delivery-truck.png"} />
        </div>
        <div className="text-box" style={{ textAlign: "left" }}>
          <p>
            신청이 완료되면, 기부자는 <br></br>수혜자가 등록한 공공 기관으로
            택배를 보냅니다.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="text-box" style={{ textAlign: "right" }}>
          <p>
            수혜자가 공공기관에서 기기를 수령합니다.<br></br> 잘 수령하였다면
            기부자에게 감사 인사를 보내주세요!
          </p>
        </div>
        <div className="img-container">
          <img src={process.env.PUBLIC_URL + "/imgs/package.png"} />
        </div>
      </div>
    </CustomAbout>
  );
}

const CustomAbout = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 20px;
    font-weight: 300;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
  }

  .text-box {
    flex: 9;
    margin: auto;
  }

  img {
    flex: 1;
    width: 70px;
    height: 70px;
    margin: auto;
    padding: 30px;
  }

  .img-container {
    border-radius: 50%;
    border: 2.5px solid black;
    margin: 0 20px 0 20px;
  }
`;

export default About;
