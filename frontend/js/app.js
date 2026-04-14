const API_BASE = '/api';

async function fetchRecipes() {
  try {
    const res = await fetch(`${API_BASE}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch recipes:', err);
    return [];
  }
}

function createRecipeCard(recipe) {
  const card = document.createElement('a');
  card.className = 'recipe-card';
  card.href = `recipe.html?id=${recipe._id}`;

  const img = recipe.image
    ? `<img src="${recipe.image}" alt="${recipe.name}" class="card-img" loading="lazy" />`
    : `<div class="card-img-placeholder">🍪</div>`;

  card.innerHTML = `
    ${img}
    <div class="card-body">
      <h3 class="card-title">${recipe.name}</h3>
      ${recipe.description ? `<p class="card-desc">${recipe.description}</p>` : ''}
      <div class="card-meta">
        ${recipe.prepTime ? `<span>⏱ Prep: ${recipe.prepTime}</span>` : ''}
        ${recipe.cookTime ? `<span>🔥 Cook: ${recipe.cookTime}</span>` : ''}
        ${recipe.servings ? `<span>🍽 Serves: ${recipe.servings}</span>` : ''}
        ${recipe.difficulty ? `<span class="difficulty difficulty-${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>` : ''}
      </div>
    </div>
  `;
  return card;
}

async function init() {
  const grid = document.getElementById('recipeGrid');
  const loadingMsg = document.getElementById('loadingMsg');

  const recipes = await fetchRecipes();

  if (loadingMsg) loadingMsg.remove();

  if (!recipes.length) {
    grid.innerHTML = '<p class="empty-msg">No recipes found. Check back soon!</p>';
    return;
  }

  recipes.forEach(recipe => grid.appendChild(createRecipeCard(recipe)));
}

document.addEventListener('DOMContentLoaded', () => {
  init();

  // Beginner panels are on the index page — wire togglePanel globally
  window.togglePanel = function(bodyId) {
    const body = document.getElementById(bodyId);
    const arrow = document.getElementById(bodyId + 'Arrow');
    if (!body) return;
    const isHidden = body.classList.toggle('collapsed');
    if (arrow) arrow.textContent = isHidden ? '▼' : '▲';
  };

  // Banner toggle
  const bannerToggle = document.getElementById('bannerToggle');
  const beginnerPanels = document.getElementById('beginnerPanels');
  const toggleArrow = document.getElementById('toggleArrow');
  if (bannerToggle && beginnerPanels) {
    bannerToggle.addEventListener('click', () => {
      const isOpen = bannerToggle.getAttribute('aria-expanded') === 'true';
      bannerToggle.setAttribute('aria-expanded', String(!isOpen));
      beginnerPanels.style.display = isOpen ? 'none' : '';
      if (toggleArrow) toggleArrow.textContent = isOpen ? '▼' : '▲';
    });
  }
});
