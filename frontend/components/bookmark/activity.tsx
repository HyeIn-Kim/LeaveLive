import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { BACKEND_IMAGE_URL } from '../../api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { unlikeActivity } from '../../api/activity';

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

const ActivityList = (props: any) => {
    const picPath: Array<String> = props.picPath.split(',');
    const id = props.id;

    async function unlikeAxios(){
        await unlikeActivity(id,
            (response: any) => console.log(response),
            (error: Error) => console.log(error)
        );
        await alert("북마크를 취소하겠습니까?");
        await render();
    };

    const render = ()=> {
        props.rendering(!render);
    };
    
    return (
        <>
            <Box>
                <Text>
                    <FavoriteIcon fontSize="medium" sx={{color: '#FF385C'}} onClick={()=>{unlikeAxios()}} />
                </Text>
                <Carousel infiniteLoop showThumbs={false}>
                    {picPath.map((pic, idx)=>(
                        <div key={idx} style={{marginLeft: '5vw', marginRight: '5vw'}}>
                            <img src={`${BACKEND_IMAGE_URL}/${pic}`} style={{borderRadius: '10px'}} width={350} height={250} />
                        </div>
                    ))}
                </Carousel>
                <div style={{marginLeft:'7vw', fontSize: '20px', paddingTop: '1vh'}}>{props.name}</div>
            </Box>
        </>
    )
};

export default ActivityList;