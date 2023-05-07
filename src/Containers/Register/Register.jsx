import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { images } from '../../Constants';
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from '../../helpers/validate';
import { registerUser } from '../../helpers/helper';
import axios from 'axios';

import './Register.scss';

const Register = () => {

  const [file, setFile] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password : '',
      confirmPassword : ''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      axios.post('http://localhost:8080/api/register', values)
        .then(response => {
          toast.success(response?.data?.message);
          registerUser(values)
          navigate('/username');
        })
        .catch(error => {
          if(error.response.status === 409){
            toast.error(error?.response?.data?.message)
          }
        })
    }
  })

  return (
    <div>
      <div className="app__register container mx-auto">

      <Toaster position='bottom-center' reverseOrder={false}></Toaster>

        <div className='flex justify-center items-center h-screen'>
          <div className="app__register-glass" style={{ width: "45%", paddingTop: '3em'}}>

            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Register</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                  Register to join the academy
              </span>
            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                    <label htmlFor="profile">
                      <img src={images.avatar} className="app__register-profileimg" alt="avatar" />
                    </label>
                </div>

                <div className="textbox flex flex-col items-center gap-6">
                    <input {...formik.getFieldProps('email')} className="app__register-textbox" type="email" placeholder='Email' />
                    <input {...formik.getFieldProps('username')} className="app__register-textbox" type="text" placeholder='Username' />
                    <input {...formik.getFieldProps('password')} className="app__register-textbox" type="password" placeholder='Password' />
                    <input {...formik.getFieldProps('confirmPassword')} className="app__register-textbox" type="password" placeholder='Confirm Password' />
                    <button className='app__register-btn' type='submit'>Register</button>
                </div>

                <div className="text-center py-4">
                  <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/username">Login Now</Link></span>
                </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register