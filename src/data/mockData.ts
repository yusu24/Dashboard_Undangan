import { TemplateTheme, PricingPlan, FeatureItem, Testimonial, WishComment, HeroConfig, Order, UserAccount, FaqItem, UserInvitation } from '../types';

export const INITIAL_USER_INVITATIONS: UserInvitation[] = [
  {
    id: 'inv-1',
    userId: 'usr-2',
    slug: 'rian-anindya',
    templateId: 'ethereal-garden',
    templateName: 'The Ethereal Garden',
    templateImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    title: 'The Wedding of Rian & Anindya',
    status: 'Aktif',
    viewsCount: 428,
    createdAt: '28 Juli 2026',
    eventDetails: {
      groomName: 'Rian Pratama, S.T.',
      groomParents: 'Putra Pertama Bpk. H. Bambang & Ibu Hj. Ratna',
      brideName: 'Anindya Larasati, S.Ked.',
      brideParents: 'Putri Kedua Bpk. Dr. Suroso & Ibu Dwi Hastuti',
      date: 'Sabtu, 24 Oktober 2026',
      time: '08:00 - 10:00 WIB',
      locationName: 'Masjid Agung Trans Studio',
      locationAddress: 'Jl. Gatot Subroto No. 289, Bandung',
      mapsUrl: 'https://maps.google.com',
      receptionDate: 'Sabtu, 24 Oktober 2026',
      receptionTime: '11:00 - 15:00 WIB',
      receptionLocation: 'Grand Ballroom Trans Luxury Hotel Bandung'
    },
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800'
    ],
    musicTitle: 'Acoustic Piano - A Thousand Years',
    loveStory: [
      { year: '2022', title: 'Pertemuan Pertama', story: 'Berjumpa pertama kali saat kegiatan bakti sosial di Kampus ITB Bandung.' },
      { year: '2024', title: 'Momen Lamaran', story: 'Rian melamar Anindya di tepi Danau Toba disaksikan keluarga dekat.' },
      { year: '2026', title: 'Menuju Pelaminan', story: 'Memutuskan untuk mengikat janji suci pernikahan abadi.' }
    ],
    bankAccounts: [
      { bankName: 'BCA', accountNumber: '8830192811', accountHolder: 'Rian Pratama' },
      { bankName: 'Bank Mandiri', accountNumber: '1310088990011', accountHolder: 'Anindya Larasati' }
    ],
    guestList: [
      { id: 'g-1', name: 'Bpk. Ahmad Suherman', phone: '08123456789', category: 'Keluarga Besar', statusSent: true },
      { id: 'g-2', name: 'Ibu Dewi Sartika', phone: '08198765432', category: 'Teman Kantor', statusSent: true },
      { id: 'g-3', name: 'Dimas Kurnia & Partner', phone: '08571122334', category: 'Alumni ITB', statusSent: false }
    ],
    rsvps: [
      { id: 'r-1', name: 'Ahmad Suherman', attendance: 'Hadir', pax: 2, message: 'Selamat untuk Rian & Anindya! Semoga menjadi keluarga sakinah mawaddah warahmah.', date: '28 Juli 2026' },
      { id: 'r-2', name: 'Dewi Sartika', attendance: 'Hadir', pax: 1, message: 'Selamat ya Anin manis! Maaf datang pas resepsi yaa.', date: '28 Juli 2026' },
      { id: 'r-3', name: 'Dimas Kurnia', attendance: 'Ragu-ragu', pax: 1, message: 'Semoga lancar acaranya Bro Rian!', date: '29 Juli 2026' }
    ]
  },
  {
    id: 'inv-2',
    userId: 'usr-2',
    slug: 'kayla-sweet17',
    templateId: 'sweet-sixteen',
    templateName: 'Pastel Dream Birthday',
    templateImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
    title: 'Kayla Sweet 17th Birthday Celebration',
    status: 'Aktif',
    viewsCount: 189,
    createdAt: '29 Juli 2026',
    eventDetails: {
      groomName: 'Kayla Zhafira',
      groomParents: 'Putri kesayangan Bpk. Hendra & Ibu Maya',
      brideName: '',
      brideParents: '',
      date: 'Minggu, 20 September 2026',
      time: '15:00 - 18:00 WIB',
      locationName: 'The Garden Café & Lounge',
      locationAddress: 'Jl. Senopati No. 45, Jakarta Selatan',
      mapsUrl: 'https://maps.google.com',
      receptionDate: 'Minggu, 20 September 2026',
      receptionTime: '15:00 - 18:00 WIB',
      receptionLocation: 'The Garden Café & Lounge'
    },
    gallery: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800'
    ],
    musicTitle: 'Upbeat Birthday Party Pop',
    loveStory: [],
    bankAccounts: [
      { bankName: 'Gopay / ShopeePay', accountNumber: '085711223344', accountHolder: 'Kayla Zhafira' }
    ],
    guestList: [
      { id: 'g-101', name: 'Siti & Geng SMA', phone: '0812998877', category: 'Sahabat SMA', statusSent: true }
    ],
    rsvps: [
      { id: 'r-101', name: 'Siti Aulia', attendance: 'Hadir', pax: 1, message: 'Happy birthday Kayla cantik! Can’t wait for the party!', date: '29 Juli 2026' }
    ]
  }
];


