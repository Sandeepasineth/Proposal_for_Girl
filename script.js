/**
 * ============================================================================
 * 🌹 ROMANTIC PROPOSAL EXPERIENCE JAVASCRIPT 🌹
 * With Luminous Butterfly Swarm Engine (from 'Butterflies love web page'),
 * Playful Runway 'No' Button, Storytelling Progression, and Celebration Effects.
 * ============================================================================
 */

// --- 1. PERSONALIZATION CONFIGURATION ---
// You can edit the values below or directly inside index.html!
const CONFIG = {
  herName: "My Heart",
  yourName: "Your Idiot",
  personalMessage: "Every day with you is a gift I never take for granted. You are my warmth, my peace, and my absolute favorite dream come true.",
  typewriterText: "I've been wanting to tell you something for a long time. 🥺❤️",
  typewriterSpeed: 45 // Speed in milliseconds per character
};

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Global state for butterfly swarm
let butterflyController = null;

// Run initialization once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initPersonalization();
  initTypewriter();
  initScreenNavigation();
  initStoryProgression();
  initPhotoGalleryCheck();
  initButterflySwarm();
  initMusicPlayer();
  initPlayfulNoButton();
  initProposalCelebration();
});

/**
 * Applies personalized names and messages to all designated placeholders.
 */
function initPersonalization() {
  document.querySelectorAll(".her-name-text").forEach(el => {
    el.textContent = CONFIG.herName;
  });

  document.querySelectorAll(".your-name-text").forEach(el => {
    el.textContent = CONFIG.yourName;
  });

  const personalEl = document.querySelector(".personal-text");
  if (personalEl && CONFIG.personalMessage.trim()) {
    personalEl.textContent = CONFIG.personalMessage;
  }

  // Update document title dynamically
  if (document.title.includes("Sophia")) {
    document.title = document.title.replace("Sophia", CONFIG.herName);
  }
}

/**
 * 2. TYPEWRITER ANIMATION FOR OPENING SCREEN
 */
function initTypewriter() {
  const typewriterEl = document.getElementById("typewriterText");
  if (!typewriterEl) return;

  const text = CONFIG.typewriterText;
  let charIndex = 0;

  if (prefersReducedMotion) {
    typewriterEl.textContent = text;
    return;
  }

  typewriterEl.textContent = "";

  function typeNextChar() {
    if (charIndex < text.length) {
      typewriterEl.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeNextChar, CONFIG.typewriterSpeed);
    }
  }

  // Brief initial pause before typewriter starts
  setTimeout(typeNextChar, 600);
}

/**
 * 3. SCREEN TRANSITION: FROM OPENING TO MAIN STORY
 */
function initScreenNavigation() {
  const openBtn = document.getElementById("openBtn");
  const openingScreen = document.getElementById("openingScreen");
  const mainExperience = document.getElementById("mainExperience");

  if (!openBtn || !openingScreen || !mainExperience) return;

  openBtn.addEventListener("click", () => {
    // Start music on opening button interaction
    if (window.triggerRomanticMusic) {
      window.triggerRomanticMusic();
    }

    // Fade out opening screen
    openingScreen.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s ease";
    openingScreen.style.opacity = "0";
    openingScreen.style.transform = "scale(0.96)";

    setTimeout(() => {
      openingScreen.classList.add("hidden");
      openingScreen.setAttribute("aria-hidden", "true");

      mainExperience.classList.remove("hidden");
      mainExperience.setAttribute("aria-hidden", "false");

      // Scroll smoothly to top of main letter
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }, 600);
  });
}

/**
 * 4. PROGRESSIVE STORYTELLING & CHAPTER REVEAL
 * The 'Continue' button dynamically moves down below each newly revealed chapter!
 */
