import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/cars",
    exact: false,
    main: () => <Register />,
  },
  {
    path: "/login",
    exact: false,
    main: () => <Login />,
  },
  {
    path: "*",
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
