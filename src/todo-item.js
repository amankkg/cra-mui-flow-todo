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

export default ({todo, toggle, remove}): Props => (
  <React.Fragment>
    <Checkbox checked={todo.checked} onClick={toggle} />
    &nbsp;
    <span
      onClick={toggle}
      className={`todo-text ${
        todo.checked ? 'todo-text-checked' : ''
      }`}
    >
      {todo.text}
    </span>
    &nbsp; &nbsp;
    <IconButton onClick={remove}>
      <DeleteForever color="secondary" />
    </IconButton>
  </React.Fragment>
)
