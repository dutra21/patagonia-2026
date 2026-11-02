// Reusable quiz widgets. Markup contracts:
//
// Classification:
//   <div class="exercise classify" data-options="A|B|C">
//     <div class="c-item" data-answer="B" data-why="explanation">Label</div>
//   </div>
//
// Multiple choice:
//   <div class="exercise mcq">
//     <p class="q">Question</p>
//     <ol><li data-correct data-why="...">Option</li><li data-why="...">Option</li></ol>
//   </div>
//
// Retrieval (write first, then reveal):
//   <div class="exercise reveal">
//     <textarea></textarea>
//     <div class="reveal-answer" hidden>...</div>
//   </div>
(function () {
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function feedback(ok, html) {
    const f = el("div", "feedback " + (ok ? "ok" : "no"));
    f.setAttribute("role", "status");
    f.innerHTML = (ok ? "<b>Certo.</b> " : "<b>Errado.</b> ") + html;
    return f;
  }
  function scoreLine(box) {
    let s = box.querySelector(".score");
    if (!s) { s = el("div", "score"); s.setAttribute("aria-live", "polite"); box.appendChild(s); }
    return s;
  }

  document.querySelectorAll(".classify").forEach((box) => {
    const options = box.dataset.options.split("|");
    const items = [...box.querySelectorAll(".c-item")];
    let done = 0, right = 0;
    items.forEach((item) => {
      const label = el("span", "c-label");
      label.innerHTML = item.innerHTML;
      item.innerHTML = "";
      item.appendChild(label);
      const btns = el("div", "btns");
      options.forEach((opt) => {
        const b = el("button", "btn", opt);
        b.type = "button";
        b.addEventListener("click", () => {
          const ok = opt === item.dataset.answer;
          btns.querySelectorAll("button").forEach((x) => {
            x.disabled = true;
            if (x.textContent === item.dataset.answer) x.classList.add("correct");
          });
          if (!ok) b.classList.add("wrong");
          item.appendChild(feedback(ok, (ok ? "" : "É <b>" + item.dataset.answer + "</b>. ") + item.dataset.why));
          done++; if (ok) right++;
          scoreLine(box).textContent = right + " de " + done + " certos (" + items.length + " no total)";
        });
        btns.appendChild(b);
      });
      item.appendChild(btns);
    });
  });

  document.querySelectorAll(".mcq").forEach((box) => {
    const lis = [...box.querySelectorAll("ol > li")];
    const correct = lis.find((li) => li.hasAttribute("data-correct"));
    lis.forEach((li) => {
      const b = el("button", "btn");
      b.type = "button";
      b.innerHTML = li.innerHTML;
      li.innerHTML = "";
      li.appendChild(b);
      b.addEventListener("click", () => {
        const ok = li === correct;
        box.querySelectorAll("ol .btn").forEach((x) => (x.disabled = true));
        correct.querySelector(".btn").classList.add("correct");
        if (!ok) b.classList.add("wrong");
        let msg = li.dataset.why || "";
        if (!ok && correct.dataset.why) msg += " <br><br><b>A certa:</b> " + correct.dataset.why;
        box.appendChild(feedback(ok, msg));
      });
    });
  });

  document.querySelectorAll(".reveal").forEach((box) => {
    const ta = box.querySelector("textarea");
    const ans = box.querySelector(".reveal-answer");
    const b = el("button", "btn primary reveal-btn", "Comparar com a referência");
    b.type = "button";
    b.addEventListener("click", () => {
      if (ta && ta.value.trim().length < 20) {
        ta.focus();
        ta.setAttribute("placeholder", "Escreva sua versão primeiro. O esforço de lembrar é o exercício.");
        return;
      }
      ans.hidden = false;
      b.disabled = true;
    });
    ans.before(b);
  });
})();
