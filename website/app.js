document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. INTERACTIVE BEFORE/AFTER SLIDER
  // ==========================================
  const slider = document.querySelector('.comparison-slider');
  const slideAfter = document.querySelector('.slide-after');
  const handle = document.querySelector('.slider-handle');

  if (slider && slideAfter && handle) {
    let isDragging = false;

    // Core movement calculation
    const moveSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const positionX = clientX - rect.left;
      
      // Calculate percentage width (clamped between 0 and 100)
      let percentage = (positionX / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      // Apply changes in real-time
      slideAfter.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    // Mouse Events
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      moveSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });

    // Touch Events (Mobile)
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      moveSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      moveSlider(e.touches[0].clientX);
    });

    // Hover helper: dynamic shift on mouse entering/moving without drag
    slider.addEventListener('mousemove', (e) => {
      if (isDragging) return;
      // Gently follow the mouse even when not clicked to encourage interaction
      const rect = slider.getBoundingClientRect();
      const positionX = e.clientX - rect.left;
      let percentage = (positionX / rect.width) * 100;
      if (percentage >= 0 && percentage <= 100) {
        // Slow transition when just hovering so it feels smooth
        slideAfter.style.transition = 'width 0.15s ease-out';
        handle.style.transition = 'left 0.15s ease-out';
        
        slideAfter.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
      }
    });

    slider.addEventListener('mouseleave', () => {
      // Return to center when mouse leaves
      slideAfter.style.transition = 'width 0.4s ease';
      handle.style.transition = 'left 0.4s ease';
      slideAfter.style.width = '50%';
      handle.style.left = '50%';
    });

    slider.addEventListener('mouseenter', () => {
      // Clear transitions to avoid lag during tracking
      slideAfter.style.transition = 'none';
      handle.style.transition = 'none';
    });
  }

  // ==========================================
  // 2. TABBED INSTALL GUIDE
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update active button state and ARIA attribute
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update active content display
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `tab-${targetTab}`) {
          content.classList.add('active');
        }
      });
    });
  });

  // ==========================================
  // 3. FAQ ACCORDION
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');

      // Collapse all other FAQ items and reset ARIA attributes
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const q = item.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current item and update ARIA attribute
      if (!isActive) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        // Set maximum height to scrollHeight for a smooth CSS expand transition
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      } else {
        faqItem.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      }
    });
  });
});
