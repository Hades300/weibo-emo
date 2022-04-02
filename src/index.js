import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { StateProvider } from "./reducer"
import ReactModal from "react-modal"

ReactModal.setAppElement('#root')

ReactDOM.render(
  <BrowserRouter>
    <StateProvider>
      <App />
    </StateProvider>
  </BrowserRouter>
, document.getElementById('root'))