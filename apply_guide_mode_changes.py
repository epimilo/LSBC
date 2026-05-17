from pathlib import Path

index_path = Path('index.html')
script_path = Path('script.js')
css_path = Path('styles.css')

index = index_path.read_text(encoding='utf-8')
script = script_path.read_text(encoding='utf-8')
css = css_path.read_text(encoding='utf-8')

old_intro_button = '''        <button type="button" class="intro-splash__enter" id="introEnterBtn">
          <span class="intro-splash__enter-text">Bước vào phòng</span>
          <span class="intro-splash__enter-arrow" aria-hidden="true">→</span>
        </button>'''
new_intro_buttons = '''        <div class="intro-splash__choices" aria-label="Chọn chế độ tham quan">
          <button type="button" class="intro-splash__enter intro-splash__enter--guide" id="guideTourBtn">
            <span class="intro-splash__enter-text">Trải nghiệm tham quan tự động kèm thuyết minh</span>
            <span class="intro-splash__enter-arrow" aria-hidden="true">→</span>
          </button>
          <button type="button" class="intro-splash__enter intro-splash__enter--free" id="introEnterBtn">
            <span class="intro-splash__enter-text">Tham quan tự do</span>
            <span class="intro-splash__enter-arrow" aria-hidden="true">→</span>
          </button>
        </div>'''
if old_intro_button not in index:
    raise SystemExit('Intro button block not found')
index = index.replace(old_intro_button, new_intro_buttons)

old_audio = '''    <audio id="ambientAudio" src="./ambient-music.mp3" loop preload="auto"></audio>'''
new_audio = '''    <audio id="ambientAudio" src="./ambient-music.mp3" loop preload="auto"></audio>
    <audio id="guideNarrationAudio" preload="auto"></audio>'''
if old_audio not in index:
    raise SystemExit('Ambient audio block not found')
index = index.replace(old_audio, new_audio)

old_refs = '''const introSplash     = document.getElementById("introSplash");
const introEnterBtn   = document.getElementById("introEnterBtn");
const cursorRing      = document.getElementById("cursorRing");'''
new_refs = '''const introSplash     = document.getElementById("introSplash");
const introEnterBtn   = document.getElementById("introEnterBtn");
const guideTourBtn    = document.getElementById("guideTourBtn");
const guideNarrationAudio = document.getElementById("guideNarrationAudio");
const mainCamera      = document.getElementById("mainCamera");
const cursorRing      = document.getElementById("cursorRing");'''
if old_refs not in script:
    raise SystemExit('DOM refs block not found')
script = script.replace(old_refs, new_refs)

old_entered = '''let hasEnteredRoom = false;'''
new_entered = '''let hasEnteredRoom = false;
let guideModeActive = false;
let guideTourRunning = false;
let guideTourStarted = false;'''
if old_entered not in script:
    raise SystemExit('hasEnteredRoom not found')
script = script.replace(old_entered, new_entered)

old_keyboard_block = '''  if (isNewspaperOpen()) return true;'''
new_keyboard_block = '''  if (guideModeActive) return true;
  if (isNewspaperOpen()) return true;'''
if old_keyboard_block not in script:
    raise SystemExit('keyboard block insertion point not found')
script = script.replace(old_keyboard_block, new_keyboard_block, 1)

