/* script.js - Nagasaki Fusión Chatbot
   - inicia en blanco (espera 'hola' o botón Hola)
   - menú con: Makis Clásicos, Makis Especiales, Barcos, Bebidas, Promos, Horario y Dirección, Delivery, Redes Sociales
   - sin fotos; info ordenada y con espacios
*/

/* ---------- helpers ---------- */
const chatbox = document.getElementById('chatbox');
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const holaBtn = document.getElementById('holaBtn');

function addMessage(html, sender = 'bot') {
  const div = document.createElement('div');
  div.className = 'message ' + sender;
  div.innerHTML = html;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function userMessage(text) {
  const safe = escapeHtml(text);
  addMessage(safe, 'user');
}

function botMessage(html) {
  addMessage(html, 'bot');
}

function escapeHtml(s){
  if(!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ---------- events ---------- */
sendBtn.addEventListener('click', () => {
  const v = input.value.trim();
  if(!v) return;
  userMessage(v);
  handleInput(v.toLowerCase());
  input.value = '';
});

input.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    e.preventDefault();
    sendBtn.click();
  }
});

holaBtn.addEventListener('click', () => {
  // simulate user saying "hola"
  userMessage('Hola');
  handleInput('hola');
});

/* ---------- data: makis & bebidas (foco) ---------- */

const MAKIS_CLASICOS = [
  {icon:'🥑', name:'Guacamole', price:'S/25', desc:'Queso crema y pollo, cubierto con palta y tocino crocante.'},
  {icon:'🦑', name:'Acevichado', price:'S/25', desc:'Queso crema y pulpo con torres de ceviche clásico.'},
  {icon:'🥑', name:'Avocado', price:'S/25', desc:'Queso crema + ebi furai, cubierto con palta.'},
  {icon:'🍍', name:'Tropical', price:'S/25', desc:'Queso crema y pollo con salsa tropical.'},
  {icon:'🍗', name:'Chicken Furai', price:'S/25', desc:'Pollo frito + queso crema y palta.'},
  {icon:'🐟', name:'Ebi Crispy', price:'S/25', desc:'Salmón y palta, topping de rocoto ahumado.'},
  {icon:'🧀', name:'Grill Cheese', price:'S/25', desc:'Mariscos con queso fundido y topping parrillero.'},
  {icon:'🐟', name:'Parrillero de Salmón', price:'S/25', desc:'Queso crema, palta y salmón con chimichurri.'},
  {icon:'🌶️', name:'Oriental', price:'S/25', desc:'Palta + ebi furai y salsa oriental.'},
  {icon:'🍠', name:'Teriyaki Roll', price:'S/25', desc:'Ebi furai + salsa teriyaki de la casa.'}
];

const MAKIS_ESPECIALES = [
  {icon:'🔥', name:'Nagasaki Furai', price:'S/28', desc:'Queso crema, palta y ebi furai con topping de atún.'},
  {icon:'🥓', name:'Crispy Roll', price:'S/28', desc:'Salmón + ebi furai con topping de palta.'},
  {icon:'🍌', name:'Crazy Roll', price:'S/28', desc:'Salmón cubierto con láminas de plátano.'},
  {icon:'🍓', name:'Nagasaki Hawaiano', price:'S/28', desc:'Pollo, queso crema y cobertura de fresa y maracuyá.'},
  {icon:'🧀', name:'Parmesano Roll', price:'S/28', desc:'Pollo y mayonesa Batayaki con toque parmesano.'},
  {icon:'🐙', name:'Tako Roll', price:'S/28', desc:'Ebi furai y topping de pulpo al olivo.'},
  {icon:'🍤', name:'Nigiri Ebi Furai', price:'S/28', desc:'Ebi furai con tartar y chicharrón de calamar.'},
  {icon:'🔥', name:'Lomo Saltado Roll', price:'S/28', desc:'Lomo y plátano con queso fundido.'},
  {icon:'🔋', name:'Cebiche Power Roll', price:'S/28', desc:'Ceviche clásico y chicharrón de pescado sobre roll.'},
  {icon:'🍣', name:'Batayaki Roll', price:'S/28', desc:'Mariscos Batayaki con teriyaki y topping especial.'}
];

