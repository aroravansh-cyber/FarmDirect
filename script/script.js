// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

// FAQ search + popular chips
const input = document.getElementById('searchInput');
const items = [...document.querySelectorAll('#faqs details')];
const noResult = document.getElementById('noResult');

function filterFaqs(q) {
  q = q.trim().toLowerCase();
  let shown = 0;
  items.forEach(d => {
    const match = !q || d.textContent.toLowerCase().includes(q);
    d.hidden = !match;
    d.open = !!q && match;
    if (match) shown++;
  });
  noResult.hidden = shown > 0;
}

document.getElementById('searchForm').addEventListener('submit', e => {
  e.preventDefault();
  filterFaqs(input.value);
  document.getElementById('faqs').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
input.addEventListener('input', () => filterFaqs(input.value));

document.querySelectorAll('.chips button').forEach(btn =>
  btn.addEventListener('click', () => {
    input.value = btn.textContent;
    filterFaqs(input.value);
    document.getElementById('faqs').scrollIntoView({ behavior: 'smooth', block: 'center' });
  })
);

// Only one FAQ open at a time (when not searching)
items.forEach(d => d.addEventListener('toggle', () => {
  if (d.open && !input.value.trim()) items.forEach(o => { if (o !== d) o.open = false; });
}));
