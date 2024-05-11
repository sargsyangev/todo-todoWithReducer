import { createPortal } from 'react-dom'
import styles from './todoListModal.module.css'
import { useRef } from 'react'

function TodoListMOdal({ closeModal, title, changeTitle, priority, chengePriority, description, chengeDescription, state, saveEditTodo, addTodo, error }) {
    const refModal = useRef(null)

    function outSideClick(e) {
            if (refModal.current && !refModal.current.contains(e.target)) {
                console.log(refModal.current)
                closeModal()
            }
    }

    return createPortal(<div onClick={outSideClick} className={styles.modalContainer}>

        <div ref={refModal}  className={styles.modal}>
            <div className={styles.closeBtnDiv}><button className={styles.closeBtn} onClick={closeModal}>X</button></div>
            <div className={styles.titleDiv}>
                <span className={styles.titleText}>Title:</span>
                <input className={styles.titleInput} placeholder="Write title for a task" value={title} onChange={changeTitle} />
            </div>
            <div className={styles.priorityDiv}>
                <span className={styles.titleText}> Priority:</span>

                <select className={styles.selectPriority} value={priority} onChange={chengePriority}>
                    <option className={styles.optionDefault} value=""> Select a Priority </option>
                    <option className={styles.optionLow} value="Low Priority">Low Priority</option>
                    <option className={styles.optionMedium} value="Medium Priority">Medium Priority</option>
                    <option className={styles.optionHigth} value="Higth Priority">Higth Priority</option>
                </select>
            </div>
            <div className={styles.descriptionDiv}>
                <span className={styles.titleText}>Description:</span>
                <textarea className={styles.textArea} placeholder='Write description for a task ' value={description} onChange={chengeDescription} />
            </div>
            {error ? <div className={styles.errorMessege}>{error}</div> : <></>}

            {state.find(el => el.isEditable) ?
                <button className={styles.saveTaskBtn} onClick={() => {
                    let isEditableId = state.filter(el => el.isEditable)[0].id
                    saveEditTodo(isEditableId, title, priority, description)
                }}>Save</button> :
                <button className={styles.addTaskBtn} onClick={addTodo}>Add task</button>
            }
        </div>
    </div>, document.body)
}

export default TodoListMOdal