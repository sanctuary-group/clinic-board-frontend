// 日本円フォーマット
function formatCurrency(amount) {
  return '¥' + amount.toLocaleString('ja-JP');
}

// 日付フォーマット (YYYY/MM/DD (曜日))
function formatDate(dateStr) {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dow = days[d.getDay()];
  return `${y}/${m}/${day} (${dow})`;
}

// 点数フォーマット
function formatPoints(points) {
  return points.toLocaleString('ja-JP') + ' 点';
}

// ステータスバッジ
function getStatusBadge(status) {
  const map = {
    '確定': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border border-emerald-200' },
    '保留': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border border-amber-200' },
    '返戻': { bg: 'bg-red-50', text: 'text-red-700', border: 'border border-red-200' },
  };
  const style = map[status] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border border-slate-200' };
  return `<span class="badge ${style.bg} ${style.text} ${style.border}">${status}</span>`;
}

// 保険種別バッジ
function getInsuranceBadge(type) {
  const map = {
    '社保': { bg: 'bg-blue-50', text: 'text-blue-700' },
    '国保': { bg: 'bg-teal-50', text: 'text-teal-700' },
    '後期高齢': { bg: 'bg-purple-50', text: 'text-purple-700' },
  };
  const style = map[type] || { bg: 'bg-slate-50', text: 'text-slate-700' };
  return `<span class="badge ${style.bg} ${style.text}">${type}</span>`;
}

// 診療科名取得
function getDepartmentName(id) {
  return DEPARTMENTS[id] || '不明';
}

// CSV解析
function parseCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"(.*)"$/, '$1'));

  // ヘッダーマッピング
  const headerMap = {
    '患者ID': 'patient_id', 'PatientID': 'patient_id', 'patient_id': 'patient_id',
    '患者名': 'patient_name', 'PatientName': 'patient_name', 'patient_name': 'patient_name',
    '診療日': 'visit_date', 'VisitDate': 'visit_date', 'visit_date': 'visit_date',
    '診療科': 'department_id', 'Department': 'department_id', 'department_id': 'department_id',
    '病名': 'diagnosis', 'Diagnosis': 'diagnosis', 'diagnosis': 'diagnosis',
    '点数': 'points', 'Points': 'points', 'points': 'points',
    '金額': 'amount', 'Amount': 'amount', 'amount': 'amount',
    '保険種別': 'insurance_type', 'InsuranceType': 'insurance_type', 'insurance_type': 'insurance_type',
    'ステータス': 'status', 'Status': 'status', 'status': 'status',
  };

  // 診療科名 → IDの逆引き
  const deptNameToId = {};
  for (const [id, name] of Object.entries(DEPARTMENTS)) {
    deptNameToId[name] = parseInt(id);
  }

  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^"(.*)"$/, '$1'));
    if (values.length < headers.length) continue;

    const row = {};
    headers.forEach((h, idx) => {
      const key = headerMap[h] || h;
      row[key] = values[idx];
    });

    // 型変換
    if (row.points) row.points = parseInt(row.points) || 0;
    if (row.amount) row.amount = parseInt(row.amount) || 0;
    if (row.department_id) {
      if (isNaN(row.department_id)) {
        row.department_id = deptNameToId[row.department_id] || 1;
      } else {
        row.department_id = parseInt(row.department_id);
      }
    }

    // ID自動生成
    if (!row.id) {
      row.id = 'R-CSV-' + String(i).padStart(4, '0');
    }

    records.push(row);
  }
  return records;
}

// デバウンス
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// localStorageからカスタム診療科を読み込み
function loadCustomDepartments() {
  const saved = localStorage.getItem('customDepartments');
  if (saved) {
    try {
      const custom = JSON.parse(saved);
      Object.keys(DEPARTMENTS).forEach(function (k) { delete DEPARTMENTS[k]; });
      Object.assign(DEPARTMENTS, custom);
    } catch (e) { /* ignore */ }
  }
}

// レセプトID自動生成
function generateReceiptId(existingData) {
  const year = new Date().getFullYear();
  let maxNum = 0;
  existingData.forEach(function (r) {
    const match = (r.id || '').match(/R-\d{4}-(\d+)/);
    if (match) {
      const num = parseInt(match[1]);
      if (num > maxNum) maxNum = num;
    }
  });
  return 'R-' + year + '-' + String(maxNum + 1).padStart(4, '0');
}

// localStorage からレセプトデータを読み込み (なければMOCK_RECEIPTSを返す)
function loadReceiptData() {
  const saved = localStorage.getItem('receiptData');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* ignore */ }
  }
  return [...MOCK_RECEIPTS];
}

// レセプトデータをlocalStorageに保存
function saveReceiptData(data) {
  localStorage.setItem('receiptData', JSON.stringify(data));
}

// 表示設定を読み込み
function loadDisplaySettings() {
  const defaults = { perPage: 10, sortColumn: 'visit_date', sortDirection: 'desc' };
  const saved = localStorage.getItem('displaySettings');
  if (saved) {
    try { return Object.assign(defaults, JSON.parse(saved)); } catch (e) { /* ignore */ }
  }
  return defaults;
}

// トースト通知
function showToast(message, type) {
  type = type || 'success';
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
  toast.innerHTML = '<i class="fa-solid ' + (icons[type] || icons.info) + '"></i> ' + message;
  container.appendChild(toast);

  requestAnimationFrame(function () {
    toast.classList.add('show');
  });

  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 300);
  }, 2500);
}

// モーダル開閉
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// CSVエクスポート
function exportToCSV(data, filename) {
  filename = filename || 'receipts.csv';
  const headers = ['患者ID', '患者名', '診療日', '診療科', '病名', '保険種別', '点数', '金額', 'ステータス'];
  const rows = data.map(function (r) {
    return [
      r.patient_id,
      r.patient_name,
      r.visit_date,
      getDepartmentName(r.department_id),
      r.diagnosis,
      r.insurance_type,
      r.points,
      r.amount,
      r.status,
    ].map(function (v) {
      const s = String(v || '');
      return s.includes(',') ? '"' + s + '"' : s;
    }).join(',');
  });

  const csv = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
