import db from "../assets/db.png";
import PropTypes from "prop-types";

import { IoClose } from "react-icons/io5";
import { FaEdit, FaCalculator } from "react-icons/fa";


const Card = (
    { title, content, image }
) => {
    return (
        <div className="relative w-70 h-100 bg-gray-800 p-6 rounded-2xl shadow-xl flex flex-col items-center text-white">

            <button className="absolute top-2 right-2 text-gray-400 hover:text-white">
                <IoClose size={25} />
            </button>

            <div className="w-70 h-75 bg-white flex items-center justify-center rounded-md">
                <img
                    src={image || db}
                    alt="Database"
                    className="w-24 h-24"
                />
            </div>


            <h2 className="mt-2 text-lg font-semibold">
                Table : {title}
            </h2>
            <p className="text-gray-400">
                Contient : {content} lignes
            </p>


            <div className="mt-2 flex gap-4">
                <button className="px-4 py-2 rounded hover:bg-gray-700">
                    <FaEdit size={25} />
                </button>
                <button className="px-4 py-2 rounded hover:bg-gray-700">
                    <FaCalculator size={25} />
                </button>
            </div>
        </div>

    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,   // title doit être une string et obligatoire
    content: PropTypes.string.isRequired, // content doit être une string et obligatoire
    image: PropTypes.string,              // image est une string mais optionnelle
};


Card.defaultProps = {
    image: db,
};

export default Card;