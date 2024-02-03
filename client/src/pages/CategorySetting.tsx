import { useEffect } from 'react'
import { useRouter } from '../hooks/useRouter';
import { useRecoilState } from 'recoil';
import { CurrentClickedCategory, IsLogin, NewCategorySetting } from '../recoil/atoms/atoms';
import CategoriesList from '../components/Category/CategoriesList';
import SelectedCategory from '../components/Category/SelectedCategory';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { updateCategory } from '../utils/axios/category';
import { getCookie } from '../utils/cookies/cookies';


const SocialPage = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100vw - 210px)',
  height: 'calc(100vh - 80px)'
})

const Contents = styled.div({
  display: 'flex',
  flexDirection: 'row',
  margin: '20px 10px'
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
  const [newCategorySetting, setNewCategorySetting] = useRecoilState(NewCategorySetting);
  const [currentClickedCategory, setCurrentClickedCategory] = useRecoilState(CurrentClickedCategory);

  const handleChangeClick = () => {
    updateCategory(newCategorySetting).then(() => {
      alert('변경완료되었습니다.');
      window.location.reload();
    });
  };


  useEffect(() => {
    if (!isLogin) {
      alert('로그인이 필요한 페이지입니다.')
      routeTo('/login')
    } else {
      setNewCategorySetting(currentClickedCategory);
      setCurrentClickedCategory(currentClickedCategory);
    }
  }, []);


  return <>
    {getCookie('accessJwtToken') && <SocialPage>
      <h1>
        | 카테고리 관리
      </h1>
      <Divider />
      <Contents>
        <CategoriesList />
        <Divider orientation='vertical' />
        <SelectedCategory />
      </Contents>
      <ButtonRow>
        <ButtonContainer>
          <Button id='faceColor' variant='outlined' fullWidth={true} onClick={handleChangeClick}>변경</Button>
        </ButtonContainer>
      </ButtonRow>
    </SocialPage >
    }
  </>
}

export default CategorySetting 
