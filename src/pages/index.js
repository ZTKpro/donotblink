import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styled from "styled-components";
import Content from "@/components/content";
import Logo from "@/assets/logo.png";

const StyledTitle = styled.h3`
  margin-top: 20px;
  font-size: 20px;
  color: #f2c94c;
`;

const StyledMore = styled.h5`
  position: absolute;
  font-size: 20px;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f2c94c;
  cursor: pointer;

  &.hover {
    opacity: 0.8;
  }
`;

const StyledImage = styled(Image)`
  height: auto;
  width: 14vw;
  @media (max-width: 1268px) {
    height: auto;
    width: 80%;
  }
`;

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        router.push("/game");
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>donotblink</title>
        <meta name="description" content="donotblink" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Content>
        <StyledImage src={Logo} alt="Logo" />
        <StyledTitle>press Enter to start</StyledTitle>
        <StyledMore>More</StyledMore>
      </Content>
    </>
  );
}
