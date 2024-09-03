import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormsView from "../components/forms/FormsView";
import Signup from "../components/forms/Signup";
import Sign from "../components/forms/Sign";
import Home from "../pages/Home";
import MainView from "../components/mainview/MainView";
import { UserContextProvider } from "../context/userContext";
import PerfilView from "../components/user/PerfilView";
import ProtectedRoute from "../utils/ProtectedRoute";
import "./app.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <MainView />,
        children: [
          {
            path: "/tg/:tag",
            element: <MainView />,
          },
          {
            path: "/query/:query",
            element: <MainView />,
          },
        ],
      },
      {
        path: "/perfil/:username",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <PerfilView />,
          },
        ],
      },
    ],
  },
  {
    path: "/forms",
    element: <FormsView />,
    children: [
      { path: "sign/", element: <Sign /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
