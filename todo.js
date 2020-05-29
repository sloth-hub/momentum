const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";

let todos =[];

function deleteTodo(evt) {
    const btn = evt.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = todos.filter(todo=> {
        return todo.id !== parseInt(li.id);
    });
    todos = cleanTodos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todos.length + 1;
    delBtn.classList.add("delBtn");
    delBtn.classList.add("glyphicon");
    delBtn.classList.add("glyphicon-remove");
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    };
    todos.push(todoObj);
    saveTodos();
}

function handleSubmit(evt) {
    evt.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadTodos() {
    const loadTodos = localStorage.getItem(TODOS_LS);
    if (loadTodos !== null) {
        const parsedTodos = JSON.parse(loadTodos); // string을 object로
        parsedTodos.forEach(todo => {
            paintTodo(todo.text);
        });
    }
}
function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);

}

init();