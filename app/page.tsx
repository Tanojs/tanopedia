'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Product } from './types';

// 1. DATA PRODUK TOKO
const DATA_PRODUCTS: Product[] = [
  { id: '1', name: 'Alight Motion', category: 'design', desc: 'Premium Editing', price: 39900, originalPrice: 65000, image: 'https://picsum.photos/seed/alightmotion/400/200', isHot: true, isAuto: true, icon: 'fa-layer-group' },
  { id: '2', name: 'CapCut Pro', category: 'design', desc: 'Harga Termurah', price: 29900, originalPrice: 55000, image: 'https://picsum.photos/seed/capcutpro/400/200', isHot: true, isBest: true, icon: 'fa-video' },
  { id: '3', name: 'Spotify Premium', category: 'stream', desc: '1 Bulan · Family', price: 49900, originalPrice: 79000, image: 'https://picsum.photos/seed/spotify/400/200', isAuto: true, icon: 'fa-music' },
  { id: '4', name: 'Netflix Premium', category: 'stream', desc: 'Ultra HD · 4K', price: 69900, originalPrice: 120000, image: 'https://picsum.photos/seed/netflix/400/200', isHot: true, icon: 'fa-film' },
];

// 2. DATA BANNER EMBLA (Disesuaikan ke Tema Ungu Premium Tano Pedia)
const SLIDES = [
  {
    category: "SOURCE CODE",
    title: <>SC <span className="text-[#00e676]">BOT PREMIUM</span></>,
    desc: "Source code premium dengan fitur lengkap, ringan, aman, dan mudah digunakan untuk kebutuhan server harianmu.",
    bg: "https://picsum.photos/seed/banner1/1200/800"
  },
  {
    category: "FLASH SALE",
    title: <>DISKON <span className="text-[#00e676]">50% OFF</span></>,
    desc: "Akses instan aplikasi premium tanpa batas dengan harga distributor termurah khusus minggu ini.",
    bg: "https://picsum.photos/seed/banner2/1200/800"
  },
  {
    category: "DISTRIBUTOR",
    title: <>GARANSI <span className="text-[#00e676]">30 HARI</span></>,
    desc: "Layanan otomatis 24 jam nonstop dengan perlindungan garansi penuh selama satu bulan kalender.",
    bg: "https://picsum.photos/seed/banner3/1200/800"
  }
];

