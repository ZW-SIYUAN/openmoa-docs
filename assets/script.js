/* ============================================================================
   OpenMOA Documentation - Shared Scripts
   ============================================================================ */

// Theme Management
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  
  btn.innerHTML = theme === 'dark' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>`;
}

// Mobile Menu
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

// Copy to Clipboard
function copyCode(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`;
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 2000);
  });
}

// Active Navigation Link
function setActiveNav() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.navbar-link');
  
  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (path === '/' || path === '/index.html') {
      if (href === '/' || href === '/index.html' || href === 'index.html') {
        link.classList.add('active');
      }
    } else if (href && path.includes(href.replace('.html', '').replace('./', ''))) {
      link.classList.add('active');
    }
  });
}

// Active Sidebar Link (for docs)
function setActiveSidebar() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.docs-sidebar-link');
  
  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && path.endsWith(href)) {
      link.classList.add('active');
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveNav();
  setActiveSidebar();
});

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
