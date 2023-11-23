import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { userContextProvider } from './store/context.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <userContextProvider>
    <App />
  </userContextProvider>
)
