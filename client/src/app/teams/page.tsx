"use client"
import Header from '@/components/Header';
import { dataGridClassNames, dataGridSxStyles, tableViewSxStyles } from '@/lib/utils';
import { useGetTeamsQuery} from '@/state/api'
import { DataGrid,  GridColDef, Toolbar  } from '@mui/x-data-grid';


import React from 'react'



const columns: GridColDef[] = [
    {field: "id" , headerName:"Team ID", width:100},
    {field:"teamName", headerName:"Team Name", width:200},
    {field:"productOwnerUsername", headerName:"Product Owner", width:200},
    {field:"projectManagerUsername", headerName:"Project Manager", width:200},
    

]

const Teams = () => {
    const{data:teams, isLoading, isError} = useGetTeamsQuery();

    if(isLoading) return <div>Loading...</div>
    if(isError || !teams) return <div>Error fetching teams</div>
  return (
    <div className='flex w-full flex-col p-8'>
        <Header name='Teams' />
        <div style={{height:650, width: "100%"}}>
            <DataGrid
           // showToolbar
            rows={teams || []}
            columns={columns}
            pagination
            className={dataGridClassNames}
            sx={dataGridSxStyles}
           
            
            />
        </div>
    </div>
  )
}

export default Teams