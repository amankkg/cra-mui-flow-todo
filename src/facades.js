// @flow
import nanoId from 'nanoid'

export const getId = () => nanoId()

export const getTimestamp = () => Date.now()

export const getTodos = () =>
  JSON.parse(localStorage.getItem('todos'))

export const saveTodos = todos =>
  localStorage.setItem('todos', JSON.stringify(todos))

export const wipeTodos = () =>
  localStorage.removeItem('todos')

export const toggleTodo = id =>
  saveTodos(
    getTodos().map(
      todo =>
        todo.id === id ? {...todo, done: !todo.done} : todo,
    ),
  )

export const removeTodo = id =>
  saveTodos(getTodos().filter(todo => todo.id !== id))
