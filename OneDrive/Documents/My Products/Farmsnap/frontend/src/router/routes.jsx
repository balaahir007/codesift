import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../components/FarmsnapApp/auth/Login";
import Register from "../components/FarmsnapApp/auth/Register";
import MyProfile from "../components/FarmsnapApp/MyProfile";
import OurFarmers from "../components/FarmsnapApp/feauters/OurFarmers";
import BecomeaSeller from "../components/FarmsnapApp/feauters/BecomeaSeller";
import Shipment from "../components/FarmsnapApp/feauters/Shipment";
import Services from "../components/FarmsnapApp/Services";
import Admin_Home from "../components/FarmsnapApp/Admin/Admin_Home";
import AdminUsers from "../components/FarmsnapApp/Admin/AdminUsers";
import AdminStats from "../components/FarmsnapApp/Admin/AdminStats";
import AdminProducts from "../components/FarmsnapApp/Admin/AdminProducts";
import ProductDetails from "../components/FarmsnapApp/ProductDetails";
import Cart from "../components/FarmsnapApp/feauters/Cart";
import HomeSearchHover from "../components/FarmsnapApp/HomeSearchHover";
import SearchProductsDisplay from "../components/FarmsnapApp/SearchProductsDisplay";
import SearchFilter from "../components/FarmsnapApp/SearchFilter";
import ChatAppHome from "../components/FarmsnapChatApp/ChatAppHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "our-farmers",
        element: <OurFarmers />,
      },
      {
        path: "become-a-seller",
        element: <BecomeaSeller />,
      },
      {
        path: "searchsuggestion",
        element: <HomeSearchHover />,
      },
      {
        path: "search/:product?",
        element: <SearchProductsDisplay />,
      },      
      {
        path: "shipment",
        element: <Shipment />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "admin-pannel",
        element: <Admin_Home />,
        children: [
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            path: "stats",
            element: <AdminStats />,
          },
        ],
      },
      {
        path : '/chat',
        element : <ChatAppHome/>
      }
    ],
  },
]);

export default router;
