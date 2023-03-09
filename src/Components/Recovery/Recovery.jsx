import React from 'react';
import { Link } from 'react-router-dom'
import { images } from '../../Constants';
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { otpValidate } from '../../helpers/validate';

import "./Recovery.scss";

const Recovery = () => {

  const formik = useFormik({
    initialValues: {
      otp : ''
    },
    validate: otpValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  })

  return (
    <div>

      <div className='app__recovery container mx-auto'>

        <Toaster position='bottom-center' reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
            
            <div className='app__recovery-glass'>

              <div className="title flex flex-col items-center">
                <h4 className="text-5xl font-bold">Password Recovery</h4>
                <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter OTP to recover password</span>
              </div>

              <form action="" className="pt-20" onSubmit={formik.handleSubmit}>
                <div className="textbox flex flex-col items-center gap-6">
                  <div className="input text-center">
                    <span className="py-4 text-sm text-left text-gray-500">
                      Enter 6 digit OTP sent to your email address.
                    </span>
                    <input {...formik.getFieldProps('otp')} type="digits" className="app__recovery-textbox" placeholder='OTP' />
                  </div>
                  <button className='app__recovery-btn' type="submit">Recover</button>
                </div>

                <div className="text-center py-4">
                  <span className='text-gray-500'>Can't get OTP? <button className='text-red-500'>Password Recovery</button> </span>
                </div>
              </form>

            </div>

        </div>
      </div>
    </div>
  )
}

export default Recovery;