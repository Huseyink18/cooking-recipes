const fetchData = async (url) => {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Fehler beim Abrufen der Daten: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Daten zurückgeben
    } catch (error) {
      console.error("Fehler in fetchData:", error.message);
      throw error; // Fehler weitergeben
    }
  };
  
  export default fetchData;
  