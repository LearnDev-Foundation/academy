import React, { useState } from 'react';
import { images } from '../../Constants';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../../helpers/validate';
import convertToBase64 from '../../helpers/convert';

import './Profile.scss';

const Profile = () => {

  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues : {
      firstName: '',
      lastname : '',
      username : '',
      email : '',
      twitter : '',
      linkedin : '',
      github : '',
    },
    enableReinitialize : true,
    validate : profileValidation,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
      console.log(values)
    }
  })

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className='container mx-auto app__profile'>

      <Toaster position='bottom-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className="app__profile-glass" style={{ width: "45%", paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Register to join the academy
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={file || images.avatar} className="app__register-profileimg" alt="avatar" />
                </label>
                
                <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex gap-10 w-3/4">
                <input {...formik.getFieldProps('firstName')} className="app__profile-textbox" type='text' placeholder='First Name' />
                <input {...formik.getFieldProps('lastName')} className="app__profile-textbox" type='text' placeholder='Last Name' />
              </div>

              <div className="name flex gap-10 w-3/4">
                <input {...formik.getFieldProps('username')} className="app__profile-textbox" type='text' placeholder='Username' />
                <input {...formik.getFieldProps('email')} className="app__profile-textbox" type='email' placeholder='Email Address' />
              </div>

              <div className="name flex gap-10 w-3/4">
                <input {...formik.getFieldProps('twitter')} className="app__profile-textbox" type='text' placeholder='Twitter' />
                <input {...formik.getFieldProps('linkedin')} className="app__profile-textbox" type='text' placeholder='Linkedin' />
              </div>

              <input {...formik.getFieldProps('github')} className="app__profile-textbox" type='text' placeholder='Github' />
              <button className="app__profile-btn" type='submit'>Update</button>

            </div>

            <div className="text-center py-4">
              <button className='text-red-500' to="/">Logout</button>
            </div>
          </form>

        </div>
      </div>

    </div>
  )
}

export default Profile;