export default function Home() {
  // ---- STATE MANAGEMENT ----
  const [activePage, setActivePage] = useState<'home' | 'history' | 'profile'>('home');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'design' | 'stream'>('all');
  const [invoice, setInvoice] = useState('');
  const [toast, setToast] = useState({ show: false, msg: '', icon: 'fa-check-circle' });
  
  // ---- EMBLA CAROUSEL ENGINE ----
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 45 
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(intervalId);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // ---- TOAST LOGIC ----
  const triggerToast = (msg: string, icon: string = 'fa-check-circle') => {
    setToast({ show: true, msg, icon });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2800);
  };

  // ---- FILTER REAL-TIME ----
  const filteredProducts = DATA_PRODUCTS.filter((p) => {
    const matchCategory = category === 'all' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase().trim());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-[480px] mx-auto px-4 pt-[18px]">
      
      {/* ====== PEMBERITAHUAN TOAST POPUP ====== */}
      <div className={`fixed bottom-[90px] left-1/2 -translate-x-1/2 bg-[#1a1a2e] text-white px-6 py-3 rounded-2xl text-[13px] font-semibold shadow-2xl transition-all duration-350 z-[200] flex items-center gap-2 max-w-[90%] pointer-events-none ${toast.show ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-5 invisible'}`}>
        <i className={`fas ${toast.icon}`}></i>
        <span>{toast.msg}</span>
      </div>

      {/* ==================== 1. HALAMAN UTAMA (HOME) ==================== */}
      {activePage === 'home' && (
        <div>
          {/* HEADER UTAMA */}
          <header className="mb-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#6C3CE1] to-[#a855f7] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(108,60,225,0.3)]">
                  <i className="fas fa-crown text-[20px]"></i>
                </div>
                <div>
                  <h1 className="text-[22px] font-extrabold tracking-[-0.5px] bg-gradient-to-r from-[#6C3CE1] to-[#a855f7] bg-clip-text text-transparent">Tano Pedia</h1>
                  <span className="text-[9px] font-bold text-white bg-gradient-to-r from-[#f43f5e] to-[#e11d48] px-3 py-[2px] rounded-full ml-1 uppercase">Trusted</span>
                </div>
              </div>
              <button onClick={() => triggerToast('Tidak ada notifikasi baru', 'fa-bell')} className="w-10 h-10 rounded-xl bg-[#6c3ce1]/8 text-[#4a4a6a] flex items-center justify-center text-[18px] active:scale-95 transition-all">
                <i className="fas fa-bell"></i>
              </button>
            </div>
            <p className="text-[13px] font-medium text-[#4a4a6a] mt-1 pl-[56px]">
              Akses Apps Premium, Harga <span className="text-[#6C3CE1] font-bold">Bikin Senyum</span>.
            </p>
          </header>

          {/* ====== SEKSI EMBLA CAROUSEL HERO (FLUID & SMOOTH ANIMATION) ====== */}
          <div className="relative w-full rounded-[24px] overflow-hidden mt-2 bg-[#1a1a2e] shadow-[0_8px_30px_rgba(108,60,225,0.15)] border border-white/5">
            <div className="overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex">
                {SLIDES.map((slide, index) => (
                  <div className="flex-[0_0_100%] min-w-0 relative aspect-[16/10.5] flex items-center p-6" key={index}>
                    <img src={slide.bg} className="absolute inset-0 w-full h-full object-cover opacity-90 z-0 scale-100 pointer-events-none" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-1" />

                    <div className="relative z-10 w-full">
                      {/* 1. Badge Kategori */}
                      <div className={`transition-all duration-700 delay-300 ${selectedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="inline-flex items-center gap-1.5 bg-[#00bfa5]/10 border border-[#00bfa5]/30 rounded-lg px-3 py-[3px] mb-2.5">
                          <i className="fas fa-bolt text-[9px] text-[#00e676] drop-shadow-[0_0_5px_#00e676]"></i>
                          <span className="text-[10px] text-[#00e676] font-bold uppercase tracking-widest italic">{slide.category}</span>
                        </div>
                      </div>
                      
                      {/* 2. Judul Slider */}
                      <h3 className={`text-[26px] font-black text-white mb-1 italic tracking-tight uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all duration-700 delay-500 ${selectedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {slide.title}
                      </h3>
                      
                      {/* 3. Teks Deskripsi */}
                      <p className={`text-zinc-200 text-[12px] mb-5 max-w-[80%] italic font-light leading-relaxed line-clamp-2 transition-all duration-700 delay-700 ${selectedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {slide.desc}
                      </p>
                      
                      {/* 4. Tombol Aksi */}
                      <div className={`transition-all duration-700 delay-1000 ${selectedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <button 
                          onClick={() => triggerToast(`Membuka promo: ${slide.category}`, 'fa-layer-group')}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00bfa5] to-[#00e676] text-[#1a1a2e] px-5 py-2 rounded-xl font-extrabold text-[12px] tracking-wide shadow-[0_4px_15px_rgba(0,191,165,0.4)] active:scale-95 transition-all border-none cursor-pointer"
                        >
                          LIHAT <i className="fas fa-chevron-right text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- FLUID CAPSULE PAGINATION DOTS --- */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className="border-none p-0 cursor-pointer h-[6px] rounded-full transition-all duration-300 focus:outline-none"
                  style={{
                    width: selectedIndex === index ? "22px" : "6px",
                    backgroundColor: selectedIndex === index ? "#00e676" : "rgba(255, 255, 255, 0.4)",
                    boxShadow: selectedIndex === index ? "0 0 10px rgba(0,230,118,0.6)" : "none"
                  }}
                />
              ))}
            </div>
          </div>

          {/* --- AREA STATISTIK TOKO (3 KOLOM PREMIUM) --- */}
          <div className="grid grid-cols-3 gap-2 mt-[12px]">
            <div className="bg-white rounded-xl py-2.5 text-center flex flex-col items-center justify-center min-h-[64px] shadow-[0_4px_14px_rgba(108,60,225,0.04)] border border-[#6c3ce1]/5">
              <i className="fas fa-users text-[#6C3CE1] text-[15px] mb-0.5"></i>
              <div className="text-[16px] font-black text-[#1a1a2e] leading-none italic">5000+</div>
              <div className="text-[8px] text-[#8a8aa8] font-bold uppercase mt-1 tracking-wide">Pengguna</div>
            </div>
            <div className="bg-white rounded-xl py-2.5 text-center flex flex-col items-center justify-center min-h-[64px] shadow-[0_4px_14px_rgba(108,60,225,0.04)] border border-[#6c3ce1]/5">
              <i className="fas fa-bolt text-[#f59e0b] text-[15px] mb-0.5"></i>
              <div className="text-[16px] font-black text-[#1a1a2e] leading-none italic">99.9%</div>
              <div className="text-[8px] text-[#8a8aa8] font-bold uppercase mt-1 tracking-wide">Uptime</div>
            </div>
            <div className="bg-white rounded-xl py-2.5 text-center flex flex-col items-center justify-center min-h-[64px] shadow-[0_4px_14px_rgba(108,60,225,0.04)] border border-[#6c3ce1]/5">
              <i className="fas fa-shield-alt text-[#10b981] text-[15px] mb-0.5"></i>
              <div className="text-[16px] font-black text-[#1a1a2e] leading-none italic">24/7</div>
              <div className="text-[8px] text-[#8a8aa8] font-bold uppercase mt-1 tracking-wide">Support</div>
            </div>
          </div>

          {/* SEARCH BAR & CEK INVOICE */}
          <div className="bg-white rounded-[20px] p-[16px_18px] mt-3.5 shadow-[0_8px_28px_rgba(108,60,225,0.1)] border border-[#6c3ce1]/5 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 bg-[#f3f0fa] rounded-xl px-3.5 border-2 border-transparent focus-within:border-[#6C3CE1] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(108,60,225,0.08)] transition-all">
              <i className="fas fa-search text-gray-400 text-[15px]"></i>
              <input 
                type="text" 
                placeholder="Cari layanan (cth: Spotify)..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border-none outline-none py-3 text-sm font-medium text-[#1a1a2e]"
              />
              {search && <button onClick={() => setSearch('')} className="text-gray-400 text-xs"><i className="fas fa-times-circle"></i></button>}
            </div>
            <div className="flex items-center gap-2.5 bg-[#f3f0fa] rounded-xl px-3.5 border-2 border-transparent focus-within:border-[#6C3CE1] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(108,60,225,0.08)] transition-all">
              <i className="fas fa-receipt text-gray-400 text-[15px]"></i>
              <input 
                type="text" 
                placeholder="ID Invoice..." 
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
                className="flex-1 border-none outline-none py-3 text-sm font-medium text-[#1a1a2e]"
              />
              <button 
                onClick={() => {
                  if(!invoice.trim()) return triggerToast('Masukkan ID Invoice terlebih dahulu', 'fa-exclamation-circle');
                  triggerToast(`Invoice #${invoice} sedang diproses`, 'fa-receipt');
                  setInvoice('');
                }}
                className="bg-gradient-to-r from-[#6C3CE1] to-[#a855f7] text-white font-bold text-[13px] px-5 py-2 rounded-xl shadow-[0_4px_14px_rgba(108,60,225,0.3)] active:scale-95 transition-all whitespace-nowrap"
              >
                Cek
              </button>
            </div>
          </div>

          {/* MENU KATEGORI TABS */}
          <div className="flex gap-2 mt-5 overflow-x-auto pb-[10px] no-scrollbar">
            <button onClick={() => { setCategory('all'); triggerToast('Menampilkan: Semua', 'fa-filter'); }} className={`shrink-0 px-5 py-2.5 rounded-full text-[13px] font-semibold border border-[#6c3ce1]/5 transition-all cursor-pointer ${category === 'all' ? 'bg-gradient-to-r from-[#6C3CE1] to-[#a855f7] text-white shadow-[0_4px_18px_rgba(108,60,225,0.35)] border-transparent' : 'bg-white text-[#4a4a6a]'}`}><i className="fas fa-th-large mr-1.5"></i> Semua</button>
            <button onClick={() => { setCategory('design'); triggerToast('Menampilkan: Design & Edit', 'fa-filter'); }} className={`shrink-0 px-5 py-2.5 rounded-full text-[13px] font-semibold border border-[#6c3ce1]/5 transition-all cursor-pointer ${category === 'design' ? 'bg-gradient-to-r from-[#6C3CE1] to-[#a855f7] text-white shadow-[0_4px_18px_rgba(108,60,225,0.35)] border-transparent' : 'bg-white text-[#4a4a6a]'}`}><i className="fas fa-pen-fancy mr-1.5"></i> Design & Edit</button>
            <button onClick={() => { setCategory('stream'); triggerToast('Menampilkan: Stream & Media', 'fa-filter'); }} className={`shrink-0 px-5 py-2.5 rounded-full text-[13px] font-semibold border border-[#6c3ce1]/5 transition-all cursor-pointer ${category === 'stream' ? 'bg-gradient-to-r from-[#6C3CE1] to-[#a855f7] text-white shadow-[0_4px_18px_rgba(108,60,225,0.35)] border-transparent' : 'bg-white text-[#4a4a6a]'}`}><i className="fas fa-play-circle mr-1.5"></i> Stream & Media</button>
          </div>

          {/* TAMPILAN GRID PRODUK */}
          <div className="grid grid-cols-2 gap-3.5 mt-2">
            {filteredProducts.map((p) => (
              <div key={p.id} onClick={() => triggerToast(`Detail produk: ${p.name}`, 'fa-info-circle')} className="bg-white rounded-[20px] p-[14px_14px_18px] shadow-[0_8px_28px_rgba(108,60,225,0.1)] border border-[#6c3ce1]/5 relative flex flex-col cursor-pointer hover:-translate-y-1 active:scale-[0.97] transition-all group">
                <div className="w-full h-[110px] rounded-[14px] overflow-hidden bg-[#eae6f5] mb-2.5 shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                </div>
                <div className="flex flex-wrap gap-[6px] mb-2">
                  {p.isHot && <span className="text-[9px] font-bold bg-gradient-to-r from-[#f43f5e] to-[#e11d48] text-white px-2.5 py-[3px] rounded-full"><i className="fas fa-fire mr-0.5"></i> HOT</span>}
                  {p.isAuto && <span className="text-[9px] font-bold bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] text-white px-2.5 py-[3px] rounded-full"><i className="fas fa-rotate mr-0.5"></i> AUTO</span>}
                  {p.isBest && <span className="text-[9px] font-bold bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-2.5 py-[3px] rounded-full"><i className="fas fa-star mr-0.5"></i> BEST</span>}
                </div>
                <span className="text-[10px] font-bold text-[#6C3CE1] bg-[#6c3ce1]/8 px-3 py-[2px] rounded-xl self-start mb-1.5 uppercase tracking-[0.6px]">
                  {p.category === 'design' ? '🎨 DESAIN' : '🎥 STREAM'}
                </span>
                <h2 className="text-[16px] font-bold leading-[1.2]">{p.name}</h2>
                <p className="text-[12px] text-[#8a8aa8] font-medium mt-0.5">{p.desc}</p>
                
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#6c3ce1]/6">
                  <span className="text-[14px] font-bold text-[#6C3CE1]">
                    Rp{p.price.toLocaleString('id-ID')}
                    <small className="block text-[10px] text-[#8a8aa8] font-medium line-through mt-0.5">Rp{p.originalPrice.toLocaleString('id-ID')}</small>
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); triggerToast(`✅ ${p.name} berhasil ditambahkan ke keranjang!`, 'fa-shopping-cart'); }} 
                    className="bg-gradient-to-r from-[#6C3CE1] to-[#a855f7] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-[0_2px_10px_rgba(108,60,225,0.25)] active:scale-95 transition-all"
                  >
                    Beli
                  </button>
                </div>
                <div className="absolute top-3.5 right-3.5 text-[28px] opacity-8 text-[#6C3CE1] pointer-events-none">
                  <i className={`fas ${p.icon}`}></i>
                </div>
              </div>
            ))}
          </div>

          {/* KOMPONEN AKTIVITAS TERBARU RE-SELLER */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[16px] font-bold"><i className="fas fa-clock text-[#6C3CE1] mr-1.5"></i> Aktivitas Terbaru</h3>
              <button onClick={() => { setActivePage('history'); triggerToast('Lihat semua riwayat aktivitas', 'fa-history'); }} className="text-[12px] font-semibold text-[#6C3CE1]">Lihat Semua →</button>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="bg-white rounded-2xl p-[14px_16px] shadow-[0_8px_28px_rgba(108,60,225,0.1)] border border-[#6c3ce1]/4 flex items-center gap-3.5 hover:translate-x-1 transition-all">
                <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#6C3CE1] to-[#a855f7] flex items-center justify-center text-white font-bold text-[16px] shrink-0 shadow-[0_2px_10px_rgba(108,60,225,0.2)]">D</div>
                <div className="flex-1 min-w-0 text-[13px]">
                  <div className="font-semibold text-[14px]">Dinda <span className="text-[9px] font-bold bg-[#6c3ce1]/10 text-[#6C3CE1] px-2 py-[1px] rounded-lg ml-1.5">VIP</span></div>
                  <div className="text-[#4a4a6a]"><strong>Membeli</strong> AM Exp Mei 2027</div>
                  <div className="text-[11px] text-[#8a8aa8] mt-0.5"><i className="far fa-clock mr-1"></i> 2 jam lalu</div>
                </div>
                <span className="text-[10px] font-bold uppercase text-[#10b981] bg-[#10b981]/10 px-3 py-[3px] rounded-full shrink-0"><i className="fas fa-check-circle mr-1"></i> Sukses</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 2. HALAMAN HISTORY TRANSAKSI ==================== */}
      {activePage === 'history' && (
        <div className="text-center p-[40px_16px_20px]">
          <div className="text-[64px] text-[#8b6bf0] opacity-30 mb-4"><i className="fas fa-history"></i></div>
          <h2 className="text-[20px] font-bold mb-[6px]">Riwayat Transaksi</h2>
          <p className="text-[#8a8aa8] text-[14px] font-medium">Semua pembelianmu akan muncul di sini.</p>
          
          <div className="mt-5 flex flex-col gap-3 text-left">
            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_28px_rgba(108,60,225,0.1)] border-l-4 border-[#6C3CE1]">
              <div className="flex justify-between font-semibold text-[14px]">
                <span>Alight Motion</span>
                <span className="text-[#6C3CE1]">Rp39.900</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#8a8aa8] mt-1.5 items-center">
                <span><i className="far fa-calendar-alt mr-1"></i> 22 Jun 2026 · 14:30</span>
                <span className="text-[10px] font-bold px-3 py-[2px] rounded-[10px] text-[#10b981] bg-[#10b981]/10">Selesai</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. HALAMAN USER PROFILE ==================== */}
      {activePage === 'profile' && (
        <div className="text-center p-[40px_16px_20px]">
          <div className="text-[64px] text-[#8b6bf0] opacity-30 mb-4"><i className="fas fa-user-circle"></i></div>
          <h2 className="text-[20px] font-bold mb-[6px]">Profil Saya</h2>
          <p className="text-[#8a8aa8] text-[14px] font-medium">Kelola akun dan preferensimu di sini.</p>
          
          <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_28px_rgba(108,60,225,0.1)] mt-5 max-w-[300px] mx-auto">
            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#6C3CE1] to-[#a855f7] flex items-center justify-center text-white text-[28px] font-bold mx-auto mb-3 shadow-[0_4px_16px_rgba(108,60,225,0.25)]">T</div>
            <h3 className="text-[18px] font-bold">Pelanggan Tano Pedia</h3>
            <p className="text-[14px] text-[#8a8aa8] mt-1">user@tanopedia.com</p>
            <button onClick={() => triggerToast('Fitur edit profil segera hadir!', 'fa-info-circle')} className="mt-4 bg-gradient-to-r from-[#6C3CE1] to-[#a855f7] text-white font-bold text-[13px] px-5 py-2.5 rounded-xl shadow-md w-full active:scale-95 transition-all">Edit Profil</button>
          </div>
        </div>
      )}

      {/* ====== BOTTOM NAVIGATION TABS ====== */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/88 backdrop-blur-[16px] border-t border-[#6c3ce1]/6 flex justify-around items-center h-[70px] pb-2 shadow-[0_-4px_20px_rgba(108,60,225,0.06)] z-[100] rounded-t-[24px]">
        <button onClick={() => setActivePage('home')} className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl min-w-[64px] relative active:scale-[0.92] transition-all cursor-pointer ${activePage === 'home' ? 'text-[#6C3CE1] font-bold' : 'text-[#8a8aa8]'}`}>
          <i className="fas fa-home text-[22px] transition-all"></i>
          <span className="text-[10px] font-semibold transition-all">Home</span>
          {activePage === 'home' && <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-gradient-to-r from-[#6C3CE1] to-[#a855f7]" />}
        </button>
        <button onClick={() => { setActivePage('history'); triggerToast('Menampilkan riwayat transaksi', 'fa-clock-rotate-left'); }} className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl min-w-[64px] relative active:scale-[0.92] transition-all cursor-pointer ${activePage === 'history' ? 'text-[#6C3CE1] font-bold' : 'text-[#8a8aa8]'}`}>
          <i className="fas fa-clock-rotate-left text-[22px] transition-all"></i>
          <span className="text-[10px] font-semibold transition-all">History</span>
          {activePage === 'history' && <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-gradient-to-r from-[#6C3CE1] to-[#a855f7]" />}
        </button>
        <button onClick={() => { setActivePage('profile'); triggerToast('Profil Anda', 'fa-user'); }} className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl min-w-[64px] relative active:scale-[0.92] transition-all cursor-pointer ${activePage === 'profile' ? 'text-[#6C3CE1] font-bold' : 'text-[#8a8aa8]'}`}>
          <i className="fas fa-user text-[22px] transition-all"></i>
          <span className="text-[10px] font-semibold transition-all">Profile</span>
          {activePage === 'profile' && <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-gradient-to-r from-[#6C3CE1] to-[#a855f7]" />}
        </button>
      </nav>

    </div>
  );
}
    