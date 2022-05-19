import { useState, useEffect, useCallback } from "react";
import Seo from "../../components/Seo";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useRouter } from "next/router";
import { bnbList } from "../../api/bnb";
import Item from "../../components/search/Item";
import { activityList } from "../../api/activity";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SportsBaseballRoundedIcon from "@mui/icons-material/SportsBaseballRounded";
import { flexCenter } from "../../styles/Basic";

interface TypeBnb {
  id: number;
  contents: string;
  cooking: string;
  garden: string;
  loc: string;
  name: string;
  picPath: string;
}

interface TypeActivity {
  id: number;
  cnt: number;
  contents: string;
  loc: string;
  name: string;
  picContents: string;
  picPath: string;
  price: number;
  userId: number;
}

const Region = () => {
  const router = useRouter();
  const region = router.query.region;
  const [bnbItem, setBnbItem] = useState<Array<TypeBnb>>([]);
  const [activityItem, setActivityItem] = useState<Array<TypeActivity>>([]);

  const convertKeyword = useCallback((region: String): String => {
    let keyword: String = region;

    if (region === "제주도") {
      keyword = "제주특별자치도";
    } else if (region === "강원도") {
      keyword = "강원";
    } else if (region === "전라남도") {
      keyword = "전남";
    } else if (region === "전라북도") {
      keyword = "전북";
    } else if (region === "경상남도") {
      keyword = "경남";
    } else if (region === "경상북도") {
      keyword = "경북";
    } else if (region === "충청남도") {
      keyword = "충남";
    } else if (region === "충청북도") {
      keyword = "충북";
    }

    return keyword;
  }, []);

  useEffect(() => {
    bnbList(
      convertKeyword(String(region)),
      ({ data }: any) => {
        data.sort(() => Math.random() - 0.5);
        setBnbItem(data.slice(0, 1));
      },
      (error: Error) => console.log(error)
    );
  }, [region]);

  useEffect(() => {
    activityList(
      convertKeyword(String(region)),
      ({ data }: any) => {
        data.sort(() => Math.random() - 0.5);
        setActivityItem(data.slice(0, 1));
      },
      (error: Error) => console.log(error)
    );
  }, [region]);

  return (
    <Container>
      <Seo title="Main" />
      <StyledBox region={region}>
        <Text>
          <span
            style={{ color: "#00cf95", fontSize: "1.3rem", fontWeight: "bold" }}
          >
            {region}
          </span>
          <div>여행 어때요?</div>
        </Text>
      </StyledBox>
      <Main>
        <Tab>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab
              sx={{ padding: 2 }}
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => {
                router.push(`/reservation/${region}/bnb`);
              }}
            >
              <IconContainer>
                <HomeRoundedIcon />
                숙소
              </IconContainer>
            </Fab>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => {
                router.push(`/reservation/${region}/activity`);
              }}
            >
              <IconContainer>
                <SportsBaseballRoundedIcon />
                액티비티
              </IconContainer>
            </Fab>
          </Box>
        </Tab>
        <div style={{ display: "grid" }}>
          <Title>🏡 추천 숙소</Title>
          {bnbItem.length !== 0 ? (
            <Item list={bnbItem} url="bnb" />
          ) : (
            <StyledError>숙소가 없습니다.</StyledError>
          )}
          <Title>🏓 추천 액티비티</Title>
          {activityItem.length !== 0 ? (
            <Item list={activityItem} url="activity" />
          ) : (
            <StyledError>데이터가 없습니다.</StyledError>
          )}
        </div>
      </Main>
    </Container>
  );
};

const StyledError = styled.div`
  width: 80%;
  padding: 1rem 0;
  background: #d3d3d3;
  margin: auto;
  margin-bottom: 1.5rem;
  text-align: center;
  border-radius: 15px;
  line-height: 7vh;
  font-size: 0.9rem;
`;

const Title = styled.div`
  margin: 2.5vh;
  font-size: 1.2rem;
  font-weight: bold;
`;

interface IStyledBox {
  region: any;
}

const StyledBox = styled.div<IStyledBox>`
  position: relative;
  background-image: url(${({ region }) => `/region/${region}.jpg`});
  background-position: center center;
  background-size: cover;
  background-color: black;
  width: 100%;
  height: 200px;
  border-radius: 0 0 24px 24px;

  &:before {
    content: "";
    opacity: 55%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    border-radius: 0 0 24px 24px;
  }
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  margin: 3vh 0;
`;

const Text = styled.div`
  // z-index: 100;
  position: absolute;
  color: white;
  top: 52%;
  left: 10%;
  font-size: 1.1rem;
  line-height: 1.9rem;
`;

const Main = styled.div`
  margin-left: 2vh;
  margin-right: 2vh;
`;
const Container = styled.div`
  margin-bottom: 10vh;
`;

const IconContainer = styled.div`
  ${flexCenter}
  margin: 0 0.5rem;
  & > svg {
    margin-right: 0.5rem;
  }
`;
export default Region;
