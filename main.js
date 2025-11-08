document.addEventListener('DOMContentLoaded', () => {
  const item2 = document.querySelector('.item2');
  if (!item2) return;

  const projets = Array.from(item2.querySelectorAll('a'));
  const allItems = Array.from(document.querySelectorAll('.bento-item'));
  const header = document.querySelector('.item1');

  // Crée le bouton fermer (réutilisable)
  const closeBtn = document.createElement('button');
  closeBtn.className = 'projets-close';
  closeBtn.type = 'button';
  closeBtn.innerText = 'Fermer';

  function openProject(target) {
    // cacher tous les bento sauf header et item2
    allItems.forEach(el => {
      if (el !== header && el !== item2) el.classList.add('hidden');
    });

    // mettre item2 en full-view
    item2.classList.add('full-view');

    // marquer l'élément cliqué
    projets.forEach(p => p.classList.remove('expanded'));
    target.classList.add('expanded');

    // cacher les autres mini-vignettes dans item2
    item2.classList.add('single-active');

    // ajouter bouton fermer si pas présent
    if (!item2.contains(closeBtn)) item2.appendChild(closeBtn);
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    allItems.forEach(el => el.classList.remove('hidden'));
    item2.classList.remove('full-view', 'single-active');
    projets.forEach(p => p.classList.remove('expanded'));
    if (item2.contains(closeBtn)) item2.removeChild(closeBtn);
    document.body.style.overflow = '';
  }

  // clic sur une vignette
  projets.forEach(p => {
    p.addEventListener('click', (e) => {
      e.preventDefault();
      const already = p.classList.contains('expanded');
      if (already) {
        closeProject();
      } else {
        openProject(p);
      }
    });
  });

  // clic sur le bouton fermer
  closeBtn.addEventListener('click', closeProject);

  // fermer avec Echap
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProject();
  });

  // si on clique en dehors de l'élément étendu, fermer
  item2.addEventListener('click', (e) => {
    if (!e.target.closest('a.expanded') && !e.target.classList.contains('projets-close')) {
      // ignore clicks on non-expansion area (optionnel) : ne ferme pas pour éviter frustration
      return;
    }
  });
});