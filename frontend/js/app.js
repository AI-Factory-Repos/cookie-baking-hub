/**
 * Cookie Baking Hub — Main Application
 * Handles routing between list and detail views,
 * and fetches data from the backend API.
 */

const API_BASE = '/api';

// ── DOM References ────────────────────────────────────────────────
const viewHome    = document.getElementById('view-home');
const viewDetail  = document.getElementById('view-detail');

const recipeGrid      = document.getElementById('recipe-grid');
const loadingIndicator = document.getElementById('loading-indicator');
const errorMessage    = document.getElementById('error-message');

const recipeDetailEl  = document.getElementById('recipe-detail');
const detailLoading   = document.getElementById('detail-loading');
const detailError     = document.getElementById('detail-error');
const detailTitle     = document.getElementById('detail-title');
const detailDesc      = document.getElementById('detail-description');
const detailMeta      = document.getElementById('detail-meta');
const detailIngredients = document.getElementById('detail-ingredients');
const detailSteps     = document.getElementById('detail-steps');

const btnBack         = document.getElementById('btn-back');
const navToggle       = document.querySelector('.nav-toggle');
const mainNav         = document.querySelector('.main-nav');
const footerYear      = document.getElementById('footer-year');

// ── Utilities ─────────────────────────────────────────────────────
function show(el) { el.hidden = false; }
function hide(el) { el.hidden = true; }

function setError(el, message) {
  el.textContent = `⚠️ ${message}`;
  show(el);
}

function clearError(el) {
  el.textContent = '';
  hide(el);
}

function formatMinutes(minutes) {
  if (!minutes && minutes !== 0) return null;
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function makeBadge(icon, text) {
  const span = document.createElement('span');
  span.className = 'badge';
  span.textContent = `${icon} ${text}`;
  return span;
}

// ── Views ─────────────────────────────────────────────────────────
function showHomeView() {
  show(viewHome);
  hide(viewDetail);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDetailView() {
  hide(viewHome);
  show(viewDetail);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Recipe List ───────────────────────────────────────────────────
async function loadRecipes() {
  clearError(errorMessage);
  show(loadingIndicator);
  recipeGrid.innerHTML = '';

  try {
    const response = await fetch(`${API_BASE}/recipes`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const data = await response.json();
    const recipes = Array.isArray(data) ? data : (data.recipes || data.data || []);
    renderRecipeGrid(recipes);
  } catch (err) {
    setError(errorMessage, `Could not load recipes. ${err.message}`);
  } finally {
    hide(loadingIndicator);
  }
}

function renderRecipeGrid(recipes) {
  if (!recipes.length) {
    recipeGrid.innerHTML = '<p style="color:var(--color-text-muted)">No recipes found.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const card = buildRecipeCard(recipe);
    recipeGrid.appendChild(card);
  });
}

function buildRecipeCard(recipe) {
  const card = document.createElement('article');
  card.className = 'recipe-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View recipe: ${recipe.name || recipe.title}`);

  const icon = document.createElement('div');
  icon.className = 'recipe-card-icon';
  icon.textContent = recipe.emoji || '🍪';

  const title = document.createElement('h2');
  title.className = 'recipe-card-title';
  title.textContent = recipe.name || recipe.title || 'Untitled Recipe';

  const desc = document.createElement('p');
  desc.className = 'recipe-card-desc';
  desc.textContent = recipe.description || '';

  const meta = document.createElement('div');
  meta.className = 'recipe-card-meta';

  if (recipe.difficulty) meta.appendChild(makeBadge('📊', recipe.difficulty));
  const prepTime = formatMinutes(recipe.prepTime);
  if (prepTime) meta.appendChild(makeBadge('⏱', prepTime));
  const cookTime = formatMinutes(recipe.cookTime);
  if (cookTime) meta.appendChild(makeBadge('🔥', cookTime));
  if (recipe.servings) meta.appendChild(makeBadge('🍽', `Serves ${recipe.servings}`));

  const action = document.createElement('span');
  action.className = 'recipe-card-action';
  action.textContent = 'View Recipe →';

  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(desc);
  if (meta.children.length) card.appendChild(meta);
  card.appendChild(action);

  const openDetail = () => loadRecipeDetail(recipe._id || recipe.id);
  card.addEventListener('click', openDetail);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDetail();
    }
  });

  return card;
}

// ── Recipe Detail ─────────────────────────────────────────────────
async function loadRecipeDetail(id) {
  showDetailView();
  hide(recipeDetailEl);
  clearError(detailError);
  show(detailLoading);

  try {
    const response = await fetch(`${API_BASE}/recipes/${id}`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const data = await response.json();
    const recipe = data.recipe || data.data || data;
    renderRecipeDetail(recipe);
  } catch (err) {
    setError(detailError, `Could not load recipe. ${err.message}`);
  } finally {
    hide(detailLoading);
  }
}

function renderRecipeDetail(recipe) {
  detailTitle.textContent = recipe.name || recipe.title || 'Untitled Recipe';
  detailDesc.textContent  = recipe.description || '';

  // Meta badges
  detailMeta.innerHTML = '';
  if (recipe.difficulty) detailMeta.appendChild(makeBadge('📊', recipe.difficulty));
  const prepTime = formatMinutes(recipe.prepTime);
  if (prepTime) detailMeta.appendChild(makeBadge('⏱ Prep', prepTime));
  const cookTime = formatMinutes(recipe.cookTime);
  if (cookTime) detailMeta.appendChild(makeBadge('🔥 Cook', cookTime));
  if (recipe.servings) detailMeta.appendChild(makeBadge('🍽', `Serves ${recipe.servings}`));

  // Ingredients
  detailIngredients.innerHTML = '';
  const ingredients = recipe.ingredients || [];
  ingredients.forEach(ing => {
    const li = document.createElement('li');
    li.textContent = typeof ing === 'string' ? ing : `${ing.amount || ''} ${ing.unit || ''} ${ing.name || ing}`.trim();
    detailIngredients.appendChild(li);
  });

  // Steps
  detailSteps.innerHTML = '';
  const steps = recipe.steps || recipe.instructions || [];
  steps.forEach((step, idx) => {
    const li = document.createElement('li');
    li.className = 'step-item';

    const numEl = document.createElement('span');
    numEl.className = 'step-number';
    numEl.textContent = idx + 1;
    numEl.setAttribute('aria-hidden', 'true');

    const textEl = document.createElement('span');
    textEl.className = 'step-text';
    textEl.textContent = typeof step === 'string' ? step : step.instruction || step.text || '';

    li.appendChild(numEl);
    li.appendChild(textEl);
    detailSteps.appendChild(li);
  });

  show(recipeDetailEl);
}

// ── Event Listeners ───────────────────────────────────────────────
btnBack.addEventListener('click', () => {
  showHomeView();
});

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav when a link is clicked
mainNav.addEventListener('click', e => {
  if (e.target.classList.contains('nav-link')) {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ── Init ──────────────────────────────────────────────────────────
footerYear.textContent = new Date().getFullYear();
loadRecipes();
