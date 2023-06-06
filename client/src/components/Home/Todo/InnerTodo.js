import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ReactComponent as CatBasic } from '../../../assets/cat-basic.svg';
import styled from '@emotion/styled'
const CatContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  margin: '0px 5px',
  })

  const ItemContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    fontWeight: 'normal',
    color: 'black',
  })

const getListStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
});

const InnerTodo = ({ type, subItems, color, setSubItems }) => {

  const pendingColor = '#eeeeee';
  
  const handleCatClick = (id, isDone) => {
    const newSubItem = subItems.map(todo => todo.id === id
    ? { ...todo, isDone: !isDone }
    : todo
    )
    const categoryId = subItems[0].categoryId;
    setSubItems(newSubItem, categoryId)
  }

  return (
    <Droppable droppableId={type} type={`droppableSubItem`}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={getListStyle()}
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
                      <CatContainer onClick={()=>handleCatClick(item.id, item.isDone)}>
                        <CatBasic fill={item.isDone ? color : pendingColor} />
                      </CatContainer>
                      {`${item.content}`}
                    
                  </ItemContainer>
                  {provided.placeholder}
                  </div>
                  
                
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default InnerTodo;