old_audio_state = '''const audioState = { audioElement: null, enabled: true, started: false };'''
new_audio_state = '''const audioState = { audioElement: null, enabled: true, started: false };
const GUIDE_START = { x: 0, z: 8.48 };
const GUIDE_DEFAULT_DWELL_MS = 8500;
const GUIDE_MOVE_SPEED_UNITS_PER_SEC = 2.45;
const GUIDE_MIN_MOVE_MS = 1800;
const GUIDE_MAX_MOVE_MS = 4600;
const GUIDE_TOUR_STOPS = [
  { key: "intro", label: "Vị trí bắt đầu", x: 0, z: 8.48, lookAt: { x: 0, y: 1.85, z: 0 }, audio: "./audio/guide-01.mp3", fallbackMs: 14000, open: null },
  { key: "newspaper", label: "Báo Việt Nam News", x: 0, z: 2.35, lookAt: { x: 0, y: 2.25, z: 3.35 }, audio: "./audio/guide-02.mp3", fallbackMs: 10000, open: "artifact" },
  { key: "timeline", label: "Dòng thời gian đại dịch COVID tại Việt Nam", x: -4.95, z: 2.05, lookAt: { x: -6.83, y: 1.8, z: 3.02 }, audio: "./audio/guide-03.mp3", fallbackMs: 10000, open: "artifact" },
  { key: "typewriter", label: "Sạp báo bị phong toả", x: 4.0, z: -2.8, lookAt: { x: 5.8, y: 1.8, z: -5.2 }, audio: "./audio/guide-04.mp3", fallbackMs: 10000, open: "artifact" },
  { key: "hazmat-exhibit", label: "Mô hình đồ bảo hộ cá nhân phòng chống COVID-19", x: -6.05, z: -6.55, lookAt: { x: -6.05, y: 1.65, z: -7.05 }, audio: "./audio/guide-05.mp3", fallbackMs: 10000, open: "artifact" },
  { key: "painting-cluster", label: "Tranh treo tường", x: 5.95, z: -1.55, lookAt: { x: 8.78, y: 2.1, z: -1.45 }, audio: "./audio/guide-06.mp3", fallbackMs: 10000, open: "artifact" },
  { key: "meeting-setup", label: "Cuộc họp giao ban online", x: 0, z: -3.85, lookAt: { x: 0, y: 2.45, z: -8.76 }, audio: "./audio/guide-07.mp3", fallbackMs: 10000, open: "artifact" },
  { key: "cityscape", label: "Quy hoạch hệ thống báo chí", x: 3.5, z: 2.35, lookAt: { x: 3.5, y: 2.1, z: 3.48 }, audio: "./audio/guide-08.mp3", fallbackMs: 10000, open: "artifact" },
  { key: "outro", label: "Trở về điểm bắt đầu", x: 0, z: 8.48, lookAt: { x: 0, y: 1.85, z: 0 }, audio: "./audio/guide-09.mp3", fallbackMs: 14000, open: null }
];'''
if old_audio_state not in script:
    raise SystemExit('audioState insertion point not found')
script = script.replace(old_audio_state, new_audio_state)

old_dismiss = '''function dismissSplash() {
  if (!introSplash) return;
  introSplash.classList.add("is-exiting");
  setTimeout(() => {
    introSplash.style.display = "none";
    introSplash.removeAttribute("aria-modal");
    // Start showing intro toggle after 5s
    setTimeout(() => {
      if (introToggle) {
        introToggle.hidden = false;
        updateIntroToggle();
      }
    }, 5000);
  }, 680);
}'''
new_dismiss = '''function dismissSplash(options = {}) {
  if (!introSplash) return;
  const { showIntroToggle = true } = options;
  introSplash.classList.add("is-exiting");
  setTimeout(() => {
    introSplash.style.display = "none";
    introSplash.removeAttribute("aria-modal");
    if (!showIntroToggle) return;
    // Start showing intro toggle after 5s
    setTimeout(() => {
      if (introToggle && !guideModeActive) {
        introToggle.hidden = false;
        updateIntroToggle();
      }
    }, 5000);
  }, 680);
}'''
if old_dismiss not in script:
    raise SystemExit('dismissSplash block not found')
script = script.replace(old_dismiss, new_dismiss)

