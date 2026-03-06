import { useState, useMemo } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine,
  LabelList, Legend
} from "recharts";

// ═══════════════════════════════════════════════════════════════
//  البيانات — DATA (Arabic)
// ═══════════════════════════════════════════════════════════════

const CERT_NUM = { "مرتفعة جداً": 4, "مرتفعة": 3, "متوسطة": 2, "متوسطة-منخفضة": 1, "منخفضة": 0 };

const COMPETITORS = [
  { platform:"كورسيرا",         origin:"الولايات المتحدة",  model:"ربحي",         lang:"الإنجليزية",        depth:"أساسي–متقدم",   pricing:"اشتراك",         price:830,   cert:"مرتفعة",        certN:3, target:"المحترفون",         community:"قوي",    trust:75 },
  { platform:"يوديمي",          origin:"الولايات المتحدة",  model:"ربحي",         lang:"إنجليزي/عربي",     depth:"أساسي–متوسط",   pricing:"مرة واحدة",     price:450,   cert:"منخفضة",        certN:0, target:"الجميع",            community:"ضعيف",   trust:35 },
  { platform:"يوداسيتي",        origin:"الولايات المتحدة",  model:"ربحي",         lang:"الإنجليزية",        depth:"متوسط–متقدم",   pricing:"نانودرجة",      price:11250, cert:"مرتفعة",        certN:3, target:"المحترفون",         community:"متوسط",  trust:78 },
  { platform:"edX",             origin:"الولايات المتحدة",  model:"غير ربحي",    lang:"الإنجليزية",        depth:"متوسط–متقدم",   pricing:"مجاني/مدفوع",  price:13750, cert:"مرتفعة",        certN:3, target:"المحترفون/الخريجون", community:"متوسط",  trust:73 },
  { platform:"كودكاديمي",       origin:"الولايات المتحدة",  model:"ربحي",         lang:"الإنجليزية",        depth:"أساسي–متوسط",   pricing:"اشتراك",         price:750,   cert:"متوسطة-منخفضة", certN:1, target:"الطلاب",            community:"متوسط",  trust:45 },
  { platform:"إدراك",           origin:"الأردن",            model:"غير ربحي",    lang:"العربية",           depth:"أساسي–متوسط",   pricing:"مجاني جزئياً", price:250,   cert:"متوسطة",        certN:2, target:"الطلاب/الجميع",    community:"قوي",    trust:60 },
  { platform:"رواق",            origin:"السعودية",          model:"ربحي",         lang:"العربية",           depth:"أساسي–متوسط",   pricing:"مجاني جزئياً", price:300,   cert:"متوسطة-منخفضة", certN:1, target:"الطلاب",            community:"متوسط",  trust:40 },
  { platform:"المنتور",         origin:"مصر/الإمارات",      model:"ربحي",         lang:"العربية",           depth:"أساسي–متوسط",   pricing:"اشتراك",         price:850,   cert:"متوسطة-منخفضة", certN:1, target:"المحترفون",         community:"متوسط",  trust:45 },
  { platform:"مهارة تك",        origin:"مصر",               model:"حكومي",        lang:"العربية",           depth:"أساسي–متقدم",   pricing:"مجاني",          price:0,     cert:"مرتفعة",        certN:3, target:"الخريجون",          community:"قوي",    trust:65 },
  { platform:"سبرينتس",         origin:"مصر",               model:"ربحي",         lang:"عربي+إنجليزي",     depth:"متوسط–متقدم",   pricing:"دفعة/ISA",      price:40000, cert:"مرتفعة",        certN:3, target:"الخريجون",          community:"قوي",    trust:82 },
  { platform:"جوماي كود",       origin:"تونس/مصر",          model:"ربحي",         lang:"عربي+إنجليزي",     depth:"أساسي–متوسط",   pricing:"مرة/أقساط",     price:10350, cert:"متوسطة",        certN:2, target:"الطلاب/الخريجون",  community:"متوسط",  trust:55 },
  { platform:"أميت للتعلم",     origin:"مصر",               model:"ربحي",         lang:"العربية",           depth:"متوسط–متقدم",   pricing:"مرة واحدة",     price:14000, cert:"مرتفعة",        certN:3, target:"الخريجون",          community:"قوي",    trust:80 },
  { platform:"ITI",             origin:"مصر",               model:"حكومي",        lang:"العربية",           depth:"متوسط–متقدم",   pricing:"مجاني",          price:0,     cert:"مرتفعة جداً",   certN:4, target:"خريجو النخبة",      community:"قوي",    trust:95 },
  { platform:"داتالايز",        origin:"مصر",               model:"ربحي",         lang:"العربية",           depth:"أساسي–متوسط",   pricing:"مرة واحدة",     price:3250,  cert:"متوسطة-منخفضة", certN:1, target:"الطلاب/المحترفون", community:"متوسط",  trust:42 },
  { platform:"لينكد إن لرننج", origin:"الولايات المتحدة",  model:"ربحي",         lang:"إنج+عربي جزئي",   depth:"أساسي–متوسط",   pricing:"اشتراك",         price:1250,  cert:"متوسطة",        certN:2, target:"المحترفون",         community:"قوي",    trust:55 },
  { platform:"★ المنصة المستهدفة", origin:"مصر",           model:"ربحي",         lang:"العربية",           depth:"متوسط–متقدم",   pricing:"أقساط",          price:4990,  cert:"مرتفعة",        certN:3, target:"الخريجون/المحترفون", community:"قوي",   trust:72, isTarget:true },
];

