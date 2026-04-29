/* ================= ENVELOPE ================= */

const invitation = document.getElementById('invitation');
const envelopeScreen = document.getElementById('envelopeScreen');

if (invitation) {
  invitation.addEventListener('click', () => {
    invitation.classList.add('open');

    setTimeout(() => {
      envelopeScreen.style.display = "none";
      document.body.classList.remove('locked');
    }, 1200);
  });
}

/* ================= MUSIC ================= */

const musicButton = document.getElementById('musicButton');
const music = document.getElementById('weddingMusic');
const progress = document.getElementById('musicProgress');

if (musicButton && music) {
  musicButton.addEventListener('click', async () => {
    try {
      if (music.paused) {
        await music.play();
      } else {
        music.pause();
      }
    } catch (e) {
      console.log("Ошибка музыки:", e);
    }
  });

  music.addEventListener('timeupdate', () => {
    if (!music.duration) return;
    const percent = (music.currentTime / music.duration) * 100;
    progress.style.width = percent + "%";
  });
}

/* ================= SCROLL ANIMATION ================= */

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

revealElements.forEach(el => observer.observe(el));
