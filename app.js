//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Functions
const addTodo = (event) => {
    //prevent form from submitting
    event.preventDefault();

    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //completed button
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //uncompleted button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
};

const deleteCheck = (event) => {
    const item = event.target
    //delete TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};

const filterTodo = (event) => {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
            todo.style.display = 'flex';
            break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none'
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none'
                }
                break;
        }
    });
};



//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)