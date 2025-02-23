// import db from "../assets/db.png";

import { useState, useEffect } from "react";
import Card from "./Card";

const List = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/show-tables");
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        setData(result.tables || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-blue-900 to-cyan-700">
        <div className="mt-12">
          <h1 className="font-bold text-white text-4xl">Listes Tables</h1>
          <div className="text-white font-bold text-xl mt-32 border bg-green-700 p-6 rounded-2xl">Loading tables...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center  bg-gradient-to-tr from-blue-900 to-cyan-700">
        <div className="mt-12">
          <h1 className="font-bold text-white text-4xl">Listes Tables</h1>
          <div className="text-white font-bold text-xl mt-32 border bg-red-800 p-6 rounded-2xl">Error: {error}</div>
        </div>
      </div>
    );
  }




  return (
    <div className=" h-full flex flex-col items-center  bg-gradient-to-tr from-[#203139] to-[#438FB2]">
      <div className="mt-12">
        <h1 className="font-bold text-white text-4xl">Listes Tables</h1>
      </div>

      {data.length > 0 ? (
        <div className=" w-full border border-blue-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((item) => (
              <Card
                key={item.table}
                title={`Nom de la table : "${item.table}"`}
                content={`Contient ${item.nombre_ligne} lignes`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 text-white text-lg">
          No tables found in the database
        </div>
      )}


    </div>
  );
};

export default List;
