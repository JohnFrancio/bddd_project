// import db from "../assets/db.png";

import { useState, useEffect } from "react";
import Card from "./Card";

const List = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteTable = async (tableName) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete-table/${tableName}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Delete failed');

      // Refresh the table list
      const result = await response.json();
      setData(result.tables.filter(table => table.table !== tableName));
    } catch (error) {
      setError(error.message);
    }
  };

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
      <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-[#203139] to-[#438FB2]">
        <div className="mt-12">
          <h1 className="font-bold text-white text-4xl">Listes Tables</h1>
          <div className="text-white font-bold text-xl mt-32 border bg-green-700 p-6 rounded-2xl">Chargements des tables...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center  bg-gradient-to-tr from-[#203139] to-[#438FB2]">
        <div className="mt-12">
          <h1 className="font-bold text-white text-4xl">Listes Tables</h1>
          <div className="text-white font-bold text-xl mt-32 border bg-red-800 p-6 rounded-2xl">Erreur: {error}</div>
        </div>
      </div>
    );
  }




  return (
    <div className=" h-fit flex flex-col items-center  bg-gradient-to-tr from-[#203139] to-[#438FB2]">
      <div className="mt-12">
        <h1 className="font-bold text-white text-4xl">Listes Tables</h1>
      </div>

      {data.length > 0 ? (
        <div className="w-full p-5 pl-15 mt-5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
            {data.map((item) => (
              <Card
                key={item.table}
                title={item.table}
                content={item.nombre_ligne}
                onDelete={() => handleDeleteTable(item.table)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 text-white text-lg">
          La base de données ne contient pas de tables.
        </div>
      )}


    </div>
  );
};

export default List;
