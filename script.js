/* ════════════════════════════════════════════════════
   VR Story Room — script.js (upgraded)
   - Intro splash with exit animation
   - Canvas textures for all 4 display surfaces
   - Hover glow + tooltip on all clickables
   - Visible cursor ring tracking mouse
   - Full-height artifact panel (slides from right)
   - Progress counter "X / 9 đã khám phá"
   - Full Vietnamese text (có dấu)
════════════════════════════════════════════════════ */

/* ── Artifact content (tiếng Việt đầy đủ) ── */
const artifactContent = {

  typewriter: {
    tag: "Văn bản",
    title: "Sạp báo bị phong toả",
    subtitle: "Nơi kể về bản thảo, tiêu đề, và quá trình đưa một ý thành một bản tin.",
    body: [
      "Trong giai đoạn dịch COVID-19 bùng phát mạnh tại Việt Nam, việc áp dụng Chỉ thị 16 với các biện pháp giãn cách nghiêm ngặt đã khiến hoạt động vận chuyển và phát hành báo in bị đình trệ nghiêm trọng. Nhiều số báo không thể đến tay bạn đọc, dẫn đến tồn đọng trong suốt thời gian giãn cách. Sự gián đoạn này không chỉ ảnh hưởng đến các tòa soạn mà còn khiến nhiều tiểu thương kinh doanh báo giấy rơi vào khó khăn, buộc không ít sạp báo phải đóng cửa và không thể hoạt động trở lại sau đại dịch."
    ]
  },
  timeline: {
    tag: "Cột mốc",
    title: "Dòng thời gian đại dịch COVID tại Việt Nam",
    subtitle: "Biểu đồ thời gian ghi lại những biến động và tinh thần kiên cường trong đại dịch.",
    body: [
      "Dòng thời gian của Đại dịch COVID-19 ở Việt Nam được tái hiện qua những mốc thời gian cụ thể. Biểu đồ thời gian này không chỉ ghi lại những biến động, thách thức chưa từng có của xã hội và ngành báo chí, mà còn ghi lại những cột mốc vô giá về tinh thần kiên cường, nỗ lực thích ứng của con người trong đại dịch."
    ]
  },
  archive: {
    tag: "Lưu vật",
    title: "Hộp lưu trữ và ba cuộn film",
    subtitle: "Nơi giữ những thứ còn sót lại sau khi một định dạng mất đi.",
    body: [
      "Hộp lưu trữ hợp với các vật chứng vật chất: thẻ nhà báo, phong bì ảnh, ghi chú tay, hay những món đồ không đi cùng lên bản số.",
      "Nó tạo cảm giác rằng quá trình chuyển đổi không chỉ mất một kênh phát hành, mà mất cả thao tác, mùi, chất liệu, và nhịp lao động."
    ]
  },
  "painting-dawn": {
    tag: "Tranh treo tường",
    title: "Sẵn sàng",
    subtitle: "Nguồn: Báo Tuổi Trẻ",
    body: [
      "Nhà báo có mặt tại tâm dịch, sẵn sàng tiến vào khu vực cách ly đặc biệt, nơi những bệnh nhân COVID-19 đang điều trị, nhằm cung cấp thông tin, hình ảnh thực tế về tình hình dịch bệnh cho độc giả."
    ],
    image: "./painting-1-san-sang-framed.jpg"
  },
  "painting-ember": {
    tag: "Tranh treo tường",
    title: "Dấn thân",
    subtitle: "Nguồn: Duy Hiệu (Phóng viên ảnh, tạp chí tri thức Znews)",
    body: [
      "Khoác lên mình những bộ đồ bảo hộ kín mít, các phóng viên, nhà báo không ngại nguy cơ lây nhiễm để có mặt tại các điểm nóng của đại dịch, họ dấn thân, dùng con chữ để giữ vững 'mặt trận' thông tin giữa thời điểm khủng hoảng."
    ],
    image: "./painting-2-dan-than-framed.jpg"
  },
  "painting-night": {
    tag: "Tranh treo tường",
    title: "Kết nối",
    subtitle: "Nguồn: Báo Kinh tế - Đô thị",
    body: [
      "Cách thức phỏng vấn trong đại dịch cũng thay đổi đáng kể. Phóng viên phải giữ khoảng cách, mặc đồ bảo hộ và đối mặt với nguy cơ lây nhiễm cao. Dù vậy, họ vẫn đóng vai trò kết nối công chúng với những người ở tuyến đầu chống dịch, mang đến nguồn thông tin trực tiếp, đáng tin cậy và kịp thời."
    ],
    image: "./painting-3-ket-noi-framed.jpg"
  },
  "painting-echo": {
    tag: "Tranh treo tường",
    title: "Lăn xả",
    subtitle: "Nguồn: Báo Tin tức Thông tấn Xã Việt Nam",
    body: [
      "Để đảm bảo thông tin đến với bạn đọc nhanh nhất, các phóng viên phải tranh thủ viết tin và gửi bài về tòa soạn ngay tại hiện trường. Trong điều kiện thiếu thốn, họ tận dụng không gian, dùng ghế làm bàn để soạn bản thảo, từ đó duy trì tốc độ và nhịp đưa tin giữa đại dịch."
    ],
    image: "./painting-4-lan-xa-framed.jpg"
  },
  "painting-gold": {
    tag: "Tranh treo tường",
    title: "Thích nghi",
    subtitle: "Nguồn: Báo Tin tức Thông tấn Xã Việt Nam",
    body: [
      "Không chỉ trong hoạt động tác nghiệp ở hiện trường, các tòa soạn cũng cần chuẩn bị phương pháp ứng phó như 'tòa soạn dã chiến' trong trường hợp không thể đến tòa soạn làm việc. Đây là hình ảnh nhà riêng của một nhân viên báo Pháp luật TP Hồ Chí Minh được tận dụng làm 'tòa soạn dã chiến' trong thời gian tòa soạn chính phải phong tỏa do có nhân viên bị nhiễm COVID-19."
    ],
    image: "./painting-5-thich-nghi-framed.jpg"
  },
  newspaper: {
    tag: "Trang báo",
    title: "Việt Nam News số 30/03/2020",
    subtitle: "Vật phẩm gần lối vào phòng, bấm vào để mở file báo HTML thật của bạn.",
    body: [
      "Khác với bản mock trước, hotspot này mở trực tiếp file to-bao-cuoi-cung.html được nhúng vào overlay toàn màn hình.",
      "Nghĩa là khi bạn sửa file báo gốc, phần triển lãm này tự động lấy đúng phiên bản mới nhất mà không cần viết lại giao diện."
    ]
  },
  cityscape: {
    tag: "Mô hình",
    title: "Quy hoạch hệ thống báo chí",
    subtitle: "Mô hình low-poly thể hiện cơ cấu tổ chức và quy hoạch hệ thống báo chí Việt Nam.",
    body: [
      "Tại Hội nghị báo chí toàn quốc tổng kết công tác năm 2020, triển khai nhiệm vụ năm 2021 ngày 31/12/2020, Phó trưởng Ban Tuyên giáo trung ương Lê Mạnh Hùng tổng kết: Sự cạnh tranh mạnh mẽ của truyền thông xã hội, cùng những khó khăn của kinh tế do ảnh hưởng của đại dịch COVID-19 đã khiến doanh thu của nhiều cơ quan báo chí giảm mạnh, nhất là đối với khối báo in. Do đó, cần triển khai quy hoạch hệ thống báo chí để giải quyết vấn đề kinh tế đồng thời nâng cao chất lượng nội dung phục vụ độc giả.",
      "Thực hiện quy hoạch báo chí, trong năm 2020, cả nước giảm 71 cơ quan báo chí so với năm 2019. Tính đến thời điểm này, cả nước còn 779 cơ quan báo chí, trong đó có 72 cơ quan có giấy phép hoạt động phát thanh, truyền hình, 142 báo, 612 tạp chí, 25 cơ quan báo chí điện tử độc lập."
    ]
  },
  "hazmat-exhibit": {
    tag: "Trưng bày",
    title: "Trang phục bảo hộ",
    subtitle: "Tiểu cảnh tượng trưng cho nhân viên tuyến đầu hoặc ký ức thời dịch.",
    body: [
      "Khi tác nghiệp trong giai đoạn cao điểm dịch, phóng viên phải tuân thủ nghiêm ngặt các quy định về phòng chống dịch. Đặc biệt, với phóng viên tác nghiệp tại các khu vực như bệnh viện, sân bay, khu cách ly,... đồ bảo hộ là trang bị không thể thiếu."
    ]
  },
  "meeting-setup": {
    tag: "Trưng bày",
    title: "Cuộc họp giao ban trực tuyến",
    subtitle: "Bàn làm việc đối diện màn hình — gợi nhớ không khí họp báo, họp biên tập từ xa.",
    body: [
      "Mô hình tái hiện cuộc họp giao ban trực tuyến của các tòa soạn trong thời kỳ COVID-19. Trong thời điểm giãn cách xã hội, các tòa soạn buộc phải chuyển đổi các cuộc họp giao ban sang hình thức trực tuyến. Sự thay đổi này đã giúp các tòa soạn thích nghi với tình hình dịch bệnh chuyển biến phức tạp, nhờ đó không gián đoạn hoạt động đưa tin tức đến công chúng."
    ]
  }
};

