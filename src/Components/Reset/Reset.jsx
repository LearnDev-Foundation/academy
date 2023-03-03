import React from 'react';
import { Link } from 'react-router-dom'
import { images } from '../../Constants';
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from '../../helpers/validate';

import "./Reset.scss";

const Reset = () => {

  const formik = useFormik({
    initialValues: {
      password : '',
      confirm_pwd: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  })

  return (
    <div>

      <div className='app__reset container mx-auto'>

        <Toaster position='bottom-center' reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
            
            <div className='app__reset-glass'>

              <div className="title flex flex-col items-center">
                <h4 className="text-5xl font-bold">Reset Password</h4>
                <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter new password</span>
              </div>

              <form action="" className="pt-20" onSubmit={formik.handleSubmit}>
                <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} type="Password" className="app__reset-textbox" placeholder='New Password' />
                  <input {...formik.getFieldProps('confirm_pwd')} type="Password" className="app__reset-textbox" placeholder='Confirm Password' />
                  <button className='app__reset-btn' type="submit">Reset</button>
                </div>
              </form>

            </div>

        </div>
      </div>
    </div>
  )
}

export default Reset;