import PropTypes from "prop-types";
import { createContext, useState } from "react";


 export const GlobalContext = createContext()

function GlobalState({children}) {
        const[inputValue, SetInputValue] = useState('');
        const [taskList, setTaskList] = useState([]);
        const [activeIndex, setActiveIndex] = useState(null); 
        const [editMode, setEditMode] = useState(null);
        const [editValue, setEditValue] = useState("");
        


        const displayOpacity = (index) => {
          setActiveIndex(activeIndex === index ? null : index); 
      };
      
      const deleteTaskFunction = (index)=>{
         const updateTask =  taskList.filter((_, i) => i !== index );
         setTaskList(updateTask)
         setEditMode(null)
      }
      

      const updatingTask = (index, updatedTask) => {
        const updatedTasks = taskList.map((task, i) =>
            i === index ? updatedTask : task
        );
        setTaskList(updatedTasks);
    };



   
    const saveEditedTask = (index)=>{
      updatingTask (index, editValue )  
      setEditMode(null);
      setEditValue("");
}


    const toggledState = (task, index)=>{
         setEditValue(task);
         setEditMode(index)
         setActiveIndex(false)
         
    }
   

        return (


          <GlobalContext.Provider
           value={{
            inputValue,
            SetInputValue,
            taskList,
            setTaskList,
            displayOpacity,
            activeIndex,
             setActiveIndex,
             deleteTaskFunction,
             editMode,
             setEditMode,
             updatingTask,
             editValue, 
             setEditValue,
             saveEditedTask,
             toggledState
            
      
              }} >
            {children}
          </GlobalContext.Provider>
        );
        
      }
      export default GlobalState;




      GlobalState.propType = {
        children: PropTypes.node.isRequired
      }