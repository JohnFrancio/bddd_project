import { useState, useEffect } from "react";
import Card from "./Card";

const List = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleDelete = (deletedTable) => {
    setData((prevData) => prevData.filter((table) => table.table !== deletedTable));
  };


  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/show-tables/");
        if (!response.ok) throw new Error("Network response was not ok");

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#203139] to-[#438FB2] text-white">
        <h1 className="text-3xl font-bold">LISTES TABLES</h1>
        <div className="mt-8 text-lg bg-green-700 px-6 py-3 rounded-2xl animate-pulse">
          Chargement des tables...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#203139] to-[#438FB2] text-white">
        <h1 className="text-3xl font-bold">LISTES TABLES</h1>
        <div className="mt-8 text-lg bg-red-800 px-6 py-3 rounded-2xl">
          Erreur: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#203139] to-[#438FB2] flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mt-12">LISTES TABLES</h1>

      {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-6 ">
            {data.map((item) => (
              <Card
                key={item.table}
                title={item.table}
                content={item.nombre_ligne}
                onDelete={handleDelete}
              />
            ))}
        </div>
      ) : (
        <div className="mt-8 text-lg">La base de données ne contient pas de tables.</div>
      )}
    </div>
  );
};

export default List;
