(() => {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function scrambleOnce(el, finalText, speed = 12, step = 2) {
    if (el.dataset.scrambled === "1") return;
    el.dataset.scrambled = "1";

    let i = 0;
    const len = finalText.length;
    const id = setInterval(() => {
      el.textContent = finalText
        .split("")
        .map((ch, idx) => {
          if (ch === "\n") return "\n";
          if (!/[A-Za-z0-9]/.test(ch)) return ch;
          return idx < i ? finalText[idx] : LETTERS[Math.floor(Math.random() * LETTERS.length)];
        })
        .join("");

      i += step;
      if (i >= len) {
        el.textContent = finalText;
        clearInterval(id);
      }
    }, speed);
  }

  function init() {
    document.querySelectorAll("[data-scramble]").forEach((el) => {
      const finalText = el.getAttribute("data-scramble") ?? el.textContent;
      el.textContent = finalText.replace(/[A-Za-z0-9]/g, " ");
      scrambleOnce(el, finalText);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
