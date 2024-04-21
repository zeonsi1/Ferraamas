import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicio from "./templates/inicio/inicio";
import Login from "./templates/iniciar sesión/login";

const router= createBrowserRouter([
  {path: '/', element: <Inicio/>},
  {path: '/login', element: <Login/>}
]);


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
