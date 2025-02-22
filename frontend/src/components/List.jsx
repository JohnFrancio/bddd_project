// import db from "../assets/db.png";

import { useState, useEffect } from "react";
import Card from "./Card";

const List = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);


  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/show-tables");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setData(result.tables);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create extended data array for infinite loop
  const extendedData = data.length > 0 ? [...data, { ...data[0], id: data[0].id + Date.now() }] : [];


  // Reset index when reaching the cloned item
  useEffect(() => {
    if (index === data.length) {
      const timer = setTimeout(() => setIndex(0), 500); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [data.length, index]);

  // Limiter la longueur du texte
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-blue-900 to-cyan-700">
        <div className="text-white text-xl">Loading tables...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-blue-900 to-cyan-700">
        <div className="text-red-300 text-xl">Error: {error}</div>
      </div>
    );
  }




  return (
    <div className=" h-screen flex flex-col items-center  bg-gradient-to-tr from-blue-900 to-cyan-700">
      <div className="mt-12">
        <h1 className="font-bold text-white text-4xl">Listes Tables</h1>
      </div>

      {data.length > 0 ? (
        <div className="overflow-hidden mt-5 max-w-4xl">

          {extendedData.map((item, idx) => (
            <div
              key={`${item.table}-${idx}`}
            >
              <Card
                title={item.table}
                content={truncateText(item.nombre_ligne, 50) || "No description available"}
              />
            </div>
          ))}

        </div>
      ) : (
        <div className="mt-8 text-white text-lg">No tables found in the database</div>
      )}


    </div>
  );
};

export default List;
