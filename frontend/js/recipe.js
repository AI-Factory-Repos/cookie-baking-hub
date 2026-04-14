const API_BASE = '/api';

// Parse ?id= from the query string
function getRecipeIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Fetch a single recipe by id
async function fetchRecipe(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error(`Recipe not found (${res.status})`);
  return res.json();
}

// Fetch all recipes so we can build prev/next navigation
async function fetchAllRecipes() {
  const res = await fetch(`${API_BASE}/`);
  if (!res.ok) throw new Error('Could not load recipe list');
  return res.json();
}

function showLoading() {
  document.getElementById('recipe-loading').hidden = false;
  document.getElementById('recipe-error').hidden = true;
  document.getElementById('recipe-content').hidden = true;
}

function showError(message) {
  const el = document.getElementById('recipe-error');
  el.textContent = message;
  el.hidden = false;
  document.getElementById('recipe-loading').hidden = true;
  document.getElementById('recipe-content').hidden = true;
}

function showContent() {
  document.getElementById('recipe-loading').hidden = true;
  document.getElementById('recipe-error').hidden = true;
  document.getElementById('recipe-content').hidden = false;
}

function difficultyClass(difficulty) {
  if (!difficulty) return '';
  const d = difficulty.toLowerCase();
  if (d === 'easy') return 'badge--easy';
  if (d === 'medium') return 'badge--medium';
  if (d === 'hard') return 'badge--hard';
  return '';
}

function formatTime(minutes) {
  if (!minutes && minutes !== 0) return '—';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function renderRecipe(recipe) {
  document.title = `${recipe.name} – Cookie Baking Hub`;

  document.getElementById('recipe-name').textContent = recipe.name;

  const diffEl = document.getElementById('recipe-difficulty');
  diffEl.textContent = recipe.difficulty || 'Unknown';
  diffEl.className = `meta-badge ${difficultyClass(recipe.difficulty)}`;

  document.getElementById('recipe-prep-time').textContent = formatTime(recipe.prepTime);
  document.getElementById('recipe-cook-time').textContent = formatTime(recipe.cookTime);

  const total = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  document.getElementById('recipe-total-time').textContent = formatTime(total);

  const descEl = document.getElementById('recipe-description');
  if (recipe.description) {
    descEl.textContent = recipe.description;
    descEl.hidden = false;
  } else {
    descEl.hidden = true;
  }

  // Ingredients
  const ul = document.getElementById('ingredients-list');
  ul.innerHTML = '';
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  if (ingredients.length === 0) {
    ul.innerHTML = '<li class="empty-note">No ingredients listed.</li>';
  } else {
    ingredients.forEach(item => {
      const li = document.createElement('li');
      li.textContent = typeof item === 'object'
        ? `${item.quantity ? item.quantity + ' ' : ''}${item.unit ? item.unit + ' ' : ''}${item.name || item}`
        : item;
      ul.appendChild(li);
    });
  }

  // Instructions
  const ol = document.getElementById('instructions-list');
  ol.innerHTML = '';
  const steps = Array.isArray(recipe.instructions) ? recipe.instructions : [];
  if (steps.length === 0) {
    ol.innerHTML = '<li class="empty-note">No instructions listed.</li>';
  } else {
    steps.forEach(step => {
      const li = document.createElement('li');
      li.textContent = typeof step === 'object' ? step.text || step.step || JSON.stringify(step) : step;
      ol.appendChild(li);
    });
  }
}

function setupPagination(allRecipes, currentId) {
  // allRecipes may be an array directly or wrapped in a data property
  const list = Array.isArray(allRecipes) ? allRecipes : (allRecipes.data || allRecipes.recipes || []);
  const idx = list.findIndex(r => String(r._id) === String(currentId));

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  if (idx > 0) {
    btnPrev.disabled = false;
    btnPrev.addEventListener('click', () => {
      window.location.href = `recipe.html?id=${list[idx - 1]._id}`;
    });
  }

  if (idx !== -1 && idx < list.length - 1) {
    btnNext.disabled = false;
    btnNext.addEventListener('click', () => {
      window.location.href = `recipe.html?id=${list[idx + 1]._id}`;
    });
  }
}

async function init() {
  const id = getRecipeIdFromURL();
  if (!id) {
    showError('No recipe ID specified. Please go back and select a recipe.');
    return;
  }

  showLoading();

  try {
    const [recipe, allRecipes] = await Promise.all([fetchRecipe(id), fetchAllRecipes()]);
    renderRecipe(recipe);
    setupPagination(allRecipes, id);
    showContent();
  } catch (err) {
    showError(err.message || 'Failed to load the recipe. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', init);
