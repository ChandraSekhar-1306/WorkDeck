"use client"
import { useGetProjectsQuery } from '@/state/api';
import React, { useMemo, useState } from 'react'
import {DisplayOption, Gantt, ViewMode} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import Header from '@/components/Header';


type TaskTypeItems = "task" | "milestone" | "project";

const TimelineView = () => {
    const {data:projects, isLoading, isError} = useGetProjectsQuery();
   const[displayOptions, setDisplayOptions] = useState<DisplayOption>({
      viewMode: ViewMode.Month,
      locale: "en-US",
   });

   const ganttTasks = useMemo(()=> {
      return(
        projects?.map((project)=>({
          start: new Date(project.startDate as string),
          end: new Date(project.endDate as string),
          name: project.name,
          id: `Project-${project.id}`,
          type: "project" as TaskTypeItems,
          progress: 50,
          idDisabled: false,
        })) || []
      );
   }, [projects]);

   const handleViewModeChange =  (
      event: React.ChangeEvent<HTMLSelectElement>
   ) => {
      setDisplayOptions((prev)=>({
        ...prev,
        viewMode:event.target.value as ViewMode,
      }))
   }

   if(isLoading) return <div>Loading...</div>
   if(isError || !projects) return <div>Error occured while fetching Projects</div>;
   

  return (
   <div className="min-h-screen w-full bg-[#0f1011]">
    <div className='max-w-full p-8'>
      <header className="fmb-4 flex items-center justify-between">
         <Header name='Projects Timeline' />
         <div className="relative inline-block w-64"></div>
            <select
              className="focus:shadow-outline block w-full appearance-none rounded border px-4 py-2 pr-8 leading-tight shadow focus:outline-none border-[#1d1f21] bg-[#1d1f21] text-white"
              value={displayOptions.viewMode}
              onChange={handleViewModeChange}
            >
              <option value={ViewMode.Day}>Day</option>
              <option value={ViewMode.Week}>Week</option>
              <option value={ViewMode.Month}>Month</option>
            </select>
      </header>
      <div className="overflow-hidden rounded-md bg-[#1d1f21] shadow text-white ">
         <div className="timeline" style={{ background: "#1d1f21", padding: "16px" }}>
            {ganttTasks.length === 0 ? (
              <div
               className="flex items-center justify-center"
               style={{
                 minHeight: "200px",
                 color: "#94a3b8",
                 background: "#18181b",
                 borderRadius: "8px",
                 border: "1px dashed #334155",
                 fontSize: "16px",
                 fontWeight: 500,
               }}
              >
               No tasks found for this project.
              </div>
            ) : (
              <Gantt
               tasks={ganttTasks}
               {...displayOptions}
               columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
               listCellWidth="120px"
                projectBackgroundColor ="#180a94"
                projectProgressColor='#5edcff'
                projectProgressSelectedColor='#38ff45   '
               
              
              
               milestoneBackgroundColor="#f59e42"
               fontFamily="Inter, sans-serif"
               fontSize="14px"
               arrowColor="#64748b"
               todayColor="#f43f5e"
               TooltipContent={({ task }) => (
                 <div style={{
                  background: "#18181b",
                  color: "#f1f5f9",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  padding: "8px",
                  fontSize: "13px"
                 }}>
                  <div><strong>{task.name}</strong></div>
                  <div>Start: {task.start.toLocaleDateString()}</div>
                  <div>End: {task.end.toLocaleDateString()}</div>
                  <div>Progress: {task.progress}%</div>
                 </div>
               )}
              />
            )}
         </div>
         
      </div>
    </div>
   </div>
  )
}

export default TimelineView