(function(){
'use strict';
var DEFAULTS={currency:'IDR',modalAwal:1000000,riskPct:1,dayPct:3,weekPct:6,ddPct:15,maxPosPct:40,maxOpen:2,maxTrades:3,maxStreak:3,feeBuy:0.2,feeSell:0.2,tax:0.21,minRR:2,
  futCapPct:30,futMarginPct:50,maxLev:5,mmr:0.5,futFee:0.06,futTax:0};
var LIQ_MULT=2;
var LS_BK='jurnal-kripto-1r.lastBackup',LS_KEY='jurnal-kripto-1r.v1',LS_KURS='jurnal-kripto-1r.kurs',LS_LANG='jurnal-kripto-1r.lang';

/* ---------- Teks dua bahasa ---------- */
var I18N={
id:{
brand:'Jurnal Kripto',lang_label:'Bahasa',loading:'Memuat…',opening:'Membuka jurnalmu.',
eq_same:'Saldo = modal awal {m}',eq_change:'{s} dari modal {m}',
today_status:'Status hari ini',risk_budget:'Anggaran risiko',equity_curve:'Kurva saldo',statistics:'Statistik',n_closed:'{n} trade ditutup',
empty_chart_t:'Belum ada trade yang ditutup.',empty_chart_d:'Hitung ukuran posisi di tab Hitung, masuk di exchange, lalu catat di tab Jurnal. Kurva saldomu akan tumbuh di sini.',open_calc:'Buka kalkulator',
b_1r:'1R (risiko per trade)',of_bal:'{p} dari saldo',b_maxspot:'Nilai maks posisi spot',b_day:'Batas rugi harian',b_week:'Batas rugi mingguan',approx_r:'≈ {r}R',b_futcap:'Modal futures',futcap_h:'{p} saldo · terpakai {m}',b_maxmargin:'Margin maks 1 posisi',maxmargin_h:'leverage maks {l}x, isolated',
m_day:'Jatah rugi hari ini',m_week:'Jatah rugi minggu ini',used_pct:'terpakai {p} persen',
c_today:'Trade hari ini',c_open:'Posisi terbuka',c_streak:'Rugi beruntun',
s_closed:'Trade ditutup',s_wl:'{w} untung · {l} rugi',s_wr:'Win rate',s_avg:'Rata-rata per trade',s_avg_h:'ekspektansi dalam R',s_pf:'Profit factor',s_pf_h:'total untung ÷ total rugi',s_avgw:'Rata-rata untung',s_avgl:'Rata-rata rugi',s_spot:'P/L spot',s_ntrades:'{n} trade',s_fut:'P/L futures',s_fut_h:'{n} trade, termasuk funding',s_total:'Total P/L bersih',s_total_h:'setelah biaya & pajak',s_dd:'Drawdown terdalam',s_dd_h:'saat ini {p}',
ch_cap:'Modal',ch_dd:'Batas DD',ch_start:'awal',ch_n:'trade ke-{n}',ch_aria:'Kurva saldo: dari {a} menjadi {b} setelah {n} trade',
st_dd_l:'Stop & evaluasi',st_dd_w:'Saldo turun {p} dari puncak (batas {lim}). Libur trading 1 minggu, baca ulang jurnal, dan jangan top-up untuk mengejar balik.',
st_wk_l:'Stop minggu ini',st_wk_w:'Rugi minggu ini {m}, sudah melewati batas {lim}. Lanjut lagi hari Senin.',
st_day_l:'Stop hari ini',st_day_w:'Rugi hari ini {m}, sudah mencapai batas harian {lim}. Tutup aplikasi exchange, lanjut besok.',
st_streak_w:'{n} kali rugi berturut-turut hari ini. Istirahat dulu supaya tidak trading karena emosi.',
st_trades_l:'Cukup untuk hari ini',st_trades_w:'Sudah {n} trade hari ini (maks {max}). Kelola posisi yang ada, jangan buka yang baru.',
st_open_l:'Posisi penuh',st_open_w:'{n} posisi masih terbuka (maks {max}). Tutup salah satu dulu sebelum masuk lagi.',
st_care_l:'Hati-hati',st_care_w:'Jatah rugi hari ini tinggal {m}. Satu trade lagi hanya jika setupnya sangat jelas.',
st_ok_l:'Boleh trading',st_ok_w:'Risiko per trade {m} (1R), spot maupun futures. Hitung dulu ukuran posisi di tab Hitung sebelum masuk.',
calc_h:'Kalkulator ukuran posisi',calc_intro:'Masukkan harga masuk, stop loss, dan target. Kalkulator menghitung ukuran posisi agar rugi di stop loss tidak lebih dari 1R, sudah termasuk biaya dan pajak.',
market:'Pasar',side:'Arah posisi',pair:'Koin / pair',long_up:'Long (naik)',short_dn:'Short (turun)',lev:'Leverage (x)',auto:'otomatis',kurs:'Kurs 1 USDT (Rp)',optional:'opsional',
fut_note:'Kosongkan leverage agar dipilih yang terkecil yang cukup. Harga boleh dalam USDT atau Rp; untung dan rugi dihitung dari nilai posisi.',
risk_pct:'Risiko (% saldo)',example:'Angka di atas hanya contoh. Ganti dengan harga koin yang mau kamu trading.',ph_idr:'mis. BTC/IDR',ph_usdt:'mis. BTC/USDT',
l_buy:'Harga beli ({c})',l_entry:'Harga masuk',l_sl_spot:'Stop loss ({c})',l_sl:'Stop loss',l_tp_spot:'Target / TP ({c})',l_tp:'Target / TP',
e_need:'Isi harga masuk dan stop loss untuk melihat ukuran posisi.',e_spot_sl:'Stop loss harus di bawah harga beli. Di pasar spot kamu hanya bisa untung saat harga naik.',e_long_sl:'Untuk long, stop loss harus di bawah harga masuk.',e_short_sl:'Untuk short, stop loss harus di atas harga masuk.',
o_buy:'Beli senilai maksimal',o_coins:'≈ {c} koin · {p} dari saldo',o_loss:'Rugi jika kena SL',o_1r:'1R = {m}',o_sld:'Jarak stop loss',o_profit:'Untung bersih di target',o_from_entry:'{p} dari harga masuk',o_rr:'R:R bersih',o_gross:'kotor 1 : {x}',o_size:'{side} · nilai posisi',o_margin:'Margin {m} dengan leverage {l}x',o_auto:' (otomatis)',o_conv:' · ≈ {a}, margin ≈ {b}',o_liq:'Est. harga likuidasi',o_safe:'Leverage maks aman',o_safe_h:'likuidasi ≥ {k}× jarak SL',o_log:'Catat trade ini di jurnal',
k_status_bad:'Status hari ini “{l}”. Jangan buka posisi baru.',k_status_warn:'Status “{l}”: {w}',k_risk:'Risiko {p} lebih besar dari aturanmu ({r}).',k_notp:'Belum ada target. Tanpa target, R:R tidak bisa dinilai.',k_tp_short:'Untuk short, target harus di bawah harga masuk.',k_tp_long:'Target harus di atas harga masuk.',k_rr_bad:'R:R bersih 1:{rr}, di bawah minimal 1:{min}. Lewati, atau cari target/stop loss yang lebih masuk akal.',k_rr_ok:'R:R bersih 1:{rr} memenuhi minimal 1:{min}.',k_fee:'Biaya dan pajak memakan {p} dari risikomu. Stop loss terlalu rapat.',k_cap_max:'Ukuran dibatasi ke maks {p} saldo, jadi risiko nyata {m} (di bawah 1R).',k_cap_cash:'Kas tersisa hanya {m} karena ada posisi terbuka.',k_fut_none:'Modal futures sudah terpakai semua oleh posisi terbuka. Tutup posisi dulu.',k_lev_over:'Leverage {l}x melebihi batasmu {max}x.',k_liq_bad:'Likuidasi hanya {p} dari harga masuk, terlalu dekat dengan stop loss ({d}). Turunkan leverage ke maks {s}x.',k_liq_ok:'Likuidasi {p} dari harga masuk, lebih dari {k}× jarak stop loss.',k_margin_cap:'Margin dibatasi {m} per posisi, jadi risiko nyata {r} (di bawah 1R).',k_margin_up:' Bisa naikkan leverage sampai {s}x.',k_futcash:'Sisa modal futures {m} karena ada posisi futures terbuka.',k_all_spot:'Sesuai semua aturan. Pasang stop loss di exchange tepat setelah beli.',k_all_fut:'Sesuai semua aturan. Pakai isolated margin dan pasang stop loss di exchange.',
j_h:'Jurnal trade',j_add:'+ Catat trade',j_loading:'Memuat jurnal…',j_empty_t:'Jurnal masih kosong.',j_empty_d:'Setelah masuk posisi di exchange (spot atau futures), tekan “Catat trade”. Saat keluar, buka trade itu dan tekan “Tutup posisi”. Untung, rugi, dan R dihitung otomatis.',j_open:'Posisi terbuka ({n})',j_hist:'Riwayat ({n})',
t_open:'Terbuka',t_risk:'risiko {m}',t_rules:'{n} aturan',t_entry:'Harga masuk',t_exit:'Harga keluar',t_buy:'Harga beli',t_sell:'Harga jual',t_size:'Nilai posisi',t_bsize:'Nilai beli',t_margin:'Margin',t_fund:'Funding fee',t_recv:'diterima',t_paid:'dibayar',t_liq:'Est. likuidasi',t_irisk:'Risiko awal',t_slat:'stop loss {p}',t_target:'Target',t_notarget:'tanpa target',t_emo:'Perasaan',t_broken:'Aturan yang dilanggar',t_reason:'Alasan masuk',t_lesson:'Pelajaran',t_close:'Tutup posisi',t_del:'Hapus',
r_h:'Aturan risk management',r_intro:'Semua angka dihitung dari saldo sekarang ({m}), jadi otomatis mengecil saat rugi dan membesar saat untung. Dengan risiko {p}, rugi 10 kali berturut-turut hanya memotong saldo sekitar {t}.',
g_trade:'Setiap trade',g_spot:'Spot',g_fut:'Futures',g_day:'Setiap hari',g_week:'Setiap minggu',g_bal:'Saldo & platform',
r_1r:'<b>1R, risiko maksimal per trade</b> ({p} saldo), untuk spot maupun futures. Ini rugi yang kamu terima kalau harga menyentuh stop loss, sudah termasuk biaya.',
r_sl_v:'SL dulu',r_sl:'<b>Tentukan stop loss sebelum masuk</b>, lalu hitung ukuran posisi dari situ. Jangan geser stop loss menjauh saat harga melawanmu.',
r_rr:'<b>Ambil trade hanya jika target bersih minimal {x}× risiko</b>, dihitung setelah biaya dan pajak.',
r_maxspot:'<b>Nilai maksimal satu posisi spot</b> ({p} saldo), walaupun stop loss sangat dekat.',
r_spotfee:'<b>Biaya bolak-balik spot</b>: beli {b} + jual {s} + pajak {t}. Stop loss di bawah sekitar 2% membuat biaya memakan porsi besar dari risikomu.',
r_f1_v:'1R tetap',r_f1:'<b>Leverage tidak menambah risiko yang boleh diambil.</b> Leverage hanya mengubah berapa margin yang dikunci; rugi di stop loss tetap {m}.',
r_f2:'<b>Modal futures maksimal</b> ({p} saldo). Sisanya tetap di spot. Total margin semua posisi futures tidak boleh melebihi angka ini.',
r_f3:'<b>Margin maksimal satu posisi</b> ({p} modal futures).',
r_f4:'<b>Leverage maksimal.</b> Pakai leverage terkecil yang cukup, bukan yang terbesar yang tersedia.',
r_f5:'<b>Selalu mode isolated margin.</b> Kalau satu posisi likuidasi, saldo lain tidak ikut terseret.',
r_f6_v:'Likuidasi ≥ {k}× SL',r_f6:'<b>Harga likuidasi minimal {k}× lebih jauh dari stop loss.</b> Kalau tidak, turunkan leverage.',
r_f7_v:'SL di exchange',r_f7:'<b>Pasang stop order di exchange begitu posisi terbuka</b>, bukan hanya diingat.',
r_f8_v:'Tanpa tambah',r_f8:'<b>Jangan menambah margin ke posisi rugi</b> supaya tidak likuidasi. Itu sama saja dengan menggeser stop loss.',
r_f9:'<b>Biaya bolak-balik futures</b> dihitung dari nilai posisi, ditambah funding fee berkala selama posisi terbuka. Catat funding saat menutup posisi.',
r_d1_v:'{n} trade',r_d1:'<b>Maksimal trade baru per hari</b>, spot dan futures digabung. Lebih dari itu biasanya overtrading.',
r_d2_v:'{n} posisi',r_d2:'<b>Maksimal posisi terbuka bersamaan</b>, supaya total risiko terbuka tidak lebih dari {m}.',
r_d3:'<b>Batas rugi harian</b> ({p}). Tercapai berarti berhenti sampai besok.',
r_d4_v:'{n}× rugi',r_d4:'<b>Rugi beruntun dalam sehari</b> berarti berhenti, walau batas nominal belum tercapai.',
r_w1:'<b>Batas rugi mingguan</b> ({p}). Tercapai berarti libur sampai Senin.',
r_w2_v:'Review',r_w2:'<b>Baca jurnal tiap akhir pekan.</b> Setup mana yang paling sering untung? Perasaan apa yang muncul saat rugi? Spot atau futures yang lebih baik hasilnya?',
r_b1:'<b>Batas drawdown {p} dari puncak.</b> Saldo di bawah angka ini berarti libur 1 minggu dan evaluasi. Jangan top-up untuk mengejar balik.',
r_b2_v:'Berizin',r_b2:'<b>Pakai exchange berizin dalam negeri.</b> PPh final penjualan spot di platform dalam negeri 0,21%, di platform luar negeri 1%. Untuk futures, pilih platform yang terdaftar dan sudah membuka layanan derivatif.',
r_b3_v:'Spot dulu',r_b3:'<b>Catat minimal 20–30 trade spot dulu.</b> Kalau rata-rata R-nya positif, baru mulai futures dengan ukuran kecil.',
tbl_spot_h:'Spot: ukuran posisi menurut jarak stop loss',tbl_spot_n:'Dengan 1R saat ini. Semakin jauh stop loss, semakin kecil nilai yang boleh dibeli.',
th_sl:'Jarak SL',th_buy:'Nilai beli',th_pbal:'% saldo',th_loss:'Rugi di SL',th_size:'Nilai posisi',th_lev:'Leverage',th_margin:'Margin',
tbl_fut_h:'Futures: nilai posisi, leverage, dan margin',tbl_fut_n:'Leverage di tabel adalah yang terkecil yang cukup agar margin tidak melewati {m} per posisi. Berlaku untuk long maupun short.',tbl_fut_cap:' * Dibatasi leverage/margin maksimal, jadi risikonya di bawah 1R.',tbl_fut_off:'Porsi modal futures 0%: futures nonaktif.',
set_sum:'Pengaturan modal, batas & biaya',set_cur:'Mata uang akun',set_modal:'Modal awal ({c})',set_risk:'Risiko per trade (%)',set_minrr:'R:R minimal (1:x)',set_day:'Batas rugi harian (%)',set_week:'Batas rugi mingguan (%)',set_dd:'Batas drawdown (%)',set_maxopen:'Maks posisi terbuka',set_maxtrades:'Maks trade per hari',set_streak:'Stop setelah loss beruntun',set_maxpos:'Maks nilai 1 posisi (%)',set_feebuy:'Biaya beli (%)',set_feesell:'Biaya jual (%)',set_tax:'Pajak saat jual (%)',set_futcap:'Porsi modal futures (%)',set_futmargin:'Margin maks 1 posisi (% modal futures)',set_maxlev:'Leverage maks (x)',set_mmr:'Maintenance margin (%)',set_futfee:'Biaya futures per sisi (%)',set_futtax:'Pajak futures (%)',
set_note:'Biaya spot dan futures berbeda di tiap exchange. Cek tabel biayanya (maker biasanya lebih murah dari taker). Biaya futures dihitung dari nilai posisi, bukan dari margin. Pajak futures isi 0 kalau exchange-mu tidak memungutnya; pajak spot di exchange berizin dalam negeri 0,21%.',
set_save:'Simpan pengaturan',set_reset:'Kembalikan batas bawaan',csv:'Ekspor jurnal ke CSV',store_db:'Data tersimpan di akun Claude-mu, jadi jurnal yang sama terbuka dari HP atau laptop mana pun.',store_local:'Data tersimpan di HP ini dan tetap bisa dipakai tanpa internet. Simpan cadangan secara rutin, misalnya tiap akhir pekan, supaya data aman kalau HP rusak atau aplikasi terhapus.',
install:'Pasang aplikasi',backup_export:'Simpan cadangan',backup_import:'Pulihkan dari cadangan',imp_h:'Pulihkan dari cadangan?',imp_d:'Cadangan ini berisi {n} trade dengan modal awal {m}, dibuat {d}. Semua data di HP ini sekarang akan diganti.',imp_yes:'Ganti data',ts_imp:'Data dipulihkan dari cadangan.',ts_imp_bad:'File ini bukan cadangan Jurnal Kripto 1R.',ts_backup:'Cadangan siap disimpan.',bk_never:'Belum ada cadangan. Jurnalmu hanya tersimpan di HP ini.',bk_old:'Cadangan terakhir {n} hari lalu. Simpan yang baru supaya trade terbaru ikut aman.',bk_now:'Simpan cadangan sekarang',ce_date:'Tanggal keluar tidak boleh sebelum tanggal masuk.',ts_update:'Versi baru terpasang. Tutup lalu buka lagi aplikasi untuk memakainya.',store_check:'Memeriksa penyimpanan…',
disclaimer:'Halaman ini alat bantu disiplin, bukan saran keuangan. Kripto sangat fluktuatif, dan futures bisa menghabiskan margin dalam hitungan menit. Gunakan uang yang siap hilang.',
se_check:'Periksa isian: {f}.',se_risk:'Risiko per trade di atas 5% terlalu besar untuk modal kecil. Pakai 0,5–2%.',se_pct:'Persentase modal dan margin tidak bisa lebih dari 100%.',se_mmr:'Maintenance margin biasanya di bawah 1%. Cek angka di exchange-mu.',
cur_h:'Ganti mata uang akun?',cur_d:'Modal awal dan semua angka di jurnal (nilai posisi, margin, risiko, P/L, funding) akan dikonversi dari {a} ke {b} dengan kurs di bawah. Harga koin tidak diubah.',cur_rate:'Kurs 1 USDT (Rp)',cur_yes:'Konversi & simpan',cur_err:'Isi kurs USDT dalam rupiah, mis. 16.300.',cur_prev:'Modal awal {a} → {b}',
nav_sum:'Ringkasan',nav_calc:'Hitung',nav_journal:'Jurnal',nav_rules:'Aturan',nav_aria:'Menu utama',
add_h:'Catat trade baru',close:'Tutup',mm:'Mode margin',l_date_buy:'Tanggal beli',l_date_in:'Tanggal masuk',l_bsize:'Nilai beli ({c})',l_psize:'Nilai posisi ({c})',setup:'Setup',reason:'Alasan masuk',reason_ph:'Apa yang kamu lihat di chart? Kenapa di harga ini?',emotion:'Perasaan saat masuk',add_save:'Simpan sebagai posisi terbuka',
ap_fut:'Isi harga masuk, stop loss ({dir} harga masuk), nilai posisi, dan leverage untuk melihat risikonya.',ap_above:'di atas',ap_below:'di bawah',ap_spot:'Isi harga beli, stop loss (di bawah harga beli), dan nilai beli untuk melihat risikonya.',ap_risk:'Risiko trade ini {m} ({r}R)',ap_rr:' · R:R bersih {x}',ap_fut_l:'Margin {m} · likuidasi ≈ {liq} ({p})',ap_viol:'Melanggar: {v}. Tetap bisa disimpan, dan akan ditandai di jurnal.',ap_ok:'Sesuai aturan.',
ae_pair:'Isi nama koin atau pair.',ae_px:'Isi harga masuk dan stop loss.',ae_size_f:'Isi nilai posisi.',ae_size_s:'Isi nilai beli.',ae_lev:'Leverage minimal 1x.',ae_date:'Isi tanggal.',ae_sl_long:'Stop loss harus di bawah harga masuk.',
v_status:'Masuk saat status “{l}”',v_trades:'Melebihi {n} trade/hari',v_open:'Melebihi {n} posisi terbuka',v_risk:'Risiko {r}R (lebih dari 1R)',v_lev:'Leverage {x}x di atas {max}x',v_liq:'Likuidasi terlalu dekat dengan SL',v_margin:'Margin di atas {m}',v_futcap:'Total margin melebihi modal futures',v_cross:'Pakai cross margin',v_size:'Posisi di atas {p} saldo',v_notp:'Tanpa target',v_rr:'R:R 1:{rr} di bawah 1:{min}',v_emo:'Masuk karena {e}',
close_h:'Tutup posisi',l_exit:'Harga keluar',l_sell:'Harga jual ({c})',l_date_out:'Tanggal keluar',l_date_sell:'Tanggal jual',fund_l:'Funding fee dibayar ({c})',fund_h:'Total funding selama posisi terbuka. Isi minus (mis. −1.500) kalau kamu malah menerima funding.',lesson:'Pelajaran dari trade ini',lesson_ph:'Apa yang sudah benar? Apa yang akan kamu ubah?',close_save:'Simpan hasil',
ci_fut:'{pair} · {side} {l}x · masuk {e} · nilai posisi {m}',ci_spot:'{pair} · beli {e} senilai {m}',ci_sl:' · stop loss {p}',ci_tp:' · target {p}',
cp_need_f:'Isi harga keluar untuk melihat hasil bersih.',cp_need_s:'Isi harga jual untuk melihat hasil bersih.',cp_res:'Hasil bersih {m} · {r}',cp_note_f:'Sudah dipotong biaya buka, biaya tutup, dan funding.',cp_note_s:'Sudah dipotong biaya jual dan pajak.',ce_exit_f:'Isi harga keluar.',ce_exit_s:'Isi harga jual.',
del_h:'Hapus catatan ini?',del_yes:'Hapus',cancel:'Batal',del_info:'{pair} ({d}, {s}) akan dihapus permanen dari jurnal.',still_open:'masih terbuka',
ts_saved:'{pair} tersimpan. Pasang stop loss di exchange.',ts_saved_f:'{pair} tersimpan. Pasang stop loss di exchange, mode isolated.',ts_closed:'{pair} ditutup: {m}',ts_deleted:'Catatan dihapus.',ts_reset:'Batas kembali ke bawaan.',ts_set:'Pengaturan tersimpan.',ts_csv:'CSV siap disimpan.',ts_csv_no:'Ekspor tidak tersedia di tampilan ini.',ts_ro:'Kamu hanya bisa melihat jurnal ini, tidak bisa mengubahnya.',ts_quota:'Penyimpanan penuh. Ekspor CSV lalu hapus trade lama.',ts_busy:'Terlalu banyak perubahan sekaligus. Coba lagi sebentar.',ts_fail:'Gagal menyimpan. Periksa koneksi lalu coba lagi.',ts_local:'Penyimpanan akun tidak tersedia, beralih ke mode lokal.',ts_ls:'Browser menolak menyimpan data. Mode pribadi?',ts_cur:'Mata uang akun sekarang {c}.'
},
en:{
brand:'Crypto Journal',lang_label:'Language',loading:'Loading…',opening:'Opening your journal.',
eq_same:'Balance = starting capital {m}',eq_change:'{s} vs capital {m}',
today_status:'Today’s status',risk_budget:'Risk budget',equity_curve:'Equity curve',statistics:'Statistics',n_closed:'{n} closed trades',
empty_chart_t:'No closed trades yet.',empty_chart_d:'Size the position in the Calculate tab, enter on the exchange, then log it in the Journal tab. Your equity curve will grow here.',open_calc:'Open calculator',
b_1r:'1R (risk per trade)',of_bal:'{p} of balance',b_maxspot:'Max spot position',b_day:'Daily loss limit',b_week:'Weekly loss limit',approx_r:'≈ {r}R',b_futcap:'Futures capital',futcap_h:'{p} of balance · used {m}',b_maxmargin:'Max margin per position',maxmargin_h:'max leverage {l}x, isolated',
m_day:'Loss budget today',m_week:'Loss budget this week',used_pct:'{p} percent used',
c_today:'Trades today',c_open:'Open positions',c_streak:'Losing streak',
s_closed:'Closed trades',s_wl:'{w} wins · {l} losses',s_wr:'Win rate',s_avg:'Average per trade',s_avg_h:'expectancy in R',s_pf:'Profit factor',s_pf_h:'gross profit ÷ gross loss',s_avgw:'Average win',s_avgl:'Average loss',s_spot:'Spot P/L',s_ntrades:'{n} trades',s_fut:'Futures P/L',s_fut_h:'{n} trades, incl. funding',s_total:'Total net P/L',s_total_h:'after fees & tax',s_dd:'Max drawdown',s_dd_h:'currently {p}',
ch_cap:'Capital',ch_dd:'DD limit',ch_start:'start',ch_n:'trade #{n}',ch_aria:'Equity curve: from {a} to {b} after {n} trades',
st_dd_l:'Stop & review',st_dd_w:'Balance is down {p} from its peak (limit {lim}). Take a week off, reread your journal, and do not top up to win it back.',
st_wk_l:'Stop for the week',st_wk_w:'This week’s loss is {m}, past the {lim} limit. Resume on Monday.',
st_day_l:'Stop for today',st_day_w:'Today’s loss is {m}, at the {lim} daily limit. Close the exchange app and come back tomorrow.',
st_streak_w:'{n} losses in a row today. Take a break so emotion does not drive the next trade.',
st_trades_l:'Done for today',st_trades_w:'{n} trades already today (max {max}). Manage what is open; do not open new ones.',
st_open_l:'Positions full',st_open_w:'{n} positions still open (max {max}). Close one before entering again.',
st_care_l:'Be careful',st_care_w:'Only {m} of today’s loss budget is left. Take one more trade only if the setup is very clear.',
st_ok_l:'OK to trade',st_ok_w:'Risk per trade is {m} (1R), spot or futures. Size the position in the Calculate tab before entering.',
calc_h:'Position size calculator',calc_intro:'Enter entry, stop loss and target. The calculator sizes the position so a stop-loss hit costs no more than 1R, fees and tax included.',
market:'Market',side:'Direction',pair:'Coin / pair',long_up:'Long (up)',short_dn:'Short (down)',lev:'Leverage (x)',auto:'auto',kurs:'1 USDT rate (IDR)',optional:'optional',
fut_note:'Leave leverage empty to use the smallest that fits. Prices can be in USDT or IDR; profit and loss come from the position size.',
risk_pct:'Risk (% of balance)',example:'The numbers above are only an example. Replace them with the coin you want to trade.',ph_idr:'e.g. BTC/IDR',ph_usdt:'e.g. BTC/USDT',
l_buy:'Buy price ({c})',l_entry:'Entry price',l_sl_spot:'Stop loss ({c})',l_sl:'Stop loss',l_tp_spot:'Target / TP ({c})',l_tp:'Target / TP',
e_need:'Enter entry price and stop loss to see the position size.',e_spot_sl:'Stop loss must be below the buy price. In spot you only profit when price rises.',e_long_sl:'For a long, stop loss must be below entry.',e_short_sl:'For a short, stop loss must be above entry.',
o_buy:'Buy up to',o_coins:'≈ {c} coins · {p} of balance',o_loss:'Loss if SL hits',o_1r:'1R = {m}',o_sld:'Stop-loss distance',o_profit:'Net profit at target',o_from_entry:'{p} from entry',o_rr:'Net R:R',o_gross:'gross 1 : {x}',o_size:'{side} · position size',o_margin:'Margin {m} at {l}x leverage',o_auto:' (auto)',o_conv:' · ≈ {a}, margin ≈ {b}',o_liq:'Est. liquidation price',o_safe:'Max safe leverage',o_safe_h:'liquidation ≥ {k}× SL distance',o_log:'Log this trade in the journal',
k_status_bad:'Today’s status is “{l}”. Do not open new positions.',k_status_warn:'Status “{l}”: {w}',k_risk:'Risk {p} is above your rule ({r}).',k_notp:'No target yet. Without one, R:R cannot be judged.',k_tp_short:'For a short, the target must be below entry.',k_tp_long:'Target must be above entry.',k_rr_bad:'Net R:R 1:{rr} is below the 1:{min} minimum. Skip it, or find a more sensible target or stop.',k_rr_ok:'Net R:R 1:{rr} meets the 1:{min} minimum.',k_fee:'Fees and tax eat {p} of your risk. The stop is too tight.',k_cap_max:'Size capped at {p} of balance, so actual risk is {m} (below 1R).',k_cap_cash:'Only {m} cash left because of open positions.',k_fut_none:'Futures capital is fully used by open positions. Close one first.',k_lev_over:'Leverage {l}x exceeds your {max}x limit.',k_liq_bad:'Liquidation is only {p} from entry, too close to the stop ({d}). Lower leverage to {s}x or less.',k_liq_ok:'Liquidation is {p} from entry, more than {k}× the stop distance.',k_margin_cap:'Margin capped at {m} per position, so actual risk is {r} (below 1R).',k_margin_up:' You can raise leverage up to {s}x.',k_futcash:'Only {m} of futures capital left because of open futures positions.',k_all_spot:'Meets every rule. Set the stop loss on the exchange right after buying.',k_all_fut:'Meets every rule. Use isolated margin and set the stop loss on the exchange.',
j_h:'Trade journal',j_add:'+ Log trade',j_loading:'Loading journal…',j_empty_t:'The journal is empty.',j_empty_d:'After entering a position on the exchange (spot or futures), tap “Log trade”. When you exit, open that trade and tap “Close position”. Profit, loss and R are calculated for you.',j_open:'Open positions ({n})',j_hist:'History ({n})',
t_open:'Open',t_risk:'risk {m}',t_rules:'{n} rules',t_entry:'Entry price',t_exit:'Exit price',t_buy:'Buy price',t_sell:'Sell price',t_size:'Position size',t_bsize:'Buy size',t_margin:'Margin',t_fund:'Funding fee',t_recv:'received',t_paid:'paid',t_liq:'Est. liquidation',t_irisk:'Initial risk',t_slat:'stop loss {p}',t_target:'Target',t_notarget:'no target',t_emo:'Emotion',t_broken:'Rules broken',t_reason:'Entry reason',t_lesson:'Lesson',t_close:'Close position',t_del:'Delete',
r_h:'Risk management rules',r_intro:'Every number is based on your current balance ({m}), so it shrinks after losses and grows after wins. At {p} risk, 10 losses in a row cut the balance by only about {t}.',
g_trade:'Every trade',g_spot:'Spot',g_fut:'Futures',g_day:'Every day',g_week:'Every week',g_bal:'Balance & platform',
r_1r:'<b>1R, the most you risk per trade</b> ({p} of balance), spot or futures. It is what you lose if price hits the stop, fees included.',
r_sl_v:'SL first',r_sl:'<b>Set the stop loss before entering</b>, then size the position from it. Never move the stop further away when price goes against you.',
r_rr:'<b>Take a trade only if the net target is at least {x}× the risk</b>, after fees and tax.',
r_maxspot:'<b>Maximum size of one spot position</b> ({p} of balance), even with a very tight stop.',
r_spotfee:'<b>Spot round-trip cost</b>: buy {b} + sell {s} + tax {t}. A stop tighter than about 2% lets fees eat a large share of your risk.',
r_f1_v:'1R stays',r_f1:'<b>Leverage does not raise the risk you may take.</b> It only changes how much margin is locked; the loss at the stop is still {m}.',
r_f2:'<b>Maximum futures capital</b> ({p} of balance). Keep the rest in spot. Total margin across futures positions must not exceed this.',
r_f3:'<b>Maximum margin per position</b> ({p} of futures capital).',
r_f4:'<b>Maximum leverage.</b> Use the smallest leverage that fits, not the largest on offer.',
r_f5:'<b>Always use isolated margin.</b> If one position is liquidated, the rest of your balance is untouched.',
r_f6_v:'Liq. ≥ {k}× SL',r_f6:'<b>Liquidation price at least {k}× further than the stop.</b> If not, lower the leverage.',
r_f7_v:'SL on exchange',r_f7:'<b>Place a stop order on the exchange as soon as the position opens</b>, not just in your head.',
r_f8_v:'No adding',r_f8:'<b>Never add margin to a losing position</b> to avoid liquidation. That is the same as moving your stop.',
r_f9:'<b>Futures round-trip cost</b> is charged on position size, plus periodic funding while the position is open. Record funding when you close.',
r_d1_v:'{n} trades',r_d1:'<b>Maximum new trades per day</b>, spot and futures combined. More than that is usually overtrading.',
r_d2_v:'{n} positions',r_d2:'<b>Maximum open positions at once</b>, so total open risk stays under {m}.',
r_d3:'<b>Daily loss limit</b> ({p}). Hit it and stop until tomorrow.',
r_d4_v:'{n}× loss',r_d4:'<b>Losses in a row within a day</b> mean stop, even if the amount limit is not hit.',
r_w1:'<b>Weekly loss limit</b> ({p}). Hit it and pause until Monday.',
r_w2_v:'Review',r_w2:'<b>Read your journal every weekend.</b> Which setups win most? What do you feel when you lose? Does spot or futures do better?',
r_b1:'<b>Drawdown limit {p} from the peak.</b> Below this balance, take a week off and review. Do not top up to win it back.',
r_b2_v:'Licensed',r_b2:'<b>Use a licensed Indonesian exchange.</b> The final tax on spot sales is 0.21% on domestic platforms and 1% on foreign ones. For futures, choose a registered platform that offers derivatives.',
r_b3_v:'Spot first',r_b3:'<b>Log at least 20–30 spot trades first.</b> If your average R is positive, start futures small.',
tbl_spot_h:'Spot: position size by stop distance',tbl_spot_n:'At your current 1R. The further the stop, the smaller the buy.',
th_sl:'SL distance',th_buy:'Buy size',th_pbal:'% balance',th_loss:'Loss at SL',th_size:'Position',th_lev:'Leverage',th_margin:'Margin',
tbl_fut_h:'Futures: position size, leverage and margin',tbl_fut_n:'Leverage shown is the smallest that keeps margin under {m} per position. Same for long and short.',tbl_fut_cap:' * Capped by max leverage/margin, so risk is below 1R.',tbl_fut_off:'Futures capital is 0%: futures disabled.',
set_sum:'Capital, limits & fees',set_cur:'Account currency',set_modal:'Starting capital ({c})',set_risk:'Risk per trade (%)',set_minrr:'Minimum R:R (1:x)',set_day:'Daily loss limit (%)',set_week:'Weekly loss limit (%)',set_dd:'Drawdown limit (%)',set_maxopen:'Max open positions',set_maxtrades:'Max trades per day',set_streak:'Stop after losing streak',set_maxpos:'Max size per position (%)',set_feebuy:'Buy fee (%)',set_feesell:'Sell fee (%)',set_tax:'Tax on sell (%)',set_futcap:'Futures capital share (%)',set_futmargin:'Max margin per position (% of futures capital)',set_maxlev:'Max leverage (x)',set_mmr:'Maintenance margin (%)',set_futfee:'Futures fee per side (%)',set_futtax:'Futures tax (%)',
set_note:'Spot and futures fees differ by exchange. Check its fee table (maker is usually cheaper than taker). Futures fees are charged on position size, not margin. Set futures tax to 0 if your exchange does not charge it; spot tax on licensed Indonesian exchanges is 0.21%.',
set_save:'Save settings',set_reset:'Reset limits to default',csv:'Export journal to CSV',store_db:'Saved to your Claude account, so the same journal opens on any phone or laptop.',store_local:'Data is stored on this phone and works without internet. Save a backup regularly, e.g. every weekend, so nothing is lost if the phone breaks or the app is removed.',
install:'Install app',backup_export:'Save backup',backup_import:'Restore from backup',imp_h:'Restore from backup?',imp_d:'This backup has {n} trades with starting capital {m}, made {d}. All data on this phone will be replaced.',imp_yes:'Replace data',ts_imp:'Data restored from backup.',ts_imp_bad:'This file is not a Jurnal Kripto 1R backup.',ts_backup:'Backup ready to save.',bk_never:'No backup yet. Your journal is stored only on this phone.',bk_old:'Last backup was {n} days ago. Save a new one so recent trades are safe too.',bk_now:'Save backup now',ce_date:'Exit date cannot be before the entry date.',ts_update:'A new version is installed. Close and reopen the app to use it.',store_check:'Checking storage…',
disclaimer:'This page is a discipline tool, not financial advice. Crypto is very volatile, and futures can wipe out margin within minutes. Only use money you can afford to lose.',
se_check:'Check these fields: {f}.',se_risk:'Risk above 5% per trade is too much for a small account. Use 0.5–2%.',se_pct:'Capital and margin percentages cannot exceed 100%.',se_mmr:'Maintenance margin is usually below 1%. Check your exchange.',
cur_h:'Change account currency?',cur_d:'Starting capital and every amount in the journal (position size, margin, risk, P/L, funding) will be converted from {a} to {b} at the rate below. Coin prices stay as they are.',cur_rate:'1 USDT rate (IDR)',cur_yes:'Convert & save',cur_err:'Enter the USDT rate in rupiah, e.g. 16,300.',cur_prev:'Starting capital {a} → {b}',
nav_sum:'Summary',nav_calc:'Calculate',nav_journal:'Journal',nav_rules:'Rules',nav_aria:'Main menu',
add_h:'Log a new trade',close:'Close',mm:'Margin mode',l_date_buy:'Buy date',l_date_in:'Entry date',l_bsize:'Buy size ({c})',l_psize:'Position size ({c})',setup:'Setup',reason:'Entry reason',reason_ph:'What did you see on the chart? Why this price?',emotion:'Emotion at entry',add_save:'Save as open position',
ap_fut:'Enter entry, stop loss ({dir} entry), position size and leverage to see the risk.',ap_above:'above',ap_below:'below',ap_spot:'Enter buy price, stop loss (below buy price) and buy size to see the risk.',ap_risk:'Risk on this trade {m} ({r}R)',ap_rr:' · net R:R {x}',ap_fut_l:'Margin {m} · liquidation ≈ {liq} ({p})',ap_viol:'Breaks: {v}. You can still save it; it will be flagged in the journal.',ap_ok:'Meets the rules.',
ae_pair:'Enter the coin or pair.',ae_px:'Enter entry price and stop loss.',ae_size_f:'Enter the position size.',ae_size_s:'Enter the buy size.',ae_lev:'Leverage must be at least 1x.',ae_date:'Enter the date.',ae_sl_long:'Stop loss must be below entry.',
v_status:'Entered while status was “{l}”',v_trades:'More than {n} trades/day',v_open:'More than {n} open positions',v_risk:'Risk {r}R (more than 1R)',v_lev:'Leverage {x}x above {max}x',v_liq:'Liquidation too close to SL',v_margin:'Margin above {m}',v_futcap:'Total margin above futures capital',v_cross:'Used cross margin',v_size:'Position above {p} of balance',v_notp:'No target',v_rr:'R:R 1:{rr} below 1:{min}',v_emo:'Emotion at entry: {e}',
close_h:'Close position',l_exit:'Exit price',l_sell:'Sell price ({c})',l_date_out:'Exit date',l_date_sell:'Sell date',fund_l:'Funding fee paid ({c})',fund_h:'Total funding while the position was open. Enter a negative number (e.g. −1.5) if you received funding.',lesson:'Lesson from this trade',lesson_ph:'What went right? What will you change?',close_save:'Save result',
ci_fut:'{pair} · {side} {l}x · entry {e} · position {m}',ci_spot:'{pair} · bought at {e} for {m}',ci_sl:' · stop {p}',ci_tp:' · target {p}',
cp_need_f:'Enter the exit price to see the net result.',cp_need_s:'Enter the sell price to see the net result.',cp_res:'Net result {m} · {r}',cp_note_f:'After opening fee, closing fee and funding.',cp_note_s:'After sell fee and tax.',ce_exit_f:'Enter the exit price.',ce_exit_s:'Enter the sell price.',
del_h:'Delete this entry?',del_yes:'Delete',cancel:'Cancel',del_info:'{pair} ({d}, {s}) will be permanently removed from the journal.',still_open:'still open',
ts_saved:'{pair} saved. Set the stop loss on the exchange.',ts_saved_f:'{pair} saved. Set the stop loss on the exchange, isolated mode.',ts_closed:'{pair} closed: {m}',ts_deleted:'Entry deleted.',ts_reset:'Limits reset to default.',ts_set:'Settings saved.',ts_csv:'CSV ready to save.',ts_csv_no:'Export is not available in this view.',ts_ro:'You can view this journal but not change it.',ts_quota:'Storage is full. Export to CSV, then delete old trades.',ts_busy:'Too many changes at once. Try again shortly.',ts_fail:'Could not save. Check your connection and try again.',ts_local:'Account storage unavailable, switched to local mode.',ts_ls:'The browser refused to save data. Private mode?',ts_cur:'Account currency is now {c}.'
}};
var SETUP_EN={'Breakout':'Breakout','Pullback / retest':'Pullback / retest','Pantulan support':'Support bounce','Penolakan resistance':'Resistance rejection','Ikut tren':'Trend following','Berita / katalis':'News / catalyst','Lainnya':'Other'};
var EMO_EN={'Tenang':'Calm','Ragu':'Unsure','FOMO':'FOMO','Takut':'Fearful','Balas dendam':'Revenge'};

var S={mode:'loading',db:null,dl:null,trades:[],settings:Object.assign({},DEFAULTS),lang:'id',tab:'ringkasan',openIds:{},calcRiskTouched:false,setDirty:false,readOnly:false,closingId:null,deletingId:null,pendingCur:null};

function t(k,v){var d=I18N[S.lang]||I18N.id,s=d[k];if(s==null)s=I18N.id[k];if(s==null)return k;if(v)s=s.replace(/\{(\w+)\}/g,function(_,n){return v[n]!=null?v[n]:''});return s}
function LOC(){return S.lang==='en'?'en-US':'id-ID'}
function trSetup(v){return S.lang==='en'?(SETUP_EN[v]||v):v}
function trEmo(v){return S.lang==='en'?(EMO_EN[v]||v):v}
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function sum(a){return a.reduce(function(x,y){return x+(+y||0)},0)}
function radio(name){return (document.querySelector('input[name="'+name+'"]:checked')||{}).value}
function setRadio(name,val){var el=document.querySelector('input[name="'+name+'"][value="'+val+'"]');if(el)el.checked=true}
function setL(id,txt){var el=$('label[for="'+id+'"]');if(el)el.textContent=txt}

/* ---------- Angka & mata uang ---------- */
function cur(){return S.settings.currency==='USDT'?'USDT':'IDR'}
function unit(){return cur()==='USDT'?'USDT':'Rp'}
function fmtNum(n,d,min){return new Intl.NumberFormat(LOC(),{maximumFractionDigits:d==null?8:d,minimumFractionDigits:min||0}).format(n)}
function money(n,c){n=+n||0;c=c||cur();
  if(c==='USDT'){var r=Math.round(n*100)/100;return (r<0?'−':'')+fmtNum(Math.abs(r),2,2)+' USDT'}
  n=Math.round(n);return (n<0?'−Rp':'Rp')+fmtNum(Math.abs(n),0)}
function moneyS(n){var z=cur()==='USDT'?Math.round(n*100):Math.round(n);return (z>0?'+':'')+money(n)}
function compact(v){var a=Math.abs(v),en=S.lang==='en';
  if(cur()==='USDT')return fmtNum(v,a<100?1:0);
  if(a>=1e6)return fmtNum(v/1e6,2)+(en?'M':' jt');if(a>=1e3)return fmtNum(v/1e3,0)+(en?'K':' rb');return fmtNum(v,0)}
function moneyShort(n){return cur()==='USDT'?money(n):(n<0?'−':'')+'Rp'+compact(Math.abs(n))}
function sizeStr(n){return cur()==='USDT'?fmtNum(Math.floor(n*100)/100,2):fmtNum(Math.floor(n),0)}
function pct(n,d){return fmtNum(n,d==null?1:d)+'%'}
function rMul(n){return (n>0?'+':n<0?'−':'')+fmtNum(Math.abs(n),2)+'R'}
// Membaca angka format Indonesia (1.250.000,5) maupun Inggris (1,250,000.5).
// hint 'dec' (kolom harga/nominal USDT): di bahasa Indonesia "2.345" dibaca 2,345, bukan dua ribu.
function parseNum(v,hint){
  if(v==null)return NaN;var s=String(v).trim().replace(/\s|rp|usdt|idr|%|x/gi,'').replace(/−/g,'-');if(!s)return NaN;
  var hasD=s.indexOf('.')>-1,hasC=s.indexOf(',')>-1,dec=null;
  if(hasD&&hasC)dec=s.lastIndexOf('.')>s.lastIndexOf(',')?'.':',';
  else if(hasD||hasC){var ch=hasD?'.':',',parts=s.split(ch);
    if(parts.length===2){var ip=parts[0].replace('-',''),thou=S.lang==='en'?',':'.';
      var amb=parts[1].length===3&&ip!==''&&!/^0+$/.test(ip)&&ch===thou;
      dec=(amb&&!(hint==='dec'&&ch==='.'))?null:ch}}
  if(dec===null)s=s.replace(/[.,]/g,'');else s=s.split(dec==='.'?',':'.').join('').replace(dec,'.');
  var n=Number(s);return isFinite(n)?n:NaN;
}
// Jenis kolom: harga & nominal USDT memakai titik sebagai desimal; nominal Rupiah memakai titik ribuan.
function kindHint(el){
  var k=el&&el.getAttribute&&el.getAttribute('data-kind');
  if(k==='idr')return 'thou';
  if(k==='amount')return cur()==='USDT'?'dec':'thou';
  if(k==='price'){
    var id=el.id||'',fut=false,usd=cur()==='USDT';
    if(id.indexOf('c-')===0)fut=calcMarket()==='futures';
    else if(id.indexOf('a-')===0)fut=(radio('a-market')||'spot')==='futures';
    else if(id==='k-exit'){var tr=S.closingId?findTrade(S.closingId):null;if(tr){fut=isFut(tr);usd=!pxIDR(tr)}}
    return (fut||usd)?'dec':'thou';
  }
  return 'dec';
}
function numOf(sel){var el=typeof sel==='string'?$(sel):sel;return el?parseNum(el.value,kindHint(el)):NaN}
function setNum(sel,n,dp){
  var el=typeof sel==='string'?$(sel):sel;if(!el)return;
  if(n==null||!isFinite(n)){el.value='';return}
  el.value=new Intl.NumberFormat(LOC(),{maximumFractionDigits:dp==null?8:dp,useGrouping:!(S.lang==='id'&&kindHint(el)==='dec')}).format(n);
}
function ymd(d){function z(n){return String(n).padStart(2,'0')}return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())}
function mondayOf(d){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));return ymd(x)}
function fmtDate(s){if(!s)return '—';var p=s.split('-');var d=new Date(+p[0],+p[1]-1,+p[2]);return d.toLocaleDateString(LOC(),{day:'numeric',month:'short',year:'numeric'})}
function newId(){return 't'+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function isFut(tr){return !!tr&&tr.market==='futures'}
function pxIDR(tr){return !isFut(tr)&&(tr.pxCur||'IDR')==='IDR'}
function px(tr,p){return p==null||!isFinite(p)?'—':(pxIDR(tr)?'Rp'+fmtNum(p):fmtNum(p))}
function sideTag(tr){return isFut(tr)?'<span class="tag '+(tr.side==='short'?'short':'long')+'">'+(tr.side==='short'?'Short':'Long')+' '+fmtNum(tr.lev,1)+'x</span>':''}

/* ---------- Matematika trade ---------- */
function feesOf(src){src=src||{};var d=S.settings;function g(k){return (src[k]!=null?+src[k]:+d[k])/100}
  return {fb:g('feeBuy'),fs:g('feeSell'),tx:g('tax'),ff:g('futFee'),ftx:g('futTax'),mmr:g('mmr')}}
// Spot: beli senilai `size` di `entry`, jual di `exit`; biaya beli, biaya jual + pajak saat jual.
function pnlOf(entry,exit,size,f){return size*(exit/entry)*(1-f.fs-f.tx)-size-size*f.fb}
// Futures: size = nilai posisi. Biaya dari nilai posisi saat buka dan tutup, lalu funding.
function pnlX(m,side,entry,exit,size,f,funding){
  if(m!=='futures')return pnlOf(entry,exit,size,f);
  var r=exit/entry,g=side==='short'?size*(1-r):size*(r-1);
  return g-size*f.ff-size*r*(f.ff+f.ftx)-(funding||0);
}
function lossPerRpX(m,side,entry,sl,f){return -pnlX(m,side,entry,sl,1,f,0)}
function slDist(side,entry,sl){return side==='short'?(sl-entry)/entry:(entry-sl)/entry}
function liqOf(side,entry,lev,mmr){return side==='short'?entry*(1+1/lev-mmr):entry*(1-1/lev+mmr)}
function safeLevOf(d,mmr){return Math.max(1,Math.floor(1/(LIQ_MULT*d+mmr)+1e-9))}
function tradePnl(tr,exit,funding){return pnlX(tr.market||'spot',tr.side||'long',tr.entry,exit,tr.size,feesOf(tr.fees),funding)}

/* ---------- Statistik & status ---------- */
function stats(){
  var s=S.settings,tr=S.trades;
  var closed=tr.filter(function(x){return x.status==='closed'&&isFinite(x.pnl)}).sort(function(a,b){return (a.closedAt||'').localeCompare(b.closedAt||'')||((a.closedTs||0)-(b.closedTs||0))});
  var open=tr.filter(function(x){return x.status==='open'});
  var eq=+s.modalAwal||0,peak=eq,maxDD=0,series=[eq];
  closed.forEach(function(x){eq+=x.pnl;series.push(eq);if(eq>peak)peak=eq;if(peak>0)maxDD=Math.max(maxDD,(peak-eq)/peak)});
  var dd=peak>0?Math.max(0,(peak-eq)/peak):0;
  var now=new Date(),td=ymd(now),wk=mondayOf(now);
  var tClosed=closed.filter(function(x){return x.closedAt===td});
  var todayPnl=sum(tClosed.map(function(x){return x.pnl}));
  var weekPnl=sum(closed.filter(function(x){return (x.closedAt||'')>=wk}).map(function(x){return x.pnl}));
  var tradesToday=tr.filter(function(x){return x.openedAt===td}).length;
  var streak=0;for(var i=tClosed.length-1;i>=0;i--){if(tClosed[i].pnl<0)streak++;else break}
  var wins=closed.filter(function(x){return x.pnl>0}),losses=closed.filter(function(x){return x.pnl<0});
  var sumW=sum(wins.map(function(x){return x.pnl})),sumL=sum(losses.map(function(x){return x.pnl}));
  var rs=closed.map(function(x){return x.rMult}).filter(function(v){return v!==null&&isFinite(v)});
  var futCap=eq*s.futCapPct/100;
  return {closed:closed,open:open,eq:eq,peak:peak,dd:dd,maxDD:maxDD,series:series,todayPnl:todayPnl,weekPnl:weekPnl,tradesToday:tradesToday,streak:streak,
    wins:wins.length,losses:losses.length,avgW:wins.length?sumW/wins.length:0,avgL:losses.length?sumL/losses.length:0,
    pf:sumL<0?sumW/Math.abs(sumL):(sumW>0?Infinity:0),avgR:rs.length?sum(rs)/rs.length:0,total:eq-(+s.modalAwal||0),
    pnlSpot:sum(closed.filter(function(x){return !isFut(x)}).map(function(x){return x.pnl})),
    pnlFut:sum(closed.filter(isFut).map(function(x){return x.pnl})),nFut:closed.filter(isFut).length,
    R:eq*s.riskPct/100,dayLimit:Math.max(0,(eq-todayPnl)*s.dayPct/100),weekLimit:Math.max(0,(eq-weekPnl)*s.weekPct/100),
    maxPos:eq*s.maxPosPct/100,futCap:futCap,maxMargin:futCap*s.futMarginPct/100,
    openSpotSize:sum(open.filter(function(x){return !isFut(x)}).map(function(x){return x.size})),
    openMargin:sum(open.filter(isFut).map(function(x){return x.margin}))};
}
function mk(lvl,key,wkey,v){return {lvl:lvl,key:key,label:t(key),why:t(wkey,v)}}
function statusOf(st){
  var s=S.settings;
  if(S.mode==='loading')return {lvl:'idle',key:'loading',label:t('loading'),why:t('opening')};
  if(st.dd*100>=s.ddPct)return mk('bad','st_dd_l','st_dd_w',{p:pct(st.dd*100),lim:pct(s.ddPct,0)});
  if(st.weekPnl<0&&-st.weekPnl>=st.weekLimit)return mk('bad','st_wk_l','st_wk_w',{m:money(st.weekPnl),lim:money(st.weekLimit)});
  if(st.todayPnl<0&&-st.todayPnl>=st.dayLimit)return mk('bad','st_day_l','st_day_w',{m:money(st.todayPnl),lim:money(st.dayLimit)});
  if(st.streak>=s.maxStreak)return mk('bad','st_day_l','st_streak_w',{n:st.streak});
  if(st.tradesToday>=s.maxTrades)return mk('warn','st_trades_l','st_trades_w',{n:st.tradesToday,max:s.maxTrades});
  if(st.open.length>=s.maxOpen)return mk('warn','st_open_l','st_open_w',{n:st.open.length,max:s.maxOpen});
  if(st.todayPnl<0&&-st.todayPnl>=st.dayLimit*0.6)return mk('warn','st_care_l','st_care_w',{m:money(st.dayLimit+st.todayPnl)});
  return mk('good','st_ok_l','st_ok_w',{m:money(st.R)});
}

/* ---------- Bahasa & label ---------- */
function applyMarketUI(p){
  var fut,tr=null;
  if(p==='c')fut=calcMarket()==='futures';else if(p==='a')fut=(radio('a-market')||'spot')==='futures';else{tr=S.closingId?findTrade(S.closingId):null;fut=isFut(tr)}
  $$('.fut-only-'+p).forEach(function(el){el.hidden=!fut});
  var u=unit();
  if(p==='c'||p==='a'){
    setL(p+'-entry',fut?t('l_entry'):t('l_buy',{c:u}));setL(p+'-sl',fut?t('l_sl'):t('l_sl_spot',{c:u}));setL(p+'-tp',fut?t('l_tp'):t('l_tp_spot',{c:u}));
    if(p==='a'){setL('a-size',fut?t('l_psize',{c:u}):t('l_bsize',{c:u}));setL('a-date',fut?t('l_date_in'):t('l_date_buy'))}
    var pair=$('#'+p+'-pair');if(pair)pair.placeholder=(fut||cur()==='USDT')?t('ph_usdt'):t('ph_idr');
  }else{
    setL('k-exit',fut?t('l_exit'):t('l_sell',{c:tr&&!pxIDR(tr)?'USDT':'Rp'}));setL('k-date',fut?t('l_date_out'):t('l_date_sell'));
  }
}
function applyLabels(){
  applyMarketUI('c');applyMarketUI('a');applyMarketUI('k');
  setL('s-modal',t('set_modal',{c:unit()}));setL('k-funding',t('fund_l',{c:unit()}));
}
function applyI18n(){
  document.documentElement.lang=S.lang;
  $$('[data-i18n]').forEach(function(el){el.textContent=t(el.getAttribute('data-i18n'))});
  $$('[data-i18n-ph]').forEach(function(el){el.placeholder=t(el.getAttribute('data-i18n-ph'))});
  $$('[data-i18n-aria]').forEach(function(el){el.setAttribute('aria-label',t(el.getAttribute('data-i18n-aria')))});
  $$('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-lang')===S.lang))});
  $$('#a-setup option').forEach(function(o){o.textContent=trSetup(o.value)});
  $$('input[name="a-emosi"]').forEach(function(i){i.nextElementSibling.textContent=trEmo(i.value)});
  applyLabels();
}
// Ganti bahasa: angka di kolom isian ditulis ulang ke format bahasa baru.
function setLang(l,save){
  l=l==='en'?'en':'id';
  if(l!==S.lang){
    var vals=$$('input.num').map(function(el){return [el,el.value.trim()===''?null:numOf(el)]});
    S.lang=l;
    vals.forEach(function(p){if(p[1]!=null&&isFinite(p[1]))setNum(p[0],p[1])});
    try{localStorage.setItem(LS_LANG,l)}catch(e){}
  }
  applyI18n();render();
  if(save&&S.mode!=='loading'&&!S.readOnly&&S.settings.lang!==l)putSettings(Object.assign({},S.settings,{lang:l}));
}

