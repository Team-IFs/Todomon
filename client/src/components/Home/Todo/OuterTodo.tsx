import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InnerTodo from './InnerTodo';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CategoryItem, SubItem } from '../../../types/todo'
import { getTodaysTodo, setCategoryIndex, setTodoIndex } from '../../../utils/axios/todo';


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
    category.subItems = reorderTodoId(category.todos, index);
    return category;
  })
  return list;
}

/**  투두 id를 다시 부여하는 함수 */
const reorderTodoId = (list: any[], newCategoryId: number) => {
  list.map((todo, index) => {
    todo.categoryId = newCategoryId;
    todo.id = index;
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
  let [items, setItems] = useState<CategoryItem[]>([]);

  // api 요청해서 todolist 불러오기
  useEffect(() => {
    const todaysTodo = getTodaysTodo();
    todaysTodo.then((res) => {
      if (res) {
        setItems(res.content);
      }
    });
  }, []);

  /**
   * 전체 item list에서 특정 카테고리의 subItem을 수정함
   * @param newnewItems SubItem 배열
   */
  const replaceSubItems = (newnewItems: SubItem[], replacedCategoryIndex:number) => {
    setItems((items) => {
        const tempItems = [...items];
        const tempSubItem = { ...tempItems[replacedCategoryIndex] };
        tempSubItem.todos = newnewItems;
        tempItems[replacedCategoryIndex] = tempSubItem;
        return tempItems;
    })
  }

  const [clickedCategoryId, setClickedCategoryId] = useState(0);
  const [isAddTodoClicked, setIsAddTodoClicked] = useState(false);

  const handleAddTodoClick = (item: CategoryItem) => {
    setIsAddTodoClicked(!isAddTodoClicked) // 카테고리가 클릭됐다 여부를 누를때마다 토글
    setClickedCategoryId(item.categoryId)
  }

  const onDragEnd = (result: any) => {
    // list 바깥에 drop됐을 때
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    /* 카테고리를 드래그하는 경우 */
    if (result.type === 'droppableItem') {
      setItems(reorderCategoryId(items, sourceIndex, destIndex))
      setCategoryIndex(Number(result.draggableId), destIndex);
    }
    /* 할 일을 드래그 하는 경우 */
    else if (result.type === 'droppableSubItem') {
      // 끌어온 item이 속한 카테고리의 실제 id
      const sourceParentId = Number(result.source.droppableId);
      const destParentId = Number(result.destination.droppableId);
      // 끌린 item 각각의 카테고리 내부에서의 화면상의 index(0,1,2)
      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;

      let newItems = [...items];

      // 같은 카테고리 내부에서의 정렬
      if (sourceParentId === destParentId) {
        const unorderedSubItem = items.filter(category => category.categoryId === sourceParentId)[0].todos; 
        const reorderedSubItems: SubItem[] = reorder(
          unorderedSubItem,
          sourceIndex,
          destIndex
        );
        console.log('** reorderedSubItems:', reorderedSubItems);
        const newSubItems = reorderedSubItems.map((item, index) => {
          return item;
        })

        // 바꾼 newSubItems를 원래 newItesm에 서브 아이템에 바꿔서 넣어주기
        newItems = newItems.map((item) => {
          if (item.categoryId === sourceParentId) {
            item.todos = newSubItems;
          }
          return item;
        });
        setItems(newItems);

        // 서버에 전달
        setTodoIndex(Number(result.draggableId),destIndex);


      }
      // 다른 카테고리로 넘어갈경우
      else {
        const sourceSubItems = items.filter(category => category.categoryId === sourceParentId)[0].todos; 
        const destSubItems = items.filter(category => category.categoryId === destParentId)[0].todos;

        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);

        reorderTodoId(newDestSubItems, destParentId); // 옮긴 후(dest)의 id 변경
        reorderTodoId(newSourceSubItems, sourceParentId); // 옮기기 전(source)의 id 변경

        newItems = newItems.map((item) => {
          if (item.categoryId === sourceParentId) {
            item.todos = newSourceSubItems;
          } else if (item.categoryId === destParentId) {
            item.todos = newDestSubItems;
          }
          return item;
        });
        setItems(newItems);
        //TODO: 카테고리를 넘어서 할 일 드래그 하는건 성공, 서버에 저장하는 방법?
        // setCategoryIndex(categoryIndex, newIdx);

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
              <Draggable key={item.idx} draggableId={item.categoryId.toString()} index={index}>
                {(provided) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <TitleContainer categoryColor={item.categoryColor}>
                        {`${item.categoryName} categoryId:${item.categoryId} idx:${item.idx} index:${index}`}
                        <AddCircleOutlineIcon style={{ color: item.categoryColor }} onClick={() => handleAddTodoClick(item)} />
                      </TitleContainer>
                      <InnerTodo
                        todoIndex={item.idx}
                        categoryId={item.categoryId}
                        subItems={item.todos}
                        color={item.categoryColor}
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