// try {
//     const reponse = fetch(`http://127.0.0.1:8000/api/table-details/${title}/`, {
//         method: 'GET'
//     });
//     if (!response.ok) throw new Error('Network response was not ok');
//     const result = await response.json();
//     console.log(result);
// }
import db from "../assets/db.png";
import PropTypes from "prop-types";

import { IoClose } from "react-icons/io5";
import { FaEdit, FaCalculator } from "react-icons/fa";
import { useState } from "react";
import Modal from "./Modal";

import { useNavigate } from "react-router-dom";


const Card = (
    { title, content, image, onDelete }
) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleDetails = async () => {
        console.log(`Fetching details for table: ${title}`);
        navigate(`/list/table/${title}`);
    }

    const handleDeleteConfirmation = async () => {
        setIsModalOpen(false);
        try {
            const reponse = await fetch(`http://127.0.0.1:8000/api/table-delete/${title}/`, {
                method: 'DELETE'
            });
            if (!reponse.ok) throw new Error('Delete failed');

            alert(`Deleting table : ${title}`);
            onDelete(title);

        } catch (error) {
            console.log(error.message);
        }
    };

    return (

        <div className="relative w-70 h-100 bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center text-white">

            <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                onClick={() => setIsModalOpen(true)}
            >
                <IoClose size={25} />
            </button>

            <div className="w-70 h-75 bg-slate-600 flex items-center justify-center rounded-md">
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
            <div className="mt-2 mb-3 flex gap-6">
                <button className="px-6 py-2 rounded hover:bg-gray-700" onClick={handleDetails}>
                    <FaEdit size={25} />
                </button>
                <button className="px-6 py-2 rounded hover:bg-gray-700">
                    <FaCalculator size={25} />
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteConfirmation}
                title={title}
            />

        </div>

    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,   // title doit être une string et obligatoire
    content: PropTypes.string.isRequired, // content doit être une string et obligatoire
    image: PropTypes.string,              // image est une string mais optionnelle
    onDelete: PropTypes.func.isRequired,
};


Card.defaultProps = {
    image: db,
};

export default Card;