/* ---------- Render ---------- */
function render(){
  var st=stats(),sts=statusOf(st);
  applyLabels();
  renderHeader(st,sts);renderSummary(st,sts);renderJournal(st);renderRules(st);renderCalc();
  if(!S.setDirty)fillSettings();
  $('#store-mode').textContent=S.mode==='local'?t('store_local'):t('store_check');
  renderBackupNote();
}
function renderBackupNote(){
  var el=$('#s-backup'),last=0;try{last=+localStorage.getItem(LS_BK)||0}catch(e){}
  var days=last?Math.floor((Date.now()-last)/864e5):null,show=S.mode==='local'&&S.trades.length>0&&(days===null||days>=7);
  el.hidden=!show;if(show)$('#s-backup-txt').textContent=days===null?t('bk_never'):t('bk_old',{n:days});
}
function renderHeader(st,sts){
  $('#h-equity').textContent=money(st.eq);
  var m=+S.settings.modalAwal||0,ch=st.eq-m,el=$('#h-change');
  var zero=cur()==='USDT'?Math.round(ch*100)===0:Math.round(ch)===0;
  el.textContent=zero?t('eq_same',{m:money(m)}):t('eq_change',{s:(ch>0?'+':'−')+pct(Math.abs(m?ch/m*100:0),2),m:moneyShort(m)});
  el.className='change'+(zero?'':ch>0?' up':' down');
  var p=$('#h-status');p.textContent=sts.label;p.className='pill '+sts.lvl;
}
function meterHTML(title,used,limit,ticks,pnl){
  var ratio=limit>0?Math.min(1,used/limit):0,lvl=ratio>=1?'bad':ratio>=0.6?'warn':'';
  var right=pnl>0?'<span class="up num">'+moneyS(pnl)+'</span>':'<span class="num">'+money(used)+' / '+money(limit)+'</span>';
  return '<div class="meter-head"><b>'+esc(title)+'</b>'+right+'</div><div class="bar '+lvl+'" style="--ticks:'+Math.max(1,Math.round(ticks))+'" role="img" aria-label="'+esc(title)+': '+esc(t('used_pct',{p:Math.round(ratio*100)}))+'"><i style="width:'+(ratio*100).toFixed(1)+'%"></i></div>';
}
function cell(k,v,h){return '<div><span class="k">'+esc(k)+'</span><span class="v">'+v+'</span>'+(h?'<span class="h">'+esc(h)+'</span>':'')+'</div>'}
function counter(v,max,k){v=+v||0;max=+max||0;return '<div class="counter'+(v>=max?' full':'')+'"><span class="v">'+v+'<span class="muted">/'+max+'</span></span><span class="k">'+esc(k)+'</span></div>'}
function plSpan(n){return '<span class="'+(n>0?'up':n<0?'down':'')+'">'+moneyS(n)+'</span>'}
function renderSummary(st,sts){
  var s=S.settings;$('#s-card').className='status-card '+sts.lvl;
  $('#s-label').textContent=sts.label;$('#s-why').textContent=sts.why;
  $('#s-budget').innerHTML=
    cell(t('b_1r'),money(st.R),t('of_bal',{p:pct(s.riskPct,2)}))+
    cell(t('b_maxspot'),money(st.maxPos),t('of_bal',{p:pct(s.maxPosPct,0)}))+
    cell(t('b_day'),money(st.dayLimit),t('approx_r',{r:fmtNum(s.dayPct/s.riskPct,1)}))+
    cell(t('b_week'),money(st.weekLimit),t('approx_r',{r:fmtNum(s.weekPct/s.riskPct,1)}))+
    cell(t('b_futcap'),money(st.futCap),t('futcap_h',{p:pct(s.futCapPct,0),m:money(st.openMargin)}))+
    cell(t('b_maxmargin'),money(st.maxMargin),t('maxmargin_h',{l:fmtNum(s.maxLev,0)}));
  $('#m-day').innerHTML=meterHTML(t('m_day'),Math.max(0,-st.todayPnl),st.dayLimit,s.dayPct/s.riskPct,st.todayPnl);
  $('#m-week').innerHTML=meterHTML(t('m_week'),Math.max(0,-st.weekPnl),st.weekLimit,s.weekPct/s.riskPct,st.weekPnl);
  $('#s-counters').innerHTML=counter(st.tradesToday,s.maxTrades,t('c_today'))+counter(st.open.length,s.maxOpen,t('c_open'))+counter(st.streak,s.maxStreak,t('c_streak'));
  $('#s-ccount').textContent=st.closed.length?t('n_closed',{n:st.closed.length}):'';
  $('#s-chart').innerHTML=st.closed.length?chartSVG(st):
    '<div class="empty"><strong>'+esc(t('empty_chart_t'))+'</strong><span>'+esc(t('empty_chart_d'))+'</span><button class="btn btn-ghost btn-sm" type="button" data-go="hitung">'+esc(t('open_calc'))+'</button></div>';
  var n=st.closed.length;
  $('#s-stats').innerHTML=
    cell(t('s_closed'),String(n),t('s_wl',{w:st.wins,l:st.losses}))+
    cell(t('s_wr'),n?pct(st.wins/n*100,0):'—','')+
    cell(t('s_avg'),n?rMul(st.avgR):'—',t('s_avg_h'))+
    cell(t('s_pf'),n?(st.pf===Infinity?'∞':fmtNum(st.pf,2)):'—',t('s_pf_h'))+
    cell(t('s_avgw'),st.wins?money(st.avgW):'—','')+
    cell(t('s_avgl'),st.losses?money(st.avgL):'—','')+
    cell(t('s_spot'),plSpan(st.pnlSpot),t('s_ntrades',{n:n-st.nFut}))+
    cell(t('s_fut'),plSpan(st.pnlFut),t('s_fut_h',{n:st.nFut}))+
    cell(t('s_total'),plSpan(st.total),t('s_total_h'))+
    cell(t('s_dd'),pct(st.maxDD*100),t('s_dd_h',{p:pct(st.dd*100)}));
}
function chartSVG(st){
  var s=S.settings,ser=st.series,W=340,H=180,pl=52,pr=58,pt=14,pb=24;
  var ddLine=st.peak*(1-s.ddPct/100),base=+s.modalAwal;
  var vals=ser.concat([base,ddLine]),mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals);
  var pad=(mx-mn)*0.1||mx*0.02||1;mn-=pad;mx+=pad;
  function x(i){return pl+(ser.length<=1?0:i*(W-pl-pr)/(ser.length-1))}
  function y(v){return pt+(mx-v)*(H-pt-pb)/(mx-mn)}
  var g='',i;
  for(i=0;i<3;i++){var v=mn+(mx-mn)*(i+0.5)/3,yy=y(v).toFixed(1);g+='<line class="grid" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+yy+'" y2="'+yy+'"/><text class="axis" x="'+(pl-6)+'" y="'+(+yy+3)+'" text-anchor="end">'+esc(compact(v))+'</text>'}
  var line='M'+ser.map(function(v,i){return x(i).toFixed(1)+','+y(v).toFixed(1)}).join(' L');
  var area=line+' L'+x(ser.length-1).toFixed(1)+','+(H-pb)+' L'+x(0).toFixed(1)+','+(H-pb)+' Z';
  var yb=y(base).toFixed(1),yd=y(ddLine).toFixed(1),last=ser[ser.length-1];
  return '<div class="panel" style="padding:10px 8px 6px"><svg class="chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(t('ch_aria',{a:money(base),b:money(last),n:ser.length-1}))+'">'+g+
    '<path class="area" d="'+area+'"/>'+
    '<line class="base" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+yb+'" y2="'+yb+'"/><text class="lbl m" x="'+(W-pr+5)+'" y="'+(+yb+3)+'">'+esc(t('ch_cap'))+'</text>'+
    '<line class="ddl" x1="'+pl+'" x2="'+(W-pr)+'" y1="'+yd+'" y2="'+yd+'"/><text class="lbl d" x="'+(W-pr+5)+'" y="'+(+yd+3)+'">'+esc(t('ch_dd'))+'</text>'+
    '<path class="eq" d="'+line+'"/><circle class="dot" cx="'+x(ser.length-1).toFixed(1)+'" cy="'+y(last).toFixed(1)+'" r="4"/>'+
    '<text class="axis" x="'+pl+'" y="'+(H-6)+'">'+esc(t('ch_start'))+'</text><text class="axis" x="'+(W-pr)+'" y="'+(H-6)+'" text-anchor="end">'+esc(t('ch_n',{n:ser.length-1}))+'</text></svg></div>';
}

