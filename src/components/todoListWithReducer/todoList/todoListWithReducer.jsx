import { useReducer, useState } from 'react'
import styles from './todoList.module.css'
import { ACTION_TYPES, todos } from './constants'
import ToDoListItem from '../todoListItem/todoListItem'
import TodoListMOdal from '../todoListModal/todoListModal'


function reducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.TODO_ADD:
            return [...state, { id: Math.random(), title: action.title, priority: action.priority, description: action.description, status: "todo", isEditable: false }]

        case ACTION_TYPES.TODO_DELETE:
            return state.filter(todo => todo.id !== action.id)

        case ACTION_TYPES.TODO_EDIT:
            return state.map(todo => {
                if (todo.isEditable) {
                    todo.isEditable = false
                }
                if (todo.id === action.id) {
                    todo.isEditable = !action.isEditable
                }
                return todo
            })

        case ACTION_TYPES.TODO_SAVE_EDIT:
            return state.map(todo => {
                if (todo.id === action.id) {
                    todo.isEditable = false
                    todo.title = action.title
                    todo.priority = action.priority
                    todo.description = action.description
                }
                return todo
            })

        case ACTION_TYPES.TODO_STATUS_UPDATE:
            return state.map(todo => {
                if (todo.id === action.id) {
                    todo.status = action.status
                }
                return todo
            })
    }
}

function ToDoListWithReducer() {

    const [state, dispatch] = useReducer(reducer, todos)
    const [title, setTitle] = useState("")
    const [modal, setModal] = useState(false)
    const [priority, setPriority] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")

    const openModal = () => { setModal(true) }
    const closeModal = () => {
        setModal(false)
        setTitle("")
        setPriority("")
        setDescription("")
    }
    const changeTitle = (e) => { setTitle(e.target.value), setError("") }
    const chengePriority = (e) => { setPriority(e.target.value), setError("") }
    const chengeDescription = (e) => { setDescription(e.target.value), setError("") }

    const addTodo = () => {
        if (title.trim() && description.trim() && priority) {
            dispatch({ type: "TODO_ADD", title, priority, description })
            setModal(false)
            setTitle('')
            setPriority("")
            setDescription("")
        } else {
            setError("All fields must not be empty")
        }
    }

    const deleteTodo = (id) => {
        dispatch({ type: "TODO_DELETE", id })
    }

    const editTodo = (id, title, priority, description) => {
        dispatch({ type: "TODO_EDIT", id, title, priority, description })
        openModal()
        setTitle(title)
        setPriority(priority)
        setDescription(description)
    }

    const saveEditTodo = (id, title, priority, description) => {
        if (title.trim() && description.trim() && priority) {
            dispatch({ type: "TODO_SAVE_EDIT", id, title, priority, description })
            closeModal()
        }
    }

    const updateTodoStatus = (id, status) => {
        dispatch({ type: "TODO_STATUS_UPDATE", id, status })
    }

    console.log(state)
    return (
        <div className={styles.container}>
            <div className={styles.todoArena}>
                <p className={styles.titleTodo}>To Do</p>
                {
                    state.filter(el => el.status === "todo").map(todo => {
                        return <ToDoListItem
                            key={todo.id}
                            todo={todo}
                            editTodo={editTodo}
                            deleteTodo={deleteTodo}
                            updateTodoStatus={updateTodoStatus}
                        />

                    })
                }
                <button className={styles.addTaskBtn} onClick={openModal}>Add task +</button>

                {modal && <TodoListMOdal
                    error={error}
                    state={state}
                    closeModal={closeModal}
                    title={title}
                    changeTitle={changeTitle}
                    priority={priority}
                    chengePriority={chengePriority}
                    description={description}
                    chengeDescription={chengeDescription}
                    saveEditTodo={saveEditTodo}
                    addTodo={addTodo}
                />
                }
            </div>
            <div className={styles.doingArena}>
                <p className={styles.titleDoing}>Doing</p>
                {
                    state.filter(el => el.status === "doing").map(todo => <ToDoListItem
                        key={todo.id}
                        todo={todo}
                        editTodo={editTodo}
                        deleteTodo={deleteTodo}
                        updateTodoStatus={updateTodoStatus} />)
                }

            </div>
            <div className={styles.doneArena}>
                <p className={styles.titleDone}>Done</p>
                {
                    state.filter(el => el.status === "done").map(todo => <ToDoListItem
                        key={todo.id}
                        todo={todo}
                        editTodo={editTodo}
                        deleteTodo={deleteTodo}
                        updateTodoStatus={updateTodoStatus} />)
                }

            </div>
        </div>
    )
}

export default ToDoListWithReducer