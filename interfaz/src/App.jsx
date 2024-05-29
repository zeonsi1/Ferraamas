import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicio from "./component/inicio";
import Login from "./component/login";
import Admin from "./component/admin";
import Bodeguero from "./component/bodeguero";
import Pagar from "./component/pagar";
import Register from "./component/register";

const router= createBrowserRouter([
  {path: '/', element: <Inicio/>},
  {path: '/login', element: <Login/>},
  {path: '/admin', element: <Admin/>},
  {path: '/bodeguero', element: <Bodeguero/>},
  {path: '/pagar', element: <Pagar/>},
  {path: '/register', element: <Register/>}
]);


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
