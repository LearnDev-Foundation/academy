import React from 'react';
import { Link } from 'react-router-dom'
import { images } from '../../Constants';
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from '../../helpers/validate';

import "./Password.scss";

const Password = () => {

  const formik = useFormik({
    initialValues: {
      password : ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  })

  return (
    <div>

      <div className='app__password container mx-auto'>

        <Toaster position='bottom-center' reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
            
            <div className='app__password-glass'>

              <div className="title flex flex-col items-center">
                <h4 className="text-5xl font-bold">Welcome Back</h4>
                <span className="py-4 text-xl w-2/3 text-center text-gray-500">Please input your password</span>
              </div>

              <form action="" className="py-1" onSubmit={formik.handleSubmit}>
                <div className="profile flex justify-center py-4">
                  <img src={images.avatar} className='app__password-profileimg' alt="avatar" />
                </div>

                <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} type="Password" className="app__password-textbox" placeholder='Password' />
                  <button className='app__password-btn' type="submit">Sign In</button>
                </div>

                <div className="text-center py-4">
                  <span className='text-gray-500'>Forgot Pasword? <Link className='text-red-500' to="/recovery">Password Recovery</Link> </span>
                </div>
              </form>

            </div>

        </div>
      </div>
    </div>
  )
}

export default Password;