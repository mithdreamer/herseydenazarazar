console.log("Her Şeyden Azar Azar sitesi çalışıyor.");

(function () {
  const searchInput = document.querySelector("#category-search");
  const status = document.querySelector("#category-search-status");
  const emptyMessage = document.querySelector("#category-search-empty");
  const sections = Array.from(document.querySelectorAll(".category-section"));
  const cards = Array.from(document.querySelectorAll(".tech-card"));

  if (!searchInput || !status || !emptyMessage || !sections.length || !cards.length) {
    return;
  }

  function normalizeSearchText(text) {
    return text
      .toLocaleLowerCase("tr-TR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i");
  }

  function getTemplateText(card) {
    const topicButton = card.querySelector("[data-topic-template]");
    const templateId = topicButton ? topicButton.dataset.topicTemplate : "";
    const template = templateId ? document.getElementById(templateId) : null;

    return template ? template.textContent : "";
  }

  const searchableCards = cards.map((card) => {
    const title = card.querySelector("h3");
    const description = card.querySelector("p");
    const icon = card.querySelector(".card-icon");
    const searchText = [
      title ? title.textContent : "",
      description ? description.textContent : "",
      icon ? icon.textContent : "",
      getTemplateText(card),
    ].join(" ");

    return {
      card,
      searchText: normalizeSearchText(searchText),
    };
  });

  function updateSearchResults() {
    const query = normalizeSearchText(searchInput.value.trim());
    let visibleCardCount = 0;

    searchableCards.forEach(({ card, searchText }) => {
      const isMatch = !query || searchText.includes(query);

      card.classList.toggle("is-hidden", !isMatch);

      if (isMatch) {
        visibleCardCount += 1;
      }
    });

    sections.forEach((section) => {
      const hasVisibleCard = Boolean(section.querySelector(".tech-card:not(.is-hidden)"));
      section.classList.toggle("is-hidden", !hasVisibleCard);
    });

    emptyMessage.hidden = visibleCardCount > 0;
    status.textContent = query
      ? `${visibleCardCount} kategori bulundu.`
      : `${cards.length} kategori gösteriliyor.`;
  }

  searchInput.addEventListener("input", updateSearchResults);
  updateSearchResults();
})();

(function () {
  const modal = document.querySelector("#topic-modal");
  const modalTitle = document.querySelector("#topic-modal-title");
  const modalContent = document.querySelector("#topic-modal-content");
  const closeButton = document.querySelector("[data-modal-close]");
  const categoryButtons = document.querySelectorAll("[data-topic-template]");
  let activeTopicButton = null;

  if (!modal || !modalTitle || !modalContent || !closeButton || !categoryButtons.length) {
    return;
  }

  function openTopicModal(button) {
    const template = document.getElementById(button.dataset.topicTemplate);

    if (!template) {
      return;
    }

    activeTopicButton = button;
    categoryButtons.forEach((categoryButton) => {
      categoryButton.setAttribute("aria-expanded", String(categoryButton === button));
    });

    const card = button.closest(".tech-card");
    const cardTitle = card ? card.querySelector("h3") : null;

    modalTitle.textContent = cardTitle ? cardTitle.textContent.trim() : button.textContent.trim();
    modalContent.replaceChildren(template.content.cloneNode(true));

    if (typeof modal.showModal === "function") {
      modal.showModal();
      return;
    }

    modal.setAttribute("open", "");
  }

  function closeTopicModal() {
    if (activeTopicButton) {
      activeTopicButton.setAttribute("aria-expanded", "false");
      activeTopicButton = null;
    }

    if (typeof modal.close === "function") {
      modal.close();
      return;
    }

    modal.removeAttribute("open");
  }

  categoryButtons.forEach((button) => {
    const card = button.closest(".tech-card");
    const cardTitle = card ? card.querySelector("h3") : null;

    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-expanded", "false");
    if (cardTitle) {
      button.setAttribute("aria-label", `${cardTitle.textContent.trim()} terimlerini göster`);
    }
    button.addEventListener("click", () => openTopicModal(button));
  });

  closeButton.addEventListener("click", closeTopicModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeTopicModal();
    }
  });

  modal.addEventListener("close", () => {
    if (activeTopicButton) {
      activeTopicButton.setAttribute("aria-expanded", "false");
      activeTopicButton = null;
    }
  });
})();
