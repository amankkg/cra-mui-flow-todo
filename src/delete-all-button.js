// @flow
import * as React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import DeleteSweep from '@material-ui/icons/DeleteSweep'

type Props = {|
  total: number,
  onClick: () => void,
|}

const DeleteAllButton = (props: Props) => {
  const {total, onClick} = props

  return (
    <IconButton className="clear-button" onClick={onClick}>
      <Badge badgeContent={total} color="secondary">
        <DeleteSweep color="secondary" />
      </Badge>
    </IconButton>
  )
}

export {DeleteAllButton}