function initStoryProgression() {
  const continueBtn = document.getElementById("continueBtn");
  const stepControls = document.getElementById("stepControls");
  const firstCard = document.querySelector(".letter-card.visible");
  const hiddenCards = Array.from(document.querySelectorAll(".letter-card.hidden-step"));
  const photoGallery = document.getElementById("photoGallery");
  const proposalSection = document.getElementById("proposalSection");

  if (!continueBtn || !stepControls) return;

  // Initially position the Continue button immediately below the first visible chapter
  if (firstCard) {
    firstCard.after(stepControls);
  }

  // Build sequential list of steps to reveal
  const sequence = [...hiddenCards];
  if (photoGallery) sequence.push(photoGallery);
  if (proposalSection) sequence.push(proposalSection);

  let currentStepIndex = 0;

  continueBtn.addEventListener("click", () => {
    // If music hasn't started yet, this interaction starts it
    if (window.triggerRomanticMusic) {
      window.triggerRomanticMusic();
    }

    while (currentStepIndex < sequence.length) {
      const nextElement = sequence[currentStepIndex];
      currentStepIndex++;

      // Skip elements that were collapsed (e.g. photo gallery when no photos are present)
      if (nextElement.style.display === "none") {
        continue;
      }

      nextElement.classList.remove("hidden-step");
      nextElement.classList.add("visible");

      if (nextElement === proposalSection) {
        // We've arrived at the grand proposal climax!
        if (butterflyController) {
          butterflyController.setHeartFormation(true);
        }

        // Fade out and remove continue button at proposal
        stepControls.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        stepControls.style.opacity = "0";
        stepControls.style.transform = "scale(0.9)";
        setTimeout(() => {
          stepControls.style.display = "none";
        }, 400);

        // Smoothly scroll down to center proposal question
        setTimeout(() => {
          proposalSection.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "center"
          });
        }, 120);
        break;
      } else {
        // Move the Continue button down so it is immediately below the newly revealed chapter!
        nextElement.after(stepControls);

        // Smoothly scroll down so the reader sees the new chapter and the Continue button below it!
        setTimeout(() => {
          stepControls.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "end"
          });
        }, 120);
        break;
      }
    }
  });
}

/**
 * 5. PHOTO GALLERY MISSING IMAGE FALLBACK
 * Hides missing photos gracefully. If all images fail to load, hides entire gallery.
 */
function initPhotoGalleryCheck() {
  const photoGallery = document.getElementById("photoGallery");
  if (!photoGallery) return;

  const photoCards = Array.from(photoGallery.querySelectorAll(".photo-card"));
  let failedCount = 0;

  photoCards.forEach(card => {
    const img = card.querySelector("img");
    if (!img) return;

    img.addEventListener("error", () => {
      card.style.display = "none";
      failedCount++;

      // If all images fail to load, collapse the entire gallery section
      if (failedCount >= photoCards.length) {
        photoGallery.style.display = "none";
      }
    });

    // Check if image is already cached or broken
    if (img.complete && img.naturalWidth === 0) {
      card.style.display = "none";
      failedCount++;
      if (failedCount >= photoCards.length) {
        photoGallery.style.display = "none";
      }
    }
  });
}

/**
 * 6. CINEMATIC BUTTERFLY SWARM ANIMATION ENGINE
 * Ported & enhanced directly from 'D:\.Pro\Butterflies love web page'.
 * Includes glowing multi-colored butterflies with flapping wings, sparkle trails,
 * fireflies, falling petals, floating whispers, and interactive click bursts!
 */
