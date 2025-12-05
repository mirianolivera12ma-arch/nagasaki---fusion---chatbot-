/* script.js - Chatbot Nagasaki Fusión (MAKIS & BEBIDAS) 
   - Inicia en blanco: NO envía mensaje automático.
   - Foco: MAKIS (tablas) y BEBIDAS (sección).
   - Estilo: profesional amable, limpio y con espacios.
*/

/* ---------- helpers ---------- */
const chatbox = document.getElementById('chatbox');

function addMessage(html, sender = 'bot') {
  const div = document.createElement('div');
  div.className = 'message ' + sender;
  div.innerHTML = html;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function userMessage(text) {
  addMessage(escapeHtml(text), 'user');
}

function botMessage(html) {
  addMessage(html, 'bot');
}

function escapeHtml(s){
  if(!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ---------- UI events ---------- */
document.getElementById('sendBtn').addEventListener('click', () => {
  const inp = document.getElementById('userInput');
  const v = inp.value.trim();
  if(!v) return;
  userMessage(v);
  handleInput(v.toLowerCase());
  inp.value = '';
});

document.getElementById('userInput').addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('sendBtn').click();
  }
});

/* start blank (no welcome message) */
document.addEventListener('DOMContentLoaded', () => {});

/* ---------- DATA: MAKIS y BEBIDAS (tomado de tu carta) ---------- */

/* MAKIS: mostramos como "Tabla de 10 cortes" (cada item con icono + descripción breve) */
const MAKIS = [
  {icon:'🍣', name:'Acevichado', price:'S/25', desc:'Maki clásico con toque acevichado y topping de ceviche.'},
  {icon:'🥑', name:'Avocado', price:'S/25', desc:'Relleno de queso crema y ebi furai, cubierto con palta.'},
  {icon:'🍤', name:'Ebi Crispy', price:'S/25', desc:'Relleno con salmón y palta, topping de salsa rocoto ahumado.'},
  {icon:'🔥', name:'Spicy Roll', price:'S/25', desc:'Maki picante con salsa especial de la casa.'},
  {icon:'🌶️', name:'Teriyaki Roll', price:'S/25', desc:'Relleno clásico bañado en salsa teriyaki.'},
  {icon:'🍗', name:'Chicken Furai', price:'S/25', desc:'Pollo frito con queso crema y palta.'},
  {icon:'🐟', name:'Maguro', price:'S/25', desc:'Atún fresco en combinación con ingredientes premium.'},
  {icon:'🧀', name:'Grill Cheese', price:'S/25', desc:'Fusión con queso fundido y topping parrillero.'},
  {icon:'🥭', name:'Mango Roll', price:'S/25', desc:'Relleno con langostinos y toque de mango dulce.'},
  {icon:'🔥', name:'Nagasaki Roll (especial)', price:'S/25', desc:'Especial de la casa con topping distintivo Nagasaki.'}
];

/* BEBIDAS: selección compacta extraída del listado (refrescos, tragos y pisco sours) */
const BEBIDAS = [
  {icon:'🥤', name:'Refrescos de Frutas (Litro)', price:'S/15', desc:'Maracuyá, limón, fresa, piña, naranja.'},
  {icon:'🍹', name:'Frozen de Frutas (Litro)', price:'S/20', desc:'Maracuyá, limón, fresa, piña, naranja.'},
  {icon:'🍺', name:'Cerveza (Pilsen)', price:'S/8', desc:'Cerveza nacional clásica.'},
  {icon:'🍺', name:'Cerveza (Cusqueña de Trigo)', price:'S/10', desc:'Opción artesanal nacional.'},
  {icon:'🍸', name:'Pisco Sour', price:'S/20', desc:'Sabores: clásico, maracuyá, fresa, menta.'},
  {icon:'🍸', name:'Margarita', price:'S/25', desc:'Clásica o sabores (fresa, maracuyá).'}
];

/* ---------- handlers: intención básica ---------- */
function handleInput(text) {
  if(!text) return;
  if (text.includes('maki') || text.includes('makis') || text.includes('maki tabla') || text.includes('tabla')) {
    return showMakis();
  }
  if (text.includes('bebida') || text.includes('bebidas') || text.includes('refresco') || text.includes('pisco') || text.includes('cerveza')) {
    return showBebidas();
  }
  if (text.includes('menu') || text === '1' || text === 'carta') {
    return showMenu();
  }
  if (text.includes('pedido') || text.includes('orden')) {
    return botMessage(`<b>🧾 Hacer pedido</b><br><br>Si deseas hacer un pedido, indícanos: qué plato, cantidad y si es para recoger o delivery. Estamos listos para ayudarte.`);
  }
  if (text.includes('horario') || text.includes('direccion') || text.includes('ubicación')) {
    return botMessage(`<b>🕒 Horario y dirección</b><br><br>Av. Andrés A. Cáceres 185 — Frente al Colegio San Ignacio, Piura.<br>Horario: 12:00 p.m. – 11:00 p.m.`);
  }
  if (text.includes('promo') || text.includes('promocion')) {
    return botMessage(`<b>🎉 Promociones</b><br><br>Tenemos promos diarias y combos. Dime "promos" y te muestro las opciones.`);
  }

  // fallback: mostramos menú compacto (ordenado, no amontonado)
  botMessage(`<b>No entendí exactamente.</b><br><br>Puedes pedirme:<br><br>
    <span class="btn-option" onclick="showMakis()">🍣 Ver Makis</span>
    <span class="btn-option" onclick="showBebidas()">🥤 Ver Bebidas</span>
    <span class="btn-option" onclick="showMenu()">📋 Ver Menú</span>
    <div class="small-note">También puedo ayudarte a armar un pedido. Escríbeme lo que quieres.</div>`);
}

