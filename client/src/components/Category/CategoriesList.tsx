import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getCategories } from '../../utils/axios/category';
import { CategoryItem } from '../../types/todo';
import { useRecoilState } from 'recoil';
import { CurrentClickedCategory } from '../../recoil/atoms/atoms';

const CategoriesList = () => {

  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [, setCurrentClickedCategory] = useRecoilState(CurrentClickedCategory);

  const getCategoryList = () => {
    getCategories().then((res) => {
      if (res) {
        setCategoryList(res.content);
        setCurrentClickedCategory(res.content[0]);
      }
    });
  }

  const handleCategoryClicked = (category: CategoryItem) => {
    setCurrentClickedCategory(category);
  }
  
  useEffect(() => { 
    getCategoryList();
  }, []);


  return (
    <Box sx={{ width: '100%', height: '100%', maxWidth: 200, margin: '0px 10px'}}>
        <Typography sx={{ fontWeight: 'bold', padding: '10px' }}>| 내 카테고리</Typography>
        <List>
          {categoryList.map((category: CategoryItem) => (
              !category.hide && (
                <ListItem disablePadding key={category.categoryId}>
                <ListItemButton onClick={()=>handleCategoryClicked(category)}>
                  <ListItemText
                    primary={category.categoryName}
                    style={{ color: category.categoryColor }}/>
                </ListItemButton>
              </ListItem>
            )))}
        </List>
      <Divider />
        <Typography sx={{fontWeight: 'bold', padding: '10px'}}>| 숨긴 카테고리</Typography>
        <List>
          {categoryList.map((category: CategoryItem) => (
              category.hide && (
                <ListItem disablePadding key={category.categoryId}>
                <ListItemButton onClick={()=>handleCategoryClicked(category)}>
                  <ListItemText
                    primary={category.categoryName}
                    style={{ color: category.categoryColor }}/>
                </ListItemButton>
              </ListItem>
            )))}
          
        </List>
    </Box >
  );
}

export default CategoriesList;