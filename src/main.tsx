import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Bar from './components/bar/Bar';
import LoginForm from './components/content/LoginForm';
import Profile from './components/content/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Bar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <LoginForm />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
