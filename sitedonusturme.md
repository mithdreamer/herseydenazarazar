# Her Şeyden Azar Azar Site Dönüşüm Talimatı

Mevcut `her-seyden-azar-azar` projesini aşağıdaki yeni bilgi bankası yapısına dönüştür.

## 1. Genel Amaç

Site, teknoloji konularını kısa ve başlangıç seviyesinde anlatan bir bilgi bankası olacak.

Ana sayfada yalnızca ana kategoriler yer alacak:

* Web Geliştirme
* Yazılım Araçları
* Veritabanı
* Yapay Zeka

Her ana kategori kendi HTML sayfasına gidecek.
Her kategori sayfasında o kategoriye ait bilgi kartları yer alacak.

## 2. Klasör Yapısı

Mevcut yapı korunabilir:

```text
her-seyden-azar-azar/
├── index.html
├── pages/
│   ├── web-gelistirme.html
│   ├── yazilim-araclari.html
│   ├── veritabani.html
│   └── yapay-zeka.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

Eski kullanılmayan sayfalar varsa şimdilik silinmesin.
Ancak `index.html` sadece yeni 4 ana kategoriye link versin.

## 3. index.html Güncellemesi

`index.html` ana sayfası şu 4 karttan oluşsun:

### Web Geliştirme

Açıklama:

```text
HTML, CSS, JavaScript ve modern web sayfalarının temel kavramları hakkında kısa bilgiler.
```

Link:

```text
pages/web-gelistirme.html
```

### Yazılım Araçları

Açıklama:

```text
Git, GitHub, VS Code ve yazılım geliştirme sürecinde kullanılan temel araçlar.
```

Link:

```text
pages/yazilim-araclari.html
```

### Veritabanı

Açıklama:

```text
SQL, tablolar ve veritabanı ilişkileri hakkında başlangıç seviyesinde bilgiler.
```

Link:

```text
pages/veritabani.html
```

### Yapay Zeka

Açıklama:

```text
Yapay zeka, LLM ve prompt kavramları hakkında kısa ve sade bilgiler.
```

Link:

```text
pages/yapay-zeka.html
```

## 4. Web Geliştirme Sayfası

Dosya adı:

```text
pages/web-gelistirme.html
```

Sayfa başlığı:

```text
Web Geliştirme
```

Bu sayfada aşağıdaki bilgi kartları olsun:

### HTML Nedir?

```text
HTML, web sayfalarının iskeletini oluşturan işaretleme dilidir. Başlık, paragraf, bağlantı, görsel ve liste gibi içerikler HTML ile oluşturulur.
```

### CSS Nedir?

```text
CSS, web sayfalarının görünümünü düzenleyen stil dilidir. Renkler, yazı tipleri, boşluklar, hizalama ve responsive tasarım CSS ile yapılır.
```

### JavaScript Nedir?

```text
JavaScript, web sayfalarına hareket ve etkileşim kazandıran programlama dilidir. Buton tıklamaları, formlar, animasyonlar ve dinamik içerikler JavaScript ile kontrol edilebilir.
```

### DOM Nedir?

```text
DOM, HTML sayfasının tarayıcı tarafından nesne yapısına dönüştürülmüş halidir. JavaScript, DOM sayesinde sayfadaki başlık, buton veya kart gibi elemanlara erişip onları değiştirebilir.
```

### Event Listener Nedir?

```text
Event listener, kullanıcının yaptığı bir işlemi dinleyen JavaScript yapısıdır. Örneğin bir butona tıklanınca belirli bir kodun çalışmasını sağlar.
```

### API Nedir?

```text
API, farklı yazılımların birbiriyle konuşmasını sağlayan arayüzdür. Örneğin bir web sitesi hava durumu bilgisini başka bir servisten API ile alabilir.
```

### JSON Nedir?

```text
JSON, verileri düzenli ve okunabilir şekilde taşımak için kullanılan hafif bir veri formatıdır. API cevaplarında sıkça kullanılır.
```

### Modal Nedir?

```text
Modal, mevcut sayfanın üzerine açılan küçük pencere yapısıdır. Giriş formu, kayıt ekranı, uyarı mesajı veya silme onayı gibi işlemlerde kullanılabilir.
```

### SEO Nedir?

```text
SEO, web sitelerinin Google gibi arama motorlarında daha görünür hale gelmesi için yapılan teknik ve içerik çalışmalarının genel adıdır.
```

### Responsive Tasarım Nedir?

```text
Responsive tasarım, web sitesinin bilgisayar, tablet ve telefon gibi farklı ekran boyutlarına uyumlu görünmesini sağlayan tasarım yaklaşımıdır.
```

## 5. Yazılım Araçları Sayfası

Dosya adı:

```text
pages/yazilim-araclari.html
```

Sayfa başlığı:

```text
Yazılım Araçları
```

Bilgi kartları:

### Git Nedir?

```text
Git, kod değişikliklerini takip etmek için kullanılan versiyon kontrol sistemidir. Projede yapılan değişiklikleri kaydetmeye ve gerektiğinde eski hallere dönmeye yardımcı olur.
```

### GitHub Nedir?

```text
GitHub, Git ile yönetilen projelerin çevrimiçi olarak saklanmasını ve paylaşılmasını sağlayan platformdur. Takım çalışması ve proje yayını için sıkça kullanılır.
```

### Branch Nedir?

```text
Branch, bir projede ana kodu bozmadan farklı bir geliştirme alanı oluşturmaya yarar. Yeni özellikler genellikle ayrı branch üzerinde geliştirilir.
```

### Commit Nedir?

```text
Commit, projede yapılan değişikliklerin Git geçmişine kaydedilmiş halidir. Her commit, yapılan işin kısa bir açıklamasıyla birlikte saklanır.
```

### VS Code Nedir?

```text
VS Code, yazılım geliştirmek için kullanılan popüler ve hafif bir kod editörüdür. HTML, CSS, JavaScript, Python ve birçok dili destekler.
```

## 6. Veritabanı Sayfası

Dosya adı:

```text
pages/veritabani.html
```

Sayfa başlığı:

```text
Veritabanı
```

Bilgi kartları:

### SQL Nedir?

```text
SQL, veritabanındaki verileri sorgulamak, eklemek, güncellemek ve silmek için kullanılan dildir.
```

### Tablo Nedir?

```text
Tablo, veritabanında bilgilerin satır ve sütunlar halinde saklandığı yapıdır. Örneğin müşteriler, ürünler veya siparişler ayrı tablolar halinde tutulabilir.
```

### Primary Key Nedir?

```text
Primary key, bir tablodaki her kaydı benzersiz şekilde tanımlayan alandır. Genellikle ID alanı primary key olarak kullanılır.
```

### Foreign Key Nedir?

```text
Foreign key, bir tablonun başka bir tabloyla ilişki kurmasını sağlayan alandır. Örneğin sipariş tablosundaki müşteri ID değeri, müşteriler tablosuna bağlanabilir.
```

## 7. Yapay Zeka Sayfası

Dosya adı:

```text
pages/yapay-zeka.html
```

Sayfa başlığı:

```text
Yapay Zeka
```

Bilgi kartları:

### Yapay Zeka Nedir?

```text
Yapay zeka, bilgisayar sistemlerinin insan benzeri şekilde öğrenme, yorumlama, karar verme veya içerik üretme yetenekleri kazanmasını sağlayan teknolojiler bütünüdür.
```

### LLM Nedir?

```text
LLM, büyük dil modeli anlamına gelir. Çok büyük metin verileriyle eğitilen ve metin anlama, yazma, özetleme, çeviri ve soru cevaplama gibi görevleri yapabilen yapay zeka modelidir.
```

### Prompt Nedir?

```text
Prompt, yapay zekaya verilen komut veya yönergedir. Yapay zekadan nasıl bir cevap beklendiğini prompt ile tarif ederiz.
```

## 8. Tasarım Kuralları

Mevcut `style.css` kullanılmaya devam edebilir.

Kart yapısı için mevcut class isimleri korunmalı:

```text
tech-card
info-card
tech-grid
info-grid
container
navbar
hero
```

Yeni sayfalarda navbar içinde en az şu link olsun:

```html
<a href="../index.html">Ana Sayfa</a>
```

İstenirse kategori sayfalarının navbarına diğer kategori linkleri de eklenebilir.

## 9. Önemli Notlar

* Mevcut CSS ve JS bağlantıları bozulmamalı.
* `index.html` içindeki eski kategoriler yerine yeni 4 ana kategori gösterilmeli.
* SEO ve Modal ayrı ana kategori olmayacak.
* SEO ve Modal, `web-gelistirme.html` içinde bilgi kartı olarak yer alacak.
* Kodlar temiz, okunabilir ve girintili yazılmalı.
* Türkçe karakterler korunmalı.
* Tüm HTML dosyalarında `<meta charset="UTF-8">` bulunmalı.
