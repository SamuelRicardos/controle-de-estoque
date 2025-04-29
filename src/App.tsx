import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Details from "./pages/details";
import Produtos from "./pages/produtos";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/produtos",
      element: <Produtos/>,
    },
    {
      path: "/details/:id",
      element: <Details/>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}