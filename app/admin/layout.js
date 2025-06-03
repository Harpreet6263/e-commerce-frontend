"use client"
import React, { useEffect } from 'react'
import { myProfile } from '@/redux/action/auth'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '@/component/admin/layout/Sidebar'


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
                    toast.error(res.payload?.message);
                    router.prefetch('/', '/', { priority: true })
                    router.push('/');
                }
                // if (res?.payload?.data?.user?.role !== process.env.NEXT_PUBLIC_SELLER_ROLE_ID) {
                //     toast.error("You are not authorized to access this page.");
                //     Cookies.remove("loggedIn");
                //     Cookies.remove("role");
                //     router.prefetch('/', '/', { priority: true })
                //     router.push('/');
                // }
            }).catch((error) => {
                console.error("Error fetching profile:", error);
                toast.error("An error occurred while fetching your profile.");
                router.push('/');
            })
        } else {
            router.prefetch('/', '/', { priority: true })
            router.push('/');
        }
    }, [dispatch, router]);

    return (
        <div className={`flex antialiased`}>
            <Sidebar />
            <div className='h-[100dvh] w-full p-5'>
                {children}
            </div>
        </div>
    )
}

export default layout