import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const getAllTasks = () =>{
    const formData = new FormData();
    formData.append("deleted",0)
    fetch("https://localhost/tasktracker/tasktrackerapi/alltasks/",{
      method:"POST",
      body:formData,
    })
    .then((response) => response.json())
    .then((json) =>{
      if(json.message === "Success"){
        setTasks(json.data)
      }else setTasks([])
    })
  }
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <>
      <div className="navBar">
        <h1 className="title">Task Tracker</h1>
      </div>
      <TaskForm tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
