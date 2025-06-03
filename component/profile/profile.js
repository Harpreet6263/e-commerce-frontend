"use client"
import { handleLogout, signInWithGoogle } from '@/redux/action/auth';
import { auth, provider, signInWithPopup } from "@/utils/firebase";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const data = {
            authtoken: result.user.accessToken,
        };
        await dispatch(signInWithGoogle(data));
    } catch (error) {
        console.error("Error signing in:", error);
    }
};
  const logout = () => {
    dispatch(handleLogout());
  };

  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Profile</h1>
        <p className='mb-4'>{user?.name}</p>
      {user ? <button
        className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded'
        onClick={logout}
      >
        Log out
      </button> :
      <button
        className='bg-blue-500 cursor-pointer text-white px-4 py-2 rounded'
        onClick={()=>{handleGoogleSignIn()}}
        >
        Log in
      </button>
            }
    </div>
  );
};

export default Profile;
