// @flow
import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import TodoList from './TodoList'
import logo from './logo.svg'
import './App.css'

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
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <TodoList />
        </div>
      </React.Fragment>
    )
  }
}

export default App
