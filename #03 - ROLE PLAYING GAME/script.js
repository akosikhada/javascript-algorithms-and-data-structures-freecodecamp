// Variables for tracking player stats and the game state
let xp = 0; // Experience points
let health = 100; // Player's health
let gold = 50; // Player's gold
let currentWeapon = 0; // The index of the current weapon in the weapons array
let fighting; // Keeps track of which monster the player is fighting
let monsterHealth; // Stores the health of the current monster
let inventory = ["stick"]; // Player's inventory, starting with a stick

// References to DOM elements for buttons and game text
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Weapons and monsters are stored in arrays, each with their properties
const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];

const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 },
];

// Locations array represents different places in the game
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg], // Hidden feature trigger
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;", // Death message
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;", // Winning message
  },
  {
    name: "easter egg", // Secret game that the player can access
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

// Initialize buttons to start the game at the town square
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// This function updates the screen with information about the current location
function update(location) {
  monsterStats.style.display = "none"; // Hide monster stats
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text; // Update text for the current location
}

// Functions to navigate to different locations
function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

// Buying health when the player has enough gold
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

// Buying a weapon if the player can afford it
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon; // Offer to sell the weapon if it's the most powerful
  }
}

// Selling a weapon for gold
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift(); // Sell the first weapon in inventory
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// Fighting a specific monster
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

// Sets up the fight screen with monster stats
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block"; // Show monster stats
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

// Attack action where the player tries to fight the monster
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level); // Monster's attack
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // Player's attack
  } else {
    text.innerText += " You miss."; // Missed attack
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose(); // Player lost
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame(); // Player wins the game if they defeat the dragon
    } else {
      defeatMonster(); // Defeated the monster
    }
  }

  // If weapon breaks (10% chance), decrease the player's weapon
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

// Get the attack value of a monster based on its level
function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp); // Monster's attack damage
  console.log(hit); // For debugging
  return hit > 0 ? hit : 0; // Avoid negative damage
}

// Check if the player hits the monster (with a chance to miss)
function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

// Dodge the monster's attack
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

// When a monster is defeated
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); // Earn gold
  xp += monsters[fighting].level; // Gain experience
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]); // Update to the "kill monster" location
}

// If the player loses
function lose() {
  update(locations[5]); // Update to the lose screen
}

// If the player wins
function winGame() {
  update(locations[6]); // Update to the win screen
}

// Restart the game
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"]; // Reset to starting inventory
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown(); // Go back to the town
}

// Easter egg game trigger
function easterEgg() {
  update(locations[7]); // Go to the hidden easter egg game
}

// Functions for picking numbers in the secret game
function pickTwo() {
  pick(2); // Pick number 2
}

function pickEight() {
  pick(8); // Pick number 8
}

// Secret game logic
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11)); // Generate random numbers between 0 and 10
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n"; // Show all random numbers
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!"; // If the guess is correct
    gold += 20; // Add gold to the player's account
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!"; // If the guess is wrong
    health -= 10; // Lose health
    healthText.innerText = health;
    if (health <= 0) {
      lose(); // If health reaches 0, the player loses
    }
  }
}
