// Load saved count (or start at 0)
let count = localStorage.getItem("sarahKissCount");
count = count ? parseInt(count) : 0;

const button = document.getElementById("kissBtn");
const display = document.getElementById("count");
const sarahImg = document.getElementById("sarahImg");
const celebrateSound = document.getElementById("celebrateSound");

// Show initial count
display.textContent = count;

button.addEventListener("click", () => {
  // 1️⃣ Increment counter
  count++;
  display.textContent = count;
  localStorage.setItem("sarahKissCount", count);

  // 2️⃣ Play click sound (removed)

  // 3️⃣ Normal wiggle
  sarahImg.classList.add("joy");
  setTimeout(() => {
    sarahImg.classList.remove("joy");
  }, 600);

  // 4️⃣ Existing milestone celebration (100)
  const milestones = [100];
  if (milestones.includes(count)) {
    sarahImg.classList.add("celebrate");
    setTimeout(() => sarahImg.classList.remove("celebrate"), 1000);

    // Extra hearts for milestone
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement("span");
      heart.classList.add("heart");
      heart.textContent = "❤️";
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight - 50 + "px";
      heart.style.fontSize = Math.random() * 20 + 15 + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1200);
    }
  }

  // 5️⃣ Regular small hearts every click
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement("span");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    const rect = button.getBoundingClientRect();
    const randomOffset = Math.floor(Math.random() * 40) - 20;
    heart.style.left = rect.left + rect.width / 2 + randomOffset + "px";
    heart.style.top = rect.top - 10 + "px";
    heart.style.fontSize = Math.random() * 10 + 15 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }

  // 6️⃣ 💥 New: Full-page celebration rain every 100 clicks
  if (count % 100 === 0) {
    celebrateSound.currentTime = 0;
    celebrateSound.play();

    const duration = 3000; // milliseconds to spawn emojis
    const interval = 120;  // spawn every 120ms
    const startTime = Date.now();

    const rainInterval = setInterval(() => {
      createFallingEmoji("💖");
      createFallingEmoji("😘");

      if (Date.now() - startTime > duration) {
        clearInterval(rainInterval);
      }
    }, interval);
  }
});

// --------------------
// Helper: falling emoji for rain
// --------------------
function createFallingEmoji(symbol) {
  const emoji = document.createElement("span");
  emoji.textContent = symbol;
  emoji.classList.add("falling-emoji");

  // Random horizontal position across viewport
  emoji.style.left = Math.random() * window.innerWidth + "px";

  // Random font size for depth
  emoji.style.fontSize = (Math.random() * 20 + 20) + "px";

  // Random fall duration for natural effect
  emoji.style.animationDuration = (Math.random() * 2 + 2.5) + "s";

  document.body.appendChild(emoji);

  // Remove from DOM after animation
  setTimeout(() => emoji.remove(), 4000);
}