export const INITIAL_HERO_CONFIG: HeroConfig = {
  eyebrowPill: 'Digital Invitation Platform #1 Indonesia',
  titlePart1: 'Your Story,',
  titleGradient: 'Beautifully Shared.',
  subtitle: 'Buat momen pernikahan & acara istimewa Anda tak terlupakan dengan undangan digital yang elegan, interaktif, dan siap disebar dalam 5 menit.',
  featuredBadge: 'Featured Theme 2026',
  featuredTitle: 'The Ethereal Garden',
  featuredDescription: 'Estetika floral lembut transparan dengan efek animasi kelopak mekar, lagu latar romantis, dan sistem RSVP digital otomatis.',
  totalCreatedStat: '15,000+',
  satisfactionStat: '4.9',
  timeStat: '5 Menit'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'INV-2026-001',
    customerName: 'Rian Pratama',
    customerEmail: 'rian.pratama@gmail.com',
    customerPhone: '081234567890',
    templateId: 'ethereal-garden',
    templateName: 'The Ethereal Garden',
    planId: 'plan-gold',
    planName: 'Paket Gold',
    amount: 79000,
    status: 'Aktif',
    paymentMethod: 'QRIS Gopay',
    createdAt: '28 Juli 2026',
    weddingDate: '24 Oktober 2026',
    coupleNames: 'Rian & Anindya',
    slug: 'rian-anindya'
  },
  {
    id: 'INV-2026-002',
    customerName: 'Muhammad Hafiz',
    customerEmail: 'hafiz.m@gmail.com',
    customerPhone: '081987654321',
    templateId: 'royal-gold',
    templateName: 'Royal Gold & Velvet',
    planId: 'plan-platinum',
    planName: 'Paket Platinum Custom',
    amount: 139000,
    status: 'Aktif',
    paymentMethod: 'Bank Transfer BCA',
    createdAt: '27 Juli 2026',
    weddingDate: '12 November 2026',
    coupleNames: 'Hafiz & Sarah',
    slug: 'hafiz-sarah'
  },
  {
    id: 'INV-2026-003',
    customerName: 'Kayla Zhafira',
    customerEmail: 'kayla.sweet17@gmail.com',
    customerPhone: '085711223344',
    templateId: 'sweet-sixteen',
    templateName: 'Pastel Dream Birthday',
    planId: 'plan-gold',
    planName: 'Paket Gold',
    amount: 79000,
    status: 'Pending',
    paymentMethod: 'ShopeePay',
    createdAt: '29 Juli 2026',
    weddingDate: '20 September 2026',
    coupleNames: 'Kayla Sweet 17th',
    slug: 'kayla-sweet17'
  },
  {
    id: 'INV-2026-004',
    customerName: 'Aditya Dimas',
    customerEmail: 'aditya.dimas@yahoo.com',
    customerPhone: '081399887766',
    templateId: 'rustic-botanical',
    templateName: 'Rustic Earthy Leaves',
    planId: 'plan-basic',
    planName: 'Paket Gratis',
    amount: 0,
    status: 'Aktif',
    paymentMethod: 'Gratis',
    createdAt: '25 Juli 2026',
    weddingDate: '05 Desember 2026',
    coupleNames: 'Aditya & Clara',
    slug: 'aditya-clara'
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-1',
    name: 'Admin Invitra',
    email: 'admin@invitra.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    package: 'Super Admin VIP',
    joinedAt: '01 Januari 2026',
    invitationsCount: 12,
    status: 'Aktif'
  },
  {
    id: 'usr-2',
    name: 'Rian Pratama',
    email: 'rian.pratama@gmail.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    package: 'Paket Gold',
    joinedAt: '15 Juni 2026',
    invitationsCount: 1,
    status: 'Aktif'
  },
  {
    id: 'usr-3',
    name: 'Siti Sarah',
    email: 'sarah.siti@gmail.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    package: 'Paket Platinum',
    joinedAt: '20 Juli 2026',
    invitationsCount: 2,
    status: 'Aktif'
  },
  {
    id: 'usr-4',
    name: 'Bpk. Fajar Aqiqah',
    email: 'fajar.aqiqah@gmail.com',
    role: 'user',
    package: 'Paket Gold',
    joinedAt: '28 Juli 2026',
    invitationsCount: 1,
    status: 'Aktif'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Berapa lama proses pembuatan undangan digital di INVITRA?',
    answer: 'Hanya butuh 3 hingga 5 menit! Anda cukup memilih tema favorit, mengisi informasi acara dan nama pengantin/tuan rumah, lalu undangan langsung siap disebarkan.'
  },
  {
    id: 'faq-2',
    question: 'Apakah bisa mengubah data setelah undangan dipublikasikan?',
    answer: 'Ya, tentu saja! Anda bisa mengedit tanggal, lokasi, galeri foto, musik, maupun rekening amplop digital kapan saja tanpa mengubah link undangan yang sudah disebar.'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara menyebarkan undangan ke pesan WhatsApp?',
    answer: 'Sistem INVITRA menyediakan fitur auto-generate pesan WhatsApp dengan nama tamu kustom (misal: Yth. Bpk/Ibu Ahmad). Tinggal klik 1 tombol langsung terhubung ke WhatsApp.'
  },
  {
    id: 'faq-4',
    question: 'Apakah tamu perlu mengunduh aplikasi untuk membuka undangan?',
    answer: 'Tidak perlu sama sekali! Undangan berbasis web responsif modern, sehingga dapat dibuka secara langsung di browser smartphone (Android/iOS) maupun laptop tanpa install apapun.'
  },
  {
    id: 'faq-5',
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami mendukung seluruh pembayaran lokal Indonesia seperti QRIS (Gopay, OVO, ShopeePay, Dana, LinkAja), Transfer Bank (BCA, Mandiri, BRI, BNI), dan Kartu Kredit.'
  }
];


