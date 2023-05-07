import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../Constants';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../../helpers/validate';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../helpers/helper';
import { useAuthStore } from '../../store/store';
import useFetch from '../../hooks/fetch.hook';
import jwt_decode from 'jwt-decode';

import './Profile.scss';

const Profile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);

  const data = useFetch(decoded.user);

  const formik = useFormik({
    initialValues : {
      firstName: data?.firstName || '',
      lastName : data?.lastName || '',
      username : data?.username || '',
      email : data?.email || '',
      twitter : data?.twitter || '',
      linkedin : data?.linkedin ||  '',
      github : data?.github || '',
    },
    enableReinitialize : true,
    validate : profileValidation,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values => {
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successful</b>,
        error: <b>Could not process update</b>
      })

      updatePromise.then(res => {
        navigate('/academy')
      })
    }
  })

  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className='container mx-auto app__profile'>

      <Toaster position='bottom-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className="app__profile-glass" style={{ width: "45%", paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Update your profile
            </span>
          </div>

          <form onSubmit={formik.handleSubmit} className="py-1">
            <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={images.avatar} className="app__register-profileimg" alt="avatar" />
                </label>
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

              <div className="text-center py-4">
                <span className='text-gray-500'><Link className='text-red-500' to="/academy">Skip</Link> </span>
              </div>

            </div>

            <div className="text-center py-4">
              <button className='text-red-500' onClick={userLogout}>Logout</button>
            </div>
          </form>

        </div>
      </div>

    </div>
  )
}

export default Profile;
