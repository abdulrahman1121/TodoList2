//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Functions
const addTodo = (event) => {
    event.preventDefault();

    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    createTodo(todoText);
    saveLocalTodos(todoText, false); // Save the todo with completion status (false for incomplete)
    
    todoInput.value = '';
};

const createTodo = (todoText, completed) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoText;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    if (completed) {
        todoDiv.classList.add('completed');
    }

    todoList.appendChild(todoDiv);
};

const deleteCheck = (event) => {
    const item = event.target;

    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        todo.classList.add('fall');
        const todoText = todo.children[0].innerText;
        removeLocalTodos(todoText);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        const todoText = todo.children[0].innerText;
        updateLocalTodos(todoText);
    }
};

const filterTodo = (event) => {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
};

const saveLocalTodos = (todoText, completed) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push({ text: todoText, completed: completed });
    localStorage.setItem('todos', JSON.stringify(todos));
};

const getTodos = () => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        createTodo(todo.text, todo.completed);
    });
};

const removeLocalTodos = (todoText) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const filteredTodos = todos.filter(todo => todo.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
};

const updateLocalTodos = (todoText) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        if (todo.text === todoText) {
            todo.completed = !todo.completed;
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
};

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


