const axios = require('axios');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const MODEL = 'anthropic/claude-haiku-4.5';

const SYSTEM_PROMPT = `你是「命運之眼」——一位神秘古老的塔羅占卜師，居住在宇宙星辰與靈魂深處的交匯點。你擁有洞悉命運的能力，透過塔羅牌的智慧引導每一位尋覓者。

【說話風格】
- 神秘、詩意、充滿靈性智慧，但同時溫暖且平易近人
- 偶爾引用星辰、宇宙、光與影的意象
- 稱呼用戶為「尋覓者」或「朋友」
- 使用繁體中文
- 語氣如同慈悲而深邃的智者
- 偶爾使用 ✦ 或 ⋯⋯ 增添神秘感

【你的能力】
1. 為用戶抽取塔羅牌並深入解讀
2. 回答關於愛情、事業、財運、人際的問題
3. 提供靈性指引與人生智慧
4. 解釋塔羅牌的深層含義

【78張完整牌組】
大阿爾克納(22張)：愚者、魔術師、女祭司、女皇、皇帝、教皇、戀人、戰車、力量、隱者、命運之輪、正義、倒吊人、死神、節制、惡魔、塔、星星、月亮、太陽、審判、世界
小阿爾克納(56張)：
- 權杖(火)：王牌至十、侍者、騎士、皇后、國王
- 聖杯(水)：王牌至十、侍者、騎士、皇后、國王
- 寶劍(風)：王牌至十、侍者、騎士、皇后、國王
- 星幣(土)：王牌至十、侍者、騎士、皇后、國王

【抽牌格式】
當用戶要求抽牌時，系統會在訊息中提供預先抽好的牌。
單張格式：「[預抽牌：牌名·正逆位]」
多張格式：「[預抽牌：牌名·正逆位、牌名·正逆位、牌名·正逆位]」
你必須使用所有預抽牌進行解讀，並在回應中用以下格式標示每一張牌：
[CARD:牌名:正逆位]
例如：[CARD:太陽:正位] 或 [CARD:月亮:逆位]
絕對不可自行選擇其他牌，必須使用預抽的牌。若系統提供三張牌，必須解讀三張牌。
每張牌必須有深入、有溫度的解讀，結合用戶的具體問題。

【回應長度】
一般對話：60-120字，保持溫柔簡潔。
單張抽牌解讀：180-280字（必須包含 [CARD:...] 標籤），說明牌面核心、對問題的提醒、具體建議。
三張抽牌解讀：500-800字（必須包含三個 [CARD:...] 標籤），每張牌各自解讀，再補一段整體脈絡與行動建議。
回覆要有層次，但不要空泛堆砌形容詞。`;

// 78張牌名列表（與前端同步）
const ALL_CARD_NAMES = [
  '愚者','魔術師','女祭司','女皇','皇帝','教皇','戀人','戰車','力量','隱者',
  '命運之輪','正義','倒吊人','死神','節制','惡魔','塔','星星','月亮','太陽','審判','世界',
  '權杖王牌','權杖二','權杖三','權杖四','權杖五','權杖六','權杖七','權杖八','權杖九','權杖十','權杖侍者','權杖騎士','權杖皇后','權杖國王',
  '聖杯王牌','聖杯二','聖杯三','聖杯四','聖杯五','聖杯六','聖杯七','聖杯八','聖杯九','聖杯十','聖杯侍者','聖杯騎士','聖杯皇后','聖杯國王',
  '寶劍王牌','寶劍二','寶劍三','寶劍四','寶劍五','寶劍六','寶劍七','寶劍八','寶劍九','寶劍十','寶劍侍者','寶劍騎士','寶劍皇后','寶劍國王',
  '星幣王牌','星幣二','星幣三','星幣四','星幣五','星幣六','星幣七','星幣八','星幣九','星幣十','星幣侍者','星幣騎士','星幣皇后','星幣國王'
];

function drawRandomCard() {
  const name = ALL_CARD_NAMES[Math.floor(Math.random() * ALL_CARD_NAMES.length)];
  const orientation = Math.random() < 0.3 ? '逆位' : '正位';
  return `${name}·${orientation}`;
}

function drawRandomCards(count) {
  const used = new Set();
  const cards = [];

  while (cards.length < count && used.size < ALL_CARD_NAMES.length) {
    const drawn = drawRandomCard();
    const name = drawn.split('·')[0];
    if (used.has(name)) continue;
    used.add(name);
    cards.push(drawn);
  }

  return cards;
}

function getDrawCount(messages) {
  const last = messages[messages.length - 1]?.content?.toLowerCase() || '';
  if (/三張|三牌|3\s*張|3\s*牌|three\s*cards?|處境、挑戰與建議/.test(last)) {
    return 3;
  }
  return needsCardDraw(messages) ? 1 : 0;
}

function needsCardDraw(messages) {
  const last = messages[messages.length - 1]?.content?.toLowerCase() || '';
  return /抽|牌|指引|今日|運勢|感情|事業|財|draw|card/.test(last);
}

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  // 偵測按鈕/訊息需要幾張牌，並在最後訊息附加預抽結果。
  const augmented = [...messages];
  const drawCount = getDrawCount(messages);
  if (drawCount > 0) {
    const drawn = drawRandomCards(drawCount);
    const last = augmented[augmented.length - 1];
    augmented[augmented.length - 1] = {
      ...last,
      content: `${last.content}\n\n[預抽牌：${drawn.join('、')}]`
    };
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  console.log('[req] 訊息數:', messages.length);

  try {
    const response = await axios({
      method: 'post',
      url: 'https://openrouter.ai/api/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:30001',
        'X-Title': 'Mystic Tarot'
      },
      data: {
        model: MODEL,
        max_tokens: drawCount >= 3 ? 1600 : drawCount === 1 ? 800 : 450,
        stream: true,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...augmented]
      },
      responseType: 'stream',
      timeout: 30000
    });

    console.log('[stream] 狀態碼:', response.status);

    let buf = '';
    let charCount = 0;

    response.data.on('data', (chunk) => {
      buf += chunk.toString();
      const lines = buf.split('\n');
      buf = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') return;
        try {
          const data = JSON.parse(payload);
          const text = data.choices?.[0]?.delta?.content ?? '';
          if (text) {
            charCount += text.length;
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        } catch {}
      }
    });

    response.data.on('end', () => {
      console.log(`[done] 完成，共 ${charCount} 字`);
      res.write('data: [DONE]\n\n');
      res.end();
    });

    response.data.on('error', (err) => {
      console.error('[stream error]', err.message);
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    });

    req.on('close', () => response.data.destroy());

  } catch (err) {
    let msg = err.message;
    if (err.response?.data && typeof err.response.data.on === 'function') {
      // responseType:'stream' 時要從 stream 讀取錯誤內容
      try {
        const chunks = [];
        for await (const chunk of err.response.data) chunks.push(chunk);
        msg = `HTTP ${err.response.status}: ${Buffer.concat(chunks).toString().slice(0, 300)}`;
      } catch { msg = `HTTP ${err.response?.status ?? ''}: ${err.message}`; }
    }
    console.error('[error]', msg.slice(0, 300));
    res.write(`data: ${JSON.stringify({ error: msg.slice(0, 300) })}\n\n`);
    res.end();
  }
});

const PORT = process.env.PORT || 30001;
app.listen(PORT, () => {
  console.log(`\n✦ 神秘塔羅伺服器已啟動`);
  console.log(`✦ 模型：${MODEL}`);
  console.log(`✦ 開啟瀏覽器前往: http://localhost:${PORT}\n`);
});
