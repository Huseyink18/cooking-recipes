import React, { useState, useEffect } from "react";
import fetchData from "../utils/fetchData.js";
// Import der fetchData-Funktion

const MealFetcher = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await fetchData("categories.php");
        console.log(data); // API-Daten abrufen
        setCategories(data.categories); // Daten speichern
      } catch (err) {
        setError(err.message); // Fehler speichern
      } finally {
        setLoading(false); // Ladeanzeige deaktivieren
      }
    };

    fetchMeals();
  }, []);

  if (loading) return <p>Daten werden geladen...</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <div>
      <h1>Gerichte</h1>
      {/* <p>{JSON.stringify(typeof categories)}</p> */}
      <ul>
        {categories.map((category) => (
          <li key={category.idCategory}>
            <h2>{category.strCategory}</h2>
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              width="200"
              style={{ borderRadius: "8px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealFetcher;
