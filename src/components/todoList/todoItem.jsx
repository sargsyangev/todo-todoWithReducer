import { useNavigate } from 'react-router-dom'
import styles from './todoItem.module.css'
function TodoItem({ todo, doneTodo, deleteTodo, editTodo, getEditValue, saveEditValue, editValue }) {

    const navigate = useNavigate()
    const handleGoToNewPage = () => navigate(`/todoItem/${todo.id}`)


    return (
        <div className={todo.isDone ? styles.todoDone : todo.isEditable ? styles.todoEdit : styles.todoItem}>
            <div className={styles.todoName}>
                {todo.isEditable ?
                    <input className={styles.editInput} autoFocus value={editValue} onChange={getEditValue} /> :
                    <div className={todo.isDone ? styles.isDone : ""}> {todo.name}</div>
                }
            </div>
            <div className={styles.todoButtons}>
                <button className={styles.pageBtn} onClick={handleGoToNewPage}>goToNewPage</button>
                <button className={styles.doneBtn} onClick={() => doneTodo(todo.id)} disabled={todo.isEditable} > Done</button>
                {todo.isEditable ?
                    <button className={styles.saveBtn} onClick={() => saveEditValue(todo.id)}>Save</button> :
                    <button className={styles.editBtn} onClick={() => editTodo(todo.id)} disabled={todo.isDone}>Edit</button>
                }
                <button className={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        </div>
    )
}

export default TodoItem