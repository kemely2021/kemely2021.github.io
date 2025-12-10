// script.js - navegación, animaciones, sidebar colapsable, búsqueda y carrusel Proyecto 1

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const yearEl = document.getElementById('year');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scrolling handled by CSS `scroll-behavior: smooth` (if supported).
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 720) sidebar.classList.remove('open');

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Menu toggle for mobile
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // IntersectionObserver para revelar secciones con animación
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Buscar texto en secciones y mostrar la 1ra coincidencia
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) return;
      for (let s of sections) {
        if (s.textContent.toLowerCase().includes(q)) {
          s.scrollIntoView({behavior:'smooth', block:'start'});
          const id = s.id;
          navLinks.forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#' + id));
          break;
        }
      }
    });
  }

  // Actualizar link activo según sección visible
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  // Cerrar sidebar si el usuario redimensiona a escritorio
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) sidebar.classList.remove('open');
  });

  // Cerrar sidebar tocando fuera (en móvil)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 720 && sidebar.classList.contains('open')) {
      const isClickInside = sidebar.contains(e.target) || (menuToggle && menuToggle.contains(e.target));
      if (!isClickInside) sidebar.classList.remove('open');
    }
  });

  /* =========================================================
     Carrusel Proyecto 1 - Grammar Quest
  ========================================================= */
  const grammarImages = [
    'assets/grammar.gif',
    'assets/grammar2.gif'
  ];

  let currentGrammarIndex = 0;
  const grammarImg = document.getElementById('grammarImg');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (grammarImg && prevBtn && nextBtn) {
    // Crear indicadores dinámicamente
    const carouselContainer = grammarImg.parentElement;
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    grammarImages.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => {
        currentGrammarIndex = i;
        updateGrammarImage();
      });
      indicators.appendChild(dot);
    });
    carouselContainer.appendChild(indicators);

    function updateIndicators() {
      indicators.querySelectorAll('span').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentGrammarIndex);
      });
    }

    function updateGrammarImage() {
      grammarImg.style.opacity = 0;
      setTimeout(() => {
        grammarImg.src = grammarImages[currentGrammarIndex];
        grammarImg.style.opacity = 1;
        updateIndicators();
      }, 200);
    }

    prevBtn.addEventListener('click', () => {
      currentGrammarIndex = (currentGrammarIndex - 1 + grammarImages.length) % grammarImages.length;
      updateGrammarImage();
    });

    nextBtn.addEventListener('click', () => {
      currentGrammarIndex = (currentGrammarIndex + 1) % grammarImages.length;
      updateGrammarImage();
    });

    // Inicializar indicadores
    updateIndicators();
  }
});
