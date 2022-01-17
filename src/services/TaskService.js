const API_URL = "https://nevits-todolist.herokuapp.com/";

export const createTask = (taskDto, token) => {
    return fetch(API_URL+"v1/task", {
        method: "POST",
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify(taskDto)
    });
}

export const updateTask = (taskDto, taskId, token) => {
    return fetch(API_URL+"v1/task/"+taskId, {
        method:"PUT",
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify(taskDto)
    });
}