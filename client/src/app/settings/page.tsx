import Header from '@/components/Header';
import React from 'react';

const Settings = () => {
    const userSettings = {
        username: "Joh Doe",
        email: "John.doe@example.com",
        teamName: "Development Team",
        roleName: "Developer"
    };
    const labelStyles = "block text-sm font-medium text-white mb-1";
    const textStyles = "mt-1 block w-full rounded border border-[#3b3d40] bg-[#3b3d40] p-2 text-white shadow-sm";
    return (
        <div className="p-8 min-h-screen bg-[#101214]">
            <Header name="Settings" />
            <div className="space-y-8 max-w-lg mx-auto mt-12 bg-[#181a1b] rounded-xl shadow-lg p-8 border border-[#232527]">
                <div className="grid grid-cols-3 items-center gap-4">
                    <label className={labelStyles + " col-span-1 text-right pr-4"}>Username</label>
                    <div className={textStyles + " col-span-2 bg-[#232527] font-semibold"}>{userSettings.username}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <label className={labelStyles + " col-span-1 text-right pr-4"}>Email</label>
                    <div className={textStyles + " col-span-2 bg-[#232527] font-semibold"}>{userSettings.email}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <label className={labelStyles + " col-span-1 text-right pr-4"}>Team</label>
                    <div className={textStyles + " col-span-2 bg-[#232527] font-semibold"}>{userSettings.teamName}</div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <label className={labelStyles + " col-span-1 text-right pr-4"}>Role</label>
                    <div className={textStyles + " col-span-2 bg-[#232527] font-semibold"}>{userSettings.roleName}</div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
