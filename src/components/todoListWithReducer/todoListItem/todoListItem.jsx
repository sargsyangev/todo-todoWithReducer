import styles from "./todoListItem.module.css"

function ToDoListItem({ todo, editTodo, deleteTodo, updateTodoStatus }) {
    return (
        <div className={styles.todoItem}>
            <div className={todo.priority === "Low Priority" ? styles.priorityLowDiv :
                todo.priority === "Medium Priority" ? styles.priorityMediumDiv : styles.priorityHigthDiv}>
                {todo.priority}
            </div>
            <div className={styles.titleDiv}>
                <span className={styles.titleText}>Titile:</span>
                <span >{todo.title}</span>
            </div>
            <div className={styles.descriptionDiv}>
                <span className={styles.descriptionText}>Description:</span>
                <span> {todo.description} </span>
            </div>
            <div className={styles.statusBtnsDiv}>
                <span className={styles.statusText}>Status:</span>
                <button className={todo.status === "todo" ?styles.todoStatusBtnActive :styles.todoStatusBtn} onClick={() => updateTodoStatus(todo.id, "todo")}>todo</button>
                <button className={todo.status === "doing" ?styles.doingStatusBtnActive :styles.doingStatusBtn} onClick={() => updateTodoStatus(todo.id, "doing")}>doing</button>
                <button className={todo.status === "done" ?styles.doneStatusBtnActive :styles.doneStatusBtn} onClick={() => updateTodoStatus(todo.id, "done")}>done</button>
            </div>
            <div className={styles.actionBtnsDiv}>
                <button disabled={todo.status === "done"} className={styles.editBtn} onClick={() => editTodo(todo.id, todo.title, todo.priority, todo.description)}>Edit</button>
                <button className={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        </div>
    )
}

export default ToDoListItem