/* ---------- menú principal (compacto) ---------- */
function showMenu(){
  botMessage(`<b>Menú principal — ¿qué deseas ver?</b><br><br>
    <span class="btn-option" onclick="showMakis()">🍣 Makis (10 cortes)</span>
    <span class="btn-option" onclick="showBebidas()">🥤 Bebidas</span>
    <span class="btn-option" onclick="botMessage('🧾 Para pedir: indícanos producto, cantidad y si es para recoger o delivery. Estoy aquí para ayudarte.')">📦 Hacer pedido</span>
    <div class="small-note">Si quieres un combo o barco grande, dime "barco" o "combo".</div>`);
}

/* ---------- mostrar MAKIS (lista ordenada y con espacio) ---------- */
function showMakis(){
  botMessage(`<b>🍣 MAKIS — Tabla de 10 cortes (S/25 c/u — salvo excepciones)</b><br><br><div class="small-note">Cada tabla contiene 10 cortes. A continuación verás los makis disponibles:</div>`);

  MAKIS.forEach((m, i) => {
    setTimeout(() => {
      const html = `
      <div class="product-card">
        <div class="product-row">
          <div class="product-icon">${m.icon}</div>
          <div class="product-info">
            <div class="product-name">${m.name} <span class="product-price">• ${m.price}</span></div>
            <div class="product-desc">${m.desc}</div>
          </div>
        </div>
      </div>`;
      botMessage(html);
    }, 220 * (i + 1));
  });

  // después de mostrar todo, menú compacto ordenado con párrafo
  setTimeout(() => {
    botMessage(`<div class="menu-compact"><b>¿Quieres que arme un pedido o ver las bebidas?</b><br><br>
      <span class="btn-option" onclick="botMessage('Perfecto — dime qué makis y cantidades quieres y si es delivery o retiro.')">🧾 Armar pedido</span>
      <span class="btn-option" onclick="showBebidas()">🥤 Ver Bebidas</span>
      <span class="btn-option" onclick="botMessage('📍 Dirección: Av. Andrés A. Cáceres 185 — Horario: 12:00 p.m. – 11:00 p.m.')">📍 Ver horario</span>
      <div class="small-note">Cualquier cosa aquí estamos para lo que necesites.</div>
    </div>`);
  }, 220 * (MAKIS.length + 1));
}

/* ---------- mostrar BEBIDAS (ordenado y espaciado) ---------- */
function showBebidas(){
  botMessage(`<b>🥤 BEBIDAS — Selección</b><br><br><div class="small-note">Aquí tienes nuestras bebidas más solicitadas:</div>`);

  BEBIDAS.forEach((b, i) => {
    setTimeout(() => {
      const html = `
      <div class="product-card">
        <div class="product-row">
          <div class="product-icon">${b.icon}</div>
          <div class="product-info">
            <div class="product-name">${b.name} <span class="product-price">• ${b.price}</span></div>
            <div class="product-desc">${b.desc}</div>
          </div>
        </div>
      </div>`;
      botMessage(html);
    }, 240 * (i + 1));
  });

  setTimeout(() => {
    botMessage(`<div class="menu-compact"><b>¿Deseas que te ayude a pedir algo?</b><br><br>
      <span class="btn-option" onclick="botMessage('Dime qué bebidas y cantidades quieres; te preparo el pedido.')">🧾 Sí, preparar pedido</span>
      <span class="btn-option" onclick="showMakis()">🍣 Volver a Makis</span>
      <div class="small-note">Cualquier cosa aquí estamos para lo que necesites.</div>
    </div>`);
  }, 240 * (BEBIDAS.length + 1));
}

/* ---------- Resumen Promos / Barcos (opcional breve) ---------- */
function showBarcos(){
  botMessage(`<b>🚢 Barcos y tablas</b><br><br>
  • Barcos Nagasaki (5 tablas) — S/110 (60 cortes)<br>
  • Barcos Nagasaki (7 tablas) — S/150 (84 cortes)<br>
  • Barcos Nagasaki - Alitas 30 piezas — S/110<br><br>
  Para opciones grandes y personalizadas, escríbenos y armamos la mejor combinación.`);
}

/* ---------- FIN ---------- */
