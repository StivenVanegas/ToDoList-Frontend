const API_URL = "https://nevits-todolist.herokuapp.com/";

export const getTasks = (userId, token) => {
    return fetch(API_URL+"v1/user/tasks/"+userId,{
        method:"GET",
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        }
    });
}

export const updateUser = (userDto, userId, token) => {
    return fetch(API_URL+"v1/user/"+userId, {
        method:"PUT",
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify(userDto)
    });
}

export const createUser = (userDto)  => {
    return fetch(API_URL+"v1/user", {
        method:"POST",
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify(userDto)
    });
}
