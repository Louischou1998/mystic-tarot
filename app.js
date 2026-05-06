'use strict';
window.onerror = (msg, src, line) => {
  document.body.insertAdjacentHTML('beforeend',
    `<div style="position:fixed;bottom:0;left:0;right:0;background:red;color:white;padding:10px;z-index:9999;font-size:12px">
      JS ERROR: ${msg} (line ${line})
    </div>`);
};
/* ============================================================
   MYSTIC TAROT · Main App
   ============================================================ */

// ── Card Data ───────────────────────────────────────────────
const MAJOR_ARCANA = [
  {
    id: 0, name: '愚者', nameEn: 'The Fool', num: 'O',
    element: '風', planet: '天王星',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
    symbol: '✦', symbolColor: '#a8d8ff',
    gradient: 'linear-gradient(160deg,#0d2b4a,#1a0040,#0a2a1a)',
    keywords: ['新開始','冒險','純真','自由','潛力'],
    upright: { title: '正位 · 新的旅程', desc: '宇宙邀請你踏上全新的旅程。此刻你如同站在懸崖邊的愚者，帶著無限可能與純真之心。放下恐懼，信任直覺，大膽邁出那一步——因為每一次偉大的冒險，都始於一個瘋狂的開始。新的機會正在召喚你，不必顧慮太多，勇往直前。' },
    reversed: { title: '逆位 · 輕率與魯莽', desc: '你可能因過於衝動而忽視了潛在的危險。此刻需要停下腳步，重新評估你的計劃。不成熟的行動可能帶來不必要的後果，請在冒險前先做好充分準備，謹慎評估風險。' }
  },
  {
    id: 1, name: '魔術師', nameEn: 'The Magician', num: 'I',
    element: '風', planet: '水星',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
    symbol: '∞', symbolColor: '#ffcc44',
    gradient: 'linear-gradient(160deg,#2d1a00,#4a1a00,#1a0040)',
    keywords: ['意志力','技能','創造','顯化','機智'],
    upright: { title: '正位 · 顯化之力', desc: '你擁有將夢想化為現實所需的一切工具。魔術師提醒你，宇宙的四大元素——風、火、水、土——都掌握在你手中。集中意志，善用你的才能與資源，你有能力創造出自己渴望的一切。' },
    reversed: { title: '逆位 · 力量虛耗', desc: '你的才能可能正在被浪費，或者你在使用它們時缺乏方向。小心欺騙與操控——不論是來自他人還是自己內心的自我欺騙。重新整頓你的意圖，讓力量回歸正軌。' }
  },
  {
    id: 2, name: '女祭司', nameEn: 'The High Priestess', num: 'II',
    element: '水', planet: '月亮',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
    symbol: '☽', symbolColor: '#c8c0ff',
    gradient: 'linear-gradient(160deg,#0d0030,#1a0050,#000d2a)',
    keywords: ['直覺','神秘','智慧','潛意識','內在聲音'],
    upright: { title: '正位 · 神秘智慧', desc: '此刻答案不在外部世界，而在你內心的深淵。女祭司守護著意識的門檻，提醒你信任直覺與內在智慧。靜下心來，聆聽那些言語無法傳遞的訊息——你比你所知道的更有智慧。' },
    reversed: { title: '逆位 · 壓抑直覺', desc: '你可能忽視了自己的直覺，過度依賴邏輯與外部意見。隱藏的秘密或被壓抑的情感正在影響你。花些時間與自己獨處，讓潛意識的訊息浮現出來。' }
  },
  {
    id: 3, name: '女皇', nameEn: 'The Empress', num: 'III',
    element: '土', planet: '金星',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',
    symbol: '♀', symbolColor: '#80ff80',
    gradient: 'linear-gradient(160deg,#0d2a00,#1a4000,#2a1a00)',
    keywords: ['豐盛','創造力','滋養','大地','美麗'],
    upright: { title: '正位 · 豐饒之母', desc: '豐盛與創造力正在你的生命中盛放。女皇代表大地之母的能量——滋養、創造與感官之樂。此刻是擁抱生命之美、照顧自己與他人的時機。你的創造力正處於巔峰，讓它自由流淌。' },
    reversed: { title: '逆位 · 過度依賴', desc: '你可能在創造力或情感上感到枯竭，也許正在忽視自我照顧。過度依賴他人或物質來獲得安全感。重新與大地建立連結，滋養自己的身心靈，才能恢復那份豐盛的能量。' }
  },
  {
    id: 4, name: '皇帝', nameEn: 'The Emperor', num: 'IV',
    element: '火', planet: '牡羊座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg',
    symbol: '♂', symbolColor: '#ff6644',
    gradient: 'linear-gradient(160deg,#2a0000,#4a1000,#1a0020)',
    keywords: ['權威','穩定','結構','領導','保護'],
    upright: { title: '正位 · 磐石之王', desc: '是時候建立秩序、掌握主導權了。皇帝的能量帶來穩定、結構與領導力。透過紀律和清晰的邊界，你能夠建立起持久的基礎。相信你的判斷，以堅定而睿智的方式掌控局勢。' },
    reversed: { title: '逆位 · 專制與失控', desc: '你可能在生活中某個領域失去了控制，或者走向另一個極端——過於強硬與獨裁。檢視你的邊界是否健康，是否允許了足夠的彈性與包容。真正的力量來自於智慧，而非強制控制。' }
  },
  {
    id: 5, name: '教皇', nameEn: 'The Hierophant', num: 'V',
    element: '土', planet: '金牛座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg',
    symbol: '✟', symbolColor: '#ffd070',
    gradient: 'linear-gradient(160deg,#1a1000,#2a1a00,#0d0030)',
    keywords: ['傳統','信仰','精神指引','學習','機構'],
    upright: { title: '正位 · 精神導師', desc: '傳統智慧與精神指引此刻對你具有重要意義。尋求來自值得信賴的導師、精神傳統或機構的指引。此刻是學習、受教、以及與更大精神社群連結的時機。尊重傳統的同時，也可以尋找其中的深層意義。' },
    reversed: { title: '逆位 · 打破桎梏', desc: '你可能正在質疑傳統規範與既定體制。這可能是個積極的信號，促使你追求個人的精神探索，而非盲目遵從教條。但也要小心不要完全拒絕所有智慧傳承，找到自己的平衡點。' }
  },
  {
    id: 6, name: '戀人', nameEn: 'The Lovers', num: 'VI',
    element: '風', planet: '雙子座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
    symbol: '❤', symbolColor: '#ff88aa',
    gradient: 'linear-gradient(160deg,#2a0015,#400020,#0d0030)',
    keywords: ['愛情','選擇','和諧','價值觀','連結'],
    upright: { title: '正位 · 神聖連結', desc: '愛、和諧與深刻的連結正在你的生命中發揮作用。戀人牌不僅代表浪漫愛情，更代表一個重要的選擇——需要你依據自己真實的價值觀做出決定。當你選擇與真實自我對齊時，宇宙將支持你。' },
    reversed: { title: '逆位 · 失衡與矛盾', desc: '關係或內心中可能存在不和諧、失衡或重要的矛盾。你可能在逃避一個困難的選擇，或者你的行動與真正的價值觀相悖。深入審視自己的心，找到真正重要的事物。' }
  },
  {
    id: 7, name: '戰車', nameEn: 'The Chariot', num: 'VII',
    element: '水', planet: '巨蟹座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    gradient: 'linear-gradient(160deg,#001a2a,#002a3a,#1a0040)',
    keywords: ['決心','勝利','意志力','控制','前進'],
    upright: { title: '正位 · 凱旋前行', desc: '勝利正在等待那些以堅定意志前進的人。戰車的能量要你駕馭衝突的力量，用紀律和意志力衝破障礙。不要讓內心的衝突使你停滯——整合你的所有面向，向目標全力奔馳。' },
    reversed: { title: '逆位 · 失去方向', desc: '你可能感到失去控制或方向感。無法整合內心衝突的力量，導致原地打轉。花時間釐清你真正想要前往的方向，重新校準你的羅盤，再出發不遲。' }
  },
  {
    id: 8, name: '力量', nameEn: 'Strength', num: 'VIII',
    element: '火', planet: '獅子座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
    symbol: '◉', symbolColor: '#ffaa44',
    gradient: 'linear-gradient(160deg,#2a1500,#3a1a00,#1a0020)',
    keywords: ['勇氣','耐心','內在力量','慈悲','自制'],
    upright: { title: '正位 · 溫柔的勇氣', desc: '真正的力量不來自於強制，而來自於內在的慈悲與耐心。此刻你正在學習以溫柔馴服自己內心的野性。你有能力以愛與包容面對最艱難的挑戰。信任你內在那份安靜而堅定的力量。' },
    reversed: { title: '逆位 · 自我懷疑', desc: '你可能正在經歷自我懷疑或對自身能力缺乏信心。壓抑憤怒或負面情緒可能正在消耗你的力量。練習自我憐憫，允許自己展現脆弱，這正是力量的另一種形式。' }
  },
  {
    id: 9, name: '隱者', nameEn: 'The Hermit', num: 'IX',
    element: '土', planet: '處女座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg',
    symbol: '☯', symbolColor: '#aaffcc',
    gradient: 'linear-gradient(160deg,#001a10,#0a200a,#0d0030)',
    keywords: ['獨處','內省','智慧','引導','尋覓'],
    upright: { title: '正位 · 孤獨的智者', desc: '此刻宇宙邀請你進入深度的內省與獨處。隱者帶著智慧之燈，在黑暗中為自己照亮道路。退出喧囂，在靜默中尋找真理。你需要的答案，都在你的內心深處等待著你。' },
    reversed: { title: '逆位 · 孤立與逃避', desc: '過度的孤立可能正在讓你與世界斷開連結，陷入過分的自我封閉。另一方面，你可能逃避了必要的獨處與自我反省。找到社交與獨處之間的平衡點，既連結世界，也與自我連結。' }
  },
  {
    id: 10, name: '命運之輪', nameEn: 'Wheel of Fortune', num: 'X',
    element: '火', planet: '木星',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg',
    symbol: '⊕', symbolColor: '#ffdd88',
    gradient: 'linear-gradient(160deg,#1a1a00,#2a2000,#0d0030)',
    keywords: ['命運','轉折','循環','機遇','業力'],
    upright: { title: '正位 · 命運轉輪', desc: '命運之輪正在轉動，帶來一個重要的轉折點或幸運的機遇。宇宙的週期規律提醒我們：一切皆在流動之中。抓住眼前的機會，同時接受你無法控制的一切。好運正在你的路上。' },
    reversed: { title: '逆位 · 逆境與阻礙', desc: '命運似乎暫時轉向逆境，你可能感到運氣不佳或事事不順。記住輪轉的本質——低谷之後必有高峰。此刻最重要的是從逆境中汲取教訓，為下一次的轉機做好準備。' }
  },
  {
    id: 11, name: '正義', nameEn: 'Justice', num: 'XI',
    element: '風', planet: '天秤座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg',
    symbol: '⚖', symbolColor: '#88aaff',
    gradient: 'linear-gradient(160deg,#001030,#001a40,#100020)',
    keywords: ['公平','真相','因果','平衡','責任'],
    upright: { title: '正位 · 天平的裁決', desc: '真相與公平將在此刻得到彰顯。正義提醒我們：因果法則始終運作，每一個行動都有其對應的後果。此刻需要誠實面對自己，承擔責任，做出公正的決定。真相將使你自由。' },
    reversed: { title: '逆位 · 不公與逃避', desc: '你可能正在面對不公正的對待，或者你自己正在逃避某些後果與責任。不誠實或不公正的行為可能正在侵蝕你的內心。面對真相，承擔責任，是恢復平衡的唯一途徑。' }
  },
  {
    id: 12, name: '倒吊人', nameEn: 'The Hanged Man', num: 'XII',
    element: '水', planet: '海王星',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg',
    symbol: '☊', symbolColor: '#88ffcc',
    gradient: 'linear-gradient(160deg,#001a1a,#002a2a,#0d0030)',
    keywords: ['暫停','放下','犧牲','新視角','等待'],
    upright: { title: '正位 · 懸置的智慧', desc: '倒吊人自願懸掛，以新的角度觀看世界。此刻宇宙要你暫停腳步，放下對結果的執著。有些事情需要時間醞釀，強求只會徒增阻礙。在等待中放下，在放下中獲得前所未有的洞見。' },
    reversed: { title: '逆位 · 無效犧牲', desc: '你可能陷入停滯卻沒有獲得任何洞見，或者正在做出不必要的犧牲。是時候從那個不服務你的「懸吊」狀態中釋放自己了。採取行動，結束無意義的等待，繼續前行。' }
  },
  {
    id: 13, name: '死神', nameEn: 'Death', num: 'XIII',
    element: '水', planet: '天蠍座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg',
    symbol: '🌙', symbolColor: '#cc88ff',
    gradient: 'linear-gradient(160deg,#0d0020,#1a0030,#000d0d)',
    keywords: ['轉化','結束','新生','蛻變','放下過去'],
    upright: { title: '正位 · 蛻變之時', desc: '死神牌不代表肉體死亡，而代表深刻的蛻變與轉化。某個舊的階段正在走向終結，為新的可能性騰出空間。雖然告別令人難受，但這是必要的轉化。放下過去，以開放的心迎接即將到來的新生。' },
    reversed: { title: '逆位 · 拒絕改變', desc: '你可能正在抗拒生命中必要的改變，緊抓著已經不再服務你的事物不放。這種抗拒正在阻礙你的成長與前進。勇敢地讓那些已完成使命的事物離去，轉化才能真正發生。' }
  },
  {
    id: 14, name: '節制', nameEn: 'Temperance', num: 'XIV',
    element: '火', planet: '射手座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg',
    symbol: '△▽', symbolColor: '#aaffaa',
    gradient: 'linear-gradient(160deg,#001a10,#0a2a00,#00101a)',
    keywords: ['平衡','耐心','調和','療癒','中庸'],
    upright: { title: '正位 · 調和之道', desc: '節制天使在兩個杯子間流動著液體，象徵著完美的平衡與調和。你正在學習如何融合生命中看似對立的面向，找到中道。耐心與平靜是此刻最大的智慧，療癒正在緩緩發生。' },
    reversed: { title: '逆位 · 失衡與過度', desc: '生活中可能存在嚴重的失衡，某些領域過度，某些領域匱乏。你可能正在走極端，無法找到健康的中道。重新審視你的習慣與選擇，尋求更健康、更持久的平衡方式。' }
  },
  {
    id: 15, name: '惡魔', nameEn: 'The Devil', num: 'XV',
    element: '土', planet: '摩羯座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',
    symbol: '⛧', symbolColor: '#ff4444',
    gradient: 'linear-gradient(160deg,#1a0000,#2a0010,#0d0010)',
    keywords: ['束縛','物質執著','上癮','陰影','解放'],
    upright: { title: '正位 · 鎖鏈的幻象', desc: '惡魔牌揭示了那些束縛你的鎖鏈——但仔細看，那些鎖鏈是鬆的，你隨時可以離開。你是否被某種恐懼、上癮或物質執著所控制？認識這個陰影，是解放自己的第一步。你比你想像的更自由。' },
    reversed: { title: '逆位 · 掙脫枷鎖', desc: '你正在從某種束縛、上癮或有害的模式中解放自己。這需要勇氣，但你已經在這條路上了。繼續剪斷那些不再服務你的鎖鏈，重新找回自由與自主的力量。' }
  },
  {
    id: 16, name: '塔', nameEn: 'The Tower', num: 'XVI',
    element: '火', planet: '火星',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
    symbol: '⚡', symbolColor: '#ffaa00',
    gradient: 'linear-gradient(160deg,#1a0a00,#2a0800,#0d0020)',
    keywords: ['突變','衝擊','崩潰','啟示','解放'],
    upright: { title: '正位 · 閃電的啟示', desc: '閃電擊中高塔，粉碎了建立在虛假基礎上的一切。雖然這種崩塌令人震驚，但它的目的是清除那些阻礙你真正成長的障礙。廢墟中藏著重建的機會，被閃電照亮的真相，是無可替代的禮物。' },
    reversed: { title: '逆位 · 逃避崩塌', desc: '你可能在試圖阻止一場不可避免的崩塌，或者正在走出一段動盪時期的另一端。雖然最壞的時刻已過，但請學習這段經歷帶來的教訓，避免在同樣虛假的基礎上重建。' }
  },
  {
    id: 17, name: '星星', nameEn: 'The Star', num: 'XVII',
    element: '風', planet: '水瓶座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',
    symbol: '★', symbolColor: '#aaddff',
    gradient: 'linear-gradient(160deg,#001a2a,#001030,#0a0020)',
    keywords: ['希望','療癒','靈感','更新','信念'],
    upright: { title: '正位 · 希望之光', desc: '在最黑暗的夜空中，星星始終閃耀。星星牌帶來希望、療癒與靈感的訊息。經歷了風浪之後，寧靜的療癒時光已經到來。對未來懷抱希望，相信宇宙正在帶你走向更美好的地方。' },
    reversed: { title: '逆位 · 失去希望', desc: '你可能正在經歷一段信念動搖、失去方向感的時期。過去的傷痛也許讓你難以再次相信美好的可能性。請記住，星光不因雲層遮蔽而消失——希望仍在，請溫柔地對待自己，慢慢療癒。' }
  },
  {
    id: 18, name: '月亮', nameEn: 'The Moon', num: 'XVIII',
    element: '水', planet: '雙魚座',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',
    symbol: '☾', symbolColor: '#ccbbff',
    gradient: 'linear-gradient(160deg,#080020,#100028,#001015)',
    keywords: ['幻象','恐懼','潛意識','直覺','迷霧'],
    upright: { title: '正位 · 夜的迷霧', desc: '月亮的光芒神秘而不穩定，事物的真相在迷霧中顯得模糊。此刻你可能面臨幻象、恐懼或潛意識中的不安。不要輕信表面的一切，也不要讓恐懼主導你的決定。穿越迷霧，直覺將是你最可靠的嚮導。' },
    reversed: { title: '逆位 · 迷霧散去', desc: '困惑與混亂正在緩緩消散，真相開始浮出水面。那些長期困擾你的恐懼或幻象，即將被清晰所取代。信任這個澄清的過程，讓內心的直覺引領你走向更清明的狀態。' }
  },
  {
    id: 19, name: '太陽', nameEn: 'The Sun', num: 'XIX',
    element: '火', planet: '太陽',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
    symbol: '☀', symbolColor: '#ffdd44',
    gradient: 'linear-gradient(160deg,#2a1a00,#3a2000,#1a0020)',
    keywords: ['喜悅','成功','活力','清晰','豐盛'],
    upright: { title: '正位 · 光輝普照', desc: '太陽牌是塔羅中最幸福的牌之一，帶來喜悅、成功與充沛的活力。你的生命正沐浴在溫暖的陽光之下，一切都清晰而充滿可能。享受這段充滿光輝的時光，讓你的喜悅感染周遭的每一個人。' },
    reversed: { title: '逆位 · 陽光暫隱', desc: '太陽的光芒暫時被遮蔽，喜悅感可能不那麼強烈或持久。你可能對自己或未來過於悲觀。記住，雲彩只是暫時的，太陽始終在雲後閃耀。重新連結你內心的光，讓它從內而外地照耀出來。' }
  },
  {
    id: 20, name: '審判', nameEn: 'Judgement', num: 'XX',
    element: '火', planet: '冥王星',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg',
    symbol: '♦', symbolColor: '#ff8866',
    gradient: 'linear-gradient(160deg,#1a0800,#2a0a00,#0d0030)',
    keywords: ['覺醒','更新','召喚','寬恕','啟示'],
    upright: { title: '正位 · 靈魂的召喚', desc: '審判的號角響起，召喚你從舊的自我中覺醒。這是一個深刻的精神覺醒時刻——放下過去的錯誤與遺憾，寬恕自己與他人，以清白的心回應宇宙的呼喚。你的靈魂已準備好迎接全新的使命。' },
    reversed: { title: '逆位 · 自我審判', desc: '過度嚴苛的自我批判或拒絕反省，都在阻礙你的靈性成長。你可能正在拒絕聆聽來自更高層次的呼喚，或者困於對過去的悔恨無法自拔。請以慈悲的心寬待自己，覺醒的道路始終向你敞開。' }
  },
  {
    id: 21, name: '世界', nameEn: 'The World', num: 'XXI',
    element: '土', planet: '土星',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg',
    symbol: '⊛', symbolColor: '#88ffdd',
    gradient: 'linear-gradient(160deg,#001a15,#0a2a20,#0d0030)',
    keywords: ['完成','整合','成就','圓滿','旅程終點'],
    upright: { title: '正位 · 圓滿的完成', desc: '你已到達一個重要旅程的終點，值得慶祝這份完整與成就。世界牌代表宇宙的整合與圓滿——你已經學到了所有必要的課題，將它們融入你的存在。此刻是慶祝、感恩，並準備展開下一段嶄新旅程的時刻。' },
    reversed: { title: '逆位 · 尚未完成', desc: '你可能在某件重要的事情完成之前就過早地停下了腳步，或者走了一些捷徑，留下了未竟的功課。花些時間真正完成手上的工作，確保已從這段旅程中汲取了所有必要的智慧，再踏上新的道路。' }
  }
];

// 合併大小阿爾克納成完整 78 張牌組
const ALL_CARDS = [...MAJOR_ARCANA, ...(typeof MINOR_ARCANA !== 'undefined' ? MINOR_ARCANA : [])];
ALL_CARDS.forEach(card => {
  card.remoteImage = card.image;
  card.image = `assets/cards/${card.id}.png`;
});

const SPREAD_CONFIGS = {
  single: { count: 1, positions: ['今日指引'] },
  three:  { count: 3, positions: ['過去', '現在', '未來'] },
  celtic: { count: 5, positions: ['自我核心', '外在挑戰', '潛意識', '行動建議', '最終結果'] }
};

// ── State ────────────────────────────────────────────────────
const state = {
  currentSpread: null,
  drawnCards: [],
  selectedIndices: [],
  shuffledDeck: [],
  meaningsById: new Map(),
  phase: 'loading'
};

const ASPECT_LABELS = {
  love: '愛情',
  career: '事業',
  money: '財運',
  relationship: '人際',
  health: '健康',
  advice: '建議',
  warning: '警示',
  past: '過去',
  present: '現在',
  future: '未來',
  situation: '處境',
  challenge: '挑戰',
  suggestion: '行動建議'
};

const DEFAULT_ASPECT_KEYS = ['love', 'career', 'money', 'relationship', 'health', 'advice', 'warning'];
const ALL_ASPECT_KEYS = Object.keys(ASPECT_LABELS);

// ── DOM Refs ─────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const screens = {
  loading:   $('loadingScreen'),
  welcome:   $('welcomeScreen'),
  spread:    $('spreadScreen'),
  shuffle:   $('shuffleScreen'),
  selection: $('selectionScreen'),
  reading:   $('readingScreen'),
  chat:      $('chatScreen')
};

