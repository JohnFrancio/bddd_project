import PropTypes from "prop-types";


const ModalAvg = ({ isOpen, onClose, onConfirm, headers }) => {
    if (!isOpen) return null;


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-[#1E40AF] p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[90%] md:max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg md:text-xl font-bold text-center">
                    Selection lequel de ces colonnes vous voulez utiliser :
                </h2>
                <div className="flex flex-col">
                    {headers.map((champ, index) => (
                        <button
                            key={index}
                            className="p-2 m-3 border bg-[#4363ad] rounded-2xl text-white hover:bg-[#5c8dff]"
                            onClick={() => {
                                onConfirm(champ);
                                onClose();
                            }}
                        >
                            {champ}
                        </button>
                    ))}
                </div>

                <div className="mt-4 md:mt-6 flex flex-col md:flex-row gap-3 md:gap-0 justify-center">
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 text-sm md:text-base"
                        onClick={onClose}
                    >
                        Annuler
                    </button>
                    {/* <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-sm md:text-base md:ml-4"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Supprimer
                    </button> */}
                </div>
            </div>
        </div>
    )
}

ModalAvg.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    headers: PropTypes.array
}

export default ModalAvg;