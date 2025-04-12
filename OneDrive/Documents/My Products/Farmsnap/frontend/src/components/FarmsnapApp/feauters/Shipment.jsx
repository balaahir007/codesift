import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { assets, shipemnt as initialData } from "../../../assets/assets";
import AddShipment from "./AddShipment";

const Shipment = () => {
    const [available, setAvailable] = useState("");
    const [searchText, setSearchText] = useState("");
    const [shipmentData, setShipmentData] = useState(initialData);
    const [showShipmentAddForm,setShowShipmentAddForm] = useState(false)

    const handleAvailableBtn = (e) => {
        setAvailable(e.target.value);

    };

    const setFilterDataWithUserInput = () => {
        const filterData = initialData.filter((item) =>
            (available === "" || item.available.toLowerCase() === available) &&
            (searchText === "" || item.category.toLowerCase().includes(searchText) || item.location.toLowerCase().includes(searchText))
        );
        setShipmentData(filterData);
    };

    const handleSearchBox = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };
    const handleClickAvailable = (e)=>{
      setAvailable(prev => (prev === available ? '' : e.target.value))
    }

    useEffect(() => {
        setFilterDataWithUserInput();
    }, [searchText, available]);

    return (
        <div className="lg:px-15 px-4">
                <div className="flex items-center justify-between px-4">
                    <h1 className="border-b-primary border-b-1 text-sm font-bold pb-1">
                        Our Shipment Partners
                    </h1>
                    <button className="border p-2 text-[8px] font-bold rounded-full cursor-pointer hover:bg-primary  hover:text-white" onClick={()=>setShowShipmentAddForm(prev => !prev)}>
                        Add Your Shipment
                    </button>
                </div>
            {
              showShipmentAddForm ? (
                <div>
                  <AddShipment setShowShipmentAddForm={setShowShipmentAddForm}/>

                </div>
              ) : (
                <div>
                <div className="flex items-center justify-between mt-2">
                    <div className="searchBoxDiv w-60">
                        <input
                            type="text"
                            className="searchBox"
                            onChange={handleSearchBox}
                            value={searchText}
                            placeholder="Location or Vehicle"
                        />
                        <CgSearch className="searchIcon" />
                    </div>
                    <div className="flex flex-col items-center text-xs">
                        <span>Available</span>
                        <div className="flex flex-col items-start mx-1 mt-1 text-xs text-center">
                            <div className="flex items-center gap-4">
                                <label htmlFor="yes" className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        id="yes"
                                        name="shipment"
                                        onChange={handleAvailableBtn}
                                        onClick={handleClickAvailable}
                                        checked={available === "yes"}
                                        value="yes"
                                        className="peer hidden"
                                    />
                                    Yes
                                    <div className="custom-radio-btn" />
                                </label>
                                <label htmlFor="no" className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        id="no"
                                        checked={available === "no"}
                                        name="shipment"
                                        onChange={handleAvailableBtn}
                                        onClick={handleClickAvailable}
                                        value="no"
                                        className="peer hidden"
                                    />
                                    No
                                    <div className="custom-radio-btn" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="text-sm mt-4">Find Out the best shipment partners</h1>
                <div className="w-full mt-2 mb-6 h-130 overflow-y-scroll scrollbar-hide overflow-x-auto">
                    <table className="w-full border border-gray-300 text-left">
                        <thead className="bg-[#C7EDCD] text-gray-700 ">
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-2">Location</th>
                                <th className="px-4 py-2">Vehicle</th>
                                <th className="px-4 py-2">Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipmentData.map((item, index) => (
                                <tr key={index} className="text-xs border-y border-gray-500">
                                    <td className="px-4 py-2">{item.location}</td>
                                    <td className="px-4 py-2">{item.category}</td>
                                    <td className="px-10 py-2">
                                        {item.available.toLowerCase() === "yes" ? (
                                            <img src={assets.availableIcon} alt="Available" className="size-4" />
                                        ) : (
                                            <img src={assets.unAvailableIcon} alt="Unavailable" className="size-4" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
              )
            }
        </div>
    );
};

export default Shipment;
