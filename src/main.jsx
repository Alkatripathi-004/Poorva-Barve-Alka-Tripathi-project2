import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import './assets/common.css' // Import your global stylesheet

// This is the standard setup for a modern React application.
// It finds the HTML element with the id 'root' in your public/index.html file
// and injects your entire React application into it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)