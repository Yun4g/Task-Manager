import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexApi/contex";
import Elipses from "./kabab";

export default function TaskList() {
    const { taskList, setTaskList, displayOpacity, activeIndex, editMode, editValue, setEditValue, saveEditedTask } = useContext(GlobalContext);

    const [checkedTasks, setCheckedTasks] = useState([]); // Array to track checked state of each task

    // Function to toggle the checked state of a task
    const check = (index) => {
        setCheckedTasks((prevCheckedTasks) => {
            const newCheckedTasks = [...prevCheckedTasks];
            newCheckedTasks[index] = !newCheckedTasks[index];  // Toggle the checked state for this task
            return newCheckedTasks;
        });
    };

    // Save tasks to localStorage whenever taskList changes
    useEffect(() => {
        if (taskList.length > 0) {
            localStorage.setItem('saved', JSON.stringify(taskList));
        }
    }, [taskList]);

    // Load tasks from localStorage when the component mounts
    useEffect(() => {
        const savedTasks = localStorage.getItem("saved");
        if (savedTasks) {
            setTaskList(JSON.parse(savedTasks));
        }
    }, [setTaskList]);

    return (
        <div className=" flex items-center justify-center">
            {taskList.length === 0 ? (
                <h1 className=" text-3xl text-center">Empty Task Box</h1> 
            ) : (
                <ol className="relative w-full">
                    {
                        taskList.map((tasks, index) => (
                            <li className="relative w-full" key={index}>
                                <div className="border-b-2 border-teal-800 w-full p-3 flex justify-between items-center z-[999]">
                                    <div className="flex items-center w-10/12 gap-3">
                                        <span>
                                            <input
                                                type="checkbox"
                                                checked={checkedTasks[index] || false}  
                                                onChange={() => check(index)}  
                                                name="att"
                                                className="mt-2 appearance-none h-5 w-5 border border-gray-400 rounded-md checked:bg-teal-600 checked:border-transparent focus:outline-none"
                                                id="att"
                                            />
                                        </span>
                                        {
                                            editMode === index ?
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="w-full border rounded p-1"
                                            /> :
                                            <p className={`break-words w-full ${checkedTasks[index] ? "text-red-900" : "text-slate-950"}`}>
                                                {tasks}
                                            </p>
                                        }
                                    </div>
                                    <div className={`absolute z-[1000] bg-white right-8 ${activeIndex === index ? "block" : "hidden"}`}>
                                        <Elipses index={index} task={tasks} />
                                    </div>
                                    <div className="cursor-pointer">
                                        {editMode === index ? (
                                            <button
                                                onClick={() => saveEditedTask(index)}
                                                className="text-green-500"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <i
                                                className="fa-solid fa-ellipsis"
                                                onClick={() => displayOpacity(index)}
                                            ></i>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ol>
            )}
        </div>
    );
}
