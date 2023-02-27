import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Dashboard from './pages/Dashboard'
import Admin  from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import Room from './pages/Room'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'



const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' element={<App />}></Route>,
    <Route path='/home' element={<Dashboard />}></Route>,
    <Route path='/admin/panel' element={<Admin />}></Route>,
    <Route path='/admin/login' element={<AdminLogin />}></Route>,
    <Route path='/room/:id' element={<Room />}></Route>
  ])
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <App />
  <RouterProvider router={router} />
  // </React.StrictMode>,
)