const BEBIDAS = [
  {icon:'🥤', name:'Refrescos de Frutas (Litro)', price:'S/15', desc:'Maracuyá, Limón, Fresa, Piña, Naranja.'},
  {icon:'🍧', name:'Frozen de Frutas (Litro)', price:'S/20', desc:'Maracuyá, Limón, Fresa, Piña, Naranja.'},
  {icon:'🍺', name:'Cerveza Pilsen', price:'S/8', desc:'Cerveza nacional.'},
  {icon:'🍺', name:'Cusqueña de Trigo', price:'S/10', desc:'Cerveza nacional, edición trigo.'},
  {icon:'🍸', name:'Pisco Sour', price:'S/20', desc:'Clásico, Maracuyá, Fresa o Menta.'},
  {icon:'🍹', name:'Margarita', price:'S/25', desc:'Clásica o con sabores.'},
  {icon:'🥂', name:'Sangría (Litro)', price:'S/40', desc:'Sangría Clásica / Borracha / Blanca.'},
  {icon:'🧉', name:'Tragos Especiales', price:'S/25', desc:'Woman Red, Coco Loco, Selva Ardiente y más.'}
];

/* ---------- state for ordering ---------- */
let orderState = null; // { step: 0/1/2..., data: {} }

/* ---------- input handler (intent mapping) ---------- */
function handleInput(text) {
  if(!text) return;

  // if we are in an order flow
  if(orderState) {
    handleOrderFlow(text);
    return;
  }

  // basic keywords
  if(text.includes('hola') || text.includes('buenas')) {
    return showMenu();
  }
  if(text.match(/\b1\b/) || text.includes('makis clas') || text.includes('makis clásicos') || text.includes('clásicos')) {
    return showMakis();
  }
  if(text.match(/\b2\b/) || text.includes('especiales') || text.includes('makis especial')) {
    return showMakisEspeciales();
  }
  if(text.match(/\b3\b/) || text.includes('barco')) {
    return showBarcos();
  }
  if(text.match(/\b4\b/) || text.includes('bebida') || text.includes('bebidas')) {
    return showBebidas();
  }
  if(text.match(/\b5\b/) || text.includes('promo') || text.includes('promociones')) {
    return showPromos();
  }
  if(text.match(/\b6\b/) || text.includes('horario') || text.includes('dirección') || text.includes('direccion')) {
    return showHorario();
  }
  if(text.match(/\b7\b/) || text.includes('delivery') || text.includes('rappi') || text.includes('pedidosya')) {
    return showDelivery();
  }
  if(text.match(/\b8\b/) || text.includes('red') || text.includes('instagram') || text.includes('facebook') || text.includes('tiktok')) {
    return showRedes();
  }
  if(text.includes('hacer pedido') || text.includes('pedido') || text.includes('orden')) {
    return startOrder();
  }

  // fallback: show compact menu
  botMessage(`<b>No entendí exactamente.</b><br><br>Prueba escribiendo <b>hola</b> o el número de la opción:<br><br>
    <span class="btn-option" onclick="showMenu()">📋 Menú</span>
    <span class="btn-option" onclick="showMakis()">🍣 Makis Clásicos</span>
    <span class="btn-option" onclick="showBebidas()">🍹 Bebidas</span>
    <div class="small-note">También puedo ayudarte a armar un pedido. Escribe "hacer pedido".</div>`);
}