/* Pelanggaran aturan disimpan sebagai kode + angka mentah, lalu diterjemahkan saat ditampilkan. */
function violText(x){
  if(typeof x==='string')return x;
  var a=x&&x.a||{},o={};
  Object.keys(a).forEach(function(k){var v=a[k];o[k]=k==='m'?money(v):k==='p'?pct(v,0):k==='l'?t(v):k==='e'?trEmo(v):(typeof v==='number'?fmtNum(v,(k==='n'||k==='max')?0:2):v)});
  return t('v_'+x.k,o);
}
function tradeHTML(tr){
  var closed=tr.status==='closed',open=!!S.openIds[tr.id],fut=isFut(tr),side=tr.side||'long';
  var right=closed?'<span class="t-pnl '+(tr.pnl>0?'up':tr.pnl<0?'down':'')+'">'+moneyS(tr.pnl)+'</span><span class="t-r">'+(tr.rMult!==null&&isFinite(tr.rMult)?rMul(tr.rMult):'')+'</span>'
    :'<span class="tag open">'+esc(t('t_open'))+'</span><span class="t-r">'+esc(t('t_risk',{m:money(tr.riskRp)}))+'</span>';
  var sub=fmtDate(closed?tr.closedAt:tr.openedAt)+' · '+(fut?'Futures':'Spot')+' · '+esc(trSetup(tr.setup||''));
  var broken=(tr.rulesBroken||[]).length;
  var slPct=slDist(side,tr.entry,tr.sl)*100,slSign=side==='short'?'+':'−';
  var tgtTxt=tr.tp?(side==='short'?'−':'+')+pct(Math.abs(tr.tp-tr.entry)/tr.entry*100):t('t_notarget');
  var cells;
  if(fut){
    cells=cell(t('t_entry'),px(tr,tr.entry),fmtDate(tr.openedAt))+
      cell(closed?t('t_exit'):'Stop loss',closed?px(tr,tr.exit):px(tr,tr.sl),closed?fmtDate(tr.closedAt):slSign+pct(slPct))+
      cell(t('t_size'),money(tr.size),(side==='short'?'Short ':'Long ')+fmtNum(tr.lev,1)+'x')+
      cell(t('t_margin'),money(tr.margin),tr.marginMode||'Isolated')+
      (closed?cell(t('t_fund'),money(tr.funding||0),(tr.funding||0)<0?t('t_recv'):t('t_paid')):cell(t('t_liq'),px(tr,tr.liq),t('o_from_entry',{p:pct(Math.abs(tr.liq-tr.entry)/tr.entry*100)})))+
      cell(t('t_irisk'),money(tr.riskRp),t('t_slat',{p:px(tr,tr.sl)}))+
      cell(t('t_target'),tr.tp?px(tr,tr.tp):'—',tgtTxt)+
      cell(t('t_emo'),esc(trEmo(tr.emosi||'—')),'');
  }else{
    cells=cell(t('t_buy'),px(tr,tr.entry),fmtDate(tr.openedAt))+
      cell(closed?t('t_sell'):'Stop loss',closed?px(tr,tr.exit):px(tr,tr.sl),closed?fmtDate(tr.closedAt):'−'+pct(slPct))+
      cell(t('t_bsize'),money(tr.size),'')+
      cell(t('t_irisk'),money(tr.riskRp),t('t_slat',{p:px(tr,tr.sl)}))+
      cell(t('t_target'),tr.tp?px(tr,tr.tp):'—',tgtTxt)+
      cell(t('t_emo'),esc(trEmo(tr.emosi||'—')),'');
  }
  var body='<div class="ledger">'+cells+'</div>';
  if(broken)body+='<div class="t-text"><span class="eyebrow">'+esc(t('t_broken'))+'</span><p>'+tr.rulesBroken.map(function(v){return esc(violText(v))}).join(' · ')+'</p></div>';
  if(tr.note)body+='<div class="t-text"><span class="eyebrow">'+esc(t('t_reason'))+'</span><p>'+esc(tr.note)+'</p></div>';
  if(tr.lesson)body+='<div class="t-text"><span class="eyebrow">'+esc(t('t_lesson'))+'</span><p>'+esc(tr.lesson)+'</p></div>';
  body+='<div class="t-actions">'+(closed?'':'<button class="btn btn-primary btn-sm" type="button" data-close-trade="'+esc(tr.id)+'">'+esc(t('t_close'))+'</button>')+
    '<button class="btn btn-ghost btn-sm" type="button" data-del="'+esc(tr.id)+'">'+esc(t('t_del'))+'</button></div>';
  return '<details class="trade" data-id="'+esc(tr.id)+'"'+(open?' open':'')+'><summary><div class="t-main"><span class="t-pair">'+esc(tr.pair)+sideTag(tr)+(broken?'<span class="tag flag">'+esc(t('t_rules',{n:broken}))+'</span>':'')+'</span><span class="t-sub">'+sub+'</span></div><div class="t-res">'+right+'</div></summary><div class="t-body">'+body+'</div></details>';
}
function renderJournal(st){
  var open=st.open.slice().sort(function(a,b){return (b.createdTs||0)-(a.createdTs||0)}),closed=st.closed.slice().reverse();
  if(S.mode==='loading'){$('#j-open').innerHTML='<p class="note">'+esc(t('j_loading'))+'</p>';$('#j-closed').innerHTML='';return}
  if(!open.length&&!closed.length){
    $('#j-open').innerHTML='<div class="empty"><strong>'+esc(t('j_empty_t'))+'</strong><span>'+esc(t('j_empty_d'))+'</span><button class="btn btn-ghost btn-sm" type="button" data-restore>'+esc(t('backup_import'))+'</button></div>';$('#j-closed').innerHTML='';return;
  }
  $('#j-open').innerHTML=open.length?'<h3>'+esc(t('j_open',{n:open.length}))+'</h3><div class="trades">'+open.map(tradeHTML).join('')+'</div>':'';
  $('#j-closed').innerHTML=closed.length?'<h3>'+esc(t('j_hist',{n:closed.length}))+'</h3><div class="trades">'+closed.map(tradeHTML).join('')+'</div>':'';
}
function renderRules(st){
  var s=S.settings,R=st.R,eq=st.eq;
  var ten=(1-Math.pow(1-s.riskPct/100,10))*100;
  $('#r-intro').textContent=t('r_intro',{m:money(eq),p:pct(s.riskPct,2),t:pct(ten,1)});
  function grp(title,items){return '<div class="stack"><h3>'+esc(title)+'</h3><div class="panel rules" style="padding-block:4px">'+items.map(function(i){return '<div class="rule"><span class="rv">'+esc(i[0])+'</span><p>'+i[1]+'</p></div>'}).join('')+'</div></div>'}
  $('#r-groups').innerHTML=
    grp(t('g_trade'),[[money(R),t('r_1r',{p:pct(s.riskPct,2)})],[t('r_sl_v'),t('r_sl')],['1 : '+fmtNum(s.minRR,1),t('r_rr',{x:fmtNum(s.minRR,1)})]])+
    grp(t('g_spot'),[[money(st.maxPos),t('r_maxspot',{p:pct(s.maxPosPct,0)})],['≈'+pct(s.feeBuy+s.feeSell+s.tax,2),t('r_spotfee',{b:pct(s.feeBuy,2),s:pct(s.feeSell,2),t:pct(s.tax,2)})]])+
    grp(t('g_fut'),[[t('r_f1_v'),t('r_f1',{m:money(R)})],[money(st.futCap),t('r_f2',{p:pct(s.futCapPct,0)})],[money(st.maxMargin),t('r_f3',{p:pct(s.futMarginPct,0)})],
      ['≤ '+fmtNum(s.maxLev,0)+'x',t('r_f4')],['Isolated',t('r_f5')],[t('r_f6_v',{k:LIQ_MULT}),t('r_f6',{k:LIQ_MULT})],[t('r_f7_v'),t('r_f7')],[t('r_f8_v'),t('r_f8')],['≈'+pct(2*s.futFee+s.futTax,2),t('r_f9')]])+
    grp(t('g_day'),[[t('r_d1_v',{n:s.maxTrades}),t('r_d1')],[t('r_d2_v',{n:s.maxOpen}),t('r_d2',{m:money(R*s.maxOpen)})],[money(st.dayLimit),t('r_d3',{p:pct(s.dayPct,0)})],[t('r_d4_v',{n:s.maxStreak}),t('r_d4')]])+
    grp(t('g_week'),[[money(st.weekLimit),t('r_w1',{p:pct(s.weekPct,0)})],[t('r_w2_v'),t('r_w2')]])+
    grp(t('g_bal'),[[money(st.peak*(1-s.ddPct/100)),t('r_b1',{p:pct(s.ddPct,0)})],[t('r_b2_v'),t('r_b2')],[t('r_b3_v'),t('r_b3')]]);
  var f=feesOf(s);
  $('#r-table').innerHTML='<thead><tr><th>'+esc(t('th_sl'))+'</th><th>'+esc(t('th_buy'))+'</th><th>'+esc(t('th_pbal'))+'</th><th>'+esc(t('th_loss'))+'</th></tr></thead><tbody>'+[2,3,4,5,7,10].map(function(d){
    var lpr=lossPerRpX('spot','long',100,100-d,f),size=Math.min(R/lpr,st.maxPos);
    return '<tr><td>−'+d+'%</td><td>'+money(size)+'</td><td>'+pct(eq?size/eq*100:0,0)+'</td><td>'+money(size*lpr)+'</td></tr>';
  }).join('')+'</tbody>';
  if(!(st.maxMargin>0)){$('#r-ftable').innerHTML='<tbody><tr><td>'+esc(t('tbl_fut_off'))+'</td></tr></tbody>';$('#r-ftnote').textContent='';return}
  var anyCap=false,frows=[1,2,3,5,8].map(function(d){
    var lpr=lossPerRpX('futures','long',100,100-d,f),safe=Math.min(s.maxLev,safeLevOf(d/100,f.mmr));
    var n=R/lpr,lev=Math.max(1,Math.ceil(n/st.maxMargin-1e-9)),cap=false;
    if(lev>safe){lev=safe;n=st.maxMargin*lev;cap=true;anyCap=true}
    return '<tr><td>'+d+'%</td><td>'+money(n)+'</td><td>'+lev+'x</td><td>'+money(n/lev)+'</td><td>'+money(n*lpr)+(cap?'*':'')+'</td></tr>';
  }).join('');
  $('#r-ftable').innerHTML='<thead><tr><th>'+esc(t('th_sl'))+'</th><th>'+esc(t('th_size'))+'</th><th>'+esc(t('th_lev'))+'</th><th>'+esc(t('th_margin'))+'</th><th>'+esc(t('th_loss'))+'</th></tr></thead><tbody>'+frows+'</tbody>';
  $('#r-ftnote').textContent=t('tbl_fut_n',{m:money(st.maxMargin)})+(anyCap?t('tbl_fut_cap'):'');
}

