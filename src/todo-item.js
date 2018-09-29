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

  const clickCheckbox = e =>
    toggle(todo.id, e.target.checked)
  const clickText = () => toggle(todo.id, !todo.done)
  const onRemove = () => remove(todo.id)

  return (
    <React.Fragment>
      <Checkbox
        checked={todo.done}
        onClick={clickCheckbox}
      />
      &nbsp;
      <span onClick={clickText} className={todoClasses}>
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
