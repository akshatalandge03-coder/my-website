// ---------------- Products ----------------
const products = [
  { name: "Rose Bouquet", price: 20, img: "images/pexels-tatev-manukyan-703134445-32316798.jpg" },
  { name: "Tulip Delight", price: 18, img: "images/pexels-lalezarfa-61078864-8116307.jpg" },
  { name: "White Lily", price: 17, img: "images/nikolaj1946-lily-6518732_640.jpg" },
  { name: "Pink Rose Bouquet", price: 22, img: "images/pexels-mlkbnl-29037154.jpg" },
  { name: "Sunflower Surprise", price: 22, img: "images/pexels-subhro-dey-david-1495028-32300948.jpg" },
  { name: "White Flowers Bouquet", price: 23, img: "images/pexels-irasarasek-15865513.jpg" },
  { name: "Pink Lily", price: 25, img: "images/pexels-subhasishbaidya-5176470.jpg" },
  { name: "Pink & White Tulip Bouquet", price: 22, img: "images/pexels-solodsha-7664379.jpg" }
];

const bestsellers = [products[0], products[3]];
let cart = [], total = 0;

// Render products dynamically
function renderProducts(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="flower-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
      </div>
    `;
  });
}
renderProducts(products, "flower-products");
renderProducts(bestsellers, "bestseller-products");

// ---------------- Cart Functions ----------------
function addToCart(name, price){
  cart.push({name, price});
  total += price;
  updateCart();

  // Click animation
  const buttons = document.querySelectorAll(".flower-card button");
  buttons.forEach(btn => {
    if(btn.textContent.includes(name)){
      btn.classList.add("clicked");
      setTimeout(()=> btn.classList.remove("clicked"), 200);
    }
  });
}

function updateCart(){
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach((item,i)=> cartItems.innerHTML += `<li>${item.name} - $${item.price} <button onclick="removeItem(${i})">❌</button></li>`);
  document.getElementById("total").textContent = total;
}

function removeItem(i){ 
  total -= cart[i].price; 
  cart.splice(i,1); 
  updateCart(); 
}

function checkout(){ 
  if(cart.length===0){alert("Cart is empty"); return;} 
  alert("Thank you! Total: $" + total); 
  cart=[]; total=0; updateCart(); 
}

// Toggle cart display
document.getElementById("toggle-cart").onclick = ()=>{
  const cartEl = document.getElementById("cart");
  cartEl.style.display = cartEl.style.display==='none'?'block':'none';
};

// ---------------- Menu Toggle ----------------
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
menuToggle.addEventListener("click", ()=> navMenu.classList.toggle("show"));

// ---------------- Petals ----------------
const petalContainer = document.getElementById("petal-container");
setInterval(()=>{
  const p = document.createElement("div");
  p.className="petal";
  p.style.left = Math.random()*100 + "vw";
  petalContainer.appendChild(p);
  setTimeout(()=> p.remove(),6000);
},400);

// ---------------- Smooth Scroll ----------------
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',function(e){
    e.preventDefault();
    const target=document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({behavior:'smooth'});
    if(navMenu.classList.contains('show')) navMenu.classList.remove('show');
  });
});
