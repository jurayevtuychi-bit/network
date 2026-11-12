// =========================================================================
// DATA: 12 NAZARIY, 12 AMALIY, 8 LABORATORIYA MAVZULARI
// =========================================================================
const COURSE_MODULES = [
  {
    id: 1,
    theoryTitle: "Kompyuter tarmoqlarining tarixi va qo‘llaniladigan texnologiyalari",
    practicalTitle: "Kompyuterni tashqi qurilmalar bilan bog‘lash",
    theoryContent: [
      "Kompyuter tarmoqlari rivojlanishi 1960-yillarda ARPANET loyihasidan boshlangan. 1969-yilda to‘rtta universitet (UCLA, SRI, UCSB, Utah) o‘rtasida ilk paket kommutatsiyali aloqa o‘rnatildi.",
      "1970-yillarda Robert Metkalf tomonidan Ethernet texnologiyasi, Vint Serf va Bob Kan tomonidan TCP/IP protokollar to‘plami yaratildi. 1983-yilda ARPANET rasman TCP/IP ga o‘tdi.",
      "Zamonaviy tarmoq texnologiyalari: Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), optik tolali aloqa (GPON, DWDM), 5G mobil tarmoqlari va bulutli infratuzilmalar."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "Tashqi qurilma interfeyslari", caption: "USB, RJ-45, HDMI, DisplayPort va ketma-ket portlarni aniqlash." },
      { time: "01:30", title: "Tarmoq kabelini ulash (RJ-45)", caption: "UTP Cat5e/Cat6 kabelini kompyuterning NIC (tarmoq kartasi) portiga ulash." },
      { time: "03:00", title: "Drayver va ulanishni tekshirish", caption: "Qurilmalar menejeri orqali tarmoq adapteri holatini va LED indikatorlarni tekshirish." }
    ],
    practicalTask: {
      title: "Interfeys va Port Moslashtirish Amaliyoti",
      desc: "Kompyuterni tashqi tarmoq va periferik qurilmalarga ulashda to‘g‘ri portni tanlang.",
      pairs: [
        { device: "Switch / Router (Ethernet)", correct: "RJ-45 (8P8C)", options: ["RJ-45 (8P8C)", "HDMI", "USB-A", "VGA"] },
        { device: "Cisco konsol boshqaruvi", correct: "RS-232 / USB-Console", options: ["RJ-45 (8P8C)", "RS-232 / USB-Console", "Audio Jack", "SATA"] },
        { device: "Optik tolali transiver", correct: "SFP / LC", options: ["SFP / LC", "PS/2", "RJ-11", "DVI"] }
      ]
    },
    quiz: [
      { q: "Internetning asosi bo‘lgan ilk paketli kompyuter tarmog‘i qaysi?", opts: ["ARPANET", "Ethernet", "NSFNET", "Token Ring"], ans: 0 },
      { q: "TCP/IP protokollar to‘plami kimlar tomonidan ishlab chiqilgan?", opts: ["Tim Berners-Li", "Vint Serf va Bob Kan", "Bill Geyts", "Alan Tyuring"], ans: 1 },
      { q: "Kompyuterni lokal tarmoqqa simli ulash uchun qaysi konnektor ishlatiladi?", opts: ["RJ-11", "HDMI", "RJ-45", "USB-C"], ans: 2 },
      { q: "IEEE 802.3 standarti qaysi texnologiyani belgilaydi?", opts: ["Wi-Fi", "Bluetooth", "Ethernet", "5G"], ans: 2 }
    ]
  },
  {
    id: 2,
    theoryTitle: "Tarmoq arxitekturasi",
    practicalTitle: "Ikki kompyuterning o‘zaro aloqasini tashkil qilish",
    theoryContent: [
      "Tarmoq arxitekturasi — bu tarmoq elementlari (qurilmalar, protokollar, topologiyalar)ning o‘zaro bog‘lanish va ma’lumot almashish mantiqiy tuzilmasidir.",
      "Asosiy modellar: 7 pog‘onali OSI modeli (Fizik, Kanal, Tarmoq, Transport, Seans, Taqdimot, Ilova) va 4 pog‘onali TCP/IP modeli.",
      "Tarmoq topologiyalari: Yulduz (Star), Shina (Bus), Halqa (Ring), To‘r (Mesh) va Gibrid topologiyalar."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "Krossover va To‘g‘ri kabellar", caption: "Ikki kompyuterni to‘g‘ridan-to‘g‘ri ulashda Crossover (yoki Auto-MDIX) kabelidan foydalanish." },
      { time: "01:45", title: "Statik IP manzil belgilash", caption: "PC1 ga 192.168.1.10/24 va PC2 ga 192.168.1.20/24 IP manzillarini kiritish." },
      { time: "03:20", title: "Ping buyrug‘i bilan aloqani tekshirish", caption: "Buyruqlar satrida 'ping 192.168.1.20' orqali ICMP javobini olish." }
    ],
    practicalTask: {
      title: "Ikki Kompyuter O‘zaro Aloqasini Sozlash",
      desc: "PC1 (192.168.10.1 /24) bilan bir xil tarmoqda bo‘lishi uchun PC2 ga mos IP va Subnet Mask tanlang.",
      pairs: [
        { device: "PC2 IP manzili", correct: "192.168.10.2", options: ["192.168.10.2", "192.168.20.2", "10.0.0.2", "192.168.10.1"] },
        { device: "Subnet Mask (/24)", correct: "255.255.255.0", options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.252"] },
        { device: "Aloqani tekshirish buyrug‘i", correct: "ping 192.168.10.2", options: ["ipconfig", "ping 192.168.10.2", "netstat", "arp -a"] }
      ]
    },
    quiz: [
      { q: "OSI modelida nechta pog‘ona mavjud?", opts: ["4 ta", "5 ta", "7 ta", "6 ta"], ans: 2 },
      { q: "Marshrutlash (routing) va IP-manzillash OSI modelining qaysi pog‘onasida amalga oshiriladi?", opts: ["Fizik pog‘ona", "Kanal pog‘onasi", "Tarmoq pog‘onasi", "Transport pog‘onasi"], ans: 2 },
      { q: "Ikki kompyuter o‘rtasidagi aloqani tekshirish uchun qaysi buyruq ishlatiladi?", opts: ["ping", "mkdir", "format", "dir"], ans: 0 },
      { q: "Barcha tugunlar markaziy kommutatorga ulanadigan topologiya qaysi?", opts: ["Halqa", "Yulduz", "Shina", "Chiziqli"], ans: 1 }
    ]
  },
  {
    id: 3,
    theoryTitle: "Lokal, shahar va global tarmoqlar va ularning qurilish usullari",
    practicalTitle: "Kompyuter tarmoqlarida axborot almashinish jarayonini tashkil qilish",
    theoryContent: [
      "PAN (Personal Area Network) — shaxsiy tarmoqlar (Bluetooth, 10 metrgacha). LAN (Local Area Network) — bino yoki kampus doirasidagi lokal tarmoqlar.",
      "MAN (Metropolitan Area Network) — shahar miqyosidagi yuqori tezlikdagi tarmoqlar (Metro Ethernet).",
      "WAN (Wide Area Network) — mamlakatlar va qit’alarni bog‘lovchi global tarmoqlar (MPLS, SD-WAN, Internet)."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "Ma’lumotlar inkapsulyatsiyasi", caption: "Ilova ma’lumotining Segment -> Paket -> Kadr -> Bit ko‘rinishiga o‘tishi." },
      { time: "02:00", title: "Umumiy papka va fayl almashinuvi", caption: "SMB protokoli orqali lokal tarmoqda resurslarni ulashish." },
      { time: "03:40", title: "Paketlar harakatini kuzatish", caption: "Wireshark yoki simulyator yordamida kadrlar almashinuvini tahlil qilish." }
    ],
    practicalTask: {
      title: "Tarmoq Miqyosi va PDU (Protocol Data Unit) Moslashtirish",
      desc: "Har bir pog‘ona va tarmoq turiga mos birlikni tanlang.",
      pairs: [
        { device: "Transport pog‘onasi PDU", correct: "Segment", options: ["Bit", "Kadr (Frame)", "Paket", "Segment"] },
        { device: "Tarmoq pog‘onasi PDU", correct: "Paket", options: ["Bit", "Kadr (Frame)", "Paket", "Segment"] },
        { device: "Shahar miqyosidagi tarmoq", correct: "MAN", options: ["PAN", "LAN", "MAN", "WAN"] }
      ]
    },
    quiz: [
      { q: "Qit’alar va davlatlarni bog‘lovchi global tarmoq qanday ataladi?", opts: ["LAN", "MAN", "PAN", "WAN"], ans: 3 },
      { q: "Kanal (Data Link) pog‘onasida ma’lumot birligi nima deb ataladi?", opts: ["Paket", "Kadr (Frame)", "Segment", "Oqim"], ans: 1 },
      { q: "Ma’lumotning yuqori pog‘onadan pastki pog‘onaga o‘tishida sarlavhalar qo‘shilishi nima deyiladi?", opts: ["Inkapsulyatsiya", "Dekapsulyatsiya", "Fragmentatsiya", "Marshrutlash"], ans: 0 },
      { q: "Bitta bino ichidagi kompyuterlarni birlashtiruvchi tarmoq turi qaysi?", opts: ["WAN", "LAN", "MAN", "GAN"], ans: 1 }
    ]
  },
  {
    id: 4,
    theoryTitle: "Abonent kirish tarmoqlari",
    practicalTitle: "MAC va IP-adreslarning tuzilishlari",
    theoryContent: [
      "Abonent kirish tarmoqlari (Access Networks) — foydalanuvchi qurilmasini provayderning magistral tarmog‘iga ulaydigan 'oxirgi mil' (Last Mile) texnologiyalaridir.",
      "Asosiy texnologiyalar: xDSL (ADSL, VDSL — mis telefon liniyasi), DOCSIS (koaksial kabel), FTTx / GPON (optik tola), LTE/5G (simsiz kirish).",
      "GPON (Gigabit Passive Optical Network) passiv optik splitterlar orqali bitta toladan ko‘plab abonentlarga 2.5 Gbit/s gacha tezlik beradi."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "MAC manzil tuzilishi", caption: "48-bitli (6 bayt) o‘n oltilik sanoq tizimidagi fizik manzil: OUI (24 bit) + NIC (24 bit)." },
      { time: "01:50", title: "IPv4 manzil tuzilishi", caption: "32-bitli mantiqiy manzil, 4 ta oktet, tarmoq qismi va xost qismi." },
      { time: "03:30", title: "ARP protokoli ishlashi", caption: "IP manzil bo‘yicha MAC manzilni aniqlash jarayoni (arp -a)." }
    ],
    practicalTask: {
      title: "MAC va IP Manzil Tahlili",
      desc: "Berilgan manzillar bo‘yicha to‘g‘ri xususiyatlarni aniqlang.",
      pairs: [
        { device: "MAC manzil uzunligi", correct: "48 bit (6 bayt)", options: ["32 bit", "48 bit (6 bayt)", "64 bit", "128 bit"] },
        { device: "IPv4 manzil uzunligi", correct: "32 bit (4 bayt)", options: ["32 bit (4 bayt)", "48 bit", "64 bit", "128 bit"] },
        { device: "00:1A:2B:3C:4D:5E dagi '00:1A:2B'", correct: "Ishlab chiqaruvchi kodi (OUI)", options: ["Ishlab chiqaruvchi kodi (OUI)", "Subnet Mask", "Gateway", "Port raqami"] }
      ]
    },
    quiz: [
      { q: "MAC manzil necha bitdan iborat?", opts: ["32 bit", "48 bit", "64 bit", "128 bit"], ans: 1 },
      { q: "GPON texnologiyasida ma’lumot qaysi muhit orqali uzatiladi?", opts: ["Mis juftlik", "Koaksial kabel", "Optik tola", "Radioto‘lqin"], ans: 2 },
      { q: "IP manzildan MAC manzilni aniqlovchi protokol qaysi?", opts: ["DNS", "DHCP", "ARP", "ICMP"], ans: 2 },
      { q: "IPv4 manzili nechta oktetdan tashkil topgan?", opts: ["2 ta", "4 ta", "6 ta", "8 ta"], ans: 1 }
    ]
  },
  {
    id: 5,
    theoryTitle: "Transport tarmoqlari",
    practicalTitle: "Analog modulyatsiya, raqamli kodlash va analog signallarni diskret modulyatsiyalash",
    theoryContent: [
      "Transport tarmoqlari — katta hajmdagi trafikni shaharlar va mintaqalar o‘rtasida yuqori ishonchlilik bilan uzatuvchi magistral (Backbone) tarmoqlardir.",
      "Texnologiyalar: SDH/SONET (sinxron raqamli iyerarxiya), OTN (Optical Transport Network), WDM/DWDM (to‘lqin uzunligi bo‘yicha zichlashtirish).",
      "DWDM bitta optik tolada turli to‘lqin uzunliklarida o‘nlab mustaqil kanallarni parallel uzatish imkonini beradi."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "Raqamli kodlash usullari", caption: "NRZ, Manchester va Differensial Manchester kodlash prinsiplari." },
      { time: "01:40", title: "Analog modulyatsiya (ASK, FSK, PSK)", caption: "Amplituda, chastota va faza modulyatsiyasi orqali raqamli bitlarni uzatish." },
      { time: "03:20", title: "Diskret modulyatsiya (PCM)", caption: "Analog signalni diskretlash, kvantlash va ikkilik kodlash (Nyquist teoremasi)." }
    ],
    practicalTask: {
      title: "Modulyatsiya va Kodlash Turlarini Aniqlash",
      desc: "Signal qayta ishlash usullarini to‘g‘ri tavsif bilan moslashtiring.",
      pairs: [
        { device: "ASK (Amplitude Shift Keying)", correct: "Amplituda o‘zgarishi", options: ["Amplituda o‘zgarishi", "Chastota o‘zgarishi", "Faza o‘zgarishi", "To‘lqin uzunligi"] },
        { device: "PSK (Phase Shift Keying)", correct: "Faza o‘zgarishi", options: ["Amplituda o‘zgarishi", "Chastota o‘zgarishi", "Faza o‘zgarishi", "Voltaj o‘zgarishi"] },
        { device: "PCM (Pulse Code Modulation)", correct: "Analog -> Raqamli o‘zgartirish", options: ["Analog -> Raqamli o‘zgartirish", "Raqamli -> Analog", "Optik kuchaytirish", "Shifrlash"] }
      ]
    },
    quiz: [
      { q: "DWDM texnologiyasi nimaga asoslanadi?", opts: ["Vaqt bo‘yicha bo‘lish", "To‘lqin uzunligi bo‘yicha zichlashtirish", "Kabel qalinligini oshirish", "Simsiz uzatish"], ans: 1 },
      { q: "Manchester kodlashda har bir bit davri o‘rtasida nima sodir bo‘ladi?", opts: ["Signal o‘chadi", "Voltaj o‘zgarishi (o‘tish) bo‘ladi", "Chastota ikki barobar oshadi", "Hech narsa bo‘lmaydi"], ans: 1 },
      { q: "Analog signalni raqamli ko‘rinishga o‘tkazishning uch bosqichi qaysilar?", opts: ["Diskretlash, kvantlash, kodlash", "Filtrlash, siqish, shifrlash", "Modulyatsiya, uzatish, qabul", "Kuchaytirish, bo‘lish, jamlash"], ans: 0 },
      { q: "FSK modulyatsiyasida signalning qaysi parametri o‘zgaradi?", opts: ["Amplitudasi", "Chastotasi", "Fazasi", "Qutblanishi"], ans: 1 }
    ]
  },
  {
    id: 6,
    theoryTitle: "Klient-server arxitekturalari",
    practicalTitle: "Ethernet texnologiyasi oilasiga mansub lokal kompyuter tarmoqlarining standartlari va spesifikatsiyalari",
    theoryContent: [
      "Klient-server arxitekturasida resurslar va xizmatlar markaziy Serverda joylashadi, Klientlar esa so‘rov (Request) yuborib javob (Response) oladi.",
      "Peer-to-Peer (P2P) tarmoqlaridan farqli ravishda, Klient-server modeli markazlashtirilgan xavfsizlik, zaxiralash va boshqaruvni ta’minlaydi.",
      "Ko‘p qatlamli (3-tier) arxitektura: Taqdimot qatlami (UI), Biznes-mantiq qatlami (App Server) va Ma’lumotlar bazasi qatlami (DB Server)."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "Ethernet standartlari evolyutsiyasi", caption: "10BASE-T (10 Mbit/s), 100BASE-TX (Fast Ethernet), 1000BASE-T (Gigabit), 10GBASE-T." },
      { time: "01:50", title: "CSMA/CD kirish usuli", caption: "Yarim dupleks rejimda kolliziyalarni aniqlash va bartaraf etish mexanizmi." },
      { time: "03:30", title: "Ethernet kadr tuzilishi", caption: "Preambula, Manzil MAC, Manba MAC, Type/Length, Data (46-1500 bayt) va FCS." }
    ],
    practicalTask: {
      title: "Ethernet Standartlari Spesifikatsiyasi",
      desc: "Ethernet standartlariga mos tezlik va kabel turini tanlang.",
      pairs: [
        { device: "100BASE-TX (Fast Ethernet)", correct: "100 Mbit/s (UTP Cat5)", options: ["10 Mbit/s", "100 Mbit/s (UTP Cat5)", "1 Gbit/s", "10 Gbit/s"] },
        { device: "1000BASE-T (Gigabit Ethernet)", correct: "1 Gbit/s (UTP Cat5e/6)", options: ["100 Mbit/s", "1 Gbit/s (UTP Cat5e/6)", "40 Gbit/s", "10 Mbit/s"] },
        { device: "Ethernet kadr maksimal yuklamasi (MTU)", correct: "1500 bayt", options: ["64 bayt", "512 bayt", "1500 bayt", "9000 bayt"] }
      ]
    },
    quiz: [
      { q: "Klient-server modelida so‘rovni kim tashabbus qiladi?", opts: ["Server", "Klient", "Switch", "Kabel"], ans: 1 },
      { q: "1000BASE-T standarti qanday tezlikni ta’minlaydi?", opts: ["10 Mbit/s", "100 Mbit/s", "1 Gbit/s", "10 Gbit/s"], ans: 2 },
      { q: "Ethernet kadrining oxirida xatolarni tekshiruvchi maydon nima deyiladi?", opts: ["TTL", "FCS (CRC)", "Header", "SYN"], ans: 1 },
      { q: "Uch qatlamli (3-tier) klient-server arxitekturasiga qaysilar kiradi?", opts: ["UI, App Server, DB Server", "PC, Switch, Router", "LAN, MAN, WAN", "TCP, UDP, IP"], ans: 0 }
    ]
  },
  {
    id: 7,
    theoryTitle: "Simsiz sensor tarmoqlar",
    practicalTitle: "Ethernet tarmog‘i konfiguratiyasini to‘g‘ri qurilganligi aniqlash usuli",
    theoryContent: [
      "Simsiz sensor tarmoqlar (WSN — Wireless Sensor Networks) atrof-muhit ko‘rsatkichlarini (harorat, namlik, bosim, harakat) o‘lchab, markaziy shlyuzga uzatuvchi avtonom tugunlardan iborat.",
      "Asosiy protokollar: ZigBee (IEEE 802.15.4), LoRaWAN (uzoq masofa, kam quvvat), BLE (Bluetooth Low Energy), 6LoWPAN.",
      "WSN tugunlarining asosiy cheklovi — batareya quvvati, shu bois energiya tejovchi marshrutlash (LEACH) muhim ahamiyatga ega."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "5-4-3 Qoidasi va Kolliziya domenlari", caption: "Ethernet segmentlari uzunligi (UTP maks 100 metr) va takrorlagichlar cheklovini tekshirish." },
      { time: "01:45", title: "Dupleks va Tezlik mosligi", caption: "Full-Duplex va Half-Duplex nomutanosibligi (Duplex Mismatch) muammolarini aniqlash." },
      { time: "03:15", title: "Kabel va Port diagnostikasi", caption: "'show interfaces' orqali CRC xatolari, kolliziyalar va paket yo‘qotishlarini tekshirish." }
    ],
    practicalTask: {
      title: "Ethernet Konfiguratsiyasini Tekshirish",
      desc: "Tarmoq diagnostikasida uchraydigan muammo va me’yorlarni aniqlang.",
      pairs: [
        { device: "UTP Cat5e/6 maksimal segment uzunligi", correct: "100 metr", options: ["50 metr", "100 metr", "500 metr", "1000 metr"] },
        { device: "Bir tomon Half-Duplex, ikkinchisi Full-Duplex bo‘lsa", correct: "Duplex Mismatch (kechikish/xato)", options: ["Tezlik 2x oshadi", "Duplex Mismatch (kechikish/xato)", "IP o‘zgaradi", "Muammo bo‘lmaydi"] },
        { device: "Simsiz sensor tarmoq (WSN) standarti", correct: "IEEE 802.15.4 (ZigBee)", options: ["IEEE 802.3", "IEEE 802.15.4 (ZigBee)", "DOCSIS", "SDH"] }
      ]
    },
    quiz: [
      { q: "ZigBee texnologiyasi qaysi standartga asoslangan?", opts: ["IEEE 802.3", "IEEE 802.11", "IEEE 802.15.4", "IEEE 802.16"], ans: 2 },
      { q: "UTP (o‘ralma juftlik) kabelining maksimal ruxsat etilgan uzunligi qancha?", opts: ["50 metr", "100 metr", "250 metr", "500 metr"], ans: 1 },
      { q: "Simsiz sensor tarmoqlarida (WSN) eng asosiy resurs cheklovi nima?", opts: ["Ekran o‘lchami", "Batareya energiyasi", "Kabel narxi", "Monitor chastotasi"], ans: 1 },
      { q: "Ikki qurilma o‘rtasida bir vaqtning o‘zida ham uzatish, ham qabul qilish rejimi nima deyiladi?", opts: ["Simplex", "Half-Duplex", "Full-Duplex", "Broadcast"], ans: 2 }
    ]
  },
  {
    id: 8,
    theoryTitle: "Zamonaviy kompyuter tarmoqlari",
    practicalTitle: "Ko‘prik va kommutatorlarning ishlash tamoillari. Ko‘rinmas ko‘prik algoritmi",
    theoryContent: [
      "Zamonaviy tarmoqlar yuqori o‘tkazuvchanlik, virtualizatsiya va avtomatlashtirishga tayanadi: Wi-Fi 6/7, 5G, SD-WAN, NFV (Network Functions Virtualization) va Edge Computing.",
      "Bulutli ma’lumotlar markazlari (Data Centers) Spine-Leaf arxitekturasi asosida qurilib, 100G/400G Ethernet kanallaridan foydalanadi.",
      "Zero Trust Architecture (ZTA) — har bir foydalanuvchi va qurilmani tarmoq ichida ham doimiy tekshirish tamoyili."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "Ko‘prik (Bridge) va Kommutator (Switch)", caption: "Kanal pog‘onasida MAC jadvali (CAM table) asosida kadrlarni yo‘naltirish." },
      { time: "01:40", title: "Ko‘rinmas ko‘prik (Transparent Bridge) algoritmi", caption: "O‘rganish (Learning), Filtrlash (Filtering) va Tarqatish (Flooding) bosqichlari." },
      { time: "03:20", title: "STP (Spanning Tree Protocol)", caption: "Tarmoqdagi halqalarni (loops) oldini olish uchun zaxira portlarni bloklash." }
    ],
    practicalTask: {
      title: "Kommutator (Switch) MAC Jadvali Mantiqi",
      desc: "Switch kadrni qabul qilganda qanday harakat qilishini tanlang.",
      pairs: [
        { device: "Qabul qiluvchi MAC jadvalda yo‘q (Unknown Unicast)", correct: "Flooding (barcha portlarga, kirganidan tashqari)", options: ["Drop (tashlab yuborish)", "Flooding (barcha portlarga, kirganidan tashqari)", "Faqat Routerga", "Faqat 1-portga"] },
        { device: "Manba va Qabul qiluvchi bir xil portda", correct: "Filtering (tashlab yuborish)", options: ["Flooding", "Filtering (tashlab yuborish)", "Broadcast", "Routing"] },
        { device: "Tarmoqda halqalarni (Loop) bloklovchi protokol", correct: "STP (802.1D)", options: ["ARP", "DHCP", "STP (802.1D)", "HTTP"] }
      ]
    },
    quiz: [
      { q: "Kommutator (Switch) qaror qabul qilishda qaysi manzildan foydalanadi?", opts: ["IP manzil", "MAC manzil", "Port raqami", "Domen nomi"], ans: 1 },
      { q: "Transparent Bridge (ko‘rinmas ko‘prik) manzil jadvalda topilmasa nima qiladi?", opts: ["Paketni o‘chiradi", "Kirgan portdan tashqari barcha portlarga yuboradi (Flooding)", "Qayta so‘rov yuboradi", "O‘chib qoladi"], ans: 1 },
      { q: "Zamonaviy ma’lumotlar markazlarida (Data Center) qaysi topologiya keng qo‘llaniladi?", opts: ["Shina", "Spine-Leaf", "Halqa", "Ketma-ket"], ans: 1 },
      { q: "Kommutatsiya halqalarini (Switching Loops) bartaraf etuvchi protokol qaysi?", opts: ["STP", "FTP", "SMTP", "DNS"], ans: 0 }
    ]
  },
  {
    id: 9,
    theoryTitle: "Internet tarixi va arxitekturasi. Transport va ilova pog’onasi",
    practicalTitle: "Kommutatorlarning ishlash prinsiplari va tuzilishlari",
    theoryContent: [
      "Internet — TCP/IP protokollariga asoslangan global tarmoqlar tarmog‘i. Avtonom tizimlar (AS) BGP protokoli orqali o‘zaro bog‘lanadi.",
      "Transport pog‘onasi: TCP (ishonchli, ulanishga asoslangan, 3-way handshake) va UDP (tezkor, ulanishsiz, video/o‘yinlar/DNS uchun).",
      "Ilova pog‘onasi protokollari: HTTP/HTTPS (80/443), DNS (53), SMTP (25), FTP (20/21), SSH (22), DHCP (67/68)."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "Kommutator ichki tuzilishi", caption: "Portlar, ASIC mikrosxemalari, CAM xotira va kommutatsiya matritsasi (Switch Fabric)." },
      { time: "01:45", title: "Kommutatsiya usullari", caption: "Store-and-Forward (to‘liq tekshirish), Cut-Through (tezkor) va Fragment-Free." },
      { time: "03:20", title: "VLAN tushunchasi", caption: "Bitta fizik kommutatorni mantiqiy virtual lokal tarmoqlarga (IEEE 802.1Q) ajratish." }
    ],
    practicalTask: {
      title: "Transport va Ilova Pog‘onasi Portlari",
      desc: "Protokollarga mos standart port raqamlarini belgilang.",
      pairs: [
        { device: "HTTPS (Xavfsiz veb)", correct: "TCP 443", options: ["TCP 80", "TCP 443", "TCP 22", "UDP 53"] },
        { device: "SSH (Xavfsiz masofaviy boshqaruv)", correct: "TCP 22", options: ["TCP 21", "TCP 22", "TCP 23", "UDP 67"] },
        { device: "DNS (Domen nomlari tizimi)", correct: "UDP/TCP 53", options: ["UDP/TCP 53", "TCP 25", "TCP 110", "UDP 123"] }
      ]
    },
    quiz: [
      { q: "TCP ulanishini o‘rnatishdagi '3-bosqichli qo‘l siqish' (3-way handshake) ketma-ketligi qaysi?", opts: ["SYN -> SYN-ACK -> ACK", "ACK -> FIN -> RST", "GET -> POST -> OK", "HELLO -> HI -> BYE"], ans: 0 },
      { q: "Xatolarni CRC orqali to‘liq tekshirib keyin uzatadigan kommutatsiya usuli qaysi?", opts: ["Cut-Through", "Store-and-Forward", "Fast-Forward", "Broadcast"], ans: 1 },
      { q: "HTTPS protokoli standart holatda qaysi portdan foydalanadi?", opts: ["21", "22", "80", "443"], ans: 3 },
      { q: "Qaysi transport protokoli ulanish o‘rnatmasdan tezkor uzatishni ta’minlaydi?", opts: ["TCP", "UDP", "HTTP", "FTP"], ans: 1 }
    ]
  },
  {
    id: 10,
    theoryTitle: "Aloqa va marshrutlash. Marshrutlash qurilishi va algoritmlari",
    practicalTitle: "IP adresining formati va uning turlari",
    theoryContent: [
      "Marshrutlash (Routing) — paketlarni manba tarmog‘idan qabul qiluvchi tarmoqqa eng maqbul yo‘l orqali yetkazish jarayoni.",
      "Marshrutlash turlari: Statik (qo‘lda kiritiladi) va Dinamik (RIP — Distance Vector, OSPF — Link State / Dijkstra algoritmi, BGP — Path Vector).",
      "OSPF (Open Shortest Path First) Deykstra (Dijkstra) algoritmidan foydalanib eng qisqa yo‘lni hisoblaydi."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "IPv4 sinflari va CIDR", caption: "A, B, C, D, E sinflari hamda sinfsiz marshrutlash (CIDR /24, /26, /30)." },
      { time: "01:45", title: "Shaxsiy (Private) va Ommaviy (Public) IP", caption: "RFC 1918 diapazonlari: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 va NAT." },
      { time: "03:30", title: "IPv6 formati", caption: "128-bitli o‘n oltilik manzil tuzilishi va qisqartirish qoidalari." }
    ],
    practicalTask: {
      title: "IPv4 Manzillar Turi va Tarmoq Hisobi",
      desc: "IP manzillarning toifasi va xususiyatini aniqlang.",
      pairs: [
        { device: "192.168.1.50", correct: "Private (Shaxsiy) IP - C sinf", options: ["Public (Ommaviy) IP", "Private (Shaxsiy) IP - C sinf", "Loopback IP", "Multicast IP"] },
        { device: "127.0.0.1", correct: "Loopback (O‘z-o‘zini tekshirish)", options: ["Broadcast", "Default Gateway", "Loopback (O‘z-o‘zini tekshirish)", "APIPA"] },
        { device: "OSPF protokoli algoritmi", correct: "Dijkstra (SPF)", options: ["Bellman-Ford", "Dijkstra (SPF)", "Round Robin", "RSA"] }
      ]
    },
    quiz: [
      { q: "OSPF marshrutlash protokoli qaysi algoritmga asoslanadi?", opts: ["Deykstra (Dijkstra)", "Bellman-Ford", "Bubble Sort", "AES"], ans: 0 },
      { q: "Qaysi IP manzil diapazoni Private (shaxsiy/lokal) hisoblanadi?", opts: ["8.8.8.0/24", "192.168.0.0/16", "1.1.1.0/24", "172.32.0.0/16"], ans: 1 },
      { q: "IPv6 manzili necha bitdan iborat?", opts: ["32 bit", "64 bit", "128 bit", "256 bit"], ans: 2 },
      { q: "127.0.0.1 IP manzili nima uchun ishlatiladi?", opts: ["Global internetga chiqish", "Loopback (lokal qurilmani tekshirish)", "Broadcast tarqatish", "DNS server"], ans: 1 }
    ]
  },
  {
    id: 11,
    theoryTitle: "SDN tarmoqlar. Internet xavfsizligi",
    practicalTitle: "Internetdagi asosiy xavf-xatarlar. Internet xavfsizligini ta’minlash usullari",
    theoryContent: [
      "SDN (Software-Defined Networking) — tarmoqning boshqaruv tekisligini (Control Plane) ma’lumot uzatish tekisligidan (Data Plane) ajratib, markaziy SDN Controller (masalan, OpenFlow) orqali dasturiy boshqarish arxitekturasi.",
      "Internet xavfsizligi asoslari (CIA triadasi): Maxfiylik (Confidentiality), Butunlik (Integrity), Mavjudlik (Availability).",
      "Himoya vositalari: Firewall (tarmoqlararo ekran), IDS/IPS, VPN (IPsec, WireGuard), TLS/SSL shifrlash."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "Asosiy kiberxavflar", caption: "DDoS hujumlari, Phishing, Man-in-the-Middle (MITM), Ransomware va SQL Injection." },
      { time: "01:50", title: "Shifrlash va Sertifikatlar", caption: "Simmetrik (AES) va Asimmetrik (RSA/ECC) shifrlash, HTTPS/TLS sertifikatlari." },
      { time: "03:30", title: "Amaliy himoya choralari", caption: "Ikki faktorli autentifikatsiya (2FA), kuchli parollar, Firewall qoidalari." }
    ],
    practicalTask: {
      title: "Kiberxavfsizlik Hujumlari va Himoya Usullari",
      desc: "Har bir tahdidga mos himoya mexanizmini tanlang.",
      pairs: [
        { device: "Tizimni so‘rovlar bilan to‘ldirib ishdan chiqarish (DDoS)", correct: "Rate Limiting & Traffic Scrubbing", options: ["Rate Limiting & Traffic Scrubbing", "Antivirus o‘chirish", "Telnet yoqish", "HTTP ga o‘tish"] },
        { device: "O‘rtadagi odam (MITM) tinglash hujumi", correct: "TLS/HTTPS shifrlash va VPN", options: ["Oddiy matnli HTTP", "TLS/HTTPS shifrlash va VPN", "Parolsiz Wi-Fi", "Broadcast"] },
        { device: "SDN da boshqaruv va ma’lumot tekisligi aloqasi", correct: "OpenFlow protokoli", options: ["OpenFlow protokoli", "Telnet", "POP3", "RIP"] }
      ]
    },
    quiz: [
      { q: "SDN (Software-Defined Networking) ning asosiy g‘oyasi nima?", opts: ["Kabellarni olib tashlash", "Control Plane va Data Plane ni ajratish", "Faqat simsiz aloqa", "IP manzillarni bekor qilish"], ans: 1 },
      { q: "Axborot xavfsizligining CIA triadasi nimani anglatadi?", opts: ["Maxfiylik, Butunlik, Mavjudlik", "Tezlik, Narx, Sifat", "CPU, RAM, Disk", "LAN, MAN, WAN"], ans: 0 },
      { q: "Serverga millionlab soxta so‘rovlar yuborib ishdan chiqarish hujumi nima deyiladi?", opts: ["Phishing", "DDoS", "Keylogger", "Trojan"], ans: 1 },
      { q: "Ochiq tarmoq orqali shifrlangan himoyalangan tunnel yaratuvchi texnologiya qaysi?", opts: ["VPN", "Telnet", "FTP", "ARP"], ans: 0 }
    ]
  },
  {
    id: 12,
    theoryTitle: "Ilovalar. Internet kelajagi",
    practicalTitle: "Sun’iy intellekt va Big Data",
    theoryContent: [
      "Tarmoq ilovalari: IoT (Internet of Things), AR/VR striming, bulutli hisoblash (SaaS, PaaS, IaaS) va Web3/decentralized tizimlar.",
      "Internet kelajagi: 6G, Kvant kriptografiya (QKD), Satellite Internet (Starlink LEO), Intent-Based Networking (IBN).",
      "Tarmoq muhandisligida avtomatlashtirish (NetDevOps, Python, Ansible) va AI-driven AIOps tizimlari."
    ],
    practicalVideoSteps: [
      { time: "00:00", title: "Big Data tarmoq trafigida", caption: "Katta ma’lumotlarning 5V xususiyati (Volume, Velocity, Variety, Veracity, Value) va tarmoq telemetriyasi." },
      { time: "01:45", title: "AI tarmoq boshqaruvida", caption: "Mashinaviy o‘qitish (ML) yordamida tarmoq anomaliyalari va kiberhujumlarni real vaqtda aniqlash." },
      { time: "03:20", title: "Avtonom tarmoqlar", caption: "AI asosida trafikni dinamik optimallashtirish va o‘z-o‘zini tiklovchi (Self-healing) tarmoqlar." }
    ],
    practicalTask: {
      title: "AI, Big Data va Kelajak Tarmoqlari",
      desc: "Zamonaviy tushunchalarni to‘g‘ri ta’riflari bilan bog‘lang.",
      pairs: [
        { device: "AIOps tarmoqlarda", correct: "AI yordamida nosozliklarni bashorat qilish", options: ["AI yordamida nosozliklarni bashorat qilish", "Qo‘lda kabel ulash", "Modemni o‘chirish", "Faqat HTML yozish"] },
        { device: "Big Data 3V/5V asosiy xususiyati", correct: "Katta hajm, yuqori tezlik, xilma-xillik", options: ["Faqat kichik matn", "Katta hajm, yuqori tezlik, xilma-xillik", "Statik jadval", "Oflayn arxiv"] },
        { device: "LEO sun’iy yo‘ldosh interneti afzalligi", correct: "Past kechikish (Low Latency)", options: ["Past kechikish (Low Latency)", "Faqat simli ulanish", "Kechikish 5 soniya", "Elektrsiz ishlash"] }
      ]
    },
    quiz: [
      { q: "Tarmoq boshqaruvida sun’iy intellektdan foydalanish (AIOps) nimani ta’minlaydi?", opts: ["Anomaliyalarni erta aniqlash va avtomatik tiklash", "Kabellarni uzaytirish", "IPv4 ni o‘chirish", "Faqat dizayn chizish"], ans: 0 },
      { q: "Big Data tushunchasining asosiy belgilari qaysilar?", opts: ["Hajm (Volume), Tezlik (Velocity), Xilma-xillik (Variety)", "Rang, Shakl, O‘lcham", "Port, MAC, IP", "TCP, UDP, ICMP"], ans: 0 },
      { q: "Kvant kriptografiya (QKD) kelajak internetida nima uchun xizmat qiladi?", opts: ["Mutlaq xavfsiz kalit almashinuvi", "Video sifatini pasaytirish", "Batareya zaryadlash", "Fayl o‘chirish"], ans: 0 },
      { q: "IoT (Buyumlar Interneti) nimani anglatadi?", opts: ["Sensor va qurilmalarning internetga ulanishi", "Faqat noutbuklar tarmog‘i", "Oflayn dasturlar", "Telefon qo‘ng‘iroqlari"], ans: 0 }
    ]
  }
];

