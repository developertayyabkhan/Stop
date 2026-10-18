const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    navActions.classList.toggle('mobile-open');
  });
}

const counters = document.querySelectorAll('[data-target]');

const animateCounter = (element) => {
  const target = Number(element.dataset.target);
  const duration = 1400;
  let start = 0;
  const startTime = performance.now();

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);

    if (target >= 1000) {
      element.textContent = `${value.toLocaleString()}+`;
    } else if (target >= 100) {
      element.textContent = `${value.toFixed(0)}%`;
    } else {
      element.textContent = `${value.toFixed(1)}`;
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      if (target >= 1000) {
        element.textContent = `${target.toLocaleString()}+`;
      } else if (target >= 100) {
        element.textContent = `${target.toFixed(0)}%`;
      } else {
        element.textContent = `${target.toFixed(1)}`;
      }
    }
  };

  requestAnimationFrame(step);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));
