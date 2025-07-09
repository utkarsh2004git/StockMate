import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import App from "../App";


const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Landing/>
            }
        ]
    }

]);

export default router;