import React, { useEffect, useState } from "react";

const HelloWorld = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  return (
      <div>
        <h2>Message du backend : 
        <p className="text-red-600 animate-pulse">{message}</p></h2>
      </div>
  );
};

export default HelloWorld;
