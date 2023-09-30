import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import "monday-ui-style/dist/index.min.css";
import "monday-ui-react-core/tokens";
import './assets/styles/main.scss'


import { HomePage } from './pages/HomePage'
// import { store } from './store/store'

export function App() {

  return (
    // <Provider store={store}>
    <Router>
        <Routes>
          <Route element={<HomePage />} path="/" />

          {/* <Route element={<AboutUs />} path="/about" /> */}
          {/* <Route element={<CarIndex />} path="/car" />
              <Route element={<CarDetails />} path="/car/:carId" /> */}
        </Routes>
        {/* <AppFooter /> */}
    </Router>
    // </Provider>
  )
}