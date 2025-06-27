"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Icon, Layers3, LockIcon, LucideIcon, Search, Settings, Settings2, ShieldAlert, User, Users, X , BriefcaseBusiness } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import Link from 'next/link';
import { setIsSidebarCollapsed } from '@/state';
import { useGetProjectsQuery } from '@/state/api';

const Sidebar = () => {
    const[showProjects, setShowProjects] = useState(true);
    const[showPriority, setShowPriority] = useState(true);
    const {data: projects} = useGetProjectsQuery();
    const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40 bg-black overflow-y-auto ${isSidebarCollapsed? "w-0 hidden" : "w-64"} `
  return (
    <div className={sidebarClassNames}>
        <div className="flex h-[100%] w-full flex-col justify-start">
            <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-black">
                <div className="text-xl font-semibold text-gray-200 ml-3">WORKDECK</div>
                {isSidebarCollapsed ? null:(
                  <button className='py-3' onClick={()=> {dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}}>
                    <X className='h-6 w-6 text-white hover:text-gray-400 cursor-pointer'/>
                  </button>
                )}
            </div>
            {/* TEAM */}
            <div className="flex items-center gap-5 border-y-[1.5px] border-gray-700 px-8 py-4">
              <Image src="/logo.png" alt='Logo' width={40} height={40}  />
              <div className="">
                <h3 className="text-lg font-bold tracking-wide text-gray-200">CS TEAM</h3>
                <div className="mt-1 flex items-start gap-2">
                  <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-400'/>
                  <p className="text-xs text-gray-400">Private</p>
                </div>
              </div>
            </div>
            {/* NAVBAR LINKS */}
            <nav className='z-10 w-full'>
              <SidebarLink icon={Home} label="Home" href='/' />
              <SidebarLink icon={Briefcase} label="Timeline" href='/timeline' />
              <SidebarLink icon={Search} label="Search" href='/search' />
              <SidebarLink icon={Settings} label="Settings" href='/settings' />
              <SidebarLink icon={User} label="Users" href='/users' />
              <SidebarLink icon={Users} label="Team" href='/teams' />
            </nav>
            {/* PROJECTS */}
            <button onClick={()=> setShowProjects((prev)=> !prev)} 
              className='flex w-full items-center justify-between px-8 py-3 text-gray-400'>
                <span className="hover:cursor-pointer">Projects</span>
                {showProjects ? (
                  <ChevronUp className='h-5 w-5 cursor-pointer'/> 

                ):<ChevronDown className='h-5 w-5 cursor-pointer'/>}
              </button>
            {/* PROJECTS LIST */} 
            {showProjects && projects?.map((project)=>(
                <SidebarLink
                 key={project.id}
                 icon={BriefcaseBusiness}
                 label = {project.name}
                 href={`/projects/${project.id}`} />
            ))}

            {/*PRIORITIES LINKS*/}
            <button onClick={()=> setShowPriority((prev)=> !prev)} 
              className='flex w-full items-center justify-between px-8 py-3 text-gray-400'>
                <span className="hover:cursor-pointer">Priority</span>
                {showPriority ? (
                  <ChevronUp className='h-5 w-5 cursor-pointer'/> 

                ):<ChevronDown className='h-5 w-5 cursor-pointer'/>}
              </button>
              { showPriority && (
                <>
                  <SidebarLink icon={AlertCircle} label="Urgent" href='/priority/urgent' />
                  <SidebarLink icon={ShieldAlert} label="High" href='/priority/high' />
                  <SidebarLink icon={AlertTriangle} label="Medium" href='/priority/medium' />
                  <SidebarLink icon={AlertOctagon} label="Low" href='/priority/low' />
                  <SidebarLink icon={Layers3} label="Backlog" href='/priority/backlog' />

                </>
              )}


              
        </div>
    </div>
  )
};
interface SidebarLinkProps {
  href: string;
  icon:LucideIcon;
  label:string;
  //isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
 
}: SidebarLinkProps) =>{
  const pathname = usePathname();
  const isActive = pathname === href ||(pathname ==='/' && href === '/dashboard'); 
  
  return(
    <Link href={href} className='w-full'>
      <div className={`relative flex cursor-pointer items-center gap-3 transition-colors
        bg-black hover:bg-gray-700 ${
          isActive? 'bg-gray-600 text-white' :""
        } justify-start px-8 py-3`}>
          {isActive && (
            <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
          )}

          <Icon className='h-6 w-6 text-gray-100' />
          <span className={`font-medium text-gray-100`}>
            {label}
          </span>
        </div>
    </Link>
  )
  
}

export default Sidebar