// @flow
import 'typeface-roboto'
import * as React from 'react'
import {render} from 'react-dom'

import {App} from './app'
import * as sw from './service-worker'
import './index.css'

render(<App />, document.getElementById('root'))
sw.register()
