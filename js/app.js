function showToast(msg, type = "info") {
  const container = document.getElementById("toast-container");
  const el = document.createElement("div");
  const colors = {
    success: "bg-emerald-600 text-white",
    error: "bg-rose-600 text-white",
    warning: "bg-amber-500 text-white",
    info: "bg-slate-800 text-white"
  };
  el.className = `pointer-events-auto px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center justify-between gap-3 transition-all duration-300 ${colors[type] || colors.info}`;
  el.innerHTML = `<span>${escapeHtml(msg)}</span><button class="opacity-80 hover:opacity-100 font-bold" onclick="this.parentElement.remove()">✕</button>`;
  container.appendChild(el);
  setTimeout(() => { if (el.parentElement) el.remove(); }, 4000);
}

function openModal(html) {
  document.getElementById("modal-content").innerHTML = html;
  const bd = document.getElementById("modal-backdrop");
  bd.classList.remove("hidden");
  bd.classList.add("flex");
}

function closeModal() {
  const bd = document.getElementById("modal-backdrop");
  bd.classList.add("hidden");
  bd.classList.remove("flex");
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stopVideoTimer() {
  if (state.videoPlayer.timerId) {
    clearInterval(state.videoPlayer.timerId);
    state.videoPlayer.timerId = null;
  }
  state.videoPlayer.playing = false;
}

function toggleVideoPlay(totalSteps) {
  if (state.videoPlayer.playing) {
    stopVideoTimer();
    render();
  } else {
    state.videoPlayer.playing = true;
    state.videoPlayer.timerId = setInterval(() => {
      state.videoPlayer.stepIndex = (state.videoPlayer.stepIndex + 1) % totalSteps;
      render();
    }, 3500);
    render();
  }
}

function setVideoStep(idx) {
  state.videoPlayer.stepIndex = idx;
  render();
}


function getTheoryVideoSteps(mod) {
  if (mod.theoryVideoSteps && mod.theoryVideoSteps.length) return mod.theoryVideoSteps;
  const c = mod.theoryContent || [];
  return [
    { time: "00:00", title: `${mod.id}-Ma’ruza: Kirish va asosiy tushunchalar`, caption: c[0] || mod.theoryTitle },
    { time: "02:15", title: "Arxitektura va protokollar tahlili", caption: c[1] || `${mod.theoryTitle} bo‘yicha asosiy standartlar va ishlash mexanizmi.` },
    { time: "04:30", title: "Zamonaviy qo‘llanilishi va xulosa", caption: c[2] || `Amaliyotda qo‘llash va keyingi mashg‘ulotga tayyorgarlik.` }
  ];
}

    function playYouTubeOrFallback() {
  const isSandboxed = (window.location.origin === "null" || window.location.protocol === "about:" || window.location.protocol === "data:");
  if (isSandboxed) {
    state.videoPlayer.mode = "slides";
    state.videoPlayer.embedActive = false;
    showToast("Canvas oynasida YouTube cheklangan (153-xato). Slayd-dars ochildi — YouTube uchun 'YouTube’da ochish' tugmasini bosing.", "info");
  } else {
    state.videoPlayer.embedActive = true;
  }
  render();
}

function getYouTubeId(url) {
  if (!url) return "";
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : "";
}
function getYouTubeEmbedUrl(url) {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";
}

function renderVideoPlayer(title, steps, customUrl = "") {
  const ytId = getYouTubeId(customUrl);
  const ytEmbed = getYouTubeEmbedUrl(customUrl);
  if (ytEmbed && state.videoPlayer.mode !== 'slides') {
    const thumbUrl = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    return `
      <div class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
        ${state.videoPlayer.embedActive ? `
          <div class="aspect-video w-full bg-black">
            <iframe src="${escapeHtml(ytEmbed)}" class="w-full h-full" title="${escapeHtml(title)}" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        ` : `
          <div class="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
            <img src="${escapeHtml(thumbUrl)}" alt="${escapeHtml(title)}" class="w-full h-full object-cover opacity-55 group-hover:opacity-65 transition" onerror="this.style.display='none'" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col items-center justify-center p-4 text-center">
              <button type="button" onclick="playYouTubeOrFallback()" class="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl transition transform hover:scale-105 mb-3">
                <svg class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <div class="text-white font-bold text-sm sm:text-base max-w-md">${escapeHtml(title)}</div>
              <div class="flex flex-wrap justify-center gap-2 mt-3">
                <button type="button" onclick="playYouTubeOrFallback()" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold">▶ Shu yerda ko‘rish</button>
                <a href="${escapeHtml(customUrl)}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold">↗ YouTube’da ochish</a>
              </div>
            </div>
          </div>
        `}
        <div class="bg-slate-950 px-4 py-2.5 text-xs text-slate-300 flex flex-wrap justify-between items-center gap-2">
          <span class="truncate max-w-xs">🎬 ${escapeHtml(title)}</span>
          <div class="flex items-center gap-2">
            <a href="${escapeHtml(customUrl)}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 font-semibold">↗ YouTube’da ochish</a>
            <button type="button" onclick="state.videoPlayer.mode='slides'; state.videoPlayer.embedActive=false; render();" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold">📺 Slayd-darsga o‘tish</button>
          </div>
        </div>
      </div>
    `;
  }
  const idx = Math.min(state.videoPlayer.stepIndex, steps.length - 1);
  const step = steps[idx];
  return `
    <div class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
      <div class="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 min-h-[220px] flex flex-col justify-between">
        <div class="flex items-center justify-between text-xs text-indigo-300 font-mono">
          <span class="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30">VIDEODARS • ${escapeHtml(step.time)}</span>
          <span>Bosqich ${idx + 1} / ${steps.length}</span>
        </div>
        <div class="my-5 text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 mb-3">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h4 class="text-white text-lg sm:text-xl font-bold">${escapeHtml(step.title)}</h4>
          <p class="text-slate-300 text-sm mt-2 max-w-xl mx-auto leading-relaxed">${escapeHtml(step.caption)}</p>
        </div>
        <div class="flex items-center gap-2">
          ${steps.map((s, i) => `
            <button onclick="setVideoStep(${i})" class="flex-1 h-2 rounded-full transition-all ${i === idx ? 'bg-indigo-400' : i < idx ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-600'}" title="${escapeHtml(s.title)}"></button>
          `).join("")}
        </div>
      </div>
      <div class="bg-slate-950 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-slate-300 text-sm">
        <div class="flex items-center gap-2">
          <button onclick="toggleVideoPlay(${steps.length})" class="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 transition">
            ${state.videoPlayer.playing ? '⏸ Pauza' : '▶ Boshlash'}
          </button>
          <span class="text-xs text-slate-400 truncate max-w-[220px] sm:max-w-xs">${escapeHtml(title)}</span>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          ${ytEmbed ? `<button type="button" onclick="stopVideoTimer(); state.videoPlayer.mode='youtube'; render();" class="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold mr-1">▶ YouTube video</button>` : ''}
          ${steps.map((s, i) => `
            <button onclick="setVideoStep(${i})" class="px-2 py-1 rounded text-xs font-mono ${i === idx ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}">${escapeHtml(s.time)}</button>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const pass = document.getElementById("login-pass").value;

  if (email === state.adminCredentials.email.toLowerCase() && pass === state.adminCredentials.password) {
    state.currentUser = { role: "admin", name: "Administrator" };
    showToast("Admin paneliga xush kelibsiz!", "success");
    render();
    return;
  }

  const stu = state.students.find(s => s.email.toLowerCase() === email && s.password === pass);
  if (stu) {
    state.currentUser = { role: "student", studentId: stu.id, name: stu.name };
    state.activeTopicId = Math.min(stu.unlockedTopic, 12);
    state.studentTab = "courses";
    showToast(`Xush kelibsiz, ${stu.name}!`, "success");
    render();
  } else {
    showToast("Login yoki parol noto‘g‘ri!", "error");
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const group = document.getElementById("reg-group").value.trim();
  const email = document.getElementById("reg-email").value.trim().toLowerCase();
  const password = document.getElementById("reg-pass").value;

  if (!name || !group || !email || !password) {
    showToast("Barcha maydonlarni to‘ldiring!", "warning");
    return;
  }
  if (state.students.some(s => s.email.toLowerCase() === email)) {
    showToast("Bu email bilan talaba allaqachon ro‘yxatdan o‘tgan!", "error");
    return;
  }

  const newStu = {
    id: "stu_" + Date.now(),
    name,
    group,
    email,
    password,
    unlockedTopic: 1,
    topicScores: {},
    completedPracticals: [],
    completedLabs: [],
    finalScore: null,
    certificateId: null,
    certificateDate: null,
    joinedAt: new Date().toISOString().slice(0, 10)
  };
  state.students.push(newStu);
  saveState();
  state.currentUser = { role: "student", studentId: newStu.id, name: newStu.name };
  state.activeTopicId = 1;
  state.studentTab = "courses";
  showToast("Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi!", "success");
  render();
}


function startRecoveryLookup(e) {
  e.preventDefault();
  if (state.recoveryState.mode === "email") {
    const email = document.getElementById("rec-email").value.trim().toLowerCase();
    const stu = state.students.find(st => st.email.toLowerCase() === email);
    if (!stu) {
      showToast("Bunday email bilan talaba topilmadi!", "error");
      return;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    state.recoveryState = { step: 2, mode: "email", email: stu.email, code: "", generatedCode: code, foundStudentId: stu.id, foundEmail: stu.email };
    showToast(`Tasdiqlash kodi yuborildi (Demo kod: ${code})`, "info");
    render();
  } else {
    const name = document.getElementById("rec-name").value.trim().toLowerCase();
    const group = document.getElementById("rec-group").value.trim().toLowerCase();
    const stu = state.students.find(st => st.name.toLowerCase().includes(name) && st.group.toLowerCase() === group);
    if (!stu) {
      showToast("Bu F.I.Sh. va guruh bo‘yicha talaba topilmadi!", "error");
      return;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    state.recoveryState = { step: 2, mode: "find_login", email: stu.email, code: "", generatedCode: code, foundStudentId: stu.id, foundEmail: stu.email };
    showToast(`Login topildi: ${stu.email} (Kod: ${code})`, "success");
    render();
  }
}

function completePasswordReset(e) {
  e.preventDefault();
  const enteredCode = document.getElementById("rec-code").value.trim();
  const newPass = document.getElementById("rec-new-pass").value;
  if (enteredCode !== state.recoveryState.generatedCode) {
    showToast("Tasdiqlash kodi noto‘g‘ri!", "error");
    return;
  }
  if (!newPass || newPass.length < 3) {
    showToast("Yangi parol kamida 3 ta belgidan iborat bo‘lishi kerak!", "warning");
    return;
  }
  const stu = state.students.find(st => st.id === state.recoveryState.foundStudentId);
  if (!stu) return;
  stu.password = newPass;
  saveState();
  state.recoveryState = { step: 1, mode: "email", email: "", code: "", generatedCode: "", foundStudentId: null, foundEmail: "" };
  state.authTab = "login";
  showToast("Parol muvaffaqiyatli yangilandi! Endi yangi parol bilan kiring.", "success");
  render();
}

function openAdminResetPassModal(studentId) {
  const stu = state.students.find(st => st.id === studentId);
  if (!stu) return;
  openModal(`
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold">Parolni yangilash — ${escapeHtml(stu.name)}</h3>
      <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 font-bold text-xl">✕</button>
    </div>
    <div class="space-y-4">
      <div class="text-xs text-slate-500">Login (Email): <strong>${escapeHtml(stu.email)}</strong></div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Yangi parol</label>
        <input id="admin-new-pass" type="text" value="123456" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" />
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium">Bekor qilish</button>
        <button onclick="saveAdminPassReset('${stu.id}')" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Saqlash</button>
      </div>
    </div>
  `);
}

function saveAdminPassReset(studentId) {
  const stu = state.students.find(st => st.id === studentId);
  if (!stu) return;
  const val = document.getElementById("admin-new-pass").value.trim();
  if (val.length < 3) {
    showToast("Parol kamida 3 ta belgi bo‘lsin!", "warning");
    return;
  }
  stu.password = val;
  saveState();
  closeModal();
  showToast(`${stu.name} uchun parol yangilandi!`, "success");
  render();
}

function quickDemoLogin(type) {
  if (type === "admin") {
    state.currentUser = { role: "admin", name: "Administrator" };
    showToast("Admin paneliga kirildi", "success");
  } else if (type === "student_new") {
    const s = state.students[0];
    state.currentUser = { role: "student", studentId: s.id, name: s.name };
    state.activeTopicId = Math.min(s.unlockedTopic, 12);
    state.studentTab = "courses";
    showToast(`${s.name} kabinetiga kirildi`, "info");
  } else if (type === "student_grad") {
    const s = state.students[1];
    state.currentUser = { role: "student", studentId: s.id, name: s.name };
    state.activeTopicId = 12;
    state.studentTab = "final";
    showToast(`${s.name} (Bitiruvchi) kabinetiga kirildi`, "success");
  }
  render();
}

function logout() {
  stopVideoTimer();
  state.currentUser = null;
  state.lastQuizResult = null;
  state.lastFinalResult = null;
  render();
}

function isTopicUnlocked(stu, topicId) {
  if (!state.strictGating) return true;
  return topicId <= stu.unlockedTopic;
}

function selectTopic(topicId) {
  const stu = getCurrentStudent();
  if (!stu) return;
  if (!isTopicUnlocked(stu, topicId)) {
    showToast(`${topicId - 1}-mavzu testini 100% bajarmaguningizcha ${topicId}-mavzuga o‘ta olmaysiz!`, "warning");
    return;
  }
  stopVideoTimer();
  state.videoPlayer.stepIndex = 0; state.videoPlayer.embedActive = false;
  state.activeTopicId = topicId;
  state.activeTopicSubTab = "theory";
  state.quizAnswers = {};
  state.lastQuizResult = null;
  render();
}

function submitTopicQuiz(topicId) {
  const stu = getCurrentStudent();
  const mod = state.modules.find(m => m.id === topicId);
  if (!stu || !mod) return;

  let correct = 0;
  const details = mod.quiz.map((q, idx) => {
    const chosen = state.quizAnswers[idx];
    const isOk = chosen === q.ans;
    if (isOk) correct++;
    return { q: q.q, isOk, chosen, correctAns: q.opts[q.ans] };
  });

  const score = Math.round((correct / mod.quiz.length) * 100);
  const prevScore = stu.topicScores[topicId] || 0;
  if (score > prevScore) stu.topicScores[topicId] = score;

  let unlockedNext = false;
  if (score === 100) {
    if (stu.unlockedTopic === topicId) {
      stu.unlockedTopic = topicId + 1;
      unlockedNext = true;
    }
    showToast(topicId < 12 ? `Tabriklaymiz! 100% natija! ${topicId + 1}-mavzu ochildi.` : "Tabriklaymiz! 12-mavzu 100% bajarildi. Yakuniy nazorat testi ochildi!", "success");
  } else {
    showToast(`Natija: ${score}%. Keyingi mavzuga o‘tish uchun 100% natija talab qilinadi!`, "warning");
  }

  saveState();
  state.lastQuizResult = { score, correct, total: mod.quiz.length, details, unlockedNext };
  render();
}

function checkPracticalTask(topicId) {
  const stu = getCurrentStudent();
  const mod = state.modules.find(m => m.id === topicId);
  if (!stu || !mod) return;

  let allOk = true;
  mod.practicalTask.pairs.forEach((p, idx) => {
    if (state.practicalSelection[`${topicId}_${idx}`] !== p.correct) allOk = false;
  });

  if (allOk) {
    if (!stu.completedPracticals.includes(topicId)) {
      stu.completedPracticals.push(topicId);
      saveState();
    }
    showToast("Amaliy mashg‘ulot topshirig‘i to‘g‘ri bajarildi!", "success");
  } else {
    showToast("Ba’zi javoblar noto‘g‘ri. Qayta tekshirib ko‘ring.", "warning");
  }
  render();
}

function runLabCommand(labId) {
  const input = document.getElementById("lab-cli-input");
  if (!input) return;
  const cmd = input.value.trim();
  if (!cmd) return;

  const lab = state.labs.find(l => l.id === labId);
  if (!state.labTerminalHistory[labId]) state.labTerminalHistory[labId] = [];

  let out = `Router(config)# ${cmd} — [OK] Buyruq qabul qilindi.`;
  const low = cmd.toLowerCase();
  if (low === "show version") {
    out = "Cisco IOS Software, C2900 Software, Version 15.1(4)M4, RELEASE SOFTWARE";
  } else if (low === "enable") {
    out = "Imtiyozli rejim (Privileged EXEC #) faollashtirildi.";
  } else if (low === "configure terminal" || low === "conf t") {
    out = "Global konfiguratsiya rejimiga kirildi: Enter configuration commands, one per line.";
  } else if (low.startsWith("ping ")) {
    out = "Sending 5, 100-byte ICMP Echos, timeout is 2 seconds:\n!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms";
  } else if (low === "show ip route") {
    out = "Codes: C - connected, S - static, O - OSPF\nC 10.0.0.0/8 is directly connected, GigabitEthernet0/0\nS 192.168.2.0/24 [1/0] via 10.0.0.2";
  } else if (low === "show clock") {
    out = `*10:56:05.124 UZT Thu Nov 12 2026 (Synced with SNTP 192.168.1.100)`;
  } else if (low === "help" || low === "?") {
    out = `Tavsiya etilgan buyruqlar: ${lab.expectedCommands.join(", ")}`;
  }

  state.labTerminalHistory[labId].push({ cmd, out });
  input.value = "";

  const historyText = state.labTerminalHistory[labId].map(h => h.cmd.toLowerCase()).join(" | ");
  const allMatched = lab.expectedCommands.every(exp => historyText.includes(exp.toLowerCase()));
  if (allMatched) {
    state.labVerified[labId] = true;
    const stu = getCurrentStudent();
    if (stu && !stu.completedLabs.includes(labId)) {
      stu.completedLabs.push(labId);
      saveState();
      showToast(`${labId}-laboratoriya ishi muvaffaqiyatli yakunlandi!`, "success");
    }
  }
  render();
}

function submitFinalExam() {
  const stu = getCurrentStudent();
  if (!stu) return;
  if (state.strictGating && stu.unlockedTopic <= 12) {
    showToast("Yakuniy nazorat testi uchun avval barcha 12 ta mavzuni 100% yakunlang!", "error");
    return;
  }

  let correct = 0;
  FINAL_EXAM_QUESTIONS.forEach((q, idx) => {
    if (state.finalAnswers[idx] === q.ans) correct++;
  });
  const score = Math.round((correct / FINAL_EXAM_QUESTIONS.length) * 100);
  stu.finalScore = Math.max(stu.finalScore || 0, score);

  if (score >= state.finalPassThreshold) {
    if (!stu.certificateId) {
      stu.certificateId = "KT-2026-" + Math.floor(10000 + Math.random() * 89999);
      stu.certificateDate = new Date().toISOString().slice(0, 10);
    }
    showToast(`Tabriklaymiz! Yakuniy testdan ${score}% oldingiz. Sertifikat tayyor!`, "success");
  } else {
    showToast(`Natija: ${score}%. O‘tish bali: ${state.finalPassThreshold}%. Qayta urinib ko‘ring.`, "warning");
  }
  saveState();
  state.lastFinalResult = { score, correct, total: FINAL_EXAM_QUESTIONS.length };
  render();
}

function adminUnlockTopic(studentId, targetTopic) {
  const stu = state.students.find(s => s.id === studentId);
  if (!stu) return;
  stu.unlockedTopic = targetTopic;
  for (let i = 1; i < targetTopic && i <= 12; i++) {
    if (stu.topicScores[i] !== 100) stu.topicScores[i] = 100;
  }
  saveState();
  showToast(`${stu.name} uchun ${targetTopic <= 12 ? targetTopic + '-mavzu' : 'Yakuniy test'} ochildi.`, "success");
  render();
}

function adminResetStudent(studentId) {
  const stu = state.students.find(s => s.id === studentId);
  if (!stu) return;
  stu.unlockedTopic = 1;
  stu.topicScores = {};
  stu.completedPracticals = [];
  stu.completedLabs = [];
  stu.finalScore = null;
  stu.certificateId = null;
  stu.certificateDate = null;
  saveState();
  showToast(`${stu.name} natijalari nolga tushirildi.`, "info");
  render();
}

function adminDeleteStudent(studentId) {
  state.students = state.students.filter(s => s.id !== studentId);
  saveState();
  showToast("Talaba o‘chirildi.", "info");
  render();
}

function adminToggleStrictGating() {
  state.strictGating = !state.strictGating;
  saveState();
  showToast(state.strictGating ? "100% cheklov qoidasi yoqildi" : "100% cheklov qoidasi o‘chirildi", "info");
  render();
}


function openAddTopicModal() {
  const nextId = state.modules.length ? Math.max(...state.modules.map(m => m.id)) + 1 : 1;
  openModal(`
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold">Yangi mavzu qo‘shish (${nextId}-mavzu)</h3>
      <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 font-bold text-xl">✕</button>
    </div>
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Nazariy mavzu nomi</label>
        <input id="new-theory-title" type="text" placeholder="Masalan: IPv6 marshrutlash protokollari" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Amaliy mavzu nomi</label>
        <input id="new-practical-title" type="text" placeholder="Masalan: IPv6 manzillarni sozlash" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Nazariy matn (asosiy tushuncha)</label>
        <textarea id="new-theory-text" rows="3" placeholder="Mavzu bo‘yicha qisqacha nazariy ma’lumot..." class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"></textarea>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div class="text-xs font-bold text-slate-700">1-test savoli (100% talab uchun)</div>
        <input id="new-quiz-q" type="text" placeholder="Savol matni..." class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs" />
        <div class="grid grid-cols-2 gap-2">
          <input id="new-quiz-a" type="text" placeholder="To‘g‘ri javob (A)" class="px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs" />
          <input id="new-quiz-b" type="text" placeholder="Noto‘g‘ri javob (B)" class="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium">Bekor qilish</button>
        <button onclick="saveNewTopic()" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Qo‘shish</button>
      </div>
    </div>
  `);
}

function saveNewTopic() {
  const tTitle = document.getElementById("new-theory-title").value.trim();
  const pTitle = document.getElementById("new-practical-title").value.trim();
  const tText = document.getElementById("new-theory-text").value.trim();
  const qText = document.getElementById("new-quiz-q").value.trim();
  const qA = document.getElementById("new-quiz-a").value.trim();
  const qB = document.getElementById("new-quiz-b").value.trim();
  if (!tTitle || !pTitle) {
    showToast("Nazariy va amaliy mavzu nomini kiriting!", "warning");
    return;
  }
  const nextId = state.modules.length ? Math.max(...state.modules.map(m => m.id)) + 1 : 1;
  state.modules.push({
    id: nextId,
    theoryTitle: tTitle,
    practicalTitle: pTitle,
    theoryContent: [tText || `${tTitle} mavzusi bo‘yicha asosiy nazariy tushunchalar va standartlar.`],
    practicalVideoSteps: [
      { time: "00:00", title: pTitle, caption: `${pTitle} bo‘yicha amaliy ko‘rsatmalar va misollar.` },
      { time: "02:00", title: "Amaliy tekshiruv", caption: "Natijalarni tahlil qilish va xatolarni tuzatish." }
    ],
    practicalTask: {
      title: `${pTitle} — Amaliy mashq`,
      desc: "To‘g‘ri javobni tanlang.",
      pairs: [{ device: tTitle, correct: qA || "To‘g‘ri variant", options: [qA || "To‘g‘ri variant", qB || "Boshqa variant"] }]
    },
    quiz: [
      { q: qText || `${tTitle} mavzusining asosiy maqsadi nima?`, opts: [qA || "Tarmoq samaradorligini oshirish", qB || "Aloqani uzish"], ans: 0 }
    ]
  });
  saveState();
  closeModal();
  showToast(`${nextId}-mavzu muvaffaqiyatli qo‘shildi!`, "success");
  render();
}

function openAddLabModal() {
  const nextId = state.labs.length ? Math.max(...state.labs.map(l => l.id)) + 1 : 1;
  openModal(`
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold">Yangi laboratoriya qo‘shish (#${nextId})</h3>
      <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 font-bold text-xl">✕</button>
    </div>
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Laboratoriya nomi</label>
        <input id="new-lab-title" type="text" placeholder="Masalan: Cisco Packet Tracer da NAT sozlash" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Vosita / Texnologiya</label>
        <input id="new-lab-tool" type="text" placeholder="Masalan: Cisco IOS NAT" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Tavsif</label>
        <textarea id="new-lab-desc" rows="2" placeholder="Laboratoriya vazifasi..." class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"></textarea>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Kutilayotgan CLI buyrug‘i</label>
        <input id="new-lab-cmd" type="text" placeholder="Masalan: ip nat inside" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-mono" />
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium">Bekor qilish</button>
        <button onclick="saveNewLab()" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Qo‘shish</button>
      </div>
    </div>
  `);
}

function saveNewLab() {
  const title = document.getElementById("new-lab-title").value.trim();
  const tool = document.getElementById("new-lab-tool").value.trim() || "Cisco Packet Tracer";
  const desc = document.getElementById("new-lab-desc").value.trim() || "Virtual laboratoriya mashg‘uloti.";
  const cmd = document.getElementById("new-lab-cmd").value.trim() || "show running-config";
  if (!title) {
    showToast("Laboratoriya nomini kiriting!", "warning");
    return;
  }
  const nextId = state.labs.length ? Math.max(...state.labs.map(l => l.id)) + 1 : 1;
  state.labs.push({
    id: nextId,
    title,
    tool,
    desc,
    videoSteps: [
      { time: "00:00", title: title, caption: desc },
      { time: "01:30", title: "CLI buyruqlar", caption: `Terminalda '${cmd}' buyrug‘ini bajarish.` }
    ],
    objectives: [`Terminalda '${cmd}' buyrug‘ini bajarish`],
    expectedCommands: [cmd],
    initialTopology: [
      { name: "Router-1", type: "router", ip: "192.168.1.1", status: "up" },
      { name: "PC-1", type: "pc", ip: "192.168.1.10", status: "up" }
    ],
    hint: `Terminalga '${cmd}' buyrug‘ini kiriting.`
  });
  saveState();
  closeModal();
  showToast(`${nextId}-laboratoriya qo‘shildi!`, "success");
  render();
}

function saveAdminCredentials() {
  const email = document.getElementById("admin-cred-email").value.trim().toLowerCase();
  const pass = document.getElementById("admin-cred-pass").value.trim();
  if (!email || pass.length < 3) {
    showToast("Admin login va kamida 3 belgili parol kiriting!", "warning");
    return;
  }
  state.adminCredentials = { email, password: pass };
  saveState();
  showToast("Admin login va paroli yangilandi!", "success");
  render();
}

function openEditTopicModal(modId) {
  const mod = state.modules.find(m => m.id === modId);
  if (!mod) return;
  openModal(`
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold">${mod.id}-Mavzuni tahrirlash</h3>
      <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700 font-bold text-xl">✕</button>
    </div>
    <div class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Nazariy mavzu nomi</label>
        <input id="edit-theory-title" type="text" value="${escapeHtml(mod.theoryTitle)}" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Amaliy mavzu nomi</label>
        <input id="edit-practical-title" type="text" value="${escapeHtml(mod.practicalTitle)}" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Nazariy matn (1-band)</label>
        <textarea id="edit-theory-content" rows="3" class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm">${escapeHtml(mod.theoryContent[0] || "")}</textarea>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Ma’ruza YouTube havolasi (ixtiyoriy)</label>
          <input id="edit-theory-video" type="url" value="${escapeHtml(mod.theoryVideoUrl || "")}" placeholder="https://youtube.com/watch?v=..." class="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Amaliy YouTube havolasi (ixtiyoriy)</label>
          <input id="edit-practical-video" type="url" value="${escapeHtml(mod.practicalVideoUrl || "")}" placeholder="https://youtube.com/watch?v=..." class="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button onclick="closeModal()" class="px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium">Bekor qilish</button>
        <button onclick="saveTopicEdit(${mod.id})" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Saqlash</button>
      </div>
    </div>
  `);
}

function saveTopicEdit(modId) {
  const mod = state.modules.find(m => m.id === modId);
  if (!mod) return;
  mod.theoryTitle = document.getElementById("edit-theory-title").value.trim() || mod.theoryTitle;
  mod.practicalTitle = document.getElementById("edit-practical-title").value.trim() || mod.practicalTitle;
  const newTheoryText = document.getElementById("edit-theory-content").value.trim();
  if (newTheoryText) mod.theoryContent[0] = newTheoryText;
  mod.theoryVideoUrl = document.getElementById("edit-theory-video").value.trim();
  mod.practicalVideoUrl = document.getElementById("edit-practical-video").value.trim();
  saveState();
  closeModal();
  showToast(`${modId}-mavzu yangilandi!`, "success");
  render();
}

function renderAuthView() {
  const isReg = state.authTab === "register";
  return `
    <div class="min-h-screen bg-sky-950/45 backdrop-blur-[2px] flex items-center justify-center p-4">
      <div class="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div class="text-white space-y-6">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            INTERAKTIV O‘QUV PLATFORMASI
          </div>
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Kompyuter <span class="text-indigo-400">Tarmoqlari</span>
          </h1>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            12 ta nazariy, 12 ta amaliy va 8 ta Cisco Packet Tracer virtual laboratoriya mashg‘ulotlari. Har bir mavzu testini <strong>100%</strong> natija bilan topshirib, yakuniy nazorat va rasmiy sertifikatga ega bo‘ling.
          </p>
          <div class="grid grid-cols-3 gap-3 pt-2">
            <div class="bg-white/5 border border-white/10 rounded-xl p-3">
              <div class="text-2xl font-bold text-indigo-300">12</div>
              <div class="text-xs text-slate-400">Nazariy & Amaliy</div>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-xl p-3">
              <div class="text-2xl font-bold text-emerald-300">8</div>
              <div class="text-xs text-slate-400">Virtual Lab</div>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-xl p-3">
              <div class="text-2xl font-bold text-amber-300">100%</div>
              <div class="text-xs text-slate-400">O‘tish talabi</div>
            </div>
          </div>
          <div class="pt-2">
            <p class="text-xs text-slate-400 mb-2 font-medium">Tezkor sinov (Demo kirish):</p>
            <div class="flex flex-wrap gap-2">
              <button onclick="quickDemoLogin('student_new')" class="px-3 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white text-xs font-semibold transition">👤 Talaba (1-mavzu)</button>
              <button onclick="quickDemoLogin('student_grad')" class="px-3 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-semibold transition">🎓 Bitiruvchi (Sertifikat)</button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
          <div class="flex bg-slate-100 p-1 rounded-xl mb-6 gap-1">
            <button onclick="state.authTab='login'; render();" class="flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${state.authTab==='login' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'}">Kirish</button>
            <button onclick="state.authTab='register'; render();" class="flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${state.authTab==='register' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'}">Ro‘yxatdan o‘tish</button>
            <button onclick="state.authTab='recover'; state.recoveryState.step=1; render();" class="flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${state.authTab==='recover' ? 'bg-white shadow text-indigo-600' : 'text-slate-600 hover:text-slate-900'}">Tiklash</button>
          </div>

          ${state.authTab === 'recover' ? `
            <div class="space-y-4">
              <div class="flex gap-2">
                <button type="button" onclick="state.recoveryState.mode='email'; state.recoveryState.step=1; render();" class="flex-1 py-2 rounded-xl text-xs font-semibold border ${state.recoveryState.mode==='email' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}">Parolni tiklash (Email)</button>
                <button type="button" onclick="state.recoveryState.mode='find_login'; state.recoveryState.step=1; render();" class="flex-1 py-2 rounded-xl text-xs font-semibold border ${state.recoveryState.mode==='find_login' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'}">Loginni eslash (F.I.Sh.)</button>
              </div>

              ${state.recoveryState.step === 1 ? `
                <form onsubmit="startRecoveryLookup(event)" class="space-y-4">
                  ${state.recoveryState.mode === 'email' ? `
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1.5">Ro‘yxatdan o‘tgan Email</label>
                      <input id="rec-email" type="email" required placeholder="azizbek@tuit.uz" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                    </div>
                  ` : `
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1.5">F.I.Sh. (yoki ismi)</label>
                      <input id="rec-name" type="text" required placeholder="Azizbek Karimov" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1.5">Guruh</label>
                      <input id="rec-group" type="text" required placeholder="KI-211" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                    </div>
                  `}
                  <button type="submit" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition">Tekshirish va kod yuborish</button>
                </form>
              ` : `
                <form onsubmit="completePasswordReset(event)" class="space-y-4">
                  <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <div><strong>Topilgan login (Email):</strong> <code class="font-bold">${escapeHtml(state.recoveryState.foundEmail)}</code></div>
                    <div><strong>Tasdiqlash kodi (Demo):</strong> <code class="font-bold text-indigo-700">${escapeHtml(state.recoveryState.generatedCode)}</code></div>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5">Tasdiqlash kodi</label>
                    <input id="rec-code" type="text" required placeholder="6 xonali kod" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5">Yangi parol</label>
                    <input id="rec-new-pass" type="password" required placeholder="Yangi parol kiriting" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                  </div>
                  <div class="flex gap-2">
                    <button type="button" onclick="state.recoveryState.step=1; render();" class="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold">Orqaga</button>
                    <button type="submit" class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition">Parolni yangilash</button>
                  </div>
                </form>
              `}
            </div>
          ` : !isReg ? `
            <form onsubmit="handleLogin(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5">Email / Login</label>
                <input id="login-email" type="email" required placeholder="azizbek@tuit.uz" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5">Parol</label>
                <input id="login-pass" type="password" required placeholder="•••" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm" />
              </div>
              <div class="flex justify-end">
                <button type="button" onclick="state.authTab='recover'; state.recoveryState.step=1; render();" class="text-xs font-semibold text-indigo-600 hover:text-indigo-800">Login yoki parolni unutdingizmi?</button>
              </div>
              <button type="submit" class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 transition">Platformaga kirish</button>
              <div class="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <strong>Sinov hisoblari:</strong><br/>
                Talaba: <code class="text-indigo-600">azizbek@tuit.uz</code> / parol: <code class="text-indigo-600">123</code>
              </div>
            </form>
          ` : `
            <form onsubmit="handleRegister(event)" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5">F.I.Sh. (To‘liq ism)</label>
                <input id="reg-name" type="text" required placeholder="Masalan: Jasur Toshmatov" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5">Guruh</label>
                <input id="reg-group" type="text" required placeholder="Masalan: KI-214" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
                <input id="reg-email" type="email" required placeholder="jasur@tuit.uz" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5">Parol</label>
                <input id="reg-pass" type="password" required placeholder="Kamida 3 ta belgi" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
              </div>
              <button type="submit" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition">Ro‘yxatdan o‘tish va boshlash</button>
            </form>
          `}
        </div>
      </div>
    </div>
  `;
}

function renderStudentView() {
  const stu = getCurrentStudent();
  if (!stu) return renderAuthView();

  const completedTopics = Object.values(stu.topicScores).filter(s => s === 100).length;
  const progressPct = Math.round((completedTopics / 12) * 100);
  const finalUnlocked = !state.strictGating || stu.unlockedTopic > 12;

  return `
    <header class="bg-white border-b border-slate-200 sticky top-0 z-30 no-print">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">KT</div>
          <div class="truncate">
            <div class="font-bold text-slate-900 text-sm sm:text-base truncate">Kompyuter Tarmoqlari</div>
            <div class="text-xs text-slate-500 hidden sm:block">Talaba kabineti • ${escapeHtml(stu.group)}</div>
          </div>
        </div>
        <nav class="flex items-center gap-1 sm:gap-2 overflow-x-auto">
          <button onclick="state.studentTab='courses'; render();" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap ${state.studentTab==='courses' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}">📚 Mavzular (12)</button>
          <button onclick="state.studentTab='labs'; render();" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap ${state.studentTab==='labs' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}">🔬 Laboratoriya (8)</button>
          <button onclick="state.studentTab='final'; render();" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap ${state.studentTab==='final' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}">🎓 Yakuniy & Sertifikat</button>
          <button onclick="state.studentTab='cabinet'; render();" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap ${state.studentTab==='cabinet' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}">👤 Kabinet</button>
        </nav>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="logout()" class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700">Chiqish</button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
      ${state.studentTab === "courses" ? renderCoursesTab(stu, progressPct, completedTopics) : ""}
      ${state.studentTab === "labs" ? renderLabsTab(stu) : ""}
      ${state.studentTab === "final" ? renderFinalTab(stu, finalUnlocked, completedTopics) : ""}
      ${state.studentTab === "cabinet" ? renderCabinetTab(stu, progressPct, completedTopics) : ""}
    </main>
  `;
}

function renderCoursesTab(stu, progressPct, completedTopics) {
  const mod = state.modules.find(m => m.id === state.activeTopicId) || state.modules[0];
  const modScore = stu.topicScores[mod.id] || 0;

  return `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <aside class="lg:col-span-4 space-y-3">
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Kurs o‘zlashtirish</span>
            <span class="text-indigo-600">${completedTopics}/12 (100%)</span>
          </div>
          <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-indigo-600 transition-all duration-500" style="width: ${progressPct}%"></div>
          </div>
          ${state.strictGating ? `<p class="text-[11px] text-slate-500 mt-2">⚠️ Keyingi mavzuga o‘tish uchun joriy mavzu testini 100% bajaring.</p>` : ""}
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 max-h-[600px] overflow-y-auto custom-scroll">
          ${state.modules.map(m => {
            const unlocked = isTopicUnlocked(stu, m.id);
            const score = stu.topicScores[m.id];
            const isDone = score === 100;
            const isActive = state.activeTopicId === m.id;
            return `
              <button onclick="selectTopic(${m.id})" class="w-full text-left p-3.5 flex items-start gap-3 transition ${isActive ? 'bg-indigo-50/80' : unlocked ? 'hover:bg-slate-50' : 'opacity-60 bg-slate-50/50 cursor-not-allowed'}">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${isDone ? 'bg-emerald-100 text-emerald-700' : unlocked ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'}">
                  ${isDone ? '✓' : unlocked ? m.id : '🔒'}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold ${isActive ? 'text-indigo-700' : 'text-slate-800'} truncate">${m.id}-mavzu: ${escapeHtml(m.theoryTitle)}</div>
                  <div class="text-[11px] text-slate-500 truncate mt-0.5">Amaliy: ${escapeHtml(m.practicalTitle)}</div>
                </div>
                ${score !== undefined ? `<span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${score===100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${score}%</span>` : ''}
              </button>
            `;
          }).join("")}
        </div>
      </aside>

      <section class="lg:col-span-8 space-y-5">
        <div class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">${mod.id}-Mavzu</span>
              <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">${escapeHtml(mod.theoryTitle)}</h2>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold ${modScore===100 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}">
              Test natijasi: ${modScore}%
            </span>
          </div>

          <div class="flex gap-2 border-b border-slate-200 pb-3 mb-5 overflow-x-auto">
            <button onclick="state.activeTopicSubTab='theory'; render();" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap ${state.activeTopicSubTab==='theory' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">📖 Nazariy mashg‘ulot</button>
            <button onclick="state.activeTopicSubTab='practical'; state.videoPlayer.stepIndex=0; state.videoPlayer.embedActive=false; stopVideoTimer(); render();" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap ${state.activeTopicSubTab==='practical' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">🎬 Amaliy & Videodars</button>
            <button onclick="state.activeTopicSubTab='quiz'; render();" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap ${state.activeTopicSubTab==='quiz' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">✅ Mavzu testi (100%)</button>
          </div>

          ${state.activeTopicSubTab === "theory" ? `
            <div class="space-y-5">
              <div>
                <h3 class="text-sm font-bold text-slate-800 mb-2">🎬 Ma’ruza videomateriali</h3>
                ${renderVideoPlayer(mod.theoryTitle, getTheoryVideoSteps(mod), mod.theoryVideoUrl || "")}
              </div>
              <div class="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-sm text-indigo-950 font-medium">
                Ma’ruza maqsadi: "${escapeHtml(mod.theoryTitle)}" mavzusining asosiy tushunchalari, standartlari va ishlash prinsiplarini o‘zlashtirish.
              </div>
              <div class="space-y-3">
                ${mod.theoryContent.map((p, i) => `
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex gap-3">
                    <span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">${i+1}</span>
                    <p class="text-sm text-slate-700 leading-relaxed">${escapeHtml(p)}</p>
                  </div>
                `).join("")}
              </div>
              <div class="pt-2 flex justify-end">
                <button onclick="state.activeTopicSubTab='practical'; render();" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold">Amaliy mashg‘ulotga o‘tish →</button>
              </div>
            </div>
          ` : ""}

          ${state.activeTopicSubTab === "practical" ? `
            <div class="space-y-6">
              <div>
                <h3 class="text-base font-bold text-slate-900 mb-1">Amaliy mashg‘ulot: ${escapeHtml(mod.practicalTitle)}</h3>
                <p class="text-xs text-slate-500 mb-3">Videodarsni tomosha qiling va quyidagi interaktiv amaliy topshiriqni bajaring.</p>
                ${renderVideoPlayer(mod.practicalTitle, mod.practicalVideoSteps, mod.practicalVideoUrl || "")}
              </div>

              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div class="flex items-center justify-between gap-2">
                  <div>
                    <h4 class="font-bold text-slate-900 text-sm">${escapeHtml(mod.practicalTask.title)}</h4>
                    <p class="text-xs text-slate-500">${escapeHtml(mod.practicalTask.desc)}</p>
                  </div>
                  ${stu.completedPracticals.includes(mod.id) ? `<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">✓ Bajarilgan</span>` : ''}
                </div>
                <div class="space-y-3">
                  ${mod.practicalTask.pairs.map((p, idx) => {
                    const key = `${mod.id}_${idx}`;
                    const val = state.practicalSelection[key] || "";
                    return `
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-3 rounded-xl border border-slate-200">
                        <span class="text-xs sm:text-sm font-semibold text-slate-800">${escapeHtml(p.device)}</span>
                        <select onchange="state.practicalSelection['${key}']=this.value" class="px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white">
                          <option value="">— Tanlang —</option>
                          ${p.options.map(opt => `<option value="${escapeHtml(opt)}" ${val===opt ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join("")}
                        </select>
                      </div>
                    `;
                  }).join("")}
                </div>
                <div class="flex flex-wrap justify-between items-center gap-3 pt-1">
                  <button onclick="checkPracticalTask(${mod.id})" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold">Topshiriqni tekshirish</button>
                  <button onclick="state.activeTopicSubTab='quiz'; render();" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold">Mavzu testiga o‘tish →</button>
                </div>
              </div>
            </div>
          ` : ""}

          ${state.activeTopicSubTab === "quiz" ? `
            <div class="space-y-5">
              <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900">
                <strong>Muhim qoida:</strong> ${mod.id < 12 ? `${mod.id + 1}-mavzuga o‘tish` : 'Yakuniy nazorat testiga o‘tish'} uchun ushbu testdagi barcha savollarga <strong>100%</strong> to‘g‘ri javob berishingiz shart!
              </div>

              <div class="space-y-4">
                ${mod.quiz.map((q, qIdx) => `
                  <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                    <div class="font-semibold text-sm text-slate-900">${qIdx + 1}. ${escapeHtml(q.q)}</div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      ${q.opts.map((opt, oIdx) => {
                        const checked = state.quizAnswers[qIdx] === oIdx;
                        return `
                          <label class="flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs sm:text-sm transition ${checked ? 'border-indigo-500 bg-indigo-50 text-indigo-900 font-medium' : 'border-slate-200 bg-white hover:bg-slate-50'}">
                            <input type="radio" name="q_${mod.id}_${qIdx}" ${checked ? 'checked' : ''} onchange="state.quizAnswers[${qIdx}]=${oIdx}; render();" class="accent-indigo-600" />
                            <span>${escapeHtml(opt)}</span>
                          </label>
                        `;
                      }).join("")}
                    </div>
                  </div>
                `).join("")}
              </div>

              <div class="flex flex-wrap items-center justify-between gap-3">
                <button onclick="submitTopicQuiz(${mod.id})" class="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md">Testni yakunlash va tekshirish</button>
                ${modScore === 100 && mod.id < 12 ? `
                  <button onclick="selectTopic(${mod.id + 1})" class="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold">${mod.id + 1}-mavzuga o‘tish →</button>
                ` : ''}
                ${modScore === 100 && mod.id === 12 ? `
                  <button onclick="state.studentTab='final'; render();" class="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold">Yakuniy nazorat testiga o‘tish →</button>
                ` : ''}
              </div>

              ${state.lastQuizResult ? `
                <div class="p-4 rounded-2xl border ${state.lastQuizResult.score === 100 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'} space-y-2">
                  <div class="font-bold text-sm ${state.lastQuizResult.score === 100 ? 'text-emerald-800' : 'text-rose-800'}">
                    Natija: ${state.lastQuizResult.score}% (${state.lastQuizResult.correct}/${state.lastQuizResult.total} to‘g‘ri)
                  </div>
                  <div class="space-y-1 text-xs">
                    ${state.lastQuizResult.details.map((d, i) => `
                      <div class="${d.isOk ? 'text-emerald-700' : 'text-rose-700'}">
                        ${i + 1}-savol: ${d.isOk ? '✓ To‘g‘ri' : '✕ Noto‘g‘ri'}
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ''}
            </div>
          ` : ""}
        </div>
      </section>
    </div>
  `;
}

function renderLabsTab(stu) {
  const lab = state.labs.find(l => l.id === state.activeLabId) || state.labs[0];
  const history = state.labTerminalHistory[lab.id] || [];
  const isDone = stu.completedLabs.includes(lab.id) || state.labVerified[lab.id];

  return `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <aside class="lg:col-span-4 space-y-3">
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div class="text-xs font-bold text-slate-500 uppercase">Laboratoriya ishlari</div>
          <div class="text-lg font-bold text-slate-900 mt-1">${stu.completedLabs.length} / 8 bajarildi</div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
          ${state.labs.map(l => {
            const done = stu.completedLabs.includes(l.id);
            const active = state.activeLabId === l.id;
            return `
              <button onclick="state.activeLabId=${l.id}; state.videoPlayer.stepIndex=0; state.videoPlayer.embedActive=false; stopVideoTimer(); render();" class="w-full text-left p-3.5 flex items-start gap-3 transition ${active ? 'bg-indigo-50' : 'hover:bg-slate-50'}">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${done ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}">
                  ${done ? '✓' : l.id}
                </div>
                <div class="min-w-0">
                  <div class="text-xs font-bold ${active ? 'text-indigo-700' : 'text-slate-800'}">${l.id}-Lab: ${escapeHtml(l.title)}</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">${escapeHtml(l.tool)}</div>
                </div>
              </button>
            `;
          }).join("")}
        </div>
      </aside>

      <section class="lg:col-span-8 space-y-6">
        <div class="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-xs font-bold text-indigo-600 uppercase">Laboratoriya #${lab.id} • ${escapeHtml(lab.tool)}</span>
              <h2 class="text-xl font-bold text-slate-900 mt-0.5">${escapeHtml(lab.title)}</h2>
            </div>
            ${isDone ? `<span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">✓ Laboratoriya topshirildi</span>` : ''}
          </div>
          <p class="text-sm text-slate-600">${escapeHtml(lab.desc)}</p>

          <div>
            <h3 class="text-sm font-bold text-slate-800 mb-2">🎬 Laboratoriya videodarsi</h3>
            ${renderVideoPlayer(lab.title, lab.videoSteps, lab.videoUrl || "")}
          </div>

          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <h3 class="text-sm font-bold text-slate-900">🖥️ Virtual Laboratoriya Simulyatori (Cisco Packet Tracer CLI)</h3>
              <span class="text-[11px] font-mono bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg">Real-Time Topology</span>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
              ${lab.initialTopology.map((node, i) => `
                <div class="flex items-center gap-2">
                  <button type="button" onclick="showToast('${escapeHtml(node.name)} • IP: ${escapeHtml(node.ip)} • Holat: ${node.status === 'blocked' ? 'Bloklangan' : 'Faol (UP)'}', '${node.status === 'blocked' ? 'warning' : 'info'}')" class="px-3.5 py-2.5 rounded-xl border ${node.status==='blocked' ? 'border-rose-300 bg-rose-50 hover:bg-rose-100' : 'border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100'} text-center min-w-[110px] transition cursor-pointer">
                    <div class="text-lg">${node.type==='router' ? '🌐' : node.type==='switch' ? '🔀' : node.type==='server' ? '🗄️' : '💻'}</div>
                    <div class="text-xs font-bold text-slate-800">${escapeHtml(node.name)}</div>
                    <div class="text-[10px] font-mono text-slate-500">${escapeHtml(node.ip)}</div>
                  </button>
                  ${i < lab.initialTopology.length - 1 ? `<div class="w-6 h-0.5 bg-emerald-500 hidden sm:block"></div>` : ''}
                </div>
              `).join("")}
            </div>
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-[11px] font-semibold text-slate-500 mr-1">Tezkor buyruqlar:</span>
              ${lab.expectedCommands.map(cmd => `
                <button type="button" onclick="document.getElementById('lab-cli-input').value='${escapeHtml(cmd)}'; runLabCommand(${lab.id});" class="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-indigo-100 text-slate-800 hover:text-indigo-800 font-mono text-[11px] font-medium transition">+ ${escapeHtml(cmd)}</button>
              `).join("")}
            </div>

            <div class="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div class="font-bold text-slate-800">Topshiriq vazifalari:</div>
              <ul class="list-disc list-inside text-slate-600 space-y-0.5">
                ${lab.objectives.map(o => `<li>${escapeHtml(o)}</li>`).join("")}
              </ul>
              <div class="text-indigo-700 font-medium pt-1">💡 Yo‘riqnoma: ${escapeHtml(lab.hint)}</div>
            </div>

            <div class="bg-slate-950 rounded-xl p-4 font-mono text-xs text-emerald-400 space-y-2">
              <div class="text-slate-400 border-b border-slate-800 pb-2 flex justify-between">
                <span>Cisco IOS Terminal — Lab #${lab.id}</span>
                <span>Yordam uchun 'help' yozing</span>
              </div>
              <div class="max-h-44 overflow-y-auto space-y-2 custom-scroll">
                ${history.length === 0 ? `<div class="text-slate-500 italic">Buyruq kiriting...</div>` : history.map(h => `
                  <div>
                    <div class="text-white">Router# ${escapeHtml(h.cmd)}</div>
                    <div class="text-emerald-400 whitespace-pre-line pl-2">${escapeHtml(h.out)}</div>
                  </div>
                `).join("")}
              </div>
              <div class="flex gap-2 pt-2 border-t border-slate-800">
                <span class="text-white py-1.5">Router#</span>
                <input id="lab-cli-input" type="text" onkeydown="if(event.key==='Enter') runLabCommand(${lab.id})" placeholder="Masalan: ${escapeHtml(lab.expectedCommands[0])}" class="flex-1 bg-slate-900 text-white px-3 py-1.5 rounded-lg border border-slate-700 outline-none focus:border-indigo-500" />
                <button onclick="runLabCommand(${lab.id})" class="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-semibold">Bajarish</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderFinalTab(stu, finalUnlocked, completedTopics) {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      ${!finalUnlocked ? `
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
          <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mx-auto">🔒</div>
          <h2 class="text-2xl font-bold text-slate-900">Yakuniy nazorat testi qulflangan</h2>
          <p class="text-sm text-slate-600 max-w-lg mx-auto">
            Yakuniy nazorat testiga kirish va sertifikat olish uchun 1-mavzudan 12-mavzugacha barcha testlarni <strong>100%</strong> natija bilan topshirishingiz kerak.
          </p>
          <div class="inline-block px-4 py-2 rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
            Hozirgi holat: ${completedTopics} / 12 mavzu 100% bajarilgan
          </div>
          <div>
            <button onclick="state.studentTab='courses'; render();" class="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Mavzularga qaytish</button>
          </div>
        </div>
      ` : `
        ${stu.certificateId ? `
          <div class="bg-gradient-to-br from-amber-50 via-white to-indigo-50 rounded-3xl p-6 sm:p-10 border-4 border-double border-amber-400 shadow-xl text-center space-y-4">
            <div class="flex justify-between items-center text-xs text-slate-500 font-mono">
              <span>ID: ${escapeHtml(stu.certificateId)}</span>
              <span>Sana: ${escapeHtml(stu.certificateDate)}</span>
            </div>
            <div class="text-amber-600 font-bold tracking-widest uppercase text-xs">Rasmiy Bitiruv Sertifikati</div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">SERTIFIKAT</h2>
            <p class="text-sm text-slate-600">Ushbu sertifikat quyidagi talabaga beriladi:</p>
            <div class="text-2xl sm:text-3xl font-extrabold text-indigo-700 underline decoration-amber-400 underline-offset-8">${escapeHtml(stu.name)}</div>
            <p class="text-sm text-slate-700 max-w-xl mx-auto pt-2">
              <strong>"Kompyuter tarmoqlari"</strong> fani bo‘yicha 12 ta nazariy, 12 ta amaliy va 8 ta laboratoriya mashg‘ulotlarini to‘liq o‘zlashtirib, yakuniy nazorat testidan <strong>${stu.finalScore}%</strong> natija ko‘rsatgani uchun taqdim etildi.
            </p>
            <div class="pt-4 flex flex-wrap justify-center gap-3 no-print">
              <button onclick="window.print()" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow">🖨️ Sertifikatni chop etish / PDF</button>
            </div>
          </div>
        ` : ''}

        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 no-print">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 class="text-xl font-bold text-slate-900">Yakuniy Nazorat Testi</h2>
              <p class="text-xs text-slate-500">Sertifikat olish uchun kamida ${state.finalPassThreshold}% natija to‘plang.</p>
            </div>
            ${stu.finalScore !== null ? `<span class="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">Eng yaxshi natija: ${stu.finalScore}%</span>` : ''}
          </div>

          <div class="space-y-4">
            ${FINAL_EXAM_QUESTIONS.map((q, idx) => `
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div class="font-semibold text-sm text-slate-900">${idx + 1}. ${escapeHtml(q.q)}</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  ${q.opts.map((opt, oIdx) => {
                    const checked = state.finalAnswers[idx] === oIdx;
                    return `
                      <label class="flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs sm:text-sm ${checked ? 'border-indigo-500 bg-indigo-50 font-medium' : 'border-slate-200 bg-white'}">
                        <input type="radio" name="final_${idx}" ${checked ? 'checked' : ''} onchange="state.finalAnswers[${idx}]=${oIdx}; render();" class="accent-indigo-600" />
                        <span>${escapeHtml(opt)}</span>
                      </label>
                    `;
                  }).join("")}
                </div>
              </div>
            `).join("")}
          </div>

          <button onclick="submitFinalExam()" class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md">Yakuniy testni topshirish</button>
        </div>
      `}
    </div>
  `;
}

function renderCabinetTab(stu, progressPct, completedTopics) {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">${escapeHtml(stu.name.charAt(0))}</div>
          <div>
            <h2 class="text-xl font-bold text-slate-900">${escapeHtml(stu.name)}</h2>
            <p class="text-sm text-slate-500">${escapeHtml(stu.email)} • Guruh: <strong>${escapeHtml(stu.group)}</strong></p>
            <p class="text-xs text-slate-400 mt-0.5">Ro‘yxatdan o‘tgan sana: ${escapeHtml(stu.joinedAt)}</p>
          </div>
        </div>
        <div class="text-left sm:text-right">
          <div class="text-xs text-slate-500 font-semibold">Sertifikat holati</div>
          ${stu.certificateId ? `<span class="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">✓ Berilgan (${escapeHtml(stu.certificateId)})</span>` : `<span class="inline-block mt-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">Hali olinmagan</span>`}
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-slate-200">
          <div class="text-xs text-slate-500">O‘zlashtirish</div>
          <div class="text-2xl font-extrabold text-indigo-600 mt-1">${progressPct}%</div>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200">
          <div class="text-xs text-slate-500">100% Mavzular</div>
          <div class="text-2xl font-extrabold text-emerald-600 mt-1">${completedTopics} / 12</div>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200">
          <div class="text-xs text-slate-500">Laboratoriyalar</div>
          <div class="text-2xl font-extrabold text-amber-600 mt-1">${stu.completedLabs.length} / 8</div>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200">
          <div class="text-xs text-slate-500">Yakuniy ball</div>
          <div class="text-2xl font-extrabold text-slate-900 mt-1">${stu.finalScore !== null ? stu.finalScore + '%' : '—'}</div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-slate-200">
        <h3 class="font-bold text-sm text-slate-900 mb-3">Mavzular bo‘yicha test natijalari</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          ${state.modules.map(m => {
            const sc = stu.topicScores[m.id];
            const unlocked = isTopicUnlocked(stu, m.id);
            return `
              <div class="p-3 rounded-xl border ${sc===100 ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-slate-50'}">
                <div class="text-xs font-bold text-slate-800">${m.id}-Mavzu</div>
                <div class="text-xs mt-1 font-semibold ${sc===100 ? 'text-emerald-700' : unlocked ? 'text-amber-600' : 'text-slate-400'}">
                  ${sc !== undefined ? sc + '%' : unlocked ? 'Ochiq (0%)' : '🔒 Qulflangan'}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderAdminView() {
  const totalStudents = state.students.length;
  const certsIssued = state.students.filter(s => s.certificateId).length;
  const avgTopics = totalStudents ? Math.round(state.students.reduce((acc, s) => acc + Object.values(s.topicScores).filter(v => v === 100).length, 0) / totalStudents * 10) / 10 : 0;

  return `
    <header class="bg-slate-900 text-white sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold">A</div>
          <div>
            <div class="font-bold text-sm sm:text-base">Admin Panel</div>
            <div class="text-xs text-slate-400 hidden sm:block">Kompyuter Tarmoqlari Platformasi</div>
          </div>
        </div>
        <nav class="flex items-center gap-1 sm:gap-2 overflow-x-auto">
          <button onclick="state.adminTab='overview'; render();" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold ${state.adminTab==='overview' ? 'bg-slate-800 text-amber-400' : 'text-slate-300 hover:bg-slate-800'}">📊 Umumiy</button>
          <button onclick="state.adminTab='students'; render();" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold ${state.adminTab==='students' ? 'bg-slate-800 text-amber-400' : 'text-slate-300 hover:bg-slate-800'}">👥 Talabalar</button>
          <button onclick="state.adminTab='curriculum'; render();" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold ${state.adminTab==='curriculum' ? 'bg-slate-800 text-amber-400' : 'text-slate-300 hover:bg-slate-800'}">📚 Mavzular (32)</button>
          <button onclick="state.adminTab='settings'; render();" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold ${state.adminTab==='settings' ? 'bg-slate-800 text-amber-400' : 'text-slate-300 hover:bg-slate-800'}">⚙️ Sozlamalar</button>
        </nav>
        <button onclick="logout()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold">Chiqish</button>
      </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      ${state.adminTab === "overview" ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-500 font-semibold">Jami talabalar</div>
            <div class="text-3xl font-extrabold text-slate-900 mt-1">${totalStudents}</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-500 font-semibold">Berilgan sertifikatlar</div>
            <div class="text-3xl font-extrabold text-emerald-600 mt-1">${certsIssued}</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-500 font-semibold">O‘rtacha tugatilgan mavzu</div>
            <div class="text-3xl font-extrabold text-indigo-600 mt-1">${avgTopics} / 12</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-500 font-semibold">100% Cheklov rejimi</div>
            <div class="text-xl font-extrabold mt-2 ${state.strictGating ? 'text-emerald-600' : 'text-amber-600'}">${state.strictGating ? 'FAOL (Qat’iy)' : 'O‘CHIRILGAN'}</div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 class="font-bold text-slate-900 mb-3">Talabalar reytingi</h3>
          <div class="space-y-3">
            ${state.students.map(s => {
              const done = Object.values(s.topicScores).filter(v => v === 100).length;
              return `
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <div class="font-bold text-sm text-slate-900">${escapeHtml(s.name)} <span class="text-xs font-normal text-slate-500">(${escapeHtml(s.group)})</span></div>
                    <div class="text-xs text-slate-500">${done}/12 mavzu • ${s.completedLabs.length}/8 lab</div>
                  </div>
                  <span class="px-3 py-1 rounded-full text-xs font-bold ${s.certificateId ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}">
                    ${s.certificateId ? '🎓 Sertifikat olgan' : `${Math.round(done/12*100)}%`}
                  </span>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      ` : ""}

      ${state.adminTab === "students" ? `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-200 flex justify-between items-center">
            <h2 class="font-bold text-lg text-slate-900">Talabalar boshqaruvi</h2>
            <span class="text-xs text-slate-500">Jami: ${totalStudents} nafar</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-slate-600 text-xs uppercase">
                <tr>
                  <th class="p-4">Talaba</th>
                  <th class="p-4">Guruh</th>
                  <th class="p-4">Ochiq mavzu</th>
                  <th class="p-4">Lablar</th>
                  <th class="p-4">Sertifikat</th>
                  <th class="p-4">Amallar</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${state.students.map(s => `
                  <tr>
                    <td class="p-4">
                      <div class="font-bold text-slate-900">${escapeHtml(s.name)}</div>
                      <div class="text-xs text-slate-500">${escapeHtml(s.email)}</div>
                    </td>
                    <td class="p-4 text-xs font-semibold">${escapeHtml(s.group)}</td>
                    <td class="p-4 text-xs font-bold text-indigo-600">${s.unlockedTopic <= 12 ? s.unlockedTopic + '-mavzu' : 'Yakuniy test'}</td>
                    <td class="p-4 text-xs">${s.completedLabs.length} / 8</td>
                    <td class="p-4 text-xs">${s.certificateId ? `<span class="text-emerald-600 font-bold">${escapeHtml(s.certificateId)}</span>` : '—'}</td>
                    <td class="p-4">
                      <div class="flex flex-wrap gap-1.5">
                        <button onclick="adminUnlockTopic('${s.id}', 13)" class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold">Barchasini ochish</button>
                        <button onclick="openAdminResetPassModal('${s.id}')" class="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold">Parolni tiklash</button>
                        <button onclick="adminResetStudent('${s.id}')" class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-semibold">Nollash</button>
                        <button onclick="adminDeleteStudent('${s.id}')" class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold">O‘chirish</button>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      ` : ""}

      ${state.adminTab === "curriculum" ? `
        <div class="space-y-4">
          <div class="bg-white rounded-2xl p-5 border border-slate-200">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h2 class="font-bold text-lg text-slate-900">${state.modules.length} ta Nazariy va Amaliy mavzular</h2>
              <button onclick="openAddTopicModal()" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold">+ Yangi mavzu qo‘shish</button>
            </div>
            <div class="divide-y divide-slate-100">
              ${state.modules.map(m => `
                <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div class="font-bold text-sm text-slate-900">${m.id}. Nazariy: ${escapeHtml(m.theoryTitle)}</div>
                    <div class="text-xs text-slate-500">Amaliy: ${escapeHtml(m.practicalTitle)} • (${m.quiz.length} ta test savoli)</div>
                  </div>
                  <button onclick="openEditTopicModal(${m.id})" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 self-start sm:self-auto">Tahrirlash</button>
                </div>
              `).join("")}
            </div>
          </div>
          <div class="bg-white rounded-2xl p-5 border border-slate-200">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h2 class="font-bold text-lg text-slate-900">${state.labs.length} ta Laboratoriya mashg‘ulotlari</h2>
              <button onclick="openAddLabModal()" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold">+ Yangi laboratoriya qo‘shish</button>
            </div>
            <div class="divide-y divide-slate-100">
              ${state.labs.map(l => `
                <div class="py-2.5">
                  <div class="font-bold text-sm text-slate-900">${l.id}. ${escapeHtml(l.title)}</div>
                  <div class="text-xs text-slate-500">${escapeHtml(l.desc)}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      ` : ""}

      ${state.adminTab === "settings" ? `
        <div class="bg-white rounded-2xl p-6 border border-slate-200 max-w-2xl space-y-5">
          <h2 class="font-bold text-lg text-slate-900">Platforma qoidalari</h2>
          <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div class="font-bold text-sm text-slate-900">Qat’iy 100% test cheklovi</div>
              <div class="text-xs text-slate-500">Talaba joriy mavzu testini 100% bajarmaguncha keyingi mavzuga va yakuniy testga o‘ta olmaydi.</div>
            </div>
            <button onclick="adminToggleStrictGating()" class="px-4 py-2 rounded-xl text-xs font-bold ${state.strictGating ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}">
              ${state.strictGating ? 'YOQILGAN' : 'O‘CHIRILGAN'}
            </button>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div class="font-bold text-sm text-slate-900">Yakuniy test o‘tish bali (%)</div>
              <div class="text-xs text-slate-500">Sertifikat berilishi uchun minimal foiz.</div>
            </div>
            <select onchange="state.finalPassThreshold=Number(this.value); saveState(); showToast('O‘tish bali yangilandi', 'success');" class="px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold">
              ${[70, 80, 90, 100].map(v => `<option value="${v}" ${state.finalPassThreshold===v ? 'selected' : ''}>${v}%</option>`).join("")}
            </select>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="font-bold text-sm text-slate-900">Admin kirish login va parolini o‘zgartirish</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Admin Email / Login</label>
                <input id="admin-cred-email" type="text" value="${escapeHtml(state.adminCredentials.email)}" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Admin Parol</label>
                <input id="admin-cred-pass" type="text" value="${escapeHtml(state.adminCredentials.password)}" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm" />
              </div>
            </div>
            <button onclick="saveAdminCredentials()" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">Admin ma’lumotlarini saqlash</button>
          </div>
        </div>
      ` : ""}
    </main>
  `;
}

function render() {
  const app = document.getElementById("app");
  if (!state.currentUser) {
    app.innerHTML = renderAuthView();
  } else if (state.currentUser.role === "admin") {
    app.innerHTML = renderAdminView();
  } else {
    app.innerHTML = renderStudentView();
  }
}

render();
