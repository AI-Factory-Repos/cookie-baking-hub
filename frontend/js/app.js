const API_BASE = '/api';

// Utility: show/hide loading spinner
function setLoading(container, isLoading) {
  if (isLoading) {
    container.innerHTML = '<div class="loading"><span class="spinner"></span> Loading recipes…</div>';
  }
}

// Utility: show error message
function showError(container, message) {
  container.innerHTML = `<div class="error-message"><p>⚠️ ${message}</p><button onclick="loadRecipes()">Retry</button></div>`;
}

// Fetch all recipes from GET /api/
async function loadRecipes() {
  const grid = document.getElementById('recipe-grid');
  if (!grid) return;

  setLoading(grid, true);

  try {
    const response = await fetch(`${API_BASE}/`);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }
    const recipes = await response.json();
    renderRecipeGrid(grid, recipes);
  } catch (err) {
    console.error('Failed to load recipes:', err);
    showError(grid, 'Failed to load recipes. Please try again.');
  }
}

// Render recipe cards into the grid
function renderRecipeGrid(container, recipes) {
  if (!recipes || recipes.length === 0) {
    container.innerHTML = '<p class="no-results">No recipes found.</p>';
    return;
  }

  container.innerHTML = recipes.map(recipe => `
    <article class="recipe-card">
      ${recipe.image ? `<img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.title)}" loading="lazy" />` : '<div class="recipe-card__no-image">🍪</div>'}
      <div class="recipe-card__body">
        <h2 class="recipe-card__title">${escapeHtml(recipe.title)}</h2>
        ${recipe.description ? `<p class="recipe-card__desc">${escapeHtml(recipe.description)}</p>` : ''}
        <div class="recipe-card__meta">
          ${recipe.prepTime ? `<span>⏱ Prep: ${escapeHtml(String(recipe.prepTime))}</span>` : ''}
          ${recipe.difficulty ? `<span>📊 ${escapeHtml(recipe.difficulty)}</span>` : ''}
        </div>
        <a href="recipe.html?id=${encodeURIComponent(recipe._id)}" class="btn btn--primary">View Recipe</a>
      </div>
    </article>
  `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Check API health on page load (optional, non-blocking)
async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) console.warn('API health check failed');
  } catch {
    console.warn('API health check unreachable');
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  checkHealth();
  loadRecipes();
});
