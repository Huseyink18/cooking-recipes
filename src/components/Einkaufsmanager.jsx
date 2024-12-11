import shoppingList from "./Einkaufsliste.js";
import readline from "readline-sync";
import fs from "fs";

export const options = ["🥕 Neue Lebensmittel", "📖 Holt das Rezeptbuch raus"]; //zum Auswählen für User
export const unitOptions = [
  "Gramm",
  "Kilogramm",
  "Milliliter",
  "Liter",
  "Stück(e)",
]; //Zum Auswählen von Einheiten
export const unitShortForms = {
  g: "Gramm",
  kg: "Kilogramm",
  ml: "Milliliter",
  l: "Liter",
};

// Vorläufige Rezeptliste
export const recipeList = [
  {
    name: "🍝 Spaghetti Bolognese",
    cuisine: "italienisch",
    ingredients: [
      { name: "Spaghetti", quantity: "250 Gramm" },
      { name: "Parmesan", quantity: "100 Gramm" },
      { name: "Hackfleisch", quantity: "300 Gramm" },
      { name: "Pfeffer", quantity: "1 Teelöffel" },
      { name: "Salz", quantity: "1 Teelöffel" },
    ],
  },
  {
    name: "🍟 Pommes",
    cuisine: "belgisch",
    ingredients: [
      { name: "Kartoffeln", quantity: "1 Kilogramm" },
      { name: "Öl", quantity: "500 Milliliter" },
    ],
  },
];

// Hauptprogramm
export function main() {
  clear();
  console.log("🛒 Willkommen beim Einkaufslisten-Manager!");

  const fortfahren = readline.keyInSelect(
    options,
    "Möchten Sie neues Lebensmittel oder anhand eines Rezeptes zur Einkaufsliste hinzufügen?",
    { cancel: "🤔 Ähm.." }
  );

  if (fortfahren === 0) {
    addFood();
  } else if (fortfahren === 1) {
    selectRecipe();
  } else {
    return;
  }
  listingList();
}

// Hinzufügen von Lebensmittel in Einkaufsliste
export function addFood() {
  let moreFood = true;
  let count = 0;
  // Schleife fürs Hinzufügen von Lebensmittel
  while (moreFood) {
    clear();
    // Mini-Schleife fürs Lebensmitteleingaben
    let name = "";
    while (!name.trim()) {
      name = readline.question("🍎 Geben Sie den Namen des Lebensmittels ein: ");
      if (!name.trim()) {
        console.log("⚠️ Der Name des Lebensmittels darf nicht leer sein. Bitte erneut eingeben.");
      }
    }
    // User bitten die Menge und Einheiten anzugeben
    let quantity = "";
    let validUnit = false;
    while (!validUnit) {
      quantity = readline.question(
        "📏 Geben Sie die Menge ein (Beispiel: '1 Liter', '2 Stücke'): "
      );
      const [amount, unit] = quantity.split(" "); // destructuring

      if (!isNaN(amount) && isValidUnit(unit)) {
        quantity = `${amount} ${unitShortForms[unit] || unit}`;
        validUnit = true;
      } else {
        const unitIndex = readline.keyInSelect(
          unitOptions,
          "Bitte wählen Sie die Einheit aus:",
          { cancel: "Anderes" }
        );
        // Falls der User eine Option ausgewählt hat
        if (unitIndex !== -1) {
          quantity = `${amount} ${unitOptions[unitIndex]}`;
          validUnit = true;
        } else {
          console.log("⚠️ Ungültige Auswahl. Bitte geben Sie die Menge erneut ein.");
          continue; // springt zum Anfang zurück, um die Menge erneut einzugeben
        }
      }
    }

    const index = findIndexInList(name);
    if (index === -1) {
      shoppingList.push({ name, quantity }); // Neues Lebensmittel mit der Menge werden in die Liste gepusht.
    } else {
      // Zusammenführen von der Mengen
      shoppingList[index].quantity = quantityCredit(
        shoppingList[index].quantity,
        quantity
      );
    }
    count++; // Die Runde wird aufgezählt

    // Sobald 3. Runde erreicht ist, dann jeder Runde Zwischenfrage
    if (count % 3 === 0) {
      showList();
      const isLongEnough = readline.keyInYNStrict(
        "🛑 Haben Sie genug von den bisherigen Lebensmitteln?"
      );

      if (isLongEnough) {
        break;
      }
    }
    // Fortsetzung zur Erweiterung von der Einkaufsliste
    moreFood = readline.keyInYNStrict(
      "➕ Möchten Sie ein weiteres Lebensmittel hinzufügen?"
    );
  }
  clear();
}

