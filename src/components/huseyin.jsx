import fs from "fs";
import rls from "readline-sync";

// Definieren des Dateipfads für die Benutzerdaten (optional)
const filePath = "users.txt";
// Lesen der Datei 'users.txt' in eine Variable 'data'. Die Daten werden als String im UTF-8-Format gelesen.
let data = fs.readFileSync(filePath, "utf-8");

// Abfrage, welche Küche der Nutzer heute ausprobieren möchte
export function chooseCuisine() {
    let validInputs = ["italienisch", "türkisch", "deutsch", "französisch", "persisch", "mexikanisch", "Zurück"];
    let input;

    do {
        input = rls.question("Welche Küche willst du heute ausprobieren? [italienisch, türkisch, deutsch, französisch, persisch, mexikanisch, Zurück]: ");
        if (!validInputs.includes(input)) {
            console.log("Ungültige Eingabe. Bitte wählen Sie eine der folgenden Optionen: [italienisch, türkisch, deutsch, französisch, persisch, mexikanisch, Zurück]");
        }
    } while (!validInputs.includes(input));

    // Verzweigung basierend auf der Nutzereingabe, um die entsprechende Funktion aufzurufen
    switch (input) {
        case "italienisch":
            italienisch();
            break;
        case "türkisch":
            tuerkisch();
            break;
        case "deutsch":
            deutsch();
            break;
        case "französisch":
            franzoesisch();
            break;
        case "persisch":
            persisch();
            break;
        case "mexikanisch":
            mexikanisch();
            break;
        case "Zurück":
            back();
            break;
    }
}

// Funktion für die italienische Küche
export function italienisch() {
    let validInputs = ["süß", "salzig"];
    let geschmack;

    do {
        geschmack = rls.question("Möchtest du etwas Süßes oder Salziges aus der italienischen Küche? [süß/salzig]: ");
        if (!validInputs.includes(geschmack)) {
            console.log("Ungültige Eingabe. Bitte wählen Sie entweder 'süß' oder 'salzig'.");
        }
    } while (!validInputs.includes(geschmack));

    if (geschmack === "süß") {
        console.log("Wie wäre es mit Tiramisu? 🍰");
    } else if (geschmack === "salzig") {
        console.log("Wie wäre es mit Spaghetti Carbonara? 🍝");
    }
}

// Funktion für die türkische Küche
export function tuerkisch() {
    let validInputs = ["süß", "salzig"];
    let geschmack;

    do {
        geschmack = rls.question("Möchtest du etwas Süßes oder Salziges aus der türkischen Küche? [süß/salzig]: ");
        if (!validInputs.includes(geschmack)) {
            console.log("Ungültige Eingabe. Bitte wählen Sie entweder 'süß' oder 'salzig'.");
        }
    } while (!validInputs.includes(geschmack));

    if (geschmack === "süß") {
        console.log("Wie wäre es mit Baklava? 🥮");
    } else if (geschmack === "salzig") {
        console.log("Wie wäre es mit Lahmacun? 🍕");
    }
}

// Funktion für die deutsche Küche
export function deutsch() {
    let validInputs = ["süß", "salzig"];
    let geschmack;

    do {
        geschmack = rls.question("Möchtest du etwas Süßes oder Salziges aus der deutschen Küche? [süß/salzig]: ");
        if (!validInputs.includes(geschmack)) {
            console.log("Ungültige Eingabe. Bitte wählen Sie entweder 'süß' oder 'salzig'.");
        }
    } while (!validInputs.includes(geschmack));

    if (geschmack === "süß") {
        console.log("Wie wäre es mit Apfelstrudel? 🍏");
    } else if (geschmack === "salzig") {
        console.log("Wie wäre es mit Bratwurst? 🌭");
    }
}

// Funktion für die französische Küche
export function franzoesisch() {
    let validInputs = ["süß", "salzig"];
    let geschmack;

    do {
        geschmack = rls.question("Möchtest du etwas Süßes oder Salziges aus der französischen Küche? [süß/salzig]: ");
        if (!validInputs.includes(geschmack)) {
            console.log("Ungültige Eingabe. Bitte wählen Sie entweder 'süß' oder 'salzig'.");
        }
    } while (!validInputs.includes(geschmack));

    if (geschmack === "süß") {
        console.log("Wie wäre es mit Crêpes? 🥞");
    } else if (geschmack === "salzig") {
        console.log("Wie wäre es mit Quiche Lorraine? 🥧");
    }
}

// Funktion für die persische Küche
export function persisch() {
    let validInputs = ["süß", "salzig"];
    let geschmack;

    do {
        geschmack = rls.question("Möchtest du etwas Süßes oder Salziges aus der persischen Küche? [süß/salzig]: ");
        if (!validInputs.includes(geschmack)) {
            console.log("Ungültige Eingabe. Bitte wählen Sie entweder 'süß' oder 'salzig'.");
        }
    } while (!validInputs.includes(geschmack));

    if (geschmack === "süß") {
        console.log("Wie wäre es mit Sholeh Zard? 🍚");
    } else if (geschmack === "salzig") {
        console.log("Wie wäre es mit Kebab? 🍢");
    }
}

// Funktion für die mexikanische Küche
export function mexikanisch() {
    let validInputs = ["süß", "salzig"];
    let geschmack;

    do {
        geschmack = rls.question("Möchtest du etwas Süßes oder Salziges aus der mexikanischen Küche? [süß/salzig]: ");
        if (!validInputs.includes(geschmack)) {
            console.log("Ungültige Eingabe. Bitte wählen Sie entweder 'süß' oder 'salzig'.");
        }
    } while (!validInputs.includes(geschmack));

    if (geschmack === "süß") {
        console.log("Wie wäre es mit Churros? 🍩");
    } else if (geschmack === "salzig") {
        console.log("Wie wäre es mit Tacos? 🌮");
    }
}

// Funktion für den "Zurück"-Befehl
export function back() {
    console.log("Zurück zum Hauptmenü.");
}

// Rezept-Vorschlag basierend auf vorhandenen Zutaten
export function suggestRecipe() {
    console.log("\nRezepte vorschlagen:");
    const availableIngredients = ingredients.filter(item => item.quantity > 0);
    const suggestedRecipes = recipes.filter(recipe => {
        return recipe.ingredients.every(ingredient =>
            availableIngredients.some(ai => ai.name === ingredient.name && ai.quantity >= ingredient.quantity)
        );
    });

    if (suggestedRecipes.length > 0) {
        console.log("Folgende Rezepte kannst du kochen:");
        suggestedRecipes.forEach((recipe, index) => {
            console.log(`${index + 1}. ${recipe.name}`);
        });
    } else {
        console.log("Keine passenden Rezepte gefunden.");
    }
}