function initButterflySwarm() {
  if (prefersReducedMotion) return;

  const canvas = document.getElementById("butterflyCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Multi-tone luminous palettes
  const PAL = [
    { p: "#00f0ff", m: "#3b82f6", d: "#03071e", g: "rgba(0,240,255,0.6)" },
    { p: "#ff2d75", m: "#a855f7", d: "#1f042e", g: "rgba(255,45,117,0.6)" },
    { p: "#ffd700", m: "#f97316", d: "#2e0e02", g: "rgba(255,215,0,0.6)" },
    { p: "#10b981", m: "#06b6d4", d: "#022c22", g: "rgba(16,185,129,0.6)" },
    { p: "#c084fc", m: "#ec4899", d: "#1e0533", g: "rgba(192,132,252,0.6)" }
  ];

  // Parametric heart coordinates
  function heartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x, y };
  }

  const heartSlots = [];
  for (let i = 0; i < 18; i++) {
    const t = (i / 18) * Math.PI * 2;
    const pt = heartPoint(t);
    heartSlots.push({ x: pt.x, y: pt.y });
  }

  // 18 Butterflies with individualized physics and sizes
  const bflies = [];
  for (let i = 0; i < 18; i++) {
    const pal = PAL[i % PAL.length];
    bflies.push({
      id: i,
      x: Math.random() * W,
      y: Math.random() * H,
      sz: i < 2 ? 26 : Math.random() * 9 + 14,
      vx: (Math.random() - 0.5) * 3.4,
      vy: (Math.random() - 0.5) * 3.4,
      hd: Math.random() * 6.28,
      fp: Math.random() * 6.28,
      fs: Math.random() * 0.12 + 0.18,
      pal,
      oR: Math.random() * 140 + 90,
      oA: Math.random() * 6.28,
      oS: (Math.random() - 0.5) * 0.024,
      hero: i < 2
    });
  }

  const MAX_P = 110;
  const parts = [];
  const petals = [];
  const whispers = [];

  // Luminous fireflies
  const flies = [];
  for (let i = 0; i < 25; i++) {
    flies.push({
      x: Math.random() * W,
      y: Math.random() * H,
      s: Math.random() * 1.6 + 0.8,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.5 + 0.35,
      ph: Math.random() * 6.28,
      c: Math.random() > 0.4 ? "#00f0ff" : "#ff2d75"
    });
  }

  function addTrail(x, y, c) {
    if (parts.length >= MAX_P) return;
    parts.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6 + 0.14,
      s: Math.random() * 2 + 0.8,
      l: 1,
      dc: Math.random() * 0.024 + 0.018,
      c,
      h: Math.random() > 0.82
    });
  }

  function burst(x, y, n) {
    const room = MAX_P - parts.length;
    for (let i = 0; i < Math.min(n, room); i++) {
      const a = Math.random() * 6.28,
        sp = Math.random() * 4.5 + 1.2;
      parts.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 0.6,
        s: Math.random() * 2.5 + 1,
        l: 1,
        dc: Math.random() * 0.02 + 0.012,
        c: Math.random() > 0.5 ? "#ffd700" : "#ff2d75",
        h: Math.random() > 0.65
      });
    }
  }

  function addPetal() {
    if (petals.length > 18) return;
    petals.push({
      x: Math.random() * W,
      y: -25,
      s: Math.random() * 6 + 9,
      vx: (Math.random() - 0.5) * 0.6,
      vy: Math.random() * 0.55 + 0.4,
      sw: Math.random() * 0.015 + 0.007,
      swP: Math.random() * 6.28,
      a: Math.random() * 6.28,
      aS: (Math.random() - 0.5) * 0.015,
      fl: Math.random() * 6.28,
      fS: Math.random() * 0.02 + 0.008,
      c: Math.random() > 0.4 ? "#ff2d75" : "#881337"
    });
  }

  const whisperTexts = [
    "I love you",
    "always",
    "forever",
    "my love",
    "♡",
    "you're my everything",
    "you still give me butterflies"
  ];

  function addWhisper() {
    if (whispers.length > 6) return;
    whispers.push({
      x: Math.random() * W * 0.7 + W * 0.15,
      y: H + 10,
      vy: -(Math.random() * 0.4 + 0.25),
      vx: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.3 + 0.18,
      size: Math.random() * 5 + 12,
      text: whisperTexts[Math.floor(Math.random() * whisperTexts.length)],
      color: Math.random() > 0.5 ? "rgba(214,129,158," : "rgba(201,164,76,",
      life: 1,
      decay: Math.random() * 0.002 + 0.001
    });
  }

  function drawHeart(x, y, sz, col, al) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, al);
    ctx.fillStyle = col;
    ctx.beginPath();
    const t = sz * 0.3;
    ctx.moveTo(x, y + t);
    ctx.bezierCurveTo(x, y, x - sz / 2, y, x - sz / 2, y + t);
    ctx.bezierCurveTo(x - sz / 2, y + (sz + t) / 2, x, y + sz, x, y + sz);
    ctx.bezierCurveTo(x, y + sz, x + sz / 2, y + (sz + t) / 2, x + sz / 2, y + t);
    ctx.bezierCurveTo(x + sz / 2, y, x, y, x, y + t);
    ctx.fill();
    ctx.restore();
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.a);
    ctx.scale(Math.cos(p.fl), 1);
    ctx.globalAlpha = 0.8;
    const g = ctx.createRadialGradient(0, -p.s * 0.2, p.s * 0.1, 0, 0, p.s * 0.9);
    g.addColorStop(0, "#fbcfe8");
    g.addColorStop(0.35, p.c);
    g.addColorStop(1, "#4c0519");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -p.s * 0.9);
    ctx.bezierCurveTo(p.s * 0.75, -p.s * 0.8, p.s * 0.85, p.s * 0.35, 0, p.s * 0.9);
    ctx.bezierCurveTo(-p.s * 0.85, p.s * 0.35, -p.s * 0.75, -p.s * 0.8, 0, -p.s * 0.9);
    ctx.fill();
    ctx.restore();
  }

  // Exact butterfly drawing function with gradient wings, antennae, and glowing shadows
  function drawBfly(b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.hd + Math.PI / 2);
    const w = Math.cos(b.fp),
      s = b.sz;

    ctx.shadowColor = b.pal.g;
    ctx.shadowBlur = 8;

    const gF = ctx.createLinearGradient(0, 0, -s * 1.5, -s * 0.6);
    gF.addColorStop(0, "#fff");
    gF.addColorStop(0.2, b.pal.p);
    gF.addColorStop(0.7, b.pal.m);
    gF.addColorStop(1, b.pal.d);

    const gH = ctx.createLinearGradient(0, 0, -s, s);
    gH.addColorStop(0, b.pal.p);
    gH.addColorStop(0.6, b.pal.m);
    gH.addColorStop(1, b.pal.d);

    // Left Wing
    ctx.save();
    ctx.scale(w, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s * 0.6, -s * 0.4, -s * 1.4, -s * 1.1, -s * 1.6, -s * 0.6);
    ctx.bezierCurveTo(-s * 1.7, 0, -s * 0.9, s * 0.4, 0, 0);
    ctx.fillStyle = gF;
    ctx.fill();
    ctx.strokeStyle = "#060212";
    ctx.lineWidth = 0.7;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, s * 0.1);
    ctx.bezierCurveTo(-s * 0.5, s * 0.2, -s * 1.2, s * 0.6, -s, s * 1.1);
    ctx.bezierCurveTo(-s * 0.6, s * 1.3, -s * 0.2, s * 0.8, 0, s * 0.3);
    ctx.fillStyle = gH;
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Right Wing
    ctx.save();
    ctx.scale(-w, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s * 0.6, -s * 0.4, -s * 1.4, -s * 1.1, -s * 1.6, -s * 0.6);
    ctx.bezierCurveTo(-s * 1.7, 0, -s * 0.9, s * 0.4, 0, 0);
    ctx.fillStyle = gF;
    ctx.fill();
    ctx.strokeStyle = "#060212";
    ctx.lineWidth = 0.7;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, s * 0.1);
    ctx.bezierCurveTo(-s * 0.5, s * 0.2, -s * 1.2, s * 0.6, -s, s * 1.1);
    ctx.bezierCurveTo(-s * 0.6, s * 1.3, -s * 0.2, s * 0.8, 0, s * 0.3);
    ctx.fillStyle = gH;
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Body
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#0f0728";
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.08, s * 0.38, 0, 0, 6.28);
    ctx.fill();

    // Antennae
    ctx.strokeStyle = b.pal.p;
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(-s * 0.04, -s * 0.33);
    ctx.quadraticCurveTo(-s * 0.16, -s * 0.6, -s * 0.25, -s * 0.55);
    ctx.moveTo(s * 0.04, -s * 0.33);
    ctx.quadraticCurveTo(s * 0.16, -s * 0.6, s * 0.25, -s * 0.55);
    ctx.stroke();

    ctx.restore();
  }

  let T0 = performance.now();
  let inHeartFormation = false;
  let heartStartTime = 0;

  function loop(now) {
    ctx.clearRect(0, 0, W, H);
    const t = (now - T0) / 1000;
    const cx = W / 2,
      cy = H / 2;

    // 1. Draw and update fireflies
    for (const f of flies) {
      f.ph += 0.016;
      f.x += f.vx + Math.sin(f.ph) * 0.2;
      f.y += f.vy + Math.cos(f.ph) * 0.2;
      if (f.x < 0) f.x = W;
      if (f.x > W) f.x = 0;
      if (f.y < 0) f.y = H;
      if (f.y > H) f.y = 0;

      ctx.save();
      ctx.globalAlpha = f.a * (Math.sin(f.ph) * 0.3 + 0.7);
      ctx.fillStyle = f.c;
      ctx.shadowColor = f.c;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.s, 0, 6.28);
      ctx.fill();
      ctx.restore();
    }

    // 2. Floating romantic whispers
    if (t > 4) {
      if (Math.random() > 0.98) addWhisper();
      for (let i = whispers.length - 1; i >= 0; i--) {
        const w = whispers[i];
        w.x += w.vx;
        w.y += w.vy;
        w.life -= w.decay;
        if (w.life <= 0 || w.y < -30) {
          whispers.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = w.alpha * w.life;
        ctx.font = `${w.size}px 'Playfair Display', serif`;
        ctx.fillStyle = w.color + (w.alpha * w.life).toFixed(2) + ")";
        ctx.textAlign = "center";
        ctx.fillText(w.text, w.x, w.y);
        ctx.restore();
      }
    }

    // 3. Update and draw butterflies
    const heartScale = Math.min(W, H) * 0.018;

    for (const b of bflies) {
      b.fp += b.fs;

      if (!inHeartFormation) {
        // Free-flying natural flocking mode across the entire screen
        b.x += b.vx;
        b.y += b.vy;

        // Bounce gently off screen boundaries
        if (b.x < 30) b.vx = Math.abs(b.vx);
        if (b.x > W - 30) b.vx = -Math.abs(b.vx);
        if (b.y < 30) b.vy = Math.abs(b.vy);
        if (b.y > H - 30) b.vy = -Math.abs(b.vy);

        b.hd = Math.atan2(b.vy, b.vx);
        if (Math.random() > 0.6) addTrail(b.x, b.y, b.pal.p);
      } else {
        // Heart flocking formation mode
        const heartT = t - heartStartTime;
        const ease = Math.min(1, heartT / 3.5);
        const slot = heartSlots[b.id % heartSlots.length];
        const tx = cx + slot.x * heartScale;
        const ty = cy - 40 + slot.y * heartScale;
        const lerp = ease * 0.055;

        b.x += (tx - b.x) * lerp;
        b.y += (ty - b.y) * lerp;
        b.hd += (0 - b.hd) * 0.04;
        b.fs = 0.1 + Math.sin(t * 2) * 0.03;

        if (Math.random() > 0.75) addTrail(b.x, b.y, b.pal.p);
      }

      drawBfly(b);
    }

    // 4. Update and draw trails & sparkle bursts
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx;
      p.y += p.vy;
      p.l -= p.dc;
      if (p.l <= 0) {
        parts.splice(i, 1);
        continue;
      }
      if (p.h) {
        drawHeart(p.x, p.y, p.s * p.l, p.c, p.l);
      } else {
        ctx.save();
        ctx.globalAlpha = p.l;
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s * p.l, 0, 6.28);
        ctx.fill();
        ctx.restore();
      }
    }

    // 5. Update and draw falling petals
    if (t > 2) {
      if (Math.random() > 0.93) addPetal();
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.swP += p.sw;
        p.a += p.aS;
        p.fl += p.fS;
        p.x += p.vx + Math.sin(p.swP) * 0.6;
        p.y += p.vy;
        if (p.y > H + 30) {
          petals.splice(i, 1);
          continue;
        }
        drawPetal(p);
      }
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  // Global click / tap interaction: burst of sparkles & petals wherever clicked!
  window.addEventListener("pointerdown", e => {
    burst(e.clientX, e.clientY, 22);
    addPetal();
    addPetal();
  });

  // Export controller for transitions
  butterflyController = {
    setHeartFormation(active) {
      inHeartFormation = active;
      if (active) {
        heartStartTime = (performance.now() - T0) / 1000;
        burst(W / 2, H / 2, 35);
      }
    },
    burst(x, y, n) {
      burst(x, y, n);
    }
  };
}

