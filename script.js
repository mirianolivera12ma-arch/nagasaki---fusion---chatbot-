// Funciones del chatbot

function mostrarSeccion(seccion) {
  let mensaje = '';
  switch(seccion) {
    case 'makisClásicos':
      mensaje = `🍣 Makis Clásicos - Los clásicos de siempre, con ingredientes frescos y sabor auténtico.
“Desde el primer bocado, siente la tradición japonesa con un toque fusión piurano.”

Opciones:
- Ver lista completa de makis con precios
- Volver al menú`;
      crearBotones([
        {texto: "Ver lista completa de makis", accion: verMakis},
        {texto: "Volver al menú", accion: volverMenu}
      ]);
      break;

    case 'makisEspeciales':
      mensaje = `🔥 Makis Especiales - Combinaciones únicas y atrevidas para los paladares más exigentes.
“Atrévete a probar nuestros makis que llevan tu paladar a otra dimensión.”

Opciones:
- Ver lista completa de makis especiales
- Volver al menú`;
      crearBotones([
        {texto: "Ver lista completa de makis especiales", accion: verMakisEspeciales},
        {texto: "Volver al menú", accion: volverMenu}
      ]);
      break;

    case 'barcos':
      mensaje = `🚢 Barcos - Opciones para compartir y sorprender.
“Porque compartir también es saborear. Descubre nuestros barcos llenos de fusión y frescura.”

Opciones:
- Ver lista completa de barcos
- Volver al menú`;
      crearBotones([
        {texto: "Ver lista completa de barcos", accion: verBarcos},
        {texto: "Volver al menú", accion: volverMenu}
      ]);
      break;

    case 'bebidas':
      mensaje = `🍹 Bebidas - Refrescos, cocteles y más para acompañar tu comida.
“El complemento perfecto para cada bocado, con el toque único de Nasnagasaki Fusión Piura.”

Opciones:
- Ver lista completa de bebidas
- Volver al menú`;
      crearBotones([
        {texto: "Ver lista completa de bebidas", accion: verBebidas},
        {texto: "Volver al menú", accion: volverMenu}
      ]);
      break;
  }
  agregarMensaje(mensaje, 'bot');
}

function crearBotones(listaBotones) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.classList.add('bot-message', 'botones');
  listaBotones.forEach(b => {
    const btn = document.createElement('button');
    btn.innerText = b.texto;
    btn.onclick = b.accion;
    div.appendChild(btn);
  });
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function agregarMensaje(texto, tipo) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.classList.add(tipo === 'bot' ? 'bot-message' : 'user-message');
  div.innerText = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function volverMenu() {
  mostrarSeccion('menu');
}

function verMakis() {
  agregarMensaje(`Lista de Makis Clásicos:
Guacamole - S/25
Acevichado - S/25
Avocado - S/25
Tropical - S/25
Chicken Furai - S/25
Criollazo - S/25
Ebi Crispy - S/25
Grill Cheese - S/25
Parrillero de Salmón - S/25
Oriental - S/25
Teriyaki Roll - S/25
Tarta Roll - S/25
Ají de Gallina Roll - S/25
Dragón Roll - S/25
Noriko Roll - S/25
Mango Roll - S/25
Cebichado Tropical - S/25`, 'bot');
}

function verMakisEspeciales() {
  agregarMensaje(`Lista de Makis Especiales:
Nagasaki Furai - S/28
Crispy Roll - S/28
Crazy Roll - S/28
Nagasaki Hawaiano - S/28
Parmesano Roll - S/28
Tako Roll - S/28
Nigiri Ebi Furai - S/28
Nagasaki - S/28
Lomo Saltado Roll - S/28
Cebiche Power Roll - S/28
Anticuchero - S/28
Batayaki Roll - S/28`, 'bot');
}

function verBarcos() {
  agregarMensaje(`Lista de Barcos:
Barcos Nagasaki - Makis (5 Tablas) - S/110
Barcos Nagasaki - Makis (7 Tablas) - S/150
Barcos Nagasaki - Makis (9 Tablas) - S/180
Barcos Nagasaki - Makis (13 Tablas) - S/260
Barcos Nagasaki - Alitas (30 Piezas) - S/110
Barcos Nagasaki - Alitas (50 Piezas) - S/170
Barcos Nagasaki - Makis y Alitas (4 Tablas) - S/140
Barcos Nagasaki - Makis y Alitas (8 Tablas) - S/260
Barco Criollazo - S/100
Barco Marino - S/100
Barco Umitochi - S/100`, 'bot');
}

function verBebidas() {
  agregarMensaje(`Lista de Bebidas:
Cuba Libre - S/20
Laguna Azul - S/20
Vodka Sunrise - S/20
Machupicchu - S/20
Tinto de Verano - S/20
Piña Colada - S/20
Hawaiian Blue - S/20
Algarrobina - S/20
Amor en Llamas - S/20
Sex on the Beach - S/20
Refrescos de Frutas (Litro) - S/15
Frozen de Frutas - S/20
Refrescante - S/15`, 'bot');
}

// Sección menú principal
function mostrarSeccion(seccion) {
  if(seccion === 'menu') {
    agregarMensaje("¡Hola de nuevo! 👋 ¿Qué deseas conocer?", 'bot');
    crearBotones([
      {texto: "Makis Clásicos 🍣", accion: () => mostrarSeccion('makisClásicos')},
      {texto: "Makis Especiales 🔥", accion: () => mostrarSeccion('makisEspeciales')},
      {texto: "Barcos 🚢", accion: () => mostrarSeccion('barcos')},
      {texto: "Bebidas 🍹", accion: () => mostrarSeccion('bebidas')}
    ]);
  } else {
    mostrarSeccionOriginal(seccion);
  }
}

// Función original para manejar otras secciones
function mostrarSeccionOriginal(seccion) {
  switch(seccion) {
    case 'makisClásicos':
    case 'makisEspeciales':
    case 'barcos':
    case 'bebidas':
      // ya manejado arriba
      break;
  }
}
