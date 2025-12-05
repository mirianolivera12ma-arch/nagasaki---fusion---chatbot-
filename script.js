const chat = document.getElementById("chat");
const buttons = document.getElementById("buttons");

function addBot(text) {
    let m = document.createElement("div");
    m.className = "bot-msg";
    m.innerText = text;
    chat.appendChild(m);
    chat.scrollTop = chat.scrollHeight;
}

function addUser(text) {
    let m = document.createElement("div");
    m.className = "user-msg";
    m.innerText = text;
    chat.appendChild(m);
    chat.scrollTop = chat.scrollHeight;
}

function clearButtons() {
    buttons.innerHTML = "";
}

function addButton(text, fn) {
    const b = document.createElement("button");
    b.innerText = text;
    b.onclick = fn;
    buttons.appendChild(b);
}

function mainMenu() {
    clearButtons();
    addBot("Perfecto 😄✨\nAquí tienes nuestras opciones del menú:");

    addButton("Makis Clásicos 🍣", showClasicos);
    addButton("Makis Especiales 🔥", showEspeciales);
    addButton("Barcos 🚢", showBarcos);
    addButton("Bebidas 🍹", showBebidas);
    addButton("Promos 🎉", showPromos);
    addButton("Delivery 🛵", showDelivery);
    addButton("Redes Sociales 📱", showRedes);
}

// 📌 Espera que el usuario diga “hola”
window.onload = () => {
    addBot("¡Hola! 👋 Soy el *Chefcito Nagasaki* 🍣🔥\n\nEscríbeme **hola** para comenzar.");
};

function processText(text) {
    text = text.toLowerCase();

    if (text.includes("hola") || text.includes("buenas") || text.includes("ola")) {
        addUser(text);
        addBot("¡Qué gusto tenerte por aquí! 😄🍣🔥");
        mainMenu();
        return;
    }

    addUser(text);
    addBot("No entendí eso 😅\nEscribe **hola** para empezar.");
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const input = document.getElementById("userInputField");
    }
});

// --- SECCIONES --- //

function showClasicos() {
    clearButtons();
    addBot("🍣 *Makis Clásicos*");

    addBot("Acevichado – S/25\nRoll fresquito con ceviche clásico encima.");
    addBot("Mango Roll – S/25\nDulce, suave y frutal.");
    addBot("Guacamole – S/25\nPollo, queso crema y guacamole 😋");

    addButton("Más clásicos", showClasicos2);
    addButton("Volver", mainMenu);
}

function showClasicos2() {
    clearButtons();
    addBot("Más clásicos 🍣");

    addBot("Avocado – S/25\nEbi furai + palta cremosa.");
    addBot("Chicken Furai – S/25\nPollo crocante y palta.");
    addBot("Dragón Roll – S/25\nEbi furai con salsa dragón 🔥.");

    addButton("Volver", mainMenu);
}

function showEspeciales() {
    clearButtons();
    addBot("🔥 *Makis Especiales del Chef*");

    addBot("Nagasaki Furai – S/28\nQueso crema + ebi furai + topping de atún.");
    addBot("Crispy Roll – S/28\nCrocante con toque dulce.");

    addButton("Más especiales", showEspeciales2);
    addButton("Volver", mainMenu);
}

function showEspeciales2() {
    clearButtons();
    addBot("Más especiales 🔥");

    addBot("Lomo Saltado Roll – S/28\nFusión peruano-japonesa.");
    addBot("Tako Roll – S/28\nPulpo al olivo + ebi.");

    addButton("Volver", mainMenu);
}

function showBarcos() {
    clearButtons();
    addBot("🚢 *Barcos Nagasaki*");

    addBot("60 cortes – S/110\nPerfecto para compartir.");
    addBot("84 cortes – S/150\nPara grupos y antojos grandes 😋");

    addButton("Volver", mainMenu);
}

function showBebidas() {
    clearButtons();
    addBot("🍹 *Bebidas y Tragos*");

    addBot("Cerveza Pilsen – S/8");
    addBot("Frozen de frutas – S/20");
    addBot("Chilcano clásico – S/20");

    addButton("Más bebidas", showBebidas2);
    addButton("Volver", mainMenu);
}

function showBebidas2() {
    clearButtons();
    addBot("🍸 Más bebidas");

    addBot("Sangría Clásica – S/40");
    addBot("Piña Colada – S/20");
    addBot("Moai – S/25");

    addButton("Volver", mainMenu);
}

function showPromos() {
    clearButtons();
    addBot("🎉 *Promociones activas*");

    addBot("Festival Alitas – S/60");
    addBot("Piqueo Hot – S/60");

    addButton("Volver", mainMenu);
}

function showDelivery() {
    clearButtons();
    addBot("🛵 *Delivery*\nDisponible en Piura y Castilla.\nPedidos por *Rappi* y *PedidosYa*.");

    addButton("Volver", mainMenu);
}

function showRedes() {
    clearButtons();
    addBot("📱 *Redes Oficiales*\nFacebook: Negasaki Fusion\nInstagram: @nagasaki_fusion_piura\nTikTok: @negasakifusion");

    addButton("Volver", mainMenu);
}