const focusPoints = {
  timeline:        { x: -4.95, z: 2.05 },
  archive:         { x:  4.95, z: 2.05 },
  typewriter:      { x:  4.0,  z: -2.8 },
  "painting-dawn": { x:  2.5,  z: -1.32 },
  "painting-ember":{ x:  2.5,  z: -1.32 },
  "painting-night":{ x:  2.5,  z: -1.32 },
  "painting-echo": { x:  2.5,  z: -1.32 },
  "painting-gold": { x:  2.5,  z: -1.32 },
  "painting-cluster": { x: 2.5, z: -1.32 },
  newspaper:       { x:  0,    z:  2.35 },
  cityscape:       { x:  3.5,  z:  2.35 },
  "hazmat-exhibit":{ x: -6.05, z: -6.55 },
  "meeting-setup": { x:  0,    z: -3.85 }
};

const TELEPORT_OFFSETS = { floor: 1.2, wall: 2.55, pedestal: 1.95 };
const MAX_TELEPORT_STEP = 2.75;
const ROOM_LIMITS = { x: 7.5, z: 8.55 };
const TOTAL_ARTIFACTS = 11;
/** Bán kính “thân” người xem trên mặt phẳng XZ — dùng cho va chạm bàn phím */
const PLAYER_RADIUS_XZ = 0.42;
/** Hộp va chạm tĩnh (tọa độ thế giới, trục XZ) — bàn, bục, tường sau, v.v. */
const WALK_COLLIDERS = [
  { minX: -7.25, maxX: -4.85, minZ: -7.95, maxZ: -6.15 },
  { minX: -2.05, maxX: 2.05, minZ: -6.35, maxZ: -4.45 },
  { minX: -1.05, maxX: 1.05, minZ: 2.5, maxZ: 4.55 },
  { minX: 2.58, maxX: 4.42, minZ: 2.72, maxZ: 4.24 },
  { minX: 4.55, maxX: 7.05, minZ: -6.15, maxZ: -4.25 },
  { minX: -7.6, maxX: -6.05, minZ: 2.25, maxZ: 3.62 },
  { minX: -8.6, maxX: 8.6, minZ: -8.85, maxZ: -7.55 }
];
const MOBILE_MAX_PIXEL_RATIO = 1.25;
const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
const isMobileDevice = /Android|iPhone|iPad|iPod|Mobile|Windows Phone|BlackBerry|Opera Mini/i.test(navigator.userAgent) || isTouchDevice;
const hasDeviceOrientationAPI = typeof window.DeviceOrientationEvent !== "undefined";

/* ── DOM refs ── */
const artifactPanel   = document.getElementById("artifactPanel");
const artifactTag     = document.getElementById("artifactTag");
const artifactTitle   = document.getElementById("artifactTitle");
const artifactSubtitle= document.getElementById("artifactSubtitle");
const artifactBody    = document.getElementById("artifactBody");
const appShell        = document.getElementById("appShell");
const helpPanel       = document.getElementById("helpPanel");
const introShell      = document.getElementById("introShell");
const introToggle     = document.getElementById("introToggle");
const introToggleMark = document.getElementById("introToggleMark");
const journeySelect   = document.getElementById("journeySelect");
const newspaperView   = document.getElementById("newspaperView");
const newspaperFrame  = document.getElementById("newspaperFrame");
const sceneWrap       = document.getElementById("sceneWrap");
const cameraRig       = document.getElementById("cameraRig");
const mainCursor      = document.getElementById("mainCursor");
const audioButton     = document.getElementById("audioButton");
const sceneEl         = document.querySelector("a-scene");
const introSplash     = document.getElementById("introSplash");
const introEnterBtn   = document.getElementById("introEnterBtn");
const guideTourBtn    = document.getElementById("guideTourBtn");
const returnHomeBtn   = document.getElementById("returnHomeBtn");
const guideNarrationAudio = document.getElementById("guideNarrationAudio");
const mainCamera      = document.getElementById("mainCamera");
const cursorRing      = document.getElementById("cursorRing");
const artifactTooltip = document.getElementById("artifactTooltip");
const progressCount   = document.getElementById("progressCount");
const progressFill    = document.getElementById("progressFill");
const gyroPrompt      = document.getElementById("gyroPrompt");
const gyroEnableBtn   = document.getElementById("gyroEnableBtn");
const rotatePrompt    = document.getElementById("rotatePrompt");
const topBar          = document.querySelector(".top-bar");
const topBarToggle    = document.getElementById("topBarToggle");
const topBarToggleMark= document.getElementById("topBarToggleMark");
let hasEnteredRoom = false;
let guideModeActive = false;
let guideTourRunning = false;
let guideTourStarted = false;

function isKeyboardWalkBlocked() {
  if (introSplash) {
    const dismissed = introSplash.style.display === "none" || introSplash.classList.contains("is-exiting");
    if (!dismissed) return true;
  }
  if (guideModeActive) return true;
  if (isNewspaperOpen()) return true;
  const ae = document.activeElement;
  if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.tagName === "SELECT" || ae.isContentEditable)) return true;
  return false;
}

function collidesPlayerXZ(x, z, r) {
  for (let i = 0; i < WALK_COLLIDERS.length; i++) {
    const b = WALK_COLLIDERS[i];
    if (x >= b.minX - r && x <= b.maxX + r && z >= b.minZ - r && z <= b.maxZ + r) return true;
  }
  return false;
}

function resolveKeyboardWalkXZ(ox, oz, nx, nz, r) {
  if (!collidesPlayerXZ(nx, nz, r)) return { x: nx, z: nz };
  if (!collidesPlayerXZ(ox, nz, r)) return { x: ox, z: nz };
  if (!collidesPlayerXZ(nx, oz, r)) return { x: nx, z: oz };
  return { x: ox, z: oz };
}

/** Dịch chuyển click / hành trình: bước dọc đoạn tới đích, dừng trước hộp va chạm */
function clampWalkToward(ox, oz, tx, tz, r) {
  const dx = tx - ox;
  const dz = tz - oz;
  const dist = Math.hypot(dx, dz);
  if (dist < 1e-5) return resolveKeyboardWalkXZ(ox, oz, ox, oz, r);
  const ux = dx / dist;
  const uz = dz / dist;
  const stepLen = 0.1;
  const steps = Math.max(1, Math.ceil(dist / stepLen));
  let bx = ox;
  let bz = oz;
  for (let i = 1; i <= steps; i++) {
    const t = (i / steps) * dist;
    const px = ox + ux * t;
    const pz = oz + uz * t;
    if (collidesPlayerXZ(px, pz, r)) break;
    bx = px;
    bz = pz;
  }
  return resolveKeyboardWalkXZ(ox, oz, bx, bz, r);
}

if (typeof AFRAME !== "undefined" && !AFRAME.components["hazmat-display"]) {
  AFRAME.registerComponent("hazmat-display", {
    init() {
      const THREE = AFRAME.THREE;
      const apply = () => {
        this.el.object3D.traverse((node) => {
          if (!node.isMesh) return;
          node.renderOrder = 10;
          node.frustumCulled = false;
          const mats = Array.isArray(node.material) ? node.material : [node.material];
          mats.forEach((m) => {
            if (!m) return;
            m.side = THREE.DoubleSide;
            if (m.map) {
              m.map.anisotropy = 4;
              m.map.needsUpdate = true;
            }
            m.needsUpdate = true;
          });
        });
      };
      this.el.addEventListener("model-loaded", () => requestAnimationFrame(apply));
      this.el.addEventListener("model-error", (evt) => {
        console.warn("hazmat model:", (evt && evt.detail) || evt);
      });
    }
  });
}

if (typeof AFRAME !== "undefined" && !AFRAME.components["keyboard-walk"]) {
  AFRAME.registerComponent("keyboard-walk", {
    schema: { speed: { type: "number", default: 4.4 } },
    init() {
      this.keys = { forward: 0, back: 0, strafeL: 0, strafeR: 0 };
      this.vec = new AFRAME.THREE.Vector3();
      this.dir = new AFRAME.THREE.Vector3();
      this.right = new AFRAME.THREE.Vector3();
      this.yAxis = new AFRAME.THREE.Vector3(0, 1, 0);
      this.onKeyDown = (e) => this.setKey(e, true);
      this.onKeyUp = (e) => this.setKey(e, false);
      window.addEventListener("keydown", this.onKeyDown, false);
      window.addEventListener("keyup", this.onKeyUp, false);
    },
    remove() {
      window.removeEventListener("keydown", this.onKeyDown, false);
      window.removeEventListener("keyup", this.onKeyUp, false);
    },
    setKey(e, down) {
      const v = down ? 1 : 0;
      if (down && isKeyboardWalkBlocked()) return;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          this.keys.forward = v;
          if (down) e.preventDefault();
          break;
        case "ArrowDown":
        case "s":
        case "S":
          this.keys.back = v;
          if (down) e.preventDefault();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          this.keys.strafeL = v;
          if (down) e.preventDefault();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          this.keys.strafeR = v;
          if (down) e.preventDefault();
          break;
        default:
          break;
      }
    },
    tick(_time, timeDeltaMs) {
      const k = this.keys;
      if (!k.forward && !k.back && !k.strafeL && !k.strafeR) return;
      if (isKeyboardWalkBlocked()) return;

      const cameraEl = this.el.sceneEl && this.el.sceneEl.camera && this.el.sceneEl.camera.el;
      if (!cameraEl || !cameraEl.object3D) return;

      const rig = this.el.object3D;
      const cam = cameraEl.object3D;
      const speed = this.data.speed;
      let dt = typeof timeDeltaMs === "number" && timeDeltaMs > 0 && timeDeltaMs < 250
        ? timeDeltaMs / 1000
        : 1 / 60;

      cam.getWorldDirection(this.dir);
      this.dir.y = 0;
      if (this.dir.lengthSq() < 1e-8) return;
      this.dir.normalize();

      this.right.crossVectors(this.dir, this.yAxis);
      if (this.right.lengthSq() < 1e-8) return;
      this.right.normalize();

      this.vec.set(0, 0, 0);
      /* Đảo chiều so với hướng nhìn: lên/lùi và trái/phải theo cảm giác người dùng */
      if (k.forward) this.vec.sub(this.dir);
      if (k.back) this.vec.add(this.dir);
      if (k.strafeL) this.vec.add(this.right);
      if (k.strafeR) this.vec.sub(this.right);
      if (this.vec.lengthSq() < 1e-8) return;
      this.vec.normalize().multiplyScalar(speed * dt);

      const p = rig.position;
      let nx = p.x + this.vec.x;
      let nz = p.z + this.vec.z;
      nx = Math.max(-ROOM_LIMITS.x, Math.min(ROOM_LIMITS.x, nx));
      nz = Math.max(-ROOM_LIMITS.z, Math.min(ROOM_LIMITS.z, nz));
      if (!Number.isFinite(nx) || !Number.isFinite(nz) || !Number.isFinite(p.y)) return;
      const resolved = resolveKeyboardWalkXZ(p.x, p.z, nx, nz, PLAYER_RADIUS_XZ);
      rig.position.set(resolved.x, p.y, resolved.z);
    }
  });
}

