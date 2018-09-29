// @flow
import * as React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteForever from '@material-ui/icons/DeleteForever'

type Props = {|
  todo: {|text: string, checked: boolean|},
  toggle: () => void,
  remove: () => void,
|}

const TodoItem = ({todo, toggle, remove}): Props => {
  const todoClasses = `todo-text ${
    todo.checked ? 'todo-text-checked' : ''
  }`

  return (
    <React.Fragment>
      <Checkbox checked={todo.checked} onClick={toggle} />
      &nbsp;
      <span onClick={toggle} className={todoClasses}>
        {todo.text}
      </span>
      &nbsp; &nbsp;
      <IconButton onClick={remove}>
        <DeleteForever color="secondary" />
      </IconButton>
    </React.Fragment>
  )
}

export {TodoItem}
