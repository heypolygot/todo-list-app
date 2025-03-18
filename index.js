const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");


function updateMessage() {
    const taskLength = tasks.children.length;
    messageSpan.textContent = `You have ${taskLength} tasks pending...!`;
}


function filterTask(term) {
    Array.from(tasks.children)
    .filter((task) => {
        return !task.textContent.toLowerCase().includes(term);
    }).forEach(task => {
        task.classList.add("hide");
    });

    Array.from(tasks.children)
    .filter((task) => {
        return task.textContent.toLowerCase().includes(term);
    }).forEach(task => {
        task.classList.remove("hide");
    });
}


function saveTasks(){
    const taskItems = Array.from(tasks.children).map(task => task.querySelector('span').textContent);
    localStorage.setItem('tasks', JSON.stringify(taskItems));
}


function loadTasks() {
    const taskItems = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.innerHTML = "";
    taskItems.forEach(task => {
        tasks.innerHTML += `<li>
                            <span>${task}</span>
                            <i class="bi bi-trash3-fill delete"></i>
                        </li>`;
    });
}


function initialiseTasks() {
    if(!localStorage.getItem('tasks')){
        const predefinedTasks = ['Coding', 'Gaming', 'Sleeping'];
        localStorage.setItem('tasks', JSON.stringify(predefinedTasks));
    }
    loadTasks();
    updateMessage();   
}


addForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = addForm.task.value.trim();
    if(value.length){
        tasks.innerHTML += `<li>
                            <span>${value}</span>
                            <i class="bi bi-trash3-fill delete"></i>
                        </li>`;
        addForm.reset();
        saveTasks();
    }
    updateMessage();
});



tasks.addEventListener('click', event =>{
    if(event.target.classList.contains("delete")){
        console.log(event.target);
        event.target.parentElement.remove();
        saveTasks();
    }
    updateMessage();

});


clearAll.addEventListener("click", event => {
    const taskItems = tasks.querySelectorAll("li");
    taskItems.forEach(item => {
        item.remove();
        saveTasks();
    });
    updateMessage();
});



searchForm.addEventListener("keyup", event =>{
const term = searchForm.task.value.trim().toLowerCase();
   filterTask(term); 
});


searchForm.addEventListener("click", event =>{
    if(event.target.classList.contains("reset")){
        searchForm.reset();
        const term = searchForm.task.value.trim();        
        filterTask(term);
    }
});


document.addEventListener("DOMContentLoaded", initialiseTasks);