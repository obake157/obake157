(() => {
  const cube = new window.CubeState();
  const faces = ["U", "L", "F", "R", "B", "D"];
  const moveTokens = ["R", "R'", "L", "L'", "U", "U'", "D", "D'", "F", "F'", "B", "B'"];

  const algorithms = [
    { id: "sexy-move", name: "Sexy Move", sequence: "R U R' U'", purpose: "A short trigger that appears in many beginner and advanced cases. It is worth making this one feel automatic." },
    { id: "middle-right", name: "Middle layer — right insert", sequence: "U R U' R' U' F' U F", purpose: "Used in the beginner method when a top-layer edge belongs in the middle layer on the right." },
    { id: "middle-left", name: "Middle layer — left insert", sequence: "U' L' U L U F U' F'", purpose: "The mirrored middle-layer insertion for an edge that needs to move to the left." },
    { id: "yellow-cross", name: "Yellow cross", sequence: "F R U R' U' F'", purpose: "A common beginner sequence for orienting the last-layer edges and building the yellow cross." },
    { id: "sune", name: "Sune", sequence: "R U R' U R U2 R'", purpose: "One of the most recognizable last-layer orientation patterns. Useful to learn after the yellow cross." },
    { id: "t-perm", name: "T-permutation", sequence: "R U R' U' R' F R2 U' R' U' R U R' F'", purpose: "A classic last-layer permutation. Longer than the beginner triggers, but useful practice for accurate execution." }
  ];

  const history = [];
  let busy = false;
  let currentPractice = null;
  const learned = loadLearned();

  const statusEl = document.getElementById("cube-status");
  const learnedCountEl = document.getElementById("learned-count");
  const historyEl = document.getElementById("history-output");
  const inputEl = document.getElementById("algorithm-input");
  const errorEl = document.getElementById("input-error");
  const moveButtonsEl = document.getElementById("move-buttons");
  const algorithmListEl = document.getElementById("algorithm-list");
  const practiceBoxEl = document.getElementById("practice-box");
  const practiceNameEl = document.getElementById("practice-name");
  const practiceSequenceEl = document.getElementById("practice-sequence");

  buildMoveButtons();
  buildAlgorithmCards();
  renderCube();
  updateLearnedCount();

  document.getElementById("algorithm-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    errorEl.textContent = "";
    try {
      const tokens = window.CubeState.parseSequence(inputEl.value);
      if (!tokens.length) {
        errorEl.textContent = "Type at least one move.";
        return;
      }
      await playTokens(tokens);
    } catch (error) {
      errorEl.textContent = error.message;
    }
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (busy) return;
    cube.reset();
    history.length = 0;
    historyEl.textContent = "—";
    errorEl.textContent = "";
    renderCube();
  });

  document.getElementById("scramble-btn").addEventListener("click", async () => {
    if (busy) return;
    cube.reset();
    history.length = 0;
    renderCube();
    const scramble = createScramble(20);
    inputEl.value = scramble.join(" ");
    await playTokens(scramble);
  });

  document.getElementById("practice-btn").addEventListener("click", () => {
    currentPractice = algorithms[Math.floor(Math.random() * algorithms.length)];
    practiceBoxEl.hidden = false;
    practiceNameEl.textContent = currentPractice.name;
    practiceSequenceEl.textContent = currentPractice.sequence;
    practiceSequenceEl.classList.add("blurred");
    document.getElementById("reveal-btn").textContent = "Reveal";
  });

  document.getElementById("reveal-btn").addEventListener("click", () => {
    if (!currentPractice) return;
    const hidden = practiceSequenceEl.classList.toggle("blurred");
    document.getElementById("reveal-btn").textContent = hidden ? "Reveal" : "Hide";
  });

  document.getElementById("play-practice-btn").addEventListener("click", async () => {
    if (!currentPractice || busy) return;
    practiceSequenceEl.classList.remove("blurred");
    await playTokens(window.CubeState.parseSequence(currentPractice.sequence));
  });

  document.addEventListener("keydown", async (event) => {
    if (busy || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target instanceof HTMLInputElement) return;
    const face = event.key.toUpperCase();
    if (!faces.includes(face)) return;
    event.preventDefault();
    const move = `${face}${event.shiftKey ? "'" : ""}`;
    await playTokens([move]);
  });

  function buildMoveButtons() {
    for (const move of moveTokens) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "move-button";
      button.textContent = move;
      button.setAttribute("aria-label", `Run move ${move}`);
      button.addEventListener("click", () => playTokens([move]));
      moveButtonsEl.appendChild(button);
    }
  }

  function buildAlgorithmCards() {
    for (const algorithm of algorithms) {
      const card = document.createElement("article");
      card.className = "algorithm-card";
      const title = document.createElement("h3");
      title.textContent = algorithm.name;
      const description = document.createElement("p");
      description.textContent = algorithm.purpose;
      const sequence = document.createElement("code");
      sequence.className = "algorithm-sequence";
      sequence.textContent = algorithm.sequence;
      const actions = document.createElement("div");
      actions.className = "algorithm-actions";
      const playButton = document.createElement("button");
      playButton.type = "button";
      playButton.className = "button secondary";
      playButton.textContent = "Play";
      playButton.addEventListener("click", () => {
        inputEl.value = algorithm.sequence;
        playTokens(window.CubeState.parseSequence(algorithm.sequence));
      });
      const label = document.createElement("label");
      label.className = "learn-toggle";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = learned.has(algorithm.id);
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) learned.add(algorithm.id);
        else learned.delete(algorithm.id);
        saveLearned();
        updateLearnedCount();
      });
      label.append(checkbox, document.createTextNode(" Learned"));
      actions.append(playButton, label);
      card.append(title, description, sequence, actions);
      algorithmListEl.appendChild(card);
    }
  }

  async function playTokens(tokens) {
    if (busy || !tokens.length) return;
    setBusy(true);
    try {
      for (const token of tokens) {
        highlightFace(token[0]);
        await sleep(150);
        cube.applyMove(token);
        history.push(token);
        if (history.length > 30) history.shift();
        historyEl.textContent = history.join(" ");
        renderCube();
        await sleep(90);
      }
    } finally {
      clearHighlights();
      setBusy(false);
    }
  }

  function renderCube() {
    for (const face of faces) {
      const element = document.getElementById(`face-${face}`);
      const colors = cube.getFace(face);
      if (element.children.length !== 9) {
        element.replaceChildren(...colors.map(() => {
          const sticker = document.createElement("div");
          sticker.className = "sticker";
          return sticker;
        }));
      }
      colors.forEach((color, index) => {
        element.children[index].style.backgroundColor = color;
      });
    }
    statusEl.textContent = cube.isSolved() ? "Solved" : "In progress";
  }

  function highlightFace(face) {
    clearHighlights();
    document.getElementById(`face-${face}`)?.classList.add("is-active");
  }

  function clearHighlights() {
    document.querySelectorAll(".cube-face.is-active").forEach((element) => element.classList.remove("is-active"));
  }

  function setBusy(value) {
    busy = value;
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = value;
    });
  }

  function createScramble(length) {
    const moveFaces = ["R", "L", "U", "D", "F", "B"];
    const suffixes = ["", "'", "2"];
    const result = [];
    let previousFace = "";
    while (result.length < length) {
      const face = moveFaces[Math.floor(Math.random() * moveFaces.length)];
      if (face === previousFace) continue;
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      result.push(face + suffix);
      previousFace = face;
    }
    return result;
  }

  function loadLearned() {
    try {
      const saved = JSON.parse(localStorage.getItem("ryCubeTrainer.learned") || "[]");
      return new Set(Array.isArray(saved) ? saved : []);
    } catch {
      return new Set();
    }
  }

  function saveLearned() {
    localStorage.setItem("ryCubeTrainer.learned", JSON.stringify([...learned]));
  }

  function updateLearnedCount() {
    learnedCountEl.textContent = `${learned.size}/${algorithms.length} algorithms learned`;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
})();
