// Animated stat counters (runs once, when stats section enters view)
const stats = document.querySelectorAll('.stat strong');
let counted = false;

function animateStats() {
  if (counted) return;
  counted = true;
  stats.forEach(el => {
    const target = +el.dataset.count;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  });
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) animateStats(); });
  }, { threshold: 0.4 });
  observer.observe(statsSection);
}

// Testimonial carousel
const cards = [...document.querySelectorAll('.t-card')];
let current = 0;
function showCard(i) {
  cards.forEach((c, idx) => c.classList.toggle('active', idx === i));
}
showCard(0);

document.getElementById('tPrev').addEventListener('click', () => {
  current = (current - 1 + cards.length) % cards.length;
  showCard(current);
});
document.getElementById('tNext').addEventListener('click', () => {
  current = (current + 1) % cards.length;
  showCard(current);
});
