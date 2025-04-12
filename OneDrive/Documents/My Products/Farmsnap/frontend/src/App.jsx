import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/FarmsnapApp/Navbar.jsx";
import Footer from "./pages/Footer";
import axios from "axios";
import summuryApi from "./common/summuryApi";
import { useEffect, useState } from "react";
import { setAllProduct } from "./redux/FarmsnapAppRedux/product/productSlice.js";
import { useDispatch } from "react-redux";
import WelcomeNote from "./components/FarmsnapApp/welcomeNote/WelcomeNote.jsx";
import { ToastContainer } from "react-toastify";
import Spinner from './components/FarmsnapApp/Spinner.jsx'
import { useAuthStore } from "./zustandStateManagement/useAuthStore.js";


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  const [note, setNote] = useState(() => {
    const storeNote = localStorage.getItem("welcomenote");
    return storeNote ? false : true;
  });

  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // useEffect(()=>{

  // },[authUser])

  useEffect(() => {
    const timer = setTimeout(() => {
      setNote(false);
      localStorage.setItem("welcomenote", "true");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getAllProducts = async () => {
    const response = await axios.get(summuryApi.getAllProducts, {
      withCredentials: true,
    });
    if (response.data) {
      dispatch(setAllProduct(response?.data?.data));
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      {!authUser && isCheckingAuth ? (
        <div className="flex items-center justify-center h-screen">

          <Spinner text={"Please wait, loading..."}/>
        </div>
      ) : note ? (
        <WelcomeNote />
      ) : (
        <>
          {!location.pathname.includes("search") &&
            !location.pathname.includes("chat") && <Navbar />}
          <div className="">
            <ToastContainer />
            <Outlet />
          </div>
          {location.pathname.startsWith("/") &&
            !location.pathname.includes("chat") &&
            !location.pathname.includes("search") &&
            !location.pathname.includes("login") &&
            !location.pathname.includes("register") &&
            !location.pathname.includes("admin-pannel") && <Footer />}
        </>
      )}
    </div>
  );
}


export default App;
