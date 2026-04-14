const API_BASE = '/api';

const difficultyLabel = (level) => {
  const map = { easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Hard' };
  return map[(level || '').toLowerCase()] || level;
};

const formatTime = (minutes) => {
  if (!minutes && minutes !== 0) return '—';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
};

const buildCard = (recipe) => {
  const card = document.createElement('article');
  card.className = 'recipe-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `View recipe: ${recipe.name}`);

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  card.innerHTML = `
    <div class="card-image-wrapper">
      <img
        src="${recipe.image || 'https://placehold.co/400x260/f5e6d3/8b4513?text=🍪'}"
        alt="${recipe.name}"
        class="card-image"
        loading="lazy"
        onerror="this.src='https://placehold.co/400x260/f5e6d3/8b4513?text=🍪'"
      />
    </div>
    <div class="card-body">
      <h2 class="card-title">${recipe.name}</h2>
      <div class="card-meta">
        <span class="meta-badge difficulty">${difficultyLabel(recipe.difficulty)}</span>
        <span class="meta-badge time">⏱ ${formatTime(totalTime)}</span>
      </div>
    </div>
  `;

  const navigate = () => {
    window.location.href = `recipe.html?id=${recipe._id}`;
  };

  card.addEventListener('click', navigate);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate();
    }
  });

  return card;
};

const showError = (msg) => {
  document.getElementById('loading').classList.add('hidden');
  const errorEl = document.getElementById('error');
  document.getElementById('error-message').textContent = msg;
  errorEl.classList.remove('hidden');
};

const renderRecipes = (recipes) => {
  document.getElementById('loading').classList.add('hidden');
  const grid = document.getElementById('recipe-grid');
  grid.classList.remove('hidden');

  if (!recipes.length) {
    grid.innerHTML = '<p class="empty-state">No recipes found.</p>';
    return;
  }

  recipes.forEach((recipe) => {
    grid.appendChild(buildCard(recipe));
  });
};

const fetchRecipes = async () => {
  try {
    const res = await fetch(`${API_BASE}/`);
    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }
    const data = await res.json();
    renderRecipes(Array.isArray(data) ? data : data.recipes || []);
  } catch (err) {
    showError('Failed to load recipes. Please refresh the page.');
    console.error(err);
  }
};

document.addEventListener('DOMContentLoaded', fetchRecipes);
