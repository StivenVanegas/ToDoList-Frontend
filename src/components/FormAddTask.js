import { useState } from "react";
import { createTask } from "../services/TaskService";
import { updateUser } from "../services/UserService";
import { useAuth } from "../contexts/AuthContext";
import { useTasks } from "../contexts/TaskContext";

export const FormAddTask = () => {

    const {auth} = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {tasks, setTasks} = useTasks();
    const taskList = tasks.taskList;

    const handleChangeName = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const handleChangeDescription = (e) => {
        const value = e.target.value;
        setDescription(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmpty = name === "" || description === "";
        if (!isEmpty) {
            addTask();
        } else {
            console.log("complete los campos");
        }
    }

    const addTask = () => {
        
        const taskDto = {
            name: name,
            description: description
        };
        createTask(taskDto, auth.token)
            .then(response => response.json())
            .then(json => addTaskToUser(json))
            .catch(err => console.log(err));
    }

    const addTaskToUser = (data) => {
        const arr = [...taskList, data];
        setTasks((...prev) => ({...prev, taskList:arr}));
        const userDto = {
            tasks: arr
        };
        
        updateUser(userDto, auth.loggerUserId, auth.token)
            .then(handleClickCancel())
            .catch(err => console.log(err));
    }

    const handleClickCancel = () => {
        setName("");
        setDescription("");
        setShowForm(false);
    }

    return(
        <>
            {showForm ?
                <div className="p-1 m-1 border rounded">
                    <form onSubmit={handleSubmit}>
                        < input type="text" className="form-control shadow-none mb-1" placeholder="name"
                            value={name} onChange={(e) => handleChangeName(e)} />
                        < textarea className="form-control shadow-none mb-1" placeholder="description" rows="2"
                            value={description} onChange={(e) => handleChangeDescription(e)} />
                        <button className="btn1 me-1"> Add task</button>
                        <button className="btn2" type="button" onClick={() => handleClickCancel()}>Cancel</button>
                    </form>

                </div >
                :
                <div>
                    <button className="btn1 m-1" onClick={() => setShowForm(true)}>Add task</button>
                </div>
            }
        </>
    )
}