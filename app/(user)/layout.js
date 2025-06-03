"use client"
import React, { useEffect } from 'react'
import { myProfile } from '@/redux/action/auth'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '@/component/navbar/navbar'


const layout = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const token = Cookies.get("loggedIn");
    const router = useRouter();
    
    useEffect(() => {
        if (token) {
            dispatch(myProfile()).then(res => {
                if (!res?.payload?.success) {
                    Cookies.remove("loggedIn");
                    Cookies.remove("role");
                    toast.error(res.payload?.data?.message);
                    router.prefetch('/', '/', { priority: true })
                    router.push('/');
                }
                
            }).catch((error) => {
                console.error("Error fetching profile:", error);
                toast.error("An error occurred while fetching your profile.");
                router.push('/');
            })
        }
    }, [dispatch, router]);

    return (
        <div className={` antialiased`}>
            <Navbar />
            {children}
        </div>
    )
}

export default layout