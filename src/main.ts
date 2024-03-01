import { v4 as uuidV4 } from 'uuid'

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#todo-list')
const form = document.querySelector<HTMLFormElement>('#todo-form')
const input = document.querySelector<HTMLInputElement>('#task')

let tasks: Task[] = []

form?.addEventListener("submit", e => {
  e.preventDefault()

  if(input?.value == "" || input?.value == null) return
  
  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }

  tasks.push(newTask)
  addListItem(newTask)

  
})

const addListItem = (newTask: Task) => {
  const item = document.createElement('li')
  const checkbox = document.createElement('input')
  const removeButton = document.createElement('button')
  const label = document.createElement('label')

  removeButton.textContent = "Remove"

  checkbox.type = 'checkbox'
  checkbox.checked = newTask.completed

  checkbox.addEventListener("change", e => {
    newTask.completed = checkbox.checked
    console.log(tasks)
    newTask.completed ? label.style.cssText = "text-decoration: line-through;" : label.style.cssText = "text-decoration: none;"
  })
  
  removeButton.addEventListener('click', e => {
    list?.removeChild(item)
    tasks = tasks.filter(task => task.id !== newTask.id)
    console.log(tasks)
  })

  label.append(checkbox, newTask.title)
  item.append(label, removeButton)
  list?.append(item)

  input ? input.value = "" : null
}