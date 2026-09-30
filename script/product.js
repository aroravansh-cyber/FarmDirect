const PRODUCTS = [
  { id: 1, name: "Fresh Tomatoes", farmer: "Ramesh Patil, Nashik", cat: "vegetables", price: 32, unit: "kg", icon: "🍅", tag: "Organic", date: 5 },
  { id: 2, name: "Green Spinach", farmer: "Suresh Yadav, Indore", cat: "vegetables", price: 20, unit: "bunch", icon: "🥬", tag: "Fresh", date: 2 },
  { id: 3, name: "Carrots", farmer: "Meena Kumari, Nagpur", cat: "vegetables", price: 28, unit: "kg", icon: "🥕", tag: "Organic", date: 8 },
  { id: 4, name: "Alphonso Mangoes", farmer: "Anjali Mehta, Ratnagiri", cat: "fruits", price: 120, unit: "dozen", icon: "🥭", tag: "Seasonal", date: 1 },
  { id: 5, name: "Red Apples", farmer: "Harpreet Singh, Shimla", cat: "fruits", price: 180, unit: "kg", icon: "🍎", tag: "Premium", date: 6 },
  { id: 6, name: "Bananas", farmer: "Devika Rao, Coimbatore", cat: "fruits", price: 45, unit: "dozen", icon: "🍌", tag: "Fresh", date: 3 },
  { id: 7, name: "Basmati Rice", farmer: "Gurmeet Singh, Amritsar", cat: "grains", price: 85, unit: "kg", icon: "🌾", tag: "Premium", date: 10 },
  { id: 8, name: "Wheat Flour", farmer: "Om Prakash, Kanpur", cat: "grains", price: 42, unit: "kg", icon: "🌾", tag: "Stone-ground", date: 7 },
  { id: 9, name: "Farm Milk", farmer: "Lakshmi Devi, Erode", cat: "dairy", price: 60, unit: "litre", icon: "🥛", tag: "A2 Milk", date: 0 },
  { id: 10, name: "Paneer", farmer: "Vikram Chauhan, Mathura", cat: "dairy", price: 320, unit: "kg", icon: "🧀", tag: "Fresh", date: 1 },
  { id: 11, name: "Red Chilli", farmer: "Sunita Reddy, Guntur", cat: "spices", price: 210, unit: "kg", icon: "🌶️", tag: "Spicy", date: 12 },
  { id: 12, name: "Turmeric Powder", farmer: "Kavita Joshi, Sangli", cat: "spices", price: 160, unit: "kg", icon: "🫙", tag: "Organic", date: 9 },
  { id: 13, name: "Chana Dal", farmer: "Rajesh Verma, Bhopal", cat: "pulses", price: 95, unit: "kg", icon: "🫘", tag: "Protein-rich", date: 4 },
  { id: 14, name: "Moong Dal", farmer: "Pooja Sharma, Jaipur", cat: "pulses", price: 110, unit: "kg", icon: "🫘", tag: "Fresh", date: 11 },
];

const grid = document.getElementById('productGrid');
const noProducts = document.getElementById('noProducts');
const resultCount = document.getElementById('resultCount');
const cart = {};

function render(list) {
  grid.innerHTML = '';
  list.forEach(p => {
    const qty = cart[p.id] || 0;
    const card = document.createElement('div');
    card.className = 'p-card';
    card.innerHTML = `
      <div class="p-img">${p.icon}</div>
      <div class="p-body">
        <span class="p-tag">${p.tag}</span>
        <span class="p-name">${p.name}</span>
        <span class="p-farmer">${p.farmer}</span>
        <span class="p-price">₹${p.price} <small>/ ${p.unit}</small></span>
        <div class="p-actions">
          <div class="qty">
            <button data-action="dec" data-id="${p.id}">−</button>
            <span id="qty-${p.id}">${qty}</span>
            <button data-action="inc" data-id="${p.id}">+</button>
          </div>
          <button class="add-btn${qty ? ' added' : ''}" data-add="${p.id}">${qty ? 'In Cart' : 'Add'}</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  noProducts.hidden = list.length > 0;
  resultCount.textContent = list.length ? `Showing ${list.length} product${list.length > 1 ? 's' : ''}` : '';
}

function getFiltered() {
  const cat = document.querySelector('input[name="cat"]:checked').value;
  const maxPrice = +document.getElementById('priceRange').value;
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const sort = document.getElementById('sortSelect').value;

  let list = PRODUCTS.filter(p =>
    (cat === 'all' || p.cat === cat) &&
    p.price <= maxPrice &&
    (!q || p.name.toLowerCase().includes(q) || p.cat.includes(q))
  );

  if (sort === 'low') list.sort((a, b) => a.price - b.price);
  else if (sort === 'high') list.sort((a, b) => b.price - a.price);
  else if (sort === 'new') list.sort((a, b) => a.date - b.date);

  return list;
}

function refresh() { render(getFiltered()); }

document.querySelectorAll('input[name="cat"]').forEach(el => el.addEventListener('change', refresh));
document.getElementById('priceRange').addEventListener('input', e => {
  document.getElementById('priceLabel').textContent = `Up to ₹${e.target.value}`;
  refresh();
});
document.getElementById('searchInput').addEventListener('input', refresh);
document.getElementById('searchBtn').addEventListener('click', e => { e.preventDefault(); refresh(); });
document.getElementById('sortSelect').addEventListener('change', refresh);
document.getElementById('resetFilters').addEventListener('click', () => {
  document.querySelector('input[name="cat"][value="all"]').checked = true;
  document.getElementById('priceRange').value = 500;
  document.getElementById('priceLabel').textContent = 'Up to ₹500';
  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value = 'popular';
  refresh();
});

function updateCartCount() {
  const total = Object.values(cart).reduce((sum, n) => sum + n, 0);
  document.getElementById('cartCount').textContent = total;
}

grid.addEventListener('click', e => {
  const inc = e.target.closest('[data-action="inc"]');
  const dec = e.target.closest('[data-action="dec"]');
  const add = e.target.closest('[data-add]');

  if (inc) {
    const id = inc.dataset.id;
    cart[id] = (cart[id] || 0) + 1;
    document.getElementById(`qty-${id}`).textContent = cart[id];
  }
  if (dec) {
    const id = dec.dataset.id;
    cart[id] = Math.max((cart[id] || 0) - 1, 0);
    document.getElementById(`qty-${id}`).textContent = cart[id];
  }
  if (add) {
    const id = add.dataset.add;
    if (!cart[id]) cart[id] = 1;
    document.getElementById(`qty-${id}`).textContent = cart[id];
    add.textContent = 'In Cart';
    add.classList.add('added');
  }
  updateCartCount();
});

refresh();
