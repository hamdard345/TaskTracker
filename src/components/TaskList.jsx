import React, { useState } from 'react';
import './taskList.css';

function TaskList({ tasks, setTasks }) {
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleCompleted = (taskId) => {
    const formData = new FormData();
    formData.append('id', taskId);
    formData.append('completed', true);
  
    fetch('https://localhost/tasktracker/tasktrackerapi/complete/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Success') {
        // Update the task in the array
        const updatedTasks = tasks.map((task) => 
          task.id === taskId ? { ...task, completed: true } : task
        );
        setTasks(updatedTasks);
        }
      });
  };
  const handleDelete = (taskId) => {
    const formData = new FormData();
    formData.append('id', taskId);
    formData.append('deletedAt', new Date().toISOString());
    formData.append('deleted', true);
  
    fetch('https://localhost/tasktracker/tasktrackerapi/delete/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Success') {
          // Filter out the deleted task from the array
          const updatedTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(updatedTasks);
          setDeleteMessage('Task deleted successfully.');
          // Clear the message after a few seconds
          setTimeout(() => setDeleteMessage(''), 3000);
        } else {
          setDeleteMessage('Failed to delete task.');
          // Clear the message after a few seconds
          setTimeout(() => setDeleteMessage(''), 3000);
        }
      });
  };
  const displayTasks = tasks.map((task, index) => {
    return (
      <div key={index}>
        <p>Title: {task.title}</p>
        <p>Task: {task.description}</p>
        <p>
          {task.completed ? (
            '(Done)'
          ) : (
            <button onClick={() => handleCompleted(task.id)}>
              Mark as completed
            </button>
          )}
        </p>
        <button onClick={() => handleDelete(task.id)}>Delete task</button>
      </div>
    );
  });

  return (
    <div className='container'>
      {deleteMessage && <p className='delete-message'>{deleteMessage}</p>}
      {displayTasks}
    </div>
  );
}

export default TaskList;
