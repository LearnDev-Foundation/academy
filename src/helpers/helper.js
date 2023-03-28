import axios from 'axios';

export const authenticate = async (username) => {
    try {
        return await axios.post('http://localhost:8080/api/authentication', { username })
    } catch (error) {
        return { error: "Username doesn't exist" }
    }
}

export const getUser = async ({ username }) => {
    try {
        const { data } = await axios.get(`http://localhost:8080/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "An error occured" }
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

export const registerUser = async (credentials) => {
    let { username, email } = credentials;

    axios.post('http://localhost:8080/api/registerMail', { username, userEmail : email })
}

export const generateOTP = async (username) => {
    try {
        const { data : { code }, status } = await axios.get('http://localhost:8080/api/generateOTP', { params : { username }});

        if (status == 201) {
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('http://localhost:8080/api/resetPasswordMail', { username, userEmail: email, text })
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error })
    }
}

export const verifyOTP = async ({ username, code }) => {
    try {
        const { data, status } = await axios.get('http://localhost:8080/api/verifyOTP', { params : { username, code }})
        return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

export const resetPassword = async ({ username, password }) => {
    try {
        const { data, status } = await axios.put('http://localhost:8080/api/resetPassword', { username, password });
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}