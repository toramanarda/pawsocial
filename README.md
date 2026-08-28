# Doggo Social

**Doggo Social, evcil hayvan sahipleri ve hayvanseverlerin deneyimlerini, anlarını ve ipuçlarını paylaştığı; modern, duyarlı (responsive) ve topluluk odaklı bir mikroblog platformudur.**

**Canlı Demo (Live Deployment):** https://doggo-social.vercel.app/

 # 1. Projenin Çalıştırılması

```bash
Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları uygulayabilirsiniz:

1. Bağımlılıkları yükleyin
npm install

2. Geliştirme sunucusunu başlatın
npm run dev

Tarayıcınızdan http://localhost:3000 adresini açarak uygulamayı test edebilirsiniz.
```

# Testleri Çalıştırma:

```bash
Test paketini çalıştırmak için:
npm test

İzleme (watch) modunda çalıştırmak için:
npm run test:watch

# 2. Kullanılan Teknoloji ve Kütüphaneler

Framework: Next.js 15+ (App Router & Turbopack)

UI & Styling: React 19, Tailwind CSS v4 (Özel renk paleti ve tasarım token'ları)

Icons: Lucide React

State Management: React Context API + Custom Hook (AppContext)

Testing: Jest, React Testing Library, @testing-library/user-event, jest-environment-jsdom
```

# 3. Temel Mimari Kararlar

```bash
Next.js App Router Mimarisi: Düzen ve statik iskelet sunucu tarafında yapılandırılırken, etkileşimli akış (feed), arama, filtrelemeler, modal ve form alanları "use client" direktifleriyle optimize edilmiştir.

Merkezi Durum Yönetimi (AppContext): Gönderi oluşturma, beğeni (like), kaydetme (bookmark), takip ve bildirim aksiyonlarının tüm sayfalarda (Home, Discover, Bookmarks, Notifications, Profile) eşzamanlı kalması amacıyla Context API kullanılmıştır.

Optimistic UI: Beğeni ve kaydetme gibi anlık geri bildirim gerektiren etkileşimlerde arayüz gecikmesiz tepki verir.

Responsive & Mobile-First Navigasyon: Masaüstünde 3 kolonlu (Sidebar, Feed, Right Utility) düzen sunulurken; mobilde global MobileHeader (hamburger çekmece menü, logo ve hızlı post butonu) ile MobileNav (alt bar) entegre edilmiştir.
```

# 4. Önemli Trade-off'lar

```bash
In-Memory State vs. Persistent Storage: Veriler oturum boyunca bellekte (In-Memory) tutulmaktadır. Harici bir veritabanı bağımlılığı olmadan sıfır konfigürasyonla çalışabilmesi amacıyla bu yaklaşım tercih edilmiştir.

Context API vs. Redux/Zustand: Uygulama ölçeği gereksiz boilerplate koddan kaçınmak için hafif ve React ile yerel çalışan Context API ile yönetilmiştir.

Client-Side Search: Arama ve filtreleme işlemleri mock veri üzerinde istemci tarafında anlık çalışacak şekilde kurgulanmıştır.
```

# 5. Bilinen Eksikler / Limitations

```bash
Sayfa tam olarak yenilendiğinde (hard reload) oluşturulan yeni gönderiler, beğeniler ve bildirimler başlangıç mock verisine sıfırlanır.

Görsel yüklemeleri istemci tarafında FileReader (Base64) ile işlenmektedir, harici bir bulut depolama servisine (S3/Cloudinary vb.) aktarılmaz.

Birebir mesajlaşma (DM) ve detaylı profil ayarları modülü kapsam dışı bırakılmıştır.
```

# 6. Daha Fazla Zaman Olması Durumunda Yapılabilecek Geliştirmeler

```bash
Backend & Database Entegrasyonu: PostgreSQL/Prisma veya Supabase altyapısı ile kalıcı veri tabanı katmanı.

Gerçek Zamanlı Bildirimler (WebSocket): Anlık beğeni, yorum ve bildirimler için Socket.io entegrasyonu.

Virtual Scrolling: Akışta yüzlerce gönderi olduğunda DOM performansını korumak için react-virtual kullanımı.

E2E Testler: Cypress veya Playwright ile uçtan uca kullanıcı senaryosu testleri.

PWA (Progressive Web App): Mobil cihazlara yüklenebilirlik ve offline önbellek desteği.
```

# 7. Test Stratejisi

```bash
**Tüm uygulamanın genel kod kapsamı yerine, en yüksek risk taşıyan ve kullanıcı deneyimini doğrudan etkileyen kritik kullanıcı akışlarına (Critical User Flows) odaklanılmıştır.**

Hangi Akışlar Test Edildi?
Gönderi Oluşturma ve Validasyon Akışı (__tests__/CreatePost.test.jsx):

Boş içerik durumunda gönderi butonunun disabled olması.

Metin girildiğinde butonun aktifleşmesi ve gönderim sonrasında form alanının temizlenmesi.

topic/hashtag kısayol butonunun metin alanına doğru şekilde etiket eklemesi.

Gönderi Etkileşim Akışı (__tests__/PostInteraction.test.jsx):

Gönderi kartındaki etkileşim butonlarının (Yorum, Repost, Beğeni) DOM üzerinde doğru render edilmesi.

Beğeni butonuna tıklandığında etkileşimin başarıyla tetiklenmesi ve arayüzün tepki vermesi.
```

 **Neden Özellikle Bu Akışlar Seçildi?**
```bash
Platformun Çekirdek Değeri: Bir sosyal ağ uygulamasında kullanıcıların içerik üretmesi ve gönderilerle etkileşime geçmesi temel işlevdir; bu akışlardaki bir aksaklık tüm kullanıcı deneyimini doğrudan bozar.

State Tutarlılığı: Gönderi ekleme ve beğeni tetiklemeleri global state ile en yoğun temas eden ve regresyona en açık alanlardır.
```

# 8. AI Usage (Yapay Zeka Araçlarının Kullanımı)

Bu projede geliştirme hızını ve kod kalitesini artırmak amacıyla Yapay Zeka (LLM) araçlarından destek alınmıştır.

Kullanılan AI Araçları

Gemini : Yazılım mimarisi desteği, kod refactoring ve dokümantasyon sürecinde kullanılmıştır.

```bash 
Hangi Konularda Destek Alındı?

Git & Commit Standardizasyonu: Commit mesajlarının profesyonel standartlara (Conventional Commits) uygun olarak İngilizce formatta tutarlı bir şekilde üretilmesi ve düzenlenmesi.

Bug Abuse & Uç Durum (Edge-Case) Analizleri:

Boş gönderi paylaşımı, 280 karakter üst sınırı aşımı gibi form manipülasyonlarının önlenmesi.

Hızlı ardışık buton tıklamalarında (spam/like clicking) state tutarlılığı ve Optimistic UI sınırlarının belirlenmesi.

Sayfa geçişlerinde responsive elementlerin (Hamburger Drawer, Modallar) DOM sızıntısı yapmadan temiz kapanmasının kurgulanması.

Test Kurgusu ve Mock Yapılandırması: Jest ve React Testing Library ile kritik akışların simüle edilmesi, mock verilerin AppContext ile izole şekilde çalışması için test suite yapısının oluşturulması.

Not: AI tarafından önerilen tüm kod blokları ve mimari kararlar manuel olarak incelenmiş, projenin tasarım diline ve gereksinimlerine göre uyarlanmıştır. Kodun teknik davranış ve sorumluluğu geliştiriciye aittir.
```
