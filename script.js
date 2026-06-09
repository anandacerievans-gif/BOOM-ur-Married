// ===== DATA STORAGE =====
let marriage = {
  name1: '', name2: '',
  img1: '', img2: '',
  vowStyle: 'classic'
};

// ===== VOW TEMPLATES =====
const vows = {
  classic: (a, b) => `Dearly beloved, we gather to join ${a} and ${b} in eternal love. Do you, ${a}, take ${b} to have and to hold, from this day forward, for better or worse, till death do you part? 💕`,
  chaotic: (a, b) => `Yo, we're here because ${a} looked at ${b} and went "yeah, that's the one." ${a}, do you promise to share snacks, steal blankets, and send unhinged memes to ${b} forever? 🌮`,
  object: (a, b) => `${a}, do you take ${b}, this beautiful being, in freshness and in dust, for richer flavor or for sad days, until storage do you part? The universe approves. 🧸`,
  surprise: (a, b) => `${a}. ${b}. Two souls. One destiny. Possibly cursed, definitely chaotic. By the power vested in absolutely nobody, do you accept this gloriously weird union? 🎲`
};

// ===== FUTURE CHILD DATA =====
const childNames = ['Lil Boomer', 'Sparky Jr.', 'Confetti', 'Beans', 'Captain Chaos', 'Sir Nibbles III', 'Princess Snack'];
const childTraits = [
  'inherited mom\'s laugh and dad\'s questionable taste in music',
  'glows faintly in the dark for reasons science cannot explain',
  'refuses to eat anything that isn\'t shaped like a star',
  'has already filed for emancipation (denied)',
  'will become a famous TikTok chef at age 6'
];
const lifeStories = [
  'Year 1: Pure bliss. Year 3: You adopt 4 cats. Year 7: You open a tiny bakery. Year 50: Still arguing about thermostat settings. True love. ❤️',
  'Year 2: Move to a cottage. Year 5: Win the lottery, lose the ticket. Year 10: Become local legends. Grow old laughing. 🏡',
  'Year 1: Travel the world. Year 4: Get matching tattoos. Year 9: Start a podcast nobody listens to. Happily ever after. 🌍',
  'Year 3: Build a treehouse empire. Year 6: Befriend a raccoon named Steve. Year 40: Steve\'s descendants still visit. Iconic. 🦝'
];

// ===== NAVIGATION =====
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

// ===== IMAGE PREVIEW =====
function previewImage(event, previewId) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.getElementById(previewId);
      img.src = e.target.result;
      img.style.display = 'block';
      img.previousElementSibling; // hide text
      img.nextElementSibling.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
}

// ===== START CEREMONY =====
function startCeremony() {
  marriage.name1 = document.getElementById('name1').value || 'Mystery Lover';
  marriage.name2 = document.getElementById('name2').value || 'The Chosen One';
  marriage.img1 = document.getElementById('preview1').src;
  marriage.img2 = document.getElementById('preview2').src;
  marriage.vowStyle = document.getElementById('vowStyle').value;

  const vowText = vows[marriage.vowStyle](marriage.name1, marriage.name2);
  document.getElementById('vowText').textContent = vowText;

  goTo('screen-ceremony');
}

// ===== TEXT TO SPEECH =====
function playVows() {
  stopVows();
  const text = document.getElementById('vowText').textContent;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9;
  utter.pitch = 1;
  speechSynthesis.speak(utter);
}
function stopVows() {
  speechSynthesis.cancel();
}

// ===== SEAL THE DEAL (BOOM!) =====
function sealTheDeal() {
  stopVows();
  launchConfetti();
  playClap();

  // Speak the "BOOM you're married"
  const utter = new SpeechSynthesisUtterance(
    `By the power vested in absolutely nobody, BOOM! ${marriage.name1} and ${marriage.name2}, you are now married!`
  );
  utter.rate = 1;
  speechSynthesis.speak(utter);

  // Build results
  buildResults();
  setTimeout(() => goTo('screen-results'), 1500);
}

// ===== BUILD RESULTS =====
function buildResults() {
  // Portrait
  if (marriage.img1) document.getElementById('resultImg1').src = marriage.img1;
  if (marriage.img2) document.getElementById('resultImg2').src = marriage.img2;
  document.getElementById('coupleNames').textContent = `${marriage.name1} & ${marriage.name2}`;

  // Certificate
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const time = new Date().toLocaleTimeString();
  document.getElementById('certBody').innerHTML =
    `This certifies that on ${date} at ${time},<br><br>
     <strong>${marriage.name1}</strong> 💍 <strong>${marriage.name2}</strong><br><br>
     were joined in holy matrimony by the<br>
     Universal Office of Spontaneous Commitment.<br><br>
     OFFICIANT: BOOM Bot 3000`;

  generateFuture();
}

// ===== GENERATE FUTURE =====
function generateFuture() {
  const name = childNames[Math.floor(Math.random() * childNames.length)];
  const trait = childTraits[Math.floor(Math.random() * childTraits.length)];
  const story = lifeStories[Math.floor(Math.random() * lifeStories.length)];

  document.getElementById('childName').textContent = `👶 ${name}`;
  document.getElementById('lifeStory').innerHTML =
    `Your child ${trait}.<br><br>📖 <strong>Your life together:</strong><br>${story}`;
}

// ===== CONFETTI =====
function launchConfetti() {
  const emojis = ['🎉', '💍', '🌸', '💥', '✨', '❤️'];
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti';
    conf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.top = '-50px';
    conf.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 2500);
  }
}

// ===== CLAP SOUND (using Web Audio - no file needed!) =====
function playClap() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    noise.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) { console.log('Audio not supported'); }
}

// ===== RESET =====
function resetApp() {
  marriage = { name1: '', name2: '', img1: '', img2: '', vowStyle: 'classic' };
  document.getElementById('name1').value = '';
  document.getElementById('name2').value = '';
  document.getElementById('preview1').style.display = 'none';
  document.getElementById('preview2').style.display = 'none';
  document.querySelectorAll('.upload-text').forEach(t => t.style.display = 'block');
  goTo('screen-home');
}

// ===== BACKGROUND PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  const emojis = ['💥', '💍', '🌸', '✨'];
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (Math.random() * 10 + 10) + 's';
    p.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(p);
  }
}
createParticles();