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
          <a data-href="pages/web-gelistirme.html" href="#">Web Geliştirme</a>
          <a data-href="pages/yazilim-araclari.html" href="#">Yazılım Araçları</a>
          <a data-href="pages/veritabani.html" href="#">Veritabanı</a>
          <a data-href="pages/yapay-zeka.html" href="#">Yapay Zeka</a>
          <a data-href="pages/yazilim.html" href="#">Yazılım</a>
          <a data-href="pages/arduino.html" href="#">Arduino</a>
          <a data-href="pages/3d-baski.html" href="#">3D Baskı</a>
          <a data-href="pages/siber-guvenlik.html" href="#">Siber Güvenlik</a>
          <a data-href="pages/dijital-araclar.html" href="#">Dijital Araçlar</a>
          <a data-href="pages/ag-ve-internet.html" href="#">Ağ ve İnternet</a>
          <a data-href="pages/donanim.html" href="#">Donanım</a>
          <a data-href="pages/isletim-sistemleri.html" href="#">İşletim Sistemleri</a>
          <a data-href="pages/bulut-ve-devops.html" href="#">Bulut ve DevOps</a>
          <a data-href="pages/mobil-gelistirme.html" href="#">Mobil Geliştirme</a>
          <a data-href="pages/veri-bilimi.html" href="#">Veri Bilimi</a>
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
