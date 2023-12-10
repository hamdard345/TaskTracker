import React from 'react'
import { useState } from "react";
import "./TaskForm.css"

function TaskForm({tasks,setTasks}) {
  const [inputText, setInputText] = useState("");
  const [taskTitle,setTaskTitle] = useState("");
  


  const handleSave = () => {
    const newTask = {
      taskTitle,
      inputText,
    };
    setTasks([...tasks, newTask]);
    setInputText("")
    setTaskTitle("");
  };

  return (
    <div className="taskform">
      <h1>Add Task</h1>
      <label>Task Title: </label>
      <input
       type='text'
       value={taskTitle}
       onChange={e=>setTaskTitle(e.target.value)}
      >
      </input>
      <label>Task Description:</label>
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      ></input>
      <button className="saveButton"onClick={handleSave}>save Task</button>
    </div>
  )
}

export default TaskForm
