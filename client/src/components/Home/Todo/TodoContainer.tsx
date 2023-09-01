import styled from '@emotion/styled';
import OuterTodo from './OuterTodo';
import { DateString } from '../../../utils/today'
import { useRecoilState } from 'recoil';
import { CurrentDay } from '../../../recoil/atoms/atoms';
import Button from '@mui/material/Button';
import { addCategory } from '../../../utils/axios/category';
import { CategoryCreationData } from '../../../types/todo';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import { CirclePicker } from 'react-color';


const Card = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '90%',
  height: '100%',
  border: '1px solid lightgray',
  margin: '10px',
  borderRadius: '10px',
  padding: '20px'
})

const DateInfo = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  '& .date': {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  }
})

const Categories = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyItems: 'center',
  width: '100%',
  height: '100%',
  padding: '10px 0',
})

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: '10px',
  },
  '& .MuiDialogActions-root': {
    padding: '5px',
  },
}));

const DetailConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  gap: 20px;
  margin: 20px;
  margin-bottom: 50px;
  padding: 0px 20px;
`

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}


const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px'
})

const Todo = () => {
  const [currentDay] = useRecoilState(CurrentDay);
  const currentDayString = DateString(currentDay);
  const [open, setOpen] = useState(false);

  const [categoryName, setCategoryName] = useState('');
  const [clickedIndex, setClickedIndex] = useState(0);
  const [color, setColor] = useState('');

  const handleClose = () => {
    setOpen(false);
  };


  const handleCategoryAddClick = () => {
    setOpen(true);
  }

  const handleCategoryName = (input: any) => {
    // console.log(input.target.value);
    const name = input.target.value.trim();
    if(name !== '') setCategoryName(name);
  }
  const handleScopeChange = (index: any) => {
    setClickedIndex(index);
  };

  const handleColorChange = (c:any) => {
    setColor(c.hex)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newCategoryData = {
      categoryName: categoryName,
      categoryColor: color,
      scope: clickedIndex,
      hide: false,
    }

    addNewCategory(newCategoryData);
  }


  const addNewCategory = (newCategory: CategoryCreationData) => {
    addCategory(newCategory).then(() => { 
      alert(`${categoryName} 카테고리가 추가되었습니다.`);
      handleClose();
      window.location.reload();
    });
    
  }


  return (
    <Card>
      <DateInfo>
        <div className='date'>{currentDayString}</div>
      </DateInfo>
      <Categories>
        <OuterTodo />
      </Categories>
      <Button type='submit' variant='outlined' fullWidth={true} onClick={handleCategoryAddClick}>카테고리 추가</Button>
      {open && (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            카테고리 추가
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <form onSubmit={handleSubmit}>
              <DetailConatiner>
                <Row>
                  <Typography>카테고리 이름</Typography>
                  <TextField
                    label='카테고리 이름'
                    type='text'
                    variant='standard'
                    onChange={handleCategoryName}/>
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

                <Button type='submit' variant='outlined'>추가</Button>
              </DetailConatiner>
            </form>
          </DialogContent>
        </BootstrapDialog>

      )}

    </Card>
  )
}
export default Todo