import toast from 'react-hot-toast';
import { authenticate } from './helper';

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    if(values.username){
        const { status } = await authenticate(values.username);

        if( status != 200){
            errors.exist = toast.error("Username doesn't exist")
        }
    }

    return errors;
}

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Passwords do not match")
    }

    return errors;
}

export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    emailVerify(errors, values);
    passwordVerify(errors, values);
    confirmPasswordVerify(errors, values);

    return errors;
}

export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors
}

const passwordVerify = (errors = {}, values) => {

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
        errors.password = toast.error("Password Required!!");
    } else if (values.password.includes(" ")) {
        errors.password = toast.error("Password cannot contain space");
    } else if (values.password.length < 8) {
        errors.password = toast.error("Password must be at least 8 character");
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error("Password must have special characters");
    }

    return errors
}

const confirmPasswordVerify = (errors = {}, values) => {
    if (!values.confirmPassword) {
        errors.confirmPassword = toast.error("Confirm Password Required!!");
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = toast.error("Passwords do not match");
    }

    return errors
}

const usernameVerify = (errors = {}, values) => {
    if (!values.username) {
        errors.username = toast.error('Username Required!!');
    } else if (values.username.includes(" ")) {
        errors.username = toast.error('Username cannot contain space!!');
    }

    return errors
}

const emailVerify = (errors = {}, values) => {
    if (!values.email) {
        errors.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
        errors.email = toast.error("Wrong Email...!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = toast.error("Invalid email address...!")
    }

    return errors
}