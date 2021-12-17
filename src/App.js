import './App.css';
import Todoitem from './Todoitem';
import React from 'react';
import { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

let id = 2;

function writeToLocalStorage(todos) {
    window.localStorage.setItem('todos', JSON.stringify(todos));
}

const TodoGroup = styled.div`
    position: absolute;
    top: 250px;
    left: 38%;
`;

const Title = styled.div`
    color: #9999cc;
    font-size: 56px;
    margin-top: 50px;
`;
const SubTitle = styled.div`
    color: #484891;
    font-size: 28px;
    margin-top: 10px;
`;

const AddButton = styled.button`
    background-color: #c7c7e2;
    height: 35px;
    width: 35px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    color: #484891;
    margin-left: 5px;

    &: hover {
        background-color: #5151a2;
        color: #ffffff;
    }
`;
const Input = styled.input`
    border: 1px solid #c7c7e2;
    height: 31px;
    width: 250px;
    color: #c7c7e2;
    border-radius: 5px;
    font-size: 20px;
    margin-bottom: 20px;
`;
const AppGroup = styled.div`
    display: grid;
    justify-content: center;
    text-align: center;
    position: absolute;
    left: 40%;
`;

const InputGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

function App() {
    //初始值是陣列 setTodos 記得要傳陣列
    const [todos, setTodos] = React.useState([{ id: 1, content: '練習用 React 寫 Todo', isDone: false }]);
    const [value, setValue] = React.useState('');

    useLayoutEffect(() => {
        const todoData = window.localStorage.getItem('todos') | '';
        if (todoData) {
            setTodos(JSON.parse(todoData));
        }
    }, []);

    useEffect(() => {
        writeToLocalStorage(todos);
        console.log('useEffect:todos', todos);

        //執行下個 Effect 先清掉上一個 Effect
        return () => {
            console.log('cleanEffect:todos', todos);
        };
    }, [todos]);

    const handleButtonClick = () => {
        setTodos([
            {
                id,
                content: value,
            },
            ...todos,
        ]);
        setValue('');
        id++;
    };
    const handleInputChange = (e) => {
        setValue(e.target.value);
    };
    //使用filter 取代 splice，filter 的概念是篩選後為 true 的留下
    //留下來的todo id 要不等於點擊刪除的 id
    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleToggleIsDone = (id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id !== id) return todo;
                return {
                    ...todo,
                    isDone: !todo.isDone,
                };
            })
        );
    };

    //使用 map 取代迴圈 for
    //input 這個情境就是 controlled component
    //handleDeleteTodo 是傳入一個 function，但在 child component 才呼叫該function
    return (
        <div>
            <AppGroup>
                <Title>DAILY TODOS</Title>
                <SubTitle>Enjoy getting things done!</SubTitle>
                <InputGroup>
                    <Input type="text" placeholder="todo" value={value} onChange={handleInputChange} />
                    <AddButton onClick={handleButtonClick}>
                        <FontAwesomeIcon icon={faPlus} />
                    </AddButton>
                </InputGroup>
            </AppGroup>
            <TodoGroup>
                {todos.map((todo) => (
                    <Todoitem
                        todo={todo}
                        key={todo.id}
                        handleDeleteTodo={handleDeleteTodo}
                        handleToggleIsDone={handleToggleIsDone}
                    />
                ))}
            </TodoGroup>
        </div>
    );
}

export default App;
