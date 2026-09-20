const state = { hue: 204, saturation: 82, lightness: 59, mode: 'complementary', language: 'en' };

const copy = {
  en: {
    navLab: 'Color lab', navPrinciples: 'Principles', eyebrow: 'A visual guide to color', headline: 'Make color<br /><em>click.</em>',
    introCopy: 'Build a palette, see the relationship, and learn the logic behind every combination.', labKicker: '01 / Choose a base', wheelTitle: 'Color wheel', live: 'Live',
    dragHint: 'Drag the marker to explore', labKicker2: '02 / Find a relationship', paletteTitle: 'Palette builder', saturation: 'Saturation', lightness: 'Lightness',
    complementary: 'Complementary', analogous: 'Analogous', triadic: 'Triadic', split: 'Split', mono: 'Mono', principlesEyebrow: 'Small rules, big difference',
    principlesTitle: 'Color is a relationship.', principle1Title: 'Hue is the family.', principle1Copy: 'Red, blue, and everything in between. Hue is where a color lives on the wheel.',
    principle2Title: 'Saturation is the voice.', principle2Copy: 'Turn it up for a vivid shout. Turn it down for a quiet, dusty conversation.',
    principle3Title: 'Lightness is the space.', principle3Copy: 'Lightness sets the atmosphere — from deep shadow to sunlit color.', footerCopy: 'A small studio for better color decisions.',
    colors: ['Base', 'Partner', 'Accent', 'Balance', 'Spark'], notes: {
      complementary: '<strong>Opposites attract.</strong> Complementary colors sit across the wheel, creating the most energetic contrast.',
      analogous: '<strong>Close companions.</strong> Analogous colors live side by side, creating a calm and naturally harmonious palette.',
      triadic: '<strong>Three-point balance.</strong> Triadic colors are evenly spaced, giving you contrast without losing cohesion.',
      split: '<strong>A softer contrast.</strong> Keep the base and use the two neighbors of its opposite for a lively, less confrontational mix.',
      mono: '<strong>One family, many moods.</strong> Change lightness and saturation to create depth without changing the hue.'
    }
  },
  bg: {
    navLab: 'Цветова лаборатория', navPrinciples: 'Принципи', eyebrow: 'Визуален наръчник за цвета', headline: 'Нека цветът<br /><em>заживее.</em>',
    introCopy: 'Създай палитра, виж връзката и разбери логиката зад всяка комбинация.', labKicker: '01 / Избери основа', wheelTitle: 'Цветен кръг', live: 'На живо',
    dragHint: 'Плъзни маркера, за да изследваш', labKicker2: '02 / Намери връзка', paletteTitle: 'Създател на палитри', saturation: 'Наситеност', lightness: 'Светлота',
    complementary: 'Комплементарни', analogous: 'Аналогови', triadic: 'Триадни', split: 'Разделени', mono: 'Моно', principlesEyebrow: 'Малки правила, голяма разлика',
    principlesTitle: 'Цветът е връзка.', principle1Title: 'Нюансът е семейството.', principle1Copy: 'Червено, синьо и всичко между тях. Нюансът показва мястото на цвета в кръга.',
    principle2Title: 'Наситеността е гласът.', principle2Copy: 'Увеличи я за ярък вик. Намали я за тиха, прашна беседа.',
    principle3Title: 'Светлотата е пространството.', principle3Copy: 'Светлотата задава атмосферата — от дълбока сянка до слънчев цвят.', footerCopy: 'Малко студио за по-добри цветови решения.',
    colors: ['Основа', 'Партньор', 'Акцент', 'Баланс', 'Искра'], notes: {
      complementary: '<strong>Противоположностите се привличат.</strong> Комплементарните цветове са от срещуположни страни на кръга и създават най-силен контраст.',
      analogous: '<strong>Близки приятели.</strong> Аналоговите цветове стоят един до друг и създават спокойна, естествено хармонична палитра.',
      triadic: '<strong>Баланс в три точки.</strong> Триадните цветове са равномерно разположени — контрастни, но сплотени.',
      split: '<strong>По-мек контраст.</strong> Запази основата и използвай двата съседни цвята на нейната противоположност.',
      mono: '<strong>Едно семейство, много настроения.</strong> Променяй светлотата и наситеността, за да създадеш дълбочина.'
    }
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${[f(0), f(8), f(4)].map((value) => Math.round(255 * value).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

function getColors() {
  const { hue, saturation, lightness, mode } = state;
  const offsets = { complementary: [0, 180, 30, 210, 90], analogous: [0, 30, 60, 330, 300], triadic: [0, 120, 240, 60, 180], split: [0, 150, 210, 30, 270], mono: [0, 0, 0, 0, 0] }[mode];
  return offsets.map((offset, index) => {
    const monoLightness = mode === 'mono' ? [lightness, Math.min(82, lightness + 17), Math.max(18, lightness - 18), Math.min(90, lightness + 29), Math.max(10, lightness - 31)][index] : lightness;
    const monoSaturation = mode === 'mono' ? [saturation, Math.max(42, saturation - 12), Math.min(100, saturation + 5), Math.max(28, saturation - 24), Math.min(100, saturation + 10)][index] : saturation;
    return { h: (hue + offset) % 360, s: monoSaturation, l: monoLightness, hex: hslToHex((hue + offset) % 360, monoSaturation, monoLightness) };
  });
}

function readableText(hex) {
  const rgb = hex.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16));
  return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 > 155 ? '#0b0d12' : '#f3f1eb';
}

function updateWheel() {
  const { hue, saturation, lightness } = state;
  const base = hslToHex(hue, saturation, lightness);
  $('#colorWheel').style.background = `conic-gradient(from -90deg, ${hslToHex(0, 82, 64)}, ${hslToHex(60, 82, 64)}, ${hslToHex(120, 82, 64)}, ${hslToHex(180, 82, 64)}, ${hslToHex(240, 82, 64)}, ${hslToHex(300, 82, 64)}, ${hslToHex(360, 82, 64)})`;
  const angle = (hue - 90) * Math.PI / 180;
  $('#wheelMarker').style.left = `${50 + Math.cos(angle) * 40}%`;
  $('#wheelMarker').style.top = `${50 + Math.sin(angle) * 40}%`;
  $('#wheelMarker').style.background = base;
  $('#wheelCore').style.background = base;
  $('#wheelCore').style.color = readableText(base);
  $('#wheelCoreValue').textContent = base;
  $('#wheelDegree').textContent = `${hue}°`;
  $('#colorWheel').setAttribute('aria-valuenow', hue);
  $('#saturationValue').textContent = `${state.saturation}%`;
  $('#lightnessValue').textContent = `${state.lightness}%`;
  $('#saturation').value = state.saturation;
  $('#lightness').value = state.lightness;
}

function renderPalette() {
  const text = copy[state.language];
  const colors = getColors();
  $('#swatches').innerHTML = colors.map((color, index) => `<div class="swatch"><div class="swatch-color" style="background:${color.hex};color:${readableText(color.hex)}"><button class="copy-swatch" type="button" data-copy="${color.hex}" aria-label="Copy ${color.hex}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></div><span class="swatch-label">${color.hex}</span><span class="swatch-role">${text.colors[index]}</span></div>`).join('');
  $('#paletteNote').innerHTML = text.notes[state.mode];
  $('#paletteCount').textContent = state.language === 'en' ? '5 colors' : '5 цвята';
}

function renderLanguage() {
  const text = copy[state.language];
  document.documentElement.lang = state.language;
  $$('[data-i18n]').forEach((element) => { if (text[element.dataset.i18n]) element.innerHTML = text[element.dataset.i18n]; });
  $$('[data-lang]').forEach((element) => element.classList.toggle('is-active', element.dataset.lang === state.language));
  renderPalette();
}

function render() { updateWheel(); renderPalette(); }

function setHueFromPointer(event) {
  const rect = $('#colorWheel').getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  state.hue = Math.round((Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360);
  render();
}

$('#colorWheel').addEventListener('pointerdown', (event) => { $('#colorWheel').setPointerCapture(event.pointerId); setHueFromPointer(event); });
$('#colorWheel').addEventListener('pointermove', (event) => { if (event.buttons) setHueFromPointer(event); });
$('#colorWheel').addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') { state.hue = (state.hue + 1) % 360; render(); }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') { state.hue = (state.hue + 359) % 360; render(); }
});
$('#saturation').addEventListener('input', (event) => { state.saturation = Number(event.target.value); render(); });
$('#lightness').addEventListener('input', (event) => { state.lightness = Number(event.target.value); render(); });
$$('.mode-tab').forEach((button) => button.addEventListener('click', () => { state.mode = button.dataset.mode; $$('.mode-tab').forEach((tab) => tab.classList.toggle('is-selected', tab === button)); renderPalette(); }));
$('#languageToggle').addEventListener('click', () => { state.language = state.language === 'en' ? 'bg' : 'en'; renderLanguage(); });
document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  await navigator.clipboard?.writeText(button.dataset.copy);
  button.setAttribute('aria-label', state.language === 'en' ? 'Copied' : 'Копирано');
  button.style.opacity = '1';
  setTimeout(() => { button.setAttribute('aria-label', `Copy ${button.dataset.copy}`); button.style.opacity = ''; }, 1100);
});

renderLanguage();
