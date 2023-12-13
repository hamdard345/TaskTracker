import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm({ tasks, setTasks }) {
  const [inputText, setInputText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const handleSave = event => {
    const newTask = {
      taskTitle,
      inputText,
      completed: false,
    };
    const formData = new FormData();
    formData.append("title", taskTitle);
    formData.append("description", inputText);
    formData.append("completed", "false");
    formData.append("createdAt", new Date().toISOString());

    fetch("https://localhost/tasktracker/tasktrackerapi/addtask/", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(json => {
        if (json.message === "Success") {
          // If the request was successful, update the local state
          setTasks([...tasks, newTask]);
          setInputText("");
          setTaskTitle("");
        } else {
          // Handle errors here, e.g., show an error message
          console.error("Failed to save task:", json.message);
        }
      });
  };

  return (
    <div className="taskform">
      <h1>Add Task</h1>
      <label>Task Title: </label>
      <input
        type="text"
        value={taskTitle}
        onChange={e => setTaskTitle(e.target.value)}
      />
      <label>Task Description:</label>
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
      <button className="saveButton" onClick={handleSave}>
        Save Task
      </button>
    </div>
  );
}

export default TaskForm;