/* ── State ── */
const audioState = { audioElement: null, enabled: true, started: false };

/* ── Audio Unlock System ──
   Browsers block audio.play() without prior user gesture.
   This system ensures audio is unlocked on the FIRST user interaction
   (click, touch, keydown) so that subsequent programmatic plays succeed. */
let _audioUnlocked = false;
const _pendingAudioPlays = [];
let _audioCtx = null;

/** Try to play an audio element, respecting the browser's autoplay policy.
 *  If audio is not yet unlocked, queues the play for when it becomes unlocked. */
function robustAudioPlay(el) {
  if (!el) return Promise.resolve();
  if (_audioUnlocked) {
    return el.play().catch(err => {
      console.warn('[Audio] play() failed even after unlock:', err?.name || err);
      // Retry once after a short delay — sometimes the browser needs a tick
      return new Promise(resolve => {
        setTimeout(() => { el.play().then(resolve).catch(resolve); }, 150);
      });
    });
  }
  // Not unlocked yet — queue it
  return new Promise(resolve => {
    _pendingAudioPlays.push({ el, resolve });
  });
}

/** Called on the first user gesture to unlock audio playback.
 *  Creates and resumes an AudioContext, plays+pauses all <audio> elements
 *  to "whitelist" them for future programmatic plays. */
function _unlockAudio() {
  if (_audioUnlocked) return;
  _audioUnlocked = true;

  // 1) Unlock AudioContext
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC && !_audioCtx) _audioCtx = new AC();
    if (_audioCtx && _audioCtx.state === 'suspended') _audioCtx.resume();
  } catch (_) {}

  // 2) Play+pause every <audio> on the page to "prime" them
  document.querySelectorAll('audio').forEach(a => {
    try {
      const p = a.play();
      if (p && typeof p.then === 'function') {
        p.then(() => { a.pause(); if (a.currentTime) a.currentTime = 0; }).catch(() => {});
      }
    } catch (_) {}
  });

  // 3) Flush any queued plays
  const queue = _pendingAudioPlays.splice(0);
  queue.forEach(({ el, resolve }) => {
    el.play().then(resolve).catch(resolve);
  });
}

// Listen for ANY user gesture to unlock audio as early as possible
function _initAudioUnlockListeners() {
  const events = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];
  let attached = false;
  function onFirstGesture() {
    _unlockAudio();
    if (attached) events.forEach(e => document.removeEventListener(e, onFirstGesture, true));
    attached = false;
  }
  events.forEach(e => document.addEventListener(e, onFirstGesture, { capture: true, once: false, passive: true }));
  attached = true;
}
_initAudioUnlockListeners();
const GUIDE_START = { x: 0, z: 8.48 };
const GUIDE_DEFAULT_DWELL_MS = 8500;
const GUIDE_MOVE_SPEED_UNITS_PER_SEC = 2.45;
const GUIDE_MIN_MOVE_MS = 1800;
const GUIDE_MAX_MOVE_MS = 4600;
const GUIDE_TOUR_STOPS = [
  { key: "intro", label: "Vị trí bắt đầu", x: 0, z: 7.0, lookAt: { x: 0, y: 1.85, z: 0 }, audio: "./audio/guide-01.mp3", fallbackMs: 30000, open: null },
  { key: "newspaper", label: "Báo Việt Nam News", x: 0, z: 1.0, lookAt: { x: 0, y: 2.25, z: 3.35 }, audio: "./audio/guide-02.mp3", fallbackMs: 41000, open: "newspaper-overlay" },
  { key: "timeline", label: "Dòng thời gian đại dịch COVID tại Việt Nam", x: -4.0, z: 1.0, lookAt: { x: -6.83, y: 1.8, z: 3.02 }, audio: "./audio/guide-03.mp3", fallbackMs: 24000, open: "artifact" },
  { key: "painting-cluster", label: "Tranh treo tường", x: 2.5, z: -1.32, lookAt: { x: 8.78, y: 2.05, z: -1.32 }, audio: "./audio/guide-04.mp3", fallbackMs: 17000, open: "painting-tour", subStops: [
    { key: "painting-gold",    label: "Thích nghi", lookAt: { x: 8.78, y: 1.42, z: 2.65 } },
    { key: "painting-ember",   label: "Dấn thân",  lookAt: { x: 8.78, y: 2.66, z: 0.95 } },
    { key: "painting-night",   label: "Kết nối",   lookAt: { x: 8.78, y: 2.1,  z: -1.45 } },
    { key: "painting-echo",    label: "Lăn xả",    lookAt: { x: 8.78, y: 1.42, z: -3.6 } },
    { key: "painting-dawn",    label: "Sẵn sàng",  lookAt: { x: 8.78, y: 2.66, z: -5.15 } }
  ] },
  { key: "hazmat-exhibit", label: "Mô hình đồ bảo hộ cá nhân phòng chống COVID-19", x: -3.8, z: -5.2, lookAt: { x: -6.05, y: 1.65, z: -7.05 }, audio: "./audio/guide-05.mp3", fallbackMs: 20000, open: "artifact" },
  { key: "meeting-setup", label: "Cuộc họp giao ban online", x: 0, z: -2.5, lookAt: { x: 0, y: 2.45, z: -8.76 }, audio: "./audio/guide-06.mp3", fallbackMs: 25000, open: "artifact" },
  { key: "typewriter", label: "Sạp báo bị phong toả", x: 2.8, z: -2.8, lookAt: { x: 5.8, y: 1.8, z: -5.2 }, audio: "./audio/guide-07.mp3", fallbackMs: 34000, open: "artifact" },
  { key: "cityscape", label: "Quy hoạch hệ thống báo chí", x: 1.2, z: 1.0, lookAt: { x: 3.5, y: 2.1, z: 3.48 }, audio: "./audio/guide-08.mp3", fallbackMs: 50000, open: "artifact" },
  { key: "outro", label: "Trở về điểm bắt đầu", x: 0, z: 7.0, lookAt: { x: 0, y: 1.85, z: 0 }, audio: "./audio/guide-09.mp3", fallbackMs: 12000, open: null }
];
const exploredSet = new Set();

/* ════════════════════════════════════════
   CANVAS TEXTURES
════════════════════════════════════════ */