/* ---------- Kalkulator ---------- */
function calcMarket(){return radio('c-market')||'spot'}
function calcSide(){return calcMarket()==='futures'?(radio('c-side')||'long'):'long'}
function calcValues(){
  var s=S.settings,st=stats(),m=calcMarket(),side=calcSide();
  var entry=numOf('#c-entry'),sl=numOf('#c-sl'),tp=numOf('#c-tp'),rPct=numOf('#c-risk');
  if(!(rPct>0))rPct=s.riskPct;
  if(!(entry>0)||!(sl>0))return {err:t('e_need')};
  if(side==='long'&&sl>=entry)return {err:m==='spot'?t('e_spot_sl'):t('e_long_sl')};
  if(side==='short'&&sl<=entry)return {err:t('e_short_sl')};
  var f=feesOf(null),d=slDist(side,entry,sl),lpr=lossPerRpX(m,side,entry,sl,f),budget=st.eq*rPct/100,size=budget/lpr,cap=null;
  var res={m:m,side:side,entry:entry,sl:sl,tp:tp>0?tp:null,rPct:rPct,d:d,lpr:lpr,st:st,feeShare:(lpr-d)/lpr};
  if(m==='spot'){
    var cash=Math.max(0,st.eq-st.openSpotSize-st.openMargin);res.cash=cash;
    if(size>st.maxPos){size=st.maxPos;cap='maks'}
    if(size>cash){size=cash;cap='kas'}
  }else{
    var safeRaw=safeLevOf(d,f.mmr),safe=Math.min(s.maxLev,safeRaw);
    var availM=Math.max(0,st.futCap-st.openMargin),mCap=Math.min(st.maxMargin,availM);
    var levIn=numOf('#c-lev'),auto=!(levIn>=1),lev;
    if(auto){lev=mCap>0?Math.ceil(size/mCap-1e-9):1;lev=Math.max(1,Math.min(lev,safe))}else lev=levIn;
    if(mCap<=0){size=0;cap='habis'}
    else if(size/lev>mCap){size=mCap*lev;cap=availM<st.maxMargin?'kasfut':'margin'}
    res.safeRaw=safeRaw;res.safe=safe;res.availM=availM;res.mCap=mCap;res.lev=lev;res.auto=auto;
    res.margin=size/lev;res.liq=liqOf(side,entry,lev,f.mmr);res.liqD=1/lev-f.mmr;
  }
  res.size=size;res.cap=cap;res.risk=size*lpr;
  res.tpOk=tp>0&&(side==='short'?tp<entry:tp>entry);
  if(res.tpOk){res.profit=pnlX(m,side,entry,tp,size,f,0);res.rr=res.risk>0?res.profit/res.risk:0;res.rrGross=Math.abs(tp-entry)/Math.abs(entry-sl)}
  return res;
}
function calcChecks(c){
  var s=S.settings,out=[],sts=statusOf(c.st);
  if(sts.lvl==='bad')out.push(['bad',t('k_status_bad',{l:sts.label})]);
  else if(sts.lvl==='warn')out.push(['warn',t('k_status_warn',{l:sts.label,w:sts.why})]);
  if(c.rPct>s.riskPct+1e-9)out.push([c.rPct>2?'bad':'warn',t('k_risk',{p:pct(c.rPct,2),r:pct(s.riskPct,2)})]);
  if(c.tp==null)out.push(['warn',t('k_notp')]);
  else if(!c.tpOk)out.push(['bad',c.side==='short'?t('k_tp_short'):t('k_tp_long')]);
  else if(c.rr<s.minRR)out.push(['bad',t('k_rr_bad',{rr:fmtNum(c.rr,2),min:fmtNum(s.minRR,1)})]);
  else out.push(['ok',t('k_rr_ok',{rr:fmtNum(c.rr,2),min:fmtNum(s.minRR,1)})]);
  if(c.feeShare>0.25)out.push(['warn',t('k_fee',{p:pct(c.feeShare*100,0)})]);
  if(c.m==='spot'){
    if(c.cap==='maks')out.push(['warn',t('k_cap_max',{p:pct(s.maxPosPct,0),m:money(c.risk)})]);
    if(c.cap==='kas')out.push(['warn',t('k_cap_cash',{m:money(c.cash)})]);
  }else{
    if(c.cap==='habis')out.push(['bad',t('k_fut_none')]);
    if(c.lev>s.maxLev)out.push(['bad',t('k_lev_over',{l:fmtNum(c.lev,1),max:fmtNum(s.maxLev,0)})]);
    if(c.liqD<LIQ_MULT*c.d)out.push(['bad',t('k_liq_bad',{p:pct(c.liqD*100),d:pct(c.d*100),s:Math.min(c.safeRaw,s.maxLev)})]);
    else out.push(['ok',t('k_liq_ok',{p:pct(c.liqD*100),k:LIQ_MULT})]);
    if(c.cap==='margin')out.push(['warn',t('k_margin_cap',{m:money(c.mCap),r:money(c.risk)})+(c.lev<c.safe?t('k_margin_up',{s:c.safe}):'')]);
    if(c.cap==='kasfut')out.push(['warn',t('k_futcash',{m:money(c.availM)})]);
  }
  if(!out.some(function(x){return x[0]!=='ok'}))out.push(['ok',c.m==='spot'?t('k_all_spot'):t('k_all_fut')]);
  return out;
}
function renderCalc(){
  var box=$('#calc-out'),c=calcValues();
  if(!S.calcRiskTouched)setNum('#c-risk',S.settings.riskPct,2);
  if(c.err){box.innerHTML='<p class="err">'+esc(c.err)+'</p>';return}
  var tgt=c.tpOk,h;
  var pnlCells=cell(t('o_profit'),tgt?'<span class="up">'+moneyS(c.profit)+'</span>':'—',tgt?t('o_from_entry',{p:(c.side==='short'?'−':'+')+pct(Math.abs(c.tp-c.entry)/c.entry*100,2)}):'')+
    cell(t('o_rr'),tgt?'1 : '+fmtNum(c.rr,2):'—',tgt?t('o_gross',{x:fmtNum(c.rrGross,2)}):'');
  var lossCells=cell(t('o_loss'),money(c.risk),t('o_1r',{m:money(c.st.eq*c.rPct/100)}))+cell(t('o_sld'),(c.side==='short'?'+':'−')+pct(c.d*100,2),'');
  if(c.m==='spot'){
    var coins=c.size/c.entry;
    h='<div><p class="eyebrow">'+esc(t('o_buy'))+'</p><p class="big">'+money(c.size)+'</p><p class="note">'+esc(t('o_coins',{c:fmtNum(coins,coins<1?6:2),p:pct(c.st.eq?c.size/c.st.eq*100:0,1)}))+'</p></div>'+
      '<div class="ledger">'+lossCells+pnlCells+'</div>';
  }else{
    var kurs=numOf('#c-kurs'),conv='';
    if(kurs>0)conv=cur()==='IDR'?t('o_conv',{a:money(c.size/kurs,'USDT'),b:money(c.margin/kurs,'USDT')}):t('o_conv',{a:money(c.size*kurs,'IDR'),b:money(c.margin*kurs,'IDR')});
    h='<div><p class="eyebrow">'+esc(t('o_size',{side:c.side==='short'?'Short':'Long'}))+'</p><p class="big">'+money(c.size)+'</p><p class="note">'+esc(t('o_margin',{m:money(c.margin),l:fmtNum(c.lev,1)})+(c.auto?t('o_auto'):'')+conv)+'</p></div>'+
      '<div class="ledger">'+lossCells+pnlCells+
      cell(t('o_liq'),fmtNum(c.liq,c.liq<1?8:2),t('o_from_entry',{p:pct(c.liqD*100)}))+cell(t('o_safe'),Math.min(c.safeRaw,S.settings.maxLev)+'x',t('o_safe_h',{k:LIQ_MULT}))+'</div>';
  }
  h+='<ul class="checks">'+calcChecks(c).map(function(x){return '<li class="'+x[0]+'"><span class="mk" aria-hidden="true">'+(x[0]==='ok'?'✓':x[0]==='warn'?'!':'×')+'</span><span>'+esc(x[1])+'</span></li>'}).join('')+'</ul>';
  h+='<button class="btn btn-primary btn-block" type="button" id="calc-to-add"'+(c.size>0?'':' disabled')+'>'+esc(t('o_log'))+'</button>';
  box.innerHTML='<div class="calc-out panel">'+h+'</div>';
}

