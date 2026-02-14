const openLetterBtn = document.getElementById("open-letter");
const surpriseBtn = document.getElementById("surprise-btn");
const musicBtn = document.getElementById("music-btn");
const letterSection = document.getElementById("letter");
const letterTextEl = document.getElementById("letter-text");
const reasonsList = document.getElementById("reasons-list");
const countdownEl = document.getElementById("countdown");
const loveFill = document.getElementById("love-fill");
const loveText = document.getElementById("love-text");
const audio = document.getElementById("love-audio");
const romanticSurprise = document.getElementById("romantic-surprise");
const surpriseLineEl = document.getElementById("surprise-line");
const memoryCarousel = document.getElementById("memory-carousel");
const memoryTrack = document.getElementById("memory-track");

const letter = [
  "Mercy, from the moment love learned your name, my world stopped being ordinary.",
  "You are my peace in chaos, my smile in long days, my prayer in quiet nights, and the first beautiful thought I wake up with.",
  "There is a fire in the way I love you, gentle but unending, a burning tenderness that keeps choosing you again and again.",
  "When life has felt heavy on your shoulders, I have seen your strength, your softness, and your courage shine through the dark.",
  "Please remember this when your heart feels tired: you are deeply loved, fiercely and truly.",
  "You are loved by me with all that I am, and you are loved by your mom, and by David and Justice, who carry you in their hearts too.",
  "You are not alone in any storm, not in any fear, not in any silent ache. You are held, seen, and cherished every day.",
  "If I could, I would write your name across every sunrise just to remind the world how precious you are.",
  "I promise to keep choosing you in ordinary mornings, in difficult seasons, and in every dream we build together.",
  "Happy Valentine's Day, Mercy. I love you more than words can hold, more than time can measure, more than fire can burn."
].join("\n\n");

const reasons = [
  "Your laugh can fix my worst day.",
  "You make simple moments unforgettable.",
  "Your kindness is effortless and real.",
  "You believe in me even when I doubt myself.",
  "You are home to me."
];

const surpriseLines = [
  "Mercy, your heart is a beautiful light that keeps shining through everything.",
  "You are loved beyond measure by me, your mom, David, and Justice.",
  "You make life softer, brighter, and more meaningful just by being you.",
  "You are my answered prayer in human form."
];

const floatingNoteLines = [
  "I adore you, Mercy",
  "Forever yours",
  "My answered prayer",
  "My favorite person",
  "You are deeply loved",
  "My heart chose you"
];

let memoryCarouselTimer = null;
let currentMemoryIndex = 0;

