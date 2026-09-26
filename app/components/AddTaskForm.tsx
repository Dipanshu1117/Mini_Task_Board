"use client";

import { useState } from "react";

type Status = "Todo" | "In Progress" | "Done";

type TaskInput = {
  title: string;
  status: Status;
};

const AddTaskForm = ({onAddTask,}:{onAddTask?: (task: TaskInput) => void;}) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>("Todo");

  const resetForm = () => {
    setTitle("");
    setStatus("Todo");
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }
    onAddTask?.({
      title: title.trim(),
      status,
    });
    resetForm();
  };

  return (
    <div className="mt-8 rounded-2xl bg-[#F2F5F9] p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-4xl font-bold tracking-tight text-slate-800">Add New Task</h2>

        <div className="grid gap-6 md:grid-cols-[1.5fr_0.9fr_auto] md:items-end">
          <div className="flex flex-col gap-2">
            <label htmlFor="task-title" className="text-xl font-semibold text-slate-700">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title..."
              className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-lg text-slate-700 outline-none ring-0 transition placeholder:text-slate-400 focus:border-blue-400"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="task-status" className="text-xl font-semibold text-slate-700">
              Status
            </label>
            <select
              id="task-status"
              value={status}
              onChange={(event) => setStatus(event.target.value as Status)}
              className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-lg text-slate-700 outline-none transition focus:border-blue-400"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6 md:pt-0">
            <button
              type="button"
              onClick={resetForm}
              className="h-12 rounded-xl border border-slate-300 bg-white px-5 text-lg font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-12 rounded-xl bg-[#2E79FF] px-5 text-lg font-semibold text-white shadow-sm transition hover:bg-[#256fe6]"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
