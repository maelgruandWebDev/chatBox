// Récupère les éléments de la page
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chatBox");
const reset = document.getElementById("clearChat");

// Liste des commandes disponibles pour le bot
const botCommands = {
  "/salut": "Salut ! Comment puis-je t'aider ?",
  "/help": "Voici quelques commandes disponibles :\n/hello - Salutation\n/help - Liste des commandes\n/about - À propos de ce bot\n/coding - Liker Coding\n/like - Liker l'application",
  "/about": "Je suis un bot de chat simple. Je réponds à certaines commandes. \n Pour obtenir de l'aide, tapez /help",
  "/coding": "Tu aimes coder, 😊",
  "/clear": "Chat effacé !",
  "/like": "Merci d'aimer l'application",
  "/font": "La police est Poppins : Aller sur Google Fonts",
};

// Fonction pour ajouter un message au chat
function addMessage(message, fromUser = true) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if (fromUser) {
    messageElement.classList.add("from-user");
  } else {
    messageElement.classList.add("from-bot");  // Ajout du style pour les messages du bot
  }
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Faire défiler vers le bas
}

// Fonction pour envoyer un message
function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    addMessage(message); // Afficher le message de l'utilisateur
    messageInput.value = ""; // Réinitialiser le champ de saisie
    messageInput.focus(); // Revenir à l'input

    // Vérifier si le message est une commande
    if (message.startsWith("/")) {
      handleBotCommand(message);
    } else {
      talkUser(message);
    }
  }
}

// Fonction pour afficher le message de l'utilisateur dans le chat
function talkUser(message) {
  const dialogue = {
    "Salut": "Bonjour, bienvenue sur l'application ChatBox",
    "Qui est tu ?": "Je suis le bot de chat de l'application ChatBox",
    "Des commandes": "Les commandes sont visibles en tapant : /help",
  };

  // Si le message correspond à une clé dans le dialogue, afficher la réponse du bot
  if (dialogue[message]) {
    addMessage(dialogue[message], false); // Réponse du bot
  } else {
    addMessage("Désolé, je ne comprends pas cette question. Tapez /help pour plus d'infos.", false); // Réponse par défaut
  }
}

// Fonction pour gérer les commandes du bot
// Fonction pour gérer les commandes du bot
function handleBotCommand(command) {
  // Réponse en fonction de la commande
  const response = botCommands[command] || "Désolé, je ne comprends pas cette commande.";

  if (command === "/like") {
    addLike(); // Afficher le message personnalisé sans utiliser le dictionnaire botCommands
  } else {
    if (command !== "/clear") {
      addMessage(response, false); // Réponse du bot pour les autres commandes
    }
  }

  if (command === "/clear") {
    clearChat();
  }
}


// Ajouter un événement pour le bouton d'envoi
sendButton.addEventListener("click", sendMessage);

// Ajouter un événement pour appuyer sur "Entrée" pour envoyer un message
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Fonction pour effacer le chat
function clearChat() {
  chatBox.innerHTML = "";
  console.log("Chat effacé !");
}

// Fonction pour afficher un message de remerciement pour le "like"
// Fonction pour afficher un message de remerciement pour le "like"
function addLike() {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add("from-bot"); // Le message provient du bot
  messageElement.textContent = "Merci d'aimer l'application";
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Ajouter un événement pour le bouton de réinitialisation
reset.addEventListener("click", clearChat);
