import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ReactComponent as CatBasic } from '../../../assets/cat-basic.svg';
import { CategoryItem, SubItem } from '../../../types/todo'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from '@emotion/styled'
import Input from '@mui/material/Input';
import { AddNewItem } from './CRUD';
import { useState } from 'react';
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


const InnerTodo: React.FC<{ categoryId: string, subItems: SubItem[], color: string, replaceSubItems: any, isAddTodoClicked: boolean, clickedCategoryId: string }>
  = ({ categoryId, subItems, color, replaceSubItems, isAddTodoClicked, clickedCategoryId }) => {
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
                    <MoreHorizIcon color='primary' />
                    
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
