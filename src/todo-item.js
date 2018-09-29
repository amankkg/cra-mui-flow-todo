// @flow
import * as React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteForever from '@material-ui/icons/DeleteForever'

type Props = {|
  todo: {|
    id: string,
    created: number,
    text: string,
    done: boolean,
  |},
  toggle: (string, boolean) => void,
  remove: string => void,
|}

const TodoItem = (props: Props) => {
  const {todo, toggle, remove} = props

  return (
    <React.Fragment>
      <Checkbox
        checked={todo.done}
        onClick={e => toggle(todo.id, e.target.checked)}
      />
      &nbsp;
      <span
        onClick={() => toggle(todo.id, !todo.done)}
        className={`todo-text ${
          todo.done ? 'todo-text-done' : ''
        }`}
      >
        {todo.text}
      </span>
      &nbsp; &nbsp;
      <IconButton onClick={() => remove(todo.id)}>
        <DeleteForever color="secondary" />
      </IconButton>
    </React.Fragment>
  )
}

export {TodoItem}
