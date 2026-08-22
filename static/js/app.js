// Read values safely passed from index.html template
const IS_USER_AUTHENTICATED = typeof window.IS_USER_AUTHENTICATED !== 'undefined' ? window.IS_USER_AUTHENTICATED : false;
const GOOGLE_LOGIN_URL = window.GOOGLE_LOGIN_URL || '#';

const PRODUCTS = [
  // --- MEN'S & UNISEX ITEMS ---
  {id:1, name:"SAMpx Men's Street Runner", category:"footwear", gender:"men", price:2799, oldPrice:3599, img:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700"},
  {id:2, name:"SAMpx Oversized Heavy Tee", category:"topwear", gender:"men", price:1299, oldPrice:1899, img:"https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600"},
  {id:3, name:"Minimal Black Pullover Hoodie", category:"topwear", gender:"unisex", price:2199, oldPrice:2999, img:"https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600"},
  {id:4, name:"Tactical Multi-Pocket Cargo Pants", category:"bottomwear", gender:"men", price:1899, oldPrice:2499, img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600"},
  {id:5, name:"SAMpx Men's Varsity Jacket", category:"outerwear", gender:"men", price:3299, oldPrice:4299, img:"https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=700"},
  {id:6, name:"Wool Blend Boxy Overcoat", category:"outerwear", gender:"unisex", price:4299, oldPrice:5200, img:"https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600"},

  // --- ACCESSORIES ---
  {id:7, name:"Canvas Weekender Duffle", category:"accessories", gender:"unisex", price:1499, oldPrice:1999, img:"https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600"},
  {id:8, name:"Matte Black Streetwear Cap", category:"accessories", gender:"unisex", price:899, oldPrice:1199, img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600"},
  {id:9, name:"Matte Black Urban Shades", category:"accessories", gender:"unisex", price:1199, oldPrice:1599, img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"},
  {id:10, name:"Stealth Chrono Timepiece", category:"accessories", gender:"unisex", price:4999, oldPrice:6999, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"},
  {id:11, name:"Night Club Parfum 100ml", category:"accessories", gender:"unisex", price:3299, oldPrice:4299, img:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600"},
  {id:12, name:"SAMpx Crossbody Chest Rig", category:"accessories", gender:"unisex", price:1699, oldPrice:2199, img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"},

  // --- WOMEN'S ITEMS ---
  {id:18, name:"SAMpx Women's Oversized Jacket", category:"outerwear", gender:"women", price:2899, oldPrice:3799, img:"https://images.unsplash.com/photo-1548883354-7622d03aca27?w=700&fit=crop"},
  {id:19, name:"SAMpx Women's Denim Jacket", category:"outerwear", gender:"women", price:2499, oldPrice:3299, img:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=700"},
  {id:20, name:"SAMpx Essential Black Dress", category:"topwear", gender:"women", price:1999, oldPrice:2799, img:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700"},
  {id:21, name:"SAMpx Minimal Beige Dress", category:"topwear", gender:"women", price:2299, oldPrice:3199, img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700"},
  {id:24, name:"SAMpx Women's Satin Mini Dress", category:"topwear", gender:"women", price:2299, oldPrice:3199, img:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700"},
  {id:25, name:"SAMpx Women's Summer Dress", category:"topwear", gender:"women", price:1999, oldPrice:2799, img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700"},
  {id:26, name:"SAMpx Women's Casual Blazer", category:"outerwear", gender:"women", price:2899, oldPrice:3799, img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700"},
  {id:27, name:"SAMpx Women's Knit Cardigan", category:"outerwear", gender:"women", price:2199, oldPrice:2999, img:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700"},
  {id:28, name:"SAMpx Women's Pleated Skirt", category:"bottomwear", gender:"women", price:1599, oldPrice:2199, img:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=700"},
  {id:29, name:"SAMpx Women's Denim Shorts", category:"bottomwear", gender:"women", price:1399, oldPrice:1899, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700"},
  {id:30, name:"SAMpx Women's Oversized Blazer", category:"outerwear", gender:"women", price:2999, oldPrice:3999, img:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=700"},
  {id:31, name:"SAMpx Women's Crop Top", category:"topwear", gender:"women", price:999, oldPrice:1399, img:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700"},
  {id:32, name:"SAMpx Women's Leather Jacket", category:"outerwear", gender:"women", price:3499, oldPrice:4599, img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700"},
  {id:33, name:"SAMpx Women's Casual Shirt", category:"topwear", gender:"women", price:1499, oldPrice:1999, img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=700"},
  {id:34, name:"SAMpx Women's Summer Top", category:"topwear", gender:"women", price:1199, oldPrice:1699, img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700"},
  {id:35, name:"SAMpx Women's Evening Dress", category:"dresses", gender:"women", price:2699, oldPrice:3599, img:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700"},

  // --- ADDITIONAL OUTERWEAR / FOOTWEAR ---
  {id:15, name:"SAMpx Utility Track Jacket", category:"outerwear", gender:"men", price:2699, oldPrice:3499, img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=700"},
  {id:16, name:"SAMpx Oversized Denim Jacket", category:"outerwear", gender:"unisex", price:2999, oldPrice:3999, img:"https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=700"},
  {id:17, name:"SAMpx Black Bomber Jacket", category:"outerwear", gender:"men", price:3299, oldPrice:4299, img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700"},
  {id:22, name:"SAMpx Street Runner", category:"footwear", gender:"unisex", price:2799, oldPrice:3599, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"},
  {id:23, name:"SAMpx Classic Street Sneakers", category:"footwear", gender:"unisex", price:2999, oldPrice:3999, img:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700"}
];
// State Management
let cart = [];
let wishlist = [];

async function loadUserState() {
  if (!IS_USER_AUTHENTICATED) {
    cart = [];
    wishlist = [];
    return;
  }

  try {
    const [cartResponse, wishlistResponse] = await Promise.all([
      fetch('/api/cart'),
      fetch('/api/wishlist')
    ]);

    const cartData = await cartResponse.json();
    const wishlistData = await wishlistResponse.json();

    if (cartData.success) {
      cart = cartData.cart || [];
    }

    if (wishlistData.success) {
      wishlist = wishlistData.wishlist || [];
    }

    renderCart();
    renderWishlist();
    renderProducts();

  } catch (error) {
    console.error("Failed to load user state:", error);
  }
}

let activeCategory = "all";
let searchTerm = "";
let discountPercent = 0;

// Slide Settings
let currentSlide = 0;
const itemsPerSlide = 12; 
let autoSlideInterval = null;

// Currency Formatter
const fmt = (n) => "₹" + Number(n).toLocaleString('en-IN');

// Auth Check
function requireAuth() {
  if (!IS_USER_AUTHENTICATED) {
    window.location.href = GOOGLE_LOGIN_URL;
    return false;
  }
  return true;
}

// User Profile Dropdown Toggle
function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  if (menu) {
    menu.classList.toggle("show");
  }
}

// Close Profile Dropdown when clicking outside
document.addEventListener("click", (e) => {
  const wrapper = document.querySelector(".user-profile-wrapper");
  const menu = document.getElementById("profileMenu");
  if (wrapper && menu && !wrapper.contains(e.target)) {
    menu.classList.remove("show");
  }
});

async function saveState() {
  if (!IS_USER_AUTHENTICATED) return;

  try {
    await Promise.all([
      fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      }),

      fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wishlist: wishlist
        })
      })
    ]);
  } catch (error) {
    console.error("Failed to save user state:", error);
  }
}

// Get Filtered & Sorted Products
function getFilteredProducts() {
  let list = PRODUCTS.filter(p => {
    const catMatch = activeCategory === "all" || p.category.toLowerCase() === activeCategory.toLowerCase();
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return catMatch && searchMatch;
  });

  const sortVal = document.getElementById("sortSelect")?.value || "default";
  if (sortVal === "low") list.sort((a, b) => a.price - b.price);
  if (sortVal === "high") list.sort((a, b) => b.price - a.price);

  return list;
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const countEl = document.getElementById("resultCount");
  if (!grid) return;

  const filtered = getFilteredProducts();
  const totalItems = filtered.length;
  
  if (countEl) countEl.innerText = `${String(totalItems).padStart(2, '0')} items`;

  const maxSlide = Math.max(0, Math.ceil(totalItems / itemsPerSlide) - 1);
  if (currentSlide > maxSlide) currentSlide = maxSlide;

  const start = currentSlide * itemsPerSlide;
  const slideItems = filtered.slice(start, start + itemsPerSlide);

  if (slideItems.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; padding:40px; text-align:center; color:#888;">No items found.</div>`;
  } else {
    grid.innerHTML = slideItems.map(p => {
      const isWished = wishlist.includes(p.id);
      const newBadge = p.isNew ? `<span class="badge-new">NEW</span>` : '';
      return `
        <div class="card visible" data-id="${p.id}">
          <div class="card-img">
            ${newBadge}
            <button class="wishlist-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlistProduct(${p.id});">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <button class="quickview-btn" onclick="openQuickView(${p.id})">Quick View</button>
          </div>
          <div class="card-body">
            <span class="card-eyebrow">SKU-0${p.id} • ${p.category}</span>
            <h3>${p.name}</h3>
            <div class="price-row">
              <span>
                <span class="price">${fmt(p.price)}</span>
                ${p.oldPrice ? `<span class="price-old">${fmt(p.oldPrice)}</span>` : ""}
              </span>
            </div>
            <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      `;
    }).join("");
  }

  renderDots(totalItems);
}

// Circular Dots Navigation
function renderDots(totalItems) {
  const container = document.querySelector(".slide-controls");
  if (!container) return;

  const totalSlides = Math.ceil(totalItems / itemsPerSlide);
  
  if (totalSlides <= 1) {
    container.innerHTML = ""; 
    return;
  }

  let dotsHtml = `<div class="dots-wrapper" style="display:flex; gap:8px; align-items:center;">`;
  for (let i = 0; i < totalSlides; i++) {
    dotsHtml += `
      <span 
        onclick="goToSlide(${i})" 
        style="
          width: 10px; 
          height: 10px; 
          border-radius: 50%; 
          background: ${i === currentSlide ? '#e63946' : '#ccc'}; 
          cursor: pointer; 
          transition: all 0.3s ease;
          display: inline-block;
        ">
      </span>`;
  }
  dotsHtml += `</div>`;
  container.innerHTML = dotsHtml;
}

function goToSlide(index) {
  currentSlide = index;
  renderProducts();
  resetAutoSlide(); 
}

// Automatic Slide Cycle (4 seconds)
function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    const filtered = getFilteredProducts();
    const totalSlides = Math.ceil(filtered.length / itemsPerSlide);

    if (totalSlides > 1) {
      currentSlide = (currentSlide + 1) % totalSlides;
      renderProducts();
    }
  }, 4000); 
}

function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Wishlist Logic
function toggleWishlistProduct(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
  } else {
    wishlist.push(id);
  }
  saveState();
  renderProducts();
  renderWishlist();
}

// Cart Logic
function addToCart(id) {
  if (!requireAuth()) return;

  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveState();
  renderCart();
  showToast(`${product.name} added to cart`);
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  saveState();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  saveState();
  renderCart();
}

function applyPromo() {
  const promoInput = document.getElementById("promoInput");
  if (!promoInput) return;
  const code = promoInput.value.trim().toUpperCase();
  if (code === "SAVE10") {
    discountPercent = 0.10;
    showToast("10% discount applied!");
  } else {
    discountPercent = 0;
    showToast("Invalid promo code");
  }
  renderCart();
}

function renderCart() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);

  const container = document.getElementById("drawerItems");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-msg">Your cart is empty.</div>`;
  } else {
    container.innerHTML = cart
      .map(
        (item) => `
      <div class="drawer-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="drawer-item-info">
          <h4>${item.name}</h4>
          <span class="price">${fmt(item.price)}</span>
          <div class="qty-row">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            <span class="remove-link" onclick="removeItem(${item.id})">Remove</span>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = subtotal * (typeof discountPercent !== "undefined" ? discountPercent : 0);
  const grandTotal = subtotal - discount;

  const subtotalEl = document.getElementById("subtotal");
  const grandTotalEl = document.getElementById("grandTotal");
  const discountRow = document.getElementById("discountRow");
  const discountAmt = document.getElementById("discountAmt");

  if (subtotalEl) subtotalEl.textContent = fmt(subtotal);
  if (grandTotalEl) grandTotalEl.textContent = fmt(grandTotal);

  if (discountRow && discountAmt) {
    if (discountPercent > 0) {
      discountRow.style.display = "flex";
      discountAmt.textContent = "-" + fmt(discount);
    } else {
      discountRow.style.display = "none";
    }
  }
}

function renderWishlist() {
  const wishlistCount = document.getElementById("wishlistCount");
  if (wishlistCount) wishlistCount.textContent = wishlist.length;

  const container = document.getElementById("wishlistItems");
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `<div class="empty-msg">Your wishlist is empty.</div>`;
  } else {
    const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
    container.innerHTML = items
      .map(
        (item) => `
      <div class="drawer-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="drawer-item-info">
          <h4>${item.name}</h4>
          <span class="price">${fmt(item.price)}</span>
          <div style="margin-top:8px;">
            <span class="remove-link" onclick="addToCart(${item.id}); toggleWishlistProduct(${item.id});">Move to Cart</span> | 
            <span class="remove-link" onclick="toggleWishlistProduct(${item.id})">Remove</span>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }
}

function toggleCart(show) {
  if (show && !requireAuth()) return;
  document.getElementById("drawer")?.classList.toggle("show", show);
  document.getElementById("overlay")?.classList.toggle("show", show);
}

function toggleWishlist(show) {
  if (show && !requireAuth()) return;
  document.getElementById("wishlistDrawer")?.classList.toggle("show", show);
  document.getElementById("overlay")?.classList.toggle("show", show);
}

function closeAllDrawers() {
  document.getElementById("drawer")?.classList.remove("show");
  document.getElementById("wishlistDrawer")?.classList.remove("show");
  document.getElementById("overlay")?.classList.remove("show");
  closeModal();
  closeCheckoutModal();
}

function openQuickView(id) {
  const p = PRODUCTS.find((item) => item.id === id);
  if (!p) return;
  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalSku").textContent = `SKU-0${p.id}`;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalPrice").textContent = fmt(p.price);
  document.getElementById("modalAddBtn").onclick = () => {
    addToCart(p.id);
    closeModal();
  };
  document.getElementById("quickViewModal")?.classList.add("show");
  document.getElementById("overlay")?.classList.add("show");
}

function closeModal() {
  document.getElementById("quickViewModal")?.classList.remove("show");
}

// PAYMENT THE QR CODEE ***********************************
const STORE_UPI_ID = "karanworkd123@okhdfcbank";
const STORE_NAME = "SAMpxFSCLUB";
let qrCountdownInterval = null;
let qrTimeRemaining = 100;

function getCartTotal() {
  if (typeof cart !== "undefined" && cart.length > 0) {
    const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty || 1)), 0);
    const deliveryFee = 50;
    const discount = subtotal * (typeof discountPercent !== "undefined" ? discountPercent : 0);
    const total = subtotal - discount + deliveryFee;
    return total > 0 ? total.toFixed(2) : "0.00";
  }
  
  const checkoutTotalEl = document.getElementById("finalOrderTotal") || document.getElementById("checkoutTotalAmt");
  if (checkoutTotalEl) {
    const extractedAmount = checkoutTotalEl.innerText.replace(/[^0-9.]/g, '');
    const parsedAmount = parseFloat(extractedAmount);
    return !isNaN(parsedAmount) && parsedAmount > 0 ? parsedAmount.toFixed(2) : "0.00";
  }
  
  return "0.00";
}

function generateQRCode() {
    const qrImg = document.getElementById('upiQrCodeImg');
    const amountDisplay = document.getElementById('displayAmount');
    const upiIdDisplay = document.getElementById('displayUpiId');

    const currentAmount = getCartTotal();

    if (upiIdDisplay) upiIdDisplay.innerText = STORE_UPI_ID;
    if (amountDisplay) amountDisplay.innerText = `₹${currentAmount}`;

    if (qrImg) {
        const upiURI = `upi://pay?pa=${STORE_UPI_ID}&pn=${encodeURIComponent(STORE_NAME)}&am=${currentAmount}&cu=INR`;
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiURI)}`;
    }
}

function startQRTimer() {
  stopQRTimer();
  qrTimeRemaining = 100;

  const timerElem = document.getElementById('qrTimer');
  if (timerElem) timerElem.innerText = qrTimeRemaining;

  qrCountdownInterval = setInterval(() => {
    qrTimeRemaining--;

    if (timerElem) {
      timerElem.innerText = qrTimeRemaining;
    }

    if (qrTimeRemaining <= 0) {
      qrTimeRemaining = 100;
      if (timerElem) timerElem.innerText = qrTimeRemaining;
      generateQRCode();
    }
  }, 1000);
}

function stopQRTimer() {
  if (typeof qrCountdownInterval !== "undefined" && qrCountdownInterval) {
    clearInterval(qrCountdownInterval);
    qrCountdownInterval = null;
  }
}

function togglePaymentUI() {
  const selectedPaymentElem = document.querySelector('input[name="payment"]:checked');
  if (!selectedPaymentElem) return;

  const selectedPayment = selectedPaymentElem.value;
  const qrContainer = document.getElementById('upiQRContainer');
  const utrInput = document.getElementById('custTransactionId');

  if (qrContainer && utrInput) {
    if (selectedPayment === 'UPI') {
      qrContainer.style.display = 'block';
      utrInput.setAttribute('required', 'required');
      generateQRCode();
      startQRTimer();
    } else {
      qrContainer.style.display = 'none';
      utrInput.removeAttribute('required');
      utrInput.value = '';
      stopQRTimer();
    }
  }
}

function checkout() {
  if (typeof cart === "undefined" || cart.length === 0) {
    if (typeof showToast === "function") showToast("Your cart is empty!");
    return;
  }

  if (typeof toggleCart === "function") toggleCart(false);

  const summaryContainer = document.getElementById("checkoutSummaryList");
  if (summaryContainer) {
    summaryContainer.innerHTML = cart.map(item => `
      <div style="display:flex; justify-content:space-between; font-size:13px; color:#444; margin-bottom:6px;">
        <span>${item.name} (x${item.qty || 1})</span>
        <span>${fmt(item.price * (item.qty || 1))}</span>
      </div>
    `).join('');
  }

  const subtotal = cart.reduce((sum, i) => sum + Number(i.price) * Number(i.qty || 1), 0);
  const deliveryFee = 50;
  const discount = subtotal * (typeof discountPercent !== "undefined" ? discountPercent : 0);
  const total = subtotal - discount + deliveryFee;

  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const deliveryFeeEl = document.getElementById("deliveryFee");
  const checkoutTotalAmtEl = document.getElementById("checkoutTotalAmt");
  
  const bottomCartSubtotalEl = document.getElementById("bottomCartSubtotal");
  const bottomDeliveryFeeEl = document.getElementById("bottomDeliveryFee");
  const bottomOrderTotalEl = document.getElementById("bottomOrderTotal");

  if (cartSubtotalEl) cartSubtotalEl.innerText = fmt(subtotal);
  if (deliveryFeeEl) deliveryFeeEl.innerText = fmt(deliveryFee);
  if (checkoutTotalAmtEl) checkoutTotalAmtEl.innerText = fmt(total);

  if (bottomCartSubtotalEl) bottomCartSubtotalEl.innerText = fmt(subtotal).replace('₹', '');
  if (bottomDeliveryFeeEl) bottomDeliveryFeeEl.innerText = deliveryFee.toFixed(2);
  if (bottomOrderTotalEl) bottomOrderTotalEl.innerText = fmt(total).replace('₹', '');

  if (typeof generateQRCode === 'function') {
    generateQRCode();
  }

  togglePaymentUI();

  document.getElementById("checkoutModal")?.classList.add("show");
  document.getElementById("overlay")?.classList.add("show");
}

function closeCheckoutModal() {
  if (typeof stopQRTimer === "function") {
    stopQRTimer();
  }

  const modal = document.getElementById("checkoutModal");
  const overlay = document.getElementById("overlay");
  
  if (modal) modal.classList.remove("show");
  if (overlay) overlay.classList.remove("show");

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.reset();
  }

  const defaultCodRadio = document.querySelector('input[name="payment"][value="COD"]');
  if (defaultCodRadio) {
    defaultCodRadio.checked = true;
  }

  const upiContainer = document.getElementById("upiQRContainer");
  if (upiContainer) {
    upiContainer.style.display = "none";
  }

  const qrTimerDisplay = document.getElementById("qrTimer");
  if (qrTimerDisplay) {
    qrTimerDisplay.textContent = "100";
  }
}

async function handleFinalCheckout(event) {
  event.preventDefault();

  if (typeof cart === "undefined" || cart.length === 0) {
    if (typeof showToast === "function") showToast("Your cart is empty!");
    return;
  }

  const nameInput = document.getElementById('custName');
  const phoneInput = document.getElementById('custPhone');
  const addressInput = document.getElementById('custAddress');
  const paymentInput = document.querySelector('input[name="payment"]:checked');
  const utrInput = document.getElementById('custTransactionId');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const paymentMethod = paymentInput ? paymentInput.value : 'COD';
  const utr = utrInput ? utrInput.value.trim() : '';

  if (paymentMethod === 'UPI' && !utr) {
    if (typeof showToast === "function") showToast("Please enter the 12-digit UTR/Transaction ID");
    if (utrInput) utrInput.focus();
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty || 1)), 0);
  const deliveryFee = 50;
  const discount = subtotal * (typeof discountPercent !== "undefined" ? discountPercent : 0);
  const totalAmount = subtotal - discount + deliveryFee;
  
  const orderId = "ORD-" + Date.now().toString().slice(-6);

  const payload = {
    id: orderId,
    items: cart,
    total: totalAmount,
    customer: {
      name: name,
      phone: phone,
      address: `${address} | Phone: ${phone}` + (paymentMethod === 'UPI' ? ` | UTR: ${utr}` : ''),
      paymentMethod: paymentMethod === 'UPI' ? `UPI (UTR: ${utr})` : 'COD'
    }
  };

  try {
    const response = await fetch('/api/place-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      if (typeof stopQRTimer === "function") stopQRTimer();
      cart = [];
      if (typeof discountPercent !== "undefined") discountPercent = 0;
      if (typeof saveState === "function") saveState();
      if (typeof renderCart === "function") renderCart();

      const cartCountBadge = document.getElementById('cartCount');
      if (cartCountBadge) cartCountBadge.innerText = '0';

      closeCheckoutModal();
      if (typeof showToast === "function") showToast("Order placed successfully!");

      setTimeout(() => {
        window.location.href = "/orders";
      }, 1200);
    } else {
      if (typeof showToast === "function") showToast("Failed to place order: " + (result.error || "Please log in first."));
    }
  } catch (error) {
    console.error("Error submitting order:", error);
    if (typeof showToast === "function") showToast("Network error. Please try again.");
  }
}

let toastTimer;
function showToast(text) {
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");
  if (toast && toastText) {
    toastText.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }
}

function toggleSearch() {
  const container = document.getElementById("searchContainer");
  const input = document.getElementById("searchInput");

  if (container) {
    container.classList.toggle("active");

    if (container.classList.contains("active") && input) {
      input.focus();
    }
  }
}

// Initializations
document.addEventListener("DOMContentLoaded", () => {
  const chipsContainer = document.getElementById("chips");
  if (chipsContainer) {
    chipsContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeCategory = chip.dataset.cat || "all";
      currentSlide = 0;
      renderProducts();
      resetAutoSlide();
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      currentSlide = 0;
      renderProducts();
      resetAutoSlide();
    });
  }

  // Pause slideshow on mouse hover over grid
  const gridEl = document.getElementById("productGrid");
  if (gridEl) {
    gridEl.addEventListener("mouseenter", stopAutoSlide);
    gridEl.addEventListener("mouseleave", startAutoSlide);
  }

  // Listen for radio button changes to toggle UPI UI dynamic elements
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  paymentRadios.forEach((radio) => {
    radio.addEventListener('change', togglePaymentUI);
  });
  // ==========================================
  // Toggle Mega Menu on click/touch for stability
  // ==========================================
  document.querySelectorAll('.mega-dropdown > a').forEach(trigger => {
      trigger.addEventListener('click', function(e) {
          e.preventDefault();
          const parentDropdown = this.closest('.mega-dropdown');

          document.querySelectorAll('.mega-dropdown').forEach(d => {
              if (d !== parentDropdown) d.classList.remove('active');
          });

          parentDropdown.classList.toggle('active');
      });
  });

  // Close mega menu when clicking outside
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.mega-dropdown')) {
          document.querySelectorAll('.mega-dropdown').forEach(d => {
              d.classList.remove('active');
          });
      }
  });

  renderProducts();
  renderCart();
  renderWishlist();
  startAutoSlide();
  loadUserState();
});