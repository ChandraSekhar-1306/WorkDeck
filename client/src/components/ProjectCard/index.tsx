import { Project } from '@/state/api'
import React from 'react'

const labelClass = "font-semibold text-gray-300";
const valueClass = "text-gray-100";

type Props = {
    project: Project
}

const ProjectCard = ({ project }: Props) => {
    return (
        <div className="mb-4 rounded-lg p-6 shadow-lg bg-[#1d1f21] border border-[#2c313a] transition hover:shadow-xl hover:border-gray-600">
            <div className="space-y-2 text-sm">
                <div>
                    <span className={labelClass}>Name:</span>{" "}
                    <span className="text-lg font-bold text-white">{project.name}</span>
                </div>
                <div>
                    <span className={labelClass}>Description:</span>{" "}
                    <span className={valueClass}>{project.description || "No description provided"}</span>
                </div>
                <div>
                    <span className={labelClass}>Start Date:</span>{" "}
                    <span className={valueClass}>{project.startDate || "Not set"}</span>
                </div>
                <div>
                    <span className={labelClass}>End Date:</span>{" "}
                    <span className={valueClass}>{project.endDate || "Not set"}</span>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard