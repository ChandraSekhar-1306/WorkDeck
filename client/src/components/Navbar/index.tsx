import React from 'react'
import {Menu, Search, Settings} from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'

const Navbar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
    
  return (
    <div className='flex items-center justify-between bg-black px-4 py-3'>
        {/*search bar*/}
        <div className="flex items-center gap-8">
            {!isSidebarCollapsed ? null : (
                <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                    
                    <Menu className='h-8 w-8 text-white cursor-pointer'/>
                </button>
            )}
            <div className="relative flex h-min w-[200px]">
                <Search className='absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-gray-300'/>
                <input
                    className='w-full rounded border-none p-2 pl-8 focus:border-transparent focus:outline-none bg-gray-700 text-white placeholder-white'
                    type='search' placeholder='Search...'
                />
            </div>
        </div>
        {/* Icons*/}
        <div className="flex items-center">
            <Link href="/settings"
            className='h-min w-min rounded p-2 hover:bg-gray-700'>
                <Settings className='h-6 w-6 cursor-pointer text-white'/>
            </Link>
            <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>

            
        </div>
    </div>
  )
}

export default Navbar