import React, { useEffect, useState } from "react";

const DisplayTables = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/show-tables")
      .then((response) => response.json())
      .then((data) => setMessage(data.tables))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  return (
      <div>
        {message.map((el) => (
          <p>
            {el}
          </p>
        ))}
      </div>
  );
};

export default DisplayTables;
