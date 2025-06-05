"use client"
import React, { useEffect, useState } from 'react'
import { Bars3CenterLeftIcon, ChatBubbleLeftIcon, KeyIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getCategorywithSubcategory } from '@/redux/action/category';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle } from '@/redux/action/auth';
import { useRouter } from 'next/navigation';
import { auth, provider, signInWithPopup } from "@/utils/firebase";
import Image from 'next/image';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [subIndex, setSubIndex] = useState(null);
    const [category, setCategory] = useState([]);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await dispatch(getCategorywithSubcategory());
                if (res?.payload && res?.payload?.success) {
                    const data = res?.payload;
                    setCategory(data?.data);
                    console.log('Fetched categories:', data?.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategory();
    }
        , []);

    const userProfileClickHandler = () => {
        setOpen(false);
        if (user) {
            router.push("/profile");
        } else {
            const handleGoogleSignIn = async () => {
                try {
                    const result = await signInWithPopup(auth, provider);
                    const data = {
                        authtoken: result.user.accessToken,
                    };
                    const res = await dispatch(signInWithGoogle(data));

                    if (res?.payload && res?.payload?.success) {
                        if (res.payload?.data?.user?.role == process.env.NEXT_PUBLIC_SELLER_ROLE_ID) {

                            router.prefetch('/admin', '/', { priority: true })
                            router.push('/admin');
                        }
                    }
                } catch (error) {
                    console.error("Error signing in:", error);
                }
            };
            handleGoogleSignIn();
        }
    };

    return (
        <>
            <div className='flex items-center justify-between py-2 px-6 sm:px-20 bg-white border-b-1 border-gray-200'>
                <Bars3CenterLeftIcon className='h-6 w-6 sm:hidden' onClick={() => { setOpen(true) }} />
                <p className='text-2xl cursor-pointer m-0' onClick={() => { router.push('/') }}>
                    SHEIN
                </p>
                <div className='flex justify-between sm:max-w-[200px] sm:w-full cursor-pointer'>
                    {user ?
                        <Image
                            src={user?.profile_image || '/default-profile.png'}
                            alt='Profile'
                            width={24}
                            height={24}
                            className='h-6 w-6 rounded-full hidden sm:block'
                            onClick={() => {
                                userProfileClickHandler();
                            }}
                        />
                        : <UserIcon className='h-6 w-6 sm:block ' onClick={() => {
                            userProfileClickHandler();
                        }} />}
                    <MagnifyingGlassIcon className='h-6 w-6 hidden sm:block' />
                    <ChatBubbleLeftIcon className='h-6 w-6 hidden sm:block' />
                    <ShoppingBagIcon className='h-6 w-6 ' />
                </div>
            </div>
            {open && <div className='fixed top-0 left-0 w-full h-[100dvh] bg-gray-500 opacity-50' onClick={() => { setOpen(false) }}></div>}
            <div className={`fixed top-0 left-0 w-[75%] h-[100dvh] bg-white z-50 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex items-center justify-between py-6 px-6 sm:px-20 bg-white border-b-1 border-gray-200'>
                    <p className='text-2xl m-0 cursor-pointer' onClick={() => { router.push('/') }}>
                        SHEIN
                    </p>
                    <XMarkIcon className='h-6 w-6 text-black sm:hidden' onClick={() => { setOpen(false) }} />
                </div>
                <div className='flex flex-col items-center justify-start mt-4 gap-1 h-full w-full'>
                    <div className='flex items-center justify-between gap-3 w-full px-6 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => { userProfileClickHandler() }}>
                        <p className='font-semibold m-0'>Profile</p>
                        {user ?
                        <Image
                            src={user?.profile_image || '/default-profile.png'}
                            alt='Profile'
                            width={24}
                            height={24}
                            className='h-6 w-6 rounded-full'
                            onClick={() => {
                                userProfileClickHandler();
                            }}
                        />
                        : <UserIcon className='h-6 w-6 ' onClick={() => {
                            userProfileClickHandler();
                        }} />}
                    </div>

                    {category?.length > 0 && category.map((item, index) => (
                        <div key={index} className=' w-full'>
                            <div className='flex px-6 justify-between items-center gap-4 hover:bg-gray-200' onClick={() => {setOpen(false)}}>
                                <p className='cursor-pointer py-2 m-0 '>{item?.name}</p>
                                {subOpen && subIndex === index ? (
                                    <MinusIcon
                                        className="h-6 w-6 text-gray-500 cursor-pointer"
                                        onClick={() => {
                                            setSubOpen(false);
                                            setSubIndex(null);
                                        }}
                                    />
                                ) : (
                                    <PlusIcon
                                        className="h-6 w-6 text-gray-500 cursor-pointer"
                                        onClick={() => {
                                            setSubOpen(true);
                                            setSubIndex(index);
                                        }}
                                    />
                                )}
                            </div>
                            {item?.subcategories?.length > 0 && (
                                <div
                                    className={`overflow-hidden px-6 transition-all duration-500 ease-in-out ${subOpen && subIndex === index ? 'max-h-96' : 'max-h-0'
                                        }`}
                                >
                                    <div className="py-1 flex flex-col flex-wrap ">
                                        {item.subcategories.map((sub, idx) => (
                                            <div
                                                key={idx}
                                                className="px-4 py-2 w-full text-sm hover:bg-gray-200 cursor-pointer"
                                            >
                                                {sub.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                        </div>
                    ))}
                </div>
            </div>
            <div className=' w-full hidden sm:flex items-center justify-center border-b-1 border-gray-200 relative'>
                {category?.length > 0 && category.map((item, index) => (
                    <div key={index} className='flex items-center justify-between px-6 group'>
                        <p className='cursor-pointer m-0 py-2 hover:text-red-500 '>{item?.name}</p>
                        {item?.subcategories?.length > 0 && (
                            <div className="absolute top-full left-0 z-10 hidden w-screen bg-white shadow-md group-hover:block">
                                <div className='w-[80%] mx-auto py-10 max-h-[80vh] flex flex-col flex-wrap'>
                                    {item.subcategories.map((sub, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-3 w-fit text-sm hover:text-red-400 cursor-pointer"
                                        >
                                            {sub.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </>
    )
}

export default Navbar
