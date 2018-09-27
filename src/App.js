// @flow
import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import TodoList from './todo-list'
import logo from './logo.svg'

class App extends React.Component<void, void> {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <header className="App-header">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
            />
            <h1 className="App-title">
              Welcome to demo app
            </h1>
          </header>
          <TodoList />
        </div>
      </React.Fragment>
    )
  }
}

export default App
