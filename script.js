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
    addBot("¡Bienvenid@ a *Nagasaki Fusión*! 🍣🔥\nSoy el Chefcito Nagasaki. ¿Qué te provocaría ver hoy?");
    
    addButton("Makis Clásicos 🍣", showClasicos);
    addButton("Makis Especiales 🔥", showEspeciales);
    addButton("Barcos 🚢", showBarcos);
    addButton("Bebidas 🍹", showBebidas);
    addButton("Promos 🎉", showPromos);
    addButton("Buscar 🔍", searchMode);
    addButton("Delivery 🛵", delivery);
    addButton("Redes Sociales 📱", redes);
}

function showClasicos() {
    clearButtons();
    addBot("🍣 *Makis Clásicos*");

    addBot("Acevichado – S/25\nRoll fresco con ceviche clásico encima. Cremoso + ácido 😋");
    addBot("Mango Roll – S/25\nDulce y frutal, con topping de mango.");
    addBot("Guacamole – S/25\nPollo, queso crema y salsa guacamole.");

    addButton("Más clásicos", showClasicos2);
    addButton("Volver", mainMenu);
}

function showClasicos2() {
    clearButtons();
    addBot("Más clásicos 🍣");

    addBot("Avocado – S/25\nPalta cremosa con ebi furai.");
    addBot("Chicken Furai – S/25\nPollo crocante.");
    addBot("Dragón Roll – S/25\nEbi furai con salsa dragón 🔥.");

    addButton("Volver", mainMenu);
}

function showEspeciales() {
    clearButtons();
    addBot("🔥 *Makis Especiales del Chef*");

    addBot("Nagasaki Furai – S/28\nQueso crema, palta, ebi furai + topping de atún.");
    addBot("Crispy Roll – S/28\nSalmón, queso y crocante.");

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

    addBot("60 cortes – S/110");
    addBot("84 cortes – S/150");

    addButton("Volver", mainMenu);
}

function showBebidas() {
    clearButtons();
    addBot("🍹 *Bebidas y Tragos*");

    addBot("Cerveza Pilsen – S/8");
    addBot("Frozen – S/20");
    addBot("Chilcano – S/20");

    addButton("Más bebidas", showBebidas2);
    addButton("Volver", mainMenu);
}

function showBebidas2() {
    clearButtons();
    addBot("Más bebidas 🍸");

    addBot("Sangría – S/40");
    addBot("Piña Colada – S/20");
    addBot("Moai – S/25");

    addButton("Volver", mainMenu);
}

function showPromos() {
    clearButtons();
    addBot("🎉 *Promociones*");

    addBot("Festival Alitas – S/60");
    addBot("Piqueo Hot – S/60");

    addButton("Volver", mainMenu);
}

function searchMode() {
    clearButtons();
    addBot("🔍 Escribe el ingrediente que buscas (pollo, salmón, palta…)");

    addButton("Volver", mainMenu);
}

function delivery() {
    clearButtons();
    addBot("🛵 Delivery disponible en Piura y Castilla.\nPedidos por Rappi y PedidosYa.");

    addButton("Volver", mainMenu);
}

function redes() {
    clearButtons();
    addBot("📱 Redes Oficiales:\nFacebook: Negasaki Fusion\nInstagram: @nagasaki_fusion_piura\nTikTok: @negasakifusion");

    addButton("Volver", mainMenu);
}

mainMenu();
