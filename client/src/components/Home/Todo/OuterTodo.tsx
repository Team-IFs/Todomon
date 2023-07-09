import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import InnerTodo from './InnerTodo';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CategoryItem, SubItem } from '../../../types/todo'
import { getTodaysTodo } from '../../../utils/axios/todo';
import { ReadItem } from './CRUD';
import { useRecoilState } from 'recoil';
import { TodoList } from '../../../recoil/atoms/atoms';


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
    // category.subItems = reorderTodoId(category.subItems, index);
    category.subItems = reorderTodoId(category.subItems, index);
    return category;
  })
  // setDataLocalStorage('todos', list);
  return list;
}

/**  투두 id를 다시 부여하는 함수 */
const reorderTodoId = (list: any[], newCategoryId: number) => {
  list.map((todo, index) => {
    todo.categoryId = newCategoryId;
    // todo.id = `${newCategoryId}-${index}`
    todo.id = index; // 그냥 index로 바꾸기.
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
  const [todolist, setTodolist] = useRecoilState(TodoList); // 저장된 TodoList를 가져오기
  let [items, setItems] = useState<CategoryItem[]>([]);

  // api 요청해서 todolist 불러오기
  useEffect(() => {
    const todaysTodo = getTodaysTodo();
    todaysTodo.then((res) => {
      if (res) {
        setTodolist(res.content)
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

  const [clickedCategoryId, setClickedCategoryId] = useState('0') // 클릭한 카테고리의 아이디 저장(새 투두 만들때 사용할듯)
  const [isAddTodoClicked, setIsAddTodoClicked] = useState(false); // add todo가 클릭되었는지 여부를 저장(새 투두 만들때 사용할듯)

  const handleAddTodoClick = (item: CategoryItem) => {
    setIsAddTodoClicked(!isAddTodoClicked) // 카테고리가 클릭됐다 여부를 누를때마다 토글
    console.log(item.categoryId)
    console.log(item.categoryId.toString())
    setClickedCategoryId(item.categoryId.toString()) // 외부 카테고리의 id(문자, "0", "1")를 저장
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
          // 해당 item의 자체적인 index로 변경
          item.todoId = index;
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
        // setDataLocalStorage('todos', items);


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
          if (item.categoryId === sourceParentId) {
            item.todos = newSourceSubItems;
          } else if (item.categoryId === destParentId) {
            item.todos = newDestSubItems;
          }
          return item;
        });
        setItems(newItems);
        // setDataLocalStorage('todos', newItems);

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
              <Draggable key={item.categoryId} draggableId={item.categoryId.toString()} index={index}>
                {(provided) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <TitleContainer categoryColor={item.categoryColor}>
                        {`${item.categoryName} categoryId:${item.categoryId} index:${index}`}
                        <AddCircleOutlineIcon style={{ color: item.categoryColor }} onClick={() => handleAddTodoClick(item)} />
                      </TitleContainer>
                      <InnerTodo
                        todoIndex={index}
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