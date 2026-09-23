// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
}

// Publication search and filter (research page)
const list = document.querySelector('[data-pubs]');
if (list) {
  const q = document.getElementById('pub-q');
  const type = document.getElementById('pub-type');
  const count = document.getElementById('pub-count');
  const empty = document.getElementById('pub-empty');
  const rows = [...list.children];

  const apply = () => {
    const terms = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const row of rows) {
      const text = row.textContent.toLowerCase();
      const ok = (!type.value || row.dataset.type === type.value) && terms.every((t) => text.includes(t));
      row.hidden = !ok;
      if (ok) shown++;
    }
    count.textContent = `${shown} of ${rows.length} items`;
    empty.hidden = shown > 0;
  };
  q.addEventListener('input', apply);
  type.addEventListener('change', apply);
  apply();
}
