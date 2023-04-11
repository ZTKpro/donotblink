import styled from "styled-components";

const yellowColor = "#F2C94C";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
`;

const StyledRound = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: ${yellowColor};
  opacity: ${(props) => (props.active ? 1 : 0.3)};
`;

export default function Progress(props) {
  return (
    <StyledWrapper>
      {[...Array(props.many).keys()].map((item) => {
        return <StyledRound active={item < props.level} key={item} />;
      })}
    </StyledWrapper>
  );
}
