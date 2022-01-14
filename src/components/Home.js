import { useState, useEffect } from "react";
import { Header } from "./Header";
import { getTasks} from "../services/UserService";
import { Modal } from "./Modal";
import { FormAddTask } from "./FormAddTask";
import { useTasks } from "../contexts/TaskContext";
import { useAuth } from "../contexts/AuthContext";
import { Spinner } from "./Spinner";
import { useModal } from "../contexts/ModalContext";

export const Home = () => {
    
    const {auth} = useAuth();
    const {tasks, setTasks} = useTasks();
    const taskList = tasks.taskList;
    const [loading, setLoading] = useState(true);
    const [selectTask, setSelectTask] = useState({});
    const {modal, setModal} = useModal();

    const listTasks = () => {
        getTasks(auth.loggerUserId, auth.token)
            .then(response => response.json())
            .then(json => {
                setTasks((...prev) => ({...prev, taskList:json}));
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    const handleClickTask = (task) => {
        setSelectTask(task);
        setModal((...prev) => ({...prev, show:true}));
    }

    const deleteTask = (e, taskId) => {
        e.stopPropagation();
        const arr = taskList.filter(task => task.id !== taskId);
        setTasks((...prev) => ({...prev, taskList:arr}));
        console.log(arr);
    }

    useEffect(() => {
        listTasks();
    }, []);

    return(
        <>
            <div className="home-container">
                <Header/>
                <div className="list-tasks mt-2">
                    <div>
                        <h2 className="m-2">Your Tasks</h2>
                    </div>
                    {loading ?
                        <Spinner></Spinner> 
                        :
                        <>
                        {
                            taskList.map((task) => {
                                return(

                                    <div className="task p-2" key={task.id} onClick={() => handleClickTask(task)}>
                                        <div className="task-info">
                                            <h3>{task.name}</h3>
                                            <p className="m-0">{task.description}</p>
                                        </div>
                                        <div className="delete-task">
                                            <i className="bi-trash icon" onClick={(e) => deleteTask(e,task.id)}/>
                                        </div>
                                    </div>
                                        
                                );
                            })
                        }
                        <FormAddTask/>
                        </>
                    }
                    
                </div>      
            </div>
            <Modal task={selectTask}/>
        </>
    );
}