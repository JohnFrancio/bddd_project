import PropTypes from "prop-types";

function Modal({ isOpen, onClose, onConfirm, title }) {
    if (!isOpen) return null; // Don't render the modal if `isOpen` is false

    return (
        <div
            className="fixed left-[600px] top-[150px] z-50 h-75 w-100 inset-0 bg-opacity-50  flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-[#1E40AF] p-6 rounded-lg shadow-lg max-w-sm w-full"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                <h2 className="text-xl font-bold text-center">Confirmation de suppression de table</h2>
                <p className="mt-4 text-center">
                    Voulez-vous supprimer la table &quot;<strong>{title}</strong>&quot;?
                </p>
                <div className="mt-6 text-center">
                    <button
                        className="bg-gray-500 text-white py-2 px-4 mr-4 rounded hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 ml-4 rounded hover:bg-red-600"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string
};


export default Modal;