export const TEMPLATES_DATA: TemplateTheme[] = [
  {
    id: 'ethereal-garden',
    name: 'The Ethereal Garden',
    category: 'wedding',
    tag: 'Floral Premium',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    description: 'Estetika floral lembut nan anggun dengan efek paralaks transparan dan animasi kelopak mekar.',
    accentColor: '#C8A2C8',
    bgGradient: 'from-pink-100/80 via-purple-50/70 to-rose-100/80',
    fontTitle: 'Playfair Display',
    musicTitle: 'A Thousand Years - Piano Acoustic',
    coupleDefault: {
      groom: 'Rian Pratama',
      bride: 'Anindya Putri',
      date: '24 Oktober 2026',
      location: 'Grand Ballroom Hotel Mulia, Jakarta'
    }
  },
  {
    id: 'royal-gold',
    name: 'Royal Gold & Velvet',
    category: 'wedding',
    tag: 'Luxury Islami',
    isPopular: true,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
    description: 'Nuansa kemewahan emas istana dengan ornamen ornamen klasik dan kaligrafi modern.',
    accentColor: '#D4AF37',
    bgGradient: 'from-amber-100/90 via-orange-50/70 to-yellow-100/90',
    fontTitle: 'Cinzel',
    musicTitle: 'Canon in D Major - Harp Version',
    coupleDefault: {
      groom: 'Muhammad Hafiz',
      bride: 'Siti Sarah, S.Ked',
      date: '12 November 2026',
      location: 'Masjid Istiqlal & Ballroom Ritz Carlton'
    }
  },
  {
    id: 'rustic-botanical',
    name: 'Rustic Earthy Leaves',
    category: 'wedding',
    tag: 'Boho & Outdoor',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800',
    description: 'Aksen kayu hangat, dedaunan sage green, dan kesan hangat romantis pernikahan outdoor.',
    accentColor: '#8A9A86',
    bgGradient: 'from-emerald-50/80 via-stone-100/80 to-teal-50/80',
    fontTitle: 'Playfair Display',
    musicTitle: 'Beautiful in White - Violin Chill',
    coupleDefault: {
      groom: 'Aditya Dimas',
      bride: 'Clara Bella',
      date: '05 Desember 2026',
      location: 'Pine Forest Villa, Bandung'
    }
  },
  {
    id: 'modern-minimalist',
    name: 'Monochrome Glass',
    category: 'wedding',
    tag: 'Modern Chic',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800',
    description: 'Desain bersih dengan tipografi sans-serif modern, tata letak grid presisi, dan frosted glass.',
    accentColor: '#475569',
    bgGradient: 'from-slate-100/90 via-gray-50/80 to-zinc-100/90',
    fontTitle: 'Plus Jakarta Sans',
    musicTitle: 'Until I Found You - Acoustic',
    coupleDefault: {
      groom: 'Daniel Wijaya',
      bride: 'Jessica Tan',
      date: '18 Januari 2027',
      location: 'The Glass House, Bali'
    }
  },
  {
    id: 'sweet-sixteen',
    name: 'Pastel Dream Birthday',
    category: 'birthday',
    tag: 'Ulang Tahun',
    isNew: true,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
    description: 'Penuh nuansa warna pastel cerah, balon interaktif, countdown pesta, dan konfeti gembira.',
    accentColor: '#F472B6',
    bgGradient: 'from-pink-100/90 via-purple-100/70 to-sky-100/90',
    fontTitle: 'Playfair Display',
    musicTitle: 'Happy Birthday instrumental Jazz',
    coupleDefault: {
      groom: 'Kayla Zhafira',
      bride: 'Sweet 17th Party',
      date: '20 September 2026',
      location: 'Sky Lounge Restaurant, Jakarta'
    }
  },
  {
    id: 'aqiqah-syukuran',
    name: 'Little Miracle Aqiqah',
    category: 'aqiqah',
    tag: 'Syukuran & Khitan',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
    description: 'Desain penuh kehangatan keluarga, ucapan syukuran kelahiran, & lokasi doa bersama.',
    accentColor: '#38BDF8',
    bgGradient: 'from-sky-100/90 via-indigo-50/70 to-blue-100/90',
    fontTitle: 'Playfair Display',
    musicTitle: 'Instrumental Islami Syahdu',
    coupleDefault: {
      groom: 'Muhammad Rayyan',
      bride: 'Putra Bpk. Fajar',
      date: '10 Oktober 2026',
      location: 'Kediaman Keluarga Besar, Surabaya'
    }
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-basic',
    name: 'Paket Gratis',
    price: 0,
    description: 'Sempurna untuk mencoba dan membuat undangan acara sederhana.',
    features: [
      'Masa aktif 3 hari',
      'Maksimal 50 nama tamu',
      '1 Pilihan Lagu Musik',
      'Informasi Acara & Lokasi Maps',
      'Fitur Buku Tamu / Ucapan'
    ],
    ctaText: 'Coba Gratis Now',
    color: 'border-slate-300'
  },
  {
    id: 'plan-gold',
    name: 'Paket Gold',
    price: 79000,
    originalPrice: 149000,
    popular: true,
    badge: 'Paling Diminati 🔥',
    description: 'Fitur terlengkap untuk pernikahan & acara besar tanpa batas tamu.',
    features: [
      'Masa aktif 1 Tahun',
      'Tamu TANPA BATAS (Unlimited RSVP)',
      'Amplop Digital & QRIS Bank Transfer',
      'Kustom Musik Background Bebas',
      'Galeri Foto (hingga 10 foto) & Video',
      'Google Maps & Add to Google Calendar',
      'Penyebaran Otomatis Format WhatsApp',
      'Proses Pembuatan 5 Menit'
    ],
    ctaText: 'Pilih Paket Gold',
    color: 'border-purple-300 bg-white/50 backdrop-blur-xl shadow-xl'
  },
  {
    id: 'plan-platinum',
    name: 'Paket Platinum Custom',
    price: 139000,
    originalPrice: 249000,
    badge: 'Fitur VIP',
    description: 'Pengalaman premium dengan custom domain & filter Instagram custom.',
    features: [
      'Semua Fitur Paket Gold',
      'Masa Aktif Selamanya (Lifetime)',
      'Custom Domain (misal: romeo-juliet.com)',
      'Custom Filter Instagram Story',
      'QR Code Check-In Tamu di Venue',
      'Export Data RSVP ke Excel / Sheet',
      'Prioritas Dukungan VIP CS WhatsApp'
    ],
    ctaText: 'Pilih Paket Platinum',
    color: 'border-amber-300/80 bg-white/40'
  }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'RSVP Real-Time & Rekap Tamu',
    description: 'Tamu dapat mengonfirmasi kehadiran & jumlah pendamping. Rekap instan tersedia di dashboard Anda.',
    iconName: 'UserCheck',
    tag: 'Konfirmasi Instan',
    previewType: 'rsvp'
  },
  {
    id: 'feat-2',
    title: 'Amplop Digital & QRIS Direct',
    description: 'Kemudahan pemberian kado cashless secara langsung ke rekening BCA, Mandiri, Wallet, atau QRIS.',
    iconName: 'Wallet',
    tag: 'Transfer Safe',
    previewType: 'gift'
  },
  {
    id: 'feat-3',
    title: 'Background Musik Auto-Play',
    description: 'Sambut tamu dengan alunan lagu romantis pilihan sendiri atau koleksi playlist eksklusif INVITRA.',
    iconName: 'Music',
    tag: 'Audio Player',
    previewType: 'music'
  },
  {
    id: 'feat-4',
    title: 'Petunjuk Lokasi & Kalender',
    description: 'Navigasi langsung ke lokasi acara via Google Maps / Waze & pengingat jadwal otomatis ke kalender HP.',
    iconName: 'MapPin',
    tag: 'Presisi Lokasi',
    previewType: 'maps'
  },
  {
    id: 'feat-5',
    title: 'Galeri Foto & Love Story',
    description: 'Abadikan momen pre-wedding dengan tampilan slide foto jernih & timeline kisah perjalanan cinta Anda.',
    iconName: 'Image',
    tag: 'Slide Prewedding',
    previewType: 'gallery'
  },
  {
    id: 'feat-6',
    title: 'Custom Instagram Filter & QR Code',
    description: 'Tingkatkan keseruan pesta dengan filter Instagram bertema senada dan sistem buku tamu QR Code.',
    iconName: 'Sparkles',
    tag: 'Eksklusif VIP',
    previewType: 'filter'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'testi-1',
    coupleName: 'Bagas & Amanda',
    eventType: 'Pernikahan di Jakarta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    quote: 'Design-nya super cantik dan frosted glass nya bikin kelihatan mewah banget! Banyak tamu yang muji undangannya estetik dan gampang diisi RSVP-nya.',
    rating: 5,
    date: 'Juni 2026',
    templateUsed: 'The Ethereal Garden'
  },
  {
    id: 'testi-2',
    coupleName: 'Dimas & Raisa',
    eventType: 'Pernikahan di Bandung',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    quote: 'Proses bikin cuma 10 menit beres. Fitur amplop digitalnya sangat membantu buat kado dari teman luar kota. Pokoknya recommended banget!',
    rating: 5,
    date: 'Mei 2026',
    templateUsed: 'Royal Gold & Velvet'
  },
  {
    id: 'testi-3',
    coupleName: 'Keluarga Bpk. Hendra',
    eventType: 'Aqiqah & Syukuran',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    quote: 'Sangat memudahkan menyebar kabar bahagia ke seluruh keluarga besar via WA. Ada fitur musiknya juga jadi hangat pas dibuka.',
    rating: 5,
    date: 'Juli 2026',
    templateUsed: 'Little Miracle Aqiqah'
  }
];

export const INITIAL_WISHES: WishComment[] = [
  {
    id: 'w1',
    name: 'Clarissa Natalia',
    status: 'Hadir',
    message: 'Selamat ya Rian & Anindya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Can\'t wait for the big day! 🎉✨',
    time: '2 menit yang lalu'
  },
  {
    id: 'w2',
    name: 'Bimo Setyawan',
    status: 'Hadir',
    message: 'Happy wedding brother! Lancar-lancar sampai hari H yaa bro!',
    time: '15 menit yang lalu'
  },
  {
    id: 'w3',
    name: 'Dinda Rizky',
    status: 'Ragu-ragu',
    message: 'Barakallah teman kecilku! Semoga dimudahkan urusannya, insyaAllah usahain hadir!',
    time: '1 jam yang lalu'
  }
];
