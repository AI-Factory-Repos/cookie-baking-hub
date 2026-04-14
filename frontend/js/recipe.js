const API_BASE = '/api';

function lazyImg(src, alt, className) {
  const img = document.createElement('img');
  img.alt = alt || '';
  img.className = (className || '') + ' loading';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.addEventListener('load', () => { img.classList.remove('loading'); img.classList.add('loaded'); });
  img.addEventListener('error', () => {
    img.classList.remove('loading'); img.classList.add('loaded');
    img.src = 'https://placehold.co/800x400?text=Cookie';
  });
  img.src = src;
  return img;
}

function difficultyClass(level) {
  return (level || '').toLowerCase();
}

async function loadRecipe() {
  const container = document.getElementById('recipeContainer');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    container.innerHTML = '<div class="error-message">No recipe ID provided.</div>';
    return;
  }

  container.innerHTML = '<div class="loading-spinner" aria-label="Loading recipe"></div>';

  let recipe;
  try {
    const res = await fetch(`${API_BASE}/recipes/${id}`);
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    recipe = await res.json();
  } catch (err) {
    container.innerHTML = '<div class="error-message">Could not load recipe. Please try again later.</div>';
    return;
  }

  document.title = `${recipe.name} – Cookie Baking Hub`;

  container.innerHTML = '';

  // Image
  if (recipe.image) {
    container.appendChild(lazyImg(recipe.image, recipe.name, 'recipe-hero-img'));
  }

  // Title + badge
  const heading = document.createElement('h1');
  heading.style.cssText = 'font-family:var(--font-heading);font-size:clamp(1.75rem,4vw,2.5rem);margin-bottom:0.5rem;';
  heading.textContent = recipe.name;
  container.appendChild(heading);

  if (recipe.difficulty) {
    const badge = document.createElement('span');
    badge.className = `badge ${difficultyClass(recipe.difficulty)}`;
    badge.textContent = recipe.difficulty;
    container.appendChild(badge);
  }

  // Meta
  const meta = document.createElement('div');
  meta.className = 'recipe-meta';
  const metaItems = [
    { label: 'Prep Time', value: recipe.prepTime ? `${recipe.prepTime} min` : '—' },
    { label: 'Bake Time', value: recipe.bakingTime ? `${recipe.bakingTime} min` : '—' },
    { label: 'Servings', value: recipe.servings || '—' },
    { label: 'Difficulty', value: recipe.difficulty || '—' }
  ];

  metaItems.forEach(({ label, value }) => {
    meta.innerHTML += `<div class="recipe-meta-item"><span class="label">${label}</span><span class="value">${value}</span></div>`;
  });
  container.appendChild(meta);

  // Description
  if (recipe.description) {
    const desc = document.createElement('p');
    desc.style.cssText = 'margin-bottom:2rem;font-size:1.05rem;color:var(--text-muted);line-height:1.8;';
    desc.textContent = recipe.description;
    container.appendChild(desc);
  }

  // Ingredients
  if (recipe.ingredients && recipe.ingredients.length) {
    const section = document.createElement('section');
    section.className = 'recipe-section';
    section.innerHTML = '<h2>Ingredients</h2>';
    const ul = document.createElement('ul');
    ul.className = 'ingredient-list';
    recipe.ingredients.forEach(ing => {
      const li = document.createElement('li');
      li.textContent = ing;
      ul.appendChild(li);
    });
    section.appendChild(ul);
    container.appendChild(section);
  }

  // Instructions / Steps
  if (recipe.instructions && recipe.instructions.length) {
    const section = document.createElement('section');
    section.className = 'recipe-section';
    section.innerHTML = '<h2>Instructions</h2>';
    const ol = document.createElement('ol');
    ol.className = 'steps-list';
    recipe.instructions.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      ol.appendChild(li);
    });
    section.appendChild(ol);
    container.appendChild(section);
  }

  // Print button
  const printBtn = document.createElement('button');
  printBtn.className = 'btn btn-outline print-btn';
  printBtn.innerHTML = '🖨️ Print Recipe';
  printBtn.addEventListener('click', () => window.print());
  container.appendChild(printBtn);
}

document.addEventListener('DOMContentLoaded', loadRecipe);
