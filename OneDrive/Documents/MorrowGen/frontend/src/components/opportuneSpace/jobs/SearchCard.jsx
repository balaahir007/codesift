import { useEffect, useRef, useState } from 'react';
import { IoLocationOutline, IoSearchSharp } from 'react-icons/io5';

const SearchCard = ({ setSearchMenuOpen, searchMenuOpen }) => {
    const searchRef = useRef(null); // ref to detect outside click

    const [hasScrolled, setHasScrolled] = useState(false);

    // Close SearchCard when user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchMenuOpen(false);
            }
        };

        if (searchMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchMenuOpen, setSearchMenuOpen]);

    // Optional: apply shadow when scrolled
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 15);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={searchRef}
            className={`min-w-full bg-white z-40 top-0 sm:px-6 md:px-8 -2 transition-shadow duration-300 ${hasScrolled ? "shadow-md" : ""
                }`}
        >
            <div className="z-50 flex flex-col gap-4 rounded-2xl max-w-4xl mx-auto p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full">
                        <IoSearchSharp className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-600 text-xl" />
                        <input
                            type="text"
                            placeholder="Search jobs, keywords..."
                            className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="relative w-full">
                        <IoLocationOutline className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Location (e.g., Chennai)"
                            className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="w-full md:w-auto">
                        <button className="w-full bg-primary text-nowrap text-white px-6 py-2 rounded-xl font-semibold hover:bg-secondary transition">
                            Find Jobs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