// ── Screen Navigation ─────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s?.classList.remove('active'));
  if (screens[name]) {
    screens[name].classList.add('active');
    screens[name].scrollTop = 0;
  }
  state.phase = name;
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

async function loadFullMeanings() {
  try {
    const res = await fetch('assets/data/tarot-meanings-full.json?v=2');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const meanings = await res.json();
    state.meaningsById = new Map(meanings.map(item => [item.id, item]));
  } catch (err) {
    console.warn('完整牌義資料載入失敗，改用內建短解讀。', err);
  }
}

function getEnhancedMeaning(card, reversed) {
  const enhanced = state.meaningsById.get(card.id);
  if (enhanced) return reversed ? enhanced.reversed : enhanced.upright;

  const fallback = reversed ? card.reversed : card.upright;
  return {
    title: fallback.title,
    meaning: fallback.desc,
    keywords: card.keywords || [],
    aspects: {}
  };
}

function getAspectKeysForPosition(spread, index) {
  if (spread === 'single') return ['advice', 'warning', 'health'];
  if (spread === 'three') return [
    ['past', 'relationship', 'love'],
    ['present', 'situation', 'challenge'],
    ['future', 'suggestion', 'career']
  ][index] || DEFAULT_ASPECT_KEYS;
  if (spread === 'celtic') return [
    ['situation', 'health', 'relationship'],
    ['challenge', 'warning', 'career'],
    ['present', 'love', 'money'],
    ['advice', 'suggestion', 'career'],
    ['future', 'money', 'relationship']
  ][index] || DEFAULT_ASPECT_KEYS;
  return DEFAULT_ASPECT_KEYS;
}

