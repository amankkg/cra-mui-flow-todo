// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default class NewItemForm extends React.Component<
  {|add: String => void|},
  {|value: String|},
> {
  state = {value: ''}

  edit = e => this.setState({value: e.currentTarget.value})

  submit = e => {
    e.preventDefault()

    this.props.add(this.state.value.trim())
    this.setState({value: ''})
  }

  render() {
    const {value} = this.state

    return (
      <form onSubmit={this.submit}>
        <TextField
          value={value}
          onChange={this.edit}
          label="anything else to do?..."
          margin="normal"
        />
        &nbsp;
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={value.trim().length === 0}
        >
          add
        </Button>
      </form>
    )
  }
}
