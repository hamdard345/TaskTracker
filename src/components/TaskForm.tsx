import React, { useState,useEffect } from "react";
import "./TaskForm.css";
import { Button, TextField } from "@mui/material";

function TaskForm({ tasks, setTasks }) {
  const [inputText, setInputText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [completed, setCompleted] = useState(false);

 
  const handleSave = event => {
    const newTask = {
      taskTitle,
      inputText,
      completed:false
    };
    const formData = new FormData();
    formData.append("title", taskTitle);
    formData.append("description", inputText);
    formData.append("completed", false);
    formData.append("createdAt", new Date().toISOString());

    fetch("https://localhost/tasktracker/tasktrackerapi/addtask", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(json => {
        if (json.message === "Success") {
          const formData = new FormData();
          formData.append("deleted",0)
          fetch("https://localhost/tasktracker/tasktrackerapi/alltasks/",{
            method:"POST",
            body:formData,
            })
    .then((response) => response.json())
    .then((json) =>{
      
        setTasks(json.data)
      
          setInputText("");
          setTaskTitle("");
        })} else {
          // Handle errors here, e.g., show an error message
          console.error("Failed to save task:", json.message);
        }
      });
  };

  return (
    <div className="taskform">
      <h3>Add Task</h3>
      <label>Task Title: </label>
      <TextField 
        type="text"
        value={taskTitle}
        onChange={e => setTaskTitle(e.target.value)}
      />
      <label for ="inputText">Task Description:</label>
      <TextField
        type="text"
        id="inputText"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
      <Button
        className="saveButton"
        sx={{ m:"10px" }}
        variant="contained"
        color="secondary"
        onClick={handleSave}>
        Save Task
      </Button>
    </div>
  );
}

export default TaskForm;
