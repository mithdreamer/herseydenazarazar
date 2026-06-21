console.log("Her Şeyden Azar Azar sitesi çalışıyor.");

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

    modalTitle.textContent = button.textContent.trim();
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
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-expanded", "false");
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