const LAB_MODULES = [
  {
    id: 1,
    title: "Tarmoq simulyatorlari bilan ishlash",
    tool: "Simulyator asoslari",
    desc: "Tarmoq simulyatorlari (Cisco Packet Tracer, GNS3, EVE-NG) interfeysi, qurilmalar paneli, kabellar va mantiqiy/fizik ishchi maydon bilan tanishish.",
    videoSteps: [
      { time: "00:00", title: "Simulyator turlari", caption: "Cisco Packet Tracer (o‘quv), GNS3 va EVE-NG (real IOS emulyatsiya) farqlari." },
      { time: "01:40", title: "Ishchi maydon va Qurilmalar", caption: "Router, Switch, PC va kabellarni (Straight-through, Crossover, Console) tanlash." },
      { time: "03:10", title: "Simulation Mode", caption: "ICMP va ARP paketlarining tarmoq bo‘ylab harakatini qadam-baqadam kuzatish." }
    ],
    objectives: [
      "Simulyator terminalida qurilma holatini tekshirish",
      "'show version' buyrug‘ini bajarish"
    ],
    expectedCommands: ["show version"],
    initialTopology: [
      { name: "PC0", type: "pc", ip: "192.168.1.10", status: "up" },
      { name: "Switch0", type: "switch", ip: "VLAN1", status: "up" },
      { name: "Router0", type: "router", ip: "192.168.1.1", status: "up" }
    ],
    hint: "Terminalga 'show version' buyrug‘ini kiriting va Enter bosing."
  },
  {
    id: 2,
    title: "Cisco Packet Tracer dasturini sozlash va ishlash jarayonini tekshirish",
    tool: "Cisco IOS CLI",
    desc: "Cisco Packet Tracer da qurilmalarning boshlang‘ich konfiguratsiyasi: Hostname berish, imtiyozli rejim (enable), konfiguratsiyani saqlash.",
    videoSteps: [
      { time: "00:00", title: "CLI rejimlari", caption: "User EXEC (>), Privileged EXEC (#) va Global Configuration (config)# rejimlari." },
      { time: "01:50", title: "Asosiy sozlamalar", caption: "hostname, enable secret va banner motd buyruqlarini kiritish." },
      { time: "03:20", title: "Konfiguratsiyani saqlash", caption: "'write memory' yoki 'copy running-config startup-config' buyrug‘i." }
    ],
    objectives: [
      "Imtiyozli rejimga o‘tish ('enable')",
      "Konfiguratsiya rejimiga o‘tish ('configure terminal')",
      "Qurilma nomini o‘zgartirish ('hostname R1')"
    ],
    expectedCommands: ["enable", "configure terminal", "hostname"],
    initialTopology: [
      { name: "Router0", type: "router", ip: "Sozlanmagan", status: "up" },
      { name: "Admin-PC", type: "pc", ip: "Console", status: "up" }
    ],
    hint: "Ketma-ket kiriting: enable -> configure terminal -> hostname R1"
  },
  {
    id: 3,
    title: "Cisco Packet Tracer dasturida LAN tarmoqlarini qurish",
    tool: "LAN & Switch",
    desc: "Kommutator (Switch 2960) orqali bir nechta kompyuterlarni birlashtirish, VLAN yaratish va PC lar o‘rtasida ping orqali aloqa o‘rnatish.",
    videoSteps: [
      { time: "00:00", title: "LAN topologiyasini yig‘ish", caption: "3 ta PC ni Switch 2960 ga Straight-Through kabel bilan ulash." },
      { time: "01:45", title: "IP manzillarni sozlash", caption: "192.168.10.10, 192.168.10.11, 192.168.10.12 (/24) manzillarini berish." },
      { time: "03:20", title: "VLAN va Ping tekshiruvi", caption: "Switchda 'vlan 10' yaratish va kompyuterlararo aloqani tekshirish." }
    ],
    objectives: [
      "Switchda VLAN 10 yaratish ('vlan 10')",
      "Aloqani tekshirish ('ping 192.168.10.11')"
    ],
    expectedCommands: ["vlan 10", "ping 192.168.10.11"],
    initialTopology: [
      { name: "PC1", type: "pc", ip: "192.168.10.10", status: "up" },
      { name: "Switch-LAN", type: "switch", ip: "VLAN 1", status: "up" },
      { name: "PC2", type: "pc", ip: "192.168.10.11", status: "up" }
    ],
    hint: "Terminalda 'vlan 10' va 'ping 192.168.10.11' buyruqlarini bajaring."
  },
  {
    id: 4,
    title: "Cisco Packet Tracer dasturida WAN tarmoqlarini loyihalash. Statik va dinamik marshrutlash",
    tool: "WAN & Routing",
    desc: "Ikki xil tarmoqni Routerlar orqali bog‘lash, statik marshrut (ip route) hamda dinamik OSPF/RIP protokollarini sozlash.",
    videoSteps: [
      { time: "00:00", title: "WAN interfeyslari", caption: "Routerlar orasiga Serial yoki GigabitEthernet WAN kanalini ulash." },
      { time: "01:50", title: "Statik marshrutlash", caption: "'ip route 192.168.2.0 255.255.255.0 10.0.0.2' buyrug‘ini yozish." },
      { time: "03:30", title: "Dinamik OSPF sozlash", caption: "'router ospf 1' va 'network ... area 0' orqali avtomatik marshrut almashinuvi." }
    ],
    objectives: [
      "Statik marshrut qo‘shish ('ip route ...')",
      "Marshrutlash jadvalini ko‘rish ('show ip route')"
    ],
    expectedCommands: ["ip route", "show ip route"],
    initialTopology: [
      { name: "LAN-A", type: "pc", ip: "192.168.1.0/24", status: "up" },
      { name: "R1-Toshkent", type: "router", ip: "10.0.0.1", status: "up" },
      { name: "R2-Qarshi", type: "router", ip: "10.0.0.2", status: "up" },
      { name: "LAN-B", type: "pc", ip: "192.168.2.0/24", status: "up" }
    ],
    hint: "Terminalda 'ip route 192.168.2.0 255.255.255.0 10.0.0.2' va 'show ip route' buyruqlarini bajaring."
  },
  {
    id: 5,
    title: "Cisco Packet Tracer dasturida kichik o‘lchamli va katta o‘lchamli korporativ tarmog‘ini loyihalash",
    tool: "Enterprise Design",
    desc: "Core, Distribution va Access qatlamlaridan iborat iyerarxik korporativ tarmoqni qurish, DHCP va Router-on-a-Stick sozlash.",
    videoSteps: [
      { time: "00:00", title: "Iyerarxik tarmoq modeli", caption: "Access (foydalanuvchilar), Distribution (siyosat/VLAN) va Core (yuqori tezlik) qatlamlari." },
      { time: "01:50", title: "DHCP Server sozlash", caption: "Routerda 'ip dhcp pool CORP' yaratib avtomatik IP tarqatish." },
      { time: "03:30", title: "Inter-VLAN Routing", caption: "Sub-interfeyslar (g0/0.10, g0/0.20) orqali bo‘limlararo aloqani yo‘lga qo‘yish." }
    ],
    objectives: [
      "DHCP pulini yaratish ('ip dhcp pool CORP')",
      "Tarmoqni belgilash ('network 192.168.1.0 255.255.255.0')"
    ],
    expectedCommands: ["ip dhcp pool", "network"],
    initialTopology: [
      { name: "Core-R1", type: "router", ip: "192.168.0.1", status: "up" },
      { name: "Dist-SW1", type: "switch", ip: "VLAN 10,20", status: "up" },
      { name: "Bo'lim-PC", type: "pc", ip: "DHCP", status: "up" }
    ],
    hint: "Terminalda 'ip dhcp pool CORP' va 'network 192.168.1.0 255.255.255.0' buyruqlarini kiriting."
  },
  {
    id: 6,
    title: "Cisco Packet Tracer dasturida telnet va SSH protokoli bilan ishlash",
    tool: "Remote Access",
    desc: "Tarmoq qurilmalarini masofadan boshqarish: Telnet (shifrlanmagan) va SSHv2 (RSA kalit bilan shifrlangan) protokollarini sozlash.",
    videoSteps: [
      { time: "00:00", title: "Telnet va SSH farqi", caption: "Telnet (port 23) ochiq matn uzatadi, SSH (port 22) esa barcha trafikni shifrlaydi." },
      { time: "01:45", title: "RSA kalit generatsiyasi", caption: "'ip domain-name uznet.uz' va 'crypto key generate rsa' (1024/2048 bit)." },
      { time: "03:20", title: "VTY liniyalarida SSH yoqish", caption: "'line vty 0 4', 'transport input ssh' va 'login local' buyruqlarini kiritish." }
    ],
    objectives: [
      "RSA shifrlash kalitini yaratish ('crypto key generate rsa')",
      "VTY da SSH ni yoqish ('transport input ssh')"
    ],
    expectedCommands: ["crypto key generate rsa", "transport input ssh"],
    initialTopology: [
      { name: "Admin-PC", type: "pc", ip: "192.168.1.50", status: "up" },
      { name: "Core-Router", type: "router", ip: "192.168.1.1", status: "up" }
    ],
    hint: "Terminalda 'crypto key generate rsa' va 'transport input ssh' buyruqlarini kiriting."
  },
  {
    id: 7,
    title: "Cisco Packet Tracer dasturida SNTP bilan ishlash",
    tool: "Time Sync (SNTP)",
    desc: "Tarmoq qurilmalarida tizim vaqtini SNTP/NTP server bilan sinxronlashtirish (loglar va sertifikatlar aniqligi uchun).",
    videoSteps: [
      { time: "00:00", title: "Nima uchun vaqt sinxronizatsiyasi muhim?", caption: "Syslog yozuvlari, xavfsizlik auditi va X.509 sertifikatlar to‘g‘ri ishlashi uchun." },
      { time: "01:40", title: "SNTP Serverni sozlash", caption: "Serverda NTP xizmatini yoqish va Routerda 'sntp server <IP>' buyrug‘ini kiritish." },
      { time: "03:10", title: "Vaqtni tekshirish", caption: "'show clock' va 'show sntp' orqali sinxronizatsiyani tasdiqlash." }
    ],
    objectives: [
      "SNTP server manzilini ko‘rsatish ('sntp server 192.168.1.100')",
      "Joriy vaqtni tekshirish ('show clock')"
    ],
    expectedCommands: ["sntp server", "show clock"],
    initialTopology: [
      { name: "NTP-Server", type: "server", ip: "192.168.1.100", status: "up" },
      { name: "Switch-1", type: "switch", ip: "192.168.1.2", status: "up" },
      { name: "Router-1", type: "router", ip: "192.168.1.1", status: "up" }
    ],
    hint: "Terminalda 'sntp server 192.168.1.100' va 'show clock' buyruqlarini kiriting."
  },
  {
    id: 8,
    title: "Cisco Packet Tracer dasturida port xavfsizligini ta`minlash",
    tool: "Port Security",
    desc: "Kommutator portlariga begona qurilmalar ulanishini cheklash (Switchport Port-Security, MAC manzil cheklovi va Violation rejimlari).",
    videoSteps: [
      { time: "00:00", title: "MAC Flooding hujumi", caption: "Begona qurilmalar kommutator CAM jadvalini to‘ldirib yuborish xavfi." },
      { time: "01:45", title: "Port-Security yoqish", caption: "'switchport mode access', 'switchport port-security', 'switchport port-security maximum 1'." },
      { time: "03:20", title: "Violation rejimlari", caption: "Protect, Restrict va Shutdown (default) rejimlarini tekshirish." }
    ],
    objectives: [
      "Port xavfsizligini yoqish ('switchport port-security')",
      "Maksimal MAC sonini cheklash ('switchport port-security maximum 1')"
    ],
    expectedCommands: ["switchport port-security", "maximum 1"],
    initialTopology: [
      { name: "Ishonchli-PC", type: "pc", ip: "MAC: AA:BB:CC:01", status: "up" },
      { name: "Switch-Sec", type: "switch", ip: "Port Fa0/1", status: "up" },
      { name: "Begona-PC", type: "pc", ip: "Bloklangan", status: "blocked" }
    ],
    hint: "Terminalda 'switchport port-security' va 'switchport port-security maximum 1' buyruqlarini bajaring."
  }
];

