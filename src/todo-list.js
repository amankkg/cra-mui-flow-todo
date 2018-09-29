// @flow
import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import DeleteSweep from '@material-ui/icons/DeleteSweep'

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

type Todo = {|
  id: string,
  text: string,
  done: boolean,
|}

type State = {|
  items: Array<Todo>,
|}

const byCreated = (a, b) => b.created - a.created

class TodoList extends React.Component<void, State> {
  state = {
    items: fetchTodos() || [],
  }

  addNext = text =>
    this.setState(
      state => ({
        items: [...state.items, createTodo(text)],
        next: '',
      }),
      () => saveTodos(this.state.items),
    )

  toggle = (id, done) =>
    this.setState(
      state => ({
        items: state.items.map(
          todo => (todo.id === id ? {...todo, done} : todo),
        ),
      }),
      () => toggleTodo(id),
    )

  remove = id =>
    this.setState(
      state => ({
        items: state.items.filter(todo => todo.id !== id),
      }),
      () => removeTodo(id),
    )

  clear = () => this.setState({items: []}, wipeTodos)

  render() {
    const {items} = this.state
    const showClearAll = items.length > 1
    const ordered = items.sort(byCreated)

    return (
      <React.Fragment>
        <br />
        <TodoNew add={this.addNext} />
        <List className="todo-list">
          {showClearAll && (
            <IconButton
              className="clear-button"
              onClick={this.clear}
            >
              <Badge
                badgeContent={items.length}
                color="secondary"
              >
                <DeleteSweep color="secondary" />
              </Badge>
            </IconButton>
          )}
          {showClearAll && <br />}
          {ordered.map(todo => (
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
