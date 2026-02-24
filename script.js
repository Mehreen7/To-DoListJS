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
function addTask(text) {
    const trimmedText = text.trim();
    if (trimmedText === "") return;

    const task = {
        id: Date.now(),
        text: trimmedText,
        status: "todo",
        completed: false
    }

    tasks.push(task);
    saveTasks();
    renderTasks(tasks);
    taskInput.value = "";
}

//Supprimer une tache

function deleteTask(id) {

    console.log("ID reçu :", id);
    console.log("Tasks avant :", tasks);
    tasks = tasks.filter(task => task.id !== id);
    console.log("Tasks après :", tasks);
    saveTasks();
    renderTasks(tasks);
}

//Changer le statut d'une tache

function toggleStatus(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;
    if (task.status === "todo") {
        task.status = "inProgress";
    } else if (task.status === "inProgress") {
        task.status = "done";
    } else {
        task.status = "todo";
    }
    saveTasks();
    renderTasks(tasks);
}

//Marquer une tache comme faite 

function toggleCompleted(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) return;
    task.completed = !task.completed;
    saveTasks();
    renderTasks(tasks);

}



//Filtrer les tâches

function filterTasks(filter) {

    if (filter === "all") {
        renderTasks(tasks);
        return;
    }

    const filtered = tasks.filter(task => task.status === filter);

    renderTasks(filtered);
}

//Afficher les tâches dans le DOM

function renderTasks(tasksToRender) {
    taskList.innerHTML = ""; // vide le conteneur 
    tasksToRender.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        // CHECKBOX
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleCompleted(task.id));

        //TEXTE
        const taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = task.text;
        if (task.completed) taskText.style.textDecoration = "line-through";

        //BOUTON STATUT
        const statusBtn = document.createElement("button");
        statusBtn.classList.add("status-btn");
        statusBtn.setAttribute("data-status", task.status);
        statusBtn.addEventListener("click", () => toggleStatus(task.id));

        //BOUTON SUPPRIMÉ

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "🗑️";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        //Ajout des elements a la tache

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(statusBtn);
        taskItem.appendChild(deleteBtn);

        //Ajout de la tache au DOM

        taskList.appendChild(taskItem);

    })
}



// 4 Gestion des evenements 

addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
});
taskInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        addTask(taskInput.value);
    }
});

filterBtn.addEventListener('click', () => {
    filterOptions.style.display = filterOptions.style.display === "block" ? "none" : "block";

});

filterOptions.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    if (!filter) return;

    // Supprimer active de tous
    document.querySelectorAll("#filterOptions li").forEach(li => {
        li.classList.remove("active");
    });

    // Ajout active au clique
    e.target.classList.add("active");

    filterTasks(filter);

    filterOptions.style.display = "none";
});

document.addEventListener("click", (e) => {
    if (!filterBtn.contains(e.target) && !filterOptions.contains(e.target)) {
        filterOptions.style.display = "none";
    }
});

//Sauvegarde dans le localStorage

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// 5 Initialisation des data pour charger depuis le localStorage

function init() {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks(tasks);
    }
}
init();