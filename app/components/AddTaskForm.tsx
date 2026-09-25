import React from "react";

const AddTaskForm = () => {
  return (
    <div className="w-full h-40 bg-[#FEFEFE] mt-8">
      <form action="">
        <div className="flex m-6 pt-8">
            <div className="w-8 h-8 rounded-full text-3xl bg-blue-600 text-center ">+</div>
            <h1 className="font-bold text-2xl text-black">Add New Task</h1>
        </div>
        
        {/* Input */}
        <div className="flex">
        <div className="flex">
          <div className="flex flex-col text-black font-bold ml-6">
            <label htmlFor="">Task Title</label>
            <input
              type="text"
              className="border-l-black bg-gray-200 w-100 h-10 rounded-xl"
              placeholder="Enter task Title"
            />
          </div>
          <div className="flex flex-col text-black font-bold ml-6">
            <label htmlFor="">Task Title</label>
            <input
              type="text"
              className="border-l-black bg-gray-200 w-100 h-10 rounded-xl"
              placeholder="Enter task Title"
            />
          </div>
        </div>

        {/* button */}
        <div className="ml-7 m-1">
          <button className="border-gray-200 bg-gray-100/20 border-2 m-4 mr-15 h-10 w-25 rounded-xl text-gray-400">
            Cancel
          </button>
          <button className="bg-blue-600 m-4 mr-15 h-10 w-25 rounded-xl">
            + Add Task
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