/* ---------- menu ---------- */
function showMenu(){
  botMessage(`
<b>¡Hola! 👋 Bienvenid@ a Nagasaki Fusión 🍣🔥</b><br><br>
Somos especialistas en gastronomía nikkei y fusión en Piura.<br><br>
📍 Av. Andrés Avelino Cáceres 185 — Frente al Colegio San Ignacio, Piura.<br><br>
Elige una opción:
<br><br>
<span class="btn-option" onclick="showMakis()">1️⃣ Makis Clásicos 🍣</span>
<span class="btn-option" onclick="showMakisEspeciales()">2️⃣ Makis Especiales 🔥</span>
<span class="btn-option" onclick="showBarcos()">3️⃣ Barcos 🚢</span>
<span class="btn-option" onclick="showBebidas()">4️⃣ Bebidas 🍹</span>
<span class="btn-option" onclick="showPromos()">5️⃣ Promos 🎉</span>
<span class="btn-option" onclick="showHorario()">6️⃣ Horario y Dirección 🕒</span>
<span class="btn-option" onclick="showDelivery()">7️⃣ Delivery 🛵</span>
<span class="btn-option" onclick="showRedes()">8️⃣ Redes Sociales 📱</span>
  `);
}

/* ---------- show lists (with spacing & delays) ---------- */

function showMakis(){
  botMessage(`<b>🍣 Makis Clásicos — Tabla de 10 cortes</b><br><br><div class="small-note">Precio referencial por tabla: S/25 — Cada tabla tiene 10 cortes.</div>`);
  MAKIS_CLASICOS.forEach((m,i) => {
    setTimeout(() => {
      botMessage(renderProduct(m));
    }, 180*(i+1));
  });
  setTimeout(() => {
    botMessage(`<div class="menu-compact"><b>¿Deseas hacer un pedido o ver bebidas?</b><br><br>
      <span class="btn-option" onclick="startOrder()">📦 Hacer pedido</span>
      <span class="btn-option" onclick="showBebidas()">🍹 Ver Bebidas</span>
      <span class="btn-option" onclick="showMenu()">⬅️ Menú</span>
      <div class="small-note">Cualquier cosa aquí estamos para lo que necesites.</div>
    </div>`);
  }, 180*(MAKIS_CLASICOS.length+1));
}

function showMakisEspeciales(){
  botMessage(`<b>🍣 Makis Especiales — Tabla de 12 cortes</b><br><br><div class="small-note">Precio referencial por tabla: S/28 — Cada tabla tiene 12 cortes.</div>`);
  MAKIS_ESPECIALES.forEach((m,i) => {
    setTimeout(() => botMessage(renderProduct(m)), 180*(i+1));
  });
  setTimeout(() => {
    botMessage(`<div class="menu-compact"><b>¿Quieres pedir una tabla especial?</b><br><br>
      <span class="btn-option" onclick="startOrder()">📦 Hacer pedido</span>
      <span class="btn-option" onclick="showMenu()">⬅️ Menú</span>
      <div class="small-note">Cualquier cosa aquí estamos para lo que necesites.</div>
    </div>`);
  }, 180*(MAKIS_ESPECIALES.length+1));
}

function showBarcos(){
  botMessage(`<b>🚢 Barcos Nagasaki</b><br><br><div class="small-note">Opciones listas para eventos y reuniones.</div>`);
  setTimeout(()=> botMessage(renderProduct({icon:'🛳️', name:'Barco Nagasaki - 5 Tablas (60 cortes)', price:'S/110', desc:'Sabores a elegir.'})), 200);
  setTimeout(()=> botMessage(renderProduct({icon:'🛳️', name:'Barco Nagasaki - 7 Tablas (84 cortes)', price:'S/150', desc:'Sabores a elegir.'})), 420);
  setTimeout(()=> botMessage(renderProduct({icon:'🛳️', name:'Barco Nagasaki - 9 Tablas (108 cortes)', price:'S/180', desc:'Sabores a elegir.'})), 640);
  setTimeout(()=> {
    botMessage(`<div class="menu-compact"><b>¿Deseas un barco para tu evento?</b><br><br>
      <span class="btn-option" onclick="startOrder()">📦 Pedir Barco</span>
      <span class="btn-option" onclick="showMenu()">⬅️ Menú</span>
      <div class="small-note">Cualquier cosa aquí estamos para lo que necesites.</div>
    </div>`);
  }, 900);
}

