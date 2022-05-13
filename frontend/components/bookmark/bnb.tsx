import styled from 'styled-components';
import Image from "next/image";
import house from '../../public/house.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';

const Box = styled.div`
  position: relative;
  display: grid;
  margin-bottom: 2vh;
//   border: 1px solid;
`;
const Text = styled.div`
  z-index: 100;
  position: absolute;
  top: 5%;
  left: 85%;
`;

const BnbItem = (props: any) => {
    const name = props.name;
    const picPath = props.picPath;
    const id = props.id;

    useEffect(()=>{
        console.log(name);
        console.log(picPath);
        console.log(id);
    },[])

    return (
        <Box>
            <Text>
                <FontAwesomeIcon icon={faHeart} size="lg" color="red" />
            </Text>
            <Carousel infiniteLoop showThumbs={false}>
                <div>
                    <Image src={house} width={350} height={250} />
                </div>
                <div>
                    <Image src={house} width={350} height={250} />
                </div>
                <div>
                    <Image src={house} width={350} height={250} />
                </div>
                <div>
                    <Image src={house} width={350} height={250} />
                </div>
            </Carousel>
            <div style={{marginLeft:'7vw'}}>광주 푸르지오 아파트</div>
        </Box> 
    )
};

export default BnbItem;