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
  voice: {
    tag: "Âm thanh",
    title: "Máy nghe ghi âm",
    subtitle: "Trạm nghe cho những đoạn phỏng vấn, lời dẫn, và lớp kể chuyện bằng giọng nói.",
    body: [
      "Vật phẩm này hợp để mở ra transcript, audio clip, hoặc một lớp hỏi âm ngắn giữa những đoạn trưng bày có nhiều văn bản.",
      "Trong demo, nó đóng vai trò điểm dừng cho một mảnh ký ức được kể bằng giọng nói thay vì bằng hình ảnh hay bộ chữ dài."
    ]
  },
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
    title: "Khung lịch trên tường",
    subtitle: "Mặt phẳng để treo các mốc thời gian, chuyển đổi, và những ngày đánh dấu.",
    body: [
      "Người xem có thể bắt đầu hành trình tại đây để nắm bối cảnh tổng quan trước khi đi sâu vào các vật phẩm có tính cá nhân hơn.",
      "Trong bản thật, bạn chỉ cần thay nội dung này bằng timeline và hình scan tài liệu nếu cần."
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
    title: "Số báo giấy cuối cùng",
    subtitle: "Vật phẩm gần lối vào phòng, bấm vào để mở file báo HTML thật của bạn.",
    body: [
      "Khác với bản mock trước, hotspot này mở trực tiếp file to-bao-cuoi-cung.html được nhúng vào overlay toàn màn hình.",
      "Nghĩa là khi bạn sửa file báo gốc, phần triển lãm này tự động lấy đúng phiên bản mới nhất mà không cần viết lại giao diện."
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
  voice:           { x: -3.65, z: -1.05 },
  typewriter:      { x:  3.65, z: -1.05 },
  "painting-dawn": { x:  5.95, z: -1.55 },
  "painting-ember":{ x:  5.95, z: -1.55 },
  "painting-night":{ x:  5.95, z: -1.55 },
  "painting-echo": { x:  5.95, z: -1.55 },
  "painting-gold": { x:  5.95, z: -1.55 },
  "painting-cluster": { x: 5.95, z: -1.55 },
  newspaper:       { x:  0,    z:  2.35 },
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
  { minX: -5.9, maxX: -4.78, minZ: -2.52, maxZ: -1.32 },
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

function isKeyboardWalkBlocked() {
  if (introSplash) {
    const dismissed = introSplash.style.display === "none" || introSplash.classList.contains("is-exiting");
    if (!dismissed) return true;
  }
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
const audioState = { context: null, enabled: true, started: false };
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
  ctx.font = "bold 28px serif";
  ctx.textAlign = "center";
  ctx.fillText("DÒNG THỜI GIAN", W / 2, 50);

  // Divider
  ctx.strokeStyle = "#b38e5f";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(40, 65); ctx.lineTo(W - 40, 65); ctx.stroke();

  const events = [
    { year: "1954", text: "Thành lập tòa soạn" },
    { year: "1968", text: "Số báo đặc biệt chiến tranh" },
    { year: "1975", text: "Thống nhất đất nước" },
    { year: "1986", text: "Thời kỳ Đổi Mới" },
    { year: "1995", text: "Bình thường hóa quan hệ" },
    { year: "2010", text: "Chuyển đổi kỹ thuật số" },
    { year: "2024", text: "Số báo giấy cuối cùng" },
  ];

  const lineX = W / 2;
  const startY = 100;
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
    ctx.beginPath(); ctx.arc(lineX, y, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ece3d1";
    ctx.beginPath(); ctx.arc(lineX, y, 4, 0, Math.PI * 2); ctx.fill();

    // Connector
    const connEnd = isLeft ? 60 : W - 60;
    ctx.strokeStyle = "#c9a86c";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(lineX, y); ctx.lineTo(connEnd, y); ctx.stroke();

    // Year label
    ctx.fillStyle = "#7a5c2e";
    ctx.font = "bold 16px monospace";
    ctx.textAlign = isLeft ? "right" : "left";
    ctx.fillText(ev.year, isLeft ? connEnd - 6 : connEnd + 6, y - 8);

    // Event text
    ctx.fillStyle = "#3b2a14";
    ctx.font = "13px serif";
    ctx.textAlign = isLeft ? "right" : "left";
    const words = ev.text.split(" ");
    let line = "";
    let lineY = y + 10;
    words.forEach(w => {
      const test = line + (line ? " " : "") + w;
      if (ctx.measureText(test).width > 160 && line) {
        ctx.fillText(line, isLeft ? connEnd - 6 : connEnd + 6, lineY);
        line = w; lineY += 15;
      } else { line = test; }
    });
    ctx.fillText(line, isLeft ? connEnd - 6 : connEnd + 6, lineY);
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
  } catch (_) {
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

  const results = await Promise.all([
    drawPaintingPhoto("paintingDawnCanvas", "./painting-1-san-sang-framed.jpg"),
    drawPaintingPhoto("paintingEmberCanvas", "./painting-2-dan-than-framed.jpg"),
    drawPaintingPhoto("paintingNightCanvas", "./painting-3-ket-noi-framed.jpg"),
    drawPaintingPhoto("paintingEchoCanvas", "./painting-4-lan-xa-framed.jpg"),
    drawPaintingPhoto("paintingGoldCanvas", "./painting-5-thich-nghi-framed.jpg")
  ]);

  if (!results[0]) drawPaintingDawn();
  if (!results[1]) drawPaintingEmber();
  if (!results[2]) drawPaintingNight();
  if (!results[3]) drawPaintingEcho();
  if (!results[4]) drawPaintingGold();
}

/* ════════════════════════════════════════
   INTRO SPLASH
════════════════════════════════════════ */
function dismissSplash() {
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

function focusArtifact(key) {
  const point = focusPoints[key];
  if (!point || !cameraRig) return;
  const cur = cameraRig.object3D.position;
  const pos = clampWalkToward(cur.x, cur.z, point.x, point.z, PLAYER_RADIUS_XZ);
  animateCameraTo(pos.x, pos.z);
}

function teleportToPoint(point) {
  if (isNewspaperOpen() || !point || !cameraRig || !AFRAME.THREE) return;
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
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const master  = context.createGain();
  const filter  = context.createBiquadFilter();
  const lfo     = context.createOscillator();
  const lfoGain = context.createGain();
  const shimmer = context.createOscillator();
  const shimmerGain = context.createGain();

  master.gain.value    = 0.11;
  filter.type          = "lowpass";
  filter.frequency.value = 1180;
  filter.Q.value       = 0.7;
  lfo.type             = "sine";
  lfo.frequency.value  = 0.06;
  lfoGain.gain.value   = 220;
  shimmer.type         = "sine";
  shimmer.frequency.value = 0.12;
  shimmerGain.gain.value  = 0.018;

  master.connect(filter);
  filter.connect(context.destination);
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  shimmer.connect(shimmerGain);
  shimmerGain.connect(master.gain);

  [
    { frequency: 196.0,  gain: 0.05,  type: "sine",     detune: -4 },
    { frequency: 246.94, gain: 0.043, type: "triangle", detune:  3 },
    { frequency: 293.66, gain: 0.034, type: "sine",     detune:  1 },
    { frequency: 392.0,  gain: 0.018, type: "sine",     detune: -2 }
  ].forEach(v => {
    const osc  = context.createOscillator();
    const gain = context.createGain();
    osc.type = v.type; osc.frequency.value = v.frequency; osc.detune.value = v.detune;
    gain.gain.value = v.gain;
    osc.connect(gain); gain.connect(master); osc.start();
  });

  lfo.start(); shimmer.start();
  audioState.context = context;
  audioState.started = true;
}

async function ensureAmbientAudioStarted() {
  if (!audioState.enabled) return;
  if (!audioState.started) createAmbientAudio();
  if (!audioState.context) return;
  if (audioState.context.state === "suspended") await audioState.context.resume();
}

async function toggleAudio() {
  audioState.enabled = !audioState.enabled;
  if (!audioState.started && audioState.enabled) {
    await ensureAmbientAudioStarted();
  } else if (audioState.context) {
    audioState.enabled ? await audioState.context.resume() : await audioState.context.suspend();
  }
  if (audioButton) audioButton.textContent = audioState.enabled ? "Tắt nhạc" : "Bật nhạc";
}

/* ════════════════════════════════════════
   ACTION HANDLER
════════════════════════════════════════ */
function handleAction(action) {
  if (action === "close-panel")      closeArtifact();
  if (action === "toggle-help")      helpPanel.hidden = !helpPanel.hidden;
  if (action === "close-help")       helpPanel.hidden = true;
  if (action === "close-newspaper")  closeNewspaper();
  if (action === "reload-newspaper") reloadNewspaper();
  if (action === "toggle-audio")     toggleAudio();
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

  // Intro splash dismiss
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
  }

  // Fullscreen listeners
  document.addEventListener("fullscreenchange", updateFullscreenButton);
  document.addEventListener("webkitfullscreenchange", updateFullscreenButton);
  updateFullscreenButton();

  // Bind VR button → fullscreen
  if (sceneEl) sceneEl.addEventListener("loaded", bindSceneFullscreenButton);
  setTimeout(bindSceneFullscreenButton, 300);
  setTimeout(bindSceneFullscreenButton, 1200);

  // Audio priming
  const primeAudio = () => ensureAmbientAudioStarted();
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
      if (!key) return;
      if (key === "newspaper") { openNewspaper(); return; }
      renderArtifact(key);
    });
  });

  // Teleportable surfaces use their own click events, with the shared mouse raycaster as fallback.
  document.querySelectorAll(".teleportable").forEach(node => {
    node.addEventListener("click", (event) => {
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

  // Also close splash on Escape / Space
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Escape" || e.key === " " || e.key === "Enter") && introSplash && !introSplash.classList.contains("is-exiting") && introSplash.style.display !== "none") {
      dismissSplash();
    }
  });

  if (gyroEnableBtn) {
    gyroEnableBtn.addEventListener("click", requestGyroPermission);
  }
  window.addEventListener("resize", updateOrientationUI, { passive: true });
  window.addEventListener("orientationchange", updateOrientationUI, { passive: true });
});
