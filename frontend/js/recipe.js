const API_BASE = '/api';

// Utility: escape HTML
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Get recipe id from query string
function getRecipeId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Show loading state
function setLoading(container, isLoading) {
  if (isLoading) {
    container.innerHTML = '<div class="loading"><span class="spinner"></span> Loading recipe…</div>';
  }
}

// Show error state
function showError(container, message, retryId) {
  container.innerHTML = `
    <div class="error-message">
      <p>⚠️ ${message}</p>
      <a href="index.html" class="btn btn--secondary">← Back to Recipes</a>
      ${retryId ? `<button onclick="loadRecipe('${retryId}')" class="btn btn--primary">Retry</button>` : ''}
    </div>`;
}

// Fetch single recipe from GET /api/:id
async function loadRecipe(id) {
  const container = document.getElementById('recipe-detail');
  if (!container) return;

  setLoading(container, true);

  try {
    const response = await fetch(`${API_BASE}/${encodeURIComponent(id)}`);
    if (response.status === 404) {
      showError(container, 'Recipe not found.', null);
      return;
    }
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }
    const recipe = await response.json();
    renderRecipe(container, recipe);
  } catch (err) {
    console.error('Failed to load recipe:', err);
    showError(container, 'Failed to load recipe. Please try again.', id);
  }
}

// Render full recipe detail
function renderRecipe(container, recipe) {
  // Update page title
  document.title = `${recipe.title} – Cookie Baking Hub`;

  // Build ingredients list
  const ingredientsList = Array.isArray(recipe.ingredients) && recipe.ingredients.length
    ? `<ul class="recipe-detail__ingredients">${recipe.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`
    : '<p>No ingredients listed.</p>';

  // Build instructions list
  const instructionsList = Array.isArray(recipe.instructions) && recipe.instructions.length
    ? `<ol class="recipe-detail__instructions">${recipe.instructions.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol>`
    : '<p>No instructions provided.</p>';

  container.innerHTML = `
    <nav class="recipe-detail__nav">
      <a href="index.html" class="btn btn--secondary">← Back to Recipes</a>
    </nav>
    <article class="recipe-detail">
      ${recipe.image ? `<img class="recipe-detail__image" src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.title)}" />` : ''}
      <h1 class="recipe-detail__title">${escapeHtml(recipe.title)}</h1>
      ${recipe.description ? `<p class="recipe-detail__description">${escapeHtml(recipe.description)}</p>` : ''}
      <div class="recipe-detail__meta">
        ${recipe.prepTime ? `<div class="meta-item"><span class="meta-label">Prep Time</span><span>${escapeHtml(String(recipe.prepTime))}</span></div>` : ''}
        ${recipe.cookTime ? `<div class="meta-item"><span class="meta-label">Cook Time</span><span>${escapeHtml(String(recipe.cookTime))}</span></div>` : ''}
        ${recipe.servings ? `<div class="meta-item"><span class="meta-label">Servings</span><span>${escapeHtml(String(recipe.servings))}</span></div>` : ''}
        ${recipe.difficulty ? `<div class="meta-item"><span class="meta-label">Difficulty</span><span>${escapeHtml(recipe.difficulty)}</span></div>` : ''}
      </div>
      <section class="recipe-detail__section">
        <h2>Ingredients</h2>
        ${ingredientsList}
      </section>
      <section class="recipe-detail__section">
        <h2>Instructions</h2>
        ${instructionsList}
      </section>
      ${recipe.tags && recipe.tags.length ? `
        <section class="recipe-detail__section">
          <h2>Tags</h2>
          <div class="recipe-detail__tags">${recipe.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
        </section>` : ''}
    </article>`;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  const id = getRecipeId();
  const container = document.getElementById('recipe-detail');

  if (!id) {
    if (container) showError(container, 'No recipe specified.', null);
    return;
  }

  loadRecipe(id);
});
