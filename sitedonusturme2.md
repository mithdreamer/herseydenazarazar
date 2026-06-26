# Teknoloji Sözlüğü - JSON Tabanlı İçerik Sistemine Geçiş

## Amaç

Mevcut Teknoloji Sözlüğü sitesinde kategori ve terim kartları HTML içine manuel yazılıyor.

Bu yapı değiştirilecek.

Yeni hedef:

* Kategoriler JSON dosyasından gelecek.
* Terimler JSON dosyasından gelecek.
* `index.html` kategori kartlarını otomatik oluşturacak.
* Kategori sayfası terimleri otomatik listeleyecek.
* Yeni kategori veya yeni terim eklemek için HTML değiştirmek gerekmeyecek.
* İlk fazda sadece JSON + JavaScript kullanılacak.
* İkinci fazda admin paneli eklenecek.
* Üçüncü fazda veritabanı bağlantısı yapılabilecek.

---

# 1. Yeni Klasör Yapısı

Mevcut yapıya şu klasör ve dosyalar eklensin:

```text
teknoloji-sozlugu/
├── index.html
├── category.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── category.js
└── data/
    └── terms.json
```

Not:

Eski `pages/html-terimleri.html`, `pages/css-terimleri.html`, `pages/javascript-terimleri.html`, `pages/python-terimleri.html`, `pages/devtools.html` dosyaları şimdilik silinmesin. Ancak yeni sistemde ana kullanım `category.html` üzerinden ilerlesin.

---

# 2. JSON Veri Yapısı

Yeni dosya oluştur:

```text
data/terms.json
```

İçeriği şu yapıda olsun:

```json
{
  "categories": [
    {
      "id": "html",
      "title": "HTML Terimleri",
      "description": "Web sayfalarının temel yapı taşlarını oluşturan HTML etiketleri ve kavramları.",
      "terms": [
        {
          "title": "div",
          "definition": "HTML içerisinde içerikleri gruplamak için kullanılan genel amaçlı blok elementidir.",
          "example": "<div>Merhaba Dünya</div>",
          "usage": "Sayfa bölümleri, kartlar, kutular ve layout yapıları oluşturmak için kullanılır.",
          "related": ["section", "article", "span"]
        },
        {
          "title": "span",
          "definition": "Metin içinde küçük bir bölümü seçmek veya stillendirmek için kullanılan satır içi HTML elementidir.",
          "example": "<span>Öne çıkan metin</span>",
          "usage": "Metin içinde belirli kelimeleri renklendirmek veya işaretlemek için kullanılır.",
          "related": ["div", "strong", "em"]
        }
      ]
    },
    {
      "id": "css",
      "title": "CSS Terimleri",
      "description": "Web sitelerinin görünümünü oluşturan CSS özellikleri ve tasarım kavramları.",
      "terms": [
        {
          "title": "flex",
          "definition": "Elemanların yatay veya dikey eksende kolayca hizalanmasını sağlayan CSS yerleşim sistemidir.",
          "example": "display: flex;",
          "usage": "Navbar, kart sistemleri, dashboardlar ve hizalama işlemlerinde kullanılır.",
          "related": ["display", "justify-content", "align-items", "gap"]
        },
        {
          "title": "padding",
          "definition": "Bir elementin içeriği ile kenarlığı arasındaki iç boşluğu belirleyen CSS özelliğidir.",
          "example": "padding: 12px 24px;",
          "usage": "Buton, kart ve kutuların daha okunabilir görünmesi için kullanılır.",
          "related": ["margin", "border", "box-sizing"]
        }
      ]
    },
    {
      "id": "javascript",
      "title": "JavaScript Terimleri",
      "description": "Web sayfalarına etkileşim kazandıran JavaScript kavramları ve fonksiyonları.",
      "terms": [
        {
          "title": "querySelector",
          "definition": "CSS seçicisi kullanarak HTML içerisindeki ilk eşleşen elementi seçmeye yarayan JavaScript metodudur.",
          "example": "const button = document.querySelector('.btn');",
          "usage": "Buton, form, kart veya herhangi bir HTML elemanını JavaScript ile kontrol etmek için kullanılır.",
          "related": ["querySelectorAll", "DOM", "addEventListener"]
        },
        {
          "title": "addEventListener",
          "definition": "Bir HTML elementinde gerçekleşen tıklama, yazma veya değişiklik gibi olayları dinleyen JavaScript metodudur.",
          "example": "button.addEventListener('click', function() { alert('Merhaba'); });",
          "usage": "Buton tıklamaları, form işlemleri ve kullanıcı etkileşimlerinde kullanılır.",
          "related": ["click", "function", "DOM"]
        }
      ]
    },
    {
      "id": "python",
      "title": "Python Terimleri",
      "description": "Python programlama dilinde sık kullanılan temel kavramlar.",
      "terms": [
        {
          "title": "list",
          "definition": "Birden fazla değeri sıralı şekilde saklamak için kullanılan Python veri yapısıdır.",
          "example": "meyveler = ['elma', 'armut', 'muz']",
          "usage": "Birden fazla veriyi tek değişkende saklamak için kullanılır.",
          "related": ["tuple", "dictionary", "for"]
        },
        {
          "title": "dictionary",
          "definition": "Anahtar-değer mantığıyla çalışan veri saklama yapısıdır.",
          "example": "kisi = {'ad': 'Korhan', 'meslek': 'Gümrük'}",
          "usage": "Bir veriyi açıklayıcı anahtarlarla saklamak için kullanılır.",
          "related": ["list", "json", "key", "value"]
        }
      ]
    },
    {
      "id": "devtools",
      "title": "DevTools",
      "description": "Tarayıcı üzerinde HTML, CSS ve JavaScript kodlarını incelemek, test etmek ve hata ayıklamak için kullanılan geliştirici araçları.",
      "terms": [
        {
          "title": "Sources Paneli",
          "definition": "Tarayıcıda çalışan HTML, CSS ve JavaScript dosyalarını incelemek ve hata ayıklamak için kullanılan DevTools bölümüdür.",
          "example": "Bir JavaScript satırına breakpoint koyup kodun o noktada durmasını sağlayabilirsin.",
          "usage": "JavaScript hatalarını bulmak, kodu satır satır çalıştırmak ve değişkenleri incelemek için kullanılır.",
          "related": ["Breakpoint", "Console", "Call Stack", "Scope"]
        }
      ]
    }
  ]
}
```

