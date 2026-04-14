const tips = [
  {
    title: 'Measure Flour Correctly',
    body: 'Spoon flour into the measuring cup and level it off. Scooping directly packs in extra flour and makes cookies dry and dense.'
  },
  {
    title: 'Use Room-Temperature Butter',
    body: 'Softened butter creams better with sugar, giving cookies the right texture. Leave it out 30–60 minutes before baking.'
  },
  {
    title: 'Don't Overmix the Dough',
    body: 'Mix until the ingredients are just combined. Overmixing develops gluten and leads to tough cookies.'
  },
  {
    title: 'Chill the Dough',
    body: 'Refrigerating dough for 30+ minutes prevents spreading and deepens flavour. Great for drop cookies like chocolate chip.'
  },
  {
    title: 'Use Parchment Paper',
    body: 'Lining your baking sheet prevents sticking and promotes even browning without burning the bottoms.'
  },
  {
    title: 'Watch Your Oven Temperature',
    body: 'Oven thermostats can be off. Use an oven thermometer and rotate pans halfway through baking for even results.'
  },
  {
    title: 'Let Cookies Cool on the Pan',
    body: 'Leave freshly baked cookies on the sheet for 5 minutes before transferring. They continue cooking from residual heat.'
  },
  {
    title: 'Store Properly',
    body: 'Keep cookies in an airtight container at room temperature. Add a slice of bread to keep them soft for longer.'
  }
];

function renderTips() {
  const container = document.getElementById('tipsContainer');
  if (!container) return;
  container.innerHTML = '';
  tips.forEach(tip => {
    const card = document.createElement('article');
    card.className = 'tip-card';
    card.innerHTML = `<h3>${tip.title}</h3><p>${tip.body}</p>`;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderTips);
