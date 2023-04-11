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

export default function Game() {
  const [showBlink, setShowBlink] = useState(true);

  const showBlinkByTime = () => {
    setShowBlink(true);
    setTimeout(() => setShowBlink(false), 1000);
  };

  useEffect(() => {
    showBlinkByTime();
  }, []);

  return (
    <>
      {showBlink && <StyledBlink>CAT</StyledBlink>}
      <Content bg="#F2C94C">
        <div>type what you saw</div>
        <button onClick={showBlinkByTime}>Pokaż diva</button>
      </Content>
    </>
  );
}
