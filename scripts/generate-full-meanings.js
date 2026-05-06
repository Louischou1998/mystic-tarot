const fs = require('fs');
const vm = require('vm');

const ASPECT_KEYS = [
  'love',
  'career',
  'money',
  'relationship',
  'health',
  'advice',
  'warning',
  'past',
  'present',
  'future',
  'situation',
  'challenge',
  'suggestion'
];

function extractArray(file, name) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(new RegExp(`const\\s+${name}\\s*=\\s*(\\[[\\s\\S]*?\\n\\]);`));
  if (!match) throw new Error(`Cannot find ${name} in ${file}`);

  const context = {};
  vm.runInNewContext(`result = ${match[1]}`, context);
  return context.result;
}

function cleanSentence(text = '') {
  return String(text).replace(/\s+/g, '').split(/[。！？]/).filter(Boolean)[0] || String(text);
}

function keywordText(card) {
  return (card.keywords || []).slice(0, 3).join('、');
}

function elementHealth(card) {
  const suit = card.suit || '';
  if (suit === '權杖') return '火元素提醒你留意精力消耗、睡眠品質與衝刺後的恢復。';
  if (suit === '聖杯') return '水元素提醒你照顧情緒、睡眠與內在感受，不要讓壓抑累積成疲憊。';
  if (suit === '寶劍') return '風元素提醒你放鬆神經系統，避免焦慮、過度思考或溝通壓力耗損身心。';
  if (suit === '星幣') return '土元素提醒你回到身體、作息、飲食與現實節奏，穩定就是療癒。';
  return '這張大牌提醒你從身心靈整體檢視自己的狀態，讓內在與外在重新對齊。';
}

function buildAspects(card, reversed) {
  const name = card.name;
  const keywords = keywordText(card);
  const direction = reversed ? '逆位' : '正位';

  if (!reversed) {
    return {
      love: `${name}${direction}在愛情中帶來「${keywords}」的能量。適合真誠表達需求，讓關係朝更清楚、更自然的方向發展。`,
      career: `${name}${direction}在事業上提醒你把目前的靈感或判斷落成具體步驟。只要行動穩定，成果會逐漸成形。`,
      money: `${name}${direction}在財運上表示資源正在被重新安排。適合檢視預算、投資與付出是否符合長期目標。`,
      relationship: `${name}${direction}在人際中鼓勵你以開放但有界線的方式互動，讓連結帶來支持，而不是壓力。`,
      health: `${name}${direction}在健康面向提醒你：${elementHealth(card)}`,
      advice: `建議順著${name}${direction}的力量前進，把「${keywords}」落實成一個今天就能完成的小行動。`,
      warning: `需要避免過度理想化或急著證明自己。即使牌勢正向，也要保留觀察與調整空間。`,
      past: `過去的你已經累積了與「${keywords}」相關的經驗，這些經驗正在成為目前局勢的基礎。`,
      present: `現在的重點是看見${name}帶出的核心課題，並用穩定的態度回應眼前變化。`,
      future: `未來有機會往更成熟的階段前進。只要你持續整合「${keywords}」，結果會更清晰。`,
      situation: `目前處境的主軸是「${keywords}」。事情正在要求你更主動地理解自己的位置。`,
      challenge: `挑戰在於不要只停留在感受或想法，而是把${name}的能量轉成實際選擇。`,
      suggestion: `具體建議是先完成一件能代表「${keywords}」的小事，再根據回饋調整下一步。`
    };
  }

  return {
    love: `${name}${direction}在愛情中指出關係裡可能有誤解、壓抑或期待落差。適合先釐清真實感受，再談下一步。`,
    career: `${name}${direction}在事業上提醒你檢查方向是否偏離。暫緩衝動決策，先補足資訊與執行節奏。`,
    money: `${name}${direction}在財運上代表資源流動受阻。避免冒進花費或高風險承諾，先回到基本盤。`,
    relationship: `${name}${direction}在人際中容易出現界線混亂或溝通失焦。需要少一點猜測，多一點直接確認。`,
    health: `${name}${direction}在健康面向提醒你：${elementHealth(card)}尤其要避免長期壓力被忽略。`,
    advice: `建議先停下來整理與「${keywords}」相關的問題，找出真正卡住你的原因，再重新出發。`,
    warning: `警示是不要用逃避、逞強或過度控制來處理不安；這會讓逆位課題被放大。`,
    past: `過去可能曾在「${keywords}」上受阻或失衡，這段經驗仍影響你現在的判斷。`,
    present: `現在的重點是承認不順之處，別急著掩飾，先把狀態調回可掌握的範圍。`,
    future: `未來仍可轉圜，但需要你先修正模式，讓${name}的能量從失衡回到成熟。`,
    situation: `目前處境顯示「${keywords}」被壓抑或使用不當，事情需要更清楚的整理。`,
    challenge: `挑戰在於面對真正的限制，而不是只處理表面情緒或短期壓力。`,
    suggestion: `具體建議是先降低複雜度，處理一個最明顯的阻礙，再逐步恢復節奏。`
  };
}

const major = extractArray('app.js', 'MAJOR_ARCANA');
const minor = extractArray('cards_minor.js', 'MINOR_ARCANA');
const cards = [...major, ...minor].sort((a, b) => a.id - b.id);

if (cards.length !== 78) {
  throw new Error(`Expected 78 cards, got ${cards.length}`);
}

const full = cards.map(card => ({
  id: card.id,
  name: card.name,
  nameEn: card.nameEn,
  num: card.num,
  arcana: card.id < 22 ? 'major' : 'minor',
  suit: card.suit || null,
  element: card.element || '',
  planet: card.planet || null,
  image: `assets/cards/${card.id}.png`,
  keywords: card.keywords || [],
  summary: `${cleanSentence(card.upright?.desc || '')}。`,
  upright: {
    title: card.upright?.title || '正位',
    meaning: card.upright?.desc || '',
    keywords: card.keywords || [],
    aspects: buildAspects(card, false)
  },
  reversed: {
    title: card.reversed?.title || '逆位',
    meaning: card.reversed?.desc || '',
    keywords: card.keywords || [],
    aspects: buildAspects(card, true)
  }
}));

for (const card of full) {
  for (const side of ['upright', 'reversed']) {
    for (const key of ASPECT_KEYS) {
      if (!card[side].aspects[key] || card[side].aspects[key].includes('?')) {
        throw new Error(`Invalid ${side}.${key} for ${card.name}`);
      }
    }
  }
}

fs.mkdirSync('assets/data', { recursive: true });
fs.writeFileSync('assets/data/tarot-meanings-full.json', `${JSON.stringify(full, null, 2)}\n`, 'utf8');

console.log('WROTE assets/data/tarot-meanings-full.json');
console.log(`CARD_COUNT=${full.length}`);
console.log(`ASPECTS_PER_ORIENTATION=${ASPECT_KEYS.length}`);
