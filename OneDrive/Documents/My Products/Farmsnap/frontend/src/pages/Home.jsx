import React from "react";
import Banner from "../components/FarmsnapApp/Banner";
import ProductsList from "../components/FarmsnapApp/ProductsList";
import { MdOutlineExpandMore } from "react-icons/md";
import ChatBot from "../components/FarmsnapApp/ChatBot/ChatBot";
import TopPicksByFarmer from "../components/FarmsnapApp/TopPicksByFarmer";
import Services from "../components/FarmsnapApp/Services";


const Home = () => {
  return (
    <div>
      <Banner />
      <div className="mt-6">
      <ProductsList/>
      <ProductsList />
      </div>
      <TopPicksByFarmer heading={'Top Agricultural Picks by FarmSnap'}/>   
      <ChatBot/>
    </div>
  );
};

export default Home;
