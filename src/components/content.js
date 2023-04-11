import styled from "styled-components";

const yellowColor = "#F2C94C";

const StyledWrapper = styled.div`
  background-color: ${(props) => props.bg || "#000"};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "column"};
  align-items: center;
  justify-content: center;
`;

export default function Content(props) {
  return (
    <StyledWrapper bg={props.bg} flexDirection={props.flexDirection}>
      {props.children}
    </StyledWrapper>
  );
}
