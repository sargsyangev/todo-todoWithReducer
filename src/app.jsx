import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import BasicCounter from "./components/basicCounter/basicCounter";
import ToDoList from "./components/todoList/todoList";
import ToDoListWithReducer from "./components/todoListWithReducer/todoList/todoListWithReducer";
import Main from "./components/main/main";
import TodoItem from "./components/todoList/todoItem";


function App() {
    return (
        <Router>
            <div>
                <Main />
                <Routes>
                    <Route path="/basicCounter" element={<BasicCounter />} />
                    <Route path="/todoList" element={<ToDoList />} />
                    <Route path="/todoListWithReducer" element={<ToDoListWithReducer />} />
                    <Route path="/todoItem/:todoid" element={<TodoItem    />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;