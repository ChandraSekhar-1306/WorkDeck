import React, { useState } from 'react'
import Header from '@/components/Header'
import ModalNewProject from "./ModalNewProject"
import { Clock, Filter, Grid2X2, Grid2X2Check, Grid3X3, List, PlusSquare, Share2, Table, Table2 } from 'lucide-react'

type Props = {
  activeTab:string,
  setActivetab: (tabName: string) => void,
}

const ProjectHeader = ({activeTab, setActivetab}: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false)
  return (
    <div className='px-4 xl:px-6'>
      {/* Modal New Project */}
      <ModalNewProject 
      isOpen={isModalNewProjectOpen}
      onClose={()=> setIsModalNewProjectOpen(false)}
      />


      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header name='Product Design Development' 
        buttonComponent={
          <button className='flex items-center rounded-md bg-[#0275ff] px-3 py-2 text-white hover:bg-blue-600 hover:cursor-pointer'
          onClick={()=> setIsModalNewProjectOpen(true)}
          >
            <PlusSquare className='mr-2 h-5 w-5'/> New Board

          </button>
        }
        />
      </div>
      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y pb-[8px] pt-2 border-gray-500 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton 
            name='Board'
            icon={<Grid3X3 className='h-5 w-5' />}
            setActiveTab={setActivetab}
            activeTab={activeTab} 
            />
          <TabButton 
            name='List'
            icon={<List className='h-5 w-5' />}
            setActiveTab={setActivetab}
            activeTab={activeTab} 
            />
          <TabButton 
            name='Timeline'
            icon={<Clock className='h-5 w-5' />}
            setActiveTab={setActivetab}
            activeTab={activeTab} 
            />
          <TabButton 
            name='Table'
            icon={<Table2 className='h-5 w-5' />}
            setActiveTab={setActivetab}
            activeTab={activeTab} 
            />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-neutral-500 hover:text-gray-300 hover:cursor-pointer">
            <Filter className='h-5 w-5' />
          </button>
          <button className="text-neutral-500 hover:text-gray-300 hover:cursor-pointer">
            <Share2 className='h-5 w-5' />
          </button>
            <div className="relative">
            <input
              type='text'
              placeholder='Search Task'
              className='rounded-md border py-1 pl-10 pr-4 focus:outline-none border-[#1d1f21] bg-[#1d1f21] text-white'
            />
            <Grid2X2 className='absolute left-3 top-2 h-4 w-4 text-neutral-500'/>
            </div>
        </div>
      </div>
    </div>
  )
}

type TabButtonProps = {
  name:string;
  icon:React.ReactNode;
  setActiveTab:(tabName: string) => void;
  activeTab:string; 
}

const TabButton = ({name , icon, setActiveTab , activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button className={`relative flex items-center gap-2 px-1 py-2 text-neutral-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-300 sm:px-2 lg:px-4 hover:cursor-pointer ${isActive ? 'text-blue-200 after:bg-cyan-400' :''}`}
    onClick={()=> setActiveTab(name)} >
    {icon}
    {name}

    </button>
  )

}


export default ProjectHeader

