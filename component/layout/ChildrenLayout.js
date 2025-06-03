'use client'
import React, { Suspense } from 'react'
import NestedChildrenLayout from './NestedChildrenLayout'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
const ChildrenLayout = ({ children }) => {
    return (
        <>
            <Suspense>
                <Provider store={store}>
                    <Toaster position="top-right" />
                        <NestedChildrenLayout>{children}</NestedChildrenLayout>
                </Provider>
            </Suspense>
        </>
    )
}

export default ChildrenLayout