---

# 3. index.html Güncellemesi

`index.html` artık kategori kartlarını manuel içermesin.

Ana yapısı şöyle olsun:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Teknoloji Sözlüğü</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header class="hero">
    <h1>Teknoloji Sözlüğü</h1>
    <p>HTML, CSS, JavaScript, Python ve geliştirici araçlarını kısa açıklamalarla öğrenin.</p>
  </header>

  <main class="container">
    <section id="categoryGrid" class="tech-grid"></section>
  </main>

  <script src="js/app.js"></script>
</body>
</html>
```

---

# 4. app.js Oluştur / Güncelle

`js/app.js` dosyası `data/terms.json` dosyasını okuyacak ve ana sayfadaki kategori kartlarını oluşturacak.

```javascript
const categoryGrid = document.querySelector("#categoryGrid");

async function loadCategories() {
  try {
    const response = await fetch("data/terms.json");

    if (!response.ok) {
      throw new Error("JSON dosyası yüklenemedi.");
    }

    const data = await response.json();

    categoryGrid.innerHTML = "";

    data.categories.forEach((category) => {
      const card = document.createElement("div");
      card.className = "tech-card";

      card.innerHTML = `
        <h2>${category.title}</h2>
        <p>${category.description}</p>
        <a href="category.html?id=${category.id}">İncele</a>
      `;

      categoryGrid.appendChild(card);
    });
  } catch (error) {
    categoryGrid.innerHTML = "<p>Kategoriler yüklenirken bir hata oluştu.</p>";
    console.error(error);
  }
}

loadCategories();
```

---

# 5. category.html Oluştur

Tüm kategoriler için tek ortak sayfa kullanılacak.

Yeni dosya:

```text
category.html
```

İçerik:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Teknoloji Sözlüğü</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <nav class="navbar">
    <a href="index.html">Ana Sayfa</a>
  </nav>

  <main class="container">
    <h1 id="categoryTitle">Kategori</h1>
    <p id="categoryDescription"></p>

    <section id="termsGrid" class="info-grid"></section>
  </main>

  <script src="js/category.js"></script>
</body>
</html>
```

---

# 6. category.js Oluştur

Yeni dosya:

```text
js/category.js
```

İçerik:

