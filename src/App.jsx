import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss"
import PrivateRoute from "./components/PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import PrivateRoute2 from "./components/PrivateRoute2";


const Layout = () => {
 
  
  return (
    <>
    <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "/post/:id",
        element:<Single/>
      },
      {
        path: "/write",
        element: <PrivateRoute> <Write/> </PrivateRoute>
      },
    ]
    
  },
  {
    path: "/register",
    element: <PrivateRoute2> <Register/> </PrivateRoute2>,
    
  },
  {
    path: "/login",
    element: <PrivateRoute2> <Login/> </PrivateRoute2>,
    
  },
  
  
]);

function App() {
  return (
  <div className="app">
    <div className="container">
    <RouterProvider router={router}/>

    </div>
    
  </div>
  );
}



export default App;
