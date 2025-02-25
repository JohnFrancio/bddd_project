import { useState } from 'react';

const Insert = () => {
    const [file, setFile] = useState();
    const [delimiter, setDelimiter] = useState();

    const [notification, setNotification] = useState({ message: "", type: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !delimiter) {
            setNotification({ message: 'Veuillez sélectionner un fichier et un séparateur.', type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('delimiter', delimiter);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/insert-table/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setNotification({ message: 'Insertion réussie ! 🎉', type: 'success' });
            } else {
                setNotification({ message: `Échec de l'insertion : ${response.statusText}`, type: 'error' });
            }
        } catch (error) {
            setNotification({ message: `Erreur réseau : ${error.message}`, type: 'error' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#203139] to-[#438FB2] p-4">
            <div className="w-full max-w-md bg-gray-300/65 p-6 rounded-2xl shadow-lg flex flex-col items-center">
                <h1 className="text-xl font-bold text-teal-950 mb-6 text-center">INSERTION TABLE</h1>
                {notification.message && (
                    <div className={`mb-4 px-4 py-2 rounded-xl text-sm text-center 
                        ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {notification.message}
                    </div>
                )}
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full flex flex-col">
                    <input
                        type="file"
                        className="bg-white rounded-xl p-3 w-full mb-4 text-sm"
                        name="file"
                        accept=".txt"
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <input
                        list="delimiterList"
                        type="text"
                        placeholder="Entrer le separateur de données"
                        className="bg-white rounded-xl p-3 w-full mb-4 text-sm"
                        name='delimiter'
                        onChange={e => setDelimiter(e.target.value)}
                    />
                    <datalist id="delimiterList">
                        <option value="'"></option>
                        <option value=","></option>
                        <option value='"'></option>
                        <option value="|"></option>
                        <option value="#"></option>
                        <option value=" "></option>
                    </datalist>
                    <button className="bg-blue-900 text-white py-2 px-4 rounded-xl hover:bg-blue-800 transition duration-200 w-full text-sm">
                        Continuer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Insert;
