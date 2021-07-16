import React, { FC, ReactElement, useCallback, useEffect, useState, useReducer } from 'react'
import TdInput from './Input'
import TdList from './List'
import { todoReducer } from './reducer'
import { ITodo, IState, ACTION_TYPE } from './typings'

// const initState: IState = {
//     todoList: []
// }

function init(initTodoList: ITodo[]): IState {
    return {
        todoList: initTodoList
    }
}

const TodoList: FC = (): ReactElement => {
    // const [todoList, setTodoList] = useState<ITodo[]>([])
    const [state, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
        const todolist: ITodo[] = JSON.parse(localStorage.getItem("todolist") || "[]")
        dispatch({
            type: ACTION_TYPE.INIT_TODOLIST,
            payLoad: todolist
        })
    }, [])

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(state.todoList))
    }, [state.todoList])
    
    const addTodo = useCallback((todo: ITodo): void => {
        // setTodoList(todoList => [...todoList, todo])
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payLoad: todo
        })
    }, [])

    const removeTodo = useCallback((id: number): void => {
        // setTodoList(todoList => [...todoList, todo])
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payLoad: id
        })
    }, [])

    const toggleTodo = useCallback((id: number): void => {
        // setTodoList(todoList => [...todoList, todo])
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payLoad: id
        })
    }, [])

    return (
        <div className='todo-list'>
            <TdInput 
                addTodo={addTodo}
                todoList={state.todoList}
            />
            <TdList
                todoList={state.todoList}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}

export default TodoList