function buildAspectGrid(aspects, keys, className = 'aspect-grid') {
  const entries = keys
    .filter(key => aspects?.[key])
    .map(key => `
      <div class="aspect-item">
        <div class="aspect-label">${ASPECT_LABELS[key]}</div>
        <div class="aspect-text">${escapeHTML(aspects[key])}</div>
      </div>
    `);

  return entries.length ? `<div class="${className}">${entries.join('')}</div>` : '';
}

// ── Canvas Starfield ─────────────────────────────────────────
const canvas = $('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [], shootingStars = [], animFrame;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = Array.from({ length: 220 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random(),
    speed: Math.random() * 0.008 + 0.003,
    phase: Math.random() * Math.PI * 2
  }));
}

function spawnShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    vx: (Math.random() * 4 + 3) * (Math.random() < 0.5 ? 1 : -1),
    vy: Math.random() * 3 + 2,
    life: 1, decay: Math.random() * 0.02 + 0.015,
    len: Math.random() * 80 + 40
  });
}

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    const a = (Math.sin(t * s.speed + s.phase) + 1) / 2 * 0.8 + 0.1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,180,255,${a})`;
    ctx.fill();
  });
  shootingStars = shootingStars.filter(ss => {
    ss.x += ss.vx; ss.y += ss.vy; ss.life -= ss.decay;
    if (ss.life <= 0) return false;
    const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * ss.len / 5, ss.y - ss.vy * ss.len / 5);
    grad.addColorStop(0, `rgba(255,240,180,${ss.life})`);
    grad.addColorStop(1, 'rgba(255,240,180,0)');
    ctx.beginPath();
    ctx.moveTo(ss.x, ss.y);
    ctx.lineTo(ss.x - ss.vx * ss.len / 5, ss.y - ss.vy * ss.len / 5);
    ctx.strokeStyle = grad; ctx.lineWidth = 1.5 * ss.life;
    ctx.stroke();
    return true;
  });
}

let lastShoot = 0;
function animateCanvas(t) {
  drawStars(t * 0.001);
  if (t - lastShoot > 3500 + Math.random() * 4000) { spawnShootingStar(); lastShoot = t; }
  animFrame = requestAnimationFrame(animateCanvas);
}

// ── Loading ───────────────────────────────────────────────────
function runLoading() {
  const bar = $('loadingBar');
  let p = 0;
  const iv = setInterval(() => {
    p = Math.min(p + 8, 100);
    if (bar) bar.style.width = p + '%';
    if (p >= 100) {
      clearInterval(iv);
      showScreen('welcome');
    }
  }, 80);
}

// ── Particles ─────────────────────────────────────────────────
function spawnParticles() {
  const container = $('particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left:${Math.random()*100}%;
      bottom:${Math.random()*30}%;
      --dur:${5+Math.random()*8}s;
      --delay:${Math.random()*6}s;
      --driftX:${(Math.random()-0.5)*80}px;
      width:${1+Math.random()*3}px;
      height:${1+Math.random()*3}px;
      background:${Math.random()<0.5?'var(--gold)':'var(--violet)'};
    `;
    container.appendChild(p);
  }
}

