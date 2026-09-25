import Image from "next/image";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";

export default function Home() {
  return (
    <div className=" w-full h-200 bg-[#F6F9FD]">
      <Header/>
      <AddTaskForm/>
    </div>
  );
}
