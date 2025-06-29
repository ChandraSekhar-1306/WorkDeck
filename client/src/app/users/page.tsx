"use client"
import Header from '@/components/Header';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { useGetUsersQuery } from '@/state/api'
import { DataGrid,  ExportPrint, GridColDef,   QuickFilter, Toolbar } from '@mui/x-data-grid';
import Image from 'next/image';
import React from 'react'

const CustomToolbar = ()=> (
    <Toolbar className='toolbar flex gap-2'>
        <QuickFilter/>
        <ExportPrint/>
    </Toolbar>
)

const columns: GridColDef[] = [
    {field: "userId" , headerName:"ID", width:100},
    {field:"username", headerName:"Username", width:150},
    {field:"profilePictureUrl", headerName:"Profile Picture", width:100,
        renderCell: (params)=>(
            <div className="flex h-full w-full items-center justify-center">
                <div className="h-9 w-9">
                    <Image src={`/${params.value}`}
                    alt={params.row.username}
                    width={100}
                    height={50}
                    className='h-full rounded-full object-cover'
                    />
                </div>
            </div>
        )
    }

]

const Users = () => {
    const{data:users, isLoading, isError} = useGetUsersQuery();

    if(isLoading) return <div>Loading...</div>
    if(isError || !users) return <div>Error fetching users</div>
  return (
    <div className='flex w-full flex-col p-8'>
        <Header name='Users' />
        <div style={{height:650, width: "100%"}}>
            <DataGrid
            //showToolbar
            rows={users || []}
            columns={columns}
            getRowId={(row)=> row.userId}
            pagination
            className={dataGridClassNames}
            sx={dataGridSxStyles}
            />
        </div>
    </div>
  )
}

export default Users