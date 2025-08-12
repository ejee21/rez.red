(() => {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  function scramble(el, finalText, speed=100, step=1/3) {
    let i = 0, id;
    clearInterval(el._scrambleId);
    id = setInterval(() => {
      el.textContent = finalText
        .split("")
        .map((ch, idx) => (idx < i) ? finalText[idx] : LETTERS[Math.floor(Math.random()*LETTERS.length)])
        .join("");
      if ((i += step) >= finalText.length) { el.textContent = finalText; clearInterval(id); }
    }, speed);
    el._scrambleId = id;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-scramble]").forEach(el => {
      const finalText = el.getAttribute("data-scramble");
      el.textContent = finalText.replace(/./g, " ");
      scramble(el, finalText);
      ["mouseenter","focus"].forEach(evt => el.addEventListener(evt, () => scramble(el, finalText)));
    });
  });
})();
