"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../layout/Table';
import {
    PencilSquareIcon,
    NoSymbolIcon,
    PlusCircleIcon,
    ExclamationTriangleIcon,
    TrashIcon,
    PlusIcon,
    EyeIcon
} from '@heroicons/react/24/outline';

import { STATUS } from "@/constants/index"
// import ArticleDetail from "@/components/admin/article/ArticleDetail"
import { formatDate } from "@/utils/date-format/formatDate";
import DeleteModal from '../layout/DeleteModel';
import { getCorusel, updateCoruselStatus } from '@/redux/action/corusel';
import Paginations from '@/component/pagination';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import EditCorusel from './editCorusel';
function CoruselList(
    {
        status,
        setRefresh,
        refresh,
        totalRecords,
        setTotalRecords,
        setApiHit,
        apiHit,
        setCoruselId,
        setIsViewOpen
    }
) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showPagination, setShowPagination] = useState([]);
    const [coruselData, setCoruselData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editId, setEditId] = useState();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
        id: "",
        status: ""
    });
    const [rowId, setRowId] = useState(null);
    useEffect(() => {
        getArticle();
    }, [refresh, currentPage]);

    const getArticle = async () => {
        setApiHit(false);
        setError(null);
        try {
            const res = await dispatch(getCorusel({ currentPage, limit }));
            console.log("here", res);

            if (res?.payload && res?.payload?.success) {
                const data = res?.payload;
                setCoruselData(data?.data?.result);
                setTotalPages(Math.ceil(data?.data?.totalRecords / limit));
                setTotalRecords(data?.data?.totalRecords);
                setShowPagination(data?.data?.showPagination);
            }
        } catch (err) {
            setError("Error fetching categories. Please try again.");
            console.error("Error fetching categories:", err);
        } finally {
            setApiHit(true);
        }
    };

    const columns = [
        {
            title: "Title",
            key: "name",
            transform: (value) => <p className="text-black">{value}</p>,
        },

        {
            title: "Status",
            key: "status",
            transform: (value) => (
                <>
                    {value === 1 ? (
                        <p className='bg-green-200 text-green-700 rounded-full px-3 py-1 w-fit'>{"active".toUpperCase()}</p>
                    ) : (
                        <p className='bg-yellow-200 text-black rounded-full px-3 py-1 w-fit'>{"suspended".toUpperCase()}</p>
                    )}
                </>
            ),
        },
        {
            title: "Priority",
            key: "periority",
            transform: (value) => <p className="text-black">{value}</p>,
        },
        {
            title: "Created Date",
            key: "created_at",
            transform: (value) => <>{formatDate(value)}</>,
        },
        {
            title: "Actions",
            key: "actions",
            transform: (value, row) => {
                return (
                    <div className="flex justify-start">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <EyeIcon className="w-5 h-5 mr-2 cursor-pointer" onClick={() => { setCoruselId(row._id), setIsViewOpen(true) }} />
                            </TooltipTrigger>
                            <TooltipContent>
                                View
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PencilSquareIcon className="w-5 h-5 mr-2" onClick={()=>{setIsEditOpen(true), setEditId(row._id)}}/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit</p>
                            </TooltipContent>
                        </Tooltip>
                        {row?.status === STATUS.ACTIVE_STATUS ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <NoSymbolIcon
                                        className="w-5 h-5 mr-2 cursor-pointer"
                                        onClick={() => {
                                            setSelectedUser({ id: row?._id, status: STATUS.SUSPENDED_STATUS });
                                            setDeleteOpen(true);
                                        }}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Suspend
                                </TooltipContent>
                            </Tooltip>

                        ) : (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <PlusCircleIcon
                                        className="w-5 h-5 mr-2 cursor-pointer"
                                        onClick={() => {
                                            setSelectedUser({ id: row?._id, status: STATUS.ACTIVE_STATUS });
                                            setDeleteOpen(true);
                                        }}
                                    />
                                </TooltipTrigger>
                                <TooltipContent >
                                    Active
                                </TooltipContent>
                            </Tooltip>

                        )}
                    </div>
                );
            },
        },
    ];

    const userDelete = async () => {
        await dispatch(updateCoruselStatus({ corusel_id: selectedUser.id, data: { status: selectedUser.status } }));
        setSelectedUser(null);
        setDeleteOpen(false)
        setRefresh(prev => !prev);
    };
    return (
        <div>
            <DataTable columns={columns} tableData={coruselData} apiHit={user?.formattedPermissions ? apiHit : false} />
            <Paginations
                totalRecords={totalRecords}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={limit}
                tableDataLength={coruselData?.length}
                showPagination={showPagination}
            />
            <EditCorusel isOpen={isEditOpen} onOpenChange={setIsEditOpen} refresh={refresh} setRefresh={setRefresh} row_id={editId}/>

            {/* <EditArticle isOpen={isEditArticleOpen} onOpenChange={setIsEditArticleOpen} refresh={refresh} setRefresh={setRefresh} setSlugValue={setEditArticleData} slug={editArticleData} rowId={rowId} /> */}
            <DeleteModal setOpen={setDeleteOpen} open={deleteOpen} deleteRecord={userDelete} icon={selectedUser?.status == STATUS.ACTIVE_STATUS ? "active" : selectedUser?.status == STATUS.ARCHIVE_STATUS ? "inactive" : "delete"}
                message={selectedUser?.status == STATUS.ACTIVE_STATUS ? "Are you sure you want to active this article ? " : selectedUser?.status == STATUS.ARCHIVE_STATUS ? "Are you sure you want to archive this article ? " : "Are you sure you want to suspend this article ? "}
            />
            {/* <ArticleDetail isOpen={isViewOpen} onOpenChange={setIsViewOpen} slug={editArticleData} /> */}
        </div>
    );
}

export default CoruselList;
