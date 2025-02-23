import { FaHome, FaList } from "react-icons/fa";
import { BsDatabaseAdd } from "react-icons/bs";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white">
            <nav>
                <ul className="flex flex-col items-center p-4">
                    <li className="my-2 w-full">
                        <NavLink to="/" className="flex items-center justify-start space-x-5 py-2 px-4 hover:text rounded">
                            <FaHome />
                            <span>
                                ACCEUIL
                            </span>
                        </NavLink>
                    </li>
                    <li className="my-2 w-full">
                        <NavLink to="/insert" className="flex items-center justify-start space-x-5 py-2 px-4 hover:text rounded">
                            <BsDatabaseAdd />
                            <span>
                                INSERTION
                            </span>
                        </NavLink>
                    </li>
                    <li className="my-2 w-full">
                        <NavLink to="/list" className="flex items-center justify-start space-x-5 py-2 px-4 hover:text rounded">
                            <FaList />
                            <span>
                                LISTES TABLES
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default Sidebar;