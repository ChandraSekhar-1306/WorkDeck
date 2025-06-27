import { useGetTasksQuery } from '@/state/api';
import React, { useMemo, useState } from 'react'
import {DisplayOption, Gantt, ViewMode} from "gantt-task-react";
import "gantt-task-react/dist/index.css";

type Props = {
   id:string;
   setIsModalNewTaskOpen: (isOpen: boolean)=> void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const TimelineView = ({id, setIsModalNewTaskOpen}: Props) => {
   const{data:tasks, error, isLoading} = useGetTasksQuery({projectId:Number(id)});
   const[displayOptions, setDisplayOptions] = useState<DisplayOption>({
      viewMode: ViewMode.Month,
      locale: "en-US",
   });

   const ganttTasks = useMemo(()=> {
      return(
        tasks?.map((task)=>({
          start: new Date(task.startDate as string),
          end: new Date(task.dueDate as string),
          name: task.title,
          id: `Task-${task.id}`,
          type: "task" as TaskTypeItems,
          progress: task.points ? (task.points/10)*100 : 0,
          idDisabled: false,
        })) || []
      );
   }, [tasks]);

   const handleViewModeChange =  (
      event: React.ChangeEvent<HTMLSelectElement>
   ) => {
      setDisplayOptions((prev)=>({
        ...prev,
        viewMode:event.target.value as ViewMode,
      }))
   }

   if(isLoading) return <div>Loading...</div>
   if(error) return <div>Error occured while fetching tasks</div>;
   

  return (
   <div className="min-h-screen w-full bg-[#0f1011]">
    <div className='px-4 xl:px-6'>
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
         <h1 className="me-2 text-lg font-bold text-white">Project Tasks Timeline</h1>
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
      </div>
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
               barBackgroundColor="#2563eb"
               barBackgroundSelectedColor="#1e40af"
               barProgressColor="#22d3ee"
               barProgressSelectedColor="#06b6d4"
               projectBackgroundColor="#334155"
               projectProgressColor="#38bdf8"
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
         <div className="px-4 pb-5 pt-1">
            <button 
            className='flex items-center rounded bg-blue-600 px-3 py-2 text-white font-semibold hover:bg-blue-700 hover:cursor-pointer'
            onClick={() => setIsModalNewTaskOpen(true)}
            >
                Add New Task
            </button>
         </div>
      </div>
    </div>
   </div>
  )
}

export default TimelineView