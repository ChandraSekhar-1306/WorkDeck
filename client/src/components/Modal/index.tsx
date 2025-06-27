import { X } from 'lucide-react';
import React from 'react'
import ReactDOM from "react-dom"
import Header from '../Header';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: ()=> void;
    name: string;
}

const Modal = ({
    children,
    isOpen,
    onClose,
    name

}: Props) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
       <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-[rgba(55,65,81,0.5)] p-4">

                <div className="w-full max-w-2xl rounded-lg bg-[#1d1f21] p-4 shadow-lg">
                    <Header 
                    name={name}
                    buttonComponent={
                        <button className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer'
                         onClick={onClose}
                        >
                            <X size={18}/>
                           
                        </button>
                    }
                    isSmallText
                    />
                    {children}
                </div>
                
        </div>,
        document.body,
    )
}

export default Modal