// @flow
import nanoId from 'nanoid'

export const createTodo = text => ({
  id: nanoId(),
  created: Date.now(),
  done: false,
  text,
})

export const fetchTodos = () =>
  JSON.parse(localStorage.getItem('todos'))

export const saveTodos = todos =>
  localStorage.setItem('todos', JSON.stringify(todos))

export const wipeTodos = () =>
  localStorage.removeItem('todos')

export const toggleTodo = id =>
  saveTodos(
    fetchTodos().map(
      todo =>
        todo.id === id ? {...todo, done: !todo.done} : todo,
    ),
  )

export const removeTodo = id =>
  saveTodos(fetchTodos().filter(todo => todo.id !== id))
