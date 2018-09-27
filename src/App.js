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
        <div className="app">
          <header className="app-header">
            <img
              src={logo}
              className="app-logo"
              alt="logo"
            />
            <h1 className="app-title">
              Welcome to demo app
            </h1>
          </header>
          <div className="app-body">
            <TodoList />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App
