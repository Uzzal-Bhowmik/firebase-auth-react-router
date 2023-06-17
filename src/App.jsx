import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import RegisterReactBootstrap from './components/RegisterReactBootstrap';
import Main from './layout/Main';
import LoginReactBootstrap from './components/LoginReactBootstrap';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <RegisterReactBootstrap />
      },
      {
        path: "/login",
        element: <LoginReactBootstrap></LoginReactBootstrap>
      },
      {
        path: "/register",
        element: <RegisterReactBootstrap />
      },
    ]

  }
])

function App() {
  return (

    <div className='app'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