/**
 * 7. AUDIO BACKGROUND MUSIC PLAYER WITH AUTO-PLAY ON USER INTERACTION
 */
function initMusicPlayer() {
  const music = document.getElementById("bgMusic");
  const toggleBtn = document.getElementById("musicToggleBtn");
  const toast = document.getElementById("musicToast");
  const label = toggleBtn ? toggleBtn.querySelector(".music-label") : null;
  const icon = toggleBtn ? toggleBtn.querySelector(".music-icon") : null;

  if (!music || !toggleBtn) return;

  let isPlaying = false;
  let userManuallyPaused = false;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
  }

  function playMusic() {
    if (isPlaying || userManuallyPaused) return;

    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          toggleBtn.classList.add("playing");
          toggleBtn.setAttribute("aria-label", "Pause romantic music");
          if (label) label.textContent = "Pause Music";
          if (icon) icon.textContent = "⏸️";
        })
        .catch(error => {
          // Browser prevented autoplay prior to interaction; will retry on next user action
          console.log("Audio waiting for user gesture:", error);
        });
    }
  }

  function pauseMusic() {
    music.pause();
    isPlaying = false;
    userManuallyPaused = true;
    toggleBtn.classList.remove("playing");
    toggleBtn.setAttribute("aria-label", "Play background romantic music");
    if (label) label.textContent = "Play Music";
    if (icon) icon.textContent = "🎵";
  }

  // Expose global trigger so any interaction can immediately invoke it
  window.triggerRomanticMusic = () => {
    if (!userManuallyPaused) {
      playMusic();
    }
  };

  // Toggle button click handler
  toggleBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (!isPlaying) {
      userManuallyPaused = false;
      const playPromise = music.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlaying = true;
            toggleBtn.classList.add("playing");
            toggleBtn.setAttribute("aria-label", "Pause romantic music");
            if (label) label.textContent = "Pause Music";
            if (icon) icon.textContent = "⏸️";
          })
          .catch(error => {
            console.warn("Audio playback notice:", error);
            showToast("Add your song as 'music/romantic.mp3' to play background music! 🎵");
          });
      }
    } else {
      pauseMusic();
    }
  });

  // Global interaction triggers: clicking, tapping, or pressing a key automatically starts the music!
  const interactionEvents = ["click", "pointerdown", "touchstart", "keydown"];
  function onFirstUserGesture() {
    if (!isPlaying && !userManuallyPaused) {
      playMusic();
    }
  }

  interactionEvents.forEach(evt => {
    window.addEventListener(evt, onFirstUserGesture, { passive: true });
  });

  // Handle file missing or network playback error gracefully
  music.addEventListener("error", () => {
    if (isPlaying) {
      isPlaying = false;
      toggleBtn.classList.remove("playing");
      if (label) label.textContent = "Play Music";
      if (icon) icon.textContent = "🎵";
    }
  });
}

