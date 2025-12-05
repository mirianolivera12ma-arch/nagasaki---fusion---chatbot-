const chat = document.getElementById("chat");

function addMessage(text, sender = "bot") {
    const msg = document.createElement("div");
    msg.className = sender === "bot" ? "bot-message" : "user-message";
    msg.innerText = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
    let input = document.getElementById("userInput");
    let text = input.value.trim();
    if (text === "") return;
    addMessage(text, "user");

    processUserMessage(text);

    input.value = "";
}

function startChat() {
    addMessage("¡Bienvenid@ a Nagasaki Fusión! 🍣🔥\nSoy el Chefcito Nagasaki y estoy aquí para ayudarte a elegir el maki perfecto o la bebida ideal.\n\n¿Qué te gustaría ver hoy?");
    showMainMenu();
}

function showMainMenu() {
    addMessage("Menú Principal:\n\n1️⃣ Makis Clásicos\n2️⃣ Makis Especiales\n3️⃣ Barcos Nagasaki\n4️⃣ Bebidas 🍹\n5️⃣ Promos 🎉\n6️⃣ Buscar por ingrediente 🔍\n7️⃣ Delivery 🛵\n8️⃣ Redes Sociales 📱");
}

function processUserMessage(text) {
    text = text.toLowerCase();

    if (text.includes("1")) showMakisClasicos();
    else if (text.includes("2")) showMakisEspeciales();
    else if (text.includes("3")) showBarcos();
    else if (text.includes("4")) showBebidas();
    else if (text.includes("5")) showPromos();
    else if (text.includes("6")) buscarIngredientes();
    else if (text.includes("7")) showDelivery();
    else if (text.includes("8")) showRedes();
    else addMessage("No entendí eso 🙈. Escribe un número del menú.");
}
