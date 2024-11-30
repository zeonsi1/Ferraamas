import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicio from "./component/inicio";
import Login from "./component/login";
import Admin from "./component/admin";
import Bodeguero from "./component/bodeguero";
import Register from "./component/register";
import Contador from "./component/contador";
import Result from "./component/result";
import ProtectedRoute from "./service/ProtectedRoute";

const router= createBrowserRouter([
  {path: '/', element: <Inicio/>},
  {path: '/login', element: <Login/>},
  {path: '/admin', element: <ProtectedRoute><Admin/></ProtectedRoute>},
  {path: '/bodeguero', element: <ProtectedRoute><Bodeguero/></ProtectedRoute>},
  {path: '/register', element: <ProtectedRoute><Register/></ProtectedRoute>},
  {path: '/contador', element: <ProtectedRoute><Contador/></ProtectedRoute>},
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
