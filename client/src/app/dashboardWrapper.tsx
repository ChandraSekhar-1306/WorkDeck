"use client"
import React from 'react'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar";
import AuthProvider from "./authProvider"
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({children}:{children: React.ReactNode}) => {
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
  
  return (
    <div className='flex min-h-screen-w-full bg-[#101214] text-gray-200'>
        {/* Sidebar can be added here if needed */}
        <Sidebar />
        <main className={`flex w-full flex-col bg-[#101214] ${isSidebarCollapsed ? "":"md:pl-64"}  text-gray-200`}>
          {/*navbar can be added here if needed */}
          <Navbar />
          {children}
        </main>
    </div>
  )
}
const DashboardWrapper = ({children}:{children: React.ReactNode}) => {
  return (
    <StoreProvider>
      <AuthProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
      </AuthProvider>
    </StoreProvider>
  )
}

export default DashboardWrapper