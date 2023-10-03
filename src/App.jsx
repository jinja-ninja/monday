import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import "monday-ui-style/dist/index.min.css";
import "monday-ui-react-core/tokens";
import './assets/styles/main.scss'


import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex'
import { LoginSignUp } from './pages/LoginSingup';
// import { store } from './store/store'

export function App() {

  return (
    // <Provider store={store}>
    <Router>
      <Routes>
        <Route element={<HomePage />} path="/" />

        <Route path="/auth">
          <Route path="login" element={<LoginSignUp />} />
          <Route path="sign-up" element={<LoginSignUp />} />
        </Route>
        <Route element={<BoardIndex />} path="/board" />
      </Routes>
    </Router>
    // </Provider>
  )
}