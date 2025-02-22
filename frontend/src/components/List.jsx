// import db from "../assets/db.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        setData(result);
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

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % extendedData.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + extendedData.length) % extendedData.length);
  };

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
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${index * 65}%` }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {extendedData.map((item, idx) => (
              <motion.div
                key={`${item.id}-${idx}`}
              >
                <Card
                  title={item.name}
                  content={truncateText(item.content, 50) || "No description available"}
                />
              </motion.div>
            ))}
          </motion.div>
          {/* Boutons de navigation */}
          <div className="absolute bottom-20 right-120 flex gap-16">
            <button onClick={prevSlide} className="p-2 bg-black/40 rounded-full">
              <FaChevronLeft size={24} className="text-white" />
            </button>
            <button onClick={nextSlide} className="p-2 bg-black/40 rounded-full">
              <FaChevronRight size={24} className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 text-white text-lg">No tables found in the database</div>
      )}


    </div>
  );
};

export default List;
