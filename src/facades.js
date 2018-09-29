// @flow
import nanoId from 'nanoid'

import type {Todo} from './types.flow.js'

export const createTodo = (text: string) => ({
  id: nanoId(),
  created: Date.now(),
  done: false,
  text,
})

export const fetchTodos = () => {
  const value = localStorage.getItem('todos')
  return value ? JSON.parse(value) : undefined
}

export const saveTodos = (todos: Array<Todo>) =>
  localStorage.setItem('todos', JSON.stringify(todos))

export const wipeTodos = () =>
  localStorage.removeItem('todos')

export const toggleTodo = (id: string) => {
  const todos = fetchTodos()
  if (todos)
    saveTodos(
      todos.map(
        todo =>
          todo.id === id
            ? {...todo, done: !todo.done}
            : todo,
      ),
    )
}

export const removeTodo = (id: string) => {
  const todos = fetchTodos()
  if (todos) saveTodos(todos.filter(todo => todo.id !== id))
}
