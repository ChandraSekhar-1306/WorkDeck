import React from 'react'
import { format } from 'date-fns';
import { Task } from '@/state/api';
import Image from 'next/image';

type Props = {
    task: Task;
}

const labelClass = "font-semibold text-gray-300";
const valueClass = "text-gray-100";

const TaskCard = ({ task }: Props) => {
    return (
        <div className="mb-4 rounded-lg p-6 shadow-lg bg-[#1d1f21] border border-[#2c313a] transition hover:shadow-xl hover:border-gray-600">
            {task.attachments && task.attachments.length > 0 && (
                <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-400 mb-1">Attachments:</div>
                    <div className="flex flex-wrap gap-3">
                        <Image
                            src={`/${task.attachments[0].fileURL}`}
                            alt={task.attachments[0].fileName}
                            width={350}
                            height={150}
                            className="rounded-md border border-[#2c313a] object-cover"
                        />
                    </div>
                </div>
            )}
            <div className="space-y-2 text-sm">
                <div>
                    <span className={labelClass}>ID:</span>{" "}
                    <span className={valueClass}>{task.id}</span>
                </div>
                <div>
                    <span className={labelClass}>Title:</span>{" "}
                    <span className="text-lg font-bold text-white">{task.title}</span>
                </div>
                <div>
                    <span className={labelClass}>Description:</span>{" "}
                    <span className={valueClass}>{task.description || "No description provided"}</span>
                </div>
                <div>
                    <span className={labelClass}>Status:</span>{" "}
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-800 text-blue-100 text-xs font-medium">{task.status}</span>
                </div>
                <div>
                    <span className={labelClass}>Priority:</span>{" "}
                    <span className={`rounded px-2 py-1 text-xs font-semibold ${task.priority === "Urgent" ? "bg-red-200 text-red-700" : task.priority === "High" ? "bg-yellow-200 text-yellow-700" : task.priority === "Medium" ? "bg-green-200 text-green-700" : task.priority==="Low" ? "bg-blue-200 text-blue-700" : "bg-gray-200 text-gray-700"}`}>{task.priority}</span>
                </div>
                <div>
                    <span className={labelClass}>Tags:</span>{" "}
                    <span className={valueClass}>
                        {task.tags && typeof task.tags === "string" && task.tags.trim() !== ""
                            ? task.tags.split(",").map((tag: string) => (
                                <div
                                    key={tag}
                                    className="inline-block rounded px-2 py-1 text-xs font-semibold text-black bg-cyan-200 mr-1"
                                >
                                    {tag.trim()}
                                </div>
                            ))
                            : "No Tags"}
                    </span>
                </div>
                <div>
                    <span className={labelClass}>Start Date:</span>{" "}
                    <span className={valueClass}>{task.startDate ? format(new Date(task.startDate), "PP p") : "Not set"}</span>
                </div>
                <div>
                    <span className={labelClass}>Due Date:</span>{" "}
                    <span className={valueClass}>{task.dueDate ? format(new Date(task.dueDate), "PP p") : "Not set"}</span>
                </div>
                <div>
                    <span className={labelClass}>Author:</span>{" "}
                    <span className={valueClass}>{task.author ? task.author.username : "Unknown"}</span>
                </div>
                <div>
                    <span className={labelClass}>Assignee:</span>{" "}
                    <span className={valueClass}>{task.assignee ? task.assignee.username : "Unassigned"}</span>
                </div>
            </div>
        </div>
    )
}

export default TaskCard