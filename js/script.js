"use strict"
let todos;
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const todoForm = document.querySelector('#addtodo_form');
    // const TodoList = document.getElementById('todo-list');
    const username = localStorage.getItem("username") || '';
    nameInput.value = username;

    nameInput.addEventListener("change", e => {
        localStorage.setItem("username", e.target.value);
    })

    todoForm.addEventListener("submit", e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
        }

        todos.unshift(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        e.target.reset();

        displayTodos();
    })
    displayTodos();
})

function displayTodos() {
    const todoList = document.querySelector('#todolist');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todolist__item");
        const input = document.createElement("input");
        const label = document.createElement("label")
        const content = document.createElement("div");
        const span = document.createElement("span");
        const actions = document.createElement("div");
        const edit = document.createElement("button");
        const deleteBtn = document.createElement("button");

        input.type = "checkbox";
        input.checked = todo.done;
        span.classList.add("bubble");
        if (todo.category == "presonal") {
            span.classList.add("personal");
        } else {
            span.classList.add("business");
        }
        content.classList.add('todolist__content');
        actions.classList.add('todolist__actions');
        edit.classList.add('edit');
        deleteBtn.classList.add('delete');

        content.innerHTML = `<input type='text' value='${todo.content}' readonly>`
        edit.innerHTML = `Edit`
        deleteBtn.innerHTML = `Delete`
        label.append(input);
        label.append(span);
        actions.append(edit);
        actions.append(deleteBtn);
        todoItem.append(label);
        todoItem.append(content);
        todoItem.append(actions);

        todoList.append(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }
        input.addEventListener("click", e => {
            todo.done = e.target.checked;
            localStorage.setItem("todos", JSON.stringify(todos));
            if (todo.done) {
                todoItem.classList.add("done")
            } else {
                todoItem.classList.remove("done")
            }
            displayTodos();

        })
        edit.addEventListener("click", e => {
            const input = content.querySelector("input");
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener("blur", e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem("todos", JSON.stringify(todos));
                displayTodos();
            })
        })
        // const content = document.querySelector(".todolist__content");
        // const actions = document.querySelector(".todolist__actions");
        // const edit = document.querySelector(".edit");
        // const deleteBtn = document.querySelector(".delete");
        deleteBtn.addEventListener("click", e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            displayTodos();
        })
    })
}
