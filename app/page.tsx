"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";

type Status = "Todo" | "In Progress" | "Done";

type Task = {
  id: number;
  title: string;
  status: Status;
  description?: string;
  date: string;
};

const columns: Array<{ key: Status; label: string; dot: string; card: string; badge: string }> = [
  { key: "Todo", label: "Todo", dot: "bg-slate-500", card: "bg-slate-100", badge: "bg-slate-200 text-slate-700" },
  { key: "In Progress", label: "In Progress", dot: "bg-amber-400", card: "bg-amber-50", badge: "bg-amber-100 text-amber-700" },
  { key: "Done", label: "Done", dot: "bg-emerald-500", card: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700" },
];

const formatTaskDate = (value?: string) => {
  if (!value) return "Today";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        const mappedTasks = data.map((task: any) => ({
          id: task.id,
          title: task.title,
          status: task.status,
          description: task.description,
          date: formatTaskDate(task.created_at),
        }));

        setTasks(mappedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = async ({ title, status }: { title: string; status: Status }) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          status,
          description: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Task creation failed");
      }

      const newTask = await response.json();

      setTasks((currentTasks) => [
        ...currentTasks,
        {
          id: newTask.id,
          title: newTask.title,
          status: newTask.status,
          description: newTask.description,
          date: formatTaskDate(newTask.created_at),
        },
      ]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleStatusChange = async (taskId: number, nextStatus: Status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: updatedTask.status,
                date: formatTaskDate(updatedTask.created_at),
              }
            : task
        )
      );
      setOpenTaskId(null);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
      setOpenTaskId(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getStatusOptions = (currentStatus: Status): Status[] => {
    if (currentStatus === "Todo") return ["In Progress", "Done"];
    if (currentStatus === "In Progress") return ["Todo", "Done"];
    return ["Todo", "In Progress"];
  };

  return (
    <main className="min-h-screen bg-[#F4F7FB] text-slate-800">
      <Header />

      <div className="mx-auto max-w-6xl px-4 pb-10 pt-8">
        <AddTaskForm onAddTask={handleAddTask} />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasks.filter((task) => task.status === column.key);

            return (
              <section key={column.key} className={`rounded-2xl ${column.card} p-4 ring-1 ring-slate-200`}>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`h-3.5 w-3.5 rounded-full ${column.dot}`} />
                    <h3 className="text-3xl font-bold text-slate-800">{column.label}</h3>
                  </div>
                  <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-lg font-semibold text-slate-700 ring-1 ring-slate-200">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {columnTasks.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-500">
                      No tasks
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <article key={task.id} className="relative rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <h4 className="text-2xl font-bold text-slate-800">{task.title}</h4>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setOpenTaskId(openTaskId === task.id ? null : task.id)}
                              className="text-xl text-slate-400 hover:text-slate-600"
                            >
                              ⋮
                            </button>

                            {openTaskId === task.id && (
                              <div className="absolute right-0 top-full z-10 mt-2 w-52 rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-200">
                                {task.status === "Done" ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleStatusChange(task.id, "In Progress")}
                                      className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                    >
                                      Move to In Progress
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                      Delete
                                    </button>
                                  </>
                                ) : (
                                  getStatusOptions(task.status).map((option) => (
                                    <button
                                      key={option}
                                      type="button"
                                      onClick={() => handleStatusChange(task.id, option)}
                                      className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                    >
                                      Move to {option}
                                    </button>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${column.badge}`}>
                          {task.status}
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-base text-slate-500">
                          <span aria-hidden="true">📅</span>
                          <span>{task.date}</span>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

