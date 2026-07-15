(function () {
  const fallbackTemplate = `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <h2>Her Şeyden Azar Azar</h2>
          <p>Teknoloji kavramları için kısa ve sade notlar.</p>
        </div>

        <nav class="footer-links" aria-label="Alt bilgi site bölümleri">
          <h3>Site Bölümleri</h3>
          <a data-href="category.html?id=web-gelistirme" href="#">Web Geliştirme</a>
          <a data-href="category.html?id=web-mimarisi" href="#">Web Mimarisi</a>
          <a data-href="category.html?id=devtools-terimleri" href="#">DevTools Terimleri</a>
          <a data-href="category.html?id=yazilim-araclari" href="#">Yazılım Araçları</a>
          <a data-href="category.html?id=veritabani" href="#">Veritabanı</a>
          <a data-href="category.html?id=yapay-zeka" href="#">Yapay Zeka</a>
          <a data-href="category.html?id=yazilim" href="#">Yazılım</a>
          <a data-href="category.html?id=arduino" href="#">Arduino</a>
          <a data-href="category.html?id=3d-baski" href="#">3D Baskı</a>
          <a data-href="category.html?id=siber-guvenlik" href="#">Siber Güvenlik</a>
          <a data-href="category.html?id=dijital-araclar" href="#">Dijital Araçlar</a>
          <a data-href="category.html?id=ag-ve-internet" href="#">Ağ ve İnternet</a>
          <a data-href="category.html?id=donanim" href="#">Donanım</a>
          <a data-href="category.html?id=isletim-sistemleri" href="#">İşletim Sistemleri</a>
          <a data-href="category.html?id=bulut-ve-devops" href="#">Bulut ve DevOps</a>
          <a data-href="category.html?id=mobil-gelistirme" href="#">Mobil Geliştirme</a>
          <a data-href="category.html?id=veri-bilimi" href="#">Veri Bilimi</a>
          <a data-href="category.html?id=html-terimleri" href="#">HTML Terimleri</a>
          <a data-href="category.html?id=css-terimleri" href="#">CSS Terimleri</a>
          <a data-href="category.html?id=javascript-terimleri" href="#">JavaScript Terimleri</a>
          <a data-href="category.html?id=python-terimleri" href="#">Python Terimleri</a>
        </nav>

        <nav class="footer-links" aria-label="Alt bilgi diğer sayfalar">
          <h3>Diğer Sayfalar</h3>
          <a data-href="index.html" href="#">Ana Sayfa</a>
        </nav>
      </div>
    </footer>
  `;

  const script = document.currentScript;
  const componentUrl = new URL("footer.html", script.src);

  function joinRoot(root, href) {
    const cleanRoot = root && root !== "." ? root.replace(/\/$/, "") : "";
    return cleanRoot ? `${cleanRoot}/${href}` : href;
  }

  function render(template) {
    document.querySelectorAll("[data-component='footer']").forEach((target) => {
      const root = target.dataset.root || ".";

      target.innerHTML = template;

      target.querySelectorAll("[data-href]").forEach((link) => {
        link.setAttribute("href", joinRoot(root, link.dataset.href));
      });
    });
  }

  fetch(componentUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Footer component could not be loaded.");
      }
      return response.text();
    })
    .then(render)
    .catch(() => render(fallbackTemplate));
})();
