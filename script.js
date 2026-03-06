const competitors = [
    { platform: "Coursera", origin: "USA", model: "For-Profit", language: "English", depth: "Basic-Adv", pricing: "Subscription", price: 830, cert: "High", target: "Professionals", community: "Strong" },
    { platform: "Udemy", origin: "USA", model: "For-Profit", language: "EN/AR mixed", depth: "Basic-Int", pricing: "One-time", price: 450, cert: "Low", target: "All", community: "Weak" },
    { platform: "Udacity", origin: "USA", model: "For-Profit", language: "English", depth: "Intermediate-Adv", pricing: "Nanodegree", price: 11250, cert: "High", target: "Professionals", community: "Medium" },
    { platform: "edX", origin: "USA", model: "Non-profit", language: "English", depth: "Int-Adv", pricing: "Audit/Paid", price: 13750, cert: "High", target: "Professionals/Grads", community: "Medium" },
    { platform: "Codecademy", origin: "USA", model: "For-Profit", language: "English", depth: "Basic-Int", pricing: "Subscription", price: 750, cert: "Low-Med", target: "Students", community: "Medium" },
    { platform: "Edraak", origin: "Jordan", model: "Non-profit", language: "Arabic", depth: "Basic-Int", pricing: "Freemium", price: 250, cert: "Medium", target: "Students/All", community: "Strong" },
    { platform: "Rwaq", origin: "Saudi Arabia", model: "For-Profit", language: "Arabic", depth: "Basic-Int", pricing: "Freemium", price: 300, cert: "Low-Med", target: "Students", community: "Medium" },
    { platform: "Almentor", origin: "Egypt/UAE", model: "For-Profit", language: "Arabic", depth: "Basic-Int", pricing: "Subscription", price: 850, cert: "Low-Med", target: "Professionals", community: "Medium" },
    { platform: "MaharaTech", origin: "Egypt", model: "Gov-Backed", language: "Arabic", depth: "Basic-Adv", pricing: "Free", price: 0, cert: "High", target: "Graduates", community: "Strong" },
    { platform: "Sprints.ai", origin: "Egypt", model: "For-Profit", language: "AR+EN", depth: "Int-Adv", pricing: "Upfront/ISA", price: 40000, cert: "High", target: "Graduates", community: "Strong" },
    { platform: "GOMYCODE", origin: "Tunisia/Egypt", model: "For-Profit", language: "AR+EN", depth: "Basic-Int", pricing: "One-time/Install", price: 10350, cert: "Medium", target: "Students/Grads", community: "Medium" },
    { platform: "AMIT Learning", origin: "Egypt", model: "For-Profit", language: "Arabic", depth: "Int-Adv", pricing: "One-time", price: 14000, cert: "High", target: "Graduates", community: "Strong" },
    { platform: "ITI", origin: "Egypt", model: "Gov-Backed", language: "Arabic", depth: "Int-Adv", pricing: "Free", price: 0, cert: "Very High", target: "Top Graduates", community: "Strong" },
    { platform: "DataLyze", origin: "Egypt", model: "For-Profit", language: "Arabic", depth: "Basic-Int", pricing: "One-time", price: 3250, cert: "Low-Med", target: "Students/Pros", community: "Medium" },
    { platform: "LinkedIn Learning", origin: "USA", model: "For-Profit", language: "EN+AR partial", depth: "Basic-Int", pricing: "Subscription", price: 1250, cert: "Medium", target: "Professionals", community: "Strong" },
];

const competency = [
    { path: "Coursera Google DA", months: 6, cost: 4980, jobMonths: 10.5, cert: "High" },
    { path: "Edraak Free Path", months: 7, cost: 500, jobMonths: 15, cert: "Medium" },
    { path: "GOMYCODE DA Track", months: 4.5, cost: 14000, jobMonths: 7.5, cert: "Medium" },
    { path: "Sprints Bootcamp", months: 2.5, cost: 42500, jobMonths: 4.5, cert: "High" },
    { path: "ITI (Free/Select)", months: 4, cost: 0, jobMonths: 2, cert: "Very High" },
    { path: "AMIT DA Diploma", months: 5.5, cost: 17500, jobMonths: 7.5, cert: "High" },
    { path: "Target Platform", months: 3.5, cost: 4990, jobMonths: 5, cert: "High" },
];

