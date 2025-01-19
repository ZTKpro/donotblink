import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";
import Content from "@/components/content";
import Progress from "@/components/progress";

const yellowColor = "#F2C94C";
const blackColor = "#000";

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
  text-transform: uppercase;
  @media (max-width: 1268px) {
    font-size: 60px;
  }
`;

const StyledQuit = styled.p`
  display: none;
  @media (min-width: 1000px) {
    display: block;
    position: absolute;
    left: 50px;
    top: 20px;
    font-size: 60px;
    font-weight: 800;
    cursor: pointer;
  }
`;

const StyledTranslate = styled.p`
  display: none;
  @media (min-width: 1000px) {
    display: block;
    position: absolute;
    left: 150px;
    top: 20px;
    font-size: 60px;
    font-weight: 800;
    cursor: pointer;
  }
`;

const StyledTitle = styled.p`
  font-size: 24px;
`;

const StyledInput = styled.input`
  margin: 40px auto;
  text-transform: uppercase;
  background-color: transparent;
  border: 0;
  font-size: 96px;
  width: 100%;
  text-align: center;
  caret-color: blackColor;
`;

const StyledMenu = styled.div`
  width: 279px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const StyledToolTip = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  @media (max-height: 800px) {
    left: 10%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: min-content;
  }
`;

const StyledSquare = styled.div`
  height: 40px;
  width: 40px;
  background-color: black;
  color: #f2c94c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.color === "light" ? blackColor : yellowColor};
  color: ${(props) => (props.color === "light" ? yellowColor : blackColor)};
`;

const StyledRound = styled.div`
  height: 42px;
  width: 42px;
  background-color: black;
  color: #f2c94c;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
  background-color: ${(props) =>
    props.color === "light" ? blackColor : yellowColor};
  color: ${(props) => (props.color === "light" ? yellowColor : blackColor)};
  &.hover {
    opacity: 0.8;
  }
`;

const StyledTriangle = styled.div`
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 32px solid
    ${(props) => (props.color === "light" ? blackColor : yellowColor)};
  cursor: pointer;
`;

const StyledLinkW = styled.a`
opacity: 0.1;
`

export default function Game() {
  const router = useRouter();

  const [words, setWords] = useState("");
  const [userLvl, setUserLvl] = useState(0);
  const [word, setWord] = useState("");
  const [wordPl, setWordPl] = useState("");
  const [translate, setTranslate] = useState(false);

  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [showBlink, setShowBlink] = useState(true);
  const [blinkUse, setBlinkUse] = useState(3);
  const [skipUse, setSkipUse] = useState(3);

  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const showBlinkFun = () => {
    setIsMouseMoving(false);
    setShowBlink(true);
    setTimeout(() => setShowBlink(false), 1000);
  };

  const showBlinkUser = () => {
    if (blinkUse > 0) {
      setBlinkUse(blinkUse - 1);
      showBlinkFun();
    }
  };

  const nextLevel = () => {
    const fun = () => {
      setIsValid(false);
      setIsMouseMoving(false);
      setValue("");
      setUserLvl(userLvl + 1);
    };

    if (isValid) {
      fun();
    } else if (skipUse > 0) {
      fun();
      setSkipUse(skipUse - 1);
    }
  };

  const translateFun = () => {
    setTranslate(true);
    showBlinkFun();
    setTimeout(() => {
      setTranslate(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getWords");
        const data = await response.json();
        setWords(data.words);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    const handleMouseMove = () => {
      setIsMouseMoving(true);
    };

    const handleKeyDown = (event) => {
      if (event.code === "ArrowUp") {
        setIsMouseMoving(true);
      } else if (event.code === "Enter") {
        showBlinkUser();
      } else if (event.code === "ArrowDown") {
        nextLevel();
      } else if (event.code === "Escape") {
        router.push("/");
      } else if (
        event.code === "ControlLeft" ||
        event.code === "ControlRight"
      ) {
        translateFun();
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsMouseMoving(false);
    }, 5000);
  }, [isMouseMoving]);

  useEffect(() => {
    setWord(words[userLvl]?.word);
    setWordPl(words[userLvl]?.translation);
    showBlinkFun();
  }, [userLvl, words]);

  const checkWord = (event) => {
    const newValue = event.target.value.toUpperCase();
    const isValidValue = newValue === word;
    setValue(newValue);
    setIsValid(isValidValue);
  };

  const header = () => {
    if (showBlink) {
      return;
    }

    if (isValid) {
      return (
        <Progress level={words[userLvl].level} many={words[userLvl]?.length} />
      );
    }

    return (
      <StyledTitle>
        {isMouseMoving
          ? `${value.length}/${words[userLvl]?.length}`
          : "type what you saw"}
      </StyledTitle>
    );
  };

  const theme = isValid ? "dark" : "light";

  return (
    <>
      {showBlink && <StyledBlink>{translate ? wordPl : word}</StyledBlink>}
      <Content color={theme}>
        <StyledQuit onClick={() => router.push("/")}>X</StyledQuit>
        <StyledTranslate onClick={translateFun}>T</StyledTranslate>
        {header()}
        <StyledInput
          type="text"
          value={value}
          onChange={checkWord}
          autoFocus={true}
          onBlur={({ target }) => target.focus()}
        />
        <StyledMenu>
          <StyledSquare onClick={nextLevel} color={theme}>
            {skipUse}
          </StyledSquare>
          <StyledRound onClick={showBlinkUser} color={theme}>
            {blinkUse}
          </StyledRound>
          <StyledTriangle color={theme} onClick={nextLevel} />
            <StyledLinkW 
              href="https://dswebsite.webflow.io/" 
            >
              dswebsite.webflow.io
            </StyledLinkW> 
        </StyledMenu>
        {isMouseMoving && (
          <StyledToolTip>
            <p>Arrow up: Help</p>
            <p>Enter: Flash</p>
            <p> Arrow down: Skip</p>
            <br />
            <p> Escape: Quit </p>
            <p>Ctrl: Translate</p>
          </StyledToolTip>
        )}
      </Content>
    </>
  );
}