// ── Spread Selection ──────────────────────────────────────────
document.querySelectorAll('.spread-card').forEach(el => {
  el.addEventListener('click', () => {
    const spread = el.dataset.spread;
    state.currentSpread = spread;
    showScreen('shuffle');
    const cfg = SPREAD_CONFIGS[spread];
    $('shuffleSub').textContent = `深呼吸，將你的問題注入牌組中⋯⋯ (${cfg.count} 張牌陣)`;
    resetShuffleScreen();
  });
});

// ── Shuffle ───────────────────────────────────────────────────
// deckPhase: 'idle' | 'shuffling' | 'ready'
let deckPhase = 'idle';

function resetShuffleScreen() {
  $('deckStack').querySelectorAll('.deck-layer').forEach(l => l.style.animation = '');
  $('shuffleFx').classList.add('hidden');
  $('deckCta').textContent = '點擊牌組以洗牌';
  $('deckCta').style.opacity = '1';
  state.shuffledDeck = [];
  deckPhase = 'idle';
}

$('deckZone').addEventListener('click', () => {
  if (deckPhase === 'idle')     { performShuffle(); return; }
  if (deckPhase === 'ready')    { buildFan(); showScreen('selection'); }
});

function performShuffle() {
  deckPhase = 'shuffling';
  const layers = $('deckStack').querySelectorAll('.deck-layer');
  $('shuffleFx').classList.remove('hidden');
  $('deckCta').style.opacity = '0';

  const angles = [
    { sx: '60px',  sy: '-80px', sr: '20deg'  },
    { sx: '-55px', sy: '-70px', sr: '-15deg' },
    { sx: '80px',  sy: '-50px', sr: '25deg'  },
    { sx: '-70px', sy: '-60px', sr: '-20deg' },
    { sx: '50px',  sy: '-90px', sr: '10deg'  }
  ];

  layers.forEach((l, i) => {
    const a = angles[i];
    l.style.setProperty('--sx', a.sx);
    l.style.setProperty('--sy', a.sy);
    l.style.setProperty('--sr', a.sr);
    l.style.animation = `deckShuffle 0.5s ease ${i * 0.08}s both`;
  });

  setTimeout(() => {
    layers.forEach(l => l.style.animation = '');
    $('shuffleFx').classList.add('hidden');
    $('deckCta').textContent = '✦ 牌組已洗好 · 點擊開始抽牌 ✦';
    $('deckCta').style.opacity = '1';
    state.shuffledDeck = fisherYates([...ALL_CARDS]);
    deckPhase = 'ready';
  }, 1000);
}