function typeWriter(text, target, speed = 24) {
  target.textContent = "";
  let i = 0;

  return new Promise((resolve) => {
    const timer = setInterval(() => {
      target.textContent += text[i] || "";
      i += 1;
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function revealLetter() {
  letterSection.hidden = false;
  await typeWriter(letter, letterTextEl, 18);
}

function populateReasons() {
  reasonsList.innerHTML = "";
  reasons.forEach((reason, idx) => {
    const li = document.createElement("li");
    li.style.animationDelay = `${idx * 0.16}s`;
    li.textContent = reason;
    reasonsList.appendChild(li);
  });
}

function animateLoveMeter() {
  let value = 0;
  const max = 100;
  let buzzFrame = 0;

  const startInfinityBuzz = () => {
    loveFill.classList.add("infinity-overload");
    loveText.classList.add("infinity-overload");

    // Soft haptic buzz on supported devices.
    if (navigator.vibrate) {
      navigator.vibrate([80, 40, 80, 40, 120]);
    }

    setInterval(() => {
      const sparks = ["Infinity%  !!!", "Infinity%   !!", "Infinity%    !"];
      loveText.textContent = sparks[buzzFrame % sparks.length];
      buzzFrame += 1;
    }, 120);
  };

  const timer = setInterval(() => {
    value += 1;
    loveFill.style.width = `${value}%`;
    loveText.textContent = `${value}%`;
    if (value >= max) {
      clearInterval(timer);
      startInfinityBuzz();
    }
  }, 40);
}

function setupCountdown() {
  // Next Friday at 8:00 PM local time as "date night"
  const now = new Date();
  const target = new Date(now);
  target.setHours(20, 0, 0, 0);

  const day = target.getDay();
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  target.setDate(target.getDate() + daysUntilFriday);

  const update = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      countdownEl.textContent = "It's date night now <3";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    countdownEl.textContent = `${d}d ${h}h ${m}m`;
  };

  update();
  setInterval(update, 1000 * 20);
}

function makeConfettiHearts(count = 18) {
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("div");
    heart.textContent = Math.random() > 0.5 ? "❤" : "💕";
    heart.style.position = "fixed";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = "-20px";
    heart.style.fontSize = `${16 + Math.random() * 24}px`;
    heart.style.opacity = `${0.6 + Math.random() * 0.4}`;
    heart.style.zIndex = "5";
    heart.style.pointerEvents = "none";
    heart.style.transition = `transform ${2.5 + Math.random() * 2}s linear, opacity 0.6s ease`;

    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      const drift = (Math.random() - 0.5) * 140;
      heart.style.transform = `translate(${drift}px, ${window.innerHeight + 80}px) rotate(${Math.random() * 360}deg)`;
    });

    setTimeout(() => {
      heart.style.opacity = "0";
    }, 1800);

    setTimeout(() => {
      heart.remove();
    }, 4600);
  }
}

function showFloatingLoveNotes(count = 7) {
  for (let i = 0; i < count; i += 1) {
    const note = document.createElement("div");
    note.className = "love-note";
    note.textContent = floatingNoteLines[Math.floor(Math.random() * floatingNoteLines.length)];
    note.style.left = `${8 + Math.random() * 82}vw`;
    note.style.top = `${58 + Math.random() * 28}vh`;
    note.style.animationDelay = `${i * 0.08}s`;
    document.body.appendChild(note);

    setTimeout(() => {
      note.remove();
    }, 2900);
  }
}

function runRomanticSurprise() {
  makeConfettiHearts(30);
  showFloatingLoveNotes(8);

  if (romanticSurprise.hidden) {
    romanticSurprise.hidden = false;
    romanticSurprise.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      startMemoryCarousel();
    }, 600);
  }

  const randomLine = surpriseLines[Math.floor(Math.random() * surpriseLines.length)];
  surpriseLineEl.textContent = randomLine;
  surpriseBtn.textContent = "More Love";

  document.body.style.filter = "saturate(1.08)";
  setTimeout(() => {
    document.body.style.filter = "none";
  }, 420);
}

function startMemoryCarousel() {
  if (!memoryTrack) {
    return;
  }

  const slides = Array.from(memoryTrack.children);
  if (!slides.length) {
    return;
  }
  const slideDelayMs = 3800;

  const moveToSlide = (index) => {
    const target = slides[index];
    memoryTrack.style.transform = `translateX(-${target.offsetLeft}px)`;
  };

  const goToNextSlide = () => {
    const nextIndex = (currentMemoryIndex + 1) % slides.length;
    if (nextIndex !== 0) {
      currentMemoryIndex = nextIndex;
      moveToSlide(currentMemoryIndex);
      scheduleNextSlide();
      return;
    }

    if (!memoryCarousel) {
      currentMemoryIndex = 0;
      moveToSlide(currentMemoryIndex);
      scheduleNextSlide();
      return;
    }

    memoryCarousel.classList.add("is-fading");
    setTimeout(() => {
      currentMemoryIndex = 0;
      moveToSlide(currentMemoryIndex);
      requestAnimationFrame(() => {
        memoryCarousel.classList.remove("is-fading");
        scheduleNextSlide();
      });
    }, 420);
  };

  const scheduleNextSlide = () => {
    const currentSlide = slides[currentMemoryIndex];
    const videoInSlide = currentSlide.querySelector("video");

    if (videoInSlide) {
      videoInSlide.currentTime = 0;
      videoInSlide.play().catch(() => {
        memoryCarouselTimer = setTimeout(goToNextSlide, slideDelayMs);
      });
      videoInSlide.addEventListener("ended", goToNextSlide, { once: true });
      return;
    }

    memoryCarouselTimer = setTimeout(() => {
      goToNextSlide();
    }, slideDelayMs);
  };

  if (memoryCarouselTimer) {
    clearTimeout(memoryCarouselTimer);
  }
  moveToSlide(currentMemoryIndex);
  scheduleNextSlide();

  window.addEventListener("resize", () => {
    moveToSlide(currentMemoryIndex);
  }, { passive: true });
}

