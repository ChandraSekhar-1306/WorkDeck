"use client"
import Header from '@/components/Header'
import ModalNewTask from '@/components/ModalNewTask'
import TaskCard from '@/components/TaskCard'
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils'
import { Priority, Task, useGetTasksByUserQuery } from '@/state/api'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useState } from 'react'

type Props = {
    priority: Priority
}

const columns: GridColDef[] = [
    {
        field:"title",
        headerName:"Title",
        width:100,
        // cellClassName: "fixed-dark-cell",

    },
    {
        field:"description",
        headerName:"Description",
        width:200,
        // cellClassName: "fixed-dark-cell",

    },
{
        field:"status",
        headerName:"Status",
        width:130,  
        renderCell:(params)=>(
            <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5
                    ${
                        params.value === "To Do"
                            ? "bg-blue-100 text-blue-800"
                            : params.value === "Work In Progress"
                            ? "bg-green-100 text-green-800"
                            : params.value === "Under Review"
                            ? "bg-orange-100 text-orange-800"
                            : params.value === "Completed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-gray-100 text-gray-800"
                    }
                `}
            >
                {params.value}
            </span>
        )

    },
     
   {
    field: "priority",
    headerName: "Priority",
    width: 75,
    renderCell: (params) => (
        <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 w-full justify-center">
            {params.value}
        </span>
    ),
},
    {
    field: "tags",
    headerName: "Tags",
    width: 130,
    renderCell: (params) => (
        <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 w-full justify-center">
            {params.value}
        </span>
    ),
},
    {
        field:"startDate",
        headerName:"Start Date",
        width:130,

    },
    {
        field:"dueDate",
        headerName:"Due Date",
        width:130,

    },
    {
        field:"author",
        headerName:"Author",
        width:150,
        renderCell: (params) =>
            params.value && params.value.username
                ? params.value.username
                : "Unknown"

    },
    {
        field:"assignee",
        headerName:"Assignee",
        width:150,
        renderCell: (params) =>
            params.value && params.value.username
                ? params.value.username
                : "Unassigned"

    },
    
]

const ReusablePriorityPage = ({priority}: Props) => {
    const [view, setView] = useState("list");
    const[isModalNewTaskOpen , setIsModalNewTaskOpen] = useState(false);

    const userId = 1;
    const{data: tasks , isLoading , isError: isTasksError} = useGetTasksByUserQuery(userId||0, {
        skip: userId === null
    })

    const filteredTasks = tasks?.filter((task: Task)=> task.priority === priority)
    if(isTasksError || !tasks) return <div>Error fetching tasks</div>
  return (
    <div className='m-5 p-4'>
        <ModalNewTask isOpen={isModalNewTaskOpen} onClose={()=> setIsModalNewTaskOpen(false)} />
            <Header name='Priority Page' buttonComponent={
                <button className='mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 hover:cursor-pointer'
                onClick={()=> setIsModalNewTaskOpen(true)}
                >
                        Add Task
                </button>
            } 
            />
            <div className="mb-4 flex justify-start">

                <button
                    className={`px-4 py-2 rounded-l transition-colors duration-200 hover:cursor-pointer ${
                        view === "list"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-900 text-blue-200 hover:bg-blue-800"
                    }`}
                    onClick={() => setView("list")}
                >
                    List
                </button>
                <button
                    className={`px-4 py-2 rounded-r transition-colors duration-200 hover:cursor-pointer ${
                        view === "table"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-900 text-blue-200 hover:bg-blue-800"
                    }`}
                    onClick={() => setView("table")}
                >
                    Table
                </button>
            </div>
            {isLoading ? (<div> Loading Tasks...</div>) : view === "list" ? (
                <div className='grid grid-cols-1 gap-4'>
                    {filteredTasks?.map((task: Task) =>(
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            ): (
                view === "table" && filteredTasks && (
                    <div className="w-full">
                        <DataGrid
                        rows={filteredTasks}
                        columns={columns}
                        checkboxSelection
                        getRowId={(row)=> row.id}
                        className={dataGridClassNames}
                        sx={dataGridSxStyles} />
                    </div>
                )
            )}
    </div>
  )
}

export default ReusablePriorityPage