import React from 'react'
import {Menu, Search, Settings, User} from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { useGetAuthUserQuery } from '@/state/api'
import { signOut } from 'aws-amplify/auth'
import Image from 'next/image'

const Navbar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
    const{data:currentUser} = useGetAuthUserQuery({});
    const handleSignOut = async()=>{
        try {
            await signOut();
        } catch (error) {
            console.error("Error signing out: ", error)
        }
    };
    if(!currentUser) return null;
    const currentUserDetails = currentUser?.userDetails;
    
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
            <div className="hidden items-center justify-between md:flex">
                <div className="align-center flex h-9 w-9 justify-center">
                    {!currentUserDetails?.profilePictureUrl ? (
                         <Image
                            src={`/${currentUserDetails?.profilePictureUrl}`}
                            alt={currentUserDetails?.username || "User Profile Picture"}
                            width={100}
                            height={50}
                            className="h-full rounded-full object-cover"
                    
                            />
                    ):(
                        <User className='h-6 w-6 cursor-pointer self-center rounded-full text-white' />
                    )}
                </div>
                <span className="mx-3 text-white">
                    {currentUserDetails?.username}
                </span>
                <button className='hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 hover:cursor-pointer md:block'
                onClick={handleSignOut}
                >
                    Sign out
                </button>
            </div>

            
        </div>
    </div>
  )
}

export default Navbar