/**
 * 8. PLAYFUL RUNAWAY 'NO' BUTTON INTERACTION
 * The 'No' button playfully flees whenever the mouse cursor hovers or gets near it!
 */
function initPlayfulNoButton() {
  const noBtn = document.getElementById("noBtn");
  const noBtnText = document.getElementById("noBtnText");
  const playfulTip = document.getElementById("playfulTip");

  if (!noBtn) return;

  const playfulPhrases = [
    "No 🙈",
    "Are you sure? 🥺",
    "Think again! 😉",
    "Can't click me! 🏃‍♂️💨",
    "Try clicking Yes! ❤️",
    "Wait a second! ✨",
    "Give it another thought! 🌹",
    "Nice try! 💖",
    "My heart says yes! 🥰"
  ];
  let phraseIndex = 0;
  let currentOffset = { x: 0, y: 0 };
  let lastDodgeTime = 0;

  function dodgeButton(event) {
    if (prefersReducedMotion) return;

    const now = Date.now();
    // Throttle slightly to ensure ultra-smooth snappy animations
    if (now - lastDodgeTime < 90) return;
    lastDodgeTime = now;

    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    let targetX, targetY;

    if (event && event.clientX !== undefined) {
      // Move AWAY from mouse cursor
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const diffX = btnCenterX - mouseX;
      const diffY = btnCenterY - mouseY;

      const signX = diffX >= 0 ? 1 : -1;
      const signY = diffY >= 0 ? 1 : -1;

      // Generous jump distance so cursor can never catch it!
      const jumpDistanceX = 110 + Math.random() * 80;
      const jumpDistanceY = 45 + Math.random() * 45;

      targetX = signX * jumpDistanceX;
      targetY = signY * jumpDistanceY;
    } else {
      // Random jump
      const signX = Math.random() > 0.5 ? 1 : -1;
      const signY = Math.random() > 0.5 ? 1 : -1;
      targetX = signX * (100 + Math.random() * 80);
      targetY = signY * (40 + Math.random() * 40);
    }

    // Keep within safe viewport bounds
    const maxAllowedX = Math.min(220, window.innerWidth / 2 - 80);
    const maxAllowedY = 80;

    targetX = Math.max(-maxAllowedX, Math.min(maxAllowedX, targetX));
    targetY = Math.max(-maxAllowedY, Math.min(maxAllowedY, targetY));

    // Ensure it doesn't jump back to the exact same position
    if (Math.abs(targetX - currentOffset.x) < 40) {
      targetX = -targetX;
    }

    currentOffset.x = targetX;
    currentOffset.y = targetY;

    noBtn.style.transform = `translate(${targetX}px, ${targetY}px)`;

    // Cycle through playful phrases
    phraseIndex = (phraseIndex + 1) % playfulPhrases.length;
    if (noBtnText) {
      noBtnText.textContent = playfulPhrases[phraseIndex];
    }

    if (playfulTip && phraseIndex > 0) {
      playfulTip.textContent = "There's only one right answer here... ❤️";
      playfulTip.style.opacity = "1";
    }

    // Burst a small puff of sparkle particles when it dodges!
    if (butterflyController) {
      butterflyController.burst(btnCenterX, btnCenterY, 8);
    }
  }

  // 1. Direct hover / approach listeners on the button itself
  noBtn.addEventListener("mouseenter", dodgeButton);
  noBtn.addEventListener("mouseover", dodgeButton);
  noBtn.addEventListener("mousemove", dodgeButton);

  // 2. Proximity detection: if cursor approaches within 75px, it flees ahead of time!
  document.addEventListener("mousemove", e => {
    const proposalSection = document.getElementById("proposalSection");
    if (!proposalSection || !proposalSection.classList.contains("visible")) return;

    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
    if (dist < 75) {
      dodgeButton(e);
    }
  });

  // 3. Mobile touch: tapping dodges immediately so it cannot be pressed
  noBtn.addEventListener("pointerdown", e => {
    e.preventDefault();
    dodgeButton(e);
  });
  noBtn.addEventListener(
    "touchstart",
    e => {
      e.preventDefault();
      dodgeButton(e);
    },
    { passive: false }
  );

  // 4. Keyboard accessibility
  noBtn.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dodgeButton();
      if (playfulTip) {
        playfulTip.textContent = "My heart is truly hoping for a Yes! 🥺❤️";
        playfulTip.style.opacity = "1";
      }
    }
  });
}

