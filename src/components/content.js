import styled from "styled-components";

const yellowColor = "#F2C94C";
const blackColor = "#000";

const StyledWrapper = styled.div`
  background-color: ${(props) =>
    props.color === "light" ? yellowColor : blackColor};
  color: ${(props) => (props.color === "light" ? blackColor : yellowColor)};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "column"};
  align-items: center;
  justify-content: center;
`;

export default function Content(props) {
  return (
    <StyledWrapper color={props.color} flexDirection={props.flexDirection}>
      {props.children}
    </StyledWrapper>
  );
}
