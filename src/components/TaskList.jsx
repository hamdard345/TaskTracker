import React, { useState } from "react";
import "./taskList.css";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Pagination from "@mui/material/Pagination";
import { Card } from "@mui/material";

function TaskList({ tasks, setTasks }) {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [page, setPage] = useState(1);
  const tasksPerPage = 6;

  const handleCompleted = taskId => {
    const formData = new FormData();
    formData.append("id", taskId);
    formData.append("completed", true);

    fetch("https://localhost/tasktracker/tasktrackerapi/complete/", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(json => {
        if (json.message === "Success") {
          // Update the task in the array
          const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: true } : task
          );
          setTasks(updatedTasks);
        }
      });
  };
  const handleDelete = taskId => {
    const formData = new FormData();
    formData.append("id", taskId);
    formData.append("deletedAt", new Date().toISOString());
    formData.append("deleted", true);

    fetch("https://localhost/tasktracker/tasktrackerapi/delete/", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(json => {
        if (json.message === "Success") {
          // Filter out the deleted task from the array
          const updatedTasks = tasks.filter(task => task.id !== taskId);
          setTasks(updatedTasks);
          setDeleteMessage("Task deleted successfully.");
          // Clear the message after a few seconds
          setTimeout(() => setDeleteMessage(""), 3000);
        } else {
          setDeleteMessage("Failed to delete task.");
          // Clear the message after a few seconds
          setTimeout(() => setDeleteMessage(""), 3000);
        }
      });
  };
  const displayTasks = tasks
    .slice((page - 1) * tasksPerPage, page * tasksPerPage)
    .map((task, index) => {
      return (
        <Card key={index} style={{ position: "relative" ,backgroundColor: "#90ee90" }}>
          <Tooltip title="Delete" placement="top">
            <ClearIcon
              onClick={() => handleDelete(task.id)}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: 0,
                right: 0,
              }}
            />
          </Tooltip>
          <h3> {task.title}</h3>
          <p> {task.description}</p>
          <p>
            {task.completed ? (
              "Completed"
            ) : (
              <Tooltip title="Mark as completed" placement="top">
                <CheckCircleIcon
                  onClick={() => handleCompleted(task.id)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: 0,
                    right: "25px",
                  }}
                />
              </Tooltip>
            )}
          </p>
        </Card>
      );
    });

  return (
    <div className="container">
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      {displayTasks}

      <Pagination
        variant="outlined"
        shape="rounded"
        count={Math.ceil(tasks.length / tasksPerPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
}

export default TaskList;
