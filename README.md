# Kompyuter Tarmoqlari — O'quv Platformasi

Ushbu loyiha **Kompyuter tarmoqlari** fani bo'yicha 12 ta nazariy, 12 ta amaliy va 8 ta virtual laboratoriya mashg'ulotlarini o'z ichiga olgan interaktiv o'quv platformasidir.

## Papka tuzilmasi

```text
kompyuter-tarmoqlari-platforma/
├── index.html             # Asosiy kirish sahifasi
├── css/
│   └── styles.css         # Maxsus uslublar va chop etish (sertifikat) stillari
├── js/
│   ├── data.js            # 12 nazariy/amaliy mavzu, 8 lab va test savollari
│   ├── db.js              # Ma'lumotlar bazasi (localStorage) va holat boshqaruvi
│   └── app.js             # Platforma interfeysi, videodars, CLI simulyator, admin panel
├── database/
│   ├── schema.sql         # SQLite / PostgreSQL jadvallar sxemasi
│   └── seed.sql           # Boshlang'ich mavzu va laboratoriya ma'lumotlari
├── .gitignore
└── README.md
```

## GitHub Pages da public qilish (3 qadam)

1. GitHubda yangi **Public** repository yarating (masalan, `kompyuter-tarmoqlari`).
2. Ushbu papkadagi barcha fayllarni repositoryga yuklang (`git push` yoki *Upload files* orqali).
3. Repository **Settings -> Pages -> Branch: `main` / `(root)`** ni tanlab **Save** bosing. Bir necha soniyadan so'ng saytingiz jonli havolada ochiladi!

## Sinov hisoblari

- **Talaba:** `azizbek@tuit.uz` / parol: `123`
- **Bitiruvchi:** `madina@tuit.uz` / parol: `123`
- **Admin:** `admin@tuit.uz` / parol: `admin123`