function showBebidas(){
  botMessage(`<b>🍹 Bebidas</b><br><br><div class="small-note">Elige entre nuestras bebidas más solicitadas:</div>`);
  BEBIDAS.forEach((b,i)=>{
    setTimeout(()=> botMessage(renderProduct(b)), 180*(i+1));
  });
  setTimeout(()=> {
    botMessage(`<div class="menu-compact"><b>¿Deseas agregar bebidas a tu pedido?</b><br><br>
      <span class="btn-option" onclick="startOrder()">📦 Hacer pedido</span>
      <span class="btn-option" onclick="showMenu()">⬅️ Menú</span>
      <div class="small-note">Cualquier cosa aquí estamos para lo que necesites.</div>
    </div>`);
  }, 180*(BEBIDAS.length+1));
}

function showPromos(){
  botMessage(`<b>🎉 Promociones del día</b><br><br>
  🎊 Promo 1: Combo Maki Lovers — 2 makis clásicos + 1 bebida — <b>S/32.90</b><br><br>
  🎊 Promo 2: Ramen Night — Cualquier tabla de maki + bebida — <b>S/24.90</b><br><br>
  🎊 Promo 3: Maki Dúo — 2 bowls (Yakimeshi/Teriyaki/Katsu) — <b>S/27.90</b><br><br>
  🎊 Promo Delivery: Envío GRATIS por pedidos mayores a <b>S/50</b>.<br><br>
  <span class="btn-option" onclick="startOrder()">📦 Ordenar Promo</span>
  <span class="btn-option" onclick="showMenu()">⬅️ Menú</span>
  <div class="small-note">Cualquier cosa aquí estamos para lo que necesites.</div>`);
}

/* ---------- info sections ---------- */

function showHorario(){
  botMessage(`<b>🕒 Horario y Dirección</b><br><br>
  📍 Av. Andrés Avelino Cáceres 185 — Frente al Colegio San Ignacio, Piura.<br><br>
  🕒 Horario de atención: <b>Lunes a Domingo: 12:00 p.m. – 11:00 p.m.</b><br><br>
  ¿Deseas que te ayude a hacer un pedido o ver el menú?<br><br>
  <span class="btn-option" onclick="showMenu()">⬅️ Menú</span>
  <span class="btn-option" onclick="startOrder()">📦 Hacer pedido</span>`);
}

function showDelivery(){
  botMessage(`<b>🚚 Delivery</b><br><br>
  Contamos con servicios asociados para la entrega de tus pedidos en Piura y Castilla.  
  Trabajamos con <b>PedidosYa</b> y <b>Rappi</b>, plataformas reconocidas que permiten envíos rápidos y seguimiento de tu orden en tiempo real.<br><br>
  Nuestro objetivo es que disfrutes tu pedido en el menor tiempo posible y con la mejor presentación.<br><br>
  Si quieres que te preparemos una orden para delivery, dime el pedido y la dirección; con gusto lo gestionamos.<br><br>
  <b>Cualquier cosa en la que te pueda ayudar, aquí estoy para ti.</b>
  <br><br>
  <span class="btn-option" onclick="startOrder()">📦 Hacer pedido</span>
  <span class="btn-option" onclick="showMenu()">⬅️ Menú</span>
  `);
}

function showRedes(){
  botMessage(`<b>📱 Redes Sociales</b><br><br>
  Nos encanta compartir nuestras preparaciones, recetas, promociones y el detrás de cámaras de Nagasaki Fusión.  
  En nuestras redes verás fotos, reels, historias y contenido exclusivo para conocer mejor nuestra propuesta nikkei y de fusión.<br><br>
  🔸 <b>Instagram:</b> @nagasakifusion.piura — Publicaciones diarias con fotos de platos y promos.<br>
  🔸 <b>Facebook:</b> Nagasaki Fusión Piura — Eventos, menús y contacto.<br>
  🔸 <b>TikTok:</b> @nagasakifusión — Reels creativos y contenido del equipo.<br><br>
  Síguenos y descubre ideas para tu próximo pedido. Si quieres, te puedo mostrar el menú o ayudarte a ordenar.<br><br>
  <span class="btn-option" onclick="showMenu()">⬅️ Menú</span>
  <span class="btn-option" onclick="startOrder()">📦 Hacer pedido</span>
  `);
}

