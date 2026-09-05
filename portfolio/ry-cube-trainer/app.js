(() => {
  const cube = new window.CubeState();
  const faces = ["U", "L", "F", "R", "B", "D"];
  const moveTokens = ["R", "R'", "L", "L'", "U", "U'", "D", "D'", "F", "F'", "B", "B'"];
  const algorithms = [
    { id:"sexy-move", name:"Sexy Move", sequence:"R U R' U'", purpose:"A short trigger that appears in many beginner and advanced cases. It is worth making this one feel automatic." },
    { id:"middle-right", name:"Middle layer — right insert", sequence:"U R U' R' U' F' U F", purpose:"Used in the beginner method when a top-layer edge belongs in the middle layer on the right." },
    { id:"middle-left", name:"Middle layer — left insert", sequence:"U' L' U L U F U' F'", purpose:"The mirrored middle-layer insertion for an edge that needs to move to the left." },
    { id:"yellow-cross", name:"Yellow cross", sequence:"F R U R' U' F'", purpose:"A common beginner sequence for orienting the last-layer edges and building the yellow cross." },
    { id:"sune", name:"Sune", sequence:"R U R' U R U2 R'", purpose:"One of the most recognizable last-layer orientation patterns. Useful to learn after the yellow cross." },
    { id:"t-perm", name:"T-permutation", sequence:"R U R' U' R' F R2 U' R' U' R U R' F'", purpose:"A classic last-layer permutation. Longer than the beginner triggers, but useful practice for accurate execution." }
  ];
  const history=[]; let busy=false; let currentPractice=null; const learned=loadLearned();
  const statusEl=document.getElementById("cube-status"), learnedCountEl=document.getElementById("learned-count"), historyEl=document.getElementById("history-output"), inputEl=document.getElementById("algorithm-input"), errorEl=document.getElementById("input-error"), moveButtonsEl=document.getElementById("move-buttons"), algorithmListEl=document.getElementById("algorithm-list"), practiceBoxEl=document.getElementById("practice-box"), practiceNameEl=document.getElementById("practice-name"), practiceSequenceEl=document.getElementById("practice-sequence");
  const view3d=document.getElementById("cube-view-3d"), viewFlat=document.getElementById("cube-view-flat"), view3dBtn=document.getElementById("view-3d-btn"), viewFlatBtn=document.getElementById("view-flat-btn"), cube3d=document.getElementById("cube-3d"), cubeStage=document.getElementById("cube-stage");
  let rotX=-24,rotY=36,dragging=false,lastX=0,lastY=0;

  buildMoveButtons(); buildAlgorithmCards(); renderCube(); updateLearnedCount(); setView("3d"); setup3dDrag();
  view3dBtn.addEventListener("click",()=>setView("3d")); viewFlatBtn.addEventListener("click",()=>setView("flat"));

  document.getElementById("algorithm-form").addEventListener("submit",async e=>{e.preventDefault();errorEl.textContent="";try{const tokens=window.CubeState.parseSequence(inputEl.value);if(!tokens.length){errorEl.textContent="Type at least one move.";return}await playTokens(tokens)}catch(err){errorEl.textContent=err.message}});
  document.getElementById("reset-btn").addEventListener("click",()=>{if(busy)return;cube.reset();history.length=0;historyEl.textContent="—";errorEl.textContent="";renderCube()});
  document.getElementById("scramble-btn").addEventListener("click",async()=>{if(busy)return;cube.reset();history.length=0;renderCube();const s=createScramble(20);inputEl.value=s.join(" ");await playTokens(s)});
  document.getElementById("practice-btn").addEventListener("click",()=>{currentPractice=algorithms[Math.floor(Math.random()*algorithms.length)];practiceBoxEl.hidden=false;practiceNameEl.textContent=currentPractice.name;practiceSequenceEl.textContent=currentPractice.sequence;practiceSequenceEl.classList.add("blurred");document.getElementById("reveal-btn").textContent="Reveal"});
  document.getElementById("reveal-btn").addEventListener("click",()=>{if(!currentPractice)return;const hidden=practiceSequenceEl.classList.toggle("blurred");document.getElementById("reveal-btn").textContent=hidden?"Reveal":"Hide"});
  document.getElementById("play-practice-btn").addEventListener("click",async()=>{if(!currentPractice||busy)return;practiceSequenceEl.classList.remove("blurred");await playTokens(window.CubeState.parseSequence(currentPractice.sequence))});
  document.addEventListener("keydown",async e=>{if(busy||e.ctrlKey||e.metaKey||e.altKey||e.target instanceof HTMLInputElement)return;const face=e.key.toUpperCase();if(!faces.includes(face))return;e.preventDefault();await playTokens([`${face}${e.shiftKey?"'":""}`])});

  function setView(mode){const is3d=mode==="3d";view3d.hidden=!is3d;viewFlat.hidden=is3d;view3d.style.display=is3d?"grid":"none";view3dBtn.classList.toggle("is-selected",is3d);viewFlatBtn.classList.toggle("is-selected",!is3d);localStorage.setItem("ryCubeTrainer.view",mode)}
  function setup3dDrag(){const update=()=>cube3d.style.transform=`rotateX(${rotX}deg) rotateY(${rotY}deg)`;update();cubeStage.addEventListener("pointerdown",e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;cubeStage.setPointerCapture(e.pointerId)});cubeStage.addEventListener("pointermove",e=>{if(!dragging)return;rotY+=(e.clientX-lastX)*.45;rotX-=(e.clientY-lastY)*.45;rotX=Math.max(-85,Math.min(85,rotX));lastX=e.clientX;lastY=e.clientY;update()});const stop=()=>dragging=false;cubeStage.addEventListener("pointerup",stop);cubeStage.addEventListener("pointercancel",stop)}
  function buildMoveButtons(){for(const move of moveTokens){const b=document.createElement("button");b.type="button";b.className="move-button";b.textContent=move;b.setAttribute("aria-label",`Run move ${move}`);b.addEventListener("click",()=>playTokens([move]));moveButtonsEl.appendChild(b)}}
  function buildAlgorithmCards(){for(const a of algorithms){const card=document.createElement("article");card.className="algorithm-card";const title=document.createElement("h3");title.textContent=a.name;const desc=document.createElement("p");desc.textContent=a.purpose;const seq=document.createElement("code");seq.className="algorithm-sequence";seq.textContent=a.sequence;const actions=document.createElement("div");actions.className="algorithm-actions";const play=document.createElement("button");play.type="button";play.className="button secondary";play.textContent="Play";play.addEventListener("click",()=>{inputEl.value=a.sequence;playTokens(window.CubeState.parseSequence(a.sequence))});const label=document.createElement("label");label.className="learn-toggle";const cb=document.createElement("input");cb.type="checkbox";cb.checked=learned.has(a.id);cb.addEventListener("change",()=>{cb.checked?learned.add(a.id):learned.delete(a.id);saveLearned();updateLearnedCount()});label.append(cb,document.createTextNode(" Learned"));actions.append(play,label);card.append(title,desc,seq,actions);algorithmListEl.appendChild(card)}}
  async function playTokens(tokens){if(busy||!tokens.length)return;setBusy(true);try{for(const token of tokens){highlightFace(token[0]);await sleep(150);cube.applyMove(token);history.push(token);if(history.length>30)history.shift();historyEl.textContent=history.join(" ");renderCube();await sleep(90)}}finally{clearHighlights();setBusy(false)}}
  function renderFace(element,colors){if(!element)return;if(element.children.length!==9){element.replaceChildren(...colors.map(()=>{const s=document.createElement("div");s.className="sticker";return s}))}colors.forEach((c,i)=>element.children[i].style.backgroundColor=c)}
  function renderCube(){for(const face of faces){const colors=cube.getFace(face);renderFace(document.getElementById(`face-${face}`),colors);renderFace(document.getElementById(`face3d-${face}`),colors)}statusEl.textContent=cube.isSolved()?"Solved":"In progress"}
  function highlightFace(face){clearHighlights();document.querySelectorAll(`[data-face="${face}"]`).forEach(el=>el.classList.add("is-active"))}
  function clearHighlights(){document.querySelectorAll(".cube-face.is-active").forEach(el=>el.classList.remove("is-active"))}
  function setBusy(v){busy=v;document.querySelectorAll("button").forEach(b=>b.disabled=v)}
  function createScramble(length){const fs=["R","L","U","D","F","B"],ss=["","'","2"],r=[];let prev="";while(r.length<length){const f=fs[Math.floor(Math.random()*fs.length)];if(f===prev)continue;r.push(f+ss[Math.floor(Math.random()*ss.length)]);prev=f}return r}
  function loadLearned(){try{const saved=JSON.parse(localStorage.getItem("ryCubeTrainer.learned")||"[]");return new Set(Array.isArray(saved)?saved:[])}catch{return new Set()}}
  function saveLearned(){localStorage.setItem("ryCubeTrainer.learned",JSON.stringify([...learned]))}
  function updateLearnedCount(){learnedCountEl.textContent=`${learned.size}/${algorithms.length} algorithms learned`}
  function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
})();
