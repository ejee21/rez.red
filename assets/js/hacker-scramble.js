(() => {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function scrambleOnce(el, finalText, speed = 12, step = 2) {
    if (el.dataset.scrambled === "1") return; // guard: only run once
    el.dataset.scrambled = "1";

    let i = 0;
    const len = finalText.length;
    const id = setInterval(() => {
      el.textContent = finalText
        .split("")
        .map((ch, idx) => {
          // preserve line breaks and spacing/punct so width doesn’t change
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

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-scramble]").forEach((el) => {
      const finalText = el.getAttribute("data-scramble") ?? el.textContent;
      // initialize with same shape: letters/digits blanked, spacing/newlines kept
      el.textContent = finalText.replace(/[A-Za-z0-9]/g, " ");
      // run once
      scrambleOnce(el, finalText);
    });
  });
})();
