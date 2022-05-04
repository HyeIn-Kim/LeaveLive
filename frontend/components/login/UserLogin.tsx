import React, { Dispatch, SetStateAction } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import { ColoredText, BoldText, UnderlineText } from "../../styles/Text";
import { Typography } from "@mui/material";
import styled from "styled-components";

interface IPropTypes {
  setIsUser: Dispatch<SetStateAction<boolean>>;
}

const TextContainer = styled.div`
  width: 100%;
  margin-bottom: 20%;
`;

const Title = styled.div`
  align-items: flex-start;
  margin-bottom: 10%;
`;

const SubTitleContainer = styled.div`
  line-height: 1.6rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-bottom: 15%;
  text-align: center;
`;

const NavigatorContainer = styled.div`
  font-size: 0.9rem;
`;

const UserLogin = ({ setIsUser }: IPropTypes) => {
  return (
    <>
      <TextContainer>
        <Title>
          <Typography variant="h5" lineHeight={1.6}>
            <ColoredText>
              오늘은
              <br />
              어디서 살아볼까?
            </ColoredText>
          </Typography>
        </Title>
        <SubTitleContainer>
          <div>국내여행 한달살기, 앱 하나로 끝!</div>
          <ColoredText>리브리브</ColoredText>
        </SubTitleContainer>
      </TextContainer>

      <ButtonContainer>
        <GoogleLoginButton />
        <KakaoLoginButton />
      </ButtonContainer>

      <NavigatorContainer>
        사장님이세요?&nbsp;
        <UnderlineText onClick={() => setIsUser(false)}>
          사장님 로그인
        </UnderlineText>
      </NavigatorContainer>
    </>
  );
};

export default UserLogin;
