const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Float toggle
  const floatToggle = document.getElementById('floatToggle');
  const floatOptions = document.getElementById('floatOptions');
  floatToggle.addEventListener('click', () => {
    floatToggle.classList.toggle('open');
    floatOptions.classList.toggle('open');
  });
  floatOptions.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    floatToggle.classList.remove('open');
    floatOptions.classList.remove('open');
  }));
  document.addEventListener('click', (e) => {
    if (!document.getElementById('floatGroup').contains(e.target)) {
      floatToggle.classList.remove('open');
      floatOptions.classList.remove('open');
    }
  });

  // Lead capture — submits to Formspree, no more mailto (which silently failed on many phones)
  const leadForm = document.getElementById('leadForm');
  const leadSubmitBtn = document.getElementById('leadSubmitBtn');
  const leadStatus = document.getElementById('leadStatus');

  leadForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    leadSubmitBtn.disabled = true;
    leadSubmitBtn.textContent = 'Sending...';
    leadStatus.className = 'form-status';
    leadStatus.textContent = '';

    try {
      const response = await fetch(leadForm.action, {
        method: 'POST',
        body: new FormData(leadForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        leadStatus.textContent = '✓ Got it — your 10% off code is on its way to your inbox.';
        leadStatus.className = 'form-status success';
        leadForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      leadStatus.textContent = 'Something went wrong — please call or text us at (856) 538-0407 instead.';
      leadStatus.className = 'form-status error';
    } finally {
      leadSubmitBtn.disabled = false;
      leadSubmitBtn.textContent = 'Claim My 10% Off';
    }
  });

    // GALLERY LIGHTBOX
  const galleryData = [
    { src: 'Images/Black-Escalade-O.webp', title: 'Black Cadillac Escalade', sub: 'Exterior Detail' },
    { src: 'Images/Blue-Bronco-O.webp',    title: 'Blue Ford Bronco',         sub: 'Exterior Detail' },
    { src: 'Images/Green-BMW-I.webp',      title: 'Green BMW',                sub: 'Interior Detail' },
    { src: 'Images/Green-BMW-O.webp',      title: 'Green BMW',                sub: 'Exterior Detail' },
    { src: 'Images/Mache-I.webp',          title: 'Ford Mustang Mach-E',      sub: 'Interior Detail' },
    { src: 'Images/Orange-BMW-I.webp',     title: 'Orange BMW',               sub: 'Interior Detail' },
    { src: null, title: 'Coming Soon', sub: '' },
    { src: null, title: 'Coming Soon', sub: '' },
  ];

  let currentIndex = 0;

  function openLightbox(index) {
    if (galleryData[index].src === null) return;
    currentIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
  }

  function shiftLightbox(dir) {
    let next = currentIndex + dir;
    // Skip placeholder slots
    while (next >= 0 && next < galleryData.length && galleryData[next].src === null) next += dir;
    if (next < 0 || next >= galleryData.length) return;
    currentIndex = next;
    updateLightbox();
  }

  function updateLightbox() {
    const item = galleryData[currentIndex];
    document.getElementById('lightboxImg').src = item.src;
    document.getElementById('lightboxImg').alt = item.title + ' — ' + item.sub;
    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxSub').textContent = item.sub;
 }
    
  // CALCULATOR
  const prices = { '95': 95, '145': 145, '235': 235 };
  let selectedWeeks = 4;
  let selectedDisc = 0.25;

  function fmt(n) { return '$' + Math.round(n).toLocaleString(); }

  function updateCalc() {
    const base = parseFloat(document.getElementById('calcPackage').value);
    const weeksPerYear = 52;
    const visits = Math.round(weeksPerYear / selectedWeeks);
    const memberPrice = base * (1 - selectedDisc);
    const fullYear = base * visits;
    const memberYear = memberPrice * visits;
    const savings = fullYear - memberYear;
    const discPct = Math.round(selectedDisc * 100);

    document.getElementById('rFullVisit').textContent = fmt(base);
    document.getElementById('rMemberVisit').textContent = fmt(memberPrice);
    document.getElementById('rVisits').textContent = visits + 'x';
    document.getElementById('rFullYear').textContent = fmt(fullYear);
    document.getElementById('rMemberYear').textContent = fmt(memberYear);
    document.getElementById('rSavings').textContent = fmt(savings);
    document.getElementById('rDiscTag').textContent = discPct + '% Member Discount';
  }

  document.querySelectorAll('.freq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedWeeks = parseInt(btn.dataset.weeks);
      selectedDisc = parseFloat(btn.dataset.disc);
      updateCalc();
    });
  });

  document.getElementById('calcPackage').addEventListener('change', updateCalc);
  updateCalc();

  // QUOTE FORM SUBMISSION
  const quoteForm = document.getElementById('quoteForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');
  const formStatus = document.getElementById('formStatus');

  quoteForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Sending...';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    try {
      const response = await fetch(quoteForm.action, {
        method: 'POST',
        body: new FormData(quoteForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = '✓ Quote request sent! We\'ll reach out within a couple minutes.';
        formStatus.className = 'form-status success';
        quoteForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      formStatus.textContent = 'Something went wrong — please call or text us at (856) 538-0407 instead.';
      formStatus.className = 'form-status error';
    } finally {
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = 'Send My Quote Request →';
    }
  });
