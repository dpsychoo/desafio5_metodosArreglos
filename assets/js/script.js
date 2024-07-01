class TodoList {
    constructor() {
        this.tasks = [
            { id: 1, descripcion: "Jugar Elden Ring💀", completo: true },
            { id: 2, descripcion: "Cambiar la pasta térmica al PC", completo: false },
            { id: 3, descripcion: "Estudiar para el nuevo módulo de DL", completo: false }
        ];
        this.nextId = 4; /* Siguiente ID disp para nuevas tareas */

        // Elementos del DOM
        this.taskInput = document.getElementById('new-task-input');
        this.taskTableBody = document.getElementById('task-table-body');
        this.totalTasksElement = document.getElementById('total-tasks');
        this.completedTasksElement = document.getElementById('tareas-realizadas');
        this.addTaskButton = document.getElementById('add-task-button');

        // Eventos
        this.addTaskButton.addEventListener('click', () => this.addTask());

        // Inicializar la lista de tareas
        this.updateTaskList();
    }

    addTask(descripcion) {
        const taskDescripcion = descripcion || this.taskInput.value.trim();
        
        if (taskDescripcion) {
            this.tasks.push({
                id: this.nextId++,
                descripcion: taskDescripcion,
                completo: false
            });
            this.taskInput.value = '';
            this.updateTaskList();
        }
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completo = !task.completo;
            this.updateTaskList();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.updateTaskList();
    }

    updateTaskList() {
        this.taskTableBody.innerHTML = '';

        this.tasks.forEach(task => {
            const row = document.createElement('tr');
            
            const idCell = document.createElement('td');
            idCell.textContent = task.id;
            row.appendChild(idCell);
            
            const descripcionCell = document.createElement('td');
            descripcionCell.textContent = task.descripcion;
            if (task.completo) {
                descripcionCell.innerHTML += ' <span class="badge badge-success">Realizado</span>';
            }
            row.appendChild(descripcionCell);
            
            const completoCell = document.createElement('td');
            const completoCheckbox = document.createElement('input');
            completoCheckbox.type = 'checkbox';
            completoCheckbox.checked = task.completo;
            completoCheckbox.addEventListener('change', () => this.toggleTaskCompletion(task.id));
            completoCell.appendChild(completoCheckbox);
            row.appendChild(completoCell);
            
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm delete-button';
            deleteButton.textContent = '✖';
            deleteButton.addEventListener('click', () => this.deleteTask(task.id));
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);
            
            this.taskTableBody.appendChild(row);
        });

        this.updateResumen();
    }

    updateResumen() {
        this.totalTasksElement.textContent = this.tasks.length;
        this.completedTasksElement.textContent = this.tasks.filter(t => t.completo).length;
    }

    showTasks() {
        console.log(this.tasks);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList();

    // Exponer métodos a la consola
    window.todoList = todoList;
});


/* Comandos para la consola ya que está orientada a objetos :) */

// Acceder a la lista de tareas
// console.log(todoList.tasks);

// Mostrar todas las tareas
// todoList.showTasks();

// Agregar una tarea
// todoList.addTask('Nueva tarea desde la consola');


// Eliminar una tarea (usando el ID de la tarea):
// todoList.deleteTask(1);


// Marcar una tarea como completada (usando el ID de la tarea):
// todoList.toggleTaskCompletion(2);





