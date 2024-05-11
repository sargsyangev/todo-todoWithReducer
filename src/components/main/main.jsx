import { useNavigate } from "react-router-dom"
import styles from "./main.module.css"

function Main() {
    const navigate = useNavigate()

    const handleBasicCounter = () => navigate("/basicCounter")
    const handleTodoList = () => navigate("/todoList")
    const handleTodoListWithReducer = () => navigate("/todoListWithReducer")

    return (
        <div className={styles.main}>
            <button onClick={handleBasicCounter}>basicCounter</button>
            <button onClick={handleTodoList}>todoList</button>
            <button onClick={handleTodoListWithReducer}>todoListWithReducer</button>
        </div>
    )
}
export default Main