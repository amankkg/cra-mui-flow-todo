// @flow
import * as React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
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
    {todo.text}
    &nbsp; &nbsp;
    <DeleteForever onClick={remove} color="error" />
  </React.Fragment>
)
