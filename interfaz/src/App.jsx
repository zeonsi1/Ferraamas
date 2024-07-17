import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicio from "./component/inicio";
import Login from "./component/login";
import Admin from "./component/admin";
import Bodeguero from "./component/bodeguero";
import Register from "./component/register";
import Contador from "./component/contador";
import Result from "./component/result";

const router= createBrowserRouter([
  {path: '/', element: <Inicio/>},
  {path: '/login', element: <Login/>},
  {path: '/admin', element: <Admin/>},
  {path: '/bodeguero', element: <Bodeguero/>},
  {path: '/register', element: <Register/>},
  {path: '/contador', element: <Contador/>},
  {path: '/result', element: <Result/>},
  {path: '*', element: <h1>404</h1>}
]);


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
