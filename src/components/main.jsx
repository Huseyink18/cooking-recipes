import rls from "readline-sync";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

import {
  isValidUnit,
  clear,
  findIndexInList,
  convertUnit,
  quantityCredit,
  quantitySeperator,
  showList,
  selectRecipe,
  listingList,
  addFood,
  main,
} from "./Einkaufsmanager.js";

import { chooseCuisine, back, suggestRecipe } from "./hueseyin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, "users.json");

// Lade Benutzerdaten aus der Datei
function loadUsers() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
}

// Speichere Benutzerdaten in die Datei
function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

let users = loadUsers();

function signUp() {
  clear();
  const username = rls.question("👤 Wählen Sie einen Benutzernamen: ");
  const password = rls.question("🔒 Wählen Sie ein Passwort: ", {
    hideEchoBack: true,
  });

  let userExists = users.some((user) => user.username === username);

  if (userExists) {
    console.log(
      "❌ Dieser Benutzername ist bereits vergeben. Bitte wählen Sie einen anderen."
    );
    signUp();
  } else {
    users.push({ username: username, password: password });
    saveUsers(users);
    clear();
    console.log("✅ Sie haben sich erfolgreich angemeldet!");
    start();
  }
}

function showCategories() {
  clear();
  const categories = {
    snacks: [
      "🍟 Chipstüten",
      "🍬 Haribo",
      "🍫 Riegel",
      "🍫 Schokolade",
      "🍬 Bonbon",
      "Lakritz",
      "🍬 M&Ms",
    ],
    getraenke: [
      "🥤 Cola",
      "🥤 Fanta",
      "🥤 Root Beer",
      "🥤 Dr. Pepper",
      "🥤 Mosquito",
    ],
  };

  const categoryNames = Object.keys(categories);
  console.log("🍽️ Kategorien:");
  categoryNames.forEach((category, index) => {
    console.log(`${index + 1}. ${category}`);
  });

  const choice =
    rls.questionInt("Wählen Sie eine Kategorie (Geben Sie die Nummer ein): ") -
    1;

  if (choice >= 0 && choice < categoryNames.length) {
    const selectedCategory = categoryNames[choice];
    clear();
    console.log(`🍽️ Sie haben "${selectedCategory}" ausgewählt.`);
    console.log("Verfügbare Artikel in dieser Kategorie:");
    categories[selectedCategory].forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
    console.log("Guten Appetit! 😋");
  } else {
    console.log("❌ Ungültige Auswahl. Bitte versuchen Sie es erneut.");
    showCategories();
  }
}

// function afterLoginOrAddFood() {
//   const ingredients = shoppingList; // Angenommen, die Einkaufsliste enthält die Zutaten
//   suggestRecipe(ingredients);
// }

function login() {
  clear();
  const username = rls.question("👤 Geben Sie Ihren Benutzernamen ein: ");
  let user = users.find((user) => user.username === username);

  if (!user) {
    clear();
    console.log(
      "❌ Dieser Benutzername existiert nicht. Bitte melden Sie sich zuerst an."
    );
    signUp();
  } else {
    const password = rls.question("🔒 Geben Sie Ihr Passwort ein: ", {
      hideEchoBack: true,
    });

    if (user.password === password) {
      clear();
      console.log(`✅ Anmeldung erfolgreich! Willkommen, ${username}! 🎉`);

      const snackAnswer = rls.question("🍿 Möchtest du snacken? [y/n]: ");
      if (snackAnswer.toLowerCase() === "y") {
        showCategories();
      } else {
        const recipeAnswer = rls.question(
          "🥘 Hast du schon eingekauft für dein Lieblingsrezept? [y/n]: "
        );
        if (recipeAnswer.toLowerCase() === "y") {
          main();
          
        } else {
          console.log("🍲 Ok, dann folge mir einfach in die Geschmackswelt.");
          chooseCuisine();
          // afterLoginOrAddFood();
          
        }
      }
    } else {
      console.log("❌ Falsches Passwort. Bitte versuchen Sie es erneut.");
      login();
    }
  }
}

function start() {
  clear();
  console.log(
    "👋 Willkommen zu Hause! Die Küche ist für Sie vorbereitet. Bitte melden Sie sich zuerst an, um loszulegen."
  );

  const answer = rls.question("Haben Sie bereits ein Konto? (ja/nein): ");

  if (answer.toLowerCase() === "ja") {
    clear();
    if (users.length === 0) {
      console.log(
        "❌ Es gibt keine Benutzerkonten. Bitte erstellen Sie ein Konto."
      );
      signUp();
    } else {
      login();
    }
  } else if (answer.toLowerCase() === "nein") {
    signUp();
  } else {
    console.log("❌ Bitte geben Sie Ja oder Nein ein.");
    start();
  }
}

// Starte das Programm mit der start()-Funktion
start();
