import styled from "styled-components";
const StyleApplication = styled.section`
  display: flex;
  justifycontent: center;
  minheight: calc(
    100vh - 100px
  ); // Adjust the height to account for the SubNavigation height
  margintop: 100px;

  Button {
    margin: auto;
  }
`;

const Application = () => {
  return (
    <StyleApplication>
      <button>새 글 등록</button>
      <main>{/* 수혜 신청 리스트 */}</main>
    </StyleApplication>
  );
};

export default Application;
