import React from 'react';
import { Link } from 'react-router-dom'
import { images } from '../../Constants';
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from '../../helpers/validate';

import "./Username.scss";

const Username = () => {

  const formik = useFormik({
    initialValues: {
      username : ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  })

  return (
    <div>

      <div className='app__username container mx-auto'>

        <Toaster position='bottom-center' reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
            
            <div className='app__username-glass'>

              <div className="title flex flex-col items-center">
                <h4 className="text-5xl font-bold">Welcome Back</h4>
                <span className="py-4 text-xl w-2/3 text-center text-gray-500">Type in your username to login</span>
              </div>

              <form action="" className="py-1" onSubmit={formik.handleSubmit}>
                <div className="profile flex justify-center py-4">
                  <img src={images.avatar} className='app__username-profileimg' alt="avatar" />
                </div>

                <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('username')} type="text" className="app__username-textbox" placeholder='Username' />
                  <button className='app__username-btn' type="submit">Proceed</button>
                </div>

                <div className="text-center py-4">
                  <span className='text-gray-500'>Don't have an account? <Link className='text-red-500' to="/register">Register</Link> </span>
                </div>
              </form>

            </div>

        </div>
      </div>
    </div>
  )
}

export default Username