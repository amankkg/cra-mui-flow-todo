// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

type Todo = {|
  id: number,
  text: string,
|}

type State = {|
  todos: Array<Todo>,
  next: string,
|}

let uniqueId = 0
const uid = () => uniqueId++

export default class TodoList extends React.Component<
  void,
  State,
> {
  state = {
    todos: [],
    next: '',
  }

  editNext = e => this.setState({next: e.target.value})

  addNext = e =>
    e.preventDefault() ||
    this.setState(
      state => ({
        todos: [
          ...state.todos,
          {text: state.next, id: uid()},
        ],
        next: '',
      }),
      () => localStorage.setItem('todos', this.state.todos),
    )

  clear = () =>
    this.setState({todos: []}, () =>
      localStorage.removeItem('todos'),
    )

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
            <ListItem key={todo.id}>- {todo.text}</ListItem>
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
