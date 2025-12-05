// Chatbot Nagasaki Fusión 🍣🔥
// Basado en la carta, promociones y datos proporcionados

function appendMessage(sender, text) {
    const chatBox = document.getElementById("chatBox");
    const message = document.createElement("div");
    message.className = sender === "bot" ? "bot-message" : "user-message";
    message.innerText = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function botResponse(message) {
    message = message.toLowerCase();

    if (message.includes("hola") || message.includes("menú") || message.includes("menu")) {
        return `
🍣 Bienvenid@ a *Nagasaki Fusión* 🔥  

Selecciona una opción:

1️⃣ Ver nuestra carta  
2️⃣ Promociones del día 🎉  
3️⃣ Hacer un pedido 📦  
4️⃣ Horario y dirección 🕒  
5️⃣ Hablar con un asesor 👤

Visítanos también en: https://gptonline.ai/
        `;
    }

    // Opción 1
    if (message.includes("1")) {
        return `
📜 *CARTA PRINCIPAL – NAGASAKI FUSIÓN* 🍣🔥

🍱 *Makis (10 cortes)*  
- Acevichado  
- California  
- Furai  
- Maguro  
- Panko Roll  
- Spicy Roll  
- Nagasaki Roll (especial de la casa)

🍜 *Ramen*  
- Tonkotsu  
- Pollo  
- Veggie

🍚 *Bowls*  
- Yakimeshi Pollo  
- Yakimeshi Mixto  
- Teriyaki Bowl  
- Katsu Bowl

🔥 *Especiales Nikkei*  
- Tartar de Atún  
- Gohan Especial  
- Saltado Oriental

Escribe: *ver fotos* para ver imágenes  
Escribe: *menú* para volver.
        `;
    }

    // Opción 2
    if (message.includes("2")) {
        return `
🎉 *PROMOCIONES DEL DÍA* 🎉

🥢 Promo 1: *Combo Maki Lovers*  
2 makis clásicos + bebida → S/ 32.90

🍜 Promo 2: *Ramen Night*  
Tabla de maki + bebida → S/ 24.90

🍚 Promo 3: *Maki Dúo*  
2 bowls → S/ 27.90

🛵 Delivery GRATIS desde S/ 50

Dime: *hacer pedido* para ordenar.
        `;
    }

    // Opción 3
    if (message.includes("3") || message.includes("pedido")) {
        return `
📦 *HACER PEDIDO*  

Necesito estos datos:

1️⃣ ¿Qué plato o promo deseas?  
2️⃣ ¿Cantidad?  
3️⃣ ¿Recojo o delivery?  
4️⃣ Nombre y número

💳 Pagos: Yape / Plin / Efectivo  
📍 Cobertura: Piura y Castilla
        `;
    }

    // Opción 4
    if (message.includes("4")) {
        return `
📍 *HORARIO Y DIRECCIÓN*

📌 Av. Andrés Avelino Cáceres 185  
Frente al Colegio San Ignacio – Piura

🕒 12:00 p.m. – 11:00 p.m.  
🛵 Delivery disponible

Escribe *menú* para volver.
        `;
    }

    // Opción 5
    if (message.includes("5")) {
        return `
👤 *HABLAR CON ASESOR*

Un asesor se unirá a la conversación  
⏳ Tiempo estimado: 1 a 3 minutos  
🕒 12:00 p.m. – 11:00 p.m.
        `;
    }

    // Fotos
    if (message.includes("foto") || message.includes("fotos") || message.includes("ver fotos")) {
        return `
📸 *FOTOS DE PLATOS*  
(Puedes reemplazar estas líneas con imágenes reales)

🍣 Acevichado  
🍣 Furai  
🍣 Nagasaki Roll  
🍜 Tonkotsu Ramen  
🍚 Yakimeshi  
🔥 Tartar de Atún  

Dime un plato específico para mostrar su foto.
        `;
    }

    return "No entendí 😅 Escribe *menú* para ver las opciones.";
}

document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("userInput");
    const userText = input.value.trim();
    if (userText === "") return;

    appendMessage("user", userText);
    input.value = "";

    setTimeout(() => {
        appendMessage("bot", botResponse(userText));
    }, 400);
});