const COMPETENCY = [
  { path:"كورسيرا – شهادة Google",  duration:6,   cost:4980,  jobMonths:10.5, certN:3, notes:"إنجليزية فقط؛ اعتراف عالمي" },
  { path:"إدراك – المسار المجاني",  duration:7,   cost:500,   jobMonths:15,   certN:2, notes:"عربي؛ فجوات في المحتوى المتقدم" },
  { path:"جوماي كود – مسار DA",     duration:4.5, cost:14000, jobMonths:7.5,  certN:2, notes:"عربي/إنجليزي؛ لا يتضمن Power BI" },
  { path:"سبرينتس – المعسكر",       duration:2.5, cost:42500, jobMonths:4.5,  certN:3, notes:"أفضل نتائج؛ تكلفة باهظة" },
  { path:"ITI (مجاني/انتقائي)",     duration:4,   cost:0,     jobMonths:2,    certN:4, notes:"انتقائي جداً؛ غير قابل للتوسع" },
  { path:"أميت – دبلومة DA",        duration:5.5, cost:17500, jobMonths:7.5,  certN:3, notes:"يتطلب حضوراً شخصياً" },
  { path:"★ المنصة المستهدفة",      duration:3.5, cost:4990,  jobMonths:5,    certN:3, notes:"عربي أولاً؛ BI + Python + SQL", isTarget:true },
];

const HEATMAP = {
  cols: ["Python","SQL","Power BI","Tableau","ML/AI","تطوير الويب","أنظمة مدمجة","هندسة البيانات"],
  rows: [
    { label:"عالمي (Coursera/edX)",   values:[3,3,2,2,3,3,1,2] },
    { label:"عالمي (Udemy)",           values:[3,3,3,3,3,3,2,2] },
    { label:"عالمي (Udacity)",         values:[2,2,1,1,3,2,0,1] },
    { label:"إقليمي (إدراك)",          values:[2,1,0,0,1,2,0,0] },
    { label:"إقليمي (رواق)",           values:[1,1,0,0,1,1,0,0] },
    { label:"إقليمي (المنتور)",        values:[1,1,1,0,1,1,0,0] },
    { label:"محلي حكومي (ITI/مهارة)", values:[3,2,1,1,3,3,2,1] },
    { label:"معسكر محلي (سبرينتس)",   values:[3,1,0,0,3,3,3,1] },
    { label:"معسكر محلي (جوماي كود)", values:[2,1,1,0,2,3,0,0] },
    { label:"معسكر محلي (أميت)",      values:[2,1,0,0,3,2,3,1] },
  ]
};

const KPIS = [
  { icon:"📊", label:"حجم السوق 2024",         value:"875 مليون $",   sub:"سوق التعليم الإلكتروني – مصر",  color:"#00C9A7" },
  { icon:"📈", label:"المتوقع 2033",            value:"2.38 مليار $",  sub:"معدل نمو 11.77% سنوياً",         color:"#00C9A7" },
  { icon:"⚡", label:"نمو القطاع الإلكتروني",  value:"24.5%",         sub:"معدل نمو سنوي مركب",             color:"#F0B429" },
  { icon:"💰", label:"متوسط تكلفة المعسكر",    value:"40 ألف جنيه",   sub:"المتوسط المحلي",                  color:"#FF6B6B" },
  { icon:"🚀", label:"زيادة الراتب",           value:"+67%",          sub:"متوسط ما بعد المعسكر",           color:"#4FC3F7" },
  { icon:"✅", label:"نسبة التوظيف",           value:"85%",           sub:"خلال 6 أشهر",                    color:"#00C9A7" },
  { icon:"🏢", label:"شركات التعليم النشطة",   value:"234 شركة",      sub:"القاهرة والإسكندرية",            color:"#C084FC" },
  { icon:"🌊", label:"درجة المحيط الأزرق",     value:"0 / 10",        sub:"مزودو دبلومة BI عربية",          color:"#F0B429" },
];

const RISKS = [
  { rank:"١", title:"توسع ITI في مهارة تك", severity:"حرجة", color:"#FF6B6B",
    desc:"إذا ضخّت الحكومة 500 مليون جنيه في مهارة تك مع ربطها بأصحاب العمل، قد تُقدّم نفس القيمة مجاناً." },
  { rank:"٢", title:"إطلاق سبرينتس مسار ذاتي منخفض التكلفة", severity:"مرتفعة", color:"#F0B429",
    desc:"سبرينتس لديها العلامة التجارية والشراكات وتمويل 3 مليون دولار. دبلومة DA عربية رخيصة ستكون التهديد الأول." },
  { rank:"٣", title:"هجرة المدربين إلى الخليج", severity:"متوسطة", color:"#4FC3F7",
    desc:"أفضل الممارسين الناطقين بالعربية يُستقطبون من الإمارات والسعودية أو العمل عن بُعد بأجور أعلى 5–10 مرات." },
];

const FEATURES = [
  { tier:"لا بدّ منها", color:"#FF6B6B", bg:"rgba(255,107,107,0.08)", items:[
    "تعليق صوتي بالعربية المصرية (لا الفصحى)",
    "دفع بالجنيه المصري عبر فوري وميزة",
    "منصة للجوال أولاً مع محتوى قابل للتنزيل",
    "مسار موحّد: Power BI + Python + SQL",
  ]},
  { tier:"محفّزات الأداء", color:"#F0B429", bg:"rgba(240,180,41,0.08)", items:[
    "مقابلات مضمونة لدى 8+ شركات مصرية",
    "جلسات مباشرة أسبوعية مع ممارسين صناعيين",
    "لوحة قياس جاهزية الوظيفة",
    "مفتاح تبديل عربي/إنجليزي",
  ]},
  { tier:"عوامل الإبهار", color:"#4FC3F7", bg:"rgba(79,195,247,0.08)", items:[
    "مستشار مسار مهني بالذكاء الاصطناعي",
    "إرشاد من قيادات Careem وInstabug",
    "مسابقة 'تحدي البيانات مصر' السنوية",
    "مسار مؤسسي لـ Power BI الحكومي",
  ]},
];

