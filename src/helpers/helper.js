import axios from "axios";

export const authenticate = async (username) => {
	try {
		return await axios.post("https://vast-jade-shrimp-hem.cyclic.app/api/authentication", { username });
	} catch (error) {
		return { error: "Username doesn't exist" };
	}
};

export const getUser = async ({ username }) => {
	try {
		const { data } = await axios.get(`https://vast-jade-shrimp-hem.cyclic.app/api/user/${username}`);
		return { data };
	} catch (error) {
		return { error : "An error occured" };
	}
};

export const verifyPassword = async ({ username, password }) => {
	try {
		if(username){
			const data = await axios.post("https://vast-jade-shrimp-hem.cyclic.app/api/login", { username, password }, { withCredentials : true });
			return Promise.resolve({ data });
		}
	} catch (error) {
		return Promise.reject({ error : "Password Incorrect" });
	}
};

export const updateUser = async (response) => {
	try {
		const token = localStorage.getItem("token");
		const data = await axios.put("https://vast-jade-shrimp-hem.cyclic.app/api/updateuser", response, { headers : { "Authorization" : `Bearer ${token}`}});

		return Promise.resolve({ data });
	} catch (error) {
		return Promise.reject({ error : "Couldn't Update Profile"});
	}
};

export const registerUser = async (credentials) => {
	let { username, email } = credentials;

	axios.post("https://vast-jade-shrimp-hem.cyclic.app/api/registerMail", { username, userEmail : email });
};

export const generateOTP = async (username) => {
	try {
		const { data : { code }, status } = await axios.get("https://vast-jade-shrimp-hem.cyclic.app/api/generateOTP", { params : { username }});

		if (status == 201) {
			let { data : { email }} = await getUser({ username });
			let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
			await axios.post("https://vast-jade-shrimp-hem.cyclic.app/api/resetPasswordMail", { username, userEmail: email, text });
		}
		return Promise.resolve(code);
	} catch (error) {
		return Promise.reject({ error });
	}
};

export const verifyOTP = async ({ username, code }) => {
	try {
		const { data, status } = await axios.get("https://vast-jade-shrimp-hem.cyclic.app/api/verifyOTP", { params : { username, code }});
		return { data, status };
	} catch (error) {
		return Promise.reject(error);
	}
};

export const resetPassword = async ({ username, password }) => {
	try {
		const { data, status } = await axios.put("https://vast-jade-shrimp-hem.cyclic.app/api/resetPassword", { username, password });
		return Promise.resolve({ data, status });
	} catch (error) {
		return Promise.reject({ error });
	}
};