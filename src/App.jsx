import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import "monday-ui-style/dist/index.min.css"
import "monday-ui-react-core/tokens"
import './assets/styles/main.scss'
import { boardService } from './services/board.service.local'

import { HomePage } from './pages/HomePage'
import { LoginSignUp } from './pages/LoginSingup'
import { BoardDetails } from './pages/BoardDetails'
import { TaskDetails } from './cmps/TaskDetails'
import { PageNotFound } from './pages/PageNotFound'
import { BoardIndex } from './pages/BoardIndex'
import { store } from './store/store'
import { TestCmp } from './pages/TestCmp'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<TestCmp />} path="/test" />
          <Route element={<BoardIndex />} path="/board" /> {/* TODO: add board index page */}
          <Route element={<BoardDetails />} path="board/:boardId">
            <Route element={<TaskDetails />} path='group/:groupId/task/:taskId' />
            {/* <Route element={<ActivityLog />} path='activityLog' /> */}
          </Route>
          <Route element={<BoardIndex />} path="/board" />

          <Route path="/auth">
            <Route path="login" element={<LoginSignUp />} />
            <Route path="sign-up" element={<LoginSignUp />} />
          </Route>
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </Provider>
  )
}