const trustData = [
    { name: "ITI", price: 0, trust: 95, isTarget: false },
    { name: "Sprints", price: 42500, trust: 82, isTarget: false },
    { name: "AMIT", price: 17500, trust: 80, isTarget: false },
    { name: "Udacity", price: 67500, trust: 78, isTarget: false },
    { name: "Coursera", price: 7500, trust: 75, isTarget: false },
    { name: "edX", price: 13750, trust: 73, isTarget: false },
    { name: "MaharaTech", price: 0, trust: 65, isTarget: false },
    { name: "Edraak", price: 250, trust: 60, isTarget: false },
    { name: "GOMYCODE", price: 10350, trust: 55, isTarget: false },
    { name: "Almentor", price: 10500, trust: 45, isTarget: false },
    { name: "DataLyze", price: 3250, trust: 42, isTarget: false },
    { name: "Udemy", price: 450, trust: 35, isTarget: false },
    { name: "Target Platform", price: 4990, trust: 72, isTarget: true },
];

const heatmapData = {
    rows: [
        "Global (Coursera/edX)",
        "Global (Udemy)",
        "Global (Udacity)",
        "Regional (Edraak)",
        "Regional (Rwaq)",
        "Regional (Almentor)",
        "Local Gov (ITI/Mahara)",
        "Local Boot (Sprints)",
        "Local Boot (GOMYCODE)",
        "Local Boot (AMIT)",
    ],
    cols: ["Python", "SQL", "Power BI", "Tableau", "ML/AI", "Web Dev", "Embedded", "Data Eng."],
    values: [
        [3, 3, 2, 2, 3, 3, 1, 2],
        [3, 3, 3, 3, 3, 3, 2, 2],
        [2, 2, 1, 1, 3, 2, 0, 1],
        [2, 1, 0, 0, 1, 2, 0, 0],
        [1, 1, 0, 0, 1, 1, 0, 0],
        [1, 1, 1, 0, 1, 1, 0, 0],
        [3, 2, 1, 1, 3, 3, 2, 1],
        [3, 1, 0, 0, 3, 3, 3, 1],
        [2, 1, 1, 0, 2, 3, 0, 0],
        [2, 1, 0, 0, 3, 2, 3, 1],
    ]
};

const NAVY = '#0B1D3A', TEAL = '#00C9A7', GOLD = '#F0B429', SKY = '#4FC3F7', DANGER = '#FF6B6B', TEXT = '#E8EEF7', DIMTEXT = '#8FA3C0', GRID = 'rgba(255,255,255,0.06)';

Chart.defaults.color = DIMTEXT;
Chart.defaults.font.family = 'DM Mono, monospace';
Chart.defaults.font.size = 11;

function certToNum(cert) {
    return { "Very High": 4, "High": 3, "Medium": 2, "Low-Med": 1, "Low": 0 }[cert] ?? 0;
}

function formatPrice(p) {
    if (p === 0) return 'Free';
    return p.toLocaleString('en-EG') + ' EGP';
}

// Chart 1: Market Positioning
(function () {
    const ctx = document.getElementById('positioningChart').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Competitors',
                data: competitors.filter(p => p.platform !== 'Target Platform').map(p => ({ x: p.price, y: certToNum(p.cert), label: p.platform })),
                backgroundColor: 'rgba(79,195,247,0.65)', borderColor: SKY, borderWidth: 1, pointRadius: 7, pointHoverRadius: 10,
            }, {
                label: 'Target Platform',
                data: [{ x: 4990, y: 3, label: 'Target Platform' }],
                backgroundColor: GOLD, borderColor: GOLD, borderWidth: 2, pointRadius: 11, pointHoverRadius: 14, pointStyle: 'star',
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top', labels: { color: DIMTEXT, boxWidth: 12, padding: 16, font: { size: 11 } } },
                tooltip: {
                    backgroundColor: '#122347', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
                    callbacks: {
                        title: (items) => items[0].raw.label,
                        label: (item) => [`Price: ${formatPrice(item.parsed.x)}`, `Cert Value: ${['None', 'Low-Med', 'Medium', 'High', 'Very High'][item.parsed.y]}`]
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Price (EGP)', color: DIMTEXT }, grid: { color: GRID }, ticks: { color: DIMTEXT, callback: v => v >= 1000 ? (v / 1000) + 'K' : v }, min: -2000, max: 70000 },
                y: { title: { display: true, text: 'Certification Value', color: DIMTEXT }, grid: { color: GRID }, ticks: { color: DIMTEXT, stepSize: 1, callback: v => ['', 'Low-Med', 'Medium', 'High', 'V.High'][v] || '' }, min: 0, max: 4 }
            }
        },
        plugins: [{
            id: 'quadrantLines',
            afterDraw(chart) {
                const { ctx, scales: { x, y } } = chart;
                const x5 = x.getPixelForValue(5000), y25 = y.getPixelForValue(2.5);
                ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = 'rgba(0,201,167,0.3)'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(x5, chart.chartArea.top); ctx.lineTo(x5, chart.chartArea.bottom); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(chart.chartArea.left, y25); ctx.lineTo(chart.chartArea.right, y25); ctx.stroke();
                ctx.setLineDash([]); ctx.fillStyle = 'rgba(0,201,167,0.18)'; ctx.font = '9px DM Mono,monospace';
                ctx.fillText('Value Zone', x.getPixelForValue(0) + 10, y.getPixelForValue(4) + 14);
                ctx.fillText('Premium', x.getPixelForValue(50000), y.getPixelForValue(4) + 14); ctx.restore();
            }
        }]
    });
})();

