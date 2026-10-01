const tocLinks = document.querySelectorAll('.toc-link');
const sections = [...document.querySelectorAll('.legal-content section')];

// Smooth scroll on click
tocLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Highlight active section in sidebar while scrolling
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      tocLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-100px 0px -70% 0px' });

sections.forEach(section => observer.observe(section));