function drawTimelineCanvas() {
  const canvas = document.getElementById("timelineCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // Background
  ctx.fillStyle = "#ece3d1";
  ctx.fillRect(0, 0, W, H);

  // Subtle aged paper grain
  const grainSteps = isMobileDevice ? 650 : 2000;
  for (let i = 0; i < grainSteps; i++) {
    ctx.fillStyle = `rgba(100,70,30,${Math.random() * 0.04})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }

  // Title
  ctx.fillStyle = "#3b2a14";
  ctx.font = "bold 22px serif";
  ctx.textAlign = "center";
  ctx.fillText("DÒNG THỜI GIAN ĐẠI DỊCH", W / 2, 38);
  ctx.font = "bold 18px serif";
  ctx.fillText("COVID TẠI VIỆT NAM", W / 2, 62);

  // Divider
  ctx.strokeStyle = "#b38e5f";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(40, 76); ctx.lineTo(W - 40, 76); ctx.stroke();

  const events = [
    { year: "23/01", text: "Ca nhiễm COVID-19 đầu tiên tại VN" },
    { year: "25/01", text: "VN công bố ca nhiễm thứ 2" },
    { year: "02/2020", text: "Biện pháp giãn cách xã hội đầu tiên" },
    { year: "03/2020", text: "Chỉ thị 16 — cách ly toàn xã hội" },
    { year: "07/2020", text: "Đợt dịch thứ 2 bùng phát Đà Nẵng" },
    { year: "01/2021", text: "Ca nhiễm cộng đồng đầu tiên đợt 3" },
    { year: "05/2021", text: "Đại dịch bùng phát mạnh ở TP.HCM, BN" },
    { year: "07/2021", text: "Chỉ thị 16 tại TP.HCM và các tỉnh phía Nam" },
    { year: "11/2021", text: "VN đạt tỷ lệ tiêm chủng cao, mở cửa trở lại" },
    { year: "2022", text: "Bình thường hóa, khôi phục kinh tế xã hội" },
  ];

  const lineX = W / 2;
  const startY = 104;
  const step = (H - 150) / (events.length - 1);

  // Timeline line
  ctx.strokeStyle = "#c9a86c";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(lineX, startY); ctx.lineTo(lineX, startY + step * (events.length - 1)); ctx.stroke();

  events.forEach((ev, i) => {
    const y = startY + i * step;
    const isLeft = i % 2 === 0;

    // Dot
    ctx.fillStyle = "#c57c37";
    ctx.beginPath(); ctx.arc(lineX, y, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ece3d1";
    ctx.beginPath(); ctx.arc(lineX, y, 3.5, 0, Math.PI * 2); ctx.fill();

    // Connector
    const connEnd = isLeft ? 55 : W - 55;
    ctx.strokeStyle = "#c9a86c";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(lineX, y); ctx.lineTo(connEnd, y); ctx.stroke();

    // Year label
    ctx.fillStyle = "#7a5c2e";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = isLeft ? "right" : "left";
    ctx.fillText(ev.year, isLeft ? connEnd - 5 : connEnd + 5, y - 6);

    // Event text
    ctx.fillStyle = "#3b2a14";
    ctx.font = "11px serif";
    ctx.textAlign = isLeft ? "right" : "left";
    const words = ev.text.split(" ");
    let line = "";
    let lineY = y + 8;
    words.forEach(w => {
      const test = line + (line ? " " : "") + w;
      if (ctx.measureText(test).width > 150 && line) {
        ctx.fillText(line, isLeft ? connEnd - 5 : connEnd + 5, lineY);
        line = w; lineY += 13;
      } else { line = test; }
    });
    ctx.fillText(line, isLeft ? connEnd - 5 : connEnd + 5, lineY);
  });
}

function drawArchiveCanvas() {
  const canvas = document.getElementById("archiveCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  ctx.fillStyle = "#8b6242";
  ctx.fillRect(0, 0, W, H);

  // Wood grain lines
  for (let i = 0; i < 12; i++) {
    ctx.strokeStyle = `rgba(60,30,10,${0.08 + Math.random() * 0.12})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, 0);
    ctx.lineTo(Math.random() * W, H);
    ctx.stroke();
  }

  // Label sticker
  ctx.fillStyle = "#f4e8c8";
  ctx.fillRect(30, 30, W - 60, H - 60);

  ctx.fillStyle = "#8b6242";
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#c9a86c";
  ctx.strokeRect(34, 34, W - 68, H - 68);

  ctx.fillStyle = "#3b2a14";
  ctx.font = "bold 20px serif";
  ctx.textAlign = "center";
  ctx.fillText("HỘP LƯU TRỮ", W / 2, 80);
  ctx.font = "14px serif";
  ctx.fillStyle = "#7a5c2e";
  ctx.fillText("Tài liệu — Ảnh — Film", W / 2, 108);
  ctx.font = "12px monospace";
  ctx.fillStyle = "#a07850";
  ctx.fillText("1954 – 2024", W / 2, 130);
  ctx.fillText("SỐ LƯỢNG: 3 CUỘN", W / 2, 150);
}

function drawPaintingDawn() {
  const canvas = document.getElementById("paintingDawnCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // Sky gradient — warm dawn
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6);
  sky.addColorStop(0, "#1a0e22");
  sky.addColorStop(0.3, "#6b2d4a");
  sky.addColorStop(0.6, "#e8834d");
  sky.addColorStop(1, "#f5c97a");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Sun
  const sunGrad = ctx.createRadialGradient(W/2, H*0.52, 0, W/2, H*0.52, 90);
  sunGrad.addColorStop(0, "rgba(255,240,180,0.95)");
  sunGrad.addColorStop(0.4, "rgba(255,180,60,0.6)");
  sunGrad.addColorStop(1, "rgba(255,120,30,0)");
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, W, H);

  // Horizon ground
  const ground = ctx.createLinearGradient(0, H*0.55, 0, H);
  ground.addColorStop(0, "#2e4a2a");
  ground.addColorStop(1, "#1a2e18");
  ctx.fillStyle = ground;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.58);
  ctx.bezierCurveTo(W*0.25, H*0.52, W*0.75, H*0.58, W, H*0.54);
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
  ctx.fill();

  // River reflection
  const river = ctx.createLinearGradient(0, H*0.6, 0, H*0.85);
  river.addColorStop(0, "rgba(255,180,60,0.6)");
  river.addColorStop(1, "rgba(30,60,90,0.4)");
  ctx.fillStyle = river;
  ctx.beginPath();
  ctx.ellipse(W/2, H*0.73, W*0.22, H*0.08, 0, 0, Math.PI*2);
  ctx.fill();

  // Silhouette trees
  ctx.fillStyle = "#112010";
  for (let i = 0; i < 8; i++) {
    const x = (W / 8) * i + Math.random() * 40;
    const h = 60 + Math.random() * 80;
    const w = 8 + Math.random() * 12;
    ctx.fillRect(x, H * 0.58 - h, w, h);
    // Canopy
    ctx.beginPath();
    ctx.arc(x + w/2, H * 0.58 - h, w * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Title plate
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(W/2 - 90, H - 42, 180, 30);
  ctx.fillStyle = "#f4d7a3";
  ctx.font = "italic 14px serif";
  ctx.textAlign = "center";
  ctx.fillText("Bình minh — 1975", W / 2, H - 22);
}

function drawPaintingNight() {
  const canvas = document.getElementById("paintingNightCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  // Deep night sky
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  sky.addColorStop(0, "#040814");
  sky.addColorStop(0.5, "#0d1535");
  sky.addColorStop(1, "#1a2050");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Stars
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H * 0.65;
    const r = Math.random() * 1.6;
    const op = 0.4 + Math.random() * 0.6;
    ctx.fillStyle = `rgba(220,230,255,${op})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }

  // Moon
  const moonGrad = ctx.createRadialGradient(W*0.72, H*0.14, 0, W*0.72, H*0.14, 42);
  moonGrad.addColorStop(0, "rgba(255,248,220,0.95)");
  moonGrad.addColorStop(0.7, "rgba(220,210,180,0.6)");
  moonGrad.addColorStop(1, "rgba(180,180,200,0)");
  ctx.fillStyle = moonGrad;
  ctx.beginPath(); ctx.arc(W*0.72, H*0.14, 28, 0, Math.PI*2); ctx.fill();

  // Moon glow
  const moonGlow = ctx.createRadialGradient(W*0.72, H*0.14, 20, W*0.72, H*0.14, 90);
  moonGlow.addColorStop(0, "rgba(200,210,255,0.15)");
  moonGlow.addColorStop(1, "rgba(200,210,255,0)");
  ctx.fillStyle = moonGlow;
  ctx.beginPath(); ctx.arc(W*0.72, H*0.14, 90, 0, Math.PI*2); ctx.fill();

  // Ground / city silhouette
  ctx.fillStyle = "#080c16";
  ctx.fillRect(0, H * 0.62, W, H * 0.38);

  // Building silhouettes
  const buildings = [
    { x: 0,    w: 60, h: 130 }, { x: 55,   w: 45, h: 100 },
    { x: 95,   w: 70, h: 160 }, { x: 160,  w: 40, h: 85  },
    { x: 195,  w: 55, h: 145 }, { x: 245,  w: 80, h: 120 },
    { x: 320,  w: 50, h: 90  }, { x: 365,  w: 65, h: 170 },
    { x: 425,  w: 55, h: 105 }, { x: 475,  w: 60, h: 140 },
    { x: 530,  w: 80, h: 95  }
  ];
  buildings.forEach(b => {
    ctx.fillStyle = "#0a0f1c";
    ctx.fillRect(b.x, H * 0.62 - b.h, b.w, b.h);
    // Lit windows
    for (let wy = H*0.62 - b.h + 10; wy < H*0.62 - 10; wy += 16) {
      for (let wx = b.x + 8; wx < b.x + b.w - 8; wx += 14) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(255,220,120,${0.4 + Math.random()*0.5})`;
          ctx.fillRect(wx, wy, 6, 8);
        }
      }
    }
  });

  // Water reflection
  const water = ctx.createLinearGradient(0, H*0.78, 0, H);
  water.addColorStop(0, "rgba(20,35,80,0.8)");
  water.addColorStop(1, "rgba(5,10,30,0.95)");
  ctx.fillStyle = water;
  ctx.fillRect(0, H * 0.78, W, H * 0.22);

  // Moon reflection on water
  ctx.fillStyle = "rgba(200,210,255,0.12)";
  ctx.beginPath();
  ctx.ellipse(W*0.72, H*0.88, 18, 40, 0, 0, Math.PI*2);
  ctx.fill();

  // Title plate
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(W/2 - 90, H - 40, 180, 28);
  ctx.fillStyle = "#b2a6d2";
  ctx.font = "italic 14px serif";
  ctx.textAlign = "center";
  ctx.fillText("Đêm khuya — Hà Nội", W / 2, H - 20);
}

function drawPaintingEmber() {
  const canvas = document.getElementById("paintingEmberCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#1c1210");
  bg.addColorStop(0.45, "#4b241d");
  bg.addColorStop(1, "#b56b38");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 14; i++) {
    ctx.strokeStyle = `rgba(255,210,150,${0.05 + i * 0.012})`;
    ctx.lineWidth = 14 - i * 0.8;
    ctx.beginPath();
    ctx.moveTo(30 + i * 26, H * 0.88);
    ctx.quadraticCurveTo(W * 0.34, H * (0.2 + i * 0.01), W - 40 - i * 12, H * (0.14 + i * 0.035));
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,238,205,0.84)";
  ctx.beginPath();
  ctx.arc(W * 0.72, H * 0.28, 48, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(40 + i * 112, 42 + i * 16, 72, H - 110 - i * 22);
  }

  ctx.fillStyle = "rgba(18,10,8,0.48)";
  ctx.fillRect(W / 2 - 90, H - 42, 180, 30);
  ctx.fillStyle = "#ffd9b0";
  ctx.font = "italic 14px serif";
  ctx.textAlign = "center";
  ctx.fillText("Ánh đèn — Phòng lưu", W / 2, H - 22);
}

