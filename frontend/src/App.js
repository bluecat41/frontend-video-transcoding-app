import './App.css';

import * as React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

// Pages
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ErrorPage from "./pages/ErrorPage.js";
import UserPage from "./pages/User.js";
import UploadPage from "./pages/UploadPage.js";

// Components
import RootLayout from './components/RootLayout';

// Creating browser router to display all routes using React Router module
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="user" element={<UserPage userId="1"/>} />
      <Route path="upload" element={<UploadPage />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

