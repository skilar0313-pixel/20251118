const TOTAL_FRAMES = 35;
let frames = [];
let currentFrame = 0;
const FRAME_INTERVAL = 100; // ms per frame
let lastFrameTime = 0;
let displayW = 200;
let displayH = 200;
let y848sound = null;
let soundPlaying = false;

function preload() {
  // Load individual frame files all0001.png ... all0035.png
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const idx = String(i).padStart(4, '0');
    frames.push(loadImage(`1/all${idx}.png`));
  }
  // Load sound file y848 (ensure path matches project)
  y848sound = loadSound('y848.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noSmooth();
  if (frames.length > 0) {
    // assume all frames same size
    displayW = frames[0].width * 4;
    displayH = frames[0].height * 4;
  }
}

function draw() {
  background('#ffcad4');
  if (frames.length === 0) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text('找不到動畫幀：請確認 `1/` 資料夾內有 all0001..all0035.png', width / 2, height / 2);
    return;
  }

  if (millis() - lastFrameTime > FRAME_INTERVAL) {
    currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
    lastFrameTime = millis();
  }

  const img = frames[currentFrame];
  image(img, width / 2, height / 2, displayW, displayH);

  // If sound not yet started, show a small hint to click/tap to enable audio
  if (y848sound && !soundPlaying) {
    push();
    fill(0, 150);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text('點擊或按任意鍵以播放音效', width / 2, height - 20);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // Start audio in response to user gesture to satisfy browser autoplay policies
  if (y848sound && !soundPlaying) {
    userStartAudio();
    // play once or loop; change to .loop() if you want continuous playback
    y848sound.play();
    soundPlaying = true;
  }
}

function keyPressed() {
  // also allow keyboard to start sound
  if (y848sound && !soundPlaying) {
    userStartAudio();
    y848sound.play();
    soundPlaying = true;
  }
}
