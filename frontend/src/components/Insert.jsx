import { useState } from 'react';

const Insert = () => {

    const [file, setFile] = useState();
    const [delimiter, setDelimiter] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !delimiter) {
            alert('Veuillez sélectionner un fichier et un séparateur');
            return;
        }

        const data = { file, delimiter };

        console.log(data)

        const formData = new FormData();
        formData.append('file', file);
        formData.append('delimiter', delimiter);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/insert-table', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();  // Si la réponse est en JSON
                console.log('Réponse du serveur:', data);
            } else {
                console.error('Erreur lors de l\'envoi:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
        }


        // fetch('http://127.0.0.1:8000/api/insert-table', {
        //     method: 'POST', // Specify the method
        //     headers: {
        //         'Content-Type': 'application/json', // Content type to be sent to the server
        //     },
        //     body: JSON.stringify(data), // Convert the data object to a JSON string
        // })
        //     .then(response => response.json()) // Parse the JSON response from the server
        //     .then(result => {
        //         console.log('Success:', result); // Handle the response
        //     })
        //     .catch(error => {
        //         console.error('Error:', error); // Handle any errors
        //     });
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-teal-800">
            <div className=" flex flex-col items-center bg-gray-300 rounded-2xl">
                <h1 className=" font-bold text-teal-950 mb-10 mt-15">
                    INSERTION TABLE
                </h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className=" flex flex-col items-center ml-15 mr-15 mb-15">
                    <div className="flex flex-col">
                        <input
                            type="file"
                            className="bg-white rounded-3xl mb-5 px-10 p-3"
                            name="file"
                            accept=".txt"
                            onChange={e => setFile(e.target.files[0])}

                        />
                        <input
                            list="delimiterList"
                            type="text"
                            placeholder="Add Separator"
                            className="bg-white rounded-3xl mb-5 px-10 p-3"
                            name='delimiter'
                            // value={delimiter}
                            onChange={e => setDelimiter(e.target.value)}
                        />
                        <datalist id="delimiterList">
                            <option value="'"></option>
                            <option value=","></option>
                            <option value='"'></option>
                            <option value="|"></option>
                            <option value="#"></option>
                        </datalist>

                    </div>
                    <div className=" flex flex-col items-center">
                        <button className="  bg-emerald-950 text-white px-10 p-2 rounded-2xl hover:bg-emerald-800">
                            Continuer
                        </button>
                    </div>
                </form>
            </div>
            {/* <div className="flex flex-col items-center">
                <h2 className="text-2xl text-black font-bold">Upload Data</h2>
            </div>
            <form className="m-auto shadow-gray-600" onSubmit={handleSubmit}>
                <div className="my-16 ">
                    <label className="text-gray-700 text-xl font-bold mb-2 mt-5 flex flex-col items-center">
                        Add File here
                    </label>
                    <input
                        className=" border  mx-16 w-[85%] rounded-4xl py-2 px-6"
                        type="file"
                        name='file'
                        accept=".txt"
                        // value={file}
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <label className="text-gray-700 text-xl font-bold mb-2 mt-8 flex flex-col items-center">
                        Add Separator
                    </label>
                    <input
                        className=" border  mx-16 w-[85%] rounded-4xl py-2 px-6"
                        type="text"
                        name='delimiter'
                        value={delimiter}
                        onChange={e=> setDelimiter(e.target.value)}
                        
                        placeholder="Please enter only the separator"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add To Database
                    </button>
                </div>
            </form> */}
        </div>

    );
};

export default Insert;
