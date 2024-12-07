import React, {useState, useEffect} from "react";
import fetchData from "../utils/fetchData.js";
// Import der fetchData-Funktion


const MealFetcher = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await fetchData(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        ); // API-Daten abrufen
        setMeals(data.meals); // Daten speichern
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
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <h2>{meal.strMeal}</h2>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
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
