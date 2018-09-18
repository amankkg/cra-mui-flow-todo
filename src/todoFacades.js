// @flow
import nanoid from 'nanoid'

export const uid = () => nanoid()

export const getTodos = () =>
  JSON.parse(localStorage.getItem('todos'))

export const saveTodos = todos =>
  localStorage.setItem('todos', JSON.stringify(todos))

export const wipeTodos = () =>
  localStorage.removeItem('todos')

export const removeTodo = id =>
  saveTodos(getTodos().filter(todo => todo.id !== id))
