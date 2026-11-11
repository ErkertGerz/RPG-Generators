(() => {
  "use strict";

  const DATA_URL = "./Data/Akhetyps/space_marine.json";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const state = { data: null, lastCharacter: null, generatedCount: 0 };
  const tierSelect = $("#tier-select");
  const archetypeSelect = $("#archetype-select");
  const legionSelect = $("#legion-select");
  const beliefSelect = $("#belief-select");
  const generatorForm = $("#generator-form");

  function pick(items) {
    if (!Array.isArray(items) || items.length === 0) return "Не указано";
    return items[Math.floor(Math.random() * items.length)];
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function addOptions(select, items, { includeRandom = false, randomLabel = "Случайно" } = {}) {
    select.replaceChildren();
    if (includeRandom) {
      const option = document.createElement("option");
      option.value = "__random__";
      option.textContent = randomLabel;
      select.append(option);
    }
    for (const item of items) {
      const option = document.createElement("option");
      option.value = item.value ?? item;
      option.textContent = item.label ?? item;
      select.append(option);
    }
  }

  function getTier() {
    return state.data.tiers.find((tier) => tier.id === tierSelect.value) || state.data.tiers[0];
  }

  function refreshArchetypes() {
    const tier = getTier();
    addOptions(archetypeSelect, tier.archetypes, { includeRandom: true, randomLabel: "Случайный архетип" });
  }

  function rollD10() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function rollCharacteristics(tier, archetype) {
    const stats = {};
    for (const characteristic of state.data.characteristics) {
      let total = tier.baseCharacteristic + rollD10() + rollD10();
      for (const rule of state.data.archetypeBonuses) {
        if (rule.roles.includes(archetype) && rule.stats.includes(characteristic.id)) {
          total += rule.bonus;
        }
      }
      stats[characteristic.id] = total;
    }
    return stats;
  }

  function selectRoleBasedWeapons(tier, archetype) {
    const tierMelee = state.data.meleeWeaponsByTier[tier.label] || [];
    const specialMelee = state.data.specialMeleeByArchetype[archetype];
    const roleRanged = state.data.rangedWeaponsByArchetype[archetype];
    const tierRanged = state.data.rangedWeaponsByTier[tier.label] || state.data.rangedWeaponsByTier["Бывалый"] || [];
    const rangedPool = roleRanged || tierRanged;
    const armorPool = state.data.armorByTier[tier.label] || state.data.armorByTier["Свежий"];
    const armor = archetype === "Терминатор"
      ? pick(["Mk II Cataphractii", "Mk III Indomitus", "Mk IV Tartaros"])
      : pick(armorPool);
    return {
      armor,
      ranged: pick(rangedPool),
      melee: pick(tierMelee),
      special: specialMelee ? pick(specialMelee) : null
    };
  }

  function buildCharacter() {
    const tier = getTier();
    const archetype = archetypeSelect.value === "__random__" ? pick(tier.archetypes) : archetypeSelect.value;
    const legion = legionSelect.value === "__random__" ? pick([...state.data.legions, ...state.data.warbands]) : legionSelect.value;
    const belief = beliefSelect.value === "__random__" ? pick(state.data.beliefs) : beliefSelect.value;
    state.generatedCount += 1;
    const name = `${state.data.testNamePrefix || "Тестовое"} ${state.generatedCount}`;
    const gear = selectRoleBasedWeapons(tier, archetype);
    const characteristics = rollCharacteristics(tier, archetype);
    return { name, tier, archetype, legion, belief, gear, characteristics };
  }

  function renderList(items) {
    return `<ul class="result-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderCharacter(character) {
    const data = state.data;
    const statCards = data.characteristics.map((stat) => `
      <div class="stat-card">
        <div class="stat-top"><span class="stat-label">${escapeHtml(stat.label)}</span><span class="stat-value">${escapeHtml(character.characteristics[stat.id])}</span></div>
        <div class="stat-name">${escapeHtml(stat.name)}</div>
      </div>`).join("");

    const equipment = [
      { label: "Доспех", value: character.gear.armor },
      { label: "Дальнобойное оружие", value: character.gear.ranged },
      { label: "Оружие ближнего боя", value: character.gear.melee },
      { label: "Особое снаряжение", value: character.gear.special || "Нет" }
    ];
    const equipmentCards = equipment.map((item) => `<li><strong>${escapeHtml(item.label)}</strong>${escapeHtml(item.value)}</li>`).join("");

    $("#empty-state").hidden = true;
    const result = $("#character-result");
    result.hidden = false;
    result.innerHTML = `
      <header class="character-head">
        <div>
          <p class="eyebrow">Сгенерированный персонаж</p>
          <h2 class="character-name">${escapeHtml(character.name)}</h2>
          <div class="character-meta">
            <span class="meta-chip">${escapeHtml(character.tier.label)}</span>
            <span class="meta-chip">${escapeHtml(character.archetype)}</span>
            <span class="meta-chip">${escapeHtml(character.legion)}</span>
            <span class="meta-chip">${escapeHtml(character.belief)}</span>
          </div>
        </div>
        <span class="status-pill">Готов к игре</span>
      </header>
      <section class="character-section">
        <h3>Характеристики</h3>
        <div class="stat-grid">${statCards}</div>
      </section>
      <section class="character-section">
        <h3>Базовое снаряжение из правил</h3>
        ${renderList(data.startingEquipment)}
      </section>
      <section class="character-section">
        <h3>Подбор по уровню и архетипу (таблица Excel)</h3>
        <ul class="equipment-list">${equipmentCards}</ul>
      </section>
      <section class="character-section">
        <h3>Стартовые навыки</h3>
        ${renderList(data.startingSkills)}
      </section>
      <section class="character-section">
        <h3>Стартовые таланты</h3>
        ${renderList(data.startingTalents)}
      </section>
      <section class="character-section">
        <h3>Стартовые трейты</h3>
        ${renderList(data.startingTraits)}
      </section>
      <div class="export-actions" aria-label="Экспорт персонажа">
        <button class="secondary-button" type="button" data-export="json">Скачать JSON</button>
        <button class="secondary-button" type="button" data-export="text">Скачать карточку .txt</button>
        <button class="secondary-button" type="button" data-export="copy">Копировать для VTT</button>
      </div>
      <p class="export-note" id="export-status" role="status" hidden></p>
    `;
  }

  function getExportPayload(character) {
    const data = state.data;
    const characteristics = Object.fromEntries(data.characteristics.map((stat) => [stat.id, {
      label: stat.label,
      name: stat.name,
      value: character.characteristics[stat.id]
    }]));

    return {
      format: "KitoGerz RPG Character",
      formatVersion: 1,
      exportedAt: new Date().toISOString(),
      game: "Warhammer 40,000 (НРИ)",
      note: "Универсальный экспорт RPG Generator. Для прямого импорта в VTT может потребоваться конвертация под выбранную систему и лист персонажа.",
      character: {
        name: character.name,
        type: "Astartes",
        tier: { id: character.tier.id, label: character.tier.label, baseCharacteristic: character.tier.baseCharacteristic },
        archetype: character.archetype,
        legionOrWarband: character.legion,
        belief: character.belief,
        characteristics,
        startingEquipment: [...data.startingEquipment],
        selectedEquipment: {
          armor: character.gear.armor,
          rangedWeapon: character.gear.ranged,
          meleeWeapon: character.gear.melee,
          special: character.gear.special
        },
        skills: [...data.startingSkills],
        talents: [...data.startingTalents],
        traits: [...data.startingTraits]
      }
    };
  }

  function formatCharacterText(character) {
    const data = state.data;
    const stats = data.characteristics.map((stat) =>
      `- ${stat.label} — ${stat.name}: ${character.characteristics[stat.id]}`
    ).join("\n");

    const equipment = [
      ...data.startingEquipment.map((item) => `- ${item}`),
      `- Доспех: ${character.gear.armor}`,
      `- Дальнобойное оружие: ${character.gear.ranged}`,
      `- Оружие ближнего боя: ${character.gear.melee}`,
      `- Особое снаряжение: ${character.gear.special || "Нет"}`
    ].join("\n");

    const list = (items) => items.map((item) => `- ${item}`).join("\n");
    return [
      "RPG Generator (KitoGerz)",
      `Имя: ${character.name}`,
      "Вселенная: Warhammer 40,000",
      `Уровень: ${character.tier.label}`,
      `Архетип: ${character.archetype}`,
      `Легион / варбанда: ${character.legion}`,
      `Верование: ${character.belief}`,
      "",
      "Характеристики:", stats,
      "", "Снаряжение:", equipment,
      "", "Навыки:", list(data.startingSkills),
      "", "Таланты:", list(data.startingTalents),
      "", "Трейты:", list(data.startingTraits)
    ].join("\n");
  }

  function downloadFile(filename, contents, mimeType) {
    const blob = new Blob([contents], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function handleExportClick(event) {
    const button = event.target.closest("[data-export]");
    if (!button || !state.lastCharacter) return;

    const character = state.lastCharacter;
    const payload = getExportPayload(character);
    const text = formatCharacterText(character);
    const filename = `kito-gerz-${state.generatedCount}`;
    const status = $("#export-status");

    try {
      if (button.dataset.export === "json") {
        downloadFile(`${filename}.json`, JSON.stringify(payload, null, 2), "application/json");
        status.textContent = "JSON-файл сохранён.";
      } else if (button.dataset.export === "text") {
        downloadFile(`${filename}.txt`, text, "text/plain");
        status.textContent = "Текстовая карточка сохранена.";
      } else if (button.dataset.export === "copy") {
        await navigator.clipboard.writeText(text);
        status.textContent = "Карточка скопирована. Её можно вставить в заметки персонажа VTT.";
      }
    } catch (error) {
      status.textContent = button.dataset.export === "copy"
        ? "Не удалось скопировать. Скачайте карточку .txt и скопируйте текст из неё."
        : "Не удалось выполнить экспорт. Попробуйте ещё раз.";
    }
    status.hidden = false;
  }

  function initializeData(data) {
    state.data = data;
    addOptions(tierSelect, data.tiers.map((tier) => ({ value: tier.id, label: `${tier.label} · база ${tier.baseCharacteristic} + 2d10` })));
    tierSelect.value = data.tiers[0].id;
    refreshArchetypes();
    addOptions(legionSelect, [...data.legions, ...data.warbands], { includeRandom: true, randomLabel: "Случайный легион / варбанда" });
    addOptions(beliefSelect, data.beliefs, { includeRandom: true, randomLabel: "Случайное верование" });
  }

  function showPage(pageName) {
    $$(".view").forEach((view) => view.classList.toggle("is-visible", view.id === `view-${pageName}`));
    $$(".nav-button").forEach((button) => button.classList.toggle("is-active", button.dataset.page === pageName));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showWarhammerSection(sectionName) {
    $$(".subview").forEach((view) => view.classList.toggle("is-visible", view.id === `section-${sectionName}`));
    $$(".section-tab").forEach((button) => {
      const active = button.dataset.section === sectionName;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
  }

  function showLoadError(error) {
    const generator = $("#section-characters");
    const errorPanel = document.createElement("div");
    errorPanel.className = "panel coming-soon";
    errorPanel.innerHTML = `<span class="coming-icon">!</span><h2>Не удалось загрузить данные</h2><p class="muted">Проверьте, что сайт запущен через локальный сервер (например, Live Server), а файл <code>Data/Akhetyps/space_marine.json</code> находится по указанному пути.</p><p class="small-note">${escapeHtml(error.message || "Ошибка загрузки JSON")}</p>`;
    generator.append(errorPanel);
  }

  $$("[data-page]").forEach((button) => button.addEventListener("click", () => showPage(button.dataset.page)));
  $("#brand-home").addEventListener("click", (event) => {
    event.preventDefault();
    showPage("home");
  });
  $$(".section-tab").forEach((button) => button.addEventListener("click", () => showWarhammerSection(button.dataset.section)));
  $("#character-result").addEventListener("click", handleExportClick);
  tierSelect.addEventListener("change", refreshArchetypes);
  generatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.data) return;
    state.lastCharacter = buildCharacter();
    renderCharacter(state.lastCharacter);
  });

  fetch(DATA_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status} при загрузке ${DATA_URL}`);
      return response.json();
    })
    .then(initializeData)
    .catch(showLoadError);
})();