/* ---------- Pengaturan ---------- */
var SET_MAP=[['s-modal','modalAwal',0],['s-risk','riskPct',2],['s-minrr','minRR',2],['s-day','dayPct',2],['s-week','weekPct',2],['s-dd','ddPct',2],['s-maxopen','maxOpen',0],['s-maxtrades','maxTrades',0],['s-streak','maxStreak',0],
  ['s-maxpos','maxPosPct',2],['s-feebuy','feeBuy',4],['s-feesell','feeSell',4],['s-tax','tax',4],
  ['s-futcap','futCapPct',2],['s-futmargin','futMarginPct',2],['s-maxlev','maxLev',0],['s-mmr','mmr',3],['s-futfee','futFee',4],['s-futtax','futTax',4]];
var ZERO_OK=/^(feeBuy|feeSell|tax|futFee|futTax|mmr|futCapPct)$/;
function fillSettings(){
  $('#s-cur').value=cur();
  SET_MAP.forEach(function(m){var el=$('#'+m[0]);if(document.activeElement!==el)setNum(el,S.settings[m[1]],m[1]==='modalAwal'&&cur()==='USDT'?2:m[2])});
}
function readSettings(){
  var o={},bad=[];
  SET_MAP.forEach(function(m){var v=numOf('#'+m[0]);if(!isFinite(v)||v<0||(!ZERO_OK.test(m[1])&&v<=0))bad.push($('label[for="'+m[0]+'"]').textContent);o[m[1]]=v});
  if(bad.length)return {err:t('se_check',{f:bad.join(', ')})};
  if(o.riskPct>5)return {err:t('se_risk')};
  if(o.maxPosPct>100||o.futCapPct>100||o.futMarginPct>100)return {err:t('se_pct')};
  if(o.mmr>=5)return {err:t('se_mmr')};
  ['maxOpen','maxTrades','maxStreak','maxLev'].forEach(function(k){o[k]=Math.max(1,Math.round(o[k]))});
  return {val:o};
}

