import { useEffect, useState } from "react";
import { FaHourglassEnd, FaCalculator } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import ModalSum from "./ModalSum";
import ModalAvg from "./ModalAvg";


function TableDetails() {
    const { table } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Request Query 
    // New states for query execution
    const [query, setQuery] = useState("");
    const [requestData, setRequestData] = useState([]);
    const [isRequestLoading, setIsRequestLoading] = useState(false);
    const [requestError, setRequestError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/table-details/${table}/`);
                if (!response.ok) throw new Error('Network response was not ok');

                const result = await response.json();
                setData(result.details || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [table]);



    const handleExecute = async () => {
        if (!query.trim()) return;

        setIsRequestLoading(true);
        setRequestError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/executer-requete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: query.trim() }),
            });

            if (!response.ok) throw new Error('Execution failed');

            const result = await response.json();
            // console.log(result.result);
            setRequestData(result.result || []);

        } catch (error) {
            setRequestError(error.message);
            setRequestData([]);
        } finally {
            setIsRequestLoading(false);
        }
    };

    const handleSum = async (colTosum) => {
        setIsModalOpen(false);
        console.log(colTosum)

        const rqst = `select sum(${colTosum}::numeric) as "Somme ${colTosum}" from ${table}`;
        setIsRequestLoading(true);
        setRequestError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/executer-requete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: rqst.trim() }),
            });

            if (!response.ok) throw new Error('Execution failed');

            const result = await response.json();
            console.log(result.result);
            setRequestData(result.result || []);

        } catch (error) {
            setRequestError(error.message);
            setRequestData([]);
        } finally {
            setIsRequestLoading(false);
        }
    };

    const handleAvg = async (colTosum) => {
        setIsModalOpen(false);
        console.log(colTosum)

        const rqst = `select avg(${colTosum}::numeric) as "Moyenne ${colTosum}" from ${table}`;
        setIsRequestLoading(true);
        setRequestError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/executer-requete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: rqst.trim() }),
            });

            if (!response.ok) throw new Error('Execution failed');

            const result = await response.json();
            console.log(result.result);
            setRequestData(result.result || []);

        } catch (error) {
            setRequestError(error.message);
            setRequestData([]);
        } finally {
            setIsRequestLoading(false);
        }
    };

    const requestHeaders = requestData.length > 0 ? requestData[0] : [];
    const requestRows = requestData.length > 0 ? requestData.slice(1) : [];


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#203139] to-[#438FB2]">
                <div className="mt-12 px-4">
                    <h1 className="font-bold text-white text-3xl md:text-4xl text-center">Details / Requetes</h1>
                    <div className="text-white font-bold text-xl mt-8 md:mt-32 border bg-green-700 p-4 md:p-6 rounded-2xl text-center">
                        Chargements des tables...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-[#203139] to-[#438FB2]">
                <div className="mt-12 px-4">
                    <h1 className="font-bold text-white text-3xl md:text-4xl text-center">Details / Requetes</h1>
                    <div className="text-white font-bold text-xl mt-8 md:mt-32 border bg-red-800 p-4 md:p-6 rounded-2xl text-center">
                        Erreur: {error}
                    </div>
                </div>
            </div>
        );
    }

    const headers = data.length > 0 ? data[0] : [];
    const rows = data.length > 0 ? data.slice(1) : [];

    // console.log(headers);








    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-[#203139] to-[#438FB2] p-4">
            <div className="mt-4 md:mt-2 px-2">
                <h1 className="font-bold text-white text-3xl md:text-4xl text-center">Details / Requetes</h1>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 md:mt-5">
                {/* Table Container - Full width on mobile, 3 cols on desktop */}
                <div className="w-full md:col-span-3 bg-white p-2 rounded-lg overflow-x-auto">
                    <table className="w-full border border-gray-300 min-w-[600px] md:min-w-0">
                        <thead>
                            <tr className="bg-gray-200">
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className="border border-gray-300 p-1 md:p-2 text-sm md:text-base"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border border-gray-300">
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="border border-gray-300 p-1 md:p-2 text-sm md:text-base truncate"
                                            title={cell} // Show full text on hover
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="w-full md:col-span-2 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 h-[600px] overflow-auto">
                    {/* Query Input Section */}
                    <div className="flex-1 relative">
                        <h2 className="text-lg font-bold mb-2">SQL Query</h2>
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full h-[calc(100%-40px)] p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your SQL query here..."
                            disabled={isRequestLoading}
                        />
                        <button
                            onClick={handleExecute}
                            disabled={!query.trim() || isRequestLoading}
                            className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isRequestLoading ? <FaHourglassEnd /> : <MdSend />}
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            // disabled={!query.trim() || isRequestLoading}
                            className="absolute bottom-2 right-20 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isRequestLoading ? <FaHourglassEnd /> : <FaCalculator />}
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            // disabled={!query.trim() || isRequestLoading}
                            className="absolute bottom-2 right-40 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isRequestLoading ? <FaHourglassEnd /> : <VscGraph />}
                        </button>
                        <ModalSum
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onConfirm={handleSum}
                            headers={headers}

                        />
                        <ModalAvg
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onConfirm={handleAvg}
                            headers={headers}

                        />
                    </div>

                    {/* Results Section */}
                    <div className="flex-1 flex flex-col">
                        <h2 className="text-lg font-bold mb-2">Results</h2>
                        <div className="flex-1 overflow-auto border rounded">
                            {isRequestLoading ? (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                    Executing query...
                                </div>
                            ) : requestError ? (
                                <div className="h-full flex items-center justify-center text-red-500 p-4 text-center">
                                    Error: {requestError}
                                </div>
                            ) : requestData.length > 0 ? (
                                <table className="w-full border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            {requestHeaders.map((header, index) => (
                                                <th
                                                    key={index}
                                                    className="border border-gray-300 p-2 text-sm md:text-base"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requestRows.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="border border-gray-300">
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className="border border-gray-300 p-2 text-sm md:text-base truncate"
                                                        title={cell}
                                                    >
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                    No results to display
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableDetails;