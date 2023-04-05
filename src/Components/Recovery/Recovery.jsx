import React, { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store/store";
import { generateOTP, verifyOTP } from '../../helpers/helper';
import { useNavigate } from 'react-router-dom';

import "./Recovery.scss";

const Recovery = () => {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if(OTP) return toast.success('OTP has been sent to your email!');
      return toast.error('Problem while generating OTP!')
    })
  }, [username]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP });
      if(status == 201){
        toast.success('Verification Successful!');
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wrong OTP, Please confirm otp')
    }
  }

  const resendOTP = () => {
    let sentPromise = generateOTP(username);
    toast.promise(sentPromise,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>OTP could not be sent</b>,
      }
    );
  }

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

              <form action="" className="pt-20" onSubmit={onSubmit}>
                <div className="textbox flex flex-col items-center gap-6">
                  <div className="input text-center">
                    <span className="py-4 text-sm text-left text-gray-500">
                      Enter 6 digit OTP sent to your email address.
                    </span>
                    <input onChange={(e) => setOTP(e.target.value)} type="text" className="app__recovery-textbox" placeholder='OTP' />
                  </div>
                  <button className='app__recovery-btn' type="submit">Recover</button>
                </div>

                <div className="text-center py-4">
                  <span className='text-gray-500'>Can't get OTP? <button onClick={resendOTP} className='text-red-500'>Resend OTP</button> </span>
                </div>
              </form>

            </div>

        </div>
      </div>
    </div>
  )
}

export default Recovery;