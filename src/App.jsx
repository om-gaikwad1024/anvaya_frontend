import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "../RootLayout";
import "./App.css";

// Pages
import Home from "./pages/Home";
import PlantDetect from "./pages/PlantDetect";
import PlantInfo from "./pages/PlantInfo";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Explore from "./pages/Explore";
import Quiz from "./pages/Quiz";
import AddPlant from "./components/AddPlant";

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import PlantInfo3D from "./components/PlantInfo3D";

// Context
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plantdetect" element={<PlantDetect />} />
        <Route path="/plantinfo" element={<PlantInfo />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/plantinfo3d" element={<PlantInfo3D />} />
        <Route path="/addplant" element={<AddPlant />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/explore" element={<Explore />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