const FINAL_EXAM_QUESTIONS = [
  { q: "OSI modelida paketlarni marshrutlash qaysi pog‘onada amalga oshiriladi?", opts: ["Fizik", "Kanal", "Tarmoq", "Seans"], ans: 2 },
  { q: "12 ta nazariy mavzu ichida SDN arxitekturasi nimani ajratadi?", opts: ["Control Plane va Data Plane", "RAM va ROM", "IPv4 va MAC", "HTTP va FTP"], ans: 0 },
  { q: "MAC manzil necha bit uzunlikda bo‘ladi?", opts: ["32 bit", "48 bit", "64 bit", "128 bit"], ans: 1 },
  { q: "Cisco qurilmalarini xavfsiz masofaviy boshqarish uchun qaysi protokol tavsiya etiladi?", opts: ["Telnet", "SSH", "HTTP", "TFTP"], ans: 1 },
  { q: "Switchport port-security funksiyasi nimani himoya qiladi?", opts: ["Portga begona MAC manzillar ulanishini", "Monitor yorqinligini", "Printer siyohini", "Elektr kuchlanishini"], ans: 0 },
  { q: "OSPF protokoli eng qisqa yo‘lni topishda qaysi algoritmdan foydalanadi?", opts: ["Deykstra", "Bubble Sort", "SHA-256", "Huffman"], ans: 0 },
  { q: "1000BASE-T Ethernet standarti qancha tezlikni ta’minlaydi?", opts: ["10 Mbit/s", "100 Mbit/s", "1 Gbit/s", "10 Gbit/s"], ans: 2 },
  { q: "Tarmoq qurilmalarida tizim vaqtini sinxronlashtirish uchun qaysi protokol ishlatiladi?", opts: ["SNTP / NTP", "ARP", "SMTP", "ICMP"], ans: 0 }
];