// ── Fisher-Yates Shuffle（crypto 隨機）────────────────────────
function cryptoRandom() {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / (0xFFFFFFFF + 1);
}

function fisherYates(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(cryptoRandom() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── Build Fan ─────────────────────────────────────────────────
function buildFan() {
  const fan = $('fanContainer');
  fan.innerHTML = '';
  state.selectedIndices = [];
  state.drawnCards = [];

  const count = state.shuffledDeck.length;
  const fanSpread = Math.min(count, 22);
  const totalAngle = 55;
  const startAngle = -totalAngle / 2;
  const centerX = fan.offsetWidth / 2 || window.innerWidth / 2;

  for (let i = 0; i < fanSpread; i++) {
    const angle = startAngle + (totalAngle / (fanSpread - 1)) * i;
    const rad = angle * Math.PI / 180;
    const offsetX = Math.sin(rad) * 180;
    const tx = centerX - 45 + offsetX;
    const card = document.createElement('div');
    card.className = 'fan-card';
    card.dataset.index = i;
    const baseTransform = `translateX(${offsetX}px) rotate(${angle}deg)`;
    card.style.cssText = `
      left: calc(50% - 45px + ${offsetX}px);
      transform: rotate(${angle}deg);
      --base-transform: ${baseTransform};
      z-index: ${i};
      transition-delay: ${i * 0.018}s;
    `;
    card.addEventListener('click', () => onFanCardClick(card, i));
    fan.appendChild(card);
  }
  updateSelStatus();
}

function onFanCardClick(card, idx) {
  const cfg = SPREAD_CONFIGS[state.currentSpread];
  if (card.classList.contains('selected')) return;
  if (state.selectedIndices.length >= cfg.count) return;

  card.classList.add('selected');
  state.selectedIndices.push(idx);
  updateSelStatus();

  if (state.selectedIndices.length === cfg.count) {
    state.drawnCards = state.selectedIndices.map(i => ({
      card: state.shuffledDeck[i],
      reversed: cryptoRandom() < 0.3
    }));
    setTimeout(() => buildReadingScreen(), 600);
  }
}

function updateSelStatus() {
  const cfg = SPREAD_CONFIGS[state.currentSpread];
  const done = state.selectedIndices.length;
  const need = cfg.count;
  $('selStatus').textContent = done < need
    ? `已選 ${done} / ${need} 張 · 繼續感受牌的召喚`
    : `✦ 命運已定 ✦ 正在揭示中⋯⋯`;
  $('selTitle').textContent = done < need ? 'DRAW YOUR CARDS' : 'THE FATE IS SET';
  $('selSub').textContent = done < need
    ? `感受每張牌的能量，選擇呼喚你的那一張`
    : `你選擇的道路已清晰顯現`;
}

window.handleCardImageError = function handleCardImageError(img) {
  const fallbackSrc = img.dataset.fallbackSrc;
  if (fallbackSrc && img.src !== fallbackSrc && !img.dataset.fallbackTried) {
    img.dataset.fallbackTried = '1';
    img.src = fallbackSrc;
    return;
  }

  const fallback = img.nextElementSibling;
  img.onerror = null;
  img.style.display = 'none';
  if (fallback) fallback.style.display = 'flex';
};

// ── Reading Screen ────────────────────────────────────────────
function buildReadingScreen() {
  showScreen('reading');
  buildRevealedCards();
  buildReadingDetail();
}

function buildRevealedCards() {
  const container = $('revealedCards');
  container.innerHTML = '';
  const cfg = SPREAD_CONFIGS[state.currentSpread];

  state.drawnCards.forEach(({ card, reversed }, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'reveal-card-wrap';
    wrap.style.animationDelay = `${i * 0.15}s`;

    const posLabel = document.createElement('div');
    posLabel.className = 'reveal-pos-label';
    posLabel.textContent = cfg.positions[i];

    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';

    const flipInner = document.createElement('div');
    flipInner.className = 'flip-inner';

    flipInner.innerHTML = `
      <div class="flip-back">
        <div class="flip-back-inner">✦</div>
      </div>
      <div class="flip-front">
        ${reversed ? '<div class="card-reversed-badge">逆位</div>' : ''}
        <div class="card-face${reversed ? ' reversed' : ''}">
          <div class="card-face-art">
            <img class="card-face-img" src="${card.image}" data-fallback-src="${card.remoteImage || ''}" alt="${card.name}" onerror="handleCardImageError(this)">
            <span class="card-face-symbol" style="display:none;color:${card.symbolColor}">${card.symbol}</span>
          </div>
          <div class="card-face-bottom">
            <div class="card-face-num">${card.num}</div>
            <div class="card-face-name">${card.name}</div>
          </div>
        </div>
      </div>
    `;

    flipCard.addEventListener('click', () => openCardExpand(card, reversed));
    flipCard.appendChild(flipInner);
    wrap.appendChild(posLabel);
    wrap.appendChild(flipCard);
    container.appendChild(wrap);

    setTimeout(() => flipInner.classList.add('flipped'), 300 + i * 500);
  });
}

function buildReadingDetail() {
  const detail = $('readingDetail');
  detail.innerHTML = '';
  const cfg = SPREAD_CONFIGS[state.currentSpread];

  state.drawnCards.forEach(({ card, reversed }, i) => {
    const interp = getEnhancedMeaning(card, reversed);
    const aspectKeys = getAspectKeysForPosition(state.currentSpread, i);
    const div = document.createElement('div');
    div.className = 'reading-card-detail';
    div.style.animationDelay = `${0.3 + i * 0.5}s`;
    div.innerHTML = `
      <div class="rd-position">${escapeHTML(cfg.positions[i])}</div>
      <div class="rd-card-name">${escapeHTML(card.num)} · ${escapeHTML(card.name)} ${reversed ? '（逆位）' : ''}</div>
      <div class="rd-card-name-en">${escapeHTML(card.nameEn)} · ${escapeHTML(card.element)}${card.planet ? ' · ' + escapeHTML(card.planet) : ''}</div>
      <div class="rd-keywords">
        ${(interp.keywords || card.keywords || []).map(k => `<span class="rd-kw">${escapeHTML(k)}</span>`).join('')}
      </div>
      <div class="rd-interp-title">${escapeHTML(interp.title)}</div>
      <div class="rd-interp-text">${escapeHTML(interp.meaning)}</div>
      ${buildAspectGrid(interp.aspects, aspectKeys, 'aspect-grid rd-aspect-grid')}
    `;
    detail.appendChild(div);
  });

  const summary = document.createElement('div');
  summary.className = 'reading-summary';
  summary.style.animationDelay = `${0.3 + state.drawnCards.length * 0.5}s`;
  summary.innerHTML = `
    <div class="summary-title cinzel">✦ 整體解讀 ✦</div>
    <div class="summary-text noto">${buildSummary()}</div>
  `;
  detail.appendChild(summary);
}

function buildSummary() {
  const cards = state.drawnCards;
  const spread = state.currentSpread;
  if (spread === 'single') {
    const { card, reversed } = cards[0];
    const interp = getEnhancedMeaning(card, reversed);
    return `今日宇宙透過「${card.name}」牌向你傳遞訊息。${reversed ? '逆位的' : ''}${card.name}提醒你：${interp.meaning.slice(0, 60)}⋯⋯ 請在今天的行動中帶著這份洞見前行。`;
  }
  if (spread === 'three') {
    const names = cards.map(c => c.card.name);
    return `你的時間之流牌陣顯示：過去的「${names[0]}」塑造了你的現狀；現在的「${names[1]}」是你當前需要面對的核心課題；而「${names[2]}」則指引著你即將走向的未來。三張牌合而觀之，你正處在一個重要的生命轉折點上，過去的經歷正在匯聚為現在的力量，引導你走向一個充滿可能的未來。`;
  }
  if (spread === 'celtic') {
    const names = cards.map(c => c.card.name);
    return `你的命運之星牌陣揭示了一幅完整的靈魂圖景：「${names[0]}」是你此刻的核心能量；「${names[1]}」代表外在的挑戰與機遇；「${names[2]}」揭示了潛意識中的力量；「${names[3]}」給予你具體的行動建議；最終「${names[4]}」指向這段旅程可能的結果。五張牌共同描繪出你靈魂此刻的全貌，在挑戰中蘊含著深刻的成長契機。`;
  }
  return '';
}

// ── Card Expand Panel ─────────────────────────────────────────
function openCardExpand(card, reversed) {
  const panel = $('cardExpandPanel');
  const interp = getEnhancedMeaning(card, reversed);
  const expandImg = $('expandImg');
  const expandImgWrap = $('expandImgWrap');
  let expandSymbol = $('expandSymbol');
  if (!expandSymbol) {
    expandSymbol = document.createElement('span');
    expandSymbol.id = 'expandSymbol';
    expandSymbol.className = 'expand-symbol';
    expandImgWrap.appendChild(expandSymbol);
  }
  expandImg.style.display = 'block';
  expandSymbol.style.display = 'none';
  expandSymbol.textContent = card.symbol;
  expandSymbol.style.color = card.symbolColor;
  expandImg.onerror = () => {
    if (card.remoteImage && expandImg.src !== card.remoteImage && !expandImg.dataset.fallbackTried) {
      expandImg.dataset.fallbackTried = '1';
      expandImg.src = card.remoteImage;
      return;
    }

    expandImg.onerror = null;
    expandImg.style.display = 'none';
    expandSymbol.style.display = 'flex';
  };
  expandImg.dataset.fallbackTried = '';
  expandImg.src = card.image;
  expandImg.alt = card.name;
  expandImgWrap.className = 'expand-img-wrap' + (reversed ? ' rev' : '');
  $('expandName').textContent = `${card.num} · ${card.name}${reversed ? '（逆位）' : ''}`;
  $('expandSub').textContent = `${card.nameEn}${card.suit ? ' · ' + card.suit : ''} · ${card.element}`;
  $('expandKws').innerHTML = (interp.keywords || card.keywords || []).map(k => `<span class="expand-kw">${escapeHTML(k)}</span>`).join('');
  $('expandTitle').textContent = interp.title;
  $('expandDesc').textContent = interp.meaning;
  $('expandAspects').innerHTML = buildAspectGrid(interp.aspects, ALL_ASPECT_KEYS, 'aspect-grid expand-aspect-grid');
  panel.classList.add('open');
}

$('cardExpandPanel').addEventListener('click', e => {
  if (e.target === $('cardExpandPanel') || e.target === $('expandClose')) {
    $('cardExpandPanel').classList.remove('open');
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') $('cardExpandPanel').classList.remove('open');
});

// ── Button Events ─────────────────────────────────────────────
$('startBtn').addEventListener('click', () => showScreen('spread'));
$('backToWelcome').addEventListener('click', () => showScreen('welcome'));
$('chatBtn').addEventListener('click', () => showScreen('chat'));
$('chatBackBtn').addEventListener('click', () => showScreen('welcome'));

$('newReadingBtn').addEventListener('click', () => {
  state.currentSpread = null;
  state.drawnCards = [];
  state.selectedIndices = [];
  state.shuffledDeck = [];
  showScreen('welcome');
});

// ── Keyboard Nav ──────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (state.phase === 'reading')   showScreen('welcome');
    if (state.phase === 'selection') showScreen('shuffle');
    if (state.phase === 'shuffle')   showScreen('spread');
    if (state.phase === 'spread')    showScreen('welcome');
  }
});

