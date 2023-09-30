import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'

import './index.css'
import Router from './config/Router.tsx'
import AppContextProvider from './context/AppContextProvider.tsx'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
    <ToastContainer />
    {/* <App /> */}
    <Router />
    </AppContextProvider>
  </React.StrictMode>,
)
