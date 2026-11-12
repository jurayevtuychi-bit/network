// =========================================================================
// STATE MANAGEMENT & PERSISTENCE
// =========================================================================
const STORAGE_KEY = "kt_platform_state_v1";

function createDefaultStudents() {
  return [
    {
      id: "stu_1",
      name: "Azizbek Karimov",
      group: "KI-211",
      email: "azizbek@tuit.uz",
      password: "123",
      unlockedTopic: 1,
      topicScores: {},
      completedPracticals: [],
      completedLabs: [],
      finalScore: null,
      certificateId: null,
      certificateDate: null,
      joinedAt: "2026-10-15"
    },
    {
      id: "stu_2",
      name: "Madina Rustamova",
      group: "KI-212",
      email: "madina@tuit.uz",
      password: "123",
      unlockedTopic: 13,
      topicScores: {1:100,2:100,3:100,4:100,5:100,6:100,7:100,8:100,9:100,10:100,11:100,12:100},
      completedPracticals: [1,2,3,4,5,6,7,8,9,10,11,12],
      completedLabs: [1,2,3,4,5,6,7,8],
      finalScore: 100,
      certificateId: "KT-2026-88412",
      certificateDate: "2026-11-10",
      joinedAt: "2026-09-20"
    }
  ];
}

let state = {
  currentUser: null,
  authTab: "login",
  recoveryState: { step: 1, mode: "email", email: "", code: "", generatedCode: "", foundStudentId: null, foundEmail: "" },
  studentTab: "courses",
  adminTab: "overview",
  activeTopicId: 1,
  activeTopicSubTab: "theory",
  activeLabId: 1,
  strictGating: true,
  finalPassThreshold: 80,
  adminCredentials: { email: "admin@tuit.uz", password: "admin123" },
  students: createDefaultStudents(),
  modules: JSON.parse(JSON.stringify(COURSE_MODULES)),
  labs: JSON.parse(JSON.stringify(LAB_MODULES)),
  quizAnswers: {},
  lastQuizResult: null,
  finalAnswers: {},
  lastFinalResult: null,
  practicalSelection: {},
  labTerminalHistory: {},
  labVerified: {},
  videoPlayer: { playing: false, stepIndex: 0, timerId: null, mode: 'youtube', embedActive: false }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.students) state.students = parsed.students;
      if (typeof parsed.strictGating === "boolean") state.strictGating = parsed.strictGating;
      if (parsed.finalPassThreshold) state.finalPassThreshold = parsed.finalPassThreshold;
      if (parsed.modules) {
        state.modules = parsed.modules.map(pm => {
          const def = COURSE_MODULES.find(cm => cm.id === pm.id);
          return def ? { ...def, ...pm, theoryVideoUrl: pm.theoryVideoUrl || def.theoryVideoUrl } : pm;
        });
      }
      if (parsed.labs) {
        state.labs = parsed.labs.map(pl => {
          const def = LAB_MODULES.find(lm => lm.id === pl.id);
          return def ? { ...def, ...pl, videoUrl: pl.videoUrl || def.videoUrl } : pl;
        });
      }
      if (parsed.adminCredentials) state.adminCredentials = parsed.adminCredentials;
    }
  } catch (e) {}
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      students: state.students,
      strictGating: state.strictGating,
      finalPassThreshold: state.finalPassThreshold,
      modules: state.modules,
      labs: state.labs,
      adminCredentials: state.adminCredentials
    }));
  } catch (e) {}
}

loadState();

function getCurrentStudent() {
  if (!state.currentUser || state.currentUser.role !== "student") return null;
  return state.students.find(s => s.id === state.currentUser.studentId) || null;
}
