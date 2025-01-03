import "./customTask.css"
import { useContext, useEffect, useState } from "react";
import TaskList from "./tasklist";
import { GlobalContext } from "../contexApi/contex";





function TaskInput() {
    const {inputValue, SetInputValue,taskList,setTaskList} = useContext(GlobalContext)
  
    const [numberTasks, setnumberTasks]  =  useState(taskList.length)
     



    useEffect(()=>{
        setnumberTasks(taskList.length)
    },[taskList])

    const handleInput = (e)=>{
           SetInputValue(e.target.value);
          
    }

    const submitTaskToList = ()=>{
        if (inputValue.trim() === '') {
             alert('input can not be Empty')
        } else {
            setTaskList([...taskList, inputValue]);
            SetInputValue('')
            console.log(taskList);
        }
     
} 
 
useEffect(()=>{
     localStorage.setItem("taskList", JSON.stringify(taskList) )
},[taskList])

    return(

         <div className=" h-[30rem] w-11/12  md:w-8/12 lg:w-1/2 xl:w-3/12 rounded-2xl scrollbar  overflow-y-scroll bg-white shadow-lg  shadow-slate-700">
            <div className=" h-2/5 flex justify-center items-center bg-teal-800 ">
             <p className=" text-white text-2xl">You have( {numberTasks} )of Tasks </p>
            </div>
             <div className=" flex justify-between w-full h-16 border-b-2 pe-3 border-teal-800 items-center">
                <input type="text" className=" w-11/12 h-full outline-none ps-3 " name=""  value={inputValue}  onChange={handleInput} id="" placeholder="Add to task list" />
                 <span onClick={submitTaskToList} className=" cursor-pointer text-4xl">+</span>
             </div>

            <div className="z-[999] ">
                <TaskList/>
            </div>
         </div>
    )

   
}

export default TaskInput;
