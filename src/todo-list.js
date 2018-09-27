// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import {
  uid,
  getTodos,
  saveTodos,
  wipeTodos,
  removeTodo,
  toggleTodo,
} from './todoFacades'
import NewItemForm from './new-item-form'
import TodoItem from './todo-item'

type Todo = {|
  id: number,
  text: string,
  checked: boolean,
|}

type State = {|
  items: Array<Todo>,
|}

export default class TodoList extends React.Component<
  void,
  State,
> {
  state = {
    items: getTodos() || [],
  }

  addNext = text =>
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
        <NewItemForm add={this.addNext} />
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
        </List>
        {items.length > 0 && (
          <Button
            onClick={this.clear}
            variant="contained"
            color="secondary"
          >
            clear
          </Button>
        )}
      </React.Fragment>
    )
  }
}
