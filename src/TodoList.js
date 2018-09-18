// @flow
import * as React from 'react'
import {
  Button,
  Checkbox,
  List,
  ListItem,
  TextField,
} from '@material-ui/core'

import {
  uid,
  getTodos,
  saveTodos,
  wipeTodos,
  removeTodo,
} from './todoFacades'

type Todo = {|
  id: number,
  text: string,
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
          {text: state.next, id: uid()},
        ],
        next: '',
      }),
      () => saveTodos(this.state.todos),
    )
  }

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
              <Checkbox title="WIP" disabled />{' '}
              <span onClick={this.remove(todo.id)}>
                {todo.text}
              </span>
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
