import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import router from './router'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Toaster />
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </React.StrictMode>
)
