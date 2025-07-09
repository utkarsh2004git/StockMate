import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Home from "../pages/home"; // Make sure L is capitalized
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/home",
                element: <Home />, 
            },
        ],
    },
]);

export default router;
