import { FcAddDatabase } from "react-icons/fc";
import { FaHome, FaList } from "react-icons/fa";
const Sidebar = () => {
    return (
        <div className="h-screen flex">
            <nav className="w-55 h-full bg-gray-800 text-white">
                <ul className="flex flex-col items-center w-full">
                    <li className="my-2 w-full">
                        <a href="#" className="flex items-center justify-start space-x-5 py-2 px-4 hover:bg-gray-700 rounded">
                            <FaHome />
                            <span>
                                HOME
                            </span>
                        </a>
                    </li>
                    <li className="my-2 w-full">
                        <a href="#" className="flex items-center justify-start space-x-5 py-2 px-4 hover:bg-gray-700 rounded">
                            <FcAddDatabase />
                            <span>
                                INSERT
                            </span>
                        </a>
                    </li>
                    <li className="my-2 w-full">
                        <a href="#" className="flex items-center justify-start space-x-5 py-2 px-4 hover:bg-gray-700 rounded">
                            <FaList />
                            <span>
                                LIST
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default Sidebar;