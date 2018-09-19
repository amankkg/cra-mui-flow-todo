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
import NewItemForm from './NewItemForm'
import TodoItem from './TodoItem'

type Todo = {|
  id: number,
  text: string,
  checked: boolean,
|}

type State = {|
  todos: Array<Todo>,
|}

export default class TodoList extends React.Component<
  void,
  State,
> {
  state = {
    todos: getTodos() || [],
  }

  addNext = text =>
    this.setState(
      state => ({
        todos: [
          ...state.todos,
          {id: uid(), checked: false, text},
        ],
        next: '',
      }),
      () => saveTodos(this.state.todos),
    )

  toggle = id => () =>
    this.setState(
      state => ({
        todos: state.todos.map(
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
        todos: state.todos.filter(todo => todo.id !== id),
      }),
      () => removeTodo(id),
    )

  clear = () => this.setState({todos: []}, wipeTodos)

  render() {
    return (
      <React.Fragment>
        <br />
        <NewItemForm add={this.addNext} />
        <List>
          {this.state.todos.map(todo => (
            <ListItem key={todo.id}>
              <TodoItem
                todo={todo}
                toggle={this.toggle(todo.id)}
                remove={this.remove(todo.id)}
              />
            </ListItem>
          ))}
        </List>
        <Button
          onClick={this.clear}
          variant="contained"
          color="secondary"
        >
          clear
        </Button>
      </React.Fragment>
    )
  }
}
