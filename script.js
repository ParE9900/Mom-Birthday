document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("checkbox");
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light-mode") {
    document.body.classList.remove("dark-mode");
    themeToggle.checked = false;
  }

  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.removeItem("theme");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light-mode");
    }
  });
  const confettiBtn = document.getElementById("confetti-button");
  if (confettiBtn) {
    confettiBtn.addEventListener("click", () => {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
      };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      createHearts(30);
      setTimeout(() => {
        document.getElementById("floating-hearts").innerHTML = "";
      }, 9000);
    });
  }

  const backgroundConfettiDuration = 5 * 1000;
  const animationEndTime = Date.now() + backgroundConfettiDuration;

  function frame() {
    if (Date.now() > animationEndTime) {
      return;
    }
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ["#c76b8e", "#e89c8a", "#ffffff"],
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ["#c76b8e", "#e89c8a", "#ffffff"],
    });
    requestAnimationFrame(frame);
  }
  frame();

  const memoryModal = document.getElementById("memoryModal");
  const modalImage = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");

  memoryModal.addEventListener("show.bs.modal", function (event) {
    const clickedElement = event.relatedTarget;
    const imgSrc = clickedElement.querySelector("img").src;
    const imgAlt = clickedElement.querySelector("img").alt;
    modalImage.src = imgSrc;
    modalCaption.textContent = imgAlt;
  });

  function createHearts(count) {
    const heartsContainer = document.getElementById("floating-hearts");
    heartsContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDelay = Math.random() * 2 + "s";
      heart.style.fontSize = Math.random() * 1.5 + 1 + "rem";
      heartsContainer.appendChild(heart);
    }
  }

  window.addEventListener("scroll", () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector(".progress-bar").style.width = scrolled + "%";
  });
  const messageBox = document.querySelector(".message-box");

  if (messageBox) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(messageBox);
  }
});
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}
