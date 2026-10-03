// To use your own photos: drop image files into the /images folder next to
// this file, then update the "src" below to match each filename.
// Recommended size: roughly square or 4:3, under ~500KB each for fast loading.


// Code for uploading images in gallery
const IMAGES = [
  { src: "../assets/image/farm-sunrise.png",   caption: "Sunrise over paddy fields in Nashik",        tag: "farms",     big: true },
  { src: "../assets/image/tomatoes.png",       caption: "Farmer harvesting fresh tomatoes",            tag: "produce" },
  { src: "../assets/image/delivery-van.png",   caption: "Weekly produce delivery to buyers",           tag: "delivery" },
  { src: "../assets/image/veg-crates.png",     caption: "Organic vegetable crates ready for pickup",   tag: "produce" },
  { src: "../assets/image/orchard-family.png", caption: "Farmer family at their orchard",              tag: "farms" },
  { src: "../assets/image/training.png",       caption: "Community farmer training session",           tag: "community" },
  { src: "../assets/image/dairy.png",          caption: "Fresh dairy collection at sunrise",           tag: "produce" },
  { src: "../assets/image/tractor.png",        caption: "Tilling the fields before sowing season",     tag: "farms" },
  { src: "../assets/image/packing.png",        caption: "Packing orders for same-day delivery",        tag: "delivery" },
  { src: "../assets/image/harvest-party.png",  caption: "Farmers celebrating a successful harvest",    tag: "community" },
  { src: "../assets/image/chillies.png",       caption: "Sun-drying red chillies",                     tag: "produce" },
  { src: "../assets/image/handshake.png",      caption: "Buyer and farmer closing a direct deal",      tag: "community" },
];

const gallery = document.getElementById('gallery');
const tabs = document.querySelectorAll('.g-tab');
let currentFilter = 'all';
let currentIndex = 0;

// Simple inline placeholder (light green square) shown if an image file is missing
const FALLBACK =
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
       <rect width="100%" height="100%" fill="#e6f4ea"/>
       <text x="50%" y="50%" font-size="18" fill="#66766d" text-anchor="middle" dy=".3em" font-family="sans-serif">Add photo</text>
     </svg>`
  );

function renderGallery() {
  gallery.innerHTML = '';
  IMAGES.forEach((img, i) => {
    const btn = document.createElement('button');
    btn.className = 'g-item' + (img.big ? ' g-big' : '');
    btn.dataset.index = i;
    btn.dataset.tag = img.tag;
    btn.innerHTML = `
      <img src="${img.src}" alt="${img.caption}" loading="lazy"
           onerror="this.onerror=null;this.src='${FALLBACK}'">
      <span class="g-label">${img.caption}</span>`;
    gallery.appendChild(btn);
  });
  applyFilter();
}

function applyFilter() {
  document.querySelectorAll('.g-item').forEach(item => {
    item.classList.toggle('hide', currentFilter !== 'all' && item.dataset.tag !== currentFilter);
  });
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  currentFilter = tab.dataset.filter;
  applyFilter();
}));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbTag = document.getElementById('lbTag');

function openLightbox(index) {
  currentIndex = index;
  const img = IMAGES[index];
  lbImg.src = img.src;
  lbImg.alt = img.caption;
  lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = FALLBACK; };
  lbCaption.textContent = img.caption;
  lbTag.textContent = img.tag;
  lightbox.hidden = false;
}

function getVisibleIndices() {
  return IMAGES.map((img, i) => i).filter(i => currentFilter === 'all' || IMAGES[i].tag === currentFilter);
}

function step(dir) {
  const visible = getVisibleIndices();
  const pos = visible.indexOf(currentIndex);
  const next = (pos + dir + visible.length) % visible.length;
  openLightbox(visible[next]);
}

gallery.addEventListener('click', e => {
  const item = e.target.closest('.g-item');
  if (!item) return;
  openLightbox(+item.dataset.index);
});

document.getElementById('lbClose').addEventListener('click', () => lightbox.hidden = true);
document.getElementById('lbPrev').addEventListener('click', () => step(-1));
document.getElementById('lbNext').addEventListener('click', () => step(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.hidden = true; });
document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') lightbox.hidden = true;
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

renderGallery();
