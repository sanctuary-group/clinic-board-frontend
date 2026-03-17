// 診療科マスター
const DEPARTMENTS = {
  1: '内科',
  2: '外科',
  3: '整形外科',
  4: '皮膚科',
  5: '眼科',
  6: '耳鼻咽喉科',
  7: '小児科',
  8: '産婦人科',
};

// レセプトダミーデータ
const MOCK_RECEIPTS = [
  { id: 'R-2026-0001', patient_id: 'P001', patient_name: '山田 太郎', visit_date: '2026-03-01', department_id: 1, diagnosis: '急性上気道炎', points: 520, amount: 5200, insurance_type: '社保', status: '確定' },
  { id: 'R-2026-0002', patient_id: 'P002', patient_name: '佐藤 花子', visit_date: '2026-03-01', department_id: 4, diagnosis: 'アトピー性皮膚炎', points: 380, amount: 3800, insurance_type: '国保', status: '確定' },
  { id: 'R-2026-0003', patient_id: 'P003', patient_name: '鈴木 一郎', visit_date: '2026-03-02', department_id: 3, diagnosis: '腰椎椎間板ヘルニア', points: 1250, amount: 12500, insurance_type: '社保', status: '保留' },
  { id: 'R-2026-0004', patient_id: 'P004', patient_name: '高橋 美咲', visit_date: '2026-03-02', department_id: 8, diagnosis: '妊婦健康診査', points: 890, amount: 8900, insurance_type: '国保', status: '確定' },
  { id: 'R-2026-0005', patient_id: 'P005', patient_name: '田中 健二', visit_date: '2026-03-03', department_id: 1, diagnosis: '2型糖尿病', points: 750, amount: 7500, insurance_type: '後期高齢', status: '確定' },
  { id: 'R-2026-0006', patient_id: 'P006', patient_name: '伊藤 由美', visit_date: '2026-03-03', department_id: 5, diagnosis: '白内障', points: 2100, amount: 21000, insurance_type: '後期高齢', status: '返戻' },
  { id: 'R-2026-0007', patient_id: 'P007', patient_name: '渡辺 大輔', visit_date: '2026-03-04', department_id: 2, diagnosis: '急性虫垂炎', points: 3500, amount: 35000, insurance_type: '社保', status: '確定' },
  { id: 'R-2026-0008', patient_id: 'P008', patient_name: '中村 さくら', visit_date: '2026-03-04', department_id: 7, diagnosis: '気管支喘息', points: 620, amount: 6200, insurance_type: '国保', status: '確定' },
  { id: 'R-2026-0009', patient_id: 'P009', patient_name: '小林 正義', visit_date: '2026-03-05', department_id: 6, diagnosis: 'アレルギー性鼻炎', points: 430, amount: 4300, insurance_type: '社保', status: '保留' },
  { id: 'R-2026-0010', patient_id: 'P010', patient_name: '加藤 真理', visit_date: '2026-03-05', department_id: 1, diagnosis: '高血圧症', points: 580, amount: 5800, insurance_type: '後期高齢', status: '確定' },
  { id: 'R-2026-0011', patient_id: 'P011', patient_name: '吉田 隆', visit_date: '2026-03-06', department_id: 3, diagnosis: '変形性膝関節症', points: 980, amount: 9800, insurance_type: '後期高齢', status: '確定' },
  { id: 'R-2026-0012', patient_id: 'P012', patient_name: '山口 恵子', visit_date: '2026-03-06', department_id: 4, diagnosis: '蕁麻疹', points: 350, amount: 3500, insurance_type: '社保', status: '確定' },
  { id: 'R-2026-0013', patient_id: 'P013', patient_name: '松本 翔太', visit_date: '2026-03-07', department_id: 2, diagnosis: '鼠径ヘルニア', points: 2800, amount: 28000, insurance_type: '社保', status: '返戻' },
  { id: 'R-2026-0014', patient_id: 'P014', patient_name: '井上 美穂', visit_date: '2026-03-07', department_id: 8, diagnosis: '子宮筋腫', points: 1500, amount: 15000, insurance_type: '国保', status: '確定' },
  { id: 'R-2026-0015', patient_id: 'P015', patient_name: '木村 和也', visit_date: '2026-03-08', department_id: 1, diagnosis: '脂質異常症', points: 490, amount: 4900, insurance_type: '社保', status: '確定' },
  { id: 'R-2026-0016', patient_id: 'P016', patient_name: '林 幸子', visit_date: '2026-03-08', department_id: 5, diagnosis: '緑内障', points: 1800, amount: 18000, insurance_type: '後期高齢', status: '保留' },
  { id: 'R-2026-0017', patient_id: 'P017', patient_name: '清水 拓也', visit_date: '2026-03-09', department_id: 7, diagnosis: '手足口病', points: 410, amount: 4100, insurance_type: '国保', status: '確定' },
  { id: 'R-2026-0018', patient_id: 'P018', patient_name: '阿部 直美', visit_date: '2026-03-09', department_id: 6, diagnosis: '突発性難聴', points: 1350, amount: 13500, insurance_type: '社保', status: '確定' },
  { id: 'R-2026-0019', patient_id: 'P019', patient_name: '坂本 浩二', visit_date: '2026-03-10', department_id: 1, diagnosis: '逆流性食道炎', points: 560, amount: 5600, insurance_type: '国保', status: '返戻' },
  { id: 'R-2026-0020', patient_id: 'P020', patient_name: '岡田 麻衣', visit_date: '2026-03-10', department_id: 3, diagnosis: '肩関節周囲炎', points: 720, amount: 7200, insurance_type: '社保', status: '確定' },
  { id: 'R-2026-0021', patient_id: 'P021', patient_name: '藤田 勇気', visit_date: '2026-03-11', department_id: 2, diagnosis: '胆石症', points: 2400, amount: 24000, insurance_type: '後期高齢', status: '確定' },
  { id: 'R-2026-0022', patient_id: 'P022', patient_name: '後藤 智子', visit_date: '2026-03-11', department_id: 4, diagnosis: '帯状疱疹', points: 680, amount: 6800, insurance_type: '国保', status: '保留' },
  { id: 'R-2026-0023', patient_id: 'P023', patient_name: '長谷川 修', visit_date: '2026-03-12', department_id: 1, diagnosis: '慢性胃炎', points: 470, amount: 4700, insurance_type: '後期高齢', status: '確定' },
  { id: 'R-2026-0024', patient_id: 'P024', patient_name: '石井 愛', visit_date: '2026-03-12', department_id: 7, diagnosis: 'RSウイルス感染症', points: 550, amount: 5500, insurance_type: '国保', status: '確定' },
  { id: 'R-2026-0025', patient_id: 'P025', patient_name: '前田 康平', visit_date: '2026-03-13', department_id: 5, diagnosis: '糖尿病性網膜症', points: 1650, amount: 16500, insurance_type: '社保', status: '確定' },
  { id: 'R-2026-0026', patient_id: 'P026', patient_name: '小川 裕子', visit_date: '2026-03-13', department_id: 8, diagnosis: '更年期障害', points: 640, amount: 6400, insurance_type: '国保', status: '確定' },
  { id: 'R-2026-0027', patient_id: 'P027', patient_name: '村上 達也', visit_date: '2026-03-14', department_id: 6, diagnosis: '慢性副鼻腔炎', points: 920, amount: 9200, insurance_type: '社保', status: '返戻' },
  { id: 'R-2026-0028', patient_id: 'P028', patient_name: '近藤 理恵', visit_date: '2026-03-14', department_id: 1, diagnosis: '不整脈', points: 830, amount: 8300, insurance_type: '後期高齢', status: '確定' },
];

// サマリー集計データ (モックデータから自動計算用の初期値)
const MOCK_SUMMARY = {
  total_patients: 28,
  total_claims: 28,
  total_revenue: 0, // init() で計算
  avg_points: 0,    // init() で計算
};
