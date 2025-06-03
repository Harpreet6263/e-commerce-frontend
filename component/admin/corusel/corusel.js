"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { STATUS } from "@/constants/index";
import Tabs from "@/utils/tabs/index";
import { CheckCircleIcon, ExclamationCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import CoruselList from './CoruselList';
import AddCorusel from './AddCorusel';
import { Button } from "@/components/ui/button"
import { ViewCoruselDialog } from './coruselDetail';

function Corusel() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [apiHit, setApiHit] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedTab, setSelectedTab] = useState(1);
    const [coruselId, setCoruselId] = useState();
    const [isViewOpen, setIsViewOpen] = useState(false);
    const tabs = [
        {
            name: 'Active',
            id: STATUS?.ACTIVE_STATUS,
            icon: <CheckCircleIcon className="w-6 h-6 text-green-400" />,
            content: (
                <CoruselList
                    status={STATUS?.ACTIVE_STATUS}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    totalRecords={totalRecords}
                    setTotalRecords={setTotalRecords}
                    apiHit={apiHit}
                    setApiHit={setApiHit}
                    setCoruselId={setCoruselId}
                    setIsViewOpen={setIsViewOpen}
                />
            ),
        },

    ];
    return (
        <div>
            <h2 className="text-3xl font-bold text-primary">Manage Corusel</h2>
            <div className='flex w-full justify-end'>
                <Button className="bg-[#36736F] hover:bg-[#36736F] cursor-pointer flex " onClick={() => { setIsAddOpen(true) }}>
                    <PlusIcon className='w-5 h-5 ' />
                    Add</Button>
                {/* <Button color="primary" startContent={<PlusIcon className='w-5' />} variant="bordered" className='font-bold' ></Button> */}
            </div>
            <Tabs
                tabs={tabs}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                tabTitle=""
                totalRecords={totalRecords}
            />
            <AddCorusel isOpen={isAddOpen} onOpenChange={setIsAddOpen} refresh={refresh} setRefresh={setRefresh} />
            <ViewCoruselDialog open={isViewOpen} onOpenChange={setIsViewOpen} coruselId={coruselId} />
        </div>
    );
}

export default Corusel;
