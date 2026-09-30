// Animated stat counters, triggered once when the stats band scrolls into view
const stats = document.querySelectorAll('.stats-band strong');
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

const statsBand = document.querySelector('.stats-band');
if (statsBand) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) animateStats(); });
  }, { threshold: 0.4 });
  observer.observe(statsBand);
}
