import { 
  createBrowserRouter,
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom';

import RootLayout from './components/RootLayout.jsx';
import './App.css';

// Pages
import Home from './pages/Home.jsx';
import PlantDetect from './pages/PlantDetect.jsx';
import PlantInfo from './pages/PlantInfo.jsx';
import ContactUs from './pages/ContactUs.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Explore from './pages/Explore.jsx';
import Quiz from './pages/Quiz.jsx';
import AddPlant from './components/AddPlant.jsx';

// Components
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PlantInfo3D from './components/PlantInfo3D.jsx';

// Context
import { AuthProvider } from './context/AuthContext.jsx';

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