// 1 On commence par selectionner les élément du DOM
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const filterBtn = document.getElementById('filterBtn');
const filterOptions = document.getElementById('filterOptions');

//2  Les tableaux pour les données a stocker en mémoire
let tasks = []; // Pour chaque tâches on aura {id, text, statuts, completed}

// 3 Fonction principales
// Ajouter une tache
function addTask(text){
    const trimmedText = text.trim();
    if(trimmedText === "") return;

    const task= {
        id: Date.now(),
        text: trimmedText,
        status: "todo",
        completed: false
    }

    tasks.push(task);
    renderTasks(tasks);
    taskInput.value = "";
}

//Supprimer une tache

function deleteTask(id){}

//Changer le statut d'une tache

function toggleStatus(id){}

//Marquer une tache comme faite 

function toggleCompleted(id){}

//Filtrer les tâches

function filterTasks (filter){}

//Afficher les tâches dans le DOM

function renderTasks(tasksToRender){
    taskList.innerHTML = ""; // vide le conteneur 
    tasksToRender.forEach(task =>{
        
    })
}

// 4 Gestion des evenements 

addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
} );
taskInput.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
        addTask(taskInput.value);
    }
});
filterBtn.addEventListener('click', () => {});
filterOptions.addEventListener('click', (e) => {});

// 5 Initialisation des data pour charger depuis le localStorage

function init() {}
init();