import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InnerTodo from './InnerTodo';
import styled from '@emotion/styled';
import { static_items } from './data';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { setDataLocalStorage, getDataLocalStorage } from '../../../utils/localstorage'
// setDataLocalStorage('todos', static_items);


/** dnd순서상의 id를 다시 부여하는 함수 */
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/** 카테고리 id를 재부여 하는 함수 */
const reorderCategoryId = (list, sourceIndex, destIndex) => {
  list = reorder(list, sourceIndex, destIndex)
  // 내부 todos 들의 categoryId, id 앞자리를 재부여
  list.map((category, index) => {
    category.id = index+'';
    category.subItems = reorderTodoId(category.subItems, index);
    return category;
  })
  setDataLocalStorage('todos', list);
  return list;
}

/**  투두 id를 다시 부여하는 함수 */
const reorderTodoId = (list, newCategoryId) => {
  list.map((todo, index) => {
    todo.categoryId = newCategoryId;
    todo.id = `${newCategoryId}-${index}`
    return todo;
  })

  return list;
};


const getItemStyle = (draggableStyle, categoryColor) => ({
  userSelect: 'none',
  fontWeight: 'bold',
  color: categoryColor,
  margin: '10px 0',
  ...draggableStyle
});


const TitleContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
})
  

const getListStyle = () => ({
  width: '100%',
});

const OuterTodo = () => {
  const [items, setItems] = useState(getDataLocalStorage('todos'));

  const setSubItems = (newnewItems, categoryId) => {
    setItems(i => {
      const tempItems = [...i];
      tempItems[categoryId].subItems = newnewItems;
      return tempItems
    })
    setDataLocalStorage('todos', items);
  }

  const [isAddTodoClicked, setIsAddTodoClicked] = useState(false);
  const handleAddTodoClick = () => {
    setIsAddTodoClicked(!isAddTodoClicked)
  }
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === 'droppableItem') {
      setItems(reorderCategoryId(items, sourceIndex, destIndex)) // 카테고리 id 재부여
    } else if (result.type === 'droppableSubItem') {
      const itemSubItemMap = items.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {});

      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...items];

      // 같은 카테고리 내부에서의 정렬
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );
        const newSubItems = reorderedSubItems.map((item, index) => {
          // 앞은 고정, 뒤쪽은 해당 item의 자체적인 index로 변경
          item.id = `${sourceParentId}-${index}`
          return item;
        })
        
        // 바꾼 newSubItems를 원래 newItesm에 서브 아이템에 바꿔서 넣어주기
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.subItems = newSubItems;
          }
          return item;
        });
        setItems(newItems);

      }
      // 다른 카테고리로 넘어갈경우
      else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);

        reorderTodoId(newDestSubItems, destParentId); // 옮긴 후(dest)의 id 변경
        reorderTodoId(newSourceSubItems, sourceParentId); // 옮기기 전(source)의 id 변경

        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.subItems = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.subItems = newDestSubItems;
          }
          return item;
        });
        setItems(newItems);
        setDataLocalStorage('todos', newItems);

      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable' type='droppableItem'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items && items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        provided.draggableProps.style,
                        item.color
                      )}
                      >
                      <TitleContainer>
                        {item.content} 
                        <AddCircleOutlineIcon style={{ color: item.color }} onClick={()=>handleAddTodoClick(item)} />
                        </TitleContainer>
                      <InnerTodo
                        subItems={item.subItems}
                        type={item.id}
                        color={item.color}
                        setSubItems={setSubItems}
                        isAddTodoClicked={isAddTodoClicked}
                        />
                    </div>
                    {provided.placeholder}

                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default OuterTodo;