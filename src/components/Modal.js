import { useEffect, useState } from "react";
import { useModal } from "../contexts/ModalContext";
import { useTasks } from "../contexts/TaskContext";
import { updateTask} from "../services/TaskService";
import { useAuth } from "../contexts/AuthContext";

export const Modal = ({task}) => {

    const {auth} = useAuth();
    const {modal, setModal}  = useModal();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {tasks, setTasks} = useTasks();

    const handleClickClose = (e) => {
        e.stopPropagation();
        setModal((...prev) => ({...prev, show:false}));
        setEdit(false);
    }

    const handleClickCard = (e) => {
        e.stopPropagation();
    }

    const handleEdit = (e) => {
        e.stopPropagation();
        setEdit(true);
    }

    const handleSave = (e) => {
        e.stopPropagation();
        const isEmpty = name === "" || description === "";
        if(!isEmpty){
            editTask();
        } else {
            console.log("Complete los campos");
        }
    }

    const editTask = () => {
        const taskList = tasks.taskList;
        const newTasks = taskList.map((t) => {
            if(t.id === task.id){
                return {...t, name: name, description: description};
            }
            return t;
        });
        setTasks((...prev) => ({...prev, taskList:newTasks}));
        const t = newTasks.find(t => t.id === task.id);
        updateTask(t, task.id, auth.token);
        setEdit(false);
    }

    const handleCancel = (e) => {
        e.stopPropagation();
        setEdit(false);
    }

    const handleChangeName = (e) => {
        e.stopPropagation();
        const value = e.target.value;
        setName(value);
    }

    const handleChangeDescription = (e) => {
        e.stopPropagation();
        const value = e.target.value;
        setDescription(value);
    }

    useEffect(() => {
        setName(task.name);
        setDescription(task.description);
    },[task]);

    return (
        <div hidden={!modal.show}>
            <div className="modal-background" onClick={(e) => handleClickClose(e)}>
                <div className="modal-card" onClick={(e) => handleClickCard(e)}>
                    <div className="card-header">
                        <h2 className="m-0">Task</h2>
                    </div>
                    <div className="card-body">
                        {!edit?
                            <>
                                <h3>{name}</h3>
                                <p>{description}</p>
                                <button className="btn1" onClick={(e) =>handleEdit(e)}>Edit task</button>
                            </>
                            :
                            <>
                                < input type="text" className="form-control shadow-none mb-1" placeholder="name"
                                    value={name} onChange={(e) => handleChangeName(e)} />
                                < textarea className="form-control shadow-none mb-1" placeholder="description" rows="2"
                                    value={description} onChange={(e) => handleChangeDescription(e)} />
                                <button className="btn1 me-2" onClick={(e) => handleSave(e)}>Save task</button>
                                <button className="btn2" onClick={(e) => handleCancel(e)}>Cancel</button>
                            </>
                        }
                        
                    </div>
                    <div className="card-footer">
                        <button className="btn1" onClick={(e) => handleClickClose(e)}>Close</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}