// Chart 2: Cost-to-Competency
(function () {
    const ctx = document.getElementById('competencyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: competency.map(c => c.path),
            datasets: [{
                label: 'Total Cost (EGP)',
                data: competency.map(c => c.cost),
                backgroundColor: competency.map(c => c.path === 'Target Platform' ? GOLD : c.cost === 0 ? TEAL : c.cost > 20000 ? DANGER : 'rgba(79,195,247,0.7)'),
                borderRadius: 5, borderSkipped: false,
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#122347', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
                    callbacks: { label: (item) => `Cost: ${formatPrice(item.raw)} | Job-ready in: ${competency[item.dataIndex].jobMonths} months` }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: DIMTEXT, maxRotation: 35, font: { size: 9 } } },
                y: { grid: { color: GRID }, ticks: { color: DIMTEXT, callback: v => v >= 1000 ? (v / 1000) + 'K' : v } }
            }
        },
        plugins: [{
            id: 'targetLine',
            afterDraw(chart) {
                const { ctx, scales: { y }, chartArea } = chart;
                const lineY = y.getPixelForValue(4990);
                ctx.save(); ctx.setLineDash([6, 4]); ctx.strokeStyle = GOLD; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(chartArea.left, lineY); ctx.lineTo(chartArea.right, lineY); ctx.stroke();
                ctx.setLineDash([]); ctx.fillStyle = GOLD; ctx.font = 'bold 9px DM Mono,monospace';
                ctx.fillText('Target: 4,990 EGP', chartArea.right - 100, lineY - 6); ctx.restore();
            }
        }]
    });
})();

// Chart 3: Trust vs Price
(function () {
    const ctx = document.getElementById('trustChart').getContext('2d');
    const normal = trustData.filter(d => !d.isTarget), target = trustData.filter(d => d.isTarget);
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                { label: 'Competitors', data: normal.map(d => ({ x: d.price, y: d.trust, name: d.name })), backgroundColor: 'rgba(79,195,247,0.6)', borderColor: SKY, borderWidth: 1, pointRadius: 7, pointHoverRadius: 10 },
                { label: '⭐ Target Platform', data: target.map(d => ({ x: d.price, y: d.trust, name: d.name })), backgroundColor: GOLD, borderColor: GOLD, borderWidth: 2, pointRadius: 12, pointHoverRadius: 15, pointStyle: 'star' }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top', labels: { color: DIMTEXT, boxWidth: 12, padding: 16 } },
                tooltip: {
                    backgroundColor: '#122347', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
                    callbacks: { title: (items) => items[0].raw.name, label: (item) => [`Price: ${formatPrice(item.parsed.x)}`, `Trust Score: ${item.parsed.y}/100`] }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Price (EGP)', color: DIMTEXT }, grid: { color: GRID }, ticks: { color: DIMTEXT, callback: v => v >= 1000 ? (v / 1000) + 'K' : v }, min: -3000, max: 75000 },
                y: { title: { display: true, text: 'Trust Score (0–100)', color: DIMTEXT }, grid: { color: GRID }, ticks: { color: DIMTEXT }, min: 20, max: 100 }
            }
        },
        plugins: [{
            id: 'labelPoints',
            afterDatasetsDraw(chart) {
                const { ctx } = chart;
                chart.data.datasets.forEach((dataset, di) => {
                    const meta = chart.getDatasetMeta(di);
                    meta.data.forEach((pt, i) => {
                        const d = dataset.data[i];
                        ctx.save(); ctx.fillStyle = di === 1 ? GOLD : 'rgba(232,238,247,0.75)';
                        ctx.font = di === 1 ? 'bold 10px Outfit,sans-serif' : '9px Outfit,sans-serif';
                        ctx.fillText(d.name, pt.x + 8, pt.y - 6); ctx.restore();
                    });
                });
            }
        }]
    });
})();

