// ===================================================
// Mambas Academy — Shared Script
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNav();
  setupNavToggle();
  setupTeamFilter();
  setupContactForm();
});

// Highlight the current page's nav link
function highlightActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
    if (link.dataset.page === path) {
      link.classList.add('active');
    }
  });
}

// Mobile hamburger menu
function setupNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Teams page position filter
function setupTeamFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.player-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const group = btn.dataset.position;

      cards.forEach((card) => {
        const show = group === 'all' || card.dataset.position === group;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// Contact / registration form (front-end only, no backend wired up yet)
function setupContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thanks! We’ll be in touch soon.');
    form.reset();
  });
}

// Toast notification
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
}
