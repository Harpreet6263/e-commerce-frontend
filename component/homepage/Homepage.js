"use client"
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Corusel from './Corusel';

const Homepage = () => {
    const dispatch = useDispatch();


    return (
        <div className='flex justify-center'>
            <Corusel/>

        </div>
    )
}

export default Homepage
