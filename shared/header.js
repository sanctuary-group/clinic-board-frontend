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

  headerEl.innerHTML = getSidebar();
  initSidebarToggle();
});

function getSidebar() {
  const currentPage = getCurrentPage();

  const navLinks = NAV_ITEMS.map(function (item) {
    const isActive = currentPage === item.href;
    const cls = isActive
      ? 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-medical-600 bg-medical-50'
      : 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors';
    return `<a href="${item.href}" class="${cls}"><i class="fa-solid ${item.icon} w-5 text-center"></i><span class="sidebar-label">${item.label}</span></a>`;
  }).join('\n        ');

  return `
    <!-- Mobile Top Bar -->
    <div class="sidebar-topbar fixed top-0 left-0 right-0 z-50 h-14 bg-white/95 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-4 lg:hidden">
      <a href="index.html" class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center">
          <i class="fa-solid fa-hospital text-white text-xs"></i>
        </div>
        <span class="text-base font-bold text-slate-900">クリニックボード</span>
      </a>
      <button id="sidebar-toggle" class="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
        <i class="fa-solid fa-bars text-lg"></i>
      </button>
    </div>

    <!-- Sidebar Overlay (mobile) -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-black/40 z-40 hidden lg:hidden" onclick="closeSidebar()"></div>

    <!-- Sidebar -->
    <aside id="sidebar" class="fixed top-0 left-0 z-40 h-full w-60 bg-white border-r border-slate-200 flex flex-col transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-in-out">
      <!-- Logo -->
      <div class="h-16 flex items-center gap-3 px-5 border-b border-slate-100 flex-shrink-0">
        <div class="w-9 h-9 bg-medical-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <i class="fa-solid fa-hospital text-white text-sm"></i>
        </div>
        <h1 class="text-base font-bold text-slate-900 tracking-tight sidebar-label">クリニックボード</h1>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        ${navLinks}
      </nav>

      <!-- Footer -->
      <div class="px-5 py-4 border-t border-slate-100 flex-shrink-0">
        <p class="text-xs text-slate-400 sidebar-label">Clinic Board v1.0</p>
      </div>
    </aside>
  `;
}

function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      openSidebar();
    });
  }
}

function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('-translate-x-full');
  if (overlay) overlay.classList.remove('hidden');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.add('-translate-x-full');
  if (overlay) overlay.classList.add('hidden');
}
