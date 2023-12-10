import './taskList.css'

function TaskList({tasks}) {
  const displayTasks = Array.isArray(tasks) ? tasks.map((task,index) =>{
    return (
      <div key={index}>
        <p>Title : {task.taskTitle}</p>
        <p>Task : {task.inputText}</p>
      </div>
    )
  }) : null;
  return (
    <div className='container'>
      {displayTasks}
    </div>
  )
}

export default TaskList
