(function () {
  const fallbackTemplate = `
    <nav class="navbar" aria-label="Ana menü">
      <a class="navbar__home" data-nav-key="home" data-href="index.html" href="#">Ana Sayfa</a>
      <div class="navbar__sections" aria-label="Site bölümleri">
        <span class="navbar__label">Site Bölümleri</span>
        <a data-nav-key="web-gelistirme" data-href="pages/web-gelistirme.html" href="#">Web Geliştirme</a>
        <a data-nav-key="yazilim-araclari" data-href="pages/yazilim-araclari.html" href="#">Yazılım Araçları</a>
        <a data-nav-key="veritabani" data-href="pages/veritabani.html" href="#">Veritabanı</a>
        <a data-nav-key="yapay-zeka" data-href="pages/yapay-zeka.html" href="#">Yapay Zeka</a>
        <a data-nav-key="yazilim" data-href="pages/yazilim.html" href="#">Yazılım</a>
        <a data-nav-key="arduino" data-href="pages/arduino.html" href="#">Arduino</a>
        <a data-nav-key="3d-baski" data-href="pages/3d-baski.html" href="#">3D Baskı</a>
        <a data-nav-key="siber-guvenlik" data-href="pages/siber-guvenlik.html" href="#">Siber Güvenlik</a>
        <a data-nav-key="dijital-araclar" data-href="pages/dijital-araclar.html" href="#">Dijital Araçlar</a>
      </div>
    </nav>
  `;

  const script = document.currentScript;
  const componentUrl = new URL("navbar.html", script.src);

  function joinRoot(root, href) {
    const cleanRoot = root && root !== "." ? root.replace(/\/$/, "") : "";
    return cleanRoot ? `${cleanRoot}/${href}` : href;
  }

  function render(template) {
    document.querySelectorAll("[data-component='navbar']").forEach((target) => {
      const root = target.dataset.root || ".";
      const current = target.dataset.current || "home";

      target.innerHTML = template;

      target.querySelectorAll("[data-href]").forEach((link) => {
        link.setAttribute("href", joinRoot(root, link.dataset.href));
      });

      target.querySelectorAll("[data-nav-key]").forEach((link) => {
        if (link.dataset.navKey === current) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }

  fetch(componentUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Navbar component could not be loaded.");
      }
      return response.text();
    })
    .then(render)
    .catch(() => render(fallbackTemplate));
})();
