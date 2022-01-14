import React, { useState } from "react";

const taskList = [];
const initialData = { taskList };
const TaskContext = React.createContext(initialData);

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState(initialData);
    const value = {tasks, setTasks};
    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTasks = () => {
    const context = React.useContext(TaskContext);
    return context;
}