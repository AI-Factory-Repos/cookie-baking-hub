const API_BASE = '/api';

function getRecipeId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function fetchRecipe(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function renderRecipe(recipe) {
  document.title = `${recipe.name} | Cookie Baking Hub`;

  const container = document.getElementById('recipeContainer');

  const img = recipe.image
    ? `<img src="${recipe.image}" alt="${recipe.name}" class="detail-img" />`
    : `<div class="detail-img-placeholder">🍪</div>`;

  const metaItems = [
    recipe.prepTime && `<div class="meta-item"><span class="meta-label">Prep</span><span>${recipe.prepTime}</span></div>`,
    recipe.cookTime && `<div class="meta-item"><span class="meta-label">Cook</span><span>${recipe.cookTime}</span></div>`,
    recipe.servings && `<div class="meta-item"><span class="meta-label">Serves</span><span>${recipe.servings}</span></div>`,
    recipe.difficulty && `<div class="meta-item"><span class="meta-label">Difficulty</span><span class="difficulty difficulty-${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span></div>`,
  ].filter(Boolean).join('');

  const ingredients = recipe.ingredients && recipe.ingredients.length
    ? `<section class="detail-section">
        <h2>Ingredients</h2>
        <ul class="ingredients-list">
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </section>`
    : '';

  const instructions = recipe.instructions && recipe.instructions.length
    ? `<section class="detail-section">
        <h2>Instructions</h2>
        <ol class="instructions-list">
          ${recipe.instructions.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </section>`
    : '';

  container.innerHTML = `
    <article class="recipe-detail">
      ${img}
      <div class="detail-body">
        <h1 class="detail-title">${recipe.name}</h1>
        ${recipe.description ? `<p class="detail-desc">${recipe.description}</p>` : ''}
        <div class="detail-meta">${metaItems}</div>
        ${ingredients}
        ${instructions}
      </div>
    </article>
  `;
}

async function init() {
  const id = getRecipeId();
  const container = document.getElementById('recipeContainer');

  if (!id) {
    container.innerHTML = '<p class="error-msg">No recipe specified.</p>';
    return;
  }

  try {
    const recipe = await fetchRecipe(id);
    renderRecipe(recipe);
  } catch (err) {
    console.error('Failed to load recipe:', err);
    container.innerHTML = '<p class="error-msg">Could not load the recipe. Please try again.</p>';
  }
}

document.addEventListener('DOMContentLoaded', init);