export function selectRecipe() {
  clear();
  const recipeNames = recipeList.map((recipe) => recipe.name);
  const recipeIndex = readline.keyInSelect(
    recipeNames,
    "Welches Rezept möchten Sie auswählen?",
    { cancel: "❌ Abbrechen" }
  );
  // Option "Abbrechen" === -1
  if (recipeIndex === -1) {
    console.log("⚠️ Keine Auswahl getroffen.");
    return;
  }

  const selectedRecipe = recipeList[recipeIndex]; // neue Variable, die den Index von ausgewählten Option übernimmt
  console.log(`\n🎉 Sie haben "${selectedRecipe.name}" ausgewählt.`);
  console.log("Zutaten:"); // Einfache Output

  selectedRecipe.ingredients.forEach((ingredient) => {
    console.log(`- ${ingredient.name}: ${ingredient.quantity}`); // für jeden Zutaten durchgehen und die Output formatieren.
  });

  // Nun alle Zutaten sichtbar, dann Nachfrage
  const addToShoppingList = readline.keyInYNStrict(
    "🛒 Möchten Sie alle Zutaten in der Einkaufsliste hinzufügen?"
  );

  if (addToShoppingList) {
    // boolean true or false
    selectedRecipe.ingredients.forEach((ingredient) => {
      const index = findIndexInList(ingredient.name);
      if (index === -1) {
        shoppingList.push({
          name: ingredient.name,
          quantity: ingredient.quantity,
        });
      } else {
        // Optional: Falls du die Menge für vorhandene Zutaten anpassen möchtest
        shoppingList[index].quantity = quantityCredit(
          shoppingList[index].quantity,
          ingredient.quantity
        );
      }
    });
  }
  clear();
}

// Zwischenliste anzeigen und Nachfrage
export function listingList() {
  clear();
  console.log("📋 Einkaufsprozess beendet. Hier ist Ihre finale Einkaufsliste:");
  showList();

  const forgotSmth = readline.keyInSelect(
    // Nachfrage
    ["Ja", "Nein"],
    "🤔 Vergessen Sie hier nicht etwas noch?",
    { cancel: "👀 Kurz die Rezepte angucken?" } // Ändert die default cancel-option
  );

  if (forgotSmth === 1) {
    // 1 = 2. Index von forgotSmth keyinSelect
    showList();
    if (shoppingList.length === 0) {
      console.log("\n👋 Na, dann tschau!\n");
    } else {
      console.log("\n🎉 Dann viel Spaß beim Einkaufen!\n");
    }
  } else if (forgotSmth === 0) {
    // 0 = 1. Index von forgotSmth keyInSelect
    listingList();
    addFood();
  } else {
    selectRecipe();
  }
}

// Einkaufsliste formatieren und anzeigen
export function showList() {
  clear();
  console.log("\n📝 Aktuelle Einkaufsliste:");
  shoppingList.forEach((item, index = 1) => {
    console.log(`${index + 1}. ${item.name} - ${item.quantity}`);
  });
}

// Die Einheiten von Zahlen trennen und die Zahlen von String in Number umwandeln
export function quantitySeperator(quantity) {
  const [number, unit] = quantity.split(" "); // "1 Liter" -> "1" + "Liter" -- destructuring
  return { number: parseFloat(number), unit }; // parseFloat(anzahl) -> umwandeln von String in Dezimalzahlen
}

// Die Einheiten fügt sich zu addierten Zahlen zusammen
export function quantityCredit(quant1, quant2) {
  const q1 = quantitySeperator(quant1);
  const q2 = quantitySeperator(quant2);

  if (q1.unit !== q2.unit) {
    // Einheitenumrechnung für Kilogramm und Gramm
    if (
      (q1.unit === "Kilogramm" && q2.unit === "Gramm") ||
      (q1.unit === "Gramm" && q2.unit === "Kilogramm")
    ) {
      if (q1.unit === "Kilogramm") {
        q2.number = q2.number / 1000; // Gramm zu Kilogramm konvertieren
        q2.unit = "Kilogramm";
      } else {
        q1.number = q1.number / 1000; // Gramm zu Kilogramm konvertieren
        q1.unit = "Kilogramm";
      }
    }
    // Einheitenumrechnung für Liter und Milliliter
    else if (
      (q1.unit === "Liter" && q2.unit === "Milliliter") ||
      (q1.unit === "Milliliter" && q2.unit === "Liter")
    ) {
      if (q1.unit === "Liter") {
        q2.number = q2.number / 1000; // Milliliter zu Liter konvertieren
        q2.unit = "Liter";
      } else {
        q1.number = q1.number / 1000; // Milliliter zu Liter konvertieren
        q1.unit = "Liter";
      }
    }
  }
  // die Mengen werden addieren
  const totalNumber = q1.number + q2.number;
  const totalUnit = q1.unit; // Einheit von q1 ist immer die aktuellste

  return convertUnit(totalNumber, totalUnit);
}
// Umwandeln von Einheiten, wenn "1000" überschritten werden.
export function convertUnit(totalNumber, totalUnit) {
  // Umrechnung für Liter und Milliliter
  if (totalUnit === "Liter" && totalNumber >= 1) {
    totalNumber = Math.round(totalNumber * 1000); // Umwandlung in Milliliter
    totalUnit = "Milliliter";
  }
  // Konvertiere zurück, falls mehr als 1000 Milliliter
  if (totalUnit === "Milliliter" && totalNumber >= 1000) {
    totalNumber = totalNumber / 1000;
    totalUnit = "Liter";
  }
  return `${totalNumber} ${totalUnit}`;
}

// Für die while-Bedingungen und Überprüfung von bereits vorhandenen Lebensmittel in foodList
export function findIndexInList(name) {
  return shoppingList.findIndex(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
}

// Konsole reinigen
export function clear() {
  console.clear();
}

// Prüft, ob eine Einheit gültig ist
export function isValidUnit(unit) {
  const validUnits = [
    "ml",
    "l",
    "g",
    "gr",
    "kg",
    "Milliliter",
    "Liter",
    "Gramm",
    "Kilogramm",
  ];
  return validUnits.includes(unit);
}
