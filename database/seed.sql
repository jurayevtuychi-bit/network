-- Boshlang'ich ma'lumotlar (12 ta mavzu, 8 ta laboratoriya va sozlamalar)

INSERT INTO platform_settings (key, value) VALUES
('strict_gating_100', 'true'),
('final_pass_threshold', '80');

INSERT INTO modules (id, theory_title, practical_title) VALUES
(1, 'Kompyuter tarmoqlarining tarixi va qo''llaniladigan texnologiyalari', 'Kompyuterni tashqi qurilmalar bilan bog''lash'),
(2, 'Tarmoq arxitekturasi', 'Ikki kompyuterning o''zaro aloqasini tashkil qilish'),
(3, 'Lokal, shahar va global tarmoqlar va ularning qurilish usullari', 'Kompyuter tarmoqlarida axborot almashinish jarayonini tashkil qilish'),
(4, 'Abonent kirish tarmoqlari', 'MAC va IP-adreslarning tuzilishlari'),
(5, 'Transport tarmoqlari', 'Analog modulyatsiya, raqamli kodlash va analog signallarni diskret modulyatsiyalash'),
(6, 'Klient-server arxitekturalari', 'Ethernet texnologiyasi oilasiga mansub lokal kompyuter tarmoqlarining standartlari va spesifikatsiyalari'),
(7, 'Simsiz sensor tarmoqlar', 'Ethernet tarmog''i konfiguratiyasini to''g''ri qurilganligi aniqlash usuli'),
(8, 'Zamonaviy kompyuter tarmoqlari', 'Ko''prik va kommutatorlarning ishlash tamoillari. Ko''rinmas ko''prik algoritmi'),
(9, 'Internet tarixi va arxitekturasi. Transport va ilova pog''onasi', 'Kommutatorlarning ishlash prinsiplari va tuzilishlari'),
(10, 'Aloqa va marshrutlash. Marshrutlash qurilishi va algoritmlari', 'IP adresining formati va uning turlari'),
(11, 'SDN tarmoqlar. Internet xavfsizligi', 'Internetdagi asosiy xavf-xatarlar. Internet xavfsizligini ta''minlash usullari'),
(12, 'Ilovalar. Internet kelajagi', 'Sun''iy intellekt va Big Data');

INSERT INTO labs (id, title, tool_name) VALUES
(1, 'Tarmoq simulyatorlari bilan ishlash', 'Simulyator asoslari'),
(2, 'Cisco Packet Tracer dasturini sozlash va ishlash jarayonini tekshirish', 'Cisco IOS CLI'),
(3, 'Cisco Packet Tracer dasturida LAN tarmoqlarini qurish', 'LAN & Switch'),
(4, 'Cisco Packet Tracer dasturida WAN tarmoqlarini loyihalash. Statik va dinamik marshrutlash', 'WAN & Routing'),
(5, 'Cisco Packet Tracer dasturida kichik o''lchamli va katta o''lchamli korporativ tarmog''ini loyihalash', 'Enterprise Design'),
(6, 'Cisco Packet Tracer dasturida telnet va SSH protokoli bilan ishlash', 'Remote Access'),
(7, 'Cisco Packet Tracer dasturida SNTP bilan ishlash', 'Time Sync (SNTP)'),
(8, 'Cisco Packet Tracer dasturida port xavfsizligini ta''minlash', 'Port Security');
