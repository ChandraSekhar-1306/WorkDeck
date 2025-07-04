"use client"
import Header from '@/components/Header';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { Priority, Project, Task, useGetProjectsQuery, useGetTasksQuery } from '@/state/api'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const taskColumns: GridColDef[] =  [
        {field: "title", headerName:"Title" , width:200},
        {field: "status", headerName:"Status" , width:200},
        {field: "priority", headerName:"Pirority" , width:200},
        {field: "dueDate", headerName:"Due Date" , width:200}
    ];

    const COLORS = ["#0088FE" , "#00C49F" , "#FFBB28" , "#FF8042"]
    const chartColors = {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4890e2",
        text: "#FFFFFF"
    }

const HomePage = () => {
    const{data: tasks, isLoading: tasksLoading, isError: tasksError} = useGetTasksQuery({projectId: parseInt("1")})
    const {data: projects, isLoading: isProjectsLoading} = useGetProjectsQuery();

    if(tasksLoading || isProjectsLoading) return <div>Loading...</div>
    if(tasksError || !tasks || !projects) return <div>Error fetching data</div>

    const priorityCount = tasks.reduce(
        (acc: Record<string,number>, task: Task) => {
            const {priority} = task;
            acc[priority as Priority] = (acc[priority as Priority] || 0 ) + 1;
            return acc;
        },
        {},
    );

    const taskDistribution = Object.keys(priorityCount).map((key)=>({
        name:key,
        count:priorityCount[key],
    }));

        const statusCount = projects.reduce(
        (acc: Record<string,number>, project: Project) => {
           const status = project.endDate ? "Completed" : "Active"
            acc[status] = (acc[status] || 0 ) + 1;
            return acc;
        },
        {},
    );

    const projectStatus = Object.keys(statusCount).map((key)=>({
        name:key,
        count:statusCount[key],
    }));

    

  return (
    <div className='container h-full w-[100%] bg-[#101214] p-8'>
        <Header name='Project Management Dashboard' />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-[#1d1f21] p-4 shadow">
                    <h3 className="mb-4 text-lg font-semibold text-white">
                        Task Priority Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={taskDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.barGrid} />
                            <XAxis dataKey="name" stroke={chartColors.text} />
                            <YAxis stroke={chartColors.text} />
                            <Tooltip
                                contentStyle={{
                                    width: "min-content",
                                    height: "min-content",
                                }}
                                labelStyle={{
                                    color: "#000",
                                }}
                                itemStyle={{
                                    color: "#000",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="count" fill={chartColors.bar}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                    <div className="rounded-lg bg-[#1d1f21] p-4 shadow">
                    <h3 className="mb-4 text-lg font-semibold text-white">
                        Project Status Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                                <Pie dataKey='count' data={projectStatus} fill="#82ca9d" label>
                                    {projectStatus.map((entry, index)=>(
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />                                  ))}
                                </Pie>
                            <Tooltip
                                contentStyle={{
                                    width: "min-content",
                                    height: "min-content",
                                }}
                                labelStyle={{
                                    color: "#000",
                                }}
                                itemStyle={{
                                    color: "#000",
                                }}
                            />
                            <Legend />
                            
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                    <div className="rounded-lg bg-[#1d1f21] p-4 shadow md:col-span-2">
                    <h3 className="mb-4 text-lg font-semibold text-white">
                       Your Tasks
                    </h3>
                    <div style={{height:400, width:"100%"}}>
                        <DataGrid
                            rows={tasks}
                            columns={taskColumns}
                            checkboxSelection
                            loading={tasksLoading}
                            getRowClassName={()=> "data-grid-row"}
                            getCellClassName={()=> "data-grid-cell"}
                            className={dataGridClassNames}
                            sx={dataGridSxStyles}
                        />
                    </div>
                    </div>

            </div>
        </div>

    </div>
  )
}

export default HomePage