/* ---------- Pembersih data: semua isi cadangan & penyimpanan diperiksa sebelum dipakai ---------- */
var SET_SPEC={modalAwal:[1e-6,1e15],riskPct:[0.01,100],dayPct:[0.01,100],weekPct:[0.01,100],ddPct:[0.01,100],maxPosPct:[0.01,100],
  maxOpen:[1,1000,1],maxTrades:[1,1000,1],maxStreak:[1,1000,1],feeBuy:[0,100],feeSell:[0,100],tax:[0,100],minRR:[0.01,1000],
  futCapPct:[0,100],futMarginPct:[0.01,100],maxLev:[1,1000,1],mmr:[0,100],futFee:[0,100],futTax:[0,100]};
var SETUPS=['Breakout','Pullback / retest','Pantulan support','Penolakan resistance','Ikut tren','Berita / katalis','Lainnya'];
var EMOS=['Tenang','Ragu','FOMO','Takut','Balas dendam'];
var VIOL_KEYS=['status','trades','open','risk','lev','liq','margin','futcap','cross','size','notp','rr','emo'];
function finNum(v){if(typeof v==='string'&&v.trim()!=='')v=Number(v);return typeof v==='number'&&isFinite(v)?v:null}
function cleanStr(v,max){return typeof v==='string'?v.slice(0,max):''}
function isDate(v){return typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)}
function cleanSettings(o){
  o=o&&typeof o==='object'?o:{};var r={};
  Object.keys(DEFAULTS).forEach(function(k){
    if(k==='currency'){r[k]=o[k]==='USDT'?'USDT':'IDR';return}
    var sp=SET_SPEC[k],v=finNum(o[k]);
    if(v===null||v<sp[0]||v>sp[1])v=DEFAULTS[k];
    r[k]=sp[2]?Math.round(v):v;
  });
  if(o.lang==='en'||o.lang==='id')r.lang=o.lang;
  return r;
}
function cleanFees(f){
  if(!f||typeof f!=='object')return null;var r={},n=0;
  ['feeBuy','feeSell','tax','futFee','futTax','mmr'].forEach(function(k){var v=finNum(f[k]);if(v!==null&&v>=0&&v<=100){r[k]=v;n++}});
  return n?r:null;
}
function cleanViol(v){
  if(typeof v==='string')return v.slice(0,160);
  if(!v||typeof v!=='object'||VIOL_KEYS.indexOf(v.k)<0)return null;
  var a=v.a&&typeof v.a==='object'?v.a:{},o={};
  ['n','max','r','x','m','p','rr','min'].forEach(function(k){var x=finNum(a[k]);if(x!==null)o[k]=x});
  if(v.k==='status'&&typeof a.l==='string'&&/^st_[a-z]+_l$/.test(a.l)&&Object.prototype.hasOwnProperty.call(I18N.id,a.l))o.l=a.l;
  if(v.k==='emo'&&EMOS.indexOf(a.e)>-1)o.e=a.e;
  return {k:v.k,a:o};
}
function cleanTrade(x){
  if(!x||typeof x!=='object')return null;
  var id=typeof x.id==='string'&&/^[A-Za-z0-9_-]{1,64}$/.test(x.id)?x.id:null;
  var entry=finNum(x.entry),sl=finNum(x.sl),size=finNum(x.size);
  if(!id||!(entry>0)||!(sl>0)||!(size>0)||!isDate(x.openedAt))return null;
  var fut=x.market==='futures',side=fut&&x.side==='short'?'short':'long',tp=finNum(x.tp);
  var t={id:id,market:fut?'futures':'spot',side:side,pair:cleanStr(x.pair,24).toUpperCase()||'?',openedAt:x.openedAt,entry:entry,sl:sl,tp:tp>0?tp:null,size:size,
    riskRp:finNum(x.riskRp),setup:SETUPS.indexOf(x.setup)>-1?x.setup:'Lainnya',note:cleanStr(x.note,600),emosi:EMOS.indexOf(x.emosi)>-1?x.emosi:'Tenang',
    rulesBroken:Array.isArray(x.rulesBroken)?x.rulesBroken.slice(0,20).map(cleanViol).filter(function(v){return v!==null}):[],
    status:x.status==='closed'?'closed':'open',exit:finNum(x.exit),closedAt:isDate(x.closedAt)?x.closedAt:null,closedTs:finNum(x.closedTs),
    pnl:finNum(x.pnl),rMult:finNum(x.rMult),lesson:cleanStr(x.lesson,600),funding:finNum(x.funding),fees:cleanFees(x.fees),createdTs:finNum(x.createdTs)};
  if(t.fees===null)delete t.fees;
  if(fut){
    var lev=finNum(x.lev),mg=finNum(x.margin),lq=finNum(x.liq);
    t.lev=lev!==null&&lev>=1&&lev<=1000?lev:1;t.margin=mg!==null&&mg>0?mg:t.size/t.lev;
    t.liq=lq!==null&&lq>0?lq:liqOf(side,entry,t.lev,feesOf(t.fees).mmr);t.marginMode=x.marginMode==='Cross'?'Cross':'Isolated';
  }else if(x.pxCur==='IDR'||x.pxCur==='USDT')t.pxCur=x.pxCur;
  if(t.riskRp===null||t.riskRp<0)t.riskRp=Math.max(0,-pnlX(t.market,side,entry,sl,size,feesOf(t.fees),0));
  if(t.status==='closed'){
    if(!(t.exit>0)){t.status='open';t.exit=null;t.closedAt=null;t.pnl=null;t.rMult=null}
    else{
      if(!t.closedAt)t.closedAt=t.openedAt;
      if(t.pnl===null)t.pnl=tradePnl(t,t.exit,t.funding||0);
      if(t.rMult===null&&t.riskRp>0)t.rMult=t.pnl/t.riskRp;
    }
  }
  return t;
}
function cleanTrades(a){
  var seen=Object.create(null),out=[];if(!Array.isArray(a))return out;
  a.slice(0,20000).forEach(function(x){var t=cleanTrade(x);if(t&&!seen[t.id]){seen[t.id]=1;out.push(t)}});
  return out;
}

