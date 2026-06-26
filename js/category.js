(function () {
  const dataUrl = "data/terms.json";
  const categoryTitle = document.querySelector("#categoryTitle");
  const categoryDescription = document.querySelector("#categoryDescription");
  const termsGrid = document.querySelector("#termsGrid");
  const navbarTarget = document.querySelector("[data-component='navbar']");

  if (!categoryTitle || !categoryDescription || !termsGrid) {
    return;
  }

  function createElement(tagName, options = {}) {
    const element = document.createElement(tagName);

    if (options.className) {
      element.className = options.className;
    }

    if (options.text) {
      element.textContent = options.text;
    }

    if (options.attrs) {
      Object.entries(options.attrs).forEach(([name, value]) => {
        element.setAttribute(name, value);
      });
    }

    return element;
  }

  function getCategoryIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  function createRelatedList(relatedTerms) {
    if (!Array.isArray(relatedTerms) || relatedTerms.length === 0) {
      return null;
    }

    const wrapper = createElement("div", { className: "related-terms" });
    const title = createElement("h3", { text: "İlgili Terimler" });
    const list = createElement("ul");

    relatedTerms.forEach((term) => {
      list.appendChild(createElement("li", { text: term }));
    });

    wrapper.append(title, list);
    return wrapper;
  }

  function createTermCard(term) {
    const card = createElement("article", { className: "info-card" });
    const title = createElement("h2", { text: term.title });
    const definition = createElement("p", { text: term.definition });

    card.append(title, definition);

    if (term.example) {
      const pre = createElement("pre");
      const code = createElement("code", { text: term.example });
      pre.appendChild(code);
      card.appendChild(pre);
    }

    if (term.usage) {
      const usage = createElement("p");
      const strong = createElement("strong", { text: "Nerede Kullanılır?" });
      usage.append(strong, document.createElement("br"), document.createTextNode(term.usage));
      card.appendChild(usage);
    }

    const relatedList = createRelatedList(term.related);
    if (relatedList) {
      card.appendChild(relatedList);
    }

    return card;
  }

  function markCurrentNav(categoryId) {
    if (!navbarTarget) {
      return;
    }

    navbarTarget.dataset.current = categoryId;
    navbarTarget.querySelectorAll("[data-nav-key]").forEach((link) => {
      if (link.dataset.navKey === categoryId) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    navbarTarget.querySelectorAll(".navbar__group").forEach((group) => {
      if (group.querySelector("[aria-current='page']")) {
        group.setAttribute("data-current", "true");
      } else {
        group.removeAttribute("data-current");
      }
    });
  }

  function renderCategory(category) {
    document.title = `${category.title} | Her Şeyden Azar Azar`;
    categoryTitle.textContent = category.title;
    categoryDescription.textContent = category.description;
    termsGrid.setAttribute("aria-label", `${category.title} bilgi kartları`);
    termsGrid.replaceChildren();

    const terms = Array.isArray(category.terms) ? category.terms : [];

    terms.forEach((term) => {
      termsGrid.appendChild(createTermCard(term));
    });

    markCurrentNav(category.id);

    if (navbarTarget) {
      const observer = new MutationObserver(() => markCurrentNav(category.id));
      observer.observe(navbarTarget, { childList: true, subtree: true });
    }
  }

  function renderNotFound() {
    categoryTitle.textContent = "Kategori bulunamadı";
    categoryDescription.textContent = "";
    termsGrid.replaceChildren(createElement("p", { text: "Aradığınız kategori mevcut değil." }));
  }

  function renderError() {
    categoryTitle.textContent = "Hata";
    categoryDescription.textContent = "";
    termsGrid.replaceChildren(createElement("p", { text: "Terimler yüklenirken bir hata oluştu." }));
  }

  async function loadCategory() {
    try {
      const categoryId = getCategoryIdFromUrl();
      const response = await fetch(dataUrl);

      if (!response.ok) {
        throw new Error("JSON dosyası yüklenemedi.");
      }

      const data = await response.json();
      const categories = Array.isArray(data.categories) ? data.categories : [];
      const category = categories.find((item) => item.id === categoryId);

      if (!category) {
        renderNotFound();
        return;
      }

      renderCategory(category);
    } catch (error) {
      renderError();
      console.error(error);
    }
  }

  loadCategory();
})();