/* ---------- render product helper ---------- */
function renderProduct(p) {
  return `
    <div class="product-card">
      <div class="product-row">
        <div class="product-icon">${p.icon}</div>
        <div class="product-info">
          <div class="product-name">${p.name} <span class="product-price">• ${p.price}</span></div>
          <div class="product-desc">${p.desc || ''}</div>
        </div>
      </div>
    </div>
  `;
}

/* ---------- ORDER FLOW (igual al modelo Magia Piura) ---------- */

function startOrder(){
  orderState = { step: 1, data: {} };
  botMessage(`<b>📦 Hacer pedido</b><br><br>
  Perfecto, te ayudo con tu pedido. Por favor indica:
  1️⃣ ¿Qué plato o promo deseas ordenar? (nombre exacto o "promo 1", "tabla 5", etc.)
  `);
}

function handleOrderFlow(text){
  const s = orderState;
  if(!s) return;

  if(s.step === 1){
    s.data.item = text;
    s.step = 2;
    botMessage(`Perfecto. ¿Cuántas unidades quieres de "${escapeHtml(text)}"?`);
    return;
  }
  if(s.step === 2){
    s.data.qty = text;
    s.step = 3;
    botMessage(`¿Para recoger en local o para delivery? Escribe "recoger" o "delivery".`);
    return;
  }
  if(s.step === 3){
    const t = text.toLowerCase();
    if(t.includes('recog') || t.includes('retiro') || t.includes('recoger')) {
      s.data.type = 'recoger';
      s.step = 4;
      botMessage(`Perfecto. Por favor indícanos tu nombre y número de contacto (ej: Juan, 9XXXXXXXX).`);
      return;
    } else {
      s.data.type = 'delivery';
      s.step = 4;
      botMessage(`Genial. Indícanos la dirección de entrega completa y un teléfono de contacto.`);
      return;
    }
  }
  if(s.step === 4){
    s.data.contact = text;
    s.step = 5;
    botMessage(`Gracias. Métodos de pago disponibles: Yape, Plin o efectivo. ¿Qué método usarás?`);
    return;
  }
  if(s.step === 5){
    s.data.payment = text;
    s.step = 6;
    // final confirmation
    botMessage(`<b>Resumen del pedido</b><br><br>
      • Producto: ${escapeHtml(s.data.item)}<br>
      • Cantidad: ${escapeHtml(s.data.qty)}<br>
      • Tipo: ${escapeHtml(s.data.type)}<br>
      • Contacto / Dirección: ${escapeHtml(s.data.contact)}<br>
      • Pago: ${escapeHtml(s.data.payment)}<br><br>
      Procedemos a procesar tu pedido. ¿Confirmas? (escribe "sí" para confirmar o "no" para cancelar)`);
    return;
  }
  if(s.step === 6){
    const t = text.toLowerCase();
    if(t === 'si' || t === 'sí' || t.includes('confirm')) {
      // simulate order processed
      botMessage(`<b>✅ Pedido confirmado</b><br><br>
        ¡Gracias! Hemos recibido tu pedido y lo estamos procesando. Pronto te enviaremos los detalles del seguimiento si solicitaste delivery.<br><br>
        Si necesitas modificar algo, dime "modificar". De lo contrario, ¡gracias por elegir Nagasaki Fusión!`);
      orderState = null;
      return;
    } else {
      botMessage(`Pedido cancelado. Si quieres hacer otro pedido, escribe "hacer pedido".`);
      orderState = null;
      return;
    }
  }
}

/* ---------- fallback / ready ---------- */

// no automatic welcome — waits for user to say "hola" or press Hola button
// but add a tiny hint in console
console.log('Chatbot Nagasaki Fusión listo. Esperando "hola" del usuario.');