/* ---------- Penyimpanan ---------- */
function loadLocal(){
  try{var raw=localStorage.getItem(LS_KEY);if(raw){var d=JSON.parse(raw);S.settings=cleanSettings(d.settings);S.trades=cleanTrades(d.trades)}}catch(e){}
}
function saveLocal(){try{localStorage.setItem(LS_KEY,JSON.stringify({trades:S.trades,settings:S.settings}))}catch(e){toast(t('ts_ls'))}}
function dbErr(e){
  var c=e&&e.code;
  if(c==='invalid_argument'){S.readOnly=true;toast(t('ts_ro'))}
  else if(c==='quota_exceeded')toast(t('ts_quota'));
  else if(c==='resource_exhausted')toast(t('ts_busy'));
  else toast(t('ts_fail'));
}
function clean(o){var c={};Object.keys(o).forEach(function(k){if(k!=='id'&&o[k]!==undefined)c[k]=o[k]});return c}
function putTrade(tr){
  if(S.mode==='db'){return S.db.collection('trades').doc(tr.id).set(clean(tr)).then(function(){return true},function(e){dbErr(e);return false})}
  loadLocal();var i=S.trades.findIndex(function(x){return x.id===tr.id});if(i>-1)S.trades[i]=tr;else S.trades.push(tr);saveLocal();render();return Promise.resolve(true);
}
function removeTrade(id){
  if(S.mode==='db'){return S.db.collection('trades').doc(id).delete().then(function(){return true},function(e){dbErr(e);return false})}
  loadLocal();S.trades=S.trades.filter(function(x){return x.id!==id});saveLocal();render();return Promise.resolve(true);
}
function putSettings(o){
  o=Object.assign({},o,{lang:S.lang});
  if(S.mode==='db'){return S.db.doc('settings/main').set(o).then(function(){return true},function(e){dbErr(e);return false})}
  loadLocal();S.settings=cleanSettings(o);saveLocal();render();return Promise.resolve(true);
}
// Ganti mata uang akun: semua nominal dikalikan kurs; harga koin tetap.
function convertAll(to,rate,vals){
  if(S.mode!=='db')loadLocal();
  var fac=to==='USDT'?1/rate:rate;
  var ns=Object.assign({},vals,{currency:to,modalAwal:vals.modalAwal*fac});
  var nts=S.trades.map(function(x){
    var n=Object.assign({},x);
    ['size','margin','riskRp','pnl','funding'].forEach(function(k){if(typeof n[k]==='number'&&isFinite(n[k]))n[k]=n[k]*fac});
    if(!isFut(n)&&!n.pxCur)n.pxCur='IDR';
    n.rulesBroken=(n.rulesBroken||[]).map(function(v){return (v&&typeof v==='object'&&v.a&&typeof v.a.m==='number')?{k:v.k,a:Object.assign({},v.a,{m:v.a.m*fac})}:v});
    return n;
  });
  saveKurs(rate);
  if(S.mode==='db'){
    var chain=Promise.resolve(true);
    nts.forEach(function(n){chain=chain.then(function(ok){if(!ok)return false;return S.db.collection('trades').doc(n.id).set(clean(n)).then(function(){return true},function(e){dbErr(e);return false})})});
    return chain.then(function(ok){return ok?putSettings(ns):false});
  }
  S.trades=nts;S.settings=cleanSettings(Object.assign({},ns,{lang:S.lang}));saveLocal();render();return Promise.resolve(true);
}

/* ---------- UI umum ---------- */
var toastTimer;
function toast(msg){var el=$('#toast');el.textContent=msg;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(function(){el.hidden=true},3400)}
function setTab(name){
  S.tab=name;
  ['ringkasan','hitung','jurnal','aturan'].forEach(function(n){$('#tab-'+n).hidden=n!==name;$('#t-'+n).setAttribute('aria-selected',String(n===name))});
  window.scrollTo(0,0);
}
var lastFocus=null;
function openSheet(id){lastFocus=document.activeElement;var el=$('#'+id);el.hidden=false;var f=el.querySelector('input:not([type="radio"]),select,textarea,button:not(.x)');if(f)setTimeout(function(){if(!el.contains(document.activeElement))f.focus()},30)}
function closeSheet(id){$('#'+id).hidden=true;if(lastFocus&&lastFocus.focus)lastFocus.focus()}
function closeAllSheets(){$$('.sheet').forEach(function(s){if(!s.hidden)closeSheet(s.id)})}

/* Catat trade */
function openAdd(pre){
  var p=pre||{};
  setRadio('a-market',p.market||'spot');setRadio('a-side',p.side||'long');
  if(p.lev)setNum('#a-lev',p.lev,1);else $('#a-lev').value='3';$('#a-mm').selectedIndex=0;
  $('#a-pair').value=p.pair||'';$('#a-date').value=ymd(new Date());
  setNum('#a-entry',p.entry||null);setNum('#a-sl',p.sl||null);
  setNum('#a-tp',p.tp||null);setNum('#a-size',p.size?(cur()==='USDT'?Math.floor(p.size*100)/100:Math.floor(p.size)):null,cur()==='USDT'?2:0);
  $('#a-note').value='';$('#a-setup').selectedIndex=0;$('#emo-1').checked=true;$('#add-err').hidden=true;
  applyMarketUI('a');updateAddPreview();openSheet('sheet-add');
}
function addValues(){
  var f=feesOf(null),m=radio('a-market')||'spot',side=m==='futures'?(radio('a-side')||'long'):'long';
  var v={market:m,side:side,pair:$('#a-pair').value.trim().toUpperCase(),date:$('#a-date').value,entry:numOf('#a-entry'),sl:numOf('#a-sl'),tp:numOf('#a-tp'),size:numOf('#a-size'),
    lev:m==='futures'?numOf('#a-lev'):1,marginMode:m==='futures'?$('#a-mm').value:null,setup:$('#a-setup').value,note:$('#a-note').value.trim(),emosi:radio('a-emosi')||'Tenang'};
  v.slOk=v.entry>0&&v.sl>0&&(side==='short'?v.sl>v.entry:v.sl<v.entry);
  v.ok=v.slOk&&v.size>0&&(m!=='futures'||v.lev>=1);
  if(v.ok){
    v.d=slDist(side,v.entry,v.sl);v.risk=-pnlX(m,side,v.entry,v.sl,v.size,f,0);
    if(v.tp>0&&(side==='short'?v.tp<v.entry:v.tp>v.entry))v.rr=pnlX(m,side,v.entry,v.tp,v.size,f,0)/v.risk;
    if(m==='futures'){v.margin=v.size/v.lev;v.liq=liqOf(side,v.entry,v.lev,f.mmr);v.liqD=1/v.lev-f.mmr}
  }
  return v;
}
function violations(v){
  var s=S.settings,st=stats(),out=[],sts=statusOf(st);
  if(sts.lvl==='bad')out.push({k:'status',a:{l:sts.key}});
  if(st.tradesToday>=s.maxTrades)out.push({k:'trades',a:{n:s.maxTrades}});
  if(st.open.length>=s.maxOpen)out.push({k:'open',a:{n:s.maxOpen}});
  if(v.risk>st.R*1.05)out.push({k:'risk',a:{r:v.risk/st.R}});
  if(v.market==='futures'){
    if(v.lev>s.maxLev)out.push({k:'lev',a:{x:v.lev,max:s.maxLev}});
    if(v.liqD<LIQ_MULT*v.d)out.push({k:'liq',a:{}});
    if(v.margin>st.maxMargin*1.01)out.push({k:'margin',a:{m:st.maxMargin}});
    if(st.openMargin+v.margin>st.futCap*1.01)out.push({k:'futcap',a:{}});
    if(v.marginMode==='Cross')out.push({k:'cross',a:{}});
  }else if(v.size>st.maxPos*1.01)out.push({k:'size',a:{p:s.maxPosPct}});
  if(!(v.tp>0))out.push({k:'notp',a:{}});
  else if(v.rr!=null&&v.rr<s.minRR)out.push({k:'rr',a:{rr:v.rr,min:s.minRR}});
  if(v.emosi==='FOMO'||v.emosi==='Balas dendam')out.push({k:'emo',a:{e:v.emosi}});
  return out;
}
function updateAddPreview(){
  var v=addValues(),el=$('#add-preview');
  if(!v.ok){el.innerHTML='<span class="muted">'+esc(v.market==='futures'?t('ap_fut',{dir:v.side==='short'?t('ap_above'):t('ap_below')}):t('ap_spot'))+'</span>';return}
  var st=stats(),viol=violations(v).map(violText);
  var fut=v.market==='futures'?'<span>'+esc(t('ap_fut_l',{m:money(v.margin),liq:fmtNum(v.liq,v.liq<1?8:2),p:pct(v.liqD*100)}))+'</span>':'';
  el.innerHTML='<span>'+esc(t('ap_risk',{m:money(v.risk),r:fmtNum(st.R?v.risk/st.R:0,2)})+(v.rr!=null?t('ap_rr',{x:'1:'+fmtNum(v.rr,2)}):''))+'</span>'+fut+
    (viol.length?'<span class="down">'+esc(t('ap_viol',{v:viol.join(' · ')}))+'</span>':'<span class="up">'+esc(t('ap_ok'))+'</span>');
}
function submitAdd(e){
  e.preventDefault();var v=addValues(),err=$('#add-err');
  function fail(k){err.textContent=t(k);err.hidden=false}
  if(!v.pair)return fail('ae_pair');
  if(!(v.entry>0)||!(v.sl>0))return fail('ae_px');
  if(!v.slOk)return fail(v.side==='short'?'e_short_sl':'ae_sl_long');
  if(!(v.size>0))return fail(v.market==='futures'?'ae_size_f':'ae_size_s');
  if(v.market==='futures'&&!(v.lev>=1))return fail('ae_lev');
  if(!v.date)return fail('ae_date');
  var s=S.settings;
  var tr={id:newId(),market:v.market,side:v.side,pair:v.pair,openedAt:v.date,entry:v.entry,sl:v.sl,tp:v.tp>0?v.tp:null,size:v.size,riskRp:v.risk,setup:v.setup,note:v.note,emosi:v.emosi,
    rulesBroken:violations(v),status:'open',exit:null,closedAt:null,closedTs:null,pnl:null,rMult:null,lesson:'',funding:null,
    fees:{feeBuy:s.feeBuy,feeSell:s.feeSell,tax:s.tax,futFee:s.futFee,futTax:s.futTax,mmr:s.mmr},createdTs:Date.now()};
  if(v.market==='futures'){tr.lev=v.lev;tr.margin=v.margin;tr.liq=v.liq;tr.marginMode=v.marginMode}else tr.pxCur=cur();
  putTrade(tr).then(function(ok){if(ok){closeSheet('sheet-add');setTab('jurnal');toast(t(tr.market==='futures'?'ts_saved_f':'ts_saved',{pair:tr.pair}))}});
}

