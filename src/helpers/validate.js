import toast from 'react-hot-toast';

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors;
}

export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

export async function otpValidate(values){
    const errors = otpVerify({}, values);

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
    passwordVerify(errors, values);
    emailVerify(errors, values);

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

    return errors;
}

const otpVerify = (errors = {}, values) => {
    if (!values.otp) {
        errors.otp = toast.error("OTP Required!!");
    } else if (values.otp.length !== 6) {
        errors.otp = toast.error("OTP must be 6 digit");
    }

    return errors;
}

const usernameVerify = (errors = {}, values) => {
    if (!values.username) {
        errors.username = toast.error('Username Required!!');
    } else if (values.username.includes(" ")) {
        errors.username = toast.error('Username cannot contain space!!');
    }

    return errors;
}

const emailVerify = (errors = {}, values) => {
    if (!values.email) {
        errors.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
        errors.email = toast.error("Wrong Email...!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = toast.error("Invalid email address...!")
    }

    return errors;
}