/**
 * 9. YES BUTTON CELEBRATION & CONFETTI ENGINE
 */
function initProposalCelebration() {
  const yesBtn = document.getElementById("yesBtn");
  const overlay = document.getElementById("celebrationOverlay");
  const replayBtn = document.getElementById("replayBtn");
  const closeBtn = document.getElementById("closeCelebrationBtn");
  const canvas = document.getElementById("celebrationCanvas");

  if (!yesBtn || !overlay) return;

  let isCelebrating = false;

  function triggerCelebration() {
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");

    startConfettiParticles();

    // Trigger grand butterfly swarm heart burst
    if (butterflyController) {
      butterflyController.setHeartFormation(true);
      butterflyController.burst(window.innerWidth / 2, window.innerHeight / 2, 45);
    }

    // Haptic feedback if supported on mobile
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 150]);
    }
  }

  yesBtn.addEventListener("click", () => {
    if (isCelebrating) return;
    isCelebrating = true;
    triggerCelebration();
  });

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      startConfettiParticles();
      if (butterflyController) {
        butterflyController.burst(window.innerWidth / 2, window.innerHeight / 2, 40);
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
      isCelebrating = false;
    });
  }

  // Close celebration overlay on Escape key
  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
      isCelebrating = false;
    }
  });

  // Confetti Particle System using HTML5 Canvas
  function startConfettiParticles() {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const colors = ["#d6819e", "#6f1636", "#c9a44c", "#fdeef2", "#fad2df", "#ffffff", "#00f0ff", "#ffd700"];
    const particleCount = prefersReducedMotion ? 20 : 130;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 80,
        y: height / 2 + 50,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 18 - 8,
        gravity: 0.42,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        isHeart: Math.random() > 0.55
      });
    }

    let animationFrameId;

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      let stillAlive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.rotation += p.rotationSpeed;

        if (p.vy > 0) {
          p.opacity -= 0.008;
        }

        if (p.opacity > 0 && p.y < height + 40) {
          stillAlive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);

          if (p.isHeart) {
            // Draw small heart
            ctx.fillStyle = p.color;
            ctx.beginPath();
            const s = p.size;
            ctx.moveTo(0, s / 4);
            ctx.quadraticCurveTo(0, 0, s / 4, 0);
            ctx.quadraticCurveTo(s / 2, 0, s / 2, s / 4);
            ctx.quadraticCurveTo(s / 2, 0, (3 * s) / 4, 0);
            ctx.quadraticCurveTo(s, 0, s, s / 4);
            ctx.quadraticCurveTo(s, s / 2, (3 * s) / 4, (3 * s) / 4);
            ctx.lineTo(s / 2, s);
            ctx.lineTo(s / 4, (3 * s) / 4);
            ctx.quadraticCurveTo(0, s / 2, 0, s / 4);
            ctx.fill();
          } else {
            // Draw confetti rectangle
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
          }

          ctx.restore();
        }
      });

      if (stillAlive) {
        animationFrameId = requestAnimationFrame(renderParticles);
      } else {
        ctx.clearRect(0, 0, width, height);
        cancelAnimationFrame(animationFrameId);
      }
    }

    renderParticles();
  }
}