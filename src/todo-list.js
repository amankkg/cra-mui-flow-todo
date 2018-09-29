// @flow
import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import {
  createTodo,
  fetchTodos,
  saveTodos,
  wipeTodos,
  removeTodo,
  toggleTodo,
} from './facades'
import {TodoNew} from './todo-new'
import {TodoItem} from './todo-item'
import {DeleteAllButton} from './delete-all-button'
import type {Todo} from './types.flow.js'

type State = {|
  items: Array<Todo>,
|}

const byCreatedDesc = (a: Todo, b: Todo) =>
  b.created - a.created

class TodoList extends React.Component<{}, State> {
  state = {
    items: fetchTodos() || [],
  }

  addNext = (text: string) =>
    this.setState(
      state => ({
        items: [...state.items, createTodo(text)],
      }),
      () => saveTodos(this.state.items),
    )

  toggle = (id: string, done: boolean) =>
    this.setState(
      state => ({
        items: state.items.map(
          todo => (todo.id === id ? {...todo, done} : todo),
        ),
      }),
      () => toggleTodo(id),
    )

  remove = (id: string) =>
    this.setState(
      state => ({
        items: state.items.filter(todo => todo.id !== id),
      }),
      () => removeTodo(id),
    )

  clear = () => this.setState({items: []}, wipeTodos)

  render() {
    const {items} = this.state

    return (
      <React.Fragment>
        <br />
        <TodoNew add={this.addNext} />
        <List className="todo-list">
          {items.length > 1 && (
            <React.Fragment>
              <DeleteAllButton
                onClick={this.clear}
                total={items.length}
              />
              <br />
            </React.Fragment>
          )}
          {items.sort(byCreatedDesc).map(todo => (
            <ListItem key={todo.id} className="todo-item">
              <TodoItem
                todo={todo}
                toggle={this.toggle}
                remove={this.remove}
              />
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    )
  }
}

export {TodoList}
