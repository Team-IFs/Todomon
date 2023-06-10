import { useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InnerTodo from './InnerTodo';
import { static_items } from './data';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { setDataLocalStorage, getDataLocalStorage } from '../../../utils/localstorage'
import { CategoryItem, SubItem } from '../../../types/todo'

// setDataLocalStorage('todos', static_items);

/** dnd순서상의 id를 다시 부여하는 함수 */
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/** 카테고리 id를 재부여 하는 함수 */
const reorderCategoryId = (list: any[], sourceIndex: number, destIndex: number) => {
  list = reorder(list, sourceIndex, destIndex)
  // 내부 todos 들의 categoryId, id 앞자리를 재부여
  list.map((category, index) => {
    category.id = index + '';
    category.subItems = reorderTodoId(category.subItems, index);
    return category;
  })
  setDataLocalStorage('todos', list);
  return list;
}

/**  투두 id를 다시 부여하는 함수 */
const reorderTodoId = (list: any[], newCategoryId: number) => {
  list.map((todo, index) => {
    todo.categoryId = newCategoryId;
    todo.id = `${newCategoryId}-${index}`
    return todo;
  })

  return list;
};


const TitleContainer = styled.div<{ categoryColor: string }>`
  color: ${(props: any) => (props.categoryColor)};
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;


const getListStyle = () => ({
  width: '100%',
});

const OuterTodo = () => {
  const [items, setItems] = useState(getDataLocalStorage('todos'));

  const replaceSubItems = (newnewItems: SubItem[]) => {
    setItems((i: any) => {
      const tempItems = [...i];
      tempItems[Number(newnewItems[0].categoryId)].subItems = newnewItems;
      return tempItems
    })
    setDataLocalStorage('todos', items);
  }

  const [clickedCategoryId, setClickedCategoryId] = useState('0')
  const [isAddTodoClicked, setIsAddTodoClicked] = useState(false);

  const handleAddTodoClick = (item: CategoryItem) => {
    setIsAddTodoClicked(!isAddTodoClicked)
    setClickedCategoryId(item.id)
  }

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === 'droppableItem') {
      setItems(reorderCategoryId(items, sourceIndex, destIndex)) // 카테고리 id 재부여
    } else if (result.type === 'droppableSubItem') {
      const itemSubItemMap = items.reduce((acc: any, item: any) => {
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
        const reorderedSubItems: SubItem[] = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );
        console.log(reorderedSubItems);
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
        setDataLocalStorage('todos', items);


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
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle()}
          >
            {items && items.map((item: CategoryItem, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <TitleContainer categoryColor={item.color}>
                        {item.content}
                        <AddCircleOutlineIcon style={{ color: item.color }} onClick={() => handleAddTodoClick(item)} />
                      </TitleContainer>
                      <InnerTodo
                        // {...Props}
                        categoryId={item.id}
                        subItems={item.subItems}
                        color={item.color}
                        replaceSubItems={replaceSubItems}
                        reorderTodoId={reorderTodoId}
                        isAddTodoClicked={isAddTodoClicked}
                        clickedCategoryId={clickedCategoryId}
                      />
                    </div>

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