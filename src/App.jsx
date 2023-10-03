import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import { Provider } from 'react-redux'
// import './assets/style/main.css'
import "monday-ui-style/dist/index.min.css";
import "monday-ui-react-core/tokens";
import './assets/styles/main.scss'


import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex'
// import { store } from './store/store'

export function App() {

  return (
    // <Provider store={store}>
    <Router>
      <section className="main-layout app">
        {/* <AppHeader /> */}
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<BoardIndex />} path="/board" />
          {/* <Route element={<AboutUs />} path="/about" /> */}
          {/* <Route element={<CarIndex />} path="/car" />
              <Route element={<CarDetails />} path="/car/:carId" /> */}
        </Routes>
        {/* <AppFooter /> */}
      </section>
    </Router>
    // </Provider>
  )
}