```javascript
const categoryTitle = document.querySelector("#categoryTitle");
const categoryDescription = document.querySelector("#categoryDescription");
const termsGrid = document.querySelector("#termsGrid");

function getCategoryIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function createRelatedList(relatedTerms) {
  if (!relatedTerms || relatedTerms.length === 0) {
    return "";
  }

  const items = relatedTerms.map((term) => `<li>${term}</li>`).join("");

  return `
    <div class="related-terms">
      <h3>İlgili Terimler</h3>
      <ul>${items}</ul>
    </div>
  `;
}

async function loadCategory() {
  try {
    const categoryId = getCategoryIdFromUrl();

    const response = await fetch("data/terms.json");

    if (!response.ok) {
      throw new Error("JSON dosyası yüklenemedi.");
    }

    const data = await response.json();

    const category = data.categories.find((item) => item.id === categoryId);

    if (!category) {
      categoryTitle.textContent = "Kategori bulunamadı";
      termsGrid.innerHTML = "<p>Aradığınız kategori mevcut değil.</p>";
      return;
    }

    document.title = category.title;
    categoryTitle.textContent = category.title;
    categoryDescription.textContent = category.description;

    termsGrid.innerHTML = "";

    category.terms.forEach((term) => {
      const card = document.createElement("div");
      card.className = "info-card";

      card.innerHTML = `
        <h2>${term.title}</h2>
        <p>${term.definition}</p>

        ${term.example ? `<pre><code>${term.example}</code></pre>` : ""}

        ${term.usage ? `<p><strong>Nerede Kullanılır?</strong><br>${term.usage}</p>` : ""}

        ${createRelatedList(term.related)}
      `;

      termsGrid.appendChild(card);
    });
  } catch (error) {
    categoryTitle.textContent = "Hata";
    termsGrid.innerHTML = "<p>Terimler yüklenirken bir hata oluştu.</p>";
    console.error(error);
  }
}

loadCategory();
```

---

# 7. CSS Eklemeleri

`css/style.css` dosyasının sonuna şu stilleri ekle:

```css
#categoryDescription {
  margin-bottom: 30px;
  color: #555;
  font-size: 18px;
}

.info-card pre {
  background: #f1f5f9;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 14px;
}

.info-card code {
  font-family: Consolas, Monaco, monospace;
}

.related-terms {
  margin-top: 16px;
}

.related-terms h3 {
  font-size: 16px;
  margin-bottom: 8px;
}

.related-terms ul {
  padding-left: 20px;
  margin: 0;
}

.related-terms li {
  margin-bottom: 4px;
}
```

---

# 8. Çalışma Mantığı

Bundan sonra yeni kategori eklemek için sadece `data/terms.json` güncellenecek.

Örnek yeni kategori:

```json
{
  "id": "sql",
  "title": "SQL Terimleri",
  "description": "SQL ve veritabanı sorguları hakkında temel kavramlar.",
  "terms": []
}
```

Yeni terim eklemek için ilgili kategorinin `terms` alanına yeni obje eklenecek.

Örnek:

```json
{
  "title": "SELECT",
  "definition": "Veritabanından veri çekmek için kullanılan SQL komutudur.",
  "example": "SELECT * FROM customers;",
  "usage": "Tablolardan kayıt listelemek için kullanılır.",
  "related": ["FROM", "WHERE", "SQL"]
}
```

---

# 9. Önemli Notlar

* JSON dosyasında virgül hatalarına dikkat edilmeli.
* JSON içinde çift tırnak kullanılmalı.
* `fetch()` bazı durumlarda dosya sisteminde doğrudan açıldığında çalışmayabilir.
* Site mutlaka Live Server veya Netlify gibi bir sunucu üzerinden çalıştırılmalı.
* Mevcut CSS tasarımı bozulmamalı.
* Eski HTML sayfaları şimdilik silinmemeli.
* Yeni sistemde temel kullanım:

  * `index.html`
  * `category.html?id=html`
  * `category.html?id=css`
  * `category.html?id=javascript`
  * `category.html?id=python`
  * `category.html?id=devtools`

---

# 10. Gelecek Fazlar

## Faz 2 - Admin Paneli

Daha sonra `admin.html` oluşturulacak.

Admin panelinde:

* Kategori ekleme
* Terim ekleme
* Terim düzenleme
* Terim silme
* JSON çıktısı alma

özellikleri olacak.

İlk admin paneli veritabanına bağlanmayacak. Tarayıcı içinde çalışacak ve JSON formatında çıktı üretecek.

## Faz 3 - Veritabanı

Daha sonraki fazda içerikler JSON yerine veritabanından gelecek.

Olası seçenekler:

* SQLite
* Supabase
* Firebase
* PostgreSQL

Bu nedenle JavaScript yapısı temiz ve modüler tutulmalı.
