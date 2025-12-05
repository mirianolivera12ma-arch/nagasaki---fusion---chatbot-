const chatBox = document.getElementById("chat-box");

// Enviar mensaje
function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";
  processUserMessage(text.toLowerCase());
}

// Añadir mensaje al chat
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerHTML = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// MENÚ PRINCIPAL
function showMenu() {
  addMessage(
    `
¡Hola! 👋 Bienvenid@ a <b>Nagasaki Fusión</b> 🍣🔥  
Somos especialistas en gastronomía nikkei y fusión en Piura.  

<b>Elige una opción:</b>
    `,
    "bot"
  );

  addOptionButtons();
}

// Botones
function addOptionButtons() {
  const options = [
    { n: 1, txt: "Makis Clásicos 🍣" },
    { n: 2, txt: "Makis Especiales 🔥" },
    { n: 3, txt: "Barcos 🚢" },
    { n: 4, txt: "Bebidas 🍹" },
    { n: 5, txt: "Promos 🎉" },
    { n: 6, txt: "Hacer Pedido 📦" },
    { n: 7, txt: "Delivery 🛵" },
    { n: 8, txt: "Redes Sociales 📱" },
    { n: 9, txt: "Horario y Dirección 🕒📍" }
  ];

  options.forEach(op => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.innerText = `${op.n}️⃣ ${op.txt}`;
    btn.onclick = () => processUserMessage(`${op.n}`);
    chatBox.appendChild(btn);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// RESPUESTAS SEGÚN OPCIÓN
function processUserMessage(msg) {

  // Opción 1 - Makis Clásicos
  if (msg == "1") {
    addMessage(
      `
<b>🥢 MAKIS CLÁSICOS (10 cortes)</b>

Acevichado — S/25  
California — S/25  
Furai — S/25  
Maguro — S/25  
Panko Roll — S/25  
Spicy Roll — S/25  
Nagasaki Roll — S/25  

⬅️ Escribe "menú" para volver.
      `,
      "bot"
    );
    return;
  }

  // Opción 2 - Makis Especiales
  if (msg == "2") {
    addMessage(
      `
<b>🔥 MAKIS ESPECIALES (12 cortes)</b>

Nagasaki Furai — S/28  
Crazy Roll — S/28  
Parmesano Roll — S/28  
Tako Roll — S/28  
Nigiri Ebi Furai — S/28  
Lomo Saltado Roll — S/28  
Cebiche Power Roll — S/28  

⬅️ Escribe "menú" para volver.
      `,
      "bot"
    );
    return;
  }

  // Opción 3 - Barcos
  if (msg == "3") {
    addMessage(
      `
<b>🚢 BARCOS NAGASAKI</b>

60 cortes — S/110  
84 cortes — S/150  
108 cortes — S/180  
156 cortes — S/260  

<b>Barcos de Alitas:</b>  
30 piezas — S/110  
50 piezas — S/170  

⬅️ Escribe "menú" para volver.
      `,
      "bot"
    );
    return;
  }

  // Opción 4 - Bebidas
  if (msg == "4") {
    addMessage(
      `
<b>🍹 BEBIDAS</b>

Refrescos — S/15  
Frozen — S/20  
Gaseosas — S/6  
Cervezas — Desde S/8  

⬅️ Escribe "menú" para volver.
      `,
      "bot"
    );
    return;
  }

  // Opción 5 - Promos
  if (msg == "5") {
    addMessage(
      `
<b>🎉 PROMOCIONES DEL DÍA</b>

🔥 Combo Maki Lovers — S/32.90  
🔥 Ramen Night — S/24.90  
🔥 Maki Dúo — S/27.90  
🛵 Delivery gratis desde S/50  

⬅️ Escribe "menú" para volver.
      `,
      "bot"
    );
    return;
  }

  // Opción 6 - Hacer Pedido
  if (msg == "6") {
    addMessage(
      `
<b>📦 ¡Perfecto! Vamos con tu pedido:</b>

1️⃣ ¿Qué plato deseas ordenar?  
2️⃣ ¿Cantidad?  
3️⃣ ¿Para recoger o delivery?  
4️⃣ Tu nombre y número de contacto  

🛒 Métodos de pago: Yape, Plin, efectivo.  
🛵 Delivery en Piura y Castilla.

⬅️ Escribe "menú" para volver.
      `,
      "bot"
    );
    return;
  }

  // Opción 7 - Delivery
  if (msg == "7") {
    addMessage(
      `
<b>🛵 DELIVERY NAGASAKI FUSIÓN</b>

Contamos con servicio mediante:  
✔️ PedidosYa  
✔️ Rappi  

Cobertura amplia por Piura y Castilla.  
Nuestro equipo cuida cada pedido para que llegue fresco y en perfectas condiciones 🍣✨  

<b>Cualquier duda, aquí estoy para ayudarte 🤝✨</b>

⬅️ Escribe "menú" para volver.
      `,
      "bot"
    );
    return;
  }

  // Opción 8 - Redes Sociales
  if (msg == "8") {
    addMessage(
      `
<b>📱 NUESTRAS REDES SOCIALES</b>

En Nagasaki Fusión siempre compartimos contenido fresco, creativo y lleno de sabor.  
Ahí podrás ver fotos reales de nuestros platos, promos y novedades diarias.  

💙 Facebook: <b>Nagasaki Fusión Piura</b>  
📸 Instagram: <b>@nagasakifusion.piura</b>  
🎵 TikTok: <b>@nagasakifusión</b>  

¡Te esperamos para que formes parte de nuestra comunidad! ✨  

⬅️ Escribe "menú" para volver.
      `,
      "bot"
    );
    return;
  }

  // Opción 9 - Horario y Dirección
  if (msg == "9") {
    addMessage(
      `
<b>📍 HORARIO Y DIRECCIÓN</b>

📌 <b>Av. Andrés Avelino Cáceres 185</b>  
Frente al Colegio San Ignacio — Piura.

🕒 <b>Horario de atención:</b>  
Lunes a Domingo  
12:00 p.m. — 11:00 p.m.

¡Te esperamos con los mejores sabores de la fusión nikkei! 🍣✨  

⬅️ Escribe "menú" para volver.
      `,
      "bot"
    );
    return;
  }

  // Volver al menú
  if (msg.includes("menú")) {
    showMenu();
    return;
  }

  // Cualquier otro texto
  addMessage("No entendí eso 😅, por favor elige una opción del menú.", "bot");
}

// Iniciar chat vacío (el usuario debe escribir primero)
setTimeout(() => {
  addMessage("¡Hola! Escribe <b>hola</b> para comenzar 🤗", "bot");
}, 600);

// Cuando el usuario escriba hola → mostrar menú
function processUserMessageCheckHello(text) {
  if (text === "hola") showMenu();
}