/* Tutup posisi */
function findTrade(id){return S.trades.filter(function(x){return x.id===id})[0]}
function openClose(id){
  var tr=findTrade(id);if(!tr)return;S.closingId=id;var fut=isFut(tr);
  $('#close-info').textContent=(fut?t('ci_fut',{pair:tr.pair,side:tr.side==='short'?'Short':'Long',l:fmtNum(tr.lev,1),e:px(tr,tr.entry),m:money(tr.size)}):t('ci_spot',{pair:tr.pair,e:px(tr,tr.entry),m:money(tr.size)}))+t('ci_sl',{p:px(tr,tr.sl)})+(tr.tp?t('ci_tp',{p:px(tr,tr.tp)}):'');
  $('#k-exit').value='';$('#k-date').value=ymd(new Date());$('#k-lesson').value='';$('#k-funding').value='';$('#close-err').hidden=true;
  applyMarketUI('k');updateClosePreview();openSheet('sheet-close');
}
function closeFunding(tr){if(!isFut(tr))return 0;var f=numOf('#k-funding');return isFinite(f)?f:0}
function updateClosePreview(){
  var tr=findTrade(S.closingId),el=$('#close-preview');if(!tr)return;
  var ex=numOf('#k-exit');
  if(!(ex>0)){el.innerHTML='<span class="muted">'+esc(t(isFut(tr)?'cp_need_f':'cp_need_s'))+'</span>';return}
  var p=tradePnl(tr,ex,closeFunding(tr)),r=tr.riskRp>0?p/tr.riskRp:0;
  el.innerHTML='<span>'+t('cp_res',{m:'<b class="num '+(p>0?'up':p<0?'down':'')+'">'+esc(moneyS(p))+'</b>',r:'<b class="num">'+esc(rMul(r))+'</b>'})+'</span><span class="muted">'+esc(t(isFut(tr)?'cp_note_f':'cp_note_s'))+'</span>';
}
function submitClose(e){
  e.preventDefault();var tr=findTrade(S.closingId),err=$('#close-err');if(!tr)return;
  var ex=numOf('#k-exit'),dt=$('#k-date').value;
  if(!(ex>0)){err.textContent=t(isFut(tr)?'ce_exit_f':'ce_exit_s');err.hidden=false;return}
  if(!dt){err.textContent=t('ae_date');err.hidden=false;return}
  if(dt<tr.openedAt){err.textContent=t('ce_date');err.hidden=false;return}
  var fund=closeFunding(tr),p=tradePnl(tr,ex,fund);
  var n=Object.assign({},tr,{status:'closed',exit:ex,closedAt:dt,closedTs:Date.now(),pnl:p,rMult:tr.riskRp>0?p/tr.riskRp:null,lesson:$('#k-lesson').value.trim(),funding:isFut(tr)?fund:null});
  putTrade(n).then(function(ok){if(ok){closeSheet('sheet-close');toast(t('ts_closed',{pair:n.pair,m:moneyS(p)}))}});
}

/* Ganti mata uang */
function openCur(to,vals){
  S.pendingCur={to:to,vals:vals};
  $('#cur-desc').textContent=t('cur_d',{a:cur(),b:to});
  var kn=readKurs();setNum('#cur-rate',kn>0?kn:null);
  $('#cur-err').hidden=true;updateCurPreview();openSheet('sheet-cur');
}
function updateCurPreview(){
  var pc=S.pendingCur,el=$('#cur-prev');if(!pc)return;
  var r=numOf('#cur-rate');
  if(!(r>0)){el.innerHTML='<span class="muted">'+esc(t('cur_err'))+'</span>';return}
  var fac=pc.to==='USDT'?1/r:r;
  el.innerHTML='<span class="num">'+esc(t('cur_prev',{a:money(pc.vals.modalAwal,cur()),b:money(pc.vals.modalAwal*fac,pc.to)}))+'</span>';
}

/* ---------- Event ---------- */
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-lang]');if(b){setLang(b.getAttribute('data-lang'),true);return}
  b=e.target.closest('[data-tab]');if(b){setTab(b.getAttribute('data-tab'));return}
  b=e.target.closest('[data-go]');if(b){setTab(b.getAttribute('data-go'));return}
  if(e.target.closest('#btn-add')){openAdd();return}
  if(e.target.closest('#calc-to-add')){var c=calcValues();if(!c.err&&c.size>0)openAdd({market:c.m,side:c.side,lev:c.lev,pair:$('#c-pair').value.trim().toUpperCase(),entry:c.entry,sl:c.sl,tp:c.tp,size:c.size});return}
  b=e.target.closest('[data-close-trade]');if(b){openClose(b.getAttribute('data-close-trade'));return}
  b=e.target.closest('[data-del]');if(b){var tr=findTrade(b.getAttribute('data-del'));if(tr){S.deletingId=tr.id;$('#del-info').textContent=t('del_info',{pair:tr.pair,d:fmtDate(tr.openedAt),s:tr.status==='closed'?moneyS(tr.pnl):t('still_open')});openSheet('sheet-confirm')}return}
  if(e.target.closest('#del-yes')){removeTrade(S.deletingId).then(function(ok){if(ok){closeSheet('sheet-confirm');toast(t('ts_deleted'))}});return}
  if(e.target.closest('[data-close]')){var sh=e.target.closest('.sheet');if(sh)closeSheet(sh.id);return}
  if(e.target.classList&&e.target.classList.contains('sheet')){closeSheet(e.target.id);return}
  if(e.target.closest('#set-reset')){S.setDirty=false;putSettings(Object.assign({},DEFAULTS,{currency:cur(),modalAwal:S.settings.modalAwal})).then(function(ok){if(ok){fillSettings();toast(t('ts_reset'))}});return}
  if(e.target.closest('#btn-csv')){exportCSV();return}
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAllSheets()});
document.addEventListener('toggle',function(e){var d=e.target;if(d.classList&&d.classList.contains('trade')){if(d.open)S.openIds[d.dataset.id]=1;else delete S.openIds[d.dataset.id]}},true);
document.addEventListener('focusout',function(e){var el=e.target;if(el.classList&&el.classList.contains('numfmt')){var n=numOf(el);if(isFinite(n)&&el.value.trim()!=='')setNum(el,n)}});
$('#calc-form').addEventListener('input',function(e){
  if(e.target.id==='c-risk')S.calcRiskTouched=true;
  if(e.target.id==='c-kurs')saveKurs(numOf(e.target));
  if(e.target.name==='c-market')applyMarketUI('c');
  if(e.target.type!=='radio')$('#c-example').hidden=true;
  renderCalc();
});
$('#calc-form').addEventListener('submit',function(e){e.preventDefault()});
$('#add-form').addEventListener('input',function(e){if(e.target.name==='a-market')applyMarketUI('a');updateAddPreview()});
$('#add-form').addEventListener('change',updateAddPreview);
$('#add-form').addEventListener('submit',submitAdd);
$('#close-form').addEventListener('input',updateClosePreview);
$('#close-form').addEventListener('submit',submitClose);
$('#cur-form').addEventListener('input',updateCurPreview);
$('#cur-form').addEventListener('submit',function(e){
  e.preventDefault();var pc=S.pendingCur,r=numOf('#cur-rate'),err=$('#cur-err');if(!pc)return;
  if(!(r>0)){err.textContent=t('cur_err');err.hidden=false;return}
  convertAll(pc.to,r,pc.vals).then(function(ok){if(ok){S.setDirty=false;S.pendingCur=null;closeSheet('sheet-cur');fillSettings();render();toast(t('ts_cur',{c:pc.to}))}});
});
$('#set-form').addEventListener('input',function(){S.setDirty=true;$('#set-err').hidden=true});
$('#set-form').addEventListener('change',function(){S.setDirty=true});
$('#set-form').addEventListener('submit',function(e){
  e.preventDefault();var r=readSettings(),err=$('#set-err');
  if(r.err){err.textContent=r.err;err.hidden=false;return}
  var to=$('#s-cur').value==='USDT'?'USDT':'IDR',vals=Object.assign({},S.settings,r.val,{currency:cur()});
  if(to!==cur()){openCur(to,vals);return}
  putSettings(vals).then(function(ok){if(ok){S.setDirty=false;S.calcRiskTouched=false;toast(t('ts_set'))}});
});

function exportCSV(){
  var en=S.lang==='en',c=cur(),dp=c==='USDT'?2:0;
  var cols=en?['entry_date','pair','market','side','leverage','margin_mode','status','entry_price','stop_loss','target','position_size','margin','est_liquidation','risk','setup','reason','emotion','rules_broken','exit_date','exit_price','funding','net_pnl','r_multiple','lesson','currency']
    :['tanggal_masuk','pair','pasar','arah','leverage','mode_margin','status','harga_masuk','stop_loss','target','nilai_posisi','margin','est_likuidasi','risiko','setup','alasan','perasaan','aturan_dilanggar','tanggal_keluar','harga_keluar','funding','pnl_bersih','r_multiple','pelajaran','mata_uang'];
  function q(v){v=v==null?'':String(v);return /[",\n\r]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
  function csvCell(v){if(typeof v==='number')return q(v);var s=v==null?'':String(v);if(/^[=+\-@\t\r]/.test(s)&&!/^-?\d+(\.\d+)?$/.test(s))s="'"+s;return q(s)}
  function amt(v){return v==null||!isFinite(v)?'':(+v).toFixed(dp)}
  var rows=S.trades.slice().sort(function(a,b){return (a.openedAt||'').localeCompare(b.openedAt||'')}).map(function(tr){
    var fut=isFut(tr);
    return [tr.openedAt,tr.pair,fut?'futures':'spot',tr.side||'long',fut?tr.lev:'',fut?tr.marginMode:'',tr.status==='closed'?(en?'closed':'ditutup'):(en?'open':'terbuka'),tr.entry,tr.sl,tr.tp,amt(tr.size),fut?amt(tr.margin):'',fut?tr.liq:'',amt(tr.riskRp),trSetup(tr.setup),tr.note,trEmo(tr.emosi),(tr.rulesBroken||[]).map(violText).join('; '),tr.closedAt,tr.exit,fut?amt(tr.funding):'',amt(tr.pnl),tr.rMult==null?'':tr.rMult.toFixed(2),tr.lesson,c].map(csvCell).join(',');
  });
  var data='﻿'+cols.join(',')+'\n'+rows.join('\n');
  downloadFile((en?'crypto-journal-':'jurnal-kripto-')+ymd(new Date())+'.csv',data,'text/csv;charset=utf-8');toast(t('ts_csv'));
}
function downloadFile(name,data,type){
  var url=URL.createObjectURL(new Blob([data],{type:type})),a=document.createElement('a');
  a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},4000);
}

/* ---------- Cadangan ---------- */
function exportBackup(){
  var data=JSON.stringify({app:'jurnal-kripto-1r',version:1,exportedAt:new Date().toISOString(),settings:Object.assign({},S.settings,{lang:S.lang}),trades:S.trades},null,1);
  downloadFile('cadangan-jurnal-kripto-'+ymd(new Date())+'.json',data,'application/json');
  try{localStorage.setItem(LS_BK,String(Date.now()))}catch(e){}
  renderBackupNote();toast(t('ts_backup'));
}
function readBackup(file){
  if(!file||file.size>5e6){toast(t('ts_imp_bad'));return}
  var r=new FileReader();
  r.onload=function(){
    var d=null;try{d=JSON.parse(r.result)}catch(e){}
    if(!d||d.app!=='jurnal-kripto-1r'||!Array.isArray(d.trades)||!d.settings||typeof d.settings!=='object'){toast(t('ts_imp_bad'));return}
    var ex=typeof d.exportedAt==='string'?d.exportedAt.slice(0,10):'';
    S.pendingRestore={settings:cleanSettings(d.settings),trades:cleanTrades(d.trades)};
    var ps=S.pendingRestore.settings;
    $('#res-info').textContent=t('imp_d',{n:S.pendingRestore.trades.length,m:money(ps.modalAwal,ps.currency),d:isDate(ex)?fmtDate(ex):'—'});
    openSheet('sheet-restore');
  };
  r.onerror=function(){toast(t('ts_imp_bad'))};
  r.readAsText(file);
}
function applyRestore(){
  var d=S.pendingRestore;if(!d)return;
  S.trades=d.trades;S.settings=d.settings;S.pendingRestore=null;S.setDirty=false;
  saveLocal();if(S.settings.lang)setLang(S.settings.lang,false);render();closeSheet('sheet-restore');toast(t('ts_imp'));
}

/* Kurs disimpan sebagai angka mentah agar tidak tergantung format bahasa. */
function saveKurs(n){try{localStorage.setItem(LS_KURS,isFinite(n)&&n>0?String(n):'')}catch(e){}}
function readKurs(){
  var k='';try{k=localStorage.getItem(LS_KURS)||''}catch(e){}
  if(!k)return NaN;
  if(/^\d+(\.\d+)?$/.test(k)&&!/^\d{1,3}(\.\d{3})+$/.test(k))return Number(k);
  var keep=S.lang;S.lang='id';var n=parseNum(k);S.lang=keep;return n;
}

/* ---------- Mulai ---------- */
var startLang='id';try{startLang=localStorage.getItem(LS_LANG)||'id'}catch(e){}
setLang(startLang,false);
(function(){var kn=readKurs();if(kn>0){setNum('#c-kurs',kn);renderCalc()}})();
/* Data pribadi tidak disimpan di file ini (repo GitHub Pages bersifat publik). Data dipindahkan lewat file cadangan. */
(function boot(){
  loadLocal();
  S.mode='local';
  if(S.settings.lang)setLang(S.settings.lang,false);
  render();
  // Minta browser tidak menghapus data saat memori HP penuh.
  if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(function(){});
  window.addEventListener('storage',function(e){
    if(e.key===LS_KEY){loadLocal();if(S.settings.lang&&S.settings.lang!==S.lang)setLang(S.settings.lang,false);else render()}
    else if(e.key===LS_BK)renderBackupNote();
  });
  document.addEventListener('click',function(e){if(e.target.closest('[data-backup]'))exportBackup()});
  if('serviceWorker' in navigator){
    var hadSW=!!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange',function(){if(hadSW)toast(t('ts_update'))});
    window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
  }
  var deferred=null,ib=$('#btn-install');
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;ib.hidden=false});
  window.addEventListener('appinstalled',function(){deferred=null;ib.hidden=true});
  ib.addEventListener('click',function(){if(!deferred)return;deferred.prompt();deferred.userChoice.then(function(){deferred=null;ib.hidden=true},function(){})});
  $('#btn-backup').addEventListener('click',exportBackup);
  document.addEventListener('click',function(e){if(e.target.closest('#btn-restore,[data-restore]')){var f=$('#restore-file');f.value='';f.click()}});
  $('#restore-file').addEventListener('change',function(e){var f=e.target.files&&e.target.files[0];if(f)readBackup(f)});
  $('#res-yes').addEventListener('click',applyRestore);
})();
})();