function drawPaintingEcho() {
  const canvas = document.getElementById("paintingEchoCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#d3d5d8");
  bg.addColorStop(0.5, "#7d909a");
  bg.addColorStop(1, "#304756");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(246,249,252,0.72)";
  ctx.beginPath();
  ctx.moveTo(0, H * 0.68);
  ctx.bezierCurveTo(W * 0.22, H * 0.48, W * 0.44, H * 0.86, W * 0.62, H * 0.64);
  ctx.bezierCurveTo(W * 0.78, H * 0.44, W * 0.9, H * 0.74, W, H * 0.58);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(22,38,48,0.26)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.moveTo(0, H * (0.18 + i * 0.09));
    ctx.bezierCurveTo(W * 0.28, H * (0.16 + i * 0.06), W * 0.66, H * (0.28 + i * 0.05), W, H * (0.12 + i * 0.1));
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,255,255,0.26)";
  ctx.beginPath();
  ctx.ellipse(W * 0.35, H * 0.26, 74, 34, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(15,23,30,0.42)";
  ctx.fillRect(W / 2 - 96, H - 42, 192, 30);
  ctx.fillStyle = "#eff5f8";
  ctx.font = "italic 14px serif";
  ctx.textAlign = "center";
  ctx.fillText("Phản chiếu — Hành lang", W / 2, H - 22);
}

