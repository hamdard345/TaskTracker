import './taskList.css'

function TaskList({tasks,setTasks}) {
  const handleCompleted = index => {
    const updatedTask = [...tasks];
    updatedTask[index].completed = true;
    setTasks(updatedTask);
  }
  const displayTasks =  tasks.map((task,index) =>{
    return (
      <div key={index}>
        <p>Title : {task.taskTitle}</p>
        <p>Task : {task.inputText}</p>
        <p>{task.completed ? "(Done)" : "Not done yet"}</p>
        <button onClick={()=>handleCompleted(index)}>Mark as completed</button>
      </div>
    )
  }) 
  return (
    <div className='container'>
      {displayTasks}
    </div>
  )
}

export default TaskList