old_camera_section = '''function animateCameraTo(x, z) {
  if (!cameraRig) return;
  cameraRig.setAttribute("animation__move", `property: position; to: ${x} 1.6 ${z}; dur: 430; easing: easeInOutQuad`);
}

function focusArtifact(key) {'''
new_camera_section = '''function animateCameraTo(x, z) {
  if (!cameraRig) return;
  cameraRig.setAttribute("animation__move", `property: position; to: ${x} 1.6 ${z}; dur: 430; easing: easeInOutQuad`);
}

function getGuideMoveDuration(fromX, fromZ, toX, toZ) {
  const distance = Math.hypot(toX - fromX, toZ - fromZ);
  const raw = distance / GUIDE_MOVE_SPEED_UNITS_PER_SEC * 1000;
  return Math.max(GUIDE_MIN_MOVE_MS, Math.min(GUIDE_MAX_MOVE_MS, Math.round(raw)));
}

function waitMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForAFrameAnimation(el, name, fallbackMs) {
  return new Promise(resolve => {
    if (!el) { resolve(); return; }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.removeEventListener("animationcomplete__" + name, finish);
      resolve();
    };
    el.addEventListener("animationcomplete__" + name, finish);
    setTimeout(finish, Math.max(120, fallbackMs + 180));
  });
}

function computeCameraRotationFromLookAt(from, target) {
  const dx = target.x - from.x;
  const dy = (target.y || 1.65) - from.y;
  const dz = target.z - from.z;
  const horizontal = Math.max(0.0001, Math.hypot(dx, dz));
  const yaw = AFRAME && AFRAME.THREE ? AFRAME.THREE.MathUtils.radToDeg(Math.atan2(-dx, -dz)) : 0;
  const pitch = AFRAME && AFRAME.THREE ? AFRAME.THREE.MathUtils.radToDeg(Math.atan2(dy, horizontal)) : 0;
  return { x: Math.max(-35, Math.min(18, pitch)), y: yaw, z: 0 };
}

function animateGuideCameraLookAt(stop, dur = 1200) {
  if (!mainCamera || !cameraRig || !stop || !stop.lookAt) return Promise.resolve();
  const from = {
    x: cameraRig.object3D.position.x,
    y: cameraRig.object3D.position.y,
    z: cameraRig.object3D.position.z
  };
  const rot = computeCameraRotationFromLookAt(from, stop.lookAt);
  mainCamera.setAttribute("animation__guide_look", `property: rotation; to: ${rot.x} ${rot.y} ${rot.z}; dur: ${dur}; easing: easeInOutQuad`);
  return waitForAFrameAnimation(mainCamera, "guide_look", dur);
}

function animateGuideCameraTo(stop) {
  if (!cameraRig || !stop) return Promise.resolve();
  const current = cameraRig.object3D.position;
  const dur = getGuideMoveDuration(current.x, current.z, stop.x, stop.z);
  cameraRig.setAttribute("animation__guide_move", `property: position; to: ${stop.x} 1.6 ${stop.z}; dur: ${dur}; easing: easeInOutSine`);
  void animateGuideCameraLookAt(stop, Math.min(dur, 1800));
  return waitForAFrameAnimation(cameraRig, "guide_move", dur);
}

function focusArtifact(key) {'''
if old_camera_section not in script:
    raise SystemExit('camera section insertion point not found')
script = script.replace(old_camera_section, new_camera_section)

old_teleport = '''function teleportToPoint(point) {
  if (isNewspaperOpen() || !point || !cameraRig || !AFRAME.THREE) return;'''
new_teleport = '''function teleportToPoint(point) {
  if (guideModeActive || isNewspaperOpen() || !point || !cameraRig || !AFRAME.THREE) return;'''
if old_teleport not in script:
    raise SystemExit('teleport guard not found')
script = script.replace(old_teleport, new_teleport)

