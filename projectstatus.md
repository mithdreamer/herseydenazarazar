# Project Status - Her Şeyden Azar Azar

Son güncelleme: 21 Haziran 2026

Bu dosya, `sitedonusturme.md` içindeki ilk site dönüşüm talimatını ve sonradan yapılan geliştirmeleri tek proje durum dokümanında toplar.

## Kaynak Talimat

Ana kaynak dosya:

```text
sitedonusturme.md
```

`sitedonusturme.md` dosyasındaki temel hedefler:

- Site, teknoloji konularını kısa ve başlangıç seviyesinde anlatan bir bilgi bankası olacak.
- İlk dönüşümde ana kategoriler `Web Geliştirme`, `Yazılım Araçları`, `Veritabanı` ve `Yapay Zeka` olarak planlandı.
- Her kategori kendi HTML sayfasına gidecek.
- Kategori sayfalarında bilgi kartları bulunacak.
- `tech-card`, `info-card`, `tech-grid`, `info-grid`, `container`, `navbar`, `hero` class isimleri korunacak.
- HTML dosyalarında `<meta charset="UTF-8">` bulunacak.
- Türkçe karakterler korunacak.
- CSS ve JS bağlantıları bozulmayacak.

Sonraki geliştirmelerle kapsam genişletildi:

- Eski silinmeyen sayfalar ana kategori mantığına dahil edildi.
- Ana sayfadaki kategori sayısı 9'a çıkarıldı.
- Navbar ve footer component yapısına taşındı.
- Ana sayfadaki kategori başlıklarına modal önizleme eklendi.
- `İncele` linkleri ilgili kategori sayfasına gitmeye devam ediyor.

## Mevcut Dosya Yapısı

```text
her-seyden-azar-azar/
├── index.html
├── sitedonusturme.md
├── projectstatus.md
├── css/
│   └── style.css
├── js/
│   └── app.js
├── components/
│   ├── navbar/
│   │   ├── navbar.html
│   │   ├── navbar.css
│   │   └── navbar.js
│   └── footer/
│       ├── footer.html
│       ├── footer.css
│       └── footer.js
└── pages/
    ├── web-gelistirme.html
    ├── yazilim-araclari.html
    ├── veritabani.html
    ├── yapay-zeka.html
    ├── yazilim.html
    ├── arduino.html
    ├── 3d-baski.html
    ├── siber-guvenlik.html
    └── dijital-araclar.html
```

## Mevcut Sayfalar

Ana sayfa:

- `index.html`
- 9 kategori kartı içerir.
- Kategori başlığına tıklanınca modal açılır.
- Modal içinde ilgili kategoriye ait alt başlıklar `ul` listesi olarak görünür.
- `İncele` linkine tıklanınca ilgili kategori sayfasına gidilir.

Kategori sayfaları:

| Sayfa | Kart Sayısı | Durum |
| --- | ---: | --- |
| `pages/web-gelistirme.html` | 10 | Hazır |
| `pages/yazilim-araclari.html` | 5 | Hazır |
| `pages/veritabani.html` | 4 | Hazır |
| `pages/yapay-zeka.html` | 3 | Hazır |
| `pages/yazilim.html` | 6 | Hazır |
| `pages/arduino.html` | 6 | Hazır |
| `pages/3d-baski.html` | 6 | Hazır |
| `pages/siber-guvenlik.html` | 6 | Hazır |
| `pages/dijital-araclar.html` | 6 | Hazır |

## Component Durumu

Navbar componenti:

- HTML: `components/navbar/navbar.html`
- CSS: `components/navbar/navbar.css`
- JS: `components/navbar/navbar.js`
- Sayfalara `data-component="navbar"` placeholder'ı ile dahil edilir.
- `data-root` ile link yolları sayfanın konumuna göre ayarlanır.
- `data-current` ile aktif sayfa işaretlenir.

Footer componenti:

- HTML: `components/footer/footer.html`
- CSS: `components/footer/footer.css`
- JS: `components/footer/footer.js`
- Sayfalara `data-component="footer"` placeholder'ı ile dahil edilir.
- Footer içinde `Site Bölümleri` ve `Diğer Sayfalar` alanları vardır.
- İleride yeni sayfalar footer'a bu component üzerinden eklenebilir.

## Modal Davranışı

Ana sayfada kategori başlıkları tıklanabilir buton olarak düzenlendi.

Mevcut davranış:

- Başlığa tıklanınca modal açılır.
- Modal, kategori içindeki alt başlıkları liste olarak gösterir.
- Modal dışına veya kapatma butonuna tıklanınca modal kapanır.
- Başlıklar görsel olarak tıklanabilir anlaşılacak şekilde alt çizgi ve ok işareti taşır.
- `aria-haspopup="dialog"` ve `aria-expanded` ile erişilebilirlik bilgisi eklenmiştir.

İlgili dosyalar:

- Modal HTML ve template içerikleri: `index.html`
- Modal stilleri: `css/style.css`
- Modal JS davranışı: `js/app.js`

## Tasarım ve Teknik Notlar

- Proje statik HTML, CSS ve JavaScript ile çalışır.
- Build aracı veya paket yöneticisi kullanılmıyor.
- Ana stil dosyası `css/style.css` genel site görünümünü yönetir.
- Navbar ve footer stilleri kendi component CSS dosyalarına ayrıldı.
- Component JS dosyaları component HTML'lerini yükler; yükleme başarısız olursa fallback template kullanır.
- Tüm aktif HTML sayfalarında UTF-8 meta etiketi bulunur.

## Son Doğrulama

Yapılan son kontroller:

- `js/app.js`, `components/navbar/navbar.js` ve `components/footer/footer.js` için JS sözdizimi kontrol edildi.
- HTML/CSS/JS dosyalarında bozuk Türkçe karakter deseni aranıp temiz sonuç alındı.
- HTML dosyalarındaki yerel `href` ve `src` hedefleri kontrol edildi.
- Ana sayfada 9 kategori kartı, 9 modal başlığı ve 9 `İncele` linki doğrulandı.

## Sonraki Mantıklı Adım

Bir sonraki geliştirme olarak kategori sayfalarındaki bilgi kartları sadeleştirilebilir:

- Kartlarda yalnızca başlık gösterilir.
- Başlığa tıklanınca açıklama modal içinde açılır.
- Böylece ana sayfadaki modal mantığı kategori sayfalarına da taşınmış olur.
