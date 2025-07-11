import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/home"; // Make sure L is capitalized
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/landing";

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
                path: "/shop/:shopId",
                element: <Home />, 
            },
            {
                path: "/dashboard",
                element: <Dashboard />, 
            },
        ],
    },
]);

export default router;