insert_before_action = '''/* ════════════════════════════════════════
   ACTION HANDLER
════════════════════════════════════════ */'''
guide_code = '''/* ════════════════════════════════════════
   GUIDE TOUR MODE
════════════════════════════════════════ */
function setGuideMode(active) {
  guideModeActive = active;
  document.body.classList.toggle("is-guide-mode", active);
  hideTooltip();
  if (helpPanel) helpPanel.hidden = true;
  closeArtifact();
  if (newspaperView && !newspaperView.classList.contains("overlay--hidden")) closeNewspaper();
  if (introToggle) introToggle.hidden = active;
  if (cameraRig) cameraRig.setAttribute("keyboard-walk", `speed: ${active ? 0 : 4.65}`);
  if (mainCursor) mainCursor.setAttribute("raycaster", active ? "objects: .guide-disabled" : "objects: .clickable, .teleportable");
  if (mainCamera) mainCamera.setAttribute("look-controls", `touchEnabled: ${active ? "false" : "true"}; mouseEnabled: ${active ? "false" : "true"}; magicWindowTrackingEnabled: ${(!active && hasEnteredRoom) ? "true" : "false"}`);
}

function prepareRoomEntry({ guide = false } = {}) {
  hasEnteredRoom = true;
  document.body.classList.remove("is-rotate-lock");
  if (rotatePrompt) rotatePrompt.hidden = true;
  if (isMobileDevice) showGyroPrompt();
  dismissSplash({ showIntroToggle: !guide });
  if (isMobileDevice && !needsIOSGyroPermission() && !guide) setGyroEnabled(true);
}

function updateGuideStatus(stopIndex, stop) {
  let el = document.getElementById("guideStatus");
  if (!el) {
    el = document.createElement("div");
    el.id = "guideStatus";
    el.className = "guide-status glass";
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  const total = GUIDE_TOUR_STOPS.length;
  el.innerHTML = `<p class="eyebrow">Tour tự động</p><strong>${stop.label}</strong><span>Điểm ${stopIndex + 1} / ${total}</span>`;
  el.hidden = false;
}

function hideGuideStatus() {
  const el = document.getElementById("guideStatus");
  if (el) el.hidden = true;
}

function playGuideNarration(stop) {
  return new Promise(resolve => {
    const fallbackMs = stop.fallbackMs || GUIDE_DEFAULT_DWELL_MS;
    if (!guideNarrationAudio || !stop.audio) {
      setTimeout(resolve, fallbackMs);
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      guideNarrationAudio.removeEventListener("ended", finish);
      guideNarrationAudio.removeEventListener("error", onError);
      clearTimeout(fallbackTimer);
      resolve();
    };
    const onError = () => {
      setTimeout(finish, fallbackMs);
    };
    const fallbackTimer = setTimeout(finish, fallbackMs + 1800);
    guideNarrationAudio.pause();
    guideNarrationAudio.currentTime = 0;
    guideNarrationAudio.src = stop.audio;
    guideNarrationAudio.volume = 0.95;
    guideNarrationAudio.addEventListener("ended", finish, { once: true });
    guideNarrationAudio.addEventListener("error", onError, { once: true });
    guideNarrationAudio.play().catch(() => {
      setTimeout(finish, fallbackMs);
    });
  });
}

function showGuideCompletionNotice() {
  return new Promise(resolve => {
    const notice = document.createElement("div");
    notice.className = "guide-complete";
    notice.setAttribute("role", "dialog");
    notice.setAttribute("aria-modal", "true");
    notice.innerHTML = `
      <div class="guide-complete__card glass">
        <p class="eyebrow">Hoàn tất tour dẫn đường</p>
        <h2>Bạn có thể tự do tham quan</h2>
        <p>Chế độ dẫn đường đã kết thúc. Bây giờ bạn có thể tự xoay nhìn, di chuyển và mở từng hiện vật như chế độ tham quan bình thường.</p>
        <button type="button" class="button" id="guideCompleteBtn">Bắt đầu tham quan tự do</button>
      </div>`;
    document.body.appendChild(notice);
    const close = () => {
      notice.remove();
      resolve();
    };
    const btn = notice.querySelector("#guideCompleteBtn");
    if (btn) btn.addEventListener("click", close, { once: true });
    setTimeout(close, 7000);
  });
}

function openGuideStopPanel(stop) {
  if (!stop || !stop.open) {
    closeArtifact();
    return;
  }
  if (stop.key === "newspaper") {
    renderArtifact("newspaper");
    return;
  }
  renderArtifact(stop.key);
}

async function runGuideTour() {
  if (guideTourRunning) return;
  guideTourRunning = true;
  guideTourStarted = true;
  setGuideMode(true);
  if (audioState.audioElement) audioState.audioElement.pause();
  if (cameraRig) cameraRig.object3D.position.set(GUIDE_START.x, 1.6, GUIDE_START.z);
  await waitMs(250);
  for (let i = 0; i < GUIDE_TOUR_STOPS.length; i++) {
    if (!guideTourRunning) break;
    const stop = GUIDE_TOUR_STOPS[i];
    updateGuideStatus(i, stop);
    await animateGuideCameraTo(stop);
    await animateGuideCameraLookAt(stop, 900);
    openGuideStopPanel(stop);
    await playGuideNarration(stop);
    closeArtifact();
    await waitMs(450);
  }
  if (guideNarrationAudio) guideNarrationAudio.pause();
  hideGuideStatus();
  setGuideMode(false);
  guideTourRunning = false;
  if (introToggle) {
    introToggle.hidden = false;
    updateIntroToggle();
  }
  if (audioState.enabled) ensureAmbientAudioStarted();
  await showGuideCompletionNotice();
}

async function startGuideExperience() {
  prepareRoomEntry({ guide: true });
  if (isMobileDevice) await enterFullscreenOnMobile();
  setTimeout(runGuideTour, 780);
}

async function startFreeExperience() {
  prepareRoomEntry({ guide: false });
  if (isMobileDevice) await enterFullscreenOnMobile();
}

'''
if insert_before_action not in script:
    raise SystemExit('action handler marker not found')
script = script.replace(insert_before_action, guide_code + insert_before_action)

old_intro_listener = '''  // Intro splash dismiss
  if (introEnterBtn) {
    introEnterBtn.addEventListener("click", async () => {
      hasEnteredRoom = true;
      document.body.classList.remove("is-rotate-lock");
      if (rotatePrompt) rotatePrompt.hidden = true;
      if (isMobileDevice) showGyroPrompt();
      if (isMobileDevice) await enterFullscreenOnMobile();
      dismissSplash();
      if (isMobileDevice && !needsIOSGyroPermission()) setGyroEnabled(true);
    });
  }'''
new_intro_listener = '''  // Intro splash mode selection
  if (introEnterBtn) {
    introEnterBtn.addEventListener("click", startFreeExperience);
  }
  if (guideTourBtn) {
    guideTourBtn.addEventListener("click", startGuideExperience);
  }'''