// Chart 4: Time to Employment
(function () {
    const ctx = document.getElementById('timeChart').getContext('2d');
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: competency.map((c, i) => ({
                label: c.path,
                data: [{ x: c.cost, y: c.jobMonths, r: 10 + (c.months * 2.5) }],
                backgroundColor: c.path === 'Target Platform' ? 'rgba(240,180,41,0.75)' : c.cost === 0 ? 'rgba(0,201,167,0.6)' : c.cost > 20000 ? 'rgba(255,107,107,0.6)' : 'rgba(79,195,247,0.5)',
                borderColor: c.path === 'Target Platform' ? GOLD : 'transparent', borderWidth: 2,
            }))
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#122347', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
                    callbacks: {
                        title: (items) => competency[items[0].datasetIndex].path,
                        label: (item) => { const d = competency[item.datasetIndex]; return [`Cost: ${formatPrice(d.cost)}`, `Months to hire: ${d.jobMonths}`, `Duration: ${d.months} months`]; }
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Total Cost (EGP)', color: DIMTEXT }, grid: { color: GRID }, ticks: { color: DIMTEXT, callback: v => v >= 1000 ? (v / 1000) + 'K' : v } },
                y: { title: { display: true, text: 'Months to Employment', color: DIMTEXT }, grid: { color: GRID }, ticks: { color: DIMTEXT } }
            }
        },
        plugins: [{
            id: 'bubbleLabels',
            afterDatasetsDraw(chart) {
                const { ctx } = chart;
                chart.data.datasets.forEach((ds, di) => {
                    const meta = chart.getDatasetMeta(di);
                    if (!meta.data[0]) return;
                    const pt = meta.data[0];
                    const short = ds.label.split(' ')[0];
                    ctx.save(); ctx.fillStyle = di === 6 ? GOLD : TEXT; ctx.font = di === 6 ? 'bold 10px Outfit,sans-serif' : '9px Outfit,sans-serif';
                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(short, pt.x, pt.y); ctx.restore();
                });
            }
        }]
    });
})();

