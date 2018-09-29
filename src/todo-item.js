// @flow
import * as React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteForever from '@material-ui/icons/DeleteForever'

type Props = {|
  todo: {|id: string, text: string, done: boolean|},
  toggle: () => void,
  remove: () => void,
|}

const TodoItem = ({todo, toggle, remove}): Props => {
  const todoClasses = `todo-text ${
    todo.done ? 'todo-text-done' : ''
  }`

  const onToggle = e => toggle(todo.id, e.target.checked)

  const onRemove = () => remove(todo.id)

  return (
    <React.Fragment>
      <Checkbox checked={todo.done} onClick={onToggle} />
      &nbsp;
      <span onClick={toggle} className={todoClasses}>
        {todo.text}
      </span>
      &nbsp; &nbsp;
      <IconButton onClick={onRemove}>
        <DeleteForever color="secondary" />
      </IconButton>
    </React.Fragment>
  )
}

export {TodoItem}
