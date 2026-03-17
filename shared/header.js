document.addEventListener('DOMContentLoaded', function () {
  const headerEl = document.getElementById('app-header');
  if (!headerEl) return;

  headerEl.innerHTML = getClinicHeader();
  initMobileMenu();
});

function getClinicHeader() {
  return `
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-elevation-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-medical-600 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-hospital text-white text-sm"></i>
            </div>
            <h1 class="text-lg font-bold text-slate-900 tracking-tight">
              クリニックボード
            </h1>
          </div>

          <!-- Desktop Nav -->
          <nav class="hidden md:flex items-center gap-1">
            <a href="index.html" class="px-3 py-2 rounded-lg text-sm font-medium text-medical-600 bg-medical-50">
              <i class="fa-solid fa-chart-line mr-1.5"></i>ダッシュボード
            </a>
            <a href="#" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors">
              <i class="fa-solid fa-file-medical mr-1.5"></i>レセプト管理
            </a>
            <a href="#" class="px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors">
              <i class="fa-solid fa-gear mr-1.5"></i>設定
            </a>
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
          <a href="index.html" class="block px-3 py-2 rounded-lg text-sm font-medium text-medical-600 bg-medical-50">
            <i class="fa-solid fa-chart-line mr-2"></i>ダッシュボード
          </a>
          <a href="#" class="block px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50">
            <i class="fa-solid fa-file-medical mr-2"></i>レセプト管理
          </a>
          <a href="#" class="block px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50">
            <i class="fa-solid fa-gear mr-2"></i>設定
          </a>
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
