const API_BASE = '/api/recipes';

// ── Utility ──────────────────────────────────────────────────────────────────
function getRecipeId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function el(id) {
  return document.getElementById(id);
}

// ── Fetch recipe ──────────────────────────────────────────────────────────────
async function fetchRecipe(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error(`Recipe not found (${res.status})`);
  return res.json();
}

// ── Render meta ───────────────────────────────────────────────────────────────
function renderMeta(recipe) {
  document.title = `${recipe.title} | Cookie Baking Hub`;
  el('recipe-title').textContent = recipe.title;
  el('recipe-description').textContent = recipe.description || '';

  const prepEl = el('recipe-prep');
  const cookEl = el('recipe-cook');
  const servEl = el('recipe-servings');

  if (recipe.prepTime) prepEl.textContent = `⏱ Prep: ${recipe.prepTime}`;
  if (recipe.cookTime) cookEl.textContent = `🔥 Cook: ${recipe.cookTime}`;
  if (recipe.servings) servEl.textContent = `🍽 Serves: ${recipe.servings}`;
}

// ── Step-by-step display ──────────────────────────────────────────────────────
let steps = [];
let currentStep = 0;

/**
 * Normalise recipe data into an array of step objects:
 * { instruction: string, image: string|null }
 *
 * Supports two common shapes:
 *   1. recipe.steps  — array of objects OR array of strings
 *   2. recipe.instructions — array of strings (fallback)
 */
function buildSteps(recipe) {
  if (Array.isArray(recipe.steps) && recipe.steps.length) {
    return recipe.steps.map((s, i) => {
      if (typeof s === 'string') {
        return { instruction: s, image: pickImage(recipe, i) };
      }
      return {
        instruction: s.instruction || s.text || s.description || String(s),
        image: s.image || s.photo || s.imageUrl || pickImage(recipe, i) || null,
      };
    });
  }

  if (Array.isArray(recipe.instructions) && recipe.instructions.length) {
    return recipe.instructions.map((instr, i) => ({
      instruction: typeof instr === 'string' ? instr : instr.text || String(instr),
      image: pickImage(recipe, i),
    }));
  }

  return [];
}

/**
 * Try to pull a per-step image from common recipe shapes.
 * Falls back to the recipe's main image for every step.
 */
function pickImage(recipe, index) {
  // Some APIs store parallel image arrays
  if (Array.isArray(recipe.stepImages) && recipe.stepImages[index]) {
    return recipe.stepImages[index];
  }
  // Main recipe image as fallback
  return recipe.image || recipe.imageUrl || recipe.photo || null;
}

// ── DOM helpers ───────────────────────────────────────────────────────────────
function buildDots(count) {
  const container = el('step-dots');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.className = 'step-dot';
    dot.setAttribute('aria-label', `Go to step ${i + 1}`);
    dot.addEventListener('click', () => goToStep(i));
    container.appendChild(dot);
  }
}

function updateDots(index) {
  const dots = document.querySelectorAll('.step-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function updateProgressBar(index, total) {
  const pct = total > 1 ? (index / (total - 1)) * 100 : 100;
  el('progress-bar-fill').style.width = `${pct}%`;
}

function renderStep(index) {
  const step = steps[index];
  const total = steps.length;

  // Counter
  el('step-counter').textContent = `Step ${index + 1} of ${total}`;

  // Badge
  el('step-number-badge').textContent = index + 1;

  // Instruction
  el('step-instruction').textContent = step.instruction;

  // Image
  const imgEl = el('step-image');
  if (step.image) {
    imgEl.src = step.image;
    imgEl.alt = `Step ${index + 1} photo`;
    imgEl.hidden = false;
    imgEl.parentElement.hidden = false;
  } else {
    imgEl.src = '';
    imgEl.hidden = true;
    imgEl.parentElement.hidden = true;
  }

  // Progress
  updateProgressBar(index, total);
  updateDots(index);

  // Nav buttons
  el('btn-prev').disabled = index === 0;
  el('btn-next').disabled = index === total - 1;
  el('btn-next').textContent = index === total - 1 ? '✓ Done' : 'Next →';

  // Animate card
  const card = el('step-card');
  card.classList.remove('step-enter');
  void card.offsetWidth; // reflow
  card.classList.add('step-enter');
}

function goToStep(index) {
  currentStep = index;
  renderStep(currentStep);
}

// ── Render plain fallback (no structured steps) ───────────────────────────────
function renderPlainInstructions(recipe) {
  const list = el('instructions-list');
  list.innerHTML = '';
  const source = recipe.instructions || recipe.steps || [];
  source.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = typeof item === 'string' ? item : item.text || String(item);
    list.appendChild(li);
  });
  el('plain-instructions').hidden = false;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function init() {
  const id = getRecipeId();
  if (!id) {
    showError('No recipe ID provided.');
    return;
  }

  try {
    const recipe = await fetchRecipe(id);

    // Hide loading, show article
    el('loading').hidden = true;
    el('recipe-detail').hidden = false;

    renderMeta(recipe);

    steps = buildSteps(recipe);

    if (steps.length > 0) {
      buildDots(steps.length);
      el('steps-section').hidden = false;
      goToStep(0);

      el('btn-prev').addEventListener('click', () => {
        if (currentStep > 0) goToStep(currentStep - 1);
      });

      el('btn-next').addEventListener('click', () => {
        if (currentStep < steps.length - 1) goToStep(currentStep + 1);
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentStep > 0) goToStep(currentStep - 1);
        if (e.key === 'ArrowRight' && currentStep < steps.length - 1) goToStep(currentStep + 1);
      });
    } else {
      renderPlainInstructions(recipe);
    }
  } catch (err) {
    el('loading').hidden = true;
    showError(err.message);
  }
}

function showError(msg) {
  const errEl = el('error');
  errEl.textContent = `Error: ${msg}`;
  errEl.hidden = false;
}

document.addEventListener('DOMContentLoaded', init);
