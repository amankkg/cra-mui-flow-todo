// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import DeleteForever from '@material-ui/icons/DeleteForever'

import {
  uid,
  getTodos,
  saveTodos,
  wipeTodos,
  removeTodo,
  toggleTodo,
} from './todoFacades'

type Todo = {|
  id: number,
  text: string,
  checked: boolean,
|}

type State = {|
  todos: Array<Todo>,
  next: string,
|}

export default class TodoList extends React.Component<
  void,
  State,
> {
  state = {
    todos: getTodos() || [],
    next: '',
  }

  editNext = e =>
    this.setState({next: e.currentTarget.value})

  addNext = e => {
    e.preventDefault()

    this.setState(
      state => ({
        todos: [
          ...state.todos,
          {text: state.next, id: uid(), checked: false},
        ],
        next: '',
      }),
      () => saveTodos(this.state.todos),
    )
  }

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
        <form onSubmit={this.addNext}>
          <TextField
            value={this.state.next}
            onChange={this.editNext}
            label="anything else to do?..."
            margin="normal"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            add
          </Button>
        </form>
        <List>
          {this.state.todos.map(todo => (
            <ListItem key={todo.id}>
              <Checkbox
                checked={todo.checked}
                onClick={this.toggle(todo.id)}
              />
              &nbsp;
              {todo.text}
              &nbsp; &nbsp;
              <DeleteForever
                onClick={this.remove(todo.id)}
                color="error"
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
