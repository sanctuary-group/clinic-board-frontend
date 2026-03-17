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
