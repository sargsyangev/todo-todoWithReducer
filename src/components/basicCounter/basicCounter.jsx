import { useEffect, useState } from 'react'
import styles from './basicCounter.module.css'

function BasicCounter() {
    const [counter, setCounter] = useState(0)
    const [rerendersCount, setRerendersCount] = useState(0)


    const increment = () => { setCounter(counter + 1) }
    const decrement = () => { setCounter(counter - 1) }

    useEffect(() => {
        setRerendersCount(rerendersCount + 1)
    }, [counter])

    return (
        <div className={styles.container}>
            <div className={styles.rerendersCount}>ReRendersCount is {rerendersCount}</div>
            <div className={styles.counter}>
                <button className={styles.buttons} onClick={increment}>+</button>
                <div className={styles.countDiv}>{counter}</div>
                <button className={styles.buttons} onClick={decrement}>-</button>
            </div>
        </div>
    )
}

export default BasicCounter