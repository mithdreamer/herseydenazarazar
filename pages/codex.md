# Teknoloji Sözlüğü - DevTools Kategorisi Ekleme Talimatı

## Amaç

Mevcut Teknoloji Sözlüğü sitesine yeni bir ana kategori olarak **DevTools** eklenecek.

DevTools kategorisi, tarayıcı geliştirici araçlarını başlangıç seviyesinde anlatacak.

---

## 1. index.html Güncellemesi

Ana sayfadaki kategori kartlarına yeni bir kart ekle:

### DevTools

Açıklama:

```text
Tarayıcı üzerinde HTML, CSS ve JavaScript kodlarını incelemek, test etmek ve hata ayıklamak için kullanılan geliştirici araçları.
```

Link:

```text
pages/devtools.html
```

Ana sayfadaki kategori listesi artık şu şekilde olmalı:

```text
HTML Terimleri
CSS Terimleri
JavaScript Terimleri
Python Terimleri
DevTools
```

---

## 2. Yeni Sayfa Oluştur

Yeni dosya oluştur:

```text
pages/devtools.html
```

Sayfa başlığı:

```text
DevTools
```

Navbar içinde şu link olsun:

```html
<a href="../index.html">Ana Sayfa</a>
```

---

## 3. DevTools Sayfasındaki İlk Kartlar

Sayfada şimdilik aşağıdaki bilgi kartları olsun:

---

### Elements Paneli

Açıklama:

```text
Elements paneli, sayfadaki HTML yapısını ve CSS stillerini canlı olarak incelemeye yarayan DevTools bölümüdür.
```

---

### Console Paneli

Açıklama:

```text
Console paneli, JavaScript çıktılarının görüldüğü ve kısa JavaScript komutlarının test edilebildiği DevTools bölümüdür.
```

---

### Sources Paneli

Açıklama:

```text
Sources paneli, tarayıcıda çalışan HTML, CSS ve JavaScript dosyalarını incelemek ve hata ayıklamak için kullanılan DevTools bölümüdür.
```

Ek açıklama:

```text
Sources panelinde breakpoint koyabilir, kodu satır satır çalıştırabilir, değişken değerlerini inceleyebilir ve hatanın hangi satırda oluştuğunu görebilirsin.
```

---

### Network Paneli

Açıklama:

```text
Network paneli, web sayfasının yüklediği dosyaları, API isteklerini, cevap sürelerini ve durum kodlarını incelemek için kullanılır.
```

---

### Application Paneli

Açıklama:

```text
Application paneli, localStorage, sessionStorage, cookies ve cache gibi tarayıcıda saklanan verileri incelemek için kullanılır.
```

---

## 4. Sources Paneli İçin Özel Not Alanı

Sources kartının içine veya altına şu mini öğrenme notu eklenebilir:

```text
Öğrenme Notu:
Sources paneli özellikle JavaScript hatalarını bulmak için önemlidir. Kodun belirli bir satırına breakpoint koyarak programın o noktada durmasını sağlayabilirsin.
```

---

## 5. Tasarım Kuralları

Mevcut class isimleri korunmalı:

```text
container
navbar
info-grid
info-card
tech-grid
tech-card
```

DevTools sayfasında kartlar şu yapı ile oluşturulmalı:

```html
<div class="info-card">
  <h2>Sources Paneli</h2>
  <p>Sources paneli, tarayıcıda çalışan HTML, CSS ve JavaScript dosyalarını incelemek ve hata ayıklamak için kullanılan DevTools bölümüdür.</p>
</div>
```

Kodlar temiz, okunabilir ve girintili olmalı.

---

## 6. Eski Sayfalar

Mevcut HTML, CSS, JavaScript ve Python terimleri sayfaları bozulmamalı.

Sadece:

* index.html güncellenecek
* pages/devtools.html oluşturulacak