// ═══════════════════════════════════════════════════════════════
//  CSS — مضمّن كامل
// ═══════════════════════════════════════════════════════════════

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&family=Tajawal:wght@300;400;500;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #060D1A;
    --surf:     #0D1B2E;
    --surf2:    #121f36;
    --border:   rgba(255,255,255,0.07);
    --teal:     #00C9A7;
    --gold:     #F0B429;
    --sky:      #4FC3F7;
    --rose:     #FF6B6B;
    --violet:   #C084FC;
    --text:     #E2EAF4;
    --muted:    #5E7A9A;
    --dim:      #8FA3C0;
    --cairo:    'Cairo', 'Tajawal', sans-serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--cairo);
    direction: rtl;
    overflow-x: hidden;
  }

  /* شبكة الخلفية */
  #atlas-ar::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      linear-gradient(rgba(0,201,167,.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,201,167,.025) 1px, transparent 1px);
    background-size: 52px 52px;
  }

  #atlas-ar { position: relative; z-index: 1; min-height: 100vh; }

  /* ── شريط التنقل ── */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(6,13,26,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    height: 58px;
  }
  .nav-brand {
    font-size: 13px; font-weight: 700; letter-spacing: .02em; color: var(--teal);
    white-space: nowrap;
  }
  .nav-tabs {
    display: flex; gap: 3px; list-style: none; overflow-x: auto; scrollbar-width: none;
  }
  .nav-tabs::-webkit-scrollbar { display: none; }
  .nav-tabs li button {
    background: none; border: none; cursor: pointer;
    font-family: var(--cairo); font-size: 12px;
    color: var(--muted); padding: 6px 13px; border-radius: 6px;
    transition: color .2s, background .2s; white-space: nowrap;
  }
  .nav-tabs li button:hover { color: var(--text); background: rgba(255,255,255,.05); }
  .nav-tabs li button.active { color: var(--teal); background: rgba(0,201,167,.1); }
  .nav-date { font-size: 11px; color: var(--muted); white-space: nowrap; }

  /* ── التخطيط ── */
  .main { max-width: 1400px; margin: 0 auto; padding: 40px 28px 80px; }

  /* ── رأس الصفحة ── */
  .hdr { margin-bottom: 48px; }
  .hdr-eye {
    font-size: 11px; font-weight: 600; letter-spacing: .1em; color: var(--teal);
    text-transform: uppercase; margin-bottom: 10px;
  }
  .hdr h1 {
    font-size: clamp(28px,4vw,54px); font-weight: 900; line-height: 1.1;
    letter-spacing: -.01em;
  }
  .hdr h1 span { color: var(--teal); }
  .hdr-sub { font-size: 14px; color: var(--muted); margin-top: 10px; max-width: 600px; line-height: 1.7; }

  /* ── قسم ── */
  .sec { margin-bottom: 72px; }
  .sec-hdr { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
  .sec-num { font-size: 11px; font-weight: 700; color: var(--teal); background: rgba(0,201,167,.1); padding: 4px 9px; border-radius: 6px; white-space: nowrap; }
  .sec-title { font-size: 19px; font-weight: 700; color: var(--text); }

  /* ── بطاقات KPI ── */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1px; background: var(--border);
    border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
  }
  .kpi-card { background: var(--surf); padding: 20px 18px; transition: background .2s; cursor: default; }
  .kpi-card:hover { background: var(--surf2); }
  .kpi-icon { font-size: 22px; margin-bottom: 10px; }
  .kpi-label { font-size: 10px; font-weight: 600; letter-spacing: .04em; color: var(--muted); margin-bottom: 6px; }
  .kpi-value { font-size: 24px; font-weight: 900; line-height: 1; margin-bottom: 5px; }
  .kpi-sub { font-size: 11px; color: var(--muted); }

  /* ── بطاقة مخطط ── */
  .chart-card {
    background: var(--surf); border: 1px solid var(--border); border-radius: 12px; padding: 26px;
    transition: border-color .3s, box-shadow .3s;
  }
  .chart-card:hover { border-color: rgba(0,201,167,.2); box-shadow: 0 0 40px rgba(0,201,167,.07); }
  .chart-lbl { font-size: 11px; font-weight: 600; letter-spacing: .06em; color: var(--muted); margin-bottom: 18px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  @media(max-width:860px) { .grid-2 { grid-template-columns: 1fr; } }

  /* ── جدول المنافسين ── */
  .ctrl-row { display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; align-items: center; }
  .srch {
    flex: 1; min-width: 190px;
    background: var(--surf); border: 1px solid var(--border); border-radius: 8px;
    padding: 9px 13px; color: var(--text); font-family: var(--cairo); font-size: 13px;
    outline: none; transition: border-color .2s; text-align: right;
  }
  .srch:focus { border-color: var(--teal); }
  .srch::placeholder { color: var(--muted); }
  .flt {
    background: var(--surf); border: 1px solid var(--border); border-radius: 8px;
    padding: 9px 12px; color: var(--text); font-family: var(--cairo); font-size: 12px;
    outline: none; cursor: pointer; min-width: 130px; direction: rtl;
  }
  .flt option { background: #0D1B2E; }
  .tbl-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: 12px; }
  .tbl { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; }
  .tbl thead th {
    padding: 10px 14px; font-size: 11px; font-weight: 700; color: var(--muted);
    text-align: right; background: var(--surf); cursor: pointer; white-space: nowrap;
    user-select: none; border-bottom: 1px solid var(--border); transition: color .2s;
  }
  .tbl thead th:hover { color: var(--teal); }
  .tbl tbody tr { transition: background .15s; }
  .tbl tbody tr:hover { background: rgba(255,255,255,.03); }
  .tbl tbody td { padding: 11px 14px; border-bottom: 1px solid rgba(255,255,255,.03); vertical-align: middle; text-align: right; }
  .tbl tbody tr:last-child td { border-bottom: none; }

  /* ── شارات ── */
  .badge {
    display: inline-block; padding: 3px 9px; border-radius: 20px;
    font-size: 11px; font-weight: 600;
  }
  .b-ar { background: rgba(240,180,41,.15); color: var(--gold); }
  .b-en { background: rgba(79,195,247,.15); color: var(--sky); }
  .b-both { background: rgba(0,201,167,.15); color: var(--teal); }
  .b-c4 { background: rgba(0,201,167,.2); color: var(--teal); border: 1px solid rgba(0,201,167,.3); }
  .b-c3 { background: rgba(0,201,167,.12); color: #00a889; }
  .b-c2 { background: rgba(240,180,41,.12); color: var(--gold); }
  .b-c1 { background: rgba(255,255,255,.07); color: var(--muted); }
  .b-c0 { background: rgba(255,107,107,.1); color: #ff8a80; }

  /* ── خريطة التشبع ── */
  .hm-wrap { overflow-x: auto; }
  .hm-tbl { border-collapse: separate; border-spacing: 3px; font-size: 12px; min-width: 660px; width: 100%; }
  .hm-tbl th {
    font-size: 10px; font-weight: 700; color: var(--muted); padding: 7px 5px;
    text-align: center; white-space: nowrap;
  }
  .hm-tbl th.rl { text-align: right; padding-right: 4px; }
  .hm-tbl td.rl { font-size: 11px; color: var(--muted); padding: 5px 8px 5px 4px; background: transparent !important; white-space: nowrap; text-align: right; }
  .hm-tbl td.cl {
    text-align: center; padding: 9px 5px; border-radius: 6px;
    font-size: 13px; font-weight: 700; cursor: default;
    transition: transform .15s, box-shadow .15s;
  }
  .hm-tbl td.cl:hover { transform: scale(1.2); box-shadow: 0 4px 16px rgba(0,0,0,.5); position: relative; z-index: 2; }
  .h0 { background: rgba(255,255,255,.04); color: rgba(255,255,255,.2); }
  .h1 { background: rgba(79,195,247,.18); color: #4FC3F7; }
  .h2 { background: rgba(0,201,167,.38); color: #00C9A7; }
  .h3 { background: rgba(0,201,167,.72); color: #002820; }
  .hm-legend { display: flex; gap: 8px; align-items: center; margin-top: 12px; font-size: 11px; color: var(--muted); flex-wrap: wrap; }
  .lg-sw { width: 20px; height: 13px; border-radius: 3px; }
  .hover-info {
    background: rgba(0,201,167,.08); border: 1px solid rgba(0,201,167,.2);
    border-radius: 8px; padding: 8px 14px; margin-bottom: 12px;
    font-size: 12px; color: var(--teal); min-height: 38px; transition: all .2s;
  }

  /* ── المحيط الأزرق ── */
  .bo-card {
    background: linear-gradient(135deg, rgba(0,201,167,.07), rgba(6,13,26,0) 60%), var(--surf);
    border: 1px solid rgba(0,201,167,.3); border-radius: 16px; padding: 34px;
    position: relative; overflow: hidden;
    box-shadow: 0 0 60px rgba(0,201,167,.1);
  }
  .bo-card::before {
    content: ''; position: absolute; top: -80px; left: -80px;
    width: 240px; height: 240px;
    background: radial-gradient(circle, rgba(0,201,167,.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .bo-tag {
    display: inline-block; background: var(--teal); color: #002820;
    font-size: 11px; font-weight: 800; letter-spacing: .06em;
    padding: 5px 12px; border-radius: 4px; margin-bottom: 14px;
  }
  .bo-title { font-size: 26px; font-weight: 900; color: var(--teal); margin-bottom: 12px; line-height: 1.2; }
  .bo-desc { font-size: 14px; color: var(--muted); line-height: 1.75; max-width: 680px; margin-bottom: 28px; }
  .bo-desc strong { color: var(--text); }
  .feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 14px; }
  .feat-card {
    background: rgba(255,255,255,.04); border: 1px solid var(--border);
    border-radius: 10px; padding: 18px 20px; transition: border-color .2s;
  }
  .feat-card:hover { border-color: rgba(0,201,167,.2); }
  .feat-tier { font-size: 10px; font-weight: 800; letter-spacing: .06em; margin-bottom: 10px; }
  .feat-list { list-style: none; }
  .feat-list li {
    font-size: 12px; color: var(--muted); padding: 4px 0;
    display: flex; gap: 8px; align-items: flex-start; line-height: 1.5;
  }
  .feat-list li::before { content: "←"; color: var(--teal); flex-shrink: 0; }

  /* ── المخاطر ── */
  .risk-list { display: flex; flex-direction: column; gap: 12px; }
  .risk-card {
    background: var(--surf); border: 1px solid var(--border); border-right-width: 3px;
    border-radius: 10px; padding: 18px 20px;
    display: flex; gap: 16px; align-items: flex-start; transition: border-color .2s;
  }
  .risk-num {
    width: 34px; height: 34px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; font-weight: 900; flex-shrink: 0;
  }
  .risk-title { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
  .risk-sev { font-size: 10px; font-weight: 700; letter-spacing: .06em; margin-bottom: 6px; }
  .risk-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }

  /* ── تلميح أدوات مخصص ── */
  .tip-box {
    background: #0D1B2E; border: 1px solid rgba(255,255,255,.1);
    border-radius: 8px; padding: 10px 14px;
    font-size: 12px; color: var(--text); box-shadow: 0 8px 32px rgba(0,0,0,.5);
    text-align: right; direction: rtl;
  }
  .tip-name { font-weight: 700; color: var(--teal); margin-bottom: 5px; font-size: 13px; }
  .tip-row { color: var(--muted); margin-top: 2px; }

  /* ── شريط التمرير ── */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--muted); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--teal); }

  @media(max-width:600px) {
    .main { padding: 24px 14px 60px; }
    .nav { padding: 0 14px; }
    .hdr h1 { font-size: 26px; }
  }
`;

// ═══════════════════════════════════════════════════════════════
//  مكوّنات تلميحات الأدوات
// ═══════════════════════════════════════════════════════════════

const ScatterTip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="tip-box">
      <div className="tip-name">{d.name}</div>
      <div className="tip-row">السعر: {d.x === 0 ? "مجاني" : d.x.toLocaleString("ar-EG") + " جنيه"}</div>
      <div className="tip-row">درجة الثقة: {d.y}/100</div>
    </div>
  );
};

const BarTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const d = COMPETENCY.find(c => c.path === label);
  return (
    <div className="tip-box">
      <div className="tip-name">{label}</div>
      <div className="tip-row">التكلفة: {payload[0].value === 0 ? "مجاني" : payload[0].value.toLocaleString("ar-EG") + " جنيه"}</div>
      {d && <>
        <div className="tip-row">المدة: {d.duration} أشهر</div>
        <div className="tip-row">الوقت للتوظيف: {d.jobMonths} أشهر</div>
        <div className="tip-row" style={{marginTop:5,fontSize:11,color:"#4A6080"}}>{d.notes}</div>
      </>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  قسم KPI
// ═══════════════════════════════════════════════════════════════

function KpiSection() {
  return (
    <section className="sec">
      <div className="sec-hdr">
        <span className="sec-num">٠١</span>
        <span className="sec-title">نظرة عامة على السوق والمؤشرات الرئيسية</span>
      </div>
      <div className="kpi-grid">
        {KPIS.map(k => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{color:k.color}}>{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  خريطة السوق
// ═══════════════════════════════════════════════════════════════

function MarketMapSection() {
  const scatterData = COMPETITORS.map(c => ({
    name: c.platform, x: c.price, y: c.trust, isTarget: c.isTarget || false,
    origin: ["الولايات المتحدة","الأردن","السعودية"].includes(c.origin) ? "عالمي/إقليمي" : "محلي",
  }));

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;
    if (payload.isTarget) return (
      <g>
        <circle cx={cx} cy={cy} r={15} fill="rgba(240,180,41,0.2)" stroke="#F0B429" strokeWidth={2}/>
        <circle cx={cx} cy={cy} r={7} fill="#F0B429"/>
        <text x={cx-16} y={cy-12} fontSize={9} fill="#F0B429" fontFamily="Cairo,sans-serif" fontWeight="bold" textAnchor="middle">هدفنا</text>
      </g>
    );
    return <circle cx={cx} cy={cy} r={6} fill={payload.origin === "عالمي/إقليمي" ? "#4FC3F7" : "#00C9A7"} fillOpacity={0.75}/>;
  };

  const global = scatterData.filter(d => d.origin === "عالمي/إقليمي" && !d.isTarget);
  const local  = scatterData.filter(d => d.origin !== "عالمي/إقليمي" && !d.isTarget);
  const target = scatterData.filter(d => d.isTarget);

  return (
    <section className="sec">
      <div className="sec-hdr">
        <span className="sec-num">٠٢</span>
        <span className="sec-title">خريطة السوق — السعر مقابل درجة الثقة</span>
      </div>
      <div className="chart-card">
        <div className="chart-lbl">جميع المنصات · المحور الأفقي = السعر (جنيه) · المحور الرأسي = درجة الثقة (0–100)</div>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{top:20,right:40,bottom:30,left:10}}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)"/>
            <XAxis dataKey="x" type="number" domain={[-2000,75000]}
              tickFormatter={v => v >= 1000 ? (v/1000)+"ك" : v}
              stroke="rgba(255,255,255,0.12)"
              tick={{fill:"#5E7A9A",fontSize:11,fontFamily:"Cairo,sans-serif"}}
              label={{value:"السعر (جنيه مصري)",position:"insideBottom",offset:-15,fill:"#5E7A9A",fontSize:12,fontFamily:"Cairo,sans-serif"}}
            />
            <YAxis dataKey="y" type="number" domain={[25,100]}
              stroke="rgba(255,255,255,0.12)"
              tick={{fill:"#5E7A9A",fontSize:11,fontFamily:"Cairo,sans-serif"}}
              label={{value:"درجة الثقة",angle:-90,position:"insideLeft",fill:"#5E7A9A",fontSize:12,fontFamily:"Cairo,sans-serif"}}
            />
            <Tooltip content={<ScatterTip/>} cursor={{stroke:"rgba(255,255,255,0.08)"}}/>
            <Legend formatter={v => <span style={{color:"#8FA3C0",fontSize:11,fontFamily:"Cairo,sans-serif"}}>{v}</span>}/>
            <Scatter name="عالمي/إقليمي" data={global} shape={<CustomDot/>}/>
            <Scatter name="محلي (مصر)"   data={local}  shape={<CustomDot/>}/>
            <Scatter name="★ هدفنا"      data={target} shape={<CustomDot/>}/>
          </ScatterChart>
        </ResponsiveContainer>
        <div style={{display:"flex",gap:20,marginTop:10,flexWrap:"wrap",justifyContent:"flex-end"}}>
          {[["عالمي/إقليمي","#4FC3F7"],["محلي مصر","#00C9A7"],["★ المنصة المستهدفة","#F0B429"]].map(([l,c]) => (
            <div key={l} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#5E7A9A"}}>
              <span style={{width:10,height:10,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0}}/>
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  جدول المنافسين
// ═══════════════════════════════════════════════════════════════

function CompetitorTable() {
  const [search, setSearch] = useState("");
  const [langF, setLangF] = useState("");
  const [certF, setCertF] = useState("");
  const [priceF, setPriceF] = useState("");
  const [sortKey, setSortKey] = useState("price");
  const [sortDir, setSortDir] = useState(1);

  const filtered = useMemo(() => {
    let d = COMPETITORS.filter(c => {
      const q = search;
      const ms = !q || c.platform.includes(q) || c.origin.includes(q);
      const ml = !langF || c.lang.includes(langF);
      const mc = !certF || c.cert === certF;
      const mp = !priceF ||
        (priceF==="مجاني" && c.price===0) ||
        (priceF==="منخفض" && c.price>0 && c.price<2000) ||
        (priceF==="متوسط" && c.price>=2000 && c.price<=15000) ||
        (priceF==="مرتفع" && c.price>15000);
      return ms && ml && mc && mp;
    });
    d.sort((a,b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (sortKey==="price"||sortKey==="certN"||sortKey==="trust") return (av-bv)*sortDir;
      return String(av).localeCompare(String(bv),"ar")*sortDir;
    });
    return d;
  }, [search,langF,certF,priceF,sortKey,sortDir]);

  const handleSort = k => {
    if (sortKey===k) setSortDir(d=>d*-1);
    else { setSortKey(k); setSortDir(1); }
  };

  const Th = ({col,lbl}) => (
    <th onClick={()=>handleSort(col)}>
      {lbl}{sortKey===col?(sortDir===1?" ↑":" ↓"):" ↕"}
    </th>
  );

  const langBadge = (l) => {
    if (l==="العربية") return <span className="badge b-ar">عربية</span>;
    if (l.includes("+") || l.includes("/")) return <span className="badge b-both">ثنائية</span>;
    return <span className="badge b-en">إنجليزية</span>;
  };
  const certBadge = (cert,n) => <span className={`badge b-c${n}`}>{cert}</span>;

  return (
    <section className="sec">
      <div className="sec-hdr">
        <span className="sec-num">٠٣</span>
        <span className="sec-title">مستكشف بيانات المنافسين ({filtered.length} من {COMPETITORS.length})</span>
      </div>
      <div className="ctrl-row">
        <input className="srch" placeholder="ابحث بالاسم أو المنشأ…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <select className="flt" value={langF} onChange={e=>setLangF(e.target.value)}>
          <option value="">كل اللغات</option>
          <option value="العربية">عربية</option>
          <option value="الإنجليزية">إنجليزية</option>
          <option value="+">ثنائية</option>
        </select>
        <select className="flt" value={certF} onChange={e=>setCertF(e.target.value)}>
          <option value="">كل الشهادات</option>
          {["مرتفعة جداً","مرتفعة","متوسطة","متوسطة-منخفضة","منخفضة"].map(c=><option key={c}>{c}</option>)}
        </select>
        <select className="flt" value={priceF} onChange={e=>setPriceF(e.target.value)}>
          <option value="">كل الأسعار</option>
          <option value="مجاني">مجاني</option>
          <option value="منخفض">أقل من 2,000 جنيه</option>
          <option value="متوسط">2,000 – 15,000 جنيه</option>
          <option value="مرتفع">أكثر من 15,000 جنيه</option>
        </select>
      </div>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <Th col="platform" lbl="المنصة"/>
              <Th col="origin"   lbl="المنشأ"/>
              <th>اللغة</th>
              <Th col="price"    lbl="السعر (جنيه)"/>
              <Th col="certN"    lbl="قيمة الشهادة"/>
              <Th col="trust"    lbl="درجة الثقة"/>
              <th>الجمهور</th>
              <th>المجتمع</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.platform} style={c.isTarget?{background:"rgba(240,180,41,0.05)"}:{}}>
                <td style={{fontWeight:c.isTarget?700:500,color:c.isTarget?"#F0B429":"#E2EAF4"}}>
                  {c.isTarget?"⭐ ":""}{c.platform}
                </td>
                <td style={{color:"#5E7A9A",fontSize:12}}>{c.origin}</td>
                <td>{langBadge(c.lang)}</td>
                <td style={{fontFamily:"'Cairo',sans-serif",fontSize:13,
                  color:c.price===0?"#00C9A7":c.price>20000?"#FF6B6B":"#E2EAF4"}}>
                  {c.price===0?"مجاني":c.price.toLocaleString("ar-EG")+" ج"}
                </td>
                <td>{certBadge(c.cert,c.certN)}</td>
                <td style={{fontSize:13}}>
                  <span style={{color:c.trust>=75?"#00C9A7":c.trust>=55?"#F0B429":"#FF6B6B"}}>{c.trust}</span>
                  <span style={{color:"#5E7A9A"}}>/100</span>
                </td>
                <td style={{color:"#5E7A9A",fontSize:12}}>{c.target}</td>
                <td style={{color:"#5E7A9A",fontSize:12}}>{c.community}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  خريطة التشبع
// ═══════════════════════════════════════════════════════════════

function HeatmapSection() {
  const [hover, setHover] = useState(null);
  const LABELS = ["لا يوجد","منخفض","متوسط","مرتفع"];
  const CLS = ["h0","h1","h2","h3"];

  return (
    <section className="sec">
      <div className="sec-hdr">
        <span className="sec-num">٠٤</span>
        <span className="sec-title">خريطة تشبع السوق — نوع المزود × التقنية</span>
      </div>
      <div className="chart-card">
        <div className="chart-lbl">درجة التغطية 0–3 · مرّر المؤشر للتفاصيل · الأعمدة الخضراء = فجوات في السوق المحلي</div>
        <div className="hover-info">
          {hover
            ? <>{hover.row} × {hover.col}: <strong style={{color:hover.v===0?"#FF6B6B":hover.v===3?"#00C9A7":"#F0B429"}}>{LABELS[hover.v]}</strong>
              {hover.v===0&&hover.row.includes("محلي")&&<span style={{color:"#F0B429",marginRight:8}}> 🌊 فرصة محيط أزرق</span>}</>
            : <span style={{color:"#4A6080"}}>مرّر المؤشر فوق خلية للتفاصيل</span>
          }
        </div>
        <div className="hm-wrap">
          <table className="hm-tbl">
            <thead>
              <tr>
                <th className="rl">نوع المزود</th>
                {HEATMAP.cols.map(c => (
                  <th key={c} style={(c==="Power BI"||c==="Tableau")?{color:"#00C9A7"}:{}}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HEATMAP.rows.map(row => (
                <tr key={row.label}>
                  <td className="rl">{row.label}</td>
                  {row.values.map((v,ci) => (
                    <td key={ci} className={`cl ${CLS[v]}`}
                      onMouseEnter={()=>setHover({row:row.label,col:HEATMAP.cols[ci],v})}
                      onMouseLeave={()=>setHover(null)}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="hm-legend">
          {[0,1,2,3].map(v=>(
            <span key={v} style={{display:"flex",alignItems:"center",gap:5}}>
              <span className={`lg-sw ${CLS[v]}`}/><span>{v} — {LABELS[v]}</span>
            </span>
          ))}
          <span style={{marginRight:"auto",color:"#00C9A7",fontSize:10}}>Power BI + Tableau في القطاع المحلي = 0 → محيط أزرق</span>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  تكلفة الوصول إلى الكفاءة
// ═══════════════════════════════════════════════════════════════

function CompetencySection() {
  return (
    <section className="sec">
      <div className="sec-hdr">
        <span className="sec-num">٠٥</span>
        <span className="sec-title">تكلفة الوصول إلى الكفاءة — من مبتدئ إلى جاهز للوظيفة (جنيه)</span>
      </div>
      <div className="chart-card">
        <div className="chart-lbl">مقارنة التكلفة الإجمالية لكل مسار · الخط المتقطع = سعر منصتنا المستهدفة (4,990 جنيه)</div>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={COMPETENCY} margin={{top:25,right:20,left:10,bottom:70}}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false}/>
            <XAxis dataKey="path"
              tick={{fill:"#5E7A9A",fontSize:10,fontFamily:"Cairo,sans-serif"}}
              interval={0} angle={-20} textAnchor="end" height={80}/>
            <YAxis tickFormatter={v=>v>=1000?(v/1000)+"ك":v}
              tick={{fill:"#5E7A9A",fontSize:11,fontFamily:"Cairo,sans-serif"}}/>
            <Tooltip content={<BarTip/>} cursor={{fill:"rgba(255,255,255,0.03)"}}/>
            <ReferenceLine y={4990} stroke="#F0B429" strokeDasharray="6 4"
              label={{value:"4,990 جنيه",fill:"#F0B429",fontSize:11,fontFamily:"Cairo,sans-serif",position:"insideTopLeft"}}/>
            <Bar dataKey="cost" radius={[5,5,0,0]}>
              {COMPETENCY.map((e,i)=>(
                <Cell key={i}
                  fill={e.isTarget?"#F0B429":e.cost===0?"#00C9A7":e.cost>20000?"#FF6B6B":"#4FC3F7"}
                  fillOpacity={e.isTarget?1:0.72}/>
              ))}
              <LabelList dataKey="cost" position="top"
                formatter={v=>v===0?"مجاني":(v/1000).toFixed(1)+"ك"}
                style={{fill:"#5E7A9A",fontSize:10,fontFamily:"Cairo,sans-serif"}}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  المحيط الأزرق
// ═══════════════════════════════════════════════════════════════

function BlueOceanSection() {
  return (
    <section className="sec">
      <div className="sec-hdr">
        <span className="sec-num">٠٦</span>
        <span className="sec-title">فرصتنا الاستراتيجية — المحيط الأزرق</span>
      </div>
      <div className="bo-card">
        <div className="bo-tag">🌊 محيط أزرق مُحدَّد</div>
        <div className="bo-title">المركز غير المُحتلّ في سوق التعليم التكنولوجي</div>
        <p className="bo-desc">
          <strong>لا توجد حتى الآن</strong> أي منصة تُقدّم دبلومة تحليل بيانات باللغة العربية أولاً (متوسطة إلى متقدمة) تجمع بين{" "}
          <strong>Python + Power BI + SQL + تحليل بمساعدة الذكاء الاصطناعي</strong>، بسعر 4,990 جنيه،
          مع شراكات مع جهات توظيف مصرية ونتائج وظيفية موثّقة.
          درجة تغطية Power BI لدى جميع المزودين المحليين والإقليميين:{" "}
          <strong style={{color:"#00C9A7"}}>0 من 10</strong>.
        </p>
        <div className="feat-grid">
          {FEATURES.map(f => (
            <div className="feat-card" key={f.tier} style={{background:f.bg,borderColor:`${f.color}30`}}>
              <div className="feat-tier" style={{color:f.color}}>{f.tier}</div>
              <ul className="feat-list">
                {f.items.map(it=><li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
          <div className="feat-card" style={{gridColumn:"1/-1",background:"rgba(240,180,41,0.06)",borderColor:"rgba(240,180,41,0.4)"}}>
            <div className="feat-tier" style={{color:"#F0B429"}}>🎯 هدف الإطلاق</div>
            <p style={{fontSize:13,color:"#E2EAF4",lineHeight:1.7}}>
              <strong style={{color:"#F0B429"}}>دبلومة محلل بيانات محترف 40 ساعة</strong> · عربية مصرية · 4,990 جنيه (3 أقساط عبر فوري) ·
              مقابلة مضمونة لدى 5+ شركات مصرية · السنة الأولى: 3,000 طالب · إيراد 14.9 مليون جنيه
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  تقييم المخاطر
// ═══════════════════════════════════════════════════════════════

function RisksSection() {
  return (
    <section className="sec">
      <div className="sec-hdr">
        <span className="sec-num">٠٧</span>
        <span className="sec-title">أبرز 3 مخاطر وجودية</span>
      </div>
      <div className="risk-list">
        {RISKS.map(r => (
          <div className="risk-card" key={r.rank} style={{borderRightColor:r.color}}>
            <div className="risk-num" style={{
              background:`rgba(${r.color==="#FF6B6B"?"255,107,107":r.color==="#F0B429"?"240,180,41":"79,195,247"},.15)`,
              color:r.color}}>
              {r.rank}
            </div>
            <div>
              <div className="risk-sev" style={{color:r.color}}>خطورة: {r.severity}</div>
              <div className="risk-title">{r.title}</div>
              <div className="risk-desc">{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  التطبيق الرئيسي
// ═══════════════════════════════════════════════════════════════

const TABS = [
  {label:"المؤشرات", id:"s01"},
  {label:"خريطة السوق", id:"s02"},
  {label:"المنافسون", id:"s03"},
  {label:"التشبع", id:"s04"},
  {label:"التكلفة", id:"s05"},
  {label:"المحيط الأزرق", id:"s06"},
  {label:"المخاطر", id:"s07"},
];

export default function App() {
  const [activeTab, setActiveTab] = useState(null);

  // حقن CSS مرة واحدة
  if (typeof document !== "undefined") {
    let s = document.getElementById("atlas-ar-css");
    if (!s) {
      s = document.createElement("style");
      s.id = "atlas-ar-css";
      s.textContent = CSS;
      document.head.appendChild(s);
    }
  }

  const scrollTo = (tab) => {
    const el = document.getElementById(tab.id);
    if (el) { el.scrollIntoView({behavior:"smooth",block:"start"}); setActiveTab(tab.id); }
  };

  return (
    <div id="atlas-ar" dir="rtl">
      {/* شريط التنقل */}
      <nav className="nav">
        <div className="nav-brand">▸ مشروع أطلس</div>
        <ul className="nav-tabs">
          {TABS.map(t => (
            <li key={t.id}>
              <button className={activeTab===t.id?"active":""} onClick={()=>scrollTo(t)}>
                {t.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-date">مارس 2026</div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="main">
        {/* رأس الصفحة */}
        <div className="hdr">
          <div className="hdr-eye">▸ سري · ذكاء سوق التعليم التكنولوجي – الشرق الأوسط</div>
          <h1>مشروع <span>أطلس</span></h1>
          <p className="hdr-sub">
            رؤى مدعومة بالبيانات لاستراتيجية منصتنا الجديدة في مجال البرمجة وتحليل البيانات.
            مصر والشرق الأوسط · 15 منافساً تم تحليلهم.
          </p>
        </div>

        <div id="s01"><KpiSection/></div>
        <div id="s02"><MarketMapSection/></div>
        <div id="s03"><CompetitorTable/></div>
        <div id="s04"><HeatmapSection/></div>
        <div id="s05"><CompetencySection/></div>
        <div id="s06"><BlueOceanSection/></div>
        <div id="s07"><RisksSection/></div>

        <footer style={{
          borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:24,
          display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8
        }}>
          <span style={{fontSize:11,color:"#5E7A9A"}}>مشروع أطلس · استراتيجية التعليم الإلكتروني في الشرق الأوسط · مارس 2026</span>
          <span style={{fontSize:11,color:"#5E7A9A"}}>سري – للاستخدام الداخلي فقط</span>
        </footer>
      </main>
    </div>
  );
}