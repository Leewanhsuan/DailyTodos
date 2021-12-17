import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

const TodoContent = styled.div`
    color: #666666;
    font-size: 20px;
    margin-top: 20px;
    width: 200px;
    position: relative;
    left: 5%;
    ${(props) =>
        props.$isDone &&
        `
    text-decoration: line-through`};
`;

const DoneButton = styled.button`
    width: 35px;
    height: 35px;
    color: #5151a2;
    border: 1px solid #ffffff;
    border-radius: 50px;
    margin-top: 15px;
    position: relative;
    left: 0%;

    &: hover {
        background-color: #5151a2;
        color: #ffffff;
    }
`;

const DeleteButton = styled.button`
    height: 35px;
    width: 35px;
    color: #5151a2;
    border: 1px solid #ffffff;
    border-radius: 5px;
    margin: 5px;
    margin-left: 100px;

    &: hover {
        background-color: #5151a2;
        color: #ffffff;
    }
`;

const TodoItemWrapper = styled.div`
    display: flex;
    justify-content: left;
    margin-top: 20px;
    position: relative;
    border-bottom: 1px solid #9999cc;
    width: 400px;
`;
const TodoButtonWrapper = styled.div`
    padding: 10px;
`;

//記得傳值 content 進來
//使用三元運算子取代 if/else
//以$字符號區分，作為傳給style使用的依據
function Todoitem({ todo, handleDeleteTodo, handleToggleIsDone }) {
    const handleToggleClick = () => {
        handleToggleIsDone(todo.id);
    };
    const handleDeleteClick = () => {
        handleDeleteTodo(todo.id);
    };

    return (
        <div>
            <TodoItemWrapper data-to-id={todo.id}>
                <DoneButton onClick={handleToggleClick}>
                    {todo.isDone ? <FontAwesomeIcon icon={faCheck} /> : ''}
                </DoneButton>
                <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
                <TodoButtonWrapper>
                    <DeleteButton onClick={handleDeleteClick}>
                        <FontAwesomeIcon icon={faXmark} />
                    </DeleteButton>
                </TodoButtonWrapper>
            </TodoItemWrapper>
        </div>
    );
}
export default Todoitem;
