import React, { useState } from 'react';
import styled from '@emotion/styled'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Date from './Date'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ReactComponent as CatBasic } from '../../../assets/cat-basic.svg';
import { CategoryItem, SubItem } from '../../../types/todo'
import { AddNewItem } from './CRUD';
import { setTodoDoneState } from '../../../utils/axios/todo';

const CatContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  margin: '0px 5px',
})

const ItemContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '5px 0',
  fontWeight: 'normal',
  color: 'black',
})

const CatandTodoContainer = styled.div({
  display: 'flex',
  fontWeight: 'normal',
  color: 'black',
})


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: '10px',
  },
  '& .MuiDialogActions-root': {
    padding: '5px',
  },
}));



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

const DetailConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  gap: 20px;
  margin: 10px 10px 50px 20px;
`

const RowContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: center;
  .input {
    width: 100%;
    margin-right: 20px;
  }
`
const Label = styled.div`
  font-weight: bold;
`

const InnerTodo: React.FC<{ todoIndex: number, categoryId: number, subItems: SubItem[], color: string, replaceSubItems: any, reorderTodoId: any, isAddTodoClicked: boolean, clickedCategoryId: string }>
  = ({ todoIndex, categoryId, subItems, color, replaceSubItems, reorderTodoId, isAddTodoClicked, clickedCategoryId }) => {
    const pendingColor = '#eeeeee';


    const updateTodoDone = async (todoId:number, isDone:boolean) => {
      const res = await setTodoDoneState(todoId, isDone);
      // delete success
    }

    const handleCatClick = (categoryId: number, id: number, isDone: boolean, index: number) => {
      
      updateTodoDone(id, !isDone);

      
      const newSubItem = subItems.map((todo: SubItem) => todo.todoId === id
        ? { ...todo, done: !isDone }
        : todo
      )
      console.log(newSubItem);
      replaceSubItems(newSubItem, todoIndex); // 현재 클릭한 item의 카테고리 id로 수정 -> 집가서 replace 부분 다시 뜯어보기
    }

    const handleOnChange = (e: any) => {
      setNewInputValue(e.target.value)
    }

    const [newInputValue, setNewInputValue] = useState('');

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        !!newInputValue.trim() && AddNewItem(newInputValue, categoryId, subItems, replaceSubItems)
        setNewInputValue('');
      }
    };

    const [open, setOpen] = useState(false);
    const [, setClickedId] = useState('');
    const [, setClickedContent] = useState('');
    const [clickedItem, setClickedItem] = useState(subItems[0]);

    const handleClickOpen = (item: SubItem) => {
      setClickedId(item.todoId.toString());
      setClickedContent(item.todoName);
      setClickedItem(item);
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

    const [todoChange, setTodoChange] = useState('');
    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoChange(e.target.value)
    }

    const handleSaveBtn = (item: SubItem) => {
      const newSubItem = subItems.map((todo: SubItem) => todo.todoId === item.todoId
        ? { ...todo, content: todoChange }
        : todo
      )
      replaceSubItems(newSubItem, item.categoryId)
      handleClose();
    }
    const handleDeleteTodo = (clickedItem: SubItem) => {
      subItems.splice(Number(clickedItem.todoId), 1)
      replaceSubItems(subItems)
      reorderTodoId(subItems, clickedItem.categoryId)
      setOpen(false);
    }




    return (

      <div>

        <Droppable droppableId={categoryId.toString()} type={`droppableSubItem`}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {subItems && subItems.map((item, index) => (
                <Draggable key={item.todoId} draggableId={item.todoId.toString()} index={index}>
                  {(provided) => (

                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ItemContainer>
                        <CatandTodoContainer>
                          <CatContainer onClick={() => handleCatClick(item.categoryId, item.todoId, item.done, index)}>
                            <CatBasic fill={item.done ? color : pendingColor} />
                          </CatContainer>
                          {`${item.todoName} todoId:${item.todoId} index:${index} isDone:${item.done}`}

                        </CatandTodoContainer>
                        <MoreHorizIcon color='primary' onClick={() => handleClickOpen(item)} />
                        {open && (
                          <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                          >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                              세부사항
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                              <DetailConatiner>
                                <RowContainer>
                                  <Label>할일</Label>
                                  <Input className='input' defaultValue={clickedItem.todoName} onChange={handleTodoChange} />
                                </RowContainer>
                                <RowContainer>
                                  <Label>날짜</Label>
                                  <Date />
                                </RowContainer>
                                <RowContainer>
                                  <Label>반복</Label>
                                  <Button variant="outlined">매일</Button>
                                  <Button variant="outlined">매주</Button>
                                  <Button variant="outlined">매월</Button>
                                </RowContainer>
                              </DetailConatiner>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={()=>handleSaveBtn(clickedItem)}>
                                변경
                              </Button>
                              <Button onClick={() => handleDeleteTodo(clickedItem)} color='warning'>
                                삭제
                              </Button>
                            </DialogActions>
                          </BootstrapDialog>

                        )}

                      </ItemContainer>
                    </div>
                  )}

                </Draggable>


              ))}

              {provided.placeholder}
              {/* 새로운 input 추가 */}
              {subItems.map((item) => {
                if (`${clickedCategoryId}-0` === `${item.todoId}` && isAddTodoClicked) {
                  return (
                    <ItemContainer key={item.todoId}>
                      <CatandTodoContainer>
                        <CatContainer >
                          <CatBasic fill={pendingColor} />
                        </CatContainer>
                        <Input value={newInputValue} onChange={handleOnChange} onKeyPress={handleOnKeyPress} />
                      </CatandTodoContainer>
                      <MoreHorizIcon color='primary' />
                    </ItemContainer>
                  )
                }
                return null;
              })
              }
            </div>

          )}
        </Droppable>

      </div>

    );
  };

export default InnerTodo;