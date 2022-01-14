const API_URL = "https://nevits-todolist.herokuapp.com/"

export const login = (loginDto) => {
    return fetch(API_URL+"v1/auth", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(loginDto)
    });
}