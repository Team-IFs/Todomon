import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { CurrentClickedCategory } from '../../recoil/atoms/atoms';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import { CirclePicker } from 'react-color';
import { useEffect, useState } from 'react';
import Input from '@mui/material/Input';

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px'
})
const RowContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '0px 20px',
  width: '100%',
  gap: '20px'
})
const ButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'end',
  width: '200px',
})

const SelectedCategory = () => {
  const [category, setCategory] = useRecoilState(CurrentClickedCategory);
  console.log(category)
  
  const [clickedIndex, setClickedIndex] = useState(category.scope);

  useEffect(() => {
    setClickedIndex(category.scope);
  }, [category]);

  useEffect(() => { 
    setCategory(category)
  }, []);
  
  const handleButtonClick = (index: any) => {
    setClickedIndex(index);
  };

  const handleCategoryNameChange = () => {
  };

  const handleAccountDelete = async () => {
  };
  


  return(
  <RowContent>
    <Row>
      <Typography>이름</Typography>
      <Typography
        sx={{ fontWeight: 'bold' }}
          color={category.categoryColor}>
          <Input type='text' fullWidth={true} value={category.categoryName} onChange={handleCategoryNameChange} />
            
      </Typography>
    </Row>
    <Row>
      <Typography>카테고리 숨기기</Typography>
        <Checkbox
          checked={category.hide}
          sx={{
          color: category.categoryColor,
          '&.Mui-checked': { color: category.categoryColor },
          }} />
        <Typography variant='caption'>
          할 일 추가 화면에서 더이상 해당 카테고리가 나타나지 않도록 카테고리를 숨깁니다.
          </Typography>
    </Row>
    <Row>
      <Typography>공개범위</Typography>
      <ButtonGroup variant='outlined'>
        {[0, 1, 2].map((scope) => (
          <Button
            key={scope}
            variant={clickedIndex === scope ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(scope)}
          >
            {scope === 0 ? '전체 공개' : scope === 1 ? '친구 공개' : '비공개'}
          </Button>
        ))}
      </ButtonGroup>
    </Row>
    <Row>
      <Typography>색상</Typography>
      <CirclePicker/>
    </Row>
    <Row>
      <label>카테고리 삭제</label>
      <ButtonContainer>
        <Button
          type='submit'
          variant='outlined'
          color='error'
          fullWidth={true}
          onClick={handleAccountDelete}
        >
          카테고리 삭제
        </Button>
      </ButtonContainer>
    </Row>
  </RowContent>
)}
export default SelectedCategory;