function setupMusicToggle() {
  let on = false;
  const gapBetweenTracksMs = 3000;
  const playlistTracks = [
    "music/Dave-feat-Tems-Raindance-(CeeNaija.com).mp3",
    "music/dave-feat-tems-raindance-ceenaijacom-2jxtf8dh-jhmi1duy_Kqwzk8P2.mp3"
  ];
  let currentTrackIndex = 0;
  let nextTrackTimer = null;
  let autoPlayBlocked = false;

  const clearNextTrackTimer = () => {
    if (nextTrackTimer) {
      clearTimeout(nextTrackTimer);
      nextTrackTimer = null;
    }
  };

  const setTrack = (trackIndex) => {
    currentTrackIndex = trackIndex;
    audio.src = playlistTracks[currentTrackIndex];
    audio.load();
  };

  const setStoppedState = (label = "Music: Off") => {
    on = false;
    musicBtn.setAttribute("aria-pressed", "false");
    musicBtn.textContent = label;
  };

  const playCurrentTrack = async () => {
    await audio.play();
    on = true;
    autoPlayBlocked = false;
    musicBtn.setAttribute("aria-pressed", "true");
    musicBtn.textContent = `Music: On (${currentTrackIndex + 1}/${playlistTracks.length})`;
  };

  const tryAutoPlay = async () => {
    try {
      if (!audio.src) {
        setTrack(0);
      }
      await playCurrentTrack();
      return true;
    } catch {
      autoPlayBlocked = true;
      setStoppedState("Music: Tap to Play");
      return false;
    }
  };

  const unlockOnFirstInteraction = () => {
    if (!autoPlayBlocked || on) {
      return;
    }
    tryAutoPlay();
  };

  ["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
    window.addEventListener(eventName, unlockOnFirstInteraction, { passive: true });
  });

  window.addEventListener("load", () => {
    if (!audio.src) {
      setTrack(0);
    }
    tryAutoPlay();
  });

  audio.addEventListener("ended", async () => {
    if (!on) {
      return;
    }

    if (currentTrackIndex < playlistTracks.length - 1) {
      musicBtn.textContent = "Music: Waiting for next track...";
      clearNextTrackTimer();
      nextTrackTimer = setTimeout(async () => {
        if (!on) {
          return;
        }
        try {
          setTrack(currentTrackIndex + 1);
          await playCurrentTrack();
        } catch {
          setStoppedState("Music: Tap Again");
        }
      }, gapBetweenTracksMs);
      return;
    }

    setTrack(0);
    setStoppedState("Music: Replay");
  });

  musicBtn.addEventListener("click", async () => {
    if (!on) {
      try {
        clearNextTrackTimer();
        if (!audio.src) {
          setTrack(0);
        }
        await playCurrentTrack();
      } catch {
        setStoppedState("Music: Tap Again");
      }
    } else {
      clearNextTrackTimer();
      audio.pause();
      setStoppedState("Music: Off");
    }
  });
}

function setupHeartCanvas() {
  const canvas = document.getElementById("heart-canvas");
  const ctx = canvas.getContext("2d");

  const hearts = [];
  const total = 42;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  class HeartParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + Math.random() * 60;
      this.size = 8 + Math.random() * 14;
      this.speed = 0.4 + Math.random() * 1.2;
      this.sway = (Math.random() - 0.5) * 0.6;
      this.alpha = 0.2 + Math.random() * 0.55;
    }

    step() {
      this.y -= this.speed;
      this.x += this.sway;
      if (this.y < -40 || this.x < -40 || this.x > canvas.width + 40) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 20, this.size / 20);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = "#e23e63";
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.bezierCurveTo(12, -18, 28, -2, 0, 18);
      ctx.bezierCurveTo(-28, -2, -12, -18, 0, -6);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < total; i += 1) {
    hearts.push(new HeartParticle());
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((h) => {
      h.step();
      h.draw();
    });
    requestAnimationFrame(animate);
  };

  resize();
  animate();
  window.addEventListener("resize", resize);
}

openLetterBtn.addEventListener("click", async () => {
  openLetterBtn.disabled = true;
  openLetterBtn.textContent = "Letter Opened";
  await revealLetter();
  makeConfettiHearts(26);
});

surpriseBtn.addEventListener("click", () => {
  runRomanticSurprise();
});

populateReasons();
animateLoveMeter();
setupCountdown();
setupMusicToggle();
setupHeartCanvas();
