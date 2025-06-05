"use client"
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Corusel from './Corusel';
import FeaturedProduct from './FeaturedProduct';

const Homepage = () => {
    const dispatch = useDispatch();


    return (
        <div className='flex flex-col w-full items-center justify-center gap-y-5 overflow-hidden'>
            <Corusel />
            <FeaturedProduct />
        </div>
    )
}

export default Homepage
