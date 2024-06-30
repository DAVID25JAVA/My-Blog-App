import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Pages/Login.jsx";
import { store } from "./reduxStore/store.js";
import { Provider } from "react-redux";
import Home from "./components/Pages/Home.jsx";
import AllPost from "./components/Pages/AllPost.jsx";
import AddPost from "./components/Pages/AddPost.jsx";
import AuthLayout from './components/AuthLayout.jsx'
import Signup from "./components/Pages/Signup.jsx";
import EditPost from "./components/Pages/EditPost.jsx";
import Post from "./components/Pages/Post.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
            </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route
        path="/allpost"
        element={
          <AuthLayout authentication>
            <AllPost />
          </AuthLayout>
        }
      />
      <Route
        path="/addpost"
        element={
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="/editpost/:slug"
        element={
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        }
      />
      <Route
        path="/post/:slug"
        element={
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
