import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicio from "./component/inicio";
import Login from "./component/login";
import Admin from "./component/admin";
import Bodeguero from "./component/bodeguero";

const router= createBrowserRouter([
  {path: '/', element: <Inicio/>},
  {path: '/login', element: <Login/>},
  {path: '/admin', element: <Admin/>},
  {path: '/bodeguero', element: <Bodeguero/>}
]);


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
