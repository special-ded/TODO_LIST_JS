const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheckTodo)
filterOption.addEventListener('click', filterTodo)


function addTodo(event) {
  event.preventDefault();

  // Addint Todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo')

  // Adding new Todo
  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)

  //Adding Todo to Local Storage
  saveLocalTodos(todoInput.value)

  //CHECK BUTTON
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
  completedButton.classList.add('complete-btn')
  todoDiv.appendChild(completedButton)

  //TRASH BUTTON
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fa fa-trash"></i>'
  trashButton.classList.add('trash-btn')
  todoDiv.appendChild(trashButton)

  // Append to TODO LI
  todoList.append(todoDiv)

  // Clear input value
  todoInput.value = ""
}

function deleteCheckTodo(event) {
  const item = event.target;
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall')
    removeLocalTodos(todo)
    setTimeout(() => todo.remove(), 1000)

  }
  //Check
  if (item.classList[0] = 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed')
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes
  todos.forEach(function (todo) {

    if (event.target.value == 'completed') {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'flex';
      } else {
        todo.style.display = 'none';
      }
    }

    if (event.target.value == 'all') {
      todo.style.display = 'flex';
    }

    if (event.target.value == 'uncompleted') {
      if (todo.classList.contains('completed')) {
        todo.style.display = 'none';
      } else {
        todo.style.display = 'flex';
      }
    }
  })
}

function saveLocalTodos(todo) {
  //Check
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach(function (todo) {
    // Addint Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //CHECK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    //TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fa fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    // Append to TODO LI
    todoList.append(todoDiv)
  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const textOfTodo = todo.children[0].innerText
  const indexOfTodo = todos.indexOf(textOfTodo)
  todos.splice(indexOfTodo, 1)
  localStorage.setItem("todos", JSON.stringify(todos))
}
