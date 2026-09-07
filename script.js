document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 0. Nama tamu dari URL ?to=Nama ---------- */
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('to');
  if (guestName) {
    document.getElementById('guest-name').textContent = guestName;
  }

  /* ---------- 1. Loading screen -> Cover ---------- */
  const loadingScreen = document.getElementById('loading-screen');
  const cover = document.getElementById('cover');

  window.setTimeout(() => {
    loadingScreen.classList.add('hide');
    cover.classList.add('show');
    window.setTimeout(() => loadingScreen.remove(), 1000);
  }, 900);

  /* ---------- 2. Buka Undangan -> tampilkan konten + musik ---------- */
  const openBtn = document.getElementById('open-invitation');
  const mainContent = document.getElementById('main-content');
  const music = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  openBtn.addEventListener('click', () => {
    cover.classList.add('leaving');

    // Mulai musik dengan fade-in volume halus (butuh source mp3 asli di assets/music.mp3)
    music.volume = 0;
    music.play().then(() => {
      musicToggle.hidden = false;
      musicToggle.classList.add('playing');
      let v = 0;
      const fade = setInterval(() => {
        v += 0.07;
        if (v >= 0.7) { v = 0.7; clearInterval(fade); }
        music.volume = v;
      }, 100);
    }).catch(() => {
      // Autoplay diblokir browser atau file belum ada — tetap tampilkan tombol musik manual
      musicToggle.hidden = false;
    });

    window.setTimeout(() => {
      cover.style.display = 'none';
      mainContent.classList.add('show');
      window.scrollTo(0, 0);
      initScrollAnimations();
    }, 800);
  });

  musicToggle.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      musicToggle.classList.add('playing');
    } else {
      music.pause();
      musicToggle.classList.remove('playing');
    }
  });

  /* ---------- 3. Scroll reveal (Intersection Observer) ---------- */
  function initScrollAnimations() {
    const targets = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    targets.forEach(t => observer.observe(t));
  }

  /* ---------- 4. Simpan Tanggal (Google Calendar link) ---------- */
  const calAkad = document.getElementById('cal-akad');
  const calResepsi = document.getElementById('cal-resepsi');

  function gcalLink(title, details, startISO, endISO) {
    const base = 'https://www.google.com/calendar/render?action=TEMPLATE';
    return `${base}&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=${startISO}/${endISO}`;
  }
  calAkad.href = gcalLink(
    'Akad Nikah Fajar & Fany',
    'Rumah Fajar, Jl. Tanjungrejo Pangkahwetan, Ujungpangkah, Gresik',
    '20261219T020000Z', '20261219T040000Z'
  );
  calResepsi.href = gcalLink(
    'Resepsi Pernikahan Fajar & Fany',
    'Rumah Fajar, Jl. Tanjungrejo Pangkahwetan, Ujungpangkah, Gresik',
    '20261220T020000Z', '20261220T060000Z'
  );

  /* ---------- 5. RSVP (disimpan lokal di browser, tanpa backend) ---------- */
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success');
  const wishesList = document.getElementById('wishes-list');
  const STORAGE_KEY = 'fajar-fany-wishes';

  function loadWishes() {
    let wishes = [];
    try { wishes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { wishes = []; }
    wishesList.innerHTML = '';
    wishes.slice().reverse().forEach(w => {
      const item = document.createElement('div');
      item.className = 'wish-item';
      const name = document.createElement('p');
      name.className = 'wish-name';
      name.textContent = `${w.name} — ${w.attend === 'hadir' ? 'Hadir' : 'Tidak bisa hadir'}`;
      const text = document.createElement('p');
      text.className = 'wish-text';
      text.textContent = w.message || '';
      item.appendChild(name);
      if (w.message) item.appendChild(text);
      wishesList.appendChild(item);
    });
  }
  loadWishes();

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(rsvpForm);
    const entry = {
      name: (formData.get('name') || '').toString().trim(),
      guests: formData.get('guests'),
      attend: formData.get('attend'),
      message: (formData.get('message') || '').toString().trim(),
    };
    if (!entry.name) return;

    let wishes = [];
    try { wishes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { wishes = []; }
    wishes.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));

    rsvpForm.reset();
    rsvpSuccess.hidden = false;
    loadWishes();
    window.setTimeout(() => { rsvpSuccess.hidden = true; }, 4000);
  });

  /* ---------- 6. Salin nomor rekening ---------- */
  const copyBtn = document.getElementById('copy-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  const accNumber = document.getElementById('acc-number');

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(accNumber.textContent.trim());
    } catch (e) {
      // fallback untuk browser lama
      const temp = document.createElement('textarea');
      temp.value = accNumber.textContent.trim();
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }
    copyFeedback.hidden = false;
    window.setTimeout(() => { copyFeedback.hidden = true; }, 2500);
  });

});
