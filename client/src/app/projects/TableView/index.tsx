import Header from '@/components/Header';
import { dataGridClassNames, dataGridSxStyles, tableViewSxStyles } from '@/lib/utils';
import { useGetTasksQuery } from '@/state/api';
import{DataGrid, GridColDef} from'@mui/x-data-grid';
import React from 'react'

type Props = {
    id:string;
    setIsModalNewTaskOpen: (isOpen: boolean)=> void;
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
    // cellClassName: "fixed-dark-cell",
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
    // cellClassName: "fixed-dark-cell",
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
        // cellClassName: "fixed-dark-cell",

    },
    {
        field:"dueDate",
        headerName:"Due Date",
        width:130,
        // cellClassName: "fixed-dark-cell",

    },
    {
        field:"author",
        headerName:"Author",
        width:150,
        //cellClassName: "fixed-dark-cell",
        renderCell: (params) =>
            params.value && params.value.username
                ? params.value.username
                : "Unknown"

    },
    {
        field:"assignee",
        headerName:"Assignee",
        width:150,
        //cellClassName: "fixed-dark-cell",
        renderCell: (params) =>
            params.value && params.value.username
                ? params.value.username
                : "Unassigned"

    },
    
]

const TableView = ({id, setIsModalNewTaskOpen}: Props) => {

        const{data:tasks, error, isLoading} = useGetTasksQuery({projectId:Number(id)});
        if(isLoading) return <div>Loading...</div>
        if(error) return <div>Error occured while fetching tasks</div>;
    
  return (
    <div className='h-[580px] w-full px-4 pb-8 xl:px-6 bg-[#101214;]'>
        <div className="pt-5">
            <Header name='Table' 
             buttonComponent={
                <button className='flex items-center bg-[#0275ff] rounded-md px-3 py-2 text-white hover:bg-blue-600 hover:cursor-pointer'
                onClick={()=> setIsModalNewTaskOpen(true)}
                >
                    Add Task
                </button>
            }
            isSmallText
            />
        </div>
        <DataGrid
            rows={tasks || []}
            columns={columns}
            className={dataGridClassNames}
            sx={tableViewSxStyles}
                
              
        
        />
    </div>
  )
}

export default TableView