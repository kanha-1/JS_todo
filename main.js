// selector
var todoInput = document.querySelector(".todo_input");
var todoButton = document.querySelector(".todo_button");
var todoList = document.querySelector(".todo_list");
var filterOption = document.querySelector(".filter_todo");

// event listeners
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

// function
function addTodo(event) {
	event.preventDefault();
	var todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	var newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo_item");
	todoDiv.appendChild(newTodo);

	//LocalStorage
	saveLocalTodos(todoInput.value);

	//button complete
	var completedButton = document.createElement("button");
	completedButton.innerHTML = "<i class='fa fa-check'></i>";
	completedButton.classList.add("complete_btn");
	todoDiv.appendChild(completedButton);
	//button trash
	var trashButton = document.createElement("button");
	trashButton.innerHTML = "<i class='fa fa-trash'></i>";
	trashButton.classList.add("trash_btn");
	todoDiv.appendChild(trashButton);
	// //append to list
	todoList.appendChild(todoDiv);
	todoInput.value = "";
}
function deleteTodo(e) {
	var item = e.target;
	if (item.classList[0] === "trash_btn") {
		var todo = item.parentElement;
        todo.classList.add("dlt");
        removeLocalTodos(todo)
		todo.addEventListener("transitionend", function () {
			todo.remove();
		});
	}
	if (item.classList[0] === "complete_btn") {
		var todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}
//Filter todos
function filterTodo(e) {
	var todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "All":
				todo.style.display = "flex";
				break;
			case "Completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "Uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function (todo) {
		var todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		var newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add("todo_item");
		todoDiv.appendChild(newTodo);

		//button complete
		var completedButton = document.createElement("button");
		completedButton.innerHTML = "<i class='fa fa-check'></i>";
		completedButton.classList.add("complete_btn");
		todoDiv.appendChild(completedButton);
		//button trash
		var trashButton = document.createElement("button");
		trashButton.innerHTML = "<i class='fa fa-trash'></i>";
		trashButton.classList.add("trash_btn");
		todoDiv.appendChild(trashButton);
		// //append to list
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
    let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
    var todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos));
}