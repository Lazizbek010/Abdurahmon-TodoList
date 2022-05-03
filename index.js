const listItem = document.getElementById('parent-list')
let inputValue = document.getElementById('create-input')
let editInputValue = document.getElementById('edit-input')
let errorMessage = 'Maydonni to\'ldirish shart'
const LIST = 'list'
const list = JSON.parse(localStorage.getItem(LIST)) ? JSON.parse(localStorage.getItem(LIST)) : []
let indexForEdit = 0

if(list.length) {
    processing()
}

function deleteItem(i) {
    list.splice(i, 1)
    setList()
    processing()
}

function createList(event, inputId, messageId) {
    event.preventDefault()
    if(inputValue.value) {
        list.push(inputValue.value)
        setList()
        clearValidate(messageId)
        processing()
    } else {
        validate(inputId, messageId)
    }
    inputValue.value = ''
}

function validate(inputId, messageId) {
    let errorMessageTeg = document.getElementById(messageId)
    let inputValue = document.getElementById(inputId)
    errorMessageTeg.innerText = errorMessage
    errorMessageTeg.classList.add('to-do__form__error')
    inputValue.classList.add('to-do__form__label__input-error')
}

function clearValidate(messageId) {
    let errorMessageTeg = document.getElementById(messageId)
    inputValue.classList.remove('to-do__form__label__input-error')
    errorMessageTeg.classList.remove('to-do__form__error')
}

function processing() {
    document.getElementById('parent-list').innerHTML = ''
    const lists = JSON.parse(localStorage.getItem(LIST))
    if(lists) {
        lists.forEach((p, i) => {
            listItem.innerHTML += `
            <li class="to-do__list__item">
                <span>${p}</span>
                <div>
                    <img onclick="editItem(${i})" width="30" src="./img/edit.svg" alt="">
                    <img onclick="deleteItem(${i})" width="30" src="./img/delete.svg" alt="">
                </div>
            </li>
        `
        })
    }
}

function isValidate(event, inputId, messageId) {
    let errorMessageTeg = document.getElementById(messageId)
    if(!event.target.value) {
        validate(inputId, messageId)
    } else {
        if(errorMessageTeg.innerText) {
            errorMessageTeg.innerText = ''
            clearValidate(messageId)
        }
    }
}

function setList() {
    localStorage.setItem(LIST, JSON.stringify(list))
}


function editItem(i) {
    indexForEdit = i
    document.getElementById('popup').classList.add('open-popup')
    document.getElementById('shadow').classList.add('open-shadow')
}

function submitEdit(event, inputId, messageId) {
    event.preventDefault()
    if(editInputValue.value) {
        list.splice(indexForEdit, 1, editInputValue.value)
        setList()
        clearValidate(messageId)
        processing()
        closePopup()
    } else {
        validate(inputId, messageId)
    }
    editInputValue.value = ''
}


function closePopup() {
    document.getElementById('popup').classList.remove('open-popup')
    document.getElementById('shadow').classList.remove('open-shadow')
}
