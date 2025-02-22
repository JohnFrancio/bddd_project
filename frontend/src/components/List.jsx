// import db from "../assets/db.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card";

const List = () => {
  const data = [
    { id: 1, name: "Users Table", content: "Contains user information such as name, email, and role." },
    { id: 2, name: "Orders Table", content: "Stores order details including customer ID, product ID, and order status." },
    { id: 3, name: "Products Table", content: "Includes product details such as name, price, and category." },
    { id: 4, name: "Customers Table", content: "Holds customer data like name, address, and contact number." },
    { id: 5, name: "Payments Table", content: "Records payment transactions, including method and amount paid." },
    { id: 6, name: "Inventory Table", content: "Tracks stock levels and supplier details for each product." },
    { id: 7, name: "Shipping Table", content: "Manages shipping details such as delivery status and tracking number." },
    { id: 8, name: "Reviews Table", content: "Stores customer reviews and ratings for products." },
    { id: 9, name: "Categories Table", content: "Defines product categories and subcategories." },
    { id: 10, name: "Discounts Table", content: "Contains discount codes and promotional offers." },
  ];


  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  // Limiter la longueur du texte
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className=" h-screen flex flex-col items-center  bg-gradient-to-tr from-blue-900 to-cyan-700">
      <div className="mt-12">
        <h1 className="font-bold text-white text-4xl">Listes Tables</h1>
      </div>
      <div className="overflow-hidden mt-5 max-w-4xl">
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${index * 65}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {data.map((item) => (
            <motion.div
              key={item.id}
            >
              <Card title={item.name} content={truncateText(item.content, 50)} />
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
    </div>
  );
};

export default List;
