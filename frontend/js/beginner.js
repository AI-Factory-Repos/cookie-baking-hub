/**
 * beginner.js — Beginner-friendly interactive features:
 *  - Temperature converter (°F ↔ °C)
 *  - Volume-to-weight converter
 *  - Per-recipe troubleshooting tips
 *  - index.html panel toggle helpers
 */

/* ── Utility ────────────────────────────────────────────────── */
function round(val, decimals = 1) {
  return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/* ── Temperature Converter ──────────────────────────────────── */
function initTempConverter() {
  const fahInput = document.getElementById('fahInput');
  const celInput = document.getElementById('celInput');
  const celOutput = document.getElementById('celOutput');
  const fahOutput = document.getElementById('fahOutput');

  if (!fahInput) return;

  fahInput.addEventListener('input', () => {
    const f = parseFloat(fahInput.value);
    celOutput.textContent = isNaN(f) ? '—' : round((f - 32) * 5 / 9);
  });

  celInput.addEventListener('input', () => {
    const c = parseFloat(celInput.value);
    fahOutput.textContent = isNaN(c) ? '—' : round(c * 9 / 5 + 32);
  });
}

/* ── Volume → Weight Converter ──────────────────────────────── */
function initVolConverter() {
  const cupsInput = document.getElementById('cupsInput');
  const gramsOutput = document.getElementById('gramsOutput');
  const ingredientSelect = document.getElementById('ingredientSelect');

  if (!cupsInput) return;

  function calculate() {
    const cups = parseFloat(cupsInput.value);
    const gramsPerCup = parseFloat(ingredientSelect.value);
    gramsOutput.textContent = isNaN(cups) ? '—' : round(cups * gramsPerCup, 0);
  }

  cupsInput.addEventListener('input', calculate);
  ingredientSelect.addEventListener('change', calculate);
}

/* ── Troubleshooting Tips Data ──────────────────────────────── */
const TROUBLESHOOTING_TIPS = [
  {
    problem: 'Cookies spread too much',
    causes: [
      'Butter was too warm or melted — always use room-temperature (not melted) butter.',
      'Dough was not chilled before baking.',
      'Too little flour — try adding 1–2 tbsp more.',
      'Oven temperature too low — verify with an oven thermometer.',
      'Greased pan causes extra spreading; use parchment or a silicone mat instead.',
    ],
  },
  {
    problem: 'Cookies don\'t spread enough (too puffy)',
    causes: [
      'Too much flour — use the spoon-and-level method or a scale.',
      'Butter was too cold — let it reach room temperature.',
      'Too much baking powder/soda — measure carefully.',
      'Dough was over-chilled; let it sit at room temp for 10 min before baking.',
    ],
  },
  {
    problem: 'Cookies are too hard / dry',
    causes: [
      'Over-baked — remove when the centre looks slightly underdone.',
      'Too much flour was used.',
      'Not enough fat or sugar.',
      'Stored improperly — keep in an airtight container with a slice of bread to retain moisture.',
    ],
  },
  {
    problem: 'Cookies are too soft / won\'t hold shape',
    causes: [
      'Under-baked — bake 2–3 minutes longer.',
      'Dough needs chilling before baking.',
      'Too much butter or sugar.',
      'Let cookies cool completely on the tray — they firm up significantly as they cool.',
    ],
  },
  {
    problem: 'Burnt bottoms',
    causes: [
      'Oven runs hot — reduce temperature by 25°F (15°C).',
      'Dark baking tray absorbs more heat; switch to a light-coloured pan.',
      'Rack position too low — move to the centre rack.',
      'Baking on a thin single tray — double-pan (stack two trays) to insulate the bottoms.',
    ],
  },
  {
    problem: 'Cookies are flat and greasy',
    causes: [
      'Butter was melted or too warm.',
      'Too much butter in the recipe or a measuring error.',
      'Placed dough on a warm baking tray — always start with a cool tray.',
    ],
  },
  {
    problem: 'Cookies are cake-like / cakey',
    causes: [
      'Too many eggs or extra egg whites — use only what the recipe states.',
      'Too much baking powder.',
      'Too much flour.',
      'Over-creaming incorporates too much air — cream only until combined.',
    ],
  },
  {
    problem: 'Uneven browning',
    causes: [
      'Hot spots in the oven — rotate the tray 180° halfway through baking.',
      'Cookies are different sizes — use a cookie scoop for consistent portions.',
      'Tray placed too close to the top heating element — use the centre rack.',
    ],
  },
];

/* ── Render Troubleshooting Accordion ───────────────────────── */
function renderTroubleshootingTips() {
  const section = document.getElementById('recipeTipsSection');
  const accordion = document.getElementById('tipsAccordion');
  if (!section || !accordion) return;

  section.style.display = '';
  accordion.innerHTML = '';

  TROUBLESHOOTING_TIPS.forEach((tip, idx) => {
    const item = document.createElement('div');
    item.className = 'accordion-item';

    const headerId = `tip-header-${idx}`;
    const bodyId = `tip-body-${idx}`;

    item.innerHTML = `
      <button
        class="accordion-header"
        id="${headerId}"
        aria-expanded="false"
        aria-controls="${bodyId}"
      >
        <span>${tip.problem}</span>
        <span class="accordion-arrow">▼</span>
      </button>
      <div class="accordion-body" id="${bodyId}" role="region" aria-labelledby="${headerId}" hidden>
        <ul>
          ${tip.causes.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
    `;

    const btn = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    const arrow = item.querySelector('.accordion-arrow');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      body.hidden = isOpen;
      arrow.textContent = isOpen ? '▼' : '▲';
    });

    accordion.appendChild(item);
  });
}

/* ── Index page: toggle beginner panels banner ──────────────── */
function initBannerToggle() {
  const bannerToggle = document.getElementById('bannerToggle');
  const beginnerPanels = document.getElementById('beginnerPanels');
  const toggleArrow = document.getElementById('toggleArrow');
  if (!bannerToggle || !beginnerPanels) return;

  bannerToggle.addEventListener('click', () => {
    const isOpen = bannerToggle.getAttribute('aria-expanded') === 'true';
    bannerToggle.setAttribute('aria-expanded', String(!isOpen));
    beginnerPanels.style.display = isOpen ? 'none' : '';
    if (toggleArrow) toggleArrow.textContent = isOpen ? '▼' : '▲';
  });
}

/* ── Index page: sub-panel toggles ─────────────────────────── */
function togglePanel(bodyId) {
  const body = document.getElementById(bodyId);
  const arrow = document.getElementById(bodyId + 'Arrow');
  if (!body) return;
  const isHidden = body.classList.toggle('collapsed');
  if (arrow) arrow.textContent = isHidden ? '▼' : '▲';
}

/* ── Bootstrap ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initBannerToggle();
  initTempConverter();
  initVolConverter();
  renderTroubleshootingTips();
});
