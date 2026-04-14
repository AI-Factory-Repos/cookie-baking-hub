const API_BASE = '/api';

// Lazy-load images with fade-in
function lazyImg(src, alt, className) {
  const img = document.createElement('img');
  img.alt = alt || '';
  img.className = (className || '') + ' loading';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.addEventListener('load', () => { img.classList.remove('loading'); img.classList.add('loaded'); });
  img.addEventListener('error', () => { img.classList.remove('loading'); img.classList.add('loaded'); img.src = 'https://placehold.co/400x200?text=Cookie'; });
  img.src = src;
  return img;
}

function difficultyBadge(level) {
  const d = (level || '').toLowerCase();
  return `<span class="badge ${d}">${level || 'Recipe'}</span>`;
}

function renderCard(recipe) {
  const card = document.createElement('article');
  card.className = 'recipe-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'link');
  card.setAttribute('aria-label', recipe.name);

  if (recipe.image) {
    card.appendChild(lazyImg(recipe.image, recipe.name, 'recipe-card-img'));
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'recipe-card-img';
    placeholder.style.cssText = 'background:#e8ddd5;display:flex;align-items:center;justify-content:center;font-size:2.5rem;';
    placeholder.textContent = '🍪';
    card.appendChild(placeholder);
  }

  const body = document.createElement('div');
  body.className = 'recipe-card-body';
  body.innerHTML = `
    ${difficultyBadge(recipe.difficulty)}
    <h3>${recipe.name}</h3>
    <p>${recipe.description ? recipe.description.slice(0, 100) + (recipe.description.length > 100 ? '…' : '') : ''}</p>
  `;
  card.appendChild(body);

  const navigate = () => { window.location.href = `recipe.html?id=${recipe._id}`; };
  card.addEventListener('click', navigate);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') navigate(); });

  return card;
}

function renderError(msg) {
  return `<div class="error-message" role="alert">${msg}</div>`;
}

async function loadRecipes() {
  const container = document.getElementById('recipesContainer');
  container.innerHTML = '<div class="loading-spinner" aria-label="Loading recipes"></div>';

  let recipes = [];
  try {
    const res = await fetch(`${API_BASE}/recipes`);
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    recipes = await res.json();
  } catch (err) {
    container.innerHTML = renderError('Could not load recipes. Please try again later.');
    return;
  }

  if (!Array.isArray(recipes) || recipes.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No recipes found. Check back soon!</p></div>';
    return;
  }

  let filtered = recipes;
  let activeFilter = '';
  let searchQuery = '';

  function render() {
    container.innerHTML = '';
    const result = filtered.filter(r => {
      const matchDiff = !activeFilter || (r.difficulty || '').toLowerCase() === activeFilter;
      const matchSearch = !searchQuery || (r.name || '').toLowerCase().includes(searchQuery) || (r.description || '').toLowerCase().includes(searchQuery);
      return matchDiff && matchSearch;
    });

    if (result.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No recipes match your search.</p></div>';
      return;
    }

    result.forEach(r => container.appendChild(renderCard(r)));
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.difficulty;
      render();
    });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  let debounceTimer;
  searchInput.addEventListener('input', e => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = e.target.value.trim().toLowerCase();
      render();
    }, 250);
  });

  render();
}

document.addEventListener('DOMContentLoaded', loadRecipes);
