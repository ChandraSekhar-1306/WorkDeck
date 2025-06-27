import { User } from '@/state/api'
import Image from 'next/image'
import React from 'react'

const labelClass = "font-semibold text-gray-300";
const valueClass = "text-gray-100";

type Props = {
    user: User
}

const UserCard = ({ user }: Props) => {
    return (
        <div className="mb-4 rounded-lg p-6 shadow-lg bg-[#1d1f21] border border-[#2c313a] transition hover:shadow-xl hover:border-gray-600 flex items-center space-x-4">
            {user.profilePictureUrl && (
                <Image
                    src={`/p2.jpeg`}
                    alt="profile picture"
                    width={48}
                    height={48}
                    className="rounded-full border border-gray-700"
                />
            )}
            <div className="space-y-2 text-sm">
                <div>
                    <span className={labelClass}>Username:</span>{" "}
                    <span className="text-lg font-bold text-white">{user.username}</span>
                </div>
                <div>
                    <span className={labelClass}>Email:</span>{" "}
                    <span className={valueClass}>{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default UserCard