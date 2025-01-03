import PropTypes from "prop-types";
import { useContext } from "react";
import { GlobalContext } from "../contexApi/contex";

export default function Elipses({ index, task }) {
    const { deleteTaskFunction, toggledState } = useContext(GlobalContext);

    return (
        <div className="border border-slate-800 shadow-lg shadow-slate-700 w-40 flex flex-col rounded-lg text-center">
            <button
                className="p-1 border-b-2 border-slate-800"
                onClick={() => toggledState(task, index)} 
            >
                Edit task
            </button>

            <button
                className="p-1"
                onClick={() => deleteTaskFunction(index)} 
            >
                Delete task
            </button>
        </div>
    );
}

Elipses.propTypes = {
    index: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired, 
};