if old_intro_listener not in script:
    raise SystemExit('intro listener block not found')
script = script.replace(old_intro_listener, new_intro_listener)

old_click_handler = '''    node.addEventListener("click", () => {
      if (!key) return;'''
new_click_handler = '''    node.addEventListener("click", () => {
      if (guideModeActive) return;
      if (!key) return;'''
if old_click_handler not in script:
    raise SystemExit('click handler block not found')
script = script.replace(old_click_handler, new_click_handler)

old_tele_click = '''    node.addEventListener("click", (event) => {
      const targetPoint = getTeleportIntersection(node, event);'''
new_tele_click = '''    node.addEventListener("click", (event) => {
      if (guideModeActive) return;
      const targetPoint = getTeleportIntersection(node, event);'''
if old_tele_click not in script:
    raise SystemExit('teleport click block not found')
script = script.replace(old_tele_click, new_tele_click)

old_journey = '''    journeySelect.addEventListener("change", () => {
      const key = journeySelect.value;'''
new_journey = '''    journeySelect.addEventListener("change", () => {
      if (guideModeActive) return;
      const key = journeySelect.value;'''
if old_journey not in script:
    raise SystemExit('journey block not found')
script = script.replace(old_journey, new_journey)

old_splash_key = '''  // Also close splash on Escape / Space
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Escape" || e.key === " " || e.key === "Enter") && introSplash && !introSplash.classList.contains("is-exiting") && introSplash.style.display !== "none") {
      dismissSplash();
    }
  });'''
new_splash_key = '''  // Also enter free-tour mode from splash on Escape / Space / Enter
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Escape" || e.key === " " || e.key === "Enter") && introSplash && !introSplash.classList.contains("is-exiting") && introSplash.style.display !== "none") {
      startFreeExperience();
    }
  });'''
if old_splash_key not in script:
    raise SystemExit('splash key block not found')
script = script.replace(old_splash_key, new_splash_key)

css_add = r'''

/* ─────────────────────────────────────────
   GUIDE TOUR MODE
───────────────────────────────────────── */
.intro-splash__choices {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  animation: splash-content-in 1s .5s both;
}

.intro-splash__choices .intro-splash__enter {
  animation: none;
  max-width: min(100%, 430px);
  justify-content: center;
}

.intro-splash__enter--guide {
  background: rgba(215,156,77,.16);
  border-color: rgba(244,215,163,.72);
}

.intro-splash__enter--free {
  background: rgba(255,255,255,.045);
  border-color: rgba(255,255,255,.24);
}

body.is-guide-mode .top-bar,
body.is-guide-mode .intro-shell,
body.is-guide-mode .intro-shell__toggle,
body.is-guide-mode .help-panel,
body.is-guide-mode .artifact-tooltip,
body.is-guide-mode .cursor-ring {
  display: none !important;
}

.guide-status {
  position: fixed;
  left: 24px;
  bottom: 24px;
  z-index: 18;
  width: min(420px, calc(100vw - 48px));
  padding: 16px 18px;
  border-radius: 10px;
  pointer-events: none;
}

.guide-status strong,
.guide-status span {
  display: block;
}

.guide-status strong {
  color: var(--text);
  font-size: 1rem;
  line-height: 1.35;
}

.guide-status span {
  margin-top: 6px;
  color: var(--muted);
  font-size: 0.84rem;
}

.guide-complete {
  position: fixed;
  inset: 0;
  z-index: 130;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(0,0,0,.48);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.guide-complete__card {
  width: min(520px, calc(100vw - 32px));
  border-radius: 14px;
  padding: 28px;
  text-align: center;
}

.guide-complete__card h2 {
  margin: 0;
  font-family: var(--font-splash-title);
  font-size: clamp(2rem, 6vw, 3.4rem);
  line-height: 1;
}

.guide-complete__card p:not(.eyebrow) {
  color: var(--muted);
  line-height: 1.65;
  margin: 16px 0 22px;
}

@media (max-width: 720px) {
  .intro-splash__choices {
    flex-direction: column;
    gap: 12px;
  }

  .intro-splash__choices .intro-splash__enter {
    width: 100%;
    min-height: 52px;
    padding-inline: 22px;
  }

  .guide-status {
    left: 16px;
    right: 16px;
    bottom: 16px;
    width: auto;
  }
}
'''
if 'GUIDE TOUR MODE' not in css:
    css += css_add

index_path.write_text(index, encoding='utf-8')
script_path.write_text(script, encoding='utf-8')
css_path.write_text(css, encoding='utf-8')
print('Guide mode changes applied.')
