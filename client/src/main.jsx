import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Client from './pages/Client';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Patient from './pages/Patient';
import Drug from './pages/Drug';
import Error from './pages/Error';
import Landing from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: '/home',
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/drug',
        element: <Drug />
      }, {
        path: '/clients/:id',
        element: <Client />
      }, {
        path: '/patients/:id',
        element: <Patient />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />
)
