import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import { UserInfo } from '../../../recoil/atoms/atoms';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { TodomonColor } from '../../../types/todomon';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 0px 40px 20px',
})
const ContentContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '50px',
  margin: '0px 20px',
})
const ButtonContainer = styled.div({
  display: 'flex',
  width: '200px',
})
const ButtonColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '200px',
})
const UserCat = styled.div({
  width: '200px',
  height: '200px',
  display: 'flex',
})

const TodomonSetting = () => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [currentSelectedTodomonColor, setCurrentSelectedTodomonColor] = useState<TodomonColor>(userInfo.todomon);
  const [selectedButtonId, setSelectedButtonId] = useState<string>('faceColor');
  const [pickerColor, setPickerColor] = useState<string>(userInfo.todomon.faceColor || '#000');

  const buttons = [
    { id: 'faceColor', label: '얼굴', color: currentSelectedTodomonColor.faceColor },
    { id: 'leftEyeColor', label: '왼쪽 눈', color: currentSelectedTodomonColor.leftEyeColor },
    { id: 'rightEyeColor', label: '오른쪽 눈', color: currentSelectedTodomonColor.rightEyeColor },
    { id: 'backgroundColor', label: '배경', color: currentSelectedTodomonColor.backgroundColor }
  ];
  
  const handleButtonClick = (currentButtonId: string) => {
    setSelectedButtonId(currentButtonId);
    setPickerColor(buttons.find(btn => btn.id === currentButtonId)?.color || '#000');
  };

  const handleChangeColorPicker = (color: any) => {
    // change가 일어날 때 마다 picker를 해당 값으로 변경
    setPickerColor(color.hex);
    // 현재 화면에 보이는 투두몬의 색상 변경
    setCurrentSelectedTodomonColor({
      ...currentSelectedTodomonColor,
      [selectedButtonId]: color.hex
    });
  };

  useEffect(() => {
    // recoil에 저장된 userInfo의 투두몬의 색상과 현재 투두몬의 색상이 다르다면 현재 투두몬의 색상을 저장
    if (currentSelectedTodomonColor !== userInfo.todomon) {
      const updatedUserInfo = {
        ...userInfo,
        todomon: currentSelectedTodomonColor,
      };
      setUserInfo(updatedUserInfo);
    };
  }, [currentSelectedTodomonColor]);

  return (
    <Container>
      <h2>투두몬</h2>
      <ContentContainer>
        <UserCat>
          <svg version="1.1" id="Layer_1" xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500">
            <style type="text/css">{`
            .st0{fill:${currentSelectedTodomonColor.backgroundColor};}
            .st1{fill:${currentSelectedTodomonColor.rightEyeColor};}
            .st2{fill:${currentSelectedTodomonColor.leftEyeColor};}
            .st3{fill:${currentSelectedTodomonColor.faceColor};}
            `}
            </style>
            <ellipse id="background" className="st0" cx="250" cy="250" rx="242" ry="242" />
            <g>
              <circle id="rightEye" className="st1" cx="306.5" cy="295" r="25" />
              <circle id="leftEye" className="st2" cx="193.4" cy="295" r="25" />
              <path id="body" className="st3" d="M367.6,117.7c-21.6,13.4-43.9,30.3-61,41.5c-17.5-6.1-36.6-9.5-56.8-9.5c-20,0-39.1,3.4-56.5,9.4
              c-17.1-11.2-39.3-28.1-60.9-41.4c-36.6-22.6-31.3,114.2-29.6,147c-0.2,2.8-0.4,5.7-0.4,8.6c0,68.3,65.9,123.6,147.3,123.6
              S397,341.5,397,273.3c0-1.7-0.1-3.4-0.1-5.1C398.4,243.4,405.6,94.2,367.6,117.7z M193.4,320c-13.8,0-25-11.2-25-25s11.2-25,25-25
              s25,11.2,25,25S207.2,320,193.4,320z M306.5,320c-13.8,0-25-11.2-25-25s11.2-25,25-25s25,11.2,25,25S320.3,320,306.5,320z"/>
            </g>
          </svg>
        </UserCat>
        <ButtonColumn>
          {buttons.map(({ id, label }) => (
            <ButtonContainer key={id}>
              <Button
                id={id}
                variant={selectedButtonId === id ? 'contained' : 'outlined'}
                fullWidth={true}
                onClick={() => handleButtonClick(id)}
              >
                {label}
              </Button>
            </ButtonContainer>
          ))}
        </ButtonColumn>
        <SketchPicker
          color={pickerColor}
          onChange={handleChangeColorPicker}
          width='300px'
        />
      </ContentContainer>
    </Container>
  )
};
export default TodomonSetting;