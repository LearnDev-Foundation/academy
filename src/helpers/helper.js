import axios from 'axios';

export const authenticate = async (username) => {
    try {
        return await axios.post('http://localhost:8080/api/authentication', { username })
    } catch (error) {
        return { error: "Username doesn't exist" }
    }
}

export const verifyPassword = async ({ username, password }) => {
    try {
        if(username){
            const data = await axios.post('http://localhost:8080/api/login', { username, password }, { withCredentials : true });
            return Promise.resolve({ data })
        }
    } catch (error) {
        return Promise.reject({ error : "Password Incorrect" })
    }
}

export const updateUser = async (response) => {
    try {
        const token = localStorage.getItem('token');
        const data = await axios.put('http://localhost:8080/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile"})
    }
}