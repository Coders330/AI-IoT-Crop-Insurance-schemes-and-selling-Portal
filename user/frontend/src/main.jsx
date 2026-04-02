import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';

import Record from './components/record.jsx';
const router = createBrowserRouter([
  {
     path:"/",
     element:<Dashboard></Dashboard>,
  },

  {
         path:"/",
         element: <App></App>,
         children:[
          
          {
          path:"/dashboard",
          element:<Dashboard></Dashboard>
  },
  {
          path:"/record/:id",
          element:<Record></Record>
  }
         ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>

    
  </React.StrictMode>,
)
