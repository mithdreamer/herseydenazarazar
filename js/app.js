(function () {
  const dataUrl = "data/terms.json";
  const sectionsContainer = document.querySelector("#category-sections");
  const searchInput = document.querySelector("#category-search");
  const status = document.querySelector("#category-search-status");
  const emptyMessage = document.querySelector("#category-search-empty");
  const modal = document.querySelector("#topic-modal");
  const modalTitle = document.querySelector("#topic-modal-title");
  const modalContent = document.querySelector("#topic-modal-content");
  const closeButton = document.querySelector("[data-modal-close]");
  let activeTopicButton = null;
  let searchableCards = [];

  if (!sectionsContainer || !searchInput || !status || !emptyMessage) {
    return;
  }

  function normalizeSearchText(text) {
    return text
      .toLocaleLowerCase("tr-TR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i");
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

  function createSlug(text) {
    return normalizeSearchText(text)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getCategorySearchText(category) {
    const terms = Array.isArray(category.terms) ? category.terms : [];
    const termText = terms
      .map((term) => `${term.title} ${term.definition}`)
      .join(" ");

    return normalizeSearchText([
      category.title,
      category.description,
      category.icon,
      category.group,
      termText,
    ].join(" "));
  }

  function createTermList(category) {
    const terms = Array.isArray(category.terms) ? category.terms : [];
    const list = createElement("ul");

    terms.forEach((term) => {
      list.appendChild(createElement("li", { text: term.title }));
    });

    return list;
  }

  function openTopicModal(button, category) {
    if (!modal || !modalTitle || !modalContent) {
      return;
    }

    activeTopicButton = button;
    document.querySelectorAll("[data-category-id]").forEach((topicButton) => {
      topicButton.setAttribute("aria-expanded", String(topicButton === button));
    });

    modalTitle.textContent = category.title;
    modalContent.replaceChildren(createTermList(category));

    if (typeof modal.showModal === "function") {
      modal.showModal();
      return;
    }

    modal.setAttribute("open", "");
  }

  function resetActiveTopicButton() {
    if (activeTopicButton) {
      activeTopicButton.setAttribute("aria-expanded", "false");
      activeTopicButton = null;
    }
  }

  function closeTopicModal() {
    resetActiveTopicButton();

    if (!modal) {
      return;
    }

    if (typeof modal.close === "function") {
      modal.close();
      return;
    }

    modal.removeAttribute("open");
  }

  function createCategoryCard(category) {
    const card = createElement("article", { className: "tech-card" });
    const icon = createElement("span", {
      className: "card-icon",
      text: category.icon,
      attrs: { "aria-hidden": "true" },
    });
    const title = createElement("h3", { text: category.title });
    const description = createElement("p", { text: category.description });
    const actions = createElement("div", { className: "tech-card__actions" });
    const topicsButton = createElement("button", {
      className: "topic-button",
      text: "Terimleri Gör",
      attrs: {
        type: "button",
        "data-category-id": category.id,
        "aria-haspopup": "dialog",
        "aria-expanded": "false",
        "aria-label": `${category.title} terimlerini göster`,
      },
    });
    const link = createElement("a", {
      text: "İncele",
      attrs: { href: `category.html?id=${encodeURIComponent(category.id)}` },
    });

    topicsButton.addEventListener("click", () => openTopicModal(topicsButton, category));
    actions.append(topicsButton, link);
    card.append(icon, title, description, actions);

    return card;
  }

  function groupCategories(categories) {
    return categories.reduce((groups, category) => {
      const groupTitle = category.group || "Kategoriler";
      const existingGroup = groups.find((group) => group.title === groupTitle);

      if (existingGroup) {
        existingGroup.categories.push(category);
        return groups;
      }

      groups.push({
        id: createSlug(groupTitle),
        title: groupTitle,
        categories: [category],
      });

      return groups;
    }, []);
  }

  function renderCategories(categories) {
    sectionsContainer.replaceChildren();

    groupCategories(categories).forEach((group) => {
      const section = createElement("section", {
        className: "category-section",
        attrs: { "aria-labelledby": `group-${group.id}` },
      });
      const heading = createElement("h2", {
        text: group.title,
        attrs: { id: `group-${group.id}` },
      });
      const grid = createElement("div", { className: "tech-grid" });

      group.categories.forEach((category) => {
        grid.appendChild(createCategoryCard(category));
      });

      section.append(heading, grid);
      sectionsContainer.appendChild(section);
    });
  }

  function updateSearchResults() {
    const query = normalizeSearchText(searchInput.value.trim());
    const cards = searchableCards.map((item) => item.card);
    let visibleCardCount = 0;

    searchableCards.forEach(({ card, searchText }) => {
      const isMatch = !query || searchText.includes(query);

      card.classList.toggle("is-hidden", !isMatch);

      if (isMatch) {
        visibleCardCount += 1;
      }
    });

    document.querySelectorAll(".category-section").forEach((section) => {
      const hasVisibleCard = Boolean(section.querySelector(".tech-card:not(.is-hidden)"));
      section.classList.toggle("is-hidden", !hasVisibleCard);
    });

    emptyMessage.hidden = visibleCardCount > 0;
    status.textContent = query
      ? `${visibleCardCount} kategori bulundu.`
      : `${cards.length} kategori gösteriliyor.`;
  }

  function prepareSearch(categories) {
    searchableCards = categories.map((category) => {
      const card = sectionsContainer.querySelector(`[data-category-id="${category.id}"]`).closest(".tech-card");

      return {
        card,
        searchText: getCategorySearchText(category),
      };
    });

    searchInput.addEventListener("input", updateSearchResults);
    updateSearchResults();
  }

  function renderError() {
    sectionsContainer.replaceChildren(
      createElement("p", {
        className: "search-empty",
        text: "Kategoriler yüklenirken bir hata oluştu.",
      })
    );
    status.textContent = "Kategoriler yüklenemedi.";
  }

  async function loadCategories() {
    try {
      const response = await fetch(dataUrl);

      if (!response.ok) {
        throw new Error("JSON dosyası yüklenemedi.");
      }

      const data = await response.json();
      const categories = Array.isArray(data.categories) ? data.categories : [];

      renderCategories(categories);
      prepareSearch(categories);
    } catch (error) {
      renderError();
      console.error(error);
    }
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeTopicModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeTopicModal();
      }
    });

    modal.addEventListener("close", resetActiveTopicButton);
  }

  loadCategories();
})();
