import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { CurrentClickedCategory, NewCategorySetting } from '../../recoil/atoms/atoms';
import { useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import { CirclePicker } from 'react-color';
import { useEffect, useState } from 'react';
import Input from '@mui/material/Input';
import { deleteCategory } from '../../utils/axios/category';

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
  const [category] = useRecoilState(CurrentClickedCategory);
  const [, setNewCategorySetting] = useRecoilState(NewCategorySetting);
  const [clickedIndex, setClickedIndex] = useState(category.scope);
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [isHide, setIsHide] = useState(category.hide);
  const [color, setColor] = useState(category.categoryColor);

  useEffect(() => {
    setClickedIndex(category.scope);
    setCategoryName(category.categoryName);
    setIsHide(category.hide);
    setColor(category.categoryColor);
  }, [category]);


  const handleCategoryNameChange = (e: any) => {
    setCategoryName(e.target.value);
    setNewCategorySetting(prevSetting => ({
      ...prevSetting,
      categoryName: e.target.value
    }));
  };

  const handleVisiblityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsHide(e.target.checked)
    setNewCategorySetting(prevSetting => ({
      ...prevSetting,
      hide: e.target.checked
    }));
  }

  const handleScopeChange = (index: any) => {
    setClickedIndex(index);
    setNewCategorySetting(prevSetting => ({
      ...prevSetting,
      scope: index
    }));
  };

  const handleColorChange = (c:any) => {
    setColor(c.hex)
    setNewCategorySetting(prevSetting => ({
      ...prevSetting,
      categoryColor: c.hex
    }));
  }

  const handleCategoryDelete = async () => {
    deleteCategory(category.categoryId).then((res) => {
      if (res) {
        alert(`${categoryName} 카테고리를 성공적으로 삭제했습니다.`);
        window.location.reload();
      }
    });
  };



  return (
    <>
      {category.categoryId === -1 || category.categoryName === ''
        ? <Typography>왼쪽에서 카테고리를 클릭 하세요.</Typography>
        : <RowContent>
            <Row>
            <Typography>이름</Typography>
            <Input sx={{ fontWeight: 'bold' }}
              type='text' value={categoryName || category.categoryName} onChange={handleCategoryNameChange} />
            </Row>
            <Row>
              <Typography>카테고리 숨기기</Typography>
              <Checkbox
                checked={isHide}
                sx={{
                  color: category.categoryColor,
                  '&.Mui-checked': { color: category.categoryColor }
                }}
                onChange={handleVisiblityChange}
              />
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
                    onClick={() => handleScopeChange(scope)}
                  >
                    {scope === 0 ? '전체 공개' : scope === 1 ? '친구 공개' : '비공개'}
                  </Button>
                ))}
              </ButtonGroup>
            </Row>
            <Row>
              <Typography>색상</Typography>
            <CirclePicker onChange={handleColorChange}/>
            </Row>
            <Row>
              <label>카테고리 삭제</label>
              <ButtonContainer>
                <Button
                  type='submit'
                  variant='outlined'
                  color='error'
                  fullWidth={true}
                  onClick={handleCategoryDelete}
                >
                  카테고리 삭제
                </Button>
              </ButtonContainer>
            </Row>
          </RowContent>
      }
    </>
  )
}
export default SelectedCategory;