// Heatmap
(function () {
    const table = document.getElementById('heatmapTable');
    const tooltip = document.getElementById('tooltip');
    const labels = ['None', 'Low', 'Medium', 'High'];
    const colors = ['heat-0', 'heat-1', 'heat-2', 'heat-3'];
    const descriptions = {
        "Python": "General-purpose programming for data tasks",
        "SQL": "Structured Query Language for databases",
        "Power BI": "Microsoft's BI & reporting tool  major gap in Arabic market",
        "Tableau": "Drag-and-drop data visualization platform",
        "ML/AI": "Machine Learning and Artificial Intelligence tracks",
        "Web Dev": "Frontend and backend development",
        "Embedded": "Embedded systems and IoT programming",
        "Data Eng.": "Data pipelines, ETL, dbt, and data infrastructure"
    };

    const thead = document.createElement('thead');
    const hrow = document.createElement('tr');
    const thBlank = document.createElement('th');
    thBlank.className = 'row-label'; thBlank.textContent = 'Provider Type'; hrow.appendChild(thBlank);
    heatmapData.cols.forEach(col => {
        const th = document.createElement('th'); th.textContent = col;
        if (col === 'Power BI' || col === 'Tableau') th.style.color = TEAL;
        hrow.appendChild(th);
    });
    thead.appendChild(hrow); table.appendChild(thead);

    const tbody = document.createElement('tbody');
    heatmapData.rows.forEach((row, ri) => {
        const tr = document.createElement('tr');
        const tdLabel = document.createElement('td');
        tdLabel.className = 'label-cell'; tdLabel.textContent = row; tr.appendChild(tdLabel);
        heatmapData.values[ri].forEach((val, ci) => {
            const td = document.createElement('td');
            td.className = colors[val]; td.textContent = val;
            td.addEventListener('mousemove', (e) => {
                tooltip.style.display = 'block';
                tooltip.style.left = (e.clientX + 14) + 'px';
                tooltip.style.top = (e.clientY - 10) + 'px';
                tooltip.innerHTML = `<div class="tt-name">${heatmapData.cols[ci]}</div>
<div>${row}</div>
<div style="margin-top:4px;color:${val === 0 ? '#4A6080' : val === 3 ? TEAL : DIMTEXT}">Coverage: <strong>${labels[val]}</strong></div>
<div style="margin-top:4px;font-size:10px;color:#4A6080">${descriptions[heatmapData.cols[ci]] || ''}</div>`;
            });
            td.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
})();

// Competitor Table
let sortKey = null, sortDir = 1;

function certClass(cert) {
    return { "Very High": "badge-cert-very-high", "High": "badge-cert-high", "Medium": "badge-cert-medium", "Low-Med": "badge-cert-low-med", "Low": "badge-cert-low" }[cert] || "badge-cert-low";
}

function langClass(lang) {
    const l = lang.toLowerCase();
    if (l.includes('arabic') || l === 'ar+en') { if (l.includes('en') || l.includes('+')) return 'badge-lang-both'; return 'badge-lang-ar'; }
    return 'badge-lang-en';
}

function priceClass(price) { if (price === 0) return 'free'; if (price > 15000) return 'high'; return ''; }

function renderTable() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const lang = document.getElementById('langFilter').value.toLowerCase();
    const cert = document.getElementById('certFilter').value.toLowerCase();
    const price = document.getElementById('priceFilter').value;

    let filtered = competitors.filter(c => {
        const matchSearch = !search || c.platform.toLowerCase().includes(search) || c.origin.toLowerCase().includes(search) || c.model.toLowerCase().includes(search);
        const matchLang = !lang || c.language.toLowerCase().includes(lang) || (lang === 'ar+en' && (c.language.toLowerCase().includes('ar+en') || c.language.toLowerCase().includes('mixed')));
        const matchCert = !cert || c.cert.toLowerCase() === cert;
        let matchPrice = true;
        if (price === 'free') matchPrice = c.price === 0;
        else if (price === 'low') matchPrice = c.price > 0 && c.price < 1000;
        else if (price === 'mid') matchPrice = c.price >= 1000 && c.price <= 10000;
        else if (price === 'high') matchPrice = c.price > 10000;
        return matchSearch && matchLang && matchCert && matchPrice;
    });

    if (sortKey) {
        filtered.sort((a, b) => {
            let av = a[sortKey], bv = b[sortKey];
            if (sortKey === 'price') return (av - bv) * sortDir;
            if (sortKey === 'cert') return (certToNum(av) - certToNum(bv)) * sortDir;
            return av.localeCompare(bv) * sortDir;
        });
    }

    document.getElementById('resultCount').textContent = `${filtered.length} of ${competitors.length} platforms`;
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    filtered.forEach(c => {
        const tr = document.createElement('tr');
        const isTarget = c.platform === 'Target Platform';
        if (isTarget) tr.style.background = 'rgba(240,180,41,0.06)';
        tr.innerHTML = `
  <td>${isTarget ? '⭐ ' : ''}${c.platform}</td>
  <td style="color:var(--text-dim)">${c.origin}</td>
  <td style="color:var(--text-dim);font-size:12px">${c.model}</td>
  <td><span class="badge ${langClass(c.language)}">${c.language}</span></td>
  <td style="color:var(--text-dim);font-size:12px">${c.depth}</td>
  <td><span class="price-tag ${priceClass(c.price)}">${formatPrice(c.price)}</span></td>
  <td><span class="badge ${certClass(c.cert)}">${c.cert}</span></td>
  <td style="color:var(--text-dim);font-size:12px">${c.target}</td>
  <td style="color:var(--text-dim);font-size:12px">${c.community}</td>
`;
        tbody.appendChild(tr);
    });
}

function sortTable(key) {
    if (sortKey === key) sortDir *= -1; else { sortKey = key; sortDir = 1; }
    document.querySelectorAll('.data-table thead th').forEach(th => th.classList.remove('sorted'));
    renderTable();
}

document.getElementById('searchInput').addEventListener('input', renderTable);
document.getElementById('langFilter').addEventListener('change', renderTable);
document.getElementById('certFilter').addEventListener('change', renderTable);
document.getElementById('priceFilter').addEventListener('change', renderTable);

renderTable();

document.querySelectorAll('.section').forEach((s, i) => { s.style.animationDelay = (i * 0.1) + 's'; });