import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import { UserContextProvider } from "./hooks/UserContext";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Places from "./pages/Places";
import Register from "./pages/Register";
import PlacesForm from "./pages/PlacesForm";
import Place from "./pages/Place";
// import Bookings from "./pages/Bookings";

axios.defaults.baseURL = "http://localhost:4000/api/v1";
// axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/account/places" element={<Places />} />
            <Route path="/account/places/new" element={<PlacesForm />} />
            <Route path="/account/places/:id" element={<PlacesForm />} />
            <Route path="/place/:id" element={<Place/>} />
            {/* <Route path="/account/bookings" element={<Bookings />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
