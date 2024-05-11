import { useState } from 'react'
import styles from './todoList.module.css'
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './todoItem';

function ToDoList() {

    const [todos, setTodos] = useState([])
    const [value, setIValue] = useState("")
    const [editValue, setEditValue] = useState("")
    const [error, setError] = useState('')
    const [current, setCurrent] = useState("")
    let currentTodos = todos

    const getAddValue = (e) => { setIValue(e.target.value) }

    const addTodo = () => {
        if (value.trim()) {
            setTodos([...todos, { id: uuidv4(), name: value, isDone: false, isEditable: false }])
        } else {
            setError("Task cannot be empty")
        }
        setIValue("")
    }

    const deleteTodo = (id) => { setTodos(todos.filter(todo => todo.id !== id)) }

    const doneTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone
            }
            return todo
        }))
    }

    const getEditValue = (e) => { setEditValue(e.target.value) }

    const editTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.isEditable) {
                todo.isEditable = !todo.isEditable
            }
            if (todo.id === id) {
                todo.isEditable = !todo.isEditable
                setEditValue(todo.name)
            }
            return todo
        }))
    }

    const saveEditValue = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.name = editValue
                todo.isEditable = !todo.isEditable
            }
            return todo
        }))
    }

    function addWithEnter(e) {
        if (e.key === "Enter") {
            addTodo()
        }
        setError("")
    }

    switch (current) {
        case "all":
            currentTodos = todos
            break
        case "completed":
            currentTodos = todos.filter(todo => todo.isDone === true)
            break
        case "inProcess":
            currentTodos = todos.filter(todo => todo.isDone === false)
            break
    }

    function getCurrentTodos(value) {
        setCurrent(value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.todoList}>
                <div className={styles.todoListName}>Todo List</div>
                <div className={styles.addTodo}>
                    <input className={error ? styles.errorInputAdd : styles.addInput}
                        placeholder={error ? "Task cannot be empty" : "Write some task..."}
                        value={value}
                        onChange={getAddValue}
                        onKeyDown={addWithEnter}
                    />
                    <button className={styles.addButton} onClick={addTodo}>Add</button>
                </div>
            </div>
            <div className={styles.todos}>
                {
                    currentTodos.map(todo => <TodoItem
                        key={todo.id}
                        todo={todo}
                        doneTodo={doneTodo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        getEditValue={getEditValue}
                        saveEditValue={saveEditValue}
                        editValue={editValue}
                    />)
                }
            </div>
            {todos.length > 1 && <div className={styles.cuurentTodos}>
                <button className={styles.allTodos} onClick={() => getCurrentTodos("all")}>All</button>
                <button className={styles.completedTodos} onClick={() => { getCurrentTodos("completed") }}>Completed</button>
                <button className={styles.inProcessTodos} onClick={() => getCurrentTodos("inProcess")}>InProcess</button>
            </div>}
        </div>
    )
}

export default ToDoList