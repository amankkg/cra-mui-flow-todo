// @flow
import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import DeleteSweep from '@material-ui/icons/DeleteSweep'

import {
  uid,
  getTodos,
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
  checked: boolean,
|}

type State = {|
  items: Array<Todo>,
|}

class TodoList extends React.Component<void, State> {
  state = {
    items: getTodos() || [],
  }

  addNext = (text: string) =>
    this.setState(
      state => ({
        items: [
          ...state.items,
          {id: uid(), checked: false, text},
        ],
        next: '',
      }),
      () => saveTodos(this.state.items),
    )

  toggle = id => () =>
    this.setState(
      state => ({
        items: state.items.map(
          todo =>
            todo.id === id
              ? {...todo, checked: !todo.checked}
              : todo,
        ),
      }),
      () => toggleTodo(id),
    )

  remove = id => () =>
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
          {items.map(todo => (
            <ListItem key={todo.id} className="todo-item">
              <TodoItem
                todo={todo}
                toggle={this.toggle(todo.id)}
                remove={this.remove(todo.id)}
              />
            </ListItem>
          ))}
          <br />
          {items.length > 0 && (
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
        </List>
      </React.Fragment>
    )
  }
}

export {TodoList}
