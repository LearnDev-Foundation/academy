import toast from 'react-hot-toast';

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors;
}

const usernameVerify = (error = {}, values) => {
    if (!values.usernameVerify) {
        error.username = toast.error('Username Required!!');
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid Username!!');
    }

    return error
}