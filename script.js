/* ================= ENVELOPE ================= */

const invitation = document.getElementById("invitation");
const envelopeScreen = document.getElementById("envelopeScreen");

if (invitation && envelopeScreen) {
  invitation.addEventListener("click", () => {
    invitation.classList.add("open");

    setTimeout(() => {
      envelopeScreen.classList.add("hidden");
      document.body.classList.remove("locked");
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 1350);
  });
}

/* ================= MUSIC ================= */

const musicButton = document.getElementById("musicButton");
const musicPlayer = document.getElementById("musicPlayer");
const musicProgress = document.getElementById("musicProgress");
const weddingMusic = document.getElementById("weddingMusic");

function updateMusicProgress() {
  if (!weddingMusic || !musicProgress || !weddingMusic.duration) return;

  const percent = (weddingMusic.currentTime / weddingMusic.duration) * 100;
  musicProgress.style.width = `${percent}%`;
}

if (musicButton && weddingMusic && musicPlayer) {
  musicButton.addEventListener("click", async (event) => {
    event.stopPropagation();

    try {
      if (weddingMusic.paused) {
        await weddingMusic.play();
        musicPlayer.classList.add("playing");
      } else {
        weddingMusic.pause();
        musicPlayer.classList.remove("playing");
      }

      updateMusicProgress();
    } catch (error) {
      console.warn("Музыка не запустилась. Проверь путь assets/audio/wedding-song.mp3", error);
    }
  });

  weddingMusic.addEventListener("timeupdate", updateMusicProgress);

  weddingMusic.addEventListener("ended", () => {
    musicPlayer.classList.remove("playing");
    updateMusicProgress();
  });
}

/* ================= SCROLL REVEAL ================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

document.querySelectorAll(".reveal, .timeline, .month-calendar").forEach((el) => {
  revealObserver.observe(el);
});

/* ================= TIMELINE HEART ================= */

const timeline = document.getElementById("timeline");
const timelineSvg = document.getElementById("timelineSvg");
const motionPath = document.getElementById("motionPath");
const movingHeart = document.getElementById("movingHeart");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateTimelineHeart() {
  if (!timeline || !timelineSvg || !motionPath || !movingHeart) return;

  const rect = timeline.getBoundingClientRect();
  const viewportH = window.innerHeight || document.documentElement.clientHeight;

  const start = viewportH * 0.72;
  const end = -rect.height * 0.15;
  const progress = clamp((start - rect.top) / (start - end), 0, 1);

  const length = motionPath.getTotalLength();
  const point = motionPath.getPointAtLength(length * progress);

  const svgRect = timelineSvg.getBoundingClientRect();
  const timelineRect = timeline.getBoundingClientRect();

  const scaleX = svgRect.width / 230;
  const scaleY = svgRect.height / 690;

  movingHeart.style.left = `${svgRect.left - timelineRect.left + point.x * scaleX}px`;
  movingHeart.style.top = `${svgRect.top - timelineRect.top + point.y * scaleY}px`;
}

window.addEventListener("scroll", updateTimelineHeart, { passive: true });
window.addEventListener("resize", updateTimelineHeart);
window.addEventListener("load", updateTimelineHeart);
updateTimelineHeart();

/* ================= COUNTDOWN ================= */

const countDays = document.getElementById("countDays");
const countHours = document.getElementById("countHours");
const countMinutes = document.getElementById("countMinutes");
const countSeconds = document.getElementById("countSeconds");

function updateCountdown() {
  if (!countDays || !countHours || !countMinutes || !countSeconds) return;

  const weddingDate = new Date("2026-08-29T12:00:00+03:00");
  const now = new Date();
  const diff = Math.max(weddingDate - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countDays.textContent = String(days).padStart(2, "0");
  countHours.textContent = String(hours).padStart(2, "0");
  countMinutes.textContent = String(minutes).padStart(2, "0");
  countSeconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
