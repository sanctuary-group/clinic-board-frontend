const NAV_ITEMS = [
  { href: 'index.html', icon: 'fa-chart-line', label: 'ダッシュボード' },
  { href: 'receipts.html', icon: 'fa-file-medical', label: 'レセプト管理' },
  { href: 'settings.html', icon: 'fa-gear', label: '設定' },
];

function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return filename;
}

document.addEventListener('DOMContentLoaded', function () {
  const headerEl = document.getElementById('app-header');
  if (!headerEl) return;

  headerEl.innerHTML = getClinicHeader();
  initMobileMenu();
});

function getClinicHeader() {
  const currentPage = getCurrentPage();

  const desktopNav = NAV_ITEMS.map(function (item) {
    const isActive = currentPage === item.href;
    const cls = isActive
      ? 'px-3 py-2 rounded-lg text-sm font-medium text-medical-600 bg-medical-50'
      : 'px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors';
    return `<a href="${item.href}" class="${cls}"><i class="fa-solid ${item.icon} mr-1.5"></i>${item.label}</a>`;
  }).join('\n            ');

  const mobileNav = NAV_ITEMS.map(function (item) {
    const isActive = currentPage === item.href;
    const cls = isActive
      ? 'block px-3 py-2 rounded-lg text-sm font-medium text-medical-600 bg-medical-50'
      : 'block px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50';
    return `<a href="${item.href}" class="${cls}"><i class="fa-solid ${item.icon} mr-2"></i>${item.label}</a>`;
  }).join('\n          ');

  return `
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-elevation-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a href="index.html" class="flex items-center gap-3">
            <div class="w-9 h-9 bg-medical-600 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-hospital text-white text-sm"></i>
            </div>
            <h1 class="text-lg font-bold text-slate-900 tracking-tight">
              クリニックボード
            </h1>
          </a>

          <!-- Desktop Nav -->
          <nav class="hidden md:flex items-center gap-1">
            ${desktopNav}
          </nav>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
            <i class="fa-solid fa-bars text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 bg-white">
        <nav class="px-4 py-3 space-y-1">
          ${mobileNav}
        </nav>
      </div>
    </header>
  `;
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    menu.classList.toggle('hidden');
    const icon = btn.querySelector('i');
    if (menu.classList.contains('hidden')) {
      icon.className = 'fa-solid fa-bars text-lg';
    } else {
      icon.className = 'fa-solid fa-xmark text-lg';
    }
  });
}
