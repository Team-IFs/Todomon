import React, { useEffect } from 'react'
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { IsLogin } from '../recoil/atoms/atoms';
import CategoriesList from '../components/Category/CategoriesList';
import SelectedCategory from '../components/Category/SelectedCategory';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

  const SocialPage = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100vw - 210px)',
    height: 'calc(100vh - 80px)'
  })

const Contents = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

const ButtonContainer = styled.div({
  display: 'flex',
  width: '200px',
})

const ButtonRow = styled.div({
  display: 'flex',
  justifyContent: 'center',
  margin: '20px',
  gap: '20px',
})
  
const CategorySetting = () => {
  const { routeTo } = useRouter();
  const [isLogin] = useRecoilState(IsLogin);

  const handleChangeClick = () => {

  }
  useEffect(() => {
    if (!isLogin) {
        alert('로그인이 필요한 페이지입니다.')
        routeTo('/login')
      }
  });
  return (<SocialPage>
    <h1>
      | 카테고리 관리
    </h1>
    <Contents>
      <CategoriesList />
      <SelectedCategory />
    </Contents>
    <ButtonRow>
        <ButtonContainer>
          <Button id='faceColor' variant='outlined' fullWidth={true} onClick={handleChangeClick}>변경</Button>
        </ButtonContainer>
      </ButtonRow>
  </SocialPage>)
}

export default CategorySetting 
