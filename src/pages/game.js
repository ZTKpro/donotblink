import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Content from "@/components/content";

const StyledBlink = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  color: #f2c94c;
  font-weight: 500;
  font-size: 96px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1268px) {
    font-size: 60px;
  }
`;

const StyledInput = styled.input`
  margin: 40px auto;
  text-transform: uppercase;
  background-color: transparent;
  border: 0;
  font-size: 96px;
  width: 100%;
  text-align: center;
  caret-color: #000;
`;

export default function Game() {
  const [showBlink, setShowBlink] = useState(true);
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const showBlinkByTime = () => {
    setShowBlink(true);
    setTimeout(() => setShowBlink(false), 1000);
  };

  useEffect(() => {
    showBlinkByTime();
  }, []);

  const checkWord = (event) => {
    const newValue = event.target.value.toUpperCase();
    const isValidValue = newValue === "CAT";
    setValue(newValue);
    setIsValid(isValidValue);
  };

  return (
    <>
      {showBlink && <StyledBlink>CAT</StyledBlink>}
      <Content color={isValid ? "dark" : "light"}>
        {!isValid && <div>type what you saw</div>}
        <StyledInput type="text" value={value} onChange={checkWord} />
        {/* <button onClick={showBlinkByTime}>Pokaż diva</button> */}
      </Content>
    </>
  );
}
