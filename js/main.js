// ===================================================
// Mamba FC — Shared Script
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNav();
  setupNavToggle();
  setupRosterFilter();
  setupReadMore();
  setupCart();
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

// Roster position filter
function setupRosterFilter() {
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

// News "read more" toggle
function setupReadMore() {
  document.querySelectorAll('.read-more-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const more = btn.previousElementSibling;
      const expanded = more.style.display === 'block';
      more.style.display = expanded ? 'none' : 'block';
      btn.textContent = expanded ? 'Read More →' : 'Show Less ←';
    });
  });
}

// Shop cart (localStorage-backed, front-end only)
function setupCart() {
  const cartBadge = document.querySelector('.cart-badge');
  const addButtons = document.querySelectorAll('.add-cart-btn');
  if (!cartBadge && !addButtons.length) return;

  updateCartBadge();

  addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const count = getCartCount() + 1;
      localStorage.setItem('mambaFcCartCount', String(count));
      updateCartBadge();
      showToast(`Added "${btn.dataset.product}" to cart`);
    });
  });
}

function getCartCount() {
  return parseInt(localStorage.getItem('mambaFcCartCount') || '0', 10);
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) badge.textContent = getCartCount();
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
  showToast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
}
