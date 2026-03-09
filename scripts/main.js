const sectionBindings = [
  { key: "instantHooks", titleId: "instantHooksTitle", introId: "instantHooksIntro", gridId: "instantHooksGrid" }
];

function renderFeatureCards(containerId, items) {
  const iconSvgs = {
    scrape:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path><path d="M5 6a7 7 0 0 0 14 0"></path><path d="M7 12a5 5 0 0 0 10 0"></path><path d="M10 18a2 2 0 0 0 4 0"></path></svg>',
    efficiency:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3.5-7.1"></path><path d="m22 3-9.5 9.5"></path><path d="m10 12 2 2"></path></svg>',
    note:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M8 13h8"></path><path d="M8 17h6"></path></svg>',
    printer:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M6 14h12v8H6z"></path></svg>',
    language:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h8"></path><path d="M9 4v4"></path><path d="M7 8a8 8 0 0 1-3 6"></path><path d="M10 14a10 10 0 0 1-3-3"></path><path d="M14 12h7"></path><path d="M17.5 5 14 19"></path><path d="M15.5 13h4"></path></svg>',
    save:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h13l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="M8 4v6h8V4"></path><path d="M9 16h6"></path></svg>',
    freedom:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v16"></path><path d="M12 6c2.5-2 5-2 8 0-2 2-4.5 3-8 3"></path><path d="M12 11c-2.5-2-5-2-8 0 2 2 4.5 3 8 3"></path></svg>',
    upload:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4"></path><path d="m7 9 5-5 5 5"></path><path d="M20 16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3"></path></svg>'
  };
  const defaultIcon = iconSvgs.scrape;

  const container = document.getElementById(containerId);
  container.innerHTML = items
    .map(
      (item) => {
        const cleanTitle = item.title.replace(/^\s*\d+\.\s*/, "");
        const icon = iconSvgs[item.icon] || defaultIcon;
        return `
        <article class="feature-card" role="listitem">
          <div class="feature-card-inner">
          <div class="feature-head">
            <span class="feature-icon" aria-hidden="true">${icon}</span>
            <h3>${cleanTitle}</h3>
          </div>
          <p>${item.description}</p>
          <span class="feature-arrow" aria-hidden="true">↗</span>
          </div>
        </article>
      `;
      }
    )
    .join("");
}

function renderKhmerPage() {
  const selected =
    window.DELUX_LOCALES.km ||
    Object.values(window.DELUX_LOCALES || {})[0] ||
    null;

  if (!selected) {
    return;
  }

  document.documentElement.lang = "km";
  document.documentElement.dataset.lang = "km";
  document.title = selected.pageTitle;
  document.querySelector('meta[name="description"]').setAttribute("content", selected.pageDescription);

  document.getElementById("heroTitle").textContent = selected.heroTitle;
  document.getElementById("heroSubtitle").textContent = selected.heroSubtitle;
  document.getElementById("ctaPrimary").textContent = selected.ctaPrimary;
  document.getElementById("ctaSecondary").textContent = selected.ctaSecondary;
  const footerText = document.getElementById("footerText");
  if (footerText) {
    footerText.textContent = selected.footerText;
  }

  sectionBindings.forEach((binding) => {
    const sectionData = selected.sections[binding.key];
    const grid = document.getElementById(binding.gridId);
    if (!grid) {
      return;
    }
    const sectionShell = grid.closest(".section-shell");

    if (!sectionData || !Array.isArray(sectionData.items) || sectionData.items.length === 0) {
      sectionShell.classList.add("is-hidden");
      return;
    }

    sectionShell.classList.remove("is-hidden");
    document.getElementById(binding.titleId).textContent = sectionData.title;
    document.getElementById(binding.introId).textContent = sectionData.intro;
    renderFeatureCards(binding.gridId, sectionData.items);
  });

}

renderKhmerPage();
