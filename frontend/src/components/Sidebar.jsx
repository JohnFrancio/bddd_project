
import { useState } from 'react';
import { FaHome, FaList } from "react-icons/fa";
import { BsDatabaseAdd } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors "
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 z-50 w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                <nav>
                    <ul className="flex flex-col items-center p-4">
                        <li className="my-2 w-full">
                            <NavLink
                                to="/"
                                // className="flex items-center justify-start space-x-5 py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                                className={({ isActive }) =>
                                    `flex items-center justify-start space-x-5 py-2 px-4 rounded transition-colors relative ${isActive ? 'after:absolute after:content-[""] after:w-8 after:h-[2px] after:bg-white after:bottom-0 after:left-18' : 'hover:bg-gray-700'
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                <FaHome className="text-xl" />
                                <span>
                                    ACCEUIL
                                </span>
                            </NavLink>
                        </li>
                        <li className="my-2 w-full">
                            <NavLink
                                to="/insert"
                                // className="flex items-center justify-start space-x-5 py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                                className={({ isActive }) =>
                                    `flex items-center justify-start space-x-5 py-2 px-4 rounded transition-colors relative ${isActive ? 'after:absolute after:content-[""] after:w-8 after:h-[2px] after:bg-white after:bottom-0 after:left-19' : 'hover:bg-gray-700'
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                <BsDatabaseAdd className="text-xl" />
                                <span>INSERTION</span>
                            </NavLink>
                        </li>
                        <li className="my-2 w-full">
                            <NavLink
                                to="/list"
                                // className="flex items-center justify-start space-x-5 py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                                className={({ isActive }) =>
                                    `flex items-center justify-start space-x-5 py-2 px-4 rounded transition-colors relative ${isActive ? 'after:absolute after:content-[""] after:w-8 after:h-[2px] after:bg-white after:bottom-0 after:left-23' : 'hover:bg-gray-700'
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                <FaList className="text-xl" />
                                <span>LISTES TABLES</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden fixed inset-0 bg-transparent bg-opacity-50 z-40"
                />
            )}
        </>
    );
};

export default Sidebar;