function drawPaintingGold() {
  const canvas = document.getElementById("paintingGoldCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  const paper = ctx.createLinearGradient(0, 0, 0, H);
  paper.addColorStop(0, "#6e5735");
  paper.addColorStop(0.35, "#b98f4d");
  paper.addColorStop(1, "#f1d48e");
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 1600; i++) {
    ctx.fillStyle = `rgba(90,55,20,${Math.random() * 0.06})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 1.4, 1.4);
  }

  ctx.fillStyle = "rgba(92,56,22,0.22)";
  for (let i = 0; i < 6; i++) {
    ctx.fillRect(48, 56 + i * 46, W - 96, 18);
    ctx.fillRect(48, 80 + i * 46, W - 170 + (i % 2) * 36, 10);
  }

  ctx.strokeStyle = "#fff0c9";
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 34, W - 64, H - 94);

  ctx.fillStyle = "rgba(58,35,12,0.44)";
  ctx.fillRect(W / 2 - 94, H - 42, 188, 30);
  ctx.fillStyle = "#fff3cc";
  ctx.font = "italic 14px serif";
  ctx.textAlign = "center";
  ctx.fillText("Ánh giấy — Lưu dấu", W / 2, H - 22);
}

async function drawPaintingPhoto(canvasId, imageSrc) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !imageSrc) return false;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.decoding = "async";
  img.src = imageSrc;

  try {
    if (img.decode) {
      await img.decode();
    } else {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    }
  } catch (e) {
    console.warn(`[drawPaintingPhoto] Failed to load "${imageSrc}" for canvas "${canvasId}":`, e);
    return false;
  }

  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, W, H);

  const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
  const drawW = img.naturalWidth * scale;
  const drawH = img.naturalHeight * scale;
  const dx = (W - drawW) / 2;
  const dy = (H - drawH) / 2;
  ctx.drawImage(img, dx, dy, drawW, drawH);
  return true;
}

function drawMeetScreenCanvas() {
  const canvas = document.getElementById("meetScreenCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  ctx.fillStyle = "#202124";
  ctx.fillRect(0, 0, W, H);

  // Thanh trên (kiểu Meet)
  ctx.fillStyle = "#303134";
  ctx.fillRect(0, 0, W, 52);
  ctx.strokeStyle = "#3c4043";
  ctx.strokeRect(0, 0, W, 52);

  ctx.fillStyle = "#e8eaed";
  ctx.font = '600 15px "Kefa III", serif';
  ctx.textAlign = "left";
  ctx.fillText("Cuộc họp trực tuyến", 16, 22);
  ctx.fillStyle = "#9aa0a6";
  ctx.font = '12px "Kefa III", serif';
  ctx.fillText("meet.example / phòng-họp-biên-tập", 16, 40);

  // Ô lưới người tham gia
  const pad = 12;
  const top = 58;
  const cellW = (W - pad * 4) / 3;
  const cellH = H - top - 56 - pad;
  const tiles = [
    { x: pad, c: "#5f6368", mic: true },
    { x: pad * 2 + cellW, c: "#1a73e8", mic: true },
    { x: pad * 3 + cellW * 2, c: "#34a853", mic: false },
  ];
  tiles.forEach((t, i) => {
    const x = t.x;
    const y = top;
    ctx.fillStyle = "#3c4043";
    ctx.fillRect(x, y, cellW, cellH);
    ctx.strokeStyle = "#5f6368";
    ctx.strokeRect(x, y, cellW, cellH);
    const cx = x + cellW / 2;
    const cy = y + cellH * 0.42;
    ctx.fillStyle = t.c;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(cellW, cellH) * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#bdc1c6";
    ctx.font = '13px "Kefa III", serif';
    ctx.textAlign = "center";
    ctx.fillText(`Người ${i + 1}`, cx, y + cellH - 18);
    if (t.mic) {
      ctx.fillStyle = "#80868b";
      ctx.beginPath();
      ctx.arc(x + cellW - 18, y + 18, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#202124";
      ctx.font = "10px sans-serif";
      ctx.fillText("mic", x + cellW - 18, y + 21);
    }
  });

  // Ô nhỏ góc (self view)
  const sw = 120, sh = 68;
  ctx.fillStyle = "#3c4043";
  ctx.fillRect(W - sw - 14, H - sh - 62, sw, sh);
  ctx.strokeStyle = "#8ab4f8";
  ctx.lineWidth = 2;
  ctx.strokeRect(W - sw - 14, H - sh - 62, sw, sh);
  ctx.fillStyle = "#fbbc04";
  ctx.beginPath();
  ctx.arc(W - sw / 2 - 14, H - sh / 2 - 62, 18, 0, Math.PI * 2);
  ctx.fill();

  // Thanh điều khiển dưới
  const barY = H - 48;
  ctx.fillStyle = "#303134";
  ctx.fillRect(0, barY, W, 48);
  const btns = ["Tắt mic", "Máy ảnh", "Chia sẻ", "Rời khỏi"];
  ctx.textAlign = "center";
  ctx.font = '11px "Kefa III", serif';
  btns.forEach((b, i) => {
    const bx = W * 0.2 + i * (W * 0.18);
    ctx.fillStyle = i === 3 ? "#ea4335" : "#5f6368";
    ctx.beginPath();
    ctx.arc(bx, barY + 22, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e8eaed";
    ctx.fillText(b, bx, barY + 46);
  });
}

async function initCanvasTextures() {
  drawTimelineCanvas();
  drawArchiveCanvas();
  drawMeetScreenCanvas();

  const paintingResults = await Promise.all([
    drawPaintingPhoto("paintingDawnCanvas", "./painting-1-san-sang-framed.jpg"),
    drawPaintingPhoto("paintingEmberCanvas", "./painting-2-dan-than-framed.jpg"),
    drawPaintingPhoto("paintingNightCanvas", "./painting-3-ket-noi-framed.jpg"),
    drawPaintingPhoto("paintingEchoCanvas", "./painting-4-lan-xa-framed.jpg"),
    drawPaintingPhoto("paintingGoldCanvas", "./painting-5-thich-nghi-framed.jpg")
  ]);

  /* Ensure newspaper image texture is applied (uses <img> in a-assets, not canvas) */
  function refreshNewspaperTexture() {
    const el = document.getElementById("newspaperArtifact");
    if (!el) return false;
    const mesh = el.getObject3D("mesh");
    if (mesh && mesh.material) {
      if (mesh.material.map) {
        mesh.material.map.needsUpdate = true;
      } else {
        el.setAttribute("material", "src", "#newspaperImage");
      }
      mesh.material.needsUpdate = true;
      return true;
    }
    return false;
  }
  if (!refreshNewspaperTexture()) {
    const el = document.getElementById("newspaperArtifact");
    if (el) {
      const tryRefresh = () => {
        if (refreshNewspaperTexture()) {
          el.removeEventListener("loaded", tryRefresh);
          el.removeEventListener("object3dset", tryRefresh);
        }
      };
      el.addEventListener("loaded", tryRefresh);
      el.addEventListener("object3dset", tryRefresh);
    }
    setTimeout(refreshNewspaperTexture, 1500);
    setTimeout(refreshNewspaperTexture, 4000);
  }

  if (!paintingResults[0]) drawPaintingDawn();
  if (!paintingResults[1]) drawPaintingEmber();
  if (!paintingResults[2]) drawPaintingNight();
  if (!paintingResults[3]) drawPaintingEcho();
  if (!paintingResults[4]) drawPaintingGold();
}

/* ════════════════════════════════════════
   INTRO SPLASH
════════════════════════════════════════ */
function dismissSplash(options = {}) {
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
}

/* ════════════════════════════════════════
   CURSOR RING
════════════════════════════════════════ */
let cursorX = 0, cursorY = 0;
let cursorActive = false;
let cursorRafId = null;

function tickCursor() {
  cursorRing.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  artifactTooltip.style.left = (cursorX + 20) + "px";
  artifactTooltip.style.top  = (cursorY - 12) + "px";
  cursorRafId = requestAnimationFrame(tickCursor);
}

function initCursorRing() {
  if (isMobileDevice) return;
  // Start the RAF loop immediately so it's always in sync with display refresh
  cursorRafId = requestAnimationFrame(tickCursor);

  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (!cursorActive) {
      cursorActive = true;
      cursorRing.classList.add("is-visible");
    }
  });

  document.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("is-visible");
    cursorActive = false;
  });
}

/* ════════════════════════════════════════
   TOOLTIP + HOVER GLOW
════════════════════════════════════════ */
function showTooltip(label) {
  if (isMobileDevice) return;
  artifactTooltip.textContent = label;
  artifactTooltip.classList.add("is-visible");
  cursorRing.classList.add("is-hovering");
}

function hideTooltip() {
  if (isMobileDevice) return;
  artifactTooltip.classList.remove("is-visible");
  cursorRing.classList.remove("is-hovering");
}

function applyHoverGlow(el, on) {
  if (isMobileDevice) return;
  if (on) {
    el.setAttribute("animation__hover", "property: material.emissive; to: #8b5c20; dur: 200; easing: easeOutQuad");
  } else {
    el.setAttribute("animation__hover", "property: material.emissive; to: #000000; dur: 280; easing: easeOutQuad");
  }
}

/* ════════════════════════════════════════
   PROGRESS COUNTER
════════════════════════════════════════ */
function markExplored(key) {
  if (!key || exploredSet.has(key)) return;
  exploredSet.add(key);
  const count = exploredSet.size;
  if (progressCount) progressCount.textContent = count;
  if (progressFill)  progressFill.style.width = (count / TOTAL_ARTIFACTS * 100) + "%";
}

/* ════════════════════════════════════════
   ARTIFACT PANEL
════════════════════════════════════════ */
function renderArtifact(key) {
  const item = artifactContent[key];
  if (!item) return;

  artifactTag.textContent      = item.tag;
  artifactTitle.textContent    = item.title;
  if (item.subtitle && key.startsWith("painting-")) {
    artifactSubtitle.textContent = item.subtitle;
    artifactSubtitle.style.display = "";
  } else {
    artifactSubtitle.textContent = "";
    artifactSubtitle.style.display = "none";
  }
  const bodyHtml = item.body.map(p => `<p>${p}</p>`).join("");
  const imageHtml = item.image
    ? `<figure class="artifact-figure"><img src="${item.image}" alt="${item.title}" loading="lazy"></figure>`
    : "";
  artifactBody.innerHTML       = bodyHtml + imageHtml;
  artifactPanel.classList.remove("overlay--hidden");
  markExplored(key);
}

function closeArtifact() {
  artifactPanel.classList.add("overlay--hidden");
}

/* ════════════════════════════════════════
   NEWSPAPER
════════════════════════════════════════ */
function isNewspaperOpen() {
  return !newspaperView.classList.contains("overlay--hidden");
}

function openNewspaper() {
  hideTooltip();
  closeArtifact();
  newspaperView.classList.remove("overlay--hidden");
  sceneWrap.setAttribute("aria-hidden", "true");
  markExplored("newspaper");
}

function closeNewspaper() {
  hideTooltip();
  newspaperView.classList.add("overlay--hidden");
  sceneWrap.removeAttribute("aria-hidden");
}

function reloadNewspaper() {
  if (!newspaperFrame) return;
  if (newspaperFrame.contentWindow) { newspaperFrame.contentWindow.location.reload(); return; }
  newspaperFrame.setAttribute("src", newspaperFrame.getAttribute("src"));
}

/* ════════════════════════════════════════
   INTRO SHELL TOGGLE
════════════════════════════════════════ */
function updateIntroToggle() {
  if (!introShell || !introToggle || !introToggleMark) return;
  const collapsed = introShell.classList.contains("is-collapsed");
  introToggleMark.textContent = collapsed ? "›" : "×";
  introToggle.setAttribute("aria-label", collapsed ? "Mở lại bảng giới thiệu" : "Thu gọn bảng giới thiệu");
}

/* ════════════════════════════════════════
   CAMERA / TELEPORT
════════════════════════════════════════ */
function animateCameraTo(x, z) {
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

/**
 * Move camera to a tour stop, ensuring the viewer NEVER backs into an object.
 * Strategy: if the viewer would need to walk backwards (or back away from the
 * previous object), rotate to face the destination FIRST, then walk forward.
 */
async function animateGuideCameraTo(stop) {
  if (!cameraRig || !stop) return Promise.resolve();
  const current = cameraRig.object3D.position;
  const moveDx = stop.x - current.x;
  const moveDz = stop.z - current.z;
  const moveDist = Math.hypot(moveDx, moveDz);

  if (moveDist < 0.15) {
    /* Already at position — just rotate to face the object */
    await animateGuideCameraLookAt(stop, 900);
    return;
  }

  /* Calculate the movement direction as a yaw angle */
  const THREE = AFRAME.THREE;
  const moveYaw = THREE.MathUtils.radToDeg(Math.atan2(-moveDx, -moveDz));

  /* Calculate where the viewer SHOULD look (at the new stop's object) */
  const newLookRot = computeCameraRotationFromLookAt(
    { x: current.x, y: current.y, z: current.z },
    stop.lookAt || { x: stop.x, y: 1.65, z: stop.z }
  );

  /* Also check where the viewer is CURRENTLY looking (at the previous object) */
  const camRot = mainCamera.object3D.rotation;
  const currentYaw = THREE.MathUtils.radToDeg(camRot.y);

  /* Angle between movement direction and where viewer should look */
  let diffNewLook = ((newLookRot.y - moveYaw) % 360 + 540) % 360 - 180;

  /* Angle between movement direction and where viewer is currently looking */
  let diffCurrentLook = ((currentYaw - moveYaw) % 360 + 540) % 360 - 180;

  /* Pre-rotate if EITHER:
     - Walking backwards relative to the new object (diffNewLook > 90°), OR
     - Backing away from the current view (diffCurrentLook > 90°)
     In both cases, first rotate to face where we're going, then walk forward. */
  const needsPreRotate = Math.abs(diffNewLook) > 90 || Math.abs(diffCurrentLook) > 90;

  if (needsPreRotate) {
    /* ── Phase 1: Rotate in place to face the destination object ── */
    await animateGuideCameraLookAt(stop, 700);
  }

  /* ── Phase 2: Walk to position (now facing forward) ── */
  const dur = getGuideMoveDuration(current.x, current.z, stop.x, stop.z);
  cameraRig.setAttribute("animation__guide_move", `property: position; to: ${stop.x} 1.6 ${stop.z}; dur: ${dur}; easing: easeInOutSine`);
  /* Keep looking at the object while walking (refines angle as position changes) */
  void animateGuideCameraLookAt(stop, Math.min(dur, 1800));
  return waitForAFrameAnimation(cameraRig, "guide_move", dur);
}

function focusArtifact(key) {
  const point = focusPoints[key];
  if (!point || !cameraRig) return;
  const cur = cameraRig.object3D.position;
  const pos = clampWalkToward(cur.x, cur.z, point.x, point.z, PLAYER_RADIUS_XZ);
  animateCameraTo(pos.x, pos.z);
}

function teleportToPoint(point) {
  if (guideModeActive || isNewspaperOpen() || !point || !cameraRig || !AFRAME.THREE) return;
  const current = cameraRig.object3D.position;
  const moveVector = new AFRAME.THREE.Vector3(point.x - current.x, 0, point.z - current.z);
  if (moveVector.lengthSq() < 0.01) return;
  const offset = TELEPORT_OFFSETS[point.surface] || TELEPORT_OFFSETS.floor;
  const distance = Math.max(0, Math.min(moveVector.length() - offset, MAX_TELEPORT_STEP));
  if (distance <= 0.05) return;
  moveVector.normalize().multiplyScalar(distance);
  const nextX = Math.max(-ROOM_LIMITS.x, Math.min(ROOM_LIMITS.x, current.x + moveVector.x));
  const nextZ = Math.max(-ROOM_LIMITS.z, Math.min(ROOM_LIMITS.z, current.z + moveVector.z));
  const pos = clampWalkToward(current.x, current.z, nextX, nextZ, PLAYER_RADIUS_XZ);
  animateCameraTo(pos.x, pos.z);
}

function getTeleportIntersection(el, evt) {
  if (!el) return null;

  const directIntersection = evt && evt.detail && evt.detail.intersection;
  if (directIntersection && directIntersection.point) {
    return {
      x: directIntersection.point.x,
      z: directIntersection.point.z,
      surface: el.dataset.surface || "floor"
    };
  }

  if (!mainCursor || !mainCursor.components || !mainCursor.components.raycaster) return null;

  const fallbackIntersection = mainCursor.components.raycaster.getIntersection(el);
  if (!fallbackIntersection || !fallbackIntersection.point) return null;

  return {
    x: fallbackIntersection.point.x,
    z: fallbackIntersection.point.z,
    surface: el.dataset.surface || "floor"
  };
}

function applyPerformanceProfile() {
  if (!sceneEl || !isMobileDevice) return;
  sceneEl.setAttribute("renderer", "antialias: false; colorManagement: true; precision: mediump; powerPreference: high-performance");
  sceneEl.addEventListener("render-target-loaded", () => {
    if (!sceneEl.renderer) return;
    sceneEl.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MOBILE_MAX_PIXEL_RATIO));
  }, { once: true });
}

function configureInputMode() {
  document.body.classList.toggle("is-mobile", isMobileDevice);
  if (!mainCursor) return;

  if (isMobileDevice) {
    // Center ray works reliably with touch on mobile A-Frame.
    mainCursor.setAttribute("cursor", "rayOrigin: entity; fuse: false");
    if (cursorRing) cursorRing.style.display = "none";
    if (artifactTooltip) artifactTooltip.style.display = "none";
  } else {
    mainCursor.setAttribute("cursor", "rayOrigin: mouse");
  }
}

function updateOrientationUI() {
  if (!isMobileDevice) {
    document.body.classList.remove("is-portrait", "is-landscape");
    document.body.classList.remove("is-rotate-lock");
    if (rotatePrompt) rotatePrompt.hidden = true;
    return;
  }
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  document.body.classList.toggle("is-portrait", isPortrait);
  document.body.classList.toggle("is-landscape", !isPortrait);
  if (hasEnteredRoom) {
    document.body.classList.remove("is-rotate-lock");
    if (rotatePrompt) rotatePrompt.hidden = true;
    if (introSplash && introSplash.style.display !== "none") {
      introSplash.style.visibility = "visible";
      introSplash.style.pointerEvents = "";
    }
    return;
  }

  document.body.classList.toggle("is-rotate-lock", isPortrait);
  if (rotatePrompt) rotatePrompt.hidden = !isPortrait;
  if (!introSplash || introSplash.style.display === "none") return;

  if (isPortrait) {
    // Before entering room on mobile: show only rotate prompt.
    introSplash.style.visibility = "hidden";
    introSplash.style.pointerEvents = "none";
  } else {
    introSplash.style.visibility = "visible";
    introSplash.style.pointerEvents = "";
  }
}

function setGyroEnabled(enabled) {
  const mainCamera = document.getElementById("mainCamera");
  if (!mainCamera) return;
  mainCamera.setAttribute("look-controls", `touchEnabled: true; mouseEnabled: true; magicWindowTrackingEnabled: ${enabled ? "true" : "false"}`);
}

function needsIOSGyroPermission() {
  return hasDeviceOrientationAPI && typeof window.DeviceOrientationEvent.requestPermission === "function";
}

function showGyroPrompt() {
  if (!gyroPrompt || !isMobileDevice || !hasDeviceOrientationAPI || !needsIOSGyroPermission()) return;
  gyroPrompt.style.display = "";
  gyroPrompt.hidden = false;
}

async function requestGyroPermission() {
  if (gyroPrompt) {
    gyroPrompt.hidden = true;
    gyroPrompt.style.display = "none";
  }
  if (!needsIOSGyroPermission()) return;
  try {
    const result = await window.DeviceOrientationEvent.requestPermission();
    if (result === "granted") {
      setGyroEnabled(true);
      if (gyroPrompt) gyroPrompt.hidden = true;
      return;
    }
  } catch (error) {
    // Keep controls available via touch drag even if gyro is denied.
  }
  setGyroEnabled(false);
}

function updateTopBarToggle() {
  if (!topBar || !topBarToggle || !topBarToggleMark) return;
  const collapsed = topBar.classList.contains("is-collapsed");
  topBarToggleMark.textContent = collapsed ? "+" : "−";
  topBarToggle.setAttribute("aria-label", collapsed ? "Mở hành trình" : "Thu gọn hành trình");
}

/* ════════════════════════════════════════
   FULLSCREEN
════════════════════════════════════════ */
function updateFullscreenButton() {
  const isFs = document.fullscreenElement === appShell || document.webkitFullscreenElement === appShell;
  document.body.classList.toggle("is-fullscreen", isFs);
}

async function toggleFullscreen() {
  if (!appShell) return;
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
  if (fsEl === appShell) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else if (!fsEl) {
    (appShell.requestFullscreen || appShell.webkitRequestFullscreen).call(appShell);
  }
}

async function enterFullscreenOnMobile() {
  if (!isMobileDevice || !appShell) return;
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
  if (fsEl) return;
  try {
    await (appShell.requestFullscreen || appShell.webkitRequestFullscreen).call(appShell);
  } catch (error) {
    // Some mobile browsers block fullscreen; continue without interrupting UX.
  }
  // Helps Safari collapse browser chrome after entering.
  window.scrollTo(0, 1);
}

/* ════════════════════════════════════════
   AMBIENT AUDIO
════════════════════════════════════════ */
function createAmbientAudio() {
  const audioEl = document.getElementById("ambientAudio");
  if (!audioEl) return;
  audioEl.volume = 0.11;
  audioState.audioElement = audioEl;
  audioState.started = true;
  robustAudioPlay(audioEl);
}

async function ensureAmbientAudioStarted() {
  if (!audioState.enabled) return;
  if (!audioState.started) createAmbientAudio();
  const el = audioState.audioElement;
  if (el && el.paused) robustAudioPlay(el);
}

async function toggleAudio() {
  audioState.enabled = !audioState.enabled;
  const el = audioState.audioElement;
  if (!audioState.started && audioState.enabled) {
    await ensureAmbientAudioStarted();
  } else if (el) {
    audioState.enabled ? robustAudioPlay(el) : el.pause();
  }
  if (audioButton) audioButton.textContent = audioState.enabled ? "Tắt nhạc" : "Bật nhạc";
}

/* ════════════════════════════════════════
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
    if (!guideNarrationAudio || !stop.audio) {
      setTimeout(resolve, GUIDE_DEFAULT_DWELL_MS);
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      guideNarrationAudio.removeEventListener("ended", finish);
      guideNarrationAudio.removeEventListener("error", onError);
      guideNarrationAudio.removeEventListener("loadedmetadata", onMeta);
      guideNarrationAudio.removeEventListener("canplaythrough", onCanPlay);
      clearTimeout(errorTimer);
      clearTimeout(loadTimeout);
      resolve();
    };
    const onError = (err) => {
      console.warn('[Guide Narration] Audio error for', stop.audio, err);
      /* On error, wait a reasonable time then move on */
      setTimeout(finish, stop.fallbackMs || GUIDE_DEFAULT_DWELL_MS);
    };
    const onMeta = () => {
      /* Store the real audio duration for sub-tour timing */
      if (guideNarrationAudio.duration && isFinite(guideNarrationAudio.duration)) {
        stop._actualAudioMs = guideNarrationAudio.duration * 1000;
      }
    };
    const onCanPlay = () => {
      /* Audio is ready to play — attempt playback immediately */
      robustAudioPlay(guideNarrationAudio).catch(() => {
        /* If still blocked, the user-interaction unlock will flush it */
      });
    };
    /* Safety timeout: only fires if neither "ended" nor "error" fires
       (e.g. browser stalled). Set generously — 3× fallback or 5 min max —
       so it never cuts a playing narration short. */
    const safetyMs = Math.min(300000, (stop.fallbackMs || GUIDE_DEFAULT_DWELL_MS) * 3);
    const errorTimer = setTimeout(finish, safetyMs);
    /* If audio doesn't load within 8 seconds, move on */
    const loadTimeout = setTimeout(() => {
      if (!done && guideNarrationAudio.readyState < 2) {
        console.warn('[Guide Narration] Load timeout for', stop.audio);
        finish();
      }
    }, 8000);
    guideNarrationAudio.pause();
    guideNarrationAudio.currentTime = 0;
    guideNarrationAudio.src = stop.audio;
    guideNarrationAudio.volume = 0.95;
    guideNarrationAudio.load();
    guideNarrationAudio.addEventListener("loadedmetadata", onMeta, { once: true });
    guideNarrationAudio.addEventListener("canplaythrough", onCanPlay, { once: true });
    guideNarrationAudio.addEventListener("ended", finish, { once: true });
    guideNarrationAudio.addEventListener("error", onError, { once: true });
    /* Also attempt playback immediately in case audio is already cached */
    robustAudioPlay(guideNarrationAudio).catch(() => {
      /* If autoplay is blocked, fall back to waiting for unlock or timeout */
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
    /* Show the newspaper overlay instead of the small artifact panel,
       because the camera is positioned above the newspaper stand and
       the viewer cannot see it properly from the 3D scene. */
    openNewspaper();
    return;
  }
  renderArtifact(stop.key);
}

/** Smoothly pan the camera to look at a new target from the current rig position */
function animateGuideCameraPanTo(lookAtTarget, dur = 1200) {
  if (!mainCamera || !cameraRig || !lookAtTarget) return Promise.resolve();
  const from = {
    x: cameraRig.object3D.position.x,
    y: cameraRig.object3D.position.y,
    z: cameraRig.object3D.position.z
  };
  const rot = computeCameraRotationFromLookAt(from, lookAtTarget);
  mainCamera.setAttribute("animation__guide_look", `property: rotation; to: ${rot.x} ${rot.y} ${rot.z}; dur: ${dur}; easing: easeInOutQuad`);
  return waitForAFrameAnimation(mainCamera, "guide_look", dur);
}

/** Run the painting sub-tour: pan left→right across 5 paintings while audio plays */
async function runPaintingSubTourWithNarration(stop, stopIndex, narrationDone) {
  const subStops = stop.subStops;
  if (!subStops || subStops.length === 0) {
    await narrationDone;
    return;
  }

  /* Narration is already playing — look at center painting */
  await animateGuideCameraLookAt(stop, 900);

  /* Open the center painting panel briefly */
  renderArtifact("painting-night");
  await waitMs(1200);

  /* Calculate per-painting dwell: total audio minus intro time, divided by 5.
     Use the actual audio duration if available (set by playGuideNarration's
     loadedmetadata handler), otherwise fall back to a generous estimate. */
  const audioDuration = stop._actualAudioMs || (stop.fallbackMs || GUIDE_DEFAULT_DWELL_MS);
  const introTime = 2100;
  const panDuration = 900;
  const perPaintingDwell = Math.max(800, Math.round((audioDuration - introTime - panDuration * 6) / subStops.length));

  /* Pan through each painting left→right */
  for (let p = 0; p < subStops.length; p++) {
    if (!guideTourRunning) break;
    const sub = subStops[p];
    closeArtifact();

    /* Smooth pan to this painting */
    await animateGuideCameraPanTo(sub.lookAt, panDuration);
    await waitMs(200);

    /* Open this painting's info panel */
    renderArtifact(sub.key);
    updateGuideStatus(stopIndex, { label: `${stop.label} — ${sub.label}`, key: stop.key });

    /* Wait the dwell time for this painting */
    await waitMs(perPaintingDwell);
  }

  closeArtifact();
  /* Wait for narration to finish if it's still playing — never cut it short */
  await narrationDone;
}

async function runGuideTour() {
  if (guideTourRunning) return;
  guideTourRunning = true;
  guideTourStarted = true;
  setGuideMode(true);
  /* Mute ambient background music during guided tour so narration is clear */
  if (audioState.audioElement) {
    audioState.audioElement.pause();
    audioState.audioElement.volume = 0;
  }
  if (cameraRig) cameraRig.object3D.position.set(GUIDE_START.x, 1.6, GUIDE_START.z);
  await waitMs(250);
  for (let i = 0; i < GUIDE_TOUR_STOPS.length; i++) {
    if (!guideTourRunning) break;
    const stop = GUIDE_TOUR_STOPS[i];
    updateGuideStatus(i, stop);

    /* Start narration FIRST so audio begins loading/playing during
       the camera transition.  This eliminates the "silent gap" caused
       by leading silence in the audio files — by the time the camera
       arrives at the object the narrator is already speaking. */
    const narrationDone = playGuideNarration(stop);

    /* Move camera to the stop while narration is already playing */
    await animateGuideCameraTo(stop);
    await animateGuideCameraLookAt(stop, 900);

    /* Check if this is a painting-tour stop with sub-stops */
    if (stop.open === "painting-tour" && stop.subStops && stop.subStops.length > 0) {
      /* Painting sub-tour manages its own timing relative to audio.
         We already started narration above, so pass the promise. */
      await runPaintingSubTourWithNarration(stop, i, narrationDone);
    } else {
      /* Open the info panel / overlay now that the camera has arrived */
      openGuideStopPanel(stop);
      /* Wait for the full narration to finish — never cut it short */
      await narrationDone;
      /* Close whichever panel is open — artifact or newspaper overlay */
      if (stop.key === "newspaper") {
        closeNewspaper();
      } else {
        closeArtifact();
      }
    }
    /* Brief pause before moving to the next stop */
    await waitMs(600);
  }
  if (guideNarrationAudio) guideNarrationAudio.pause();
  hideGuideStatus();
  setGuideMode(false);
  guideTourRunning = false;
  if (introToggle) {
    introToggle.hidden = false;
    updateIntroToggle();
  }
  /* Restore ambient background music now that the guided tour is over */
  if (audioState.audioElement) {
    audioState.audioElement.volume = 0.11;
  }
  if (audioState.enabled) ensureAmbientAudioStarted();
  await showGuideCompletionNotice();
}

async function startGuideExperience() {
  /* User just clicked — this is a user gesture, unlock audio NOW */
  _unlockAudio();
  prepareRoomEntry({ guide: true });
  if (isMobileDevice) await enterFullscreenOnMobile();
  setTimeout(runGuideTour, 780);
}

async function startFreeExperience() {
  /* User just clicked — this is a user gesture, unlock audio NOW */
  _unlockAudio();
  prepareRoomEntry({ guide: false });
  if (isMobileDevice) await enterFullscreenOnMobile();
  /* Start ambient background music in free exploration mode */
  ensureAmbientAudioStarted();
}

/* ════════════════════════════════════════
   ACTION HANDLER
════════════════════════════════════════ */
/* Return to the intro splash screen (home) from free exploration mode */
function returnToHome() {
  /* If a guide tour is running, stop it first */
  if (guideTourRunning) {
    guideTourRunning = false;
    if (guideNarrationAudio) guideNarrationAudio.pause();
    setGuideMode(false);
    hideGuideStatus();
  }
  /* Close any open panels */
  closeArtifact();
  if (newspaperView && !newspaperView.classList.contains("overlay--hidden")) closeNewspaper();
  if (helpPanel) helpPanel.hidden = true;
  /* Pause ambient audio while on the intro splash screen */
  if (audioState.audioElement && !audioState.audioElement.paused) {
    audioState.audioElement.pause();
  }
  /* Hide the intro shell toggle while splash is visible */
  if (introToggle) introToggle.hidden = true;
  /* Show the intro splash again */
  if (introSplash) {
    introSplash.classList.remove("is-exiting");
    introSplash.style.display = "";
    introSplash.style.visibility = "visible";
    introSplash.style.pointerEvents = "";
    introSplash.setAttribute("aria-modal", "true");
  }
  /* Reset room entry state so re-entering works correctly */
  hasEnteredRoom = false;
  guideTourStarted = false;
}

function handleAction(action) {
  if (action === "close-panel")      closeArtifact();
  if (action === "toggle-help")      helpPanel.hidden = !helpPanel.hidden;
  if (action === "close-help")       helpPanel.hidden = true;
  if (action === "close-newspaper")  closeNewspaper();
  if (action === "reload-newspaper") reloadNewspaper();
  if (action === "toggle-audio")     toggleAudio();
  if (action === "return-home")      returnToHome();
  if (action === "toggle-topbar" && topBar) {
    topBar.classList.toggle("is-collapsed");
    updateTopBarToggle();
  }
  if (action === "toggle-intro" && introShell) {
    introShell.classList.toggle("is-collapsed");
    updateIntroToggle();
  }
}

/* ════════════════════════════════════════
   VR BUTTON REBIND
════════════════════════════════════════ */
function bindSceneFullscreenButton() {
  const sceneButton = document.querySelector(".a-enter-vr-button");
  if (!sceneButton || sceneButton.dataset.boundFullscreen === "true") return;
  sceneButton.dataset.boundFullscreen = "true";
  sceneButton.title = "Toàn màn hình";
  sceneButton.setAttribute("aria-label", "Toàn màn hình");
  sceneButton.addEventListener("click", (e) => {
    e.preventDefault(); e.stopImmediatePropagation(); toggleFullscreen();
  }, true);
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  configureInputMode();
  updateOrientationUI();
  applyPerformanceProfile();
  if (isMobileDevice && topBar) {
    topBar.classList.add("is-collapsed");
  }
  updateTopBarToggle();

  // Canvas textures — đợi Kefa III tải xong rồi mới vẽ chữ
  void (async () => {
    if (document.fonts) {
      try {
        await Promise.all([
          document.fonts.load('400 1em "Kefa III"'),
          document.fonts.load('700 1em "Kefa III"')
        ]);
      } catch (_) {
        await document.fonts.ready;
      }
    }
    await initCanvasTextures();
  })();

  // Cursor ring
  initCursorRing();

  // Intro splash mode selection
  if (introEnterBtn) {
    introEnterBtn.addEventListener("click", startFreeExperience);
  }
  if (guideTourBtn) {
    guideTourBtn.addEventListener("click", startGuideExperience);
  }

  // Fullscreen listeners
  document.addEventListener("fullscreenchange", updateFullscreenButton);
  document.addEventListener("webkitfullscreenchange", updateFullscreenButton);
  updateFullscreenButton();

  // Bind VR button → fullscreen
  if (sceneEl) sceneEl.addEventListener("loaded", bindSceneFullscreenButton);
  setTimeout(bindSceneFullscreenButton, 300);
  setTimeout(bindSceneFullscreenButton, 1200);

  // Audio priming — also ensures audio unlock on any user interaction
  const primeAudio = () => {
    _unlockAudio();
    ensureAmbientAudioStarted();
  };
  document.addEventListener("pointerdown", primeAudio, { passive: true });
  document.addEventListener("keydown", primeAudio);

  // Clickable artifacts — click + hover
  document.querySelectorAll(".clickable").forEach(node => {
    const key   = node.dataset.artifact;
    const label = node.dataset.label || key;

    if (!isMobileDevice) {
      node.addEventListener("mouseenter", () => {
        if (label) showTooltip(label);
        applyHoverGlow(node, true);
      });

      node.addEventListener("mouseleave", () => {
        hideTooltip();
        applyHoverGlow(node, false);
      });
    }

    node.addEventListener("click", () => {
      if (guideModeActive) return;
      if (!key) return;
      if (key === "newspaper") { openNewspaper(); return; }
      renderArtifact(key);
    });
  });

  // Teleportable surfaces use their own click events, with the shared mouse raycaster as fallback.
  document.querySelectorAll(".teleportable").forEach(node => {
    node.addEventListener("click", (event) => {
      if (guideModeActive) return;
      const targetPoint = getTeleportIntersection(node, event);
      if (targetPoint) teleportToPoint(targetPoint);
    });
  });

  // Data-action buttons
  document.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => handleAction(btn.dataset.action));
  });

  // Journey dropdown
  if (journeySelect) {
    journeySelect.addEventListener("change", () => {
      if (guideModeActive) return;
      const key = journeySelect.value;
      if (!key) return;
      focusArtifact(key);
      if (key !== "newspaper") renderArtifact(key);
    });
  }

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeArtifact();
    helpPanel.hidden = true;
    closeNewspaper();
  });

  // Also enter free-tour mode from splash on Escape / Space / Enter
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Escape" || e.key === " " || e.key === "Enter") && introSplash && !introSplash.classList.contains("is-exiting") && introSplash.style.display !== "none") {
      startFreeExperience();
    }
  });

  if (gyroEnableBtn) {
    gyroEnableBtn.addEventListener("click", requestGyroPermission);
  }
  window.addEventListener("resize", updateOrientationUI, { passive: true });
  window.addEventListener("orientationchange", updateOrientationUI, { passive: true });
});
