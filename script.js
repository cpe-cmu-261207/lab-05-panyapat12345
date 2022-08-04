const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;

  //your code here
  if (inputAdd.value === "") {
    alert("Todo cannot be empty");
    return;
  }

  addTodo(inputAdd.value, false);
  saveTodo();

  inputAdd.value = "";
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  //your code here
  doneBtn.style.display = "none";
  deleteBtn.style.display = "none";

  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };

  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  doneBtn.onclick = () => {
    if (span.style.textDecoration === "") {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "";
    }
    saveTodo();
  };

  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  todoCtn.prepend(div);
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    //your code here
    let todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObj);
  }

  const dataRe = [];
  for (let i = 0; i < data.length; i++) {
    dataRe.push(data[data.length - 1 - i]);
  }
  //your code here
  localStorage.setItem("TodoList", JSON.stringify(dataRe));
}

function loadTodo() {
  //your code here
  const todoJson = localStorage.getItem("TodoList");
  const data = JSON.parse(todoJson);
  for (const todoDiv of data) {
    console.log(todoDiv);
    addTodo(todoDiv.title, todoDiv.completed);
  }
}

loadTodo();
