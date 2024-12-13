const taskForm = document.getElementById('task-form');



taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskTitle = document.getElementById('task-title').value.trim()
    const taskDesc = document.getElementById('task-desc').value.trim()
    const dueDate = document.getElementById('task-date').value
    const priority = document.getElementById('task-priority').value

    if(!taskTitle || !dueDate){
        alert("Please provide a title and a due date");
        return
    }
    
    addTaskToCurrentProject({
        taskTitle,
        taskDesc,
        dueDate,
        priority
    });

    taskForm.reset()
});

const addTaskToCurrentProject = (task) => {

 const currentProject = getCurrentProject();

 if (!Array.isArray(currentProject.tasks)) {
    currentProject.tasks = [];
}


 currentProject.tasks.push(task)
 displayTasks(currentProject.tasks)
}

const displayTasks = (tasks) => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');

        taskItem.innerHTML = `
        <strong>${task.taskTitle}</strong>
            <p>${task.taskDesc}</p>
            <p>Due: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <button class="delete-task" data-index="${index}">Delete</button>`;
            
        taskList.appendChild(taskItem);
    });
};


document.getElementById('task-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-task')){
        const index = e.target.dataset.index
        const currentProject = getCurrentProject();

       currentProject.tasks.splice(index, 1);
       displayTasks(currentProject.tasks);
    }
})

const projectList = document.getElementById('project-list');

projectList.addEventListener('click', (e) => {
    if (e.target.classList.contains('project')) {
        setCurrentProject(e.target.textContent);
        displayTasks(getCurrentProject().tasks);
    }
});


let projects = [{ name: 'Default Project', tasks: [] }];
let currentProject = projects[0];
const getCurrentProject = () => currentProject

const setCurrentProject = (projectName) => {
    currentProject = projects.find(project => project.name === projectName);
};

document.getElementById('add-project').addEventListener('click', () => {
  const modal = document.getElementById('project-modal')
  modal.classList.remove('hidden')  
})

document.getElementById('project-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const projectName = document.getElementById('project-name').value.trim()

    if(projectName) {
        addProjectToList(projectName)
        document.getElementById('project-modal').classList.add('hidden')
    } else {
        alert('Please enter a project name')
    } 
})

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('project-modal').classList.add('hidden')
})

const addProjectToList = (projectName) => {
 const projectList = document.getElementById('project-list')

 const projectItem = document.createElement('li')
 projectItem.classList.add('project')
 projectItem.textContent = projectName

 projectList.appendChild(projectItem);

 projects.push({name: projectName, tasks: []})

 document.getElementById('project-name').value = ''
};
