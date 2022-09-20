import Button from '@mui/material/Button';
import mascot from '../../assets/images/WalkingGirl.gif'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from '@emotion/styled';

const PlainButton = styled(Button)`
  &.MuiButton-root {
    color: black;
    &:hover {
      background-color: white;
    }
  }
`;

const EnterInfoGuideForth = () => {
    const handlePrev = () => {
        console.log('이전');
        window.location.href ="/guide/third"
      };
    function handleClick(e) {
        window.location.href ="/info"
    }
    return (
        <div>
            <div className='Guide__Forth__Title'>
                <h2>회원님의 취향을 고려해서</h2>
                <h2>새로운 일상을</h2>
                <h2>제공해드릴게요!</h2>
            </div>
            <div className="Guide__Forth__Item">
                <img className="Guide__Forth__Item__Mascot" src={mascot} alt="Mascot" />
                <Button variant="contained" onClick={handleClick}>취향 조사 ㄱㄱ</Button>
            </div>
            <div className="recommend-bottom">
                <PlainButton startIcon={<ArrowBackIosNewIcon />} onClick={handlePrev}>
                    이전
                </PlainButton>
            </div>
        </div>
    );
    
};

export default EnterInfoGuideForth;