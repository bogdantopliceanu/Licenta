import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home/Home";
import axios from "axios"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddDestination from "./pages/addDestination/AddDestination";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import Recommendations from "./pages/recommendations/Recommendations";
import TopDestinations from "./pages/top/TopDestinations";
import { ShowOnAdminLogin } from "./components/protect/HiddenLiks";


axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()  //verificam starea curenta a autentificarii 
      dispatch(SET_LOGIN(status))    //salvam stautsul prin SET_LOGIN
    }
    loginStatus()
  }, [dispatch])    //se activeaza use Effect-ul si schimba statusul de fiecare data cand valoarea variabilei "dispatch" se schimba

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
        }/>
        <Route path="/add-destination" element={
          <Sidebar>
            <ShowOnAdminLogin>
            <Layout>
              <AddDestination/>
            </Layout>
            </ShowOnAdminLogin>
          </Sidebar>
        }/>

        <Route path="/profile" element={
          <Sidebar>
            <Layout>
              <Profile />
            </Layout>
          </Sidebar>
        }/>

        <Route path="/edit-profile" element={
          <Sidebar>
            <Layout>
              <EditProfile />
            </Layout>
          </Sidebar>
        }/>

        <Route path="/contactus" element={
          <Sidebar>
            <Layout>
              <Contact />
            </Layout>
          </Sidebar>
        }/>

        <Route path="/recommendation" element={
          <Sidebar>
            <Layout>
              <Recommendations/>
            </Layout>
          </Sidebar>
        }/>

        <Route path="/top-destinations" element={
          <Sidebar>
            <Layout>
              <TopDestinations/>
            </Layout>
          </Sidebar>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;