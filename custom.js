'use strict';

const todoContent = document.querySelector('.todo-content');
const newTaskBtn = document.querySelector('.new-task-btn');
const addTodoForm = document.querySelector('.add-todo-form');
const del = document.querySelectorAll('.del');
const todoUl = document.querySelector('.todo-content ul');
const searchTodoForm = document.querySelector('.search-todo-form');
const forms = document.querySelectorAll('form');

forms.forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
}));

todoContent.addEventListener('click', (e) => {

    if (e.target.classList.contains('new-task-btn')) {
        newTaskBtn.style.display = 'none';
        addTodoForm.style.display = 'block';
    }

    if (e.target.classList.contains('del')) {
        e.target.parentElement.remove();
        emptyTaskMsg();
    }

});

function emptyTaskMsg() {
    let p = document.querySelector('.todo-content p');

    if (todoUl.childElementCount === 0) {
        if (!p) {
            p = document.createElement('p');
            p.innerText = 'Your task list is empty';
            todoUl.append(p);
        }
    }
    else {
        if (p) {
            p.remove();
        }
    }
}

function generateTodo(a) {
    let generate = `<li>${a} <button class="del">Del</button></li>`;
    todoUl.innerHTML += generate;
}

addTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    const userAddedTodo = addTodoForm.add.value.trim();

    if (userAddedTodo.length) {
        generateTodo(userAddedTodo);
        addTodoForm.reset();
        emptyTaskMsg();
    }

});

const toArray = Array.from(todoUl.children);

function filterTodo(keyword) {

    toArray
        .filter(a => !a.textContent.toLowerCase().includes(keyword))
        .forEach(a => a.classList.add('filtered'))

    toArray
        .filter(a => a.textContent.toLowerCase().includes(keyword))
        .forEach(a => a.classList.remove('filtered'))
};

function displayNoMatchMsg(term) {
    const noMatchMsg = todoUl.querySelector('.no-match-msg');

    if (term.length === 0 || todoUl.querySelector('li:not(.filtered)')) {
        if (noMatchMsg) {
            noMatchMsg.remove();
        }
    }
    else {
        if (!noMatchMsg) {
            let p = document.createElement('p');
            p.innerText = 'No match found';
            p.classList.add('no-match-msg');
            todoUl.append(p);
        }
    }
};

searchTodoForm.addEventListener('keyup', e => {
    const userSearch = searchTodoForm.search.value.toLowerCase().trim();
    filterTodo(userSearch);
    displayNoMatchMsg(userSearch);
});

window.addEventListener('load', () => {
    emptyTaskMsg();
});