// ── Chat ──────────────────────────────────────────────────────
const API_URL = `${window.location.origin}/api/chat`;
const chatHistory = [];
let isStreaming = false;

function renderBubbleContent(text, isStreaming = false) {
  const parsed = text.replace(/\[CARD:([^:\]]+):([^\]]+)\]/g, (_, name, orientation) => {
    const card = ALL_CARDS.find(c => c.name === name.trim());
    const rev = orientation.trim() === '逆位';
    if (!card) return `<strong>【${name.trim()} · ${orientation.trim()}】</strong>`;
    // 串流中加 no-anim 避免閃動，串流結束後移除讓動畫正常播放
    const imgStyle = `width:100%;height:100%;object-fit:contain;display:block;transform:rotate(${rev?180:0}deg)`;
    const fallback = `this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex'`;
    return `<div class="inline-card${isStreaming ? ' no-anim' : ''}">
      <div class="ic-art">
        <img src="${card.image}" alt="" style="${imgStyle}" onerror="${fallback}">
        <span class="ic-symbol" style="display:none;color:${card.symbolColor}">${card.symbol}</span>
      </div>
      <div class="ic-name">${card.num} · ${card.name}<br><small>${orientation.trim()}</small></div>
    </div>`;
  });
  return parsed.replace(/\n/g, '<br>');
}

