// Minor Arcana — 56 張小阿爾克納
const MINOR_ARCANA = [
  {
    id: 22, name: '權杖王牌', nameEn: 'Ace of Wands', num: 'A',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/92/RWS_Tarot_Wands_Ace.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['靈感', '創造', '潛力', '熱情', '行動開始'],
    upright:  { title: '正位·創造之火', desc: '一股强大的創造能量正在涌现。新計劃的种子已经种下，充满无限可能。抓住这份靈感，大胆行動。' },
    reversed: { title: '逆位·能量受阻', desc: '創造力受阻或方向不明，計劃可能延迟。重新整顿动力，找回最初的熱情。' }
  },
  {
    id: 23, name: '權杖二', nameEn: '02 of Wands', num: '2',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/RWS_Tarot_Wands_02.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['計劃', '野心', '等待', '決策', '遠景'],
    upright:  { title: '正位·遠景规划', desc: '你站在高处，掌握全局。計劃已成形，现在需要做出決策并付诸行動。' },
    reversed: { title: '逆位·犹豫不决', desc: '你可能陷入計劃而迟迟未行動。放下恐惧，相信自己的能力。' }
  },
  {
    id: 24, name: '權杖三', nameEn: '03 of Wands', num: '3',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/RWS_Tarot_Wands_03.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['擴展', '進展', '等待結果', '合作', '貿易'],
    upright:  { title: '正位·成果将至', desc: '你已播下种子，现在耐心等待成果回归。合作伙伴或機會正在接近。' },
    reversed: { title: '逆位·延误受阻', desc: '期待中的進展出现延误。重新审视計劃，寻求新的合作方式。' }
  },
  {
    id: 25, name: '權杖四', nameEn: '04 of Wands', num: '4',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/RWS_Tarot_Wands_04.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['慶祝', '穩定', '和諧', '休息', '成就'],
    upright:  { title: '正位·欢庆丰收', desc: '值得慶祝的时刻到来！創造了稳固的基础，与他人共享这份喜悅。' },
    reversed: { title: '逆位·不穩定', desc: '家庭或社群关系出现紧张。寻找和諧，重建稳固的根基。' }
  },
  {
    id: 26, name: '權杖五', nameEn: '05 of Wands', num: '5',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/RWS_Tarot_Wands_05.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['衝突', '競爭', '混亂', '挑戰', '爭執'],
    upright:  { title: '正位·競爭挑戰', desc: '面对混亂与競爭，但这是成长的機會。保持清醒，找到自己的立場。' },
    reversed: { title: '逆位·回避衝突', desc: '你可能在逃避必要的衝突。勇于表达自己，解决根本问题。' }
  },
  {
    id: 27, name: '權杖六', nameEn: '06 of Wands', num: '6',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/RWS_Tarot_Wands_06.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['勝利', '凱旋', '成就', '認可', '領導'],
    upright:  { title: '正位·勝利凱旋', desc: '你的努力得到了認可，成功正在到来。享受这份荣耀，继续前進。' },
    reversed: { title: '逆位·虚假勝利', desc: '成功可能带有水分，或你正在寻求外在認可。真正的勝利来自内心。' }
  },
  {
    id: 28, name: '權杖七', nameEn: '07 of Wands', num: '7',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/RWS_Tarot_Wands_07.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['防守', '勇氣', '堅持', '挑戰', '立場'],
    upright:  { title: '正位·坚守立場', desc: '面对挑戰仍顽强站立。你有足够的能力捍卫自己的立場与成就。' },
    reversed: { title: '逆位·屈服壓力', desc: '你可能因壓力而放棄立場。重新找回信心，不要轻易妥协。' }
  },
  {
    id: 29, name: '權杖八', nameEn: '08 of Wands', num: '8',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/RWS_Tarot_Wands_08.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['速度', '行動', '消息', '前進', '旅行'],
    upright:  { title: '正位·快速前進', desc: '事情快速推进，消息或機會如箭般而来。保持專注，抓住时机。' },
    reversed: { title: '逆位·停滞延误', desc: '前進受阻，計劃出现延误。耐心等待，整顿思绪再出发。' }
  },
  {
    id: 30, name: '權杖九', nameEn: '09 of Wands', num: '9',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/RWS_Tarot_Wands_09.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['韌性', '準備', '疲憊', '防備', '堅持'],
    upright:  { title: '正位·顽强韌性', desc: '你已历经重重考验，伤痕累累却仍屹立。最后的障碍即将跨越。' },
    reversed: { title: '逆位·接近崩溃', desc: '长期的壓力让你疲憊不堪。适时休息，允许自己寻求支援。' }
  },
  {
    id: 31, name: '權杖十', nameEn: '10 of Wands', num: '10',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/RWS_Tarot_Wands_10.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['負擔', '責任', '壓力', '完成', '疲憊'],
    upright:  { title: '正位·重担在肩', desc: '你承担了过多的責任，即将到达极限。是时候放下或尋求幫助了。' },
    reversed: { title: '逆位·放下重担', desc: '你终于开始放下过多的負擔，轻装前行。' }
  },
  {
    id: 32, name: '權杖侍者', nameEn: 'Page of Wands', num: 'P',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/70/RWS_Tarot_Wands_Page.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['熱情', '靈感', '探索', '創意', '消息'],
    upright:  { title: '正位·熱情探索', desc: '充满熱情的探索者，对新事物充满好奇与創意。新的靈感或消息将至。' },
    reversed: { title: '逆位·衝動莽撞', desc: '熱情有余但缺乏計劃。在行動前先做好準備。' }
  },
  {
    id: 33, name: '權杖騎士', nameEn: 'Knight of Wands', num: 'Kn',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/RWS_Tarot_Wands_Knight.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['行動', '魄力', '冒險', '衝勁', '改變'],
    upright:  { title: '正位·冲刺行動', desc: '以强大的魄力和速度冲向目标。这是大胆行動的时刻。' },
    reversed: { title: '逆位·鲁莽衝動', desc: '行動过于衝動，缺乏深思熟虑。稍作停顿，評估风险。' }
  },
  {
    id: 34, name: '權杖皇后', nameEn: 'Queen of Wands', num: 'Q',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/RWS_Tarot_Wands_Queen.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['自信', '決心', '獨立', '熱情', '影響力'],
    upright:  { title: '正位·熱情皇后', desc: '充满活力与魅力，自信且有影響力。以熱情感染他人，引领前行。' },
    reversed: { title: '逆位·过于强势', desc: '可能过于强势或情绪化。找到力量与溫柔的平衡点。' }
  },
  {
    id: 35, name: '權杖國王', nameEn: 'King of Wands', num: 'K',
    suit: '權杖', element: '火',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/RWS_Tarot_Wands_King.jpg',
    symbol: '🔥', symbolColor: '#ff8844',
    keywords: ['領導', '遠見', '創業', '激勵', '成熟'],
    upright:  { title: '正位·领袖之王', desc: '成熟的領導者，充满遠見与創業精神。以智慧与熱情激勵他人。' },
    reversed: { title: '逆位·独裁控制', desc: '可能过于独裁或急躁。學習倾听他人，以包容替代控制。' }
  },
  {
    id: 36, name: '聖杯王牌', nameEn: 'Ace of Cups', num: 'A',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/RWS_Tarot_Cups_Ace.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['新愛情', '情感開始', '直覺', '喜悅', '奉獻'],
    upright:  { title: '正位·爱的开始', desc: '爱与情感的新开始。一段纯粹的連結即将形成，敞开心扉接受。' },
    reversed: { title: '逆位·情感受阻', desc: '情感受压抑或連結受阻。允许自己感受内心真实的情感。' }
  },
  {
    id: 37, name: '聖杯二', nameEn: '02 of Cups', num: '2',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/RWS_Tarot_Cups_02.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['愛情', '伴侶', '吸引', '連結', '承諾'],
    upright:  { title: '正位·深情連結', desc: '两颗心的深刻連結与相互吸引。关系中充满和諧与承諾。' },
    reversed: { title: '逆位·关系失衡', desc: '关系中出现不平衡或沟通问题。坦诚面对彼此的需求。' }
  },
  {
    id: 38, name: '聖杯三', nameEn: '03 of Cups', num: '3',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/RWS_Tarot_Cups_03.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['慶祝', '友誼', '豐盛', '社群', '快樂'],
    upright:  { title: '正位·欢庆共乐', desc: '与亲友共享喜悅与豐盛。这是慶祝、社交与感恩的美好时光。' },
    reversed: { title: '逆位·放纵过度', desc: '过度放纵或社交关系出现裂缝。回归真诚的連結。' }
  },
  {
    id: 39, name: '聖杯四', nameEn: '04 of Cups', num: '4',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/RWS_Tarot_Cups_04.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['冥想', '無聊', '重新評估', '內省', '機會'],
    upright:  { title: '正位·内心省思', desc: '暂时退出，重新审视生命中的機會与关系。也许有礼物等你发现。' },
    reversed: { title: '逆位·退缩逃避', desc: '过度沉湎内心，错失外在機會。是时候重新与世界連結。' }
  },
  {
    id: 40, name: '聖杯五', nameEn: '05 of Cups', num: '5',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/54/RWS_Tarot_Cups_05.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['失落', '悲傷', '遺憾', '哀悼', '重新聚焦'],
    upright:  { title: '正位·悲傷失落', desc: '正在为失去的事物感到悲傷。允许自己哀悼，但别忘了仍有美好存留。' },
    reversed: { title: '逆位·走出悲傷', desc: '你正在从失落中走出。接受过去，带着学到的智慧向前。' }
  },
  {
    id: 41, name: '聖杯六', nameEn: '06 of Cups', num: '6',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_Cups_06.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['懷舊', '童年', '純真', '回憶', '給予'],
    upright:  { title: '正位·甜蜜懷舊', desc: '美好的过去记忆带来温暖与純真。也许有人从过去重新走入你的生命。' },
    reversed: { title: '逆位·停留过去', desc: '过度沉湎于过去，无法面对现在。放下旧日，拥抱当下。' }
  },
  {
    id: 42, name: '聖杯七', nameEn: '07 of Cups', num: '7',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/RWS_Tarot_Cups_07.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['幻想', '選擇', '夢想', '迷惑', '空想'],
    upright:  { title: '正位·众多選擇', desc: '面对许多诱人的可能性，但需辨别哪些是真实的，哪些只是幻想。' },
    reversed: { title: '逆位·脚踏实地', desc: '幻想被现实拉回。是时候做出實際的選擇，付诸行動。' }
  },
  {
    id: 43, name: '聖杯八', nameEn: '08 of Cups', num: '8',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/RWS_Tarot_Cups_08.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['離去', '尋求更多', '放棄', '轉變', '自我探索'],
    upright:  { title: '正位·转身離去', desc: '虽然目前一切看似美好，但你感到需要追求更深层的意义。勇敢转身。' },
    reversed: { title: '逆位·停留不前', desc: '逃避必要的轉變，留在不再滿足你的处境中。' }
  },
  {
    id: 44, name: '聖杯九', nameEn: '09 of Cups', num: '9',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/RWS_Tarot_Cups_09.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['滿足', '成就', '心願成真', '幸福', '感恩'],
    upright:  { title: '正位·心想事成', desc: '你所渴望的正在成真，物质与情感上都感到滿足与幸福。' },
    reversed: { title: '逆位·不知足', desc: '表面滿足，内心却仍空虚。重新思考真正让你快樂的事物。' }
  },
  {
    id: 45, name: '聖杯十', nameEn: '10 of Cups', num: '10',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/RWS_Tarot_Cups_10.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['幸福', '家庭', '滿足', '和諧', '永恆之愛'],
    upright:  { title: '正位·圆满幸福', desc: '家庭与关系的圆满幸福。这是情感旅程的美好终点，感恩所拥有的一切。' },
    reversed: { title: '逆位·家庭失和', desc: '家庭关系出现裂缝或理想破灭。以沟通与爱重建和諧。' }
  },
  {
    id: 46, name: '聖杯侍者', nameEn: 'Page of Cups', num: 'P',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/RWS_Tarot_Cups_Page.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['創意', '直覺', '消息', '夢想', '敏感'],
    upright:  { title: '正位·直覺使者', desc: '充满創意与直覺的灵魂，带来情感或夢想方面的好消息。' },
    reversed: { title: '逆位·情绪不稳', desc: '情绪波动或創意受阻。给自己空间，让感受自然流动。' }
  },
  {
    id: 47, name: '聖杯騎士', nameEn: 'Knight of Cups', num: 'Kn',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_Cups_Knight.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['浪漫', '追求', '想象力', '魅力', '衝動'],
    upright:  { title: '正位·浪漫騎士', desc: '充满魅力与浪漫，以想象力追求心中所爱。情感的大胆行動时机到了。' },
    reversed: { title: '逆位·情感不成熟', desc: '情感衝動或不切實際。在追求之前，确认自己的动机是否真诚。' }
  },
  {
    id: 48, name: '聖杯皇后', nameEn: 'Queen of Cups', num: 'Q',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/RWS_Tarot_Cups_Queen.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['同情', '直覺', '情感智慧', '溫柔', '療癒'],
    upright:  { title: '正位·慈悲皇后', desc: '拥有深刻的情感智慧与同情心，能理解他人的感受，是天生的療癒者。' },
    reversed: { title: '逆位·情感淹没', desc: '可能被情绪淹没，过度牺牲自我。學習在同情他人的同时照顾自己。' }
  },
  {
    id: 49, name: '聖杯國王', nameEn: 'King of Cups', num: 'K',
    suit: '聖杯', element: '水',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/RWS_Tarot_Cups_King.jpg',
    symbol: '💧', symbolColor: '#44aaff',
    keywords: ['情感成熟', '智慧', '外交', '平衡', '掌控情緒'],
    upright:  { title: '正位·智慧之王', desc: '情感成熟且有智慧，能在感性与理性间取得平衡，是值得信赖的依靠。' },
    reversed: { title: '逆位·操控情感', desc: '可能利用情感操控他人，或压抑真实感受。以诚实和爱替代控制。' }
  },
  {
    id: 50, name: '寶劍王牌', nameEn: 'Ace of Swords', num: 'A',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/RWS_Tarot_Swords_Ace.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['真相', '清晰', '突破', '決斷', '新想法'],
    upright:  { title: '正位·真理之剑', desc: '强大的心智力量涌现，带来清晰与突破。真相大白的时刻，勇敢面对。' },
    reversed: { title: '逆位·思绪混亂', desc: '思维混亂或被欺騙。寻求清晰，不要被谎言或自我欺騙所困。' }
  },
  {
    id: 51, name: '寶劍二', nameEn: '02 of Swords', num: '2',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/73/RWS_Tarot_Swords_02.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['僵局', '抉擇', '困境', '逃避', '平衡'],
    upright:  { title: '正位·艰难抉擇', desc: '面对一个困难的决定，你试图保持中立。是时候睁开眼睛，做出選擇。' },
    reversed: { title: '逆位·看清困境', desc: '迷雾散去，你开始看清自己所面对的困境，可以做出明智的决定了。' }
  },
  {
    id: 52, name: '寶劍三', nameEn: '03 of Swords', num: '3',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/RWS_Tarot_Swords_03.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['心碎', '悲傷', '背叛', '失去', '痛苦'],
    upright:  { title: '正位·心碎之痛', desc: '深刻的心痛与失去感。允许自己悲傷，这份痛苦终将成为智慧。' },
    reversed: { title: '逆位·走出伤痛', desc: '你正在从心碎中慢慢愈合。宽恕自己与他人，让伤口愈合。' }
  },
  {
    id: 53, name: '寶劍四', nameEn: '04 of Swords', num: '4',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/RWS_Tarot_Swords_04.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['休息', '恢復', '冥想', '靜養', '等待'],
    upright:  { title: '正位·静心养息', desc: '你需要从战场上退下，给自己时间休养生息，以备更大的挑戰。' },
    reversed: { title: '逆位·强迫休息', desc: '你可能被迫停下脚步，或是拖延了必要的行動。評估是否该重新出发。' }
  },
  {
    id: 54, name: '寶劍五', nameEn: '05 of Swords', num: '5',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/RWS_Tarot_Swords_05.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['衝突', '失敗', '不誠實', '自私', '挫敗'],
    upright:  { title: '正位·冷酷勝利', desc: '以不正当的手段取得勝利，或在衝突中蒙受损失。反思你的行動是否符合道德。' },
    reversed: { title: '逆位·和解释怀', desc: '旧有的衝突开始化解，寻求和解与前進的可能。' }
  },
  {
    id: 55, name: '寶劍六', nameEn: '06 of Swords', num: '6',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/RWS_Tarot_Swords_06.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['過渡', '離開困境', '旅行', '前進', '平静'],
    upright:  { title: '正位·平静前行', desc: '从动荡走向平静，暂时離開困境。这是一段過渡期，带你走向更好的地方。' },
    reversed: { title: '逆位·逃避困难', desc: '逃避问题而非解决它们。确认你是在前進，而非只是逃跑。' }
  },
  {
    id: 56, name: '寶劍七', nameEn: '07 of Swords', num: '7',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/RWS_Tarot_Swords_07.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['欺騙', '策略', '逃避', '機智', '偷竊'],
    upright:  { title: '正位·智谋行事', desc: '需要用策略和機智达成目标。但要小心，某些行動是否处于道德边缘。' },
    reversed: { title: '逆位·谎言揭穿', desc: '欺騙行为被揭穿，或你選擇放棄不誠實的策略。诚实才是正道。' }
  },
  {
    id: 57, name: '寶劍八', nameEn: '08 of Swords', num: '8',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/RWS_Tarot_Swords_08.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['束縛', '無力感', '限制', '自我囚禁', '困境'],
    upright:  { title: '正位·自我囚禁', desc: '你感到被困，但那些束縛大多来自你自己的思想。改變思维，你就能解脱。' },
    reversed: { title: '逆位·解脱束縛', desc: '你开始挣脱心理的枷锁，重新找回自由与力量。' }
  },
  {
    id: 58, name: '寶劍九', nameEn: '09 of Swords', num: '9',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/RWS_Tarot_Swords_09.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['焦慮', '惡夢', '絕望', '擔憂', '最深的恐懼'],
    upright:  { title: '正位·深夜恐惧', desc: '最深的恐懼与焦慮在夜深人静时浮现。记住，大多数恐惧都比现实更可怕。' },
    reversed: { title: '逆位·走出黑暗', desc: '最黑暗的时刻即将过去，你开始从焦慮中解脱，看见一线曙光。' }
  },
  {
    id: 59, name: '寶劍十', nameEn: '10 of Swords', num: '10',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/RWS_Tarot_Swords_10.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['終結', '背叛', '傷害', '轉折', '死亡與重生'],
    upright:  { title: '正位·痛苦終結', desc: '某件事以最痛苦的方式走到了终点。但每一个结束都是新开始的种子。' },
    reversed: { title: '逆位·不可避免', desc: '试图阻止不可避免的结局。放手，让旧的循环结束，迎接新生。' }
  },
  {
    id: 60, name: '寶劍侍者', nameEn: 'Page of Swords', num: 'P',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_Swords_Page.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['好奇', '監視', '真相', '消息', '謹慎'],
    upright:  { title: '正位·謹慎使者', desc: '带来重要消息的謹慎观察者。善用你的智慧，在行動前仔细思考。' },
    reversed: { title: '逆位·谎言消息', desc: '消息可能不可靠，或有人带着不良意图。謹慎辨别真伪。' }
  },
  {
    id: 61, name: '寶劍騎士', nameEn: 'Knight of Swords', num: 'Kn',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/RWS_Tarot_Swords_Knight.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['野心', '勇敢', '衝動', '直接', '決斷'],
    upright:  { title: '正位·迅猛騎士', desc: '以果决和速度冲向目标，直接表达想法。但也要避免鲁莽行事。' },
    reversed: { title: '逆位·衝動破坏', desc: '言行过于衝動，可能傷害他人或自己的利益。放慢脚步，三思而后行。' }
  },
  {
    id: 62, name: '寶劍皇后', nameEn: 'Queen of Swords', num: 'Q',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/RWS_Tarot_Swords_Queen.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['智慧', '獨立', '清晰', '诚实', '直接'],
    upright:  { title: '正位·智慧皇后', desc: '心思敏锐、獨立而直接。以清晰的思维和诚实的话语面对一切挑戰。' },
    reversed: { title: '逆位·冷漠尖刻', desc: '可能过于冷漠或言语刻薄，傷害他人。在清晰与慈悲之间找到平衡。' }
  },
  {
    id: 63, name: '寶劍國王', nameEn: 'King of Swords', num: 'K',
    suit: '寶劍', element: '风',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/RWS_Tarot_Swords_King.jpg',
    symbol: '⚔', symbolColor: '#88ccff',
    keywords: ['智識', '權威', '道德', '理性', '清晰思考'],
    upright:  { title: '正位·理性之王', desc: '以清晰的思维、道德标准和公正的态度治理一切。是值得信赖的智識權威。' },
    reversed: { title: '逆位·滥用权力', desc: '可能利用智識操控他人，或以冷酷的逻辑压制情感。追求公平与人道。' }
  },
  {
    id: 64, name: '星幣王牌', nameEn: 'Ace of Pentacles', num: 'A',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/45/RWS_Tarot_Pentacles_Ace.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['機會', '繁榮', '物質新開始', '財富', '健康'],
    upright:  { title: '正位·豐盛之种', desc: '一个豐盛的物质機會正在降临。財富、健康或事业的种子正在发芽。' },
    reversed: { title: '逆位·機會受阻', desc: '物质或财务機會受阻，或你尚未準備好。整顿基础，耐心等待。' }
  },
  {
    id: 65, name: '星幣二', nameEn: '02 of Pentacles', num: '2',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/RWS_Tarot_Pentacles_02.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['平衡', '靈活', '多工', '適應', '變動'],
    upright:  { title: '正位·靈活应对', desc: '在多重責任与变化中保持平衡。靈活应对，找到节奏。' },
    reversed: { title: '逆位·失去平衡', desc: '试图同时处理太多事情，导致失衡。适时放棄某些，專注重点。' }
  },
  {
    id: 66, name: '星幣三', nameEn: '03 of Pentacles', num: '3',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/RWS_Tarot_Pentacles_03.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['技藝', '合作', '成就', '計劃', '團隊'],
    upright:  { title: '正位·精益求精', desc: '通过技藝、合作与計劃取得成就。这是精进技能、与他人共创的时刻。' },
    reversed: { title: '逆位·缺乏合作', desc: '沟通不良或各自为政影响了成果。加强合作，明确分工。' }
  },
  {
    id: 67, name: '星幣四', nameEn: '04 of Pentacles', num: '4',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/94/RWS_Tarot_Pentacles_04.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['守財', '保守', '控制', '安全感', '吝嗇'],
    upright:  { title: '正位·稳固財富', desc: '謹慎守护你所拥有的，建立财务安全感。但也要注意不要过于保守吝嗇。' },
    reversed: { title: '逆位·放开控制', desc: '对財富或控制的过度执着正在限制你。學習分享，放松对物质的紧握。' }
  },
  {
    id: 68, name: '星幣五', nameEn: '05 of Pentacles', num: '5',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_Pentacles_05.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['困境', '貧窮', '孤立', '擔憂', '尋求幫助'],
    upright:  { title: '正位·艰难时期', desc: '正在经历物质或精神上的匮乏时期。记住，帮助就在身旁，勇于寻求。' },
    reversed: { title: '逆位·转机出现', desc: '困境中出现转机。物质状况开始改善，或你找到了所需的支援。' }
  },
  {
    id: 69, name: '星幣六', nameEn: '06 of Pentacles', num: '6',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/RWS_Tarot_Pentacles_06.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['慷慨', '給予', '接受', '分享', '平衡財富'],
    upright:  { title: '正位·慷慨分享', desc: '財富的流动——或給予或接受。真正的豐盛在于分享，而非囤积。' },
    reversed: { title: '逆位·附加条件', desc: '給予或接受带有附加条件。反思金钱关系中的隐藏动机。' }
  },
  {
    id: 70, name: '星幣七', nameEn: '07 of Pentacles', num: '7',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/RWS_Tarot_Pentacles_07.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['評估', '等待', '投資', '耐心', '收穫'],
    upright:  { title: '正位·耐心等候', desc: '你已付出努力，现在耐心等待成果。評估你的投資是否带来预期收益。' },
    reversed: { title: '逆位·缺乏耐心', desc: '对缓慢的進展感到沮丧，或投資未带来回报。重新評估策略。' }
  },
  {
    id: 71, name: '星幣八', nameEn: '08 of Pentacles', num: '8',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/RWS_Tarot_Pentacles_08.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['技藝', '勤奮', '專注', '磨練', '工藝'],
    upright:  { title: '正位·精勤磨練', desc: '以專注与勤奮磨練技藝。每一份努力都在为未来的成就奠定基础。' },
    reversed: { title: '逆位·倦怠無聊', desc: '重复的工作让你感到無聊或缺乏动力。寻找工作中的意义与乐趣。' }
  },
  {
    id: 72, name: '星幣九', nameEn: '09 of Pentacles', num: '9',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/RWS_Tarot_Pentacles_09.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['獨立', '豐盛', '成就', '自给自足', '奢華'],
    upright:  { title: '正位·自给自足', desc: '透过自己的努力取得了豐盛与獨立。享受这份辛勤换来的成果。' },
    reversed: { title: '逆位·物质依赖', desc: '可能过于依赖物质安全感，或孤立自己。寻求物质与情感的平衡。' }
  },
  {
    id: 73, name: '星幣十', nameEn: '10 of Pentacles', num: '10',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/RWS_Tarot_Pentacles_10.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['遺產', '財富', '家族', '長期成功', '傳承'],
    upright:  { title: '正位·世代傳承', desc: '家族財富、穩定与傳承的象征。长期的努力創造了持久的繁榮。' },
    reversed: { title: '逆位·财务问题', desc: '家族财务或遺產出现问题。重新評估长期計劃，寻求稳固的基础。' }
  },
  {
    id: 74, name: '星幣侍者', nameEn: 'Page of Pentacles', num: 'P',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/RWS_Tarot_Pentacles_Page.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['學習', '機會', '潛力', '可靠', '新事業'],
    upright:  { title: '正位·勤奮学徒', desc: '踏实勤奮的學習者，充满成长的潛力。一个新的物质機會或學習機會将至。' },
    reversed: { title: '逆位·不切實際', desc: '有好主意但缺乏执行力或實際計劃。将想法落地，逐步实现。' }
  },
  {
    id: 75, name: '星幣騎士', nameEn: 'Knight of Pentacles', num: 'Kn',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/RWS_Tarot_Pentacles_Knight.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['勤奮', '可靠', '方法論', '耐心', '實際'],
    upright:  { title: '正位·踏实騎士', desc: '以耐心、可靠和方法論前進，虽慢但稳。脚踏实地地追求目标。' },
    reversed: { title: '逆位·停滞不前', desc: '过于謹慎或固执，导致停滞不前。在穩健的同时，允许一些靈活性。' }
  },
  {
    id: 76, name: '星幣皇后', nameEn: 'Queen of Pentacles', num: 'Q',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/RWS_Tarot_Pentacles_Queen.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['實際', '可靠', '豐盛', '照料', '慷慨'],
    upright:  { title: '正位·豐盛皇后', desc: '實際、慷慨且充满照料精神。以踏实的智慧創造物质与精神的豐盛。' },
    reversed: { title: '逆位·工作失衡', desc: '过度專注于物质，忽视了情感与精神需求。在现实与灵性间寻求平衡。' }
  },
  {
    id: 77, name: '星幣國王', nameEn: 'King of Pentacles', num: 'K',
    suit: '星幣', element: '土',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/71/RWS_Tarot_Pentacles_King.jpg',
    symbol: '⭐', symbolColor: '#ffdd44',
    keywords: ['財富', '商業', '可靠', '穩健', '領導'],
    upright:  { title: '正位·繁榮之王', desc: '踏实且有智慧的財富管理者，以穩健的方式創造并守护繁榮。' },
    reversed: { title: '逆位·贪婪固执', desc: '可能过于执着于物质，或在商業上过于固执。培养靈活与慷慨。' }
  },
];