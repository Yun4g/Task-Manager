import { useContext, useState} from "react"
import { GlobalContext } from "../contexApi/contex"
import Elipses from "./kabab"





export default function TaskList() {
    const { taskList,displayOpacity,  activeIndex,  editMode , editValue, setEditValue, saveEditedTask } = useContext(GlobalContext);

    const [Checked, setChecked] = useState(false)


    const check =()=>[
        setChecked(!Checked)
    ]


    return (


        <ol className="relative w-full">

            {
                taskList.map((tasks, index) => (
                    <li className="relative w-full" key={index}>
                        <div className="border-b-2  border-teal-800 w-full p-3 flex justify-between items-center z[999]">
                            <div className=" flex items-center w-10/12 gap-3">
                                  <span>
                                    <input type="checkbox" onClick={check} name="att" className=" mt-2 appearance-none h-5  w-5 border border-gray-400 rounded-md checked:bg-teal-600 checked:border-transparent focus:outline-none" id="att" />
                                    </span>
                                 {
                                    editMode === index ? 
                                    <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="w-full border rounded p-1"
                                />

                                    :   <p className= {`break-words w-full ${Checked ? " text-red-900" :"text-slate-950" } `} >{tasks}</p>
                                 }
                               
                          
                                     </div>
                            <div className={`absolute z[1000] bg-white right-8  ${activeIndex === index ? " block" : "hidden"}`} >
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
    )


}