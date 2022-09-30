import mascot from '../../assets/images/WalkingGirl.gif'
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styled from '@emotion/styled';
import Container from 'components/common/Container';
import { getApiInstance } from 'api';

const PlainButton = styled(Button)`
  &.MuiButton-root {
    color: black;
    &:hover {
      background-color: white;
    }
  }
`;

const StartApp = () => {
    const handlePrev = () => {
        console.log('이전');
        window.location.href ="/info/activity"
      };

    function handleClick(e) {
      const userChoice = {}
      userChoice.music=JSON.parse(localStorage.getItem("musicDataInput"))
      userChoice.food=JSON.parse(localStorage.getItem("foodDataInput"))
      userChoice.activity=JSON.parse(localStorage.getItem("activityDataInput"))
      localStorage.removeItem("musicDataInput") 
      localStorage.removeItem("foodDataInput") 
      localStorage.removeItem("activityDataInput") 
      console.log(userChoice)
      const start = getApiInstance().post('/user/choice', userChoice);
      if (start?.status === 200) {
        console.log("hi")
        window.location.replace('/main');
      }
      else {
        alert('ㅠㅠ');
        // window.location.replace('/info/start');
        window.location.replace('/main')
      }
    }
    return (
        <div>
        <Container>
          <div className="UserInput">
            <div className='UserInput__Start__Title'>
                <h2>이제 새로운 하루를</h2>
                <h2>보내러 가볼까요?</h2>
            </div>
            <div className='UserInput__Start__Item'>
                <img className="UserInput__Start__Item__Mascot" src={mascot} alt="Mascot" />
                <Button variant="contained" onClick={handleClick}>메인페이지 ㄱㄱ</Button>
            </div>
            <div className="recommend-bottom">
                <PlainButton startIcon={<ArrowBackIosNewIcon />} onClick={handlePrev}>
                    이전
                </PlainButton>
            </div>
            </div>
          </Container>
        </div>
    );
};

export default StartApp;