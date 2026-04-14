const API_BASE = '/api';

async function fetchRecipes() {
  const res = await fetch(`${API_BASE}/`);
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
}

function difficultyClass(difficulty) {
  if (!difficulty) return '';
  const d = difficulty.toLowerCase();
  if (d === 'easy')   return 'badge--easy';
  if (d === 'medium') return 'badge--medium';
  if (d === 'hard')   return 'badge--hard';
  return '';
}

function formatTime(minutes) {
  if (!minutes && minutes !== 0) return null;
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function renderRecipes(recipes) {
  const list = Array.isArray(recipes) ? recipes : (recipes.data || recipes.recipes || []);
  const grid = document.getElementById('recipe-grid');
  const loading = document.getElementById('loading');
  const errorEl = document.getElementById('error-message');

  if (loading) loading.hidden = true;

  if (!list.length) {
    grid.innerHTML = '<p class="state-message">No recipes found.</p>';
    return;
  }

  grid.innerHTML = list.map(recipe => {
    const prepLabel = formatTime(recipe.prepTime);
    const cookLabel = formatTime(recipe.cookTime);
    const timeStr = [prepLabel && `Prep: ${prepLabel}`, cookLabel && `Cook: ${cookLabel}`].filter(Boolean).join(' · ');
    return `
      <article class="recipe-card">
        <h2>${escHtml(recipe.name)}</h2>
        <p>${escHtml(recipe.description || '')}</p>
        <div class="card-footer">
          <span class="meta-badge ${difficultyClass(recipe.difficulty)}">${escHtml(recipe.difficulty || 'Unknown')}</span>
          ${timeStr ? `<span style="font-size:.82rem;color:var(--color-text-muted)">${escHtml(timeStr)}</span>` : ''}
        </div>
        <div style="margin-top:.9rem">
          <a href="recipe.html?id=${encodeURIComponent(recipe._id)}" class="btn btn--primary" style="width:100%;text-align:center">View Recipe</a>
        </div>
      </article>
    `;
  }).join('');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showError(message) {
  const errorEl = document.getElementById('error-message');
  const loading = document.getElementById('loading');
  if (loading) loading.hidden = true;
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }
}

async function init() {
  try {
    const data = await fetchRecipes();
    renderRecipes(data);
  } catch (err) {
    showError('Failed to load recipes. Please try again later.');
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', init);