function appendMessage(role, text, id) {
  const messages = $('chatMessages');
  const wrap = document.createElement('div');
  wrap.className = `chat-msg ${role === 'user' ? 'user-msg' : 'oracle-msg'}`;
  if (id) wrap.id = id;
  if (role === 'oracle') {
    wrap.innerHTML = `
      <div class="msg-avatar-icon">👁</div>
      <div class="msg-bubble noto">${renderBubbleContent(text)}</div>`;
  } else {
    wrap.innerHTML = `<div class="msg-bubble noto">${text}</div>`;
  }
  messages.appendChild(wrap);
  messages.scrollTop = messages.scrollHeight;
  return wrap;
}

function updateOracleMessage(id, text, isStreaming = false) {
  const el = $(id);
  if (el) {
    el.querySelector('.msg-bubble').innerHTML = renderBubbleContent(text, isStreaming);
    $('chatMessages').scrollTop = $('chatMessages').scrollHeight;
  }
}

function showTyping() {
  const messages = $('chatMessages');
  const wrap = document.createElement('div');
  wrap.className = 'chat-msg oracle-msg';
  wrap.id = 'typingIndicator';
  wrap.innerHTML = `
    <div class="msg-avatar-icon">👁</div>
    <div class="msg-bubble noto typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;
  messages.appendChild(wrap);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  const el = $('typingIndicator');
  if (el) el.remove();
}

function setOracleStatus(status, thinking = false) {
  const el = $('oracleStatus');
  el.textContent = status;
  el.className = 'oracle-status noto' + (thinking ? ' thinking' : '');
}

async function sendChatMessage(userText) {
  if (isStreaming || !userText.trim()) return;
  isStreaming = true;

  const input = $('chatInput');
  const sendBtn = $('chatSendBtn');
  input.value = '';
  input.style.height = 'auto';
  sendBtn.disabled = true;
  setOracleStatus('✦ 正在感應宇宙的波頻⋯⋯', true);

  appendMessage('user', userText);
  chatHistory.push({ role: 'user', content: userText });
  showTyping();

  let fullText = '';
  const msgId = 'oracle-' + Date.now();

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    });

    if (!res.ok) throw new Error('伺服器連線失敗');

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let firstChunk = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value).split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') break;

        let parsed;
        try { parsed = JSON.parse(payload); } catch { continue; }

        if (parsed.error) throw new Error(parsed.error); // 拋給外層 catch 顯示錯誤
        if (parsed.text) {
          fullText += parsed.text;
          if (firstChunk) {
            removeTyping();
            appendMessage('oracle', fullText, msgId);
            firstChunk = false;
          } else {
            updateOracleMessage(msgId, fullText, true); // 串流中，卡片不動畫
          }
        }
      }
    }

    chatHistory.push({ role: 'assistant', content: fullText });
    // 串流完成，做最終渲染（移除 no-anim，讓卡片動畫正常播放）
    updateOracleMessage(msgId, fullText, false);
  } catch (err) {
    removeTyping();
    const errWrap = appendMessage('oracle', '', 'error-' + Date.now());
    errWrap.querySelector('.msg-bubble').innerHTML =
      `⚠ 命運之眼暫時無法回應。<br><small>請確認伺服器已啟動（npm start）並設定 API Key。<br>${err.message}</small>`;
    errWrap.querySelector('.msg-bubble').classList.add('error-bubble');
  }

  isStreaming = false;
  sendBtn.disabled = false;
  setOracleStatus('✦ 正在聆聽宇宙的聲音');
  input.focus();
}

// Quick action buttons
document.querySelectorAll('.qbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!isStreaming) sendChatMessage(btn.dataset.msg);
  });
});

// Send button
$('chatSendBtn').addEventListener('click', () => {
  sendChatMessage($('chatInput').value);
});

// Enter to send (Shift+Enter = newline)
$('chatInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage($('chatInput').value);
  }
});

// Auto-resize textarea
$('chatInput').addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

// ── Init ──────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});

resizeCanvas();
initStars();
animateCanvas(0);
spawnParticles();
loadFullMeanings();
runLoading();

// 點擊載入畫面可強制跳過
$('loadingScreen').addEventListener('click', () => showScreen('welcome'));
