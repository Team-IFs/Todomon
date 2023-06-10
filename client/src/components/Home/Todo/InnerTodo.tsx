import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ReactComponent as CatBasic } from '../../../assets/cat-basic.svg';
import { CategoryItem, SubItem } from '../../../types/todo'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from '@emotion/styled'
import Input from '@mui/material/Input';
import { AddNewItem } from './CRUD';
import { useState } from 'react';
// import Modal from '../../Common/Modal'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const InnerTodo: React.FC<{ categoryId: string, subItems: SubItem[], color: string, replaceSubItems: any, reorderTodoId: any, isAddTodoClicked: boolean, clickedCategoryId: string }>
  = ({ categoryId, subItems, color, replaceSubItems, reorderTodoId, isAddTodoClicked, clickedCategoryId }) => {
  const pendingColor = '#eeeeee';
  
  const handleCatClick = (id: string, isDone: boolean) => {
    const newSubItem = subItems.map((todo:SubItem) => todo.id === id
    ? { ...todo, isDone: !isDone }
    : todo
    )
    const categoryId = subItems[0].categoryId;
    console.log(categoryId);
    replaceSubItems(newSubItem, categoryId)
  }
    
    const handleOnChange = (e:any) => {
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
    const [clickedId, setClickedId] = useState('');
    const [clickedContent, setClickedContent] = useState('');
    const [clickedItem, setClickedItem] = useState(subItems[0]);

    const handleClickOpen = (item: SubItem) => {
      setClickedId(item.id)
      setClickedContent(item.content)
      setClickedItem(item);
      setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    
    const handleDeleteTodo = (clickedItem: SubItem) => {
      subItems.splice(Number(clickedItem.id.split('-')[1]), 1)
      replaceSubItems(subItems)
      reorderTodoId(subItems, clickedItem.categoryId)
      setOpen(false);
    }


  return (
    
    <div>

    <Droppable droppableId={categoryId} type={`droppableSubItem`}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {subItems && subItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                  <ItemContainer>
                    <CatandTodoContainer>
                      <CatContainer onClick={()=>handleCatClick(item.id, item.isDone)}>
                        <CatBasic fill={item.isDone ? color : pendingColor} />
                      </CatContainer>
                      {`${item.content}`}
                      
                      </CatandTodoContainer>
                    <MoreHorizIcon color='primary' onClick={()=>handleClickOpen(item)} />
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
                            <div>할일</div>
                            <div>{clickedItem.content}</div>
            
                        </DetailConatiner>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>
                          변경
                        </Button>
                        <Button onClick={()=>handleDeleteTodo(clickedItem)} color='warning'>
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
              if (`${clickedCategoryId}-0` === `${item.id}` && isAddTodoClicked) {
                return (
                  <ItemContainer key={item.id}>
                    <CatandTodoContainer>
                      <CatContainer >
                        <CatBasic fill={pendingColor} />
                      </CatContainer>
                      <Input value={newInputValue} onChange={handleOnChange} onKeyPress={handleOnKeyPress} />
                    </CatandTodoContainer>
                      <MoreHorizIcon color='primary'/>
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
