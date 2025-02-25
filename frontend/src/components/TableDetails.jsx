import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TableDetails() {
    const { table } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-[#203139] to-[#438FB2] p-4">
            <div className="mt-4 md:mt-10 px-2">
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

                {/* Side Panel - Full width on mobile, 2 cols on desktop */}
                <div className="w-full md:col-span-2 bg-white p-4 rounded-lg shadow-lg relative h-fit md:h-auto">
                    <h2 className="text-lg font-bold">REQUETES Mbola tsy vita</h2>
                    <button className="absolute top-2 right-2 text-lg">🌙</button>
                    <div className="h-48 md:h-64 overflow-auto mt-2 border-t border-gray-300">
                        {/* Add your content here */}
                    </div>
                    <button className="absolute bottom-2 right-2 text-blue-500 text-lg">➤</button>
                </div>
            </div>
        </div>
    );
}

export default TableDetails;