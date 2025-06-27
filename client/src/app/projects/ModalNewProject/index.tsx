import Modal from '@/components/Modal';
import { useCreateProjectMutation } from '@/state/api';
import React, { useState } from 'react'
import { formatISO } from 'date-fns';

type Props = {
    isOpen: boolean;
    onClose: ()=> void;
}

const ModalNewProject = ({isOpen , onClose}: Props) => {
    const [createProject, {isLoading}] = useCreateProjectMutation();
    const [projectName , setProjectName] = useState("");
    const [description , setDescription] = useState("");
    const [startDate , setStartDate] = useState("");
    const [endDate , setEndDate] = useState("");

    const handleSubmit = async()=>{
        if(!projectName || !startDate || !endDate) return;

        const formattedStartDate = formatISO(new Date(startDate), {representation: 'complete'})
        const formattedEndDate = formatISO(new Date(endDate), {representation: 'complete'})
        await createProject({
            name: projectName,
            description,
            startDate: formattedStartDate,
            endDate: formattedEndDate
        })
    };
    const isFormValid = () =>{
        return projectName && description && startDate && endDate;
    };

    const inputStyles = 'w-full rounded border border-[#3b3d40] p-2 shadow-sm bg-[#3b3d40] text-white focus:outline-none'
   
  return <Modal isOpen={isOpen} onClose={onClose} name='Create New Project'>
    <form className='mt-4 space-y-6' onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit()
    }}>
        <input 
        type="text" 
        placeholder="Project Name" 
        value={projectName} 
        onChange={(e)=> setProjectName(e.target.value)} 
        className={inputStyles} />

        <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e)=> setDescription(e.target.value)} 
        className={inputStyles} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">

        <input 
        type="date" 
        value={startDate} 
        onChange={(e)=> setStartDate(e.target.value)} 
        className={inputStyles} />
        <input 
        type="date" 
        value={endDate} 
        onChange={(e)=> setEndDate(e.target.value)} 
        className={inputStyles} />

        
        </div>
        <button type='submit' className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-[#0275ff] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2
            ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" :" "}`}
            disabled={!isFormValid()|| isLoading}
            >
                {isLoading ? "Creating..." : "Create Project"}

            </button>

    </form>
  </Modal>
    